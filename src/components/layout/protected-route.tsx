
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

  console.log(`[ProtectedRoute] Path: ${pathname}, Auth Loading: ${loading}, User: ${user ? user.uid : 'null'}`);

  useEffect(() => { 
    if (!loading && !user) {
      const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      console.log(`[ProtectedRoute] Effect: No user & not loading. Redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    } else if (!loading && user) {
      console.log(`[ProtectedRoute] Effect: User is present and not loading. Access granted for path: ${pathname}`);
    } else {
      console.log(`[ProtectedRoute] Effect: Still loading or user state indeterminate. Path: ${pathname}, Auth Loading: ${loading}, User: ${user ? user.uid : 'null'}`);
    }
  }, [user, loading, router, pathname]);

  if (loading) { 
    console.log(`[ProtectedRoute] Render: Auth loading is true. Showing loader for path: ${pathname}`);
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) { 
    console.log(`[ProtectedRoute] Render: No user (and not loading). Showing loader (or will be redirected shortly) for path: ${pathname}`);
    return (
       <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  console.log(`[ProtectedRoute] Render: User is present. Rendering children for path: ${pathname}`);
  return <>{children}</>;
}
