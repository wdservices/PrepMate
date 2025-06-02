
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
        if (firebaseUser) {
          setUserProfileLoading(true);
          if (!db) {
            console.warn(
              "FirebaseProvider: Firestore (db) is not initialized. Skipping user profile fetching. User-specific data like trial/subscription status will be unavailable."
            );
            setUser(firebaseUser as AppUser); // Set user with basic auth data
            setUserProfileLoading(false); // Indicate profile loading (attempt) is complete
            setLoading(false); // Auth loading is also complete
            return;
          }

          const userRef = doc(db, "users", firebaseUser.uid);
          
          const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
              const profileData = docSnap.data();
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
              console.warn(`FirebaseProvider: User profile not found in Firestore for UID: ${firebaseUser.uid}. Using basic auth data.`);
            }
            setUserProfileLoading(false);
          }, (error) => {
            console.error("FirebaseProvider: Error fetching user profile from Firestore:", error);
            setUser(firebaseUser as AppUser); // Fallback to just auth user data
            setUserProfileLoading(false);
          });
          // This inner unsubscribe is tricky. Typically, you'd return it from the onAuthStateChanged callback
          // But onAuthStateChanged itself returns its own unsubscriber.
          // For simplicity, we'll rely on onAuthStateChanged's cleanup.
          // If firebaseUser becomes null, a new path is taken.

        } else {
          setUser(null);
          setUserProfileLoading(false);
        }
        setLoading(false); 
      });
      return () => unsubscribeAuth();
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

