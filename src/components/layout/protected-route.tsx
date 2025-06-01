
"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/components/providers/firebase-provider"; 
import { useRouter, usePathname } from "next/navigation"; 
import { useEffect } from "react"; 
import { Loader2 } from "lucide-react"; 

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth(); 
  const router = useRouter(); 
  const pathname = usePathname();

  useEffect(() => { 
    if (!loading && !user) {
      const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      router.push(redirectUrl);
    }
  }, [user, loading, router, pathname]);

  if (loading) { 
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) { 
    // This state might be brief before the useEffect redirect kicks in,
    // or if the redirect is slow. Showing a loader is a good UX.
    return (
       <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
