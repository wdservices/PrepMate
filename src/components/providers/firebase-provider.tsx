
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService, db as dbFromFirebaseTs } from "@/lib/firebase"; 
import { doc, getDoc, onSnapshot, enableNetwork, disableNetwork, terminate, getFirestore, Firestore } from "firebase/firestore";
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
  const [localDbInstance, setLocalDbInstance] = useState<Firestore | null>(dbFromFirebaseTs);


  useEffect(() => {
    console.log("[FirebaseProvider] useEffect triggered. Browser online:", navigator.onLine);
    console.log("[FirebaseProvider] Initial db object from firebase.ts:", dbFromFirebaseTs ? "dbFromFirebaseTs object exists" : "dbFromFirebaseTs object is NULL");
    console.log("[FirebaseProvider] Initial auth service from firebase.ts:", firebaseAuthService ? "auth service exists" : "auth service is NULL");

    if (!firebaseAuthService) {
      console.error("[FirebaseProvider] CRITICAL: Firebase Auth service is NOT available. Auth features will be disabled.");
      setLoading(false);
      setUserProfileLoading(false);
      return;
    }

    let currentDb = dbFromFirebaseTs;
    if (!currentDb) {
        console.warn("[FirebaseProvider] dbFromFirebaseTs is NULL. Attempting to get a fresh Firestore instance via getFirestore().");
        try {
            currentDb = getFirestore(); 
            if (currentDb) {
                console.log("[FirebaseProvider] Successfully got a fresh Firestore instance. This will be used for network operations if Firestore is re-enabled.");
                setLocalDbInstance(currentDb); 
            } else {
                console.error("[FirebaseProvider] getFirestore() also returned null. Firestore is not available.");
            }
        } catch(e) {
            console.error("[FirebaseProvider] Error calling getFirestore():", e);
            currentDb = null; 
        }
    } else {
      setLocalDbInstance(currentDb);
    }
    
    // Attempt to enable network only if db instance is valid
    // This might still log errors if Firestore backend is deleted, but won't prevent Auth.
    if (currentDb) {
      console.log("[FirebaseProvider] Valid db instance present. Attempting to enable Firestore network (may fail if DB deleted)...");
      enableNetwork(currentDb)
        .then(() => {
          console.log("[FirebaseProvider] Firestore network explicitly enabled (or was already enabled).");
        })
        .catch((error) => {
          console.warn("[FirebaseProvider] Warning: Error explicitly enabling Firestore network (this is expected if DB was deleted):", error.code, error.message);
          if (error.code === 'failed-precondition' && error.message.includes("Failed to obtain exclusive WebAssembly build lock")) {
            console.warn("[FirebaseProvider] Firestore 'failed-precondition' (WebAssembly lock) often means multiple Firestore instances are conflicting or SDK is not fully loaded.");
          } else if (error.code === 'unimplemented') {
            console.warn("[FirebaseProvider] Firestore 'unimplemented' error likely means the Firestore database doesn't exist or isn't configured for this project ID.");
          }
        });
    } else {
      console.warn("[FirebaseProvider] No valid Firestore 'db' instance available. Firestore operations will fail (expected if DB deleted).");
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
      const dbToDisable = localDbInstance || dbFromFirebaseTs;
      if (dbToDisable) {
        disableNetwork(dbToDisable)
          .then(() => console.log("[FirebaseProvider] Firestore network explicitly disabled on cleanup (attempted)."))
          .catch(err => console.warn("[FirebaseProvider] Warning: Error disabling Firestore network on cleanup (expected if DB was deleted):", err.code, err.message));
      } else {
         console.warn("[FirebaseProvider] No valid db instance was available during cleanup to attempt disabling network.");
      }
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
