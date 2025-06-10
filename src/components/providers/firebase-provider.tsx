
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService, db as dbFromFirebaseTs } from "@/lib/firebase"; // Renamed imported db
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
            currentDb = getFirestore(); // Re-uses initialized app if available
            if (currentDb) {
                console.log("[FirebaseProvider] Successfully got a fresh Firestore instance. This will be used for network operations.");
                setLocalDbInstance(currentDb); // Store it for potential use by other components if needed
            } else {
                console.error("[FirebaseProvider] getFirestore() also returned null. Firestore is not available.");
            }
        } catch(e) {
            console.error("[FirebaseProvider] Error calling getFirestore():", e);
            currentDb = null; // Ensure it's null if getFirestore fails
        }
    } else {
      setLocalDbInstance(currentDb); // It was already good
    }

    if (currentDb) {
      console.log("[FirebaseProvider] Valid db instance present. Attempting to enable Firestore network...");
      enableNetwork(currentDb)
        .then(() => {
          console.log("[FirebaseProvider] Firestore network explicitly enabled successfully.");
        })
        .catch((error) => {
          console.error("[FirebaseProvider] Error explicitly enabling Firestore network:", error);
          if (error.code === 'failed-precondition' && error.message.includes("Failed to obtain exclusive WebAssembly build lock")) {
            console.warn("[FirebaseProvider] Firestore 'failed-precondition' (WebAssembly lock) often means multiple Firestore instances are conflicting or SDK is not fully loaded. This can happen with fast refreshes or if multiple tabs are initializing Firestore simultaneously.");
          }
        });
    } else {
      console.error("[FirebaseProvider] CRITICAL: No valid Firestore 'db' instance available after checks. Firestore operations WILL FAIL.");
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
        
        setUser(firebaseUser as AppUser); 
        setUserProfileLoading(false); 
        console.log("[FirebaseProvider] Set user from auth, userProfileLoading set to false (profile fetch is simplified/bypassed).");

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
          .then(() => console.log("[FirebaseProvider] Firestore network explicitly disabled on cleanup."))
          .catch(err => console.error("[FirebaseProvider] Error disabling Firestore network on cleanup:", err));
      } else {
         console.warn("[FirebaseProvider] No valid db instance was available during cleanup to disable network.");
      }
    };
  }, []); // Empty dependency array: run once on mount

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
