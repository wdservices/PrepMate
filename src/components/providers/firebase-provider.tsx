
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService, db } from "@/lib/firebase"; 
import { doc, getDoc, onSnapshot } from "firebase/firestore";
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
    if (!firebaseAuthService) {
      console.warn("FirebaseProvider: Firebase Auth service is not available. Auth features will be disabled.");
      setLoading(false);
      setUserProfileLoading(false);
      return; 
    }
    // Initial check for db, mainly for logging. The critical check is within onAuthStateChanged.
    if (!db) { 
        console.error("FirebaseProvider: CRITICAL - Firestore (db) service is not initialized (checked at provider mount). Firestore operations will fail. Check firebase.ts and your Firebase project setup.");
    }

    console.log(`[FirebaseProvider] useEffect initialized. Auth service available. DB service ${db ? 'available' : 'NOT available (at mount)'}.`);

    const unsubscribeAuth = onAuthStateChanged(firebaseAuthService, async (firebaseUser) => {
      console.log(`[FirebaseProvider] onAuthStateChanged triggered. firebaseUser: ${firebaseUser ? firebaseUser.uid : 'null'}`);
      
      if (firebaseUser) {
        setUserProfileLoading(true); // Assume we will try to load profile
        console.log(`[FirebaseProvider] firebaseUser detected (UID: ${firebaseUser.uid}). Set userProfileLoading to true. Attempting profile fetch...`);

        if (!db) { // Critical check: if db service isn't up, can't fetch profile
          console.warn(
            `[FirebaseProvider] Firestore (db) is not initialized inside onAuthStateChanged for UID: ${firebaseUser.uid}. Skipping user profile fetching. User-specific data like trial/subscription status will be unavailable.`
          );
          setUser(firebaseUser as AppUser); // Use basic FirebaseUser info
          console.log(`[FirebaseProvider] Firestore (db) not initialized. Set userProfileLoading to false (path A).`);
          setUserProfileLoading(false); 
          // setLoading(false) will be called at the end of onAuthStateChanged
        } else {
          // Firestore (db) is available, proceed with profile fetching
          const userRef = doc(db, "users", firebaseUser.uid);
          
          // Setting up snapshot listener for real-time profile updates
          const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
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
              // Profile doesn't exist in Firestore, use basic auth data
              setUser({
                ...firebaseUser,
                trialEndsAt: undefined, 
                isSubscribed: false,
              } as AppUser);
              console.warn(`[FirebaseProvider] User profile not found in Firestore for UID: ${firebaseUser.uid}. Using basic auth data.`);
            }
            console.log(`[FirebaseProvider] Firestore profile data processing complete for UID ${firebaseUser.uid}. Set userProfileLoading to false (path B).`);
            setUserProfileLoading(false);
          }, (error) => {
            console.error(`[FirebaseProvider] Error fetching user profile from Firestore for UID ${firebaseUser.uid}:`, error);
            setUser(firebaseUser as AppUser); // Fallback to basic auth user info on error
            console.log(`[FirebaseProvider] Firestore profile data error for UID ${firebaseUser.uid}. Set userProfileLoading to false (path C).`);
            setUserProfileLoading(false);
          });
          // This unsubscribeSnapshot can be returned by useEffect if firebaseUser changes,
          // but onAuthStateChanged's main unsubscribe handles overall cleanup.
        }
      } else {
        // No firebaseUser (logged out)
        setUser(null);
        console.log(`[FirebaseProvider] No firebaseUser. Set user to null. Set userProfileLoading to false (path D).`);
        setUserProfileLoading(false); // No profile to load if no user
      }
      
      console.log(`[FirebaseProvider] Auth state processing finished for current change. Set auth loading (loading) to false.`);
      setLoading(false); // Auth state processing is complete for this event
    });

    // Cleanup subscription on component unmount
    return () => {
      console.log("[FirebaseProvider] Unsubscribing from onAuthStateChanged.");
      unsubscribeAuth();
    }
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

