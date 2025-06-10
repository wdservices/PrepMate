
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService, db } from "@/lib/firebase"; 
import { doc, getDoc, onSnapshot, enableNetwork, disableNetwork, terminate } from "firebase/firestore";
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
        console.error("[FirebaseProvider] CRITICAL - Firestore (db) service is NOT INITIALIZED upon useEffect start. Firestore operations will fail. Check firebase.ts and your Firebase project setup.");
        setLoading(false);
        setUserProfileLoading(false);
        return;
    } else {
      console.log("[FirebaseProvider] Firestore (db) service IS available at useEffect start. Attempting to enable network.");
      enableNetwork(db)
        .then(() => {
          console.log("[FirebaseProvider] Firestore network explicitly enabled successfully.");
        })
        .catch((error) => {
          console.error("[FirebaseProvider] Error explicitly enabling Firestore network:", error);
        });
    }
    
    console.log(`[FirebaseProvider] Initializing auth state listener. DB service present: ${!!db}.`);

    const unsubscribeAuth = onAuthStateChanged(firebaseAuthService, async (firebaseUser) => {
      console.log(`[FirebaseProvider] onAuthStateChanged. User: ${firebaseUser ? firebaseUser.uid : 'null'}. Browser online: ${navigator.onLine}`);
      
      if (firebaseUser) {
        setUserProfileLoading(true);
        console.log(`[FirebaseProvider] User detected (UID: ${firebaseUser.uid}). Trying to fetch profile. Firestore db object present: ${!!db}`);

        if (!db) {
          console.warn(`[FirebaseProvider] Firestore (db) is null inside onAuthStateChanged for UID: ${firebaseUser.uid}, cannot fetch profile. Setting userProfileLoading to false.`);
          setUser(firebaseUser as AppUser); // Set basic user data
          setUserProfileLoading(false); 
        } else {
          console.log(`[FirebaseProvider] Firestore (db) IS available inside onAuthStateChanged for UID: ${firebaseUser.uid}. Proceeding with profile fetch.`);
          const userRef = doc(db, "users", firebaseUser.uid);
          console.log(`[FirebaseProvider] Setting up Firestore onSnapshot listener for user profile: users/${firebaseUser.uid}`);
          
          const unsubscribeSnapshot = onSnapshot(userRef, 
            (docSnap) => {
              console.log(`[FirebaseProvider] onSnapshot for users/${firebaseUser.uid} triggered. Doc exists: ${docSnap.exists()}.`);
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
                console.warn(`[FirebaseProvider] User profile NOT FOUND in Firestore for UID: ${firebaseUser.uid}. Using basic auth data.`);
                setUser({ ...firebaseUser, trialEndsAt: undefined, isSubscribed: false } as AppUser); 
              }
              console.log(`[FirebaseProvider] Firestore profile data processing complete for UID ${firebaseUser.uid}. Set userProfileLoading to false (path A).`);
              setUserProfileLoading(false);
            }, 
            (error) => {
              console.error(`[FirebaseProvider] Error in onSnapshot for users/${firebaseUser.uid}:`, error);
              setUser(firebaseUser as AppUser); // Set basic user data on error
              console.log(`[FirebaseProvider] Error in onSnapshot. Set userProfileLoading to false (path B).`);
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
        console.log(`[FirebaseProvider] No user. Set user to null, userProfileLoading to false (path C).`);
        setUserProfileLoading(false);
      }
      console.log(`[FirebaseProvider] Auth state processing finished for current change. Set auth loading (loading) to false.`);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      console.log("[FirebaseProvider] Cleaning up: Unsubscribing from onAuthStateChanged.");
      unsubscribeAuth();
      if (db) {
        console.log("[FirebaseProvider] Attempting to disable Firestore network on cleanup.");
        disableNetwork(db)
          .then(() => console.log("[FirebaseProvider] Firestore network explicitly disabled."))
          .catch(err => console.error("[FirebaseProvider] Error disabling Firestore network on cleanup:", err));
        // Consider terminate(db) if you need to fully shut down, but it's aggressive.
        // terminate(db).then(() => console.log("[FirebaseProvider] Firestore instance terminated.")).catch(err => console.error("Error terminating db", err));
      } else {
        console.log("[FirebaseProvider] db object was null during cleanup, no network to disable.");
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount


  console.log(`[FirebaseProvider] Rendering. Auth Loading: ${loading}, Profile Loading: ${userProfileLoading}, User: ${user ? user.uid : 'null'}`);
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
