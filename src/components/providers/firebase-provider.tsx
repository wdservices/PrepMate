
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService, db } from "@/lib/firebase"; 
import { doc, getDoc, onSnapshot, enableNetwork, disableNetwork, terminate } from "firebase/firestore"; // Added enableNetwork, disableNetwork, terminate
import type { AppUser } from "@/types";

interface FirebaseContextProps {
  user: AppUser | null; // Use AppUser type
  loading: boolean;
  userProfileLoading: boolean; // To indicate profile data loading
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true); // Firebase Auth loading
  const [userProfileLoading, setUserProfileLoading] = useState(true); // Firestore profile loading

  useEffect(() => {
    console.log("[FirebaseProvider] useEffect triggered. Browser online:", navigator.onLine);

    if (!firebaseAuthService) {
      console.warn("[FirebaseProvider] Firebase Auth service is not available. Auth features will be disabled.");
      setLoading(false);
      setUserProfileLoading(false);
      return; 
    }
    if (!db) { 
        console.error("[FirebaseProvider] CRITICAL - Firestore (db) service is not initialized. Firestore operations will fail. Check firebase.ts and your Firebase project setup.");
        setLoading(false);
        setUserProfileLoading(false);
        return;
    } else {
      console.log("[FirebaseProvider] Firestore (db) service appears available. Attempting to enable network.");
      enableNetwork(db)
        .then(() => {
          console.log("[FirebaseProvider] Firestore network explicitly enabled.");
        })
        .catch((error) => {
          console.error("[FirebaseProvider] Error explicitly enabling Firestore network:", error);
        });
    }
    
    console.log(`[FirebaseProvider] Initializing auth state listener. DB service ${db ? 'available' : 'NOT available'}.`);

    const unsubscribeAuth = onAuthStateChanged(firebaseAuthService, async (firebaseUser) => {
      console.log(`[FirebaseProvider] onAuthStateChanged. User: ${firebaseUser ? firebaseUser.uid : 'null'}. Browser online: ${navigator.onLine}`);
      
      if (firebaseUser) {
        setUserProfileLoading(true);
        console.log(`[FirebaseProvider] User detected (UID: ${firebaseUser.uid}). Trying to fetch profile. Firestore db object present: ${!!db}`);

        if (!db) {
          console.warn(`[FirebaseProvider] Firestore (db) is null inside onAuthStateChanged for UID: ${firebaseUser.uid}. Skipping profile fetch.`);
          setUser(firebaseUser as AppUser);
          setUserProfileLoading(false); 
        } else {
          const userRef = doc(db, "users", firebaseUser.uid);
          console.log(`[FirebaseProvider] Setting up Firestore onSnapshot listener for user profile: users/${firebaseUser.uid}`);
          
          const unsubscribeSnapshot = onSnapshot(userRef, 
            (docSnap) => {
              console.log(`[FirebaseProvider] onSnapshot for users/${firebaseUser.uid} triggered. Exists: ${docSnap.exists()}`);
              if (docSnap.exists()) {
                const profileData = docSnap.data();
                console.log(`[FirebaseProvider] Firestore profile data for UID ${firebaseUser.uid} found:`, profileData);
                setUser({
                  ...firebaseUser, 
                  trialEndsAt: profileData.trialEndsAt || undefined,
                  isSubscribed: profileData.isSubscribed || false,
                  subscriptionEndsAt: profileData.subscriptionEndsAt || undefined,
                } as AppUser);
              } else {
                setUser({ ...firebaseUser, trialEndsAt: undefined, isSubscribed: false } as AppUser);
                console.warn(`[FirebaseProvider] User profile NOT FOUND in Firestore for UID: ${firebaseUser.uid}. Using basic auth data.`);
              }
              setUserProfileLoading(false);
            }, 
            (error) => {
              console.error(`[FirebaseProvider] Error in onSnapshot for users/${firebaseUser.uid}:`, error);
              setUser(firebaseUser as AppUser); 
              setUserProfileLoading(false);
            }
          );
          // This inner unsubscribe will be called if the auth state changes again or on component unmount
          return () => {
            console.log(`[FirebaseProvider] Unsubscribing from Firestore onSnapshot for UID: ${firebaseUser.uid}`);
            unsubscribeSnapshot();
          };
        }
      } else {
        setUser(null);
        setUserProfileLoading(false);
        console.log(`[FirebaseProvider] No user. Set user to null, userProfileLoading to false.`);
      }
      setLoading(false);
      console.log(`[FirebaseProvider] Auth state processing finished. Auth loading: ${false}, Profile loading: ${userProfileLoading}`);
    });

    return () => {
      console.log("[FirebaseProvider] Cleaning up. Unsubscribing from onAuthStateChanged.");
      unsubscribeAuth();
      // Optionally, you might want to disable network or terminate Firestore if the provider unmounts,
      // though this is usually not necessary for typical web app lifecycles.
      // if (db) {
      //   console.log("[FirebaseProvider] Attempting to disable Firestore network on cleanup.");
      //   disableNetwork(db).catch(err => console.error("Error disabling network", err));
      //   // terminate(db).catch(err => console.error("Error terminating Firestore", err)); // Use with caution
      // }
    };
  }, []);


  return (
    <FirebaseContext.Provider value={{ user, loading, userProfileLoading }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a FirebaseProvider");
  }
  return context;
};

