
"use client";

import { useAuth } from "@/components/providers/firebase-provider";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login?redirect=" + encodeURIComponent(window.location.pathname + window.location.search));
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center"> {/* Adjust height based on navbar */}
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    // router.push is called in useEffect, this is a fallback or initial render before effect.
    // Return null or a minimal loader to prevent flicker if redirection is not immediate.
    return (
       <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
