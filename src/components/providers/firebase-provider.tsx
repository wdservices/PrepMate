
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService } from "@/lib/firebase"; 
import type { AppUser } from "@/types";

interface FirebaseContextProps {
  user: AppUser | null;
  loading: boolean;
  userProfileLoading: boolean;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfileLoading, setUserProfileLoading] = useState(true); 

  useEffect(() => {
    console.log("[FirebaseProvider] useEffect triggered. Browser online:", navigator.onLine);
    console.log("[FirebaseProvider] Initial auth service from firebase.ts:", firebaseAuthService ? "auth service exists" : "auth service is NULL");

    if (!firebaseAuthService) {
      console.error("[FirebaseProvider] CRITICAL: Firebase Auth service is NOT available. Auth features will be disabled.");
      setLoading(false);
      setUserProfileLoading(false);
      return;
    }

    console.log("[FirebaseProvider] Initializing onAuthStateChanged listener...");
    const unsubscribeAuth = onAuthStateChanged(firebaseAuthService, async (firebaseUser) => {
      console.log(`[FirebaseProvider] onAuthStateChanged fired. FirebaseUser UID: ${firebaseUser ? firebaseUser.uid : 'null'}.`);

      if (firebaseUser) {
        console.log("[FirebaseProvider] User detected by onAuthStateChanged:", {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          emailVerified: firebaseUser.emailVerified,
        });
        
        // Since Firestore is deleted, we simplify profile loading.
        // The AppUser type might have Firestore-dependent fields; for now, just cast.
        setUser(firebaseUser as AppUser); 
        // No actual profile fetch from Firestore needed here anymore if DB is gone.
        setUserProfileLoading(false); 
        console.log("[FirebaseProvider] Set user from auth, userProfileLoading set to false (profile fetch from Firestore is bypassed).");

      } else {
        console.log("[FirebaseProvider] No user from onAuthStateChanged. Setting user to null.");
        setUser(null);
        setUserProfileLoading(false); 
        console.log(`[FirebaseProvider] No user. Set userProfileLoading to false.`);
      }
      setLoading(false); 
      console.log(`[FirebaseProvider] Auth state processing finished for current change. Set auth loading (loading) to false.`);
    });

    return () => {
      console.log("[FirebaseProvider] Cleaning up: Unsubscribing from onAuthStateChanged.");
      unsubscribeAuth();
    };
  }, []); 

  console.log(`[FirebaseProvider] Rendering. Auth Loading: ${loading}, Profile Loading: ${userProfileLoading}, User UID: ${user ? user.uid : 'null'}`);
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
