
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth as firebaseAuthService } from "@/lib/firebase"; 
import { upsertUserProfile, getUserProfile } from "@/lib/firebase-service";
import type { AppUser } from "@/types";

interface FirebaseContextProps {
  user: AppUser | null;
  loading: boolean;
  userProfileLoading: boolean;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true); // For auth state
  const [userProfileLoading, setUserProfileLoading] = useState(true); // For Firestore profile fetch

  useEffect(() => {
    if (!firebaseAuthService) {
      console.error("[FirebaseProvider] CRITICAL: Firebase Auth service is NOT available.");
      setLoading(false);
      setUserProfileLoading(false);
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(firebaseAuthService, async (firebaseUser: FirebaseUser | null) => {
      console.log(`[FirebaseProvider] onAuthStateChanged fired. FirebaseUser UID: ${firebaseUser ? firebaseUser.uid : 'null'}.`);
      
      if (firebaseUser) {
        setUserProfileLoading(true);
        console.log("[FirebaseProvider] User detected. Upserting and fetching full profile...");
        try {
          // Create or update user profile (e.g., set trial period for new users)
          await upsertUserProfile(firebaseUser.uid, {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          });

          // Fetch the complete user profile from Firestore, which includes custom fields
          const userProfile = await getUserProfile(firebaseUser.uid);

          if (userProfile) {
            // Combine auth data with Firestore data
            const appUser: AppUser = {
              ...firebaseUser, // Core auth properties (uid, email, etc.)
              ...userProfile,  // Custom properties from Firestore (isSubscribed, etc.)
            };
            setUser(appUser);
            console.log("[FirebaseProvider] Full user profile set:", appUser);
          } else {
             // This case is unlikely if upsertUserProfile succeeded, but handle it defensively
             console.warn(`[FirebaseProvider] User profile not found for UID: ${firebaseUser.uid} after upsert. Setting user to auth object only.`);
             setUser(firebaseUser as AppUser);
          }
        } catch (error) {
          console.error("[FirebaseProvider] Error fetching/upserting user profile:", error);
          setUser(firebaseUser as AppUser); // Fallback to auth user object on error
        } finally {
          setUserProfileLoading(false);
          console.log("[FirebaseProvider] User profile loading finished.");
        }
      } else {
        console.log("[FirebaseProvider] No user detected. Clearing state.");
        setUser(null);
        setUserProfileLoading(false);
      }
      setLoading(false); // Auth state loading is finished
      console.log(`[FirebaseProvider] Auth state processing finished. Auth loading: false.`);
    });

    return () => {
      console.log("[FirebaseProvider] Cleaning up: Unsubscribing from onAuthStateChanged.");
      unsubscribeAuth();
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
