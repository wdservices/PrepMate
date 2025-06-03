
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
    if (firebaseAuthService) {
      const unsubscribeAuth = onAuthStateChanged(firebaseAuthService, async (firebaseUser) => {
        console.log(`[FirebaseProvider] onAuthStateChanged triggered. firebaseUser: ${firebaseUser ? firebaseUser.uid : 'null'}`);
        if (firebaseUser) {
          setUserProfileLoading(true); // Set profile loading to true when auth state changes and user exists
          console.log(`[FirebaseProvider] firebaseUser detected (UID: ${firebaseUser.uid}). Set userProfileLoading to true. Fetching profile...`);

          if (!db) {
            console.warn(
              "[FirebaseProvider] Firestore (db) is not initialized. Skipping user profile fetching. User-specific data like trial/subscription status will be unavailable."
            );
            setUser(firebaseUser as AppUser); 
            console.log(`[FirebaseProvider] Firestore (db) not initialized. Set userProfileLoading to false.`);
            setUserProfileLoading(false); 
            setLoading(false); 
            return;
          }

          const userRef = doc(db, "users", firebaseUser.uid);
          
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
              setUser({
                ...firebaseUser,
                trialEndsAt: undefined, 
                isSubscribed: false,
              } as AppUser);
              console.warn(`[FirebaseProvider] User profile not found in Firestore for UID: ${firebaseUser.uid}. Using basic auth data.`);
            }
            console.log(`[FirebaseProvider] Firestore profile data processing complete. Set userProfileLoading to false.`);
            setUserProfileLoading(false);
          }, (error) => {
            console.error("[FirebaseProvider] Error fetching user profile from Firestore:", error);
            setUser(firebaseUser as AppUser); 
            console.log(`[FirebaseProvider] Firestore profile data error. Set userProfileLoading to false.`);
            setUserProfileLoading(false);
          });
          // Note: unsubscribeSnapshot should ideally be returned and handled if firebaseUser changes/logs out before it fires,
          // but for this structure, onAuthStateChanged's main unsubscribe handles overall cleanup.

        } else {
          setUser(null);
          console.log(`[FirebaseProvider] No firebaseUser. Set user to null. Set userProfileLoading to false.`);
          setUserProfileLoading(false);
        }
        console.log(`[FirebaseProvider] Auth state processing finished. Set auth loading (loading) to false.`);
        setLoading(false); 
      });
      return () => {
        console.log("[FirebaseProvider] Unsubscribing from onAuthStateChanged.");
        unsubscribeAuth();
      }
    } else {
      console.warn("FirebaseProvider: Firebase Auth service is not available. Auth features will be disabled.");
      setUser(null);
      setLoading(false);
      setUserProfileLoading(false);
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
