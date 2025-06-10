
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService, db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot, enableNetwork, disableNetwork, terminate } from "firebase/firestore";
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
  const [userProfileLoading, setUserProfileLoading] = useState(true); // Keep true initially

  useEffect(() => {
    console.log("[FirebaseProvider] useEffect triggered. Browser online:", navigator.onLine);
    console.log("[FirebaseProvider] Auth service available:", !!firebaseAuthService, "DB service available:", !!db);

    if (!firebaseAuthService) {
      console.error("[FirebaseProvider] CRITICAL: Firebase Auth service is NOT available. Auth features will be disabled.");
      setLoading(false);
      setUserProfileLoading(false);
      return;
    }
    if (!db) {
      console.error("[FirebaseProvider] CRITICAL: Firestore (db) service is NOT available. Firestore operations will fail.");
      // Set profile loading to false if db is not available, as profile can't be fetched
      // setLoading(false); // Auth might still work
      // setUserProfileLoading(false); // Can't load profile
      // return; // Let auth try to proceed
    } else {
      enableNetwork(db)
        .then(() => console.log("[FirebaseProvider] Firestore network explicitly enabled."))
        .catch((error) => console.error("[FirebaseProvider] Error explicitly enabling Firestore network:", error));
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
        // TEMPORARILY SIMPLIFY: Set user directly from auth, bypass Firestore profile for now
        setUser(firebaseUser as AppUser); // Cast, knowing profile data is missing
        setUserProfileLoading(false); // Assume profile "loaded" for this test
        console.log("[FirebaseProvider] TEMPORARY: Set user from auth, userProfileLoading set to false.");

        // ---- ORIGINAL PROFILE FETCHING LOGIC (TEMPORARILY COMMENTED OUT) ----
        // setUserProfileLoading(true);
        // console.log(`[FirebaseProvider] User detected (UID: ${firebaseUser.uid}). Trying to fetch profile. Firestore db object present: ${!!db}`);
        // if (!db) {
        //   console.warn(`[FirebaseProvider] Firestore (db) is null inside onAuthStateChanged for UID: ${firebaseUser.uid}, cannot fetch profile.`);
        //   setUser(firebaseUser as AppUser);
        //   setUserProfileLoading(false);
        //   console.log(`[FirebaseProvider] Firestore (db) was null. Set userProfileLoading to false (Path X).`);
        // } else {
        //   const userRef = doc(db, "users", firebaseUser.uid);
        //   console.log(`[FirebaseProvider] Setting up Firestore onSnapshot listener for user profile: users/${firebaseUser.uid}`);
        //   const unsubscribeSnapshot = onSnapshot(userRef,
        //     (docSnap) => {
        //       console.log(`[FirebaseProvider] onSnapshot for users/${firebaseUser.uid} triggered. Doc exists: ${docSnap.exists()}.`);
        //       if (docSnap.exists()) {
        //         const profileData = docSnap.data();
        //         console.log(`[FirebaseProvider] Firestore profile data for UID ${firebaseUser.uid} found:`, profileData);
        //         setUser({
        //           ...firebaseUser,
        //           trialEndsAt: profileData.trialEndsAt || undefined,
        //           isSubscribed: profileData.isSubscribed || false,
        //           subscriptionEndsAt: profileData.subscriptionEndsAt || undefined,
        //         } as AppUser);
        //       } else {
        //         console.warn(`[FirebaseProvider] User profile NOT FOUND in Firestore for UID: ${firebaseUser.uid}. Using basic auth data.`);
        //         setUser({ ...firebaseUser, trialEndsAt: undefined, isSubscribed: false } as AppUser);
        //       }
        //       setUserProfileLoading(false);
        //       console.log(`[FirebaseProvider] Firestore profile data processing complete for UID ${firebaseUser.uid}. Set userProfileLoading to false (Path A).`);
        //     },
        //     (error) => {
        //       console.error(`[FirebaseProvider] Error in onSnapshot for users/${firebaseUser.uid}:`, error);
        //       setUser(firebaseUser as AppUser);
        //       setUserProfileLoading(false);
        //       console.log(`[FirebaseProvider] Error in onSnapshot. Set userProfileLoading to false (Path B).`);
        //     }
        //   );
        //   return () => {
        //     console.log(`[FirebaseProvider] Unsubscribing from Firestore onSnapshot for UID: ${firebaseUser.uid}`);
        //     unsubscribeSnapshot();
        //   };
        // }
        // ---- END OF ORIGINAL PROFILE FETCHING LOGIC ----
      } else {
        console.log("[FirebaseProvider] No user from onAuthStateChanged. Setting user to null.");
        setUser(null);
        setUserProfileLoading(false); // No user, so profile loading is "done"
        console.log(`[FirebaseProvider] No user. Set userProfileLoading to false (Path C).`);
      }
      setLoading(false); // Auth state check is complete
      console.log(`[FirebaseProvider] Auth state processing finished. Set loading (auth loading) to false.`);
    });

    return () => {
      console.log("[FirebaseProvider] Cleaning up: Unsubscribing from onAuthStateChanged.");
      unsubscribeAuth();
      if (db) {
        disableNetwork(db)
          .then(() => console.log("[FirebaseProvider] Firestore network explicitly disabled on cleanup."))
          .catch(err => console.error("[FirebaseProvider] Error disabling Firestore network on cleanup:", err));
      }
    };
  }, []);

  console.log(`[FirebaseProvider] Rendering. Auth Loading: ${loading}, Profile Loading (Simplified): ${userProfileLoading}, User UID: ${user ? user.uid : 'null'}`);
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
