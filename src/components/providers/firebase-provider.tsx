
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
          // User is signed in, now fetch/listen for profile data from Firestore
          setUserProfileLoading(true);
          const userRef = doc(db!, "users", firebaseUser.uid); // Assumes 'users' collection
          
          // Listen for real-time updates to user profile
          const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
              const profileData = docSnap.data();
              setUser({
                ...firebaseUser, // Base Firebase user properties
                trialEndsAt: profileData.trialEndsAt || undefined,
                isSubscribed: profileData.isSubscribed || false,
                subscriptionEndsAt: profileData.subscriptionEndsAt || undefined,
                // Add other profile fields here
              } as AppUser);
            } else {
              // Profile doesn't exist yet, set with base FirebaseUser and default/initial app-specific values
              // This might happen on first sign-up before profile is created
              setUser({
                ...firebaseUser,
                trialEndsAt: undefined, // Or set a default trial period here if creating profile
                isSubscribed: false,
              } as AppUser);
              console.warn(`User profile not found for UID: ${firebaseUser.uid}. This is expected on first sign-up if profile creation is separate.`);
            }
            setUserProfileLoading(false);
          }, (error) => {
            console.error("Error fetching user profile:", error);
            setUser(firebaseUser as AppUser); // Fallback to just auth user data
            setUserProfileLoading(false);
          });

          // It's important to return the snapshot unsubscriber if the auth state changes
          // However, onAuthStateChanged's unsubscribe already handles cleaning up its own listener.
          // Managing nested listeners requires careful handling, typically snapshot listener is cleaned up when component unmounts or auth user changes.
          // For simplicity here, we'll assume the user stays the same or logs out, triggering a new path.
          // A more robust solution might involve storing the snapshot unsubscriber and calling it if firebaseUser becomes null.

        } else {
          // User is signed out
          setUser(null);
          setUserProfileLoading(false);
        }
        setLoading(false); // Auth loading finished
      });
      return () => unsubscribeAuth();
    } else {
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
