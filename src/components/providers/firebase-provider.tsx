
"use client";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

interface FirebaseContextProps {
  user: User | null;
  loading: boolean;
}

const FirebaseContext = createContext<FirebaseContextProps | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading && typeof window !== 'undefined' && window.location.pathname.startsWith('/auth')) {
     // Don't show global loader for auth pages, they handle their own loading state
  } else if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <FirebaseContext.Provider value={{ user, loading }}>
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
