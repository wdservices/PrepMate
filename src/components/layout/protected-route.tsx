
"use client";

import type { ReactNode } from "react";
import { useAuth } from "@/components/providers/firebase-provider"; 
import { useRouter, usePathname } from "next/navigation"; 
import { useEffect } from "react"; 
import { Loader2 } from "lucide-react"; 

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, userProfileLoading } = useAuth(); 
  const router = useRouter(); 
  const pathname = usePathname();

  console.log(`[ProtectedRoute] Path: ${pathname}, Auth Loading: ${loading}, Profile Loading: ${userProfileLoading}, User: ${user ? user.uid : 'null'}`);

  useEffect(() => { 
    // If auth loading and profile loading are complete, and there's still no user, then redirect.
    if (!loading && !userProfileLoading && !user) {
      const redirectUrl = `/auth/login?redirect=${encodeURIComponent(pathname)}`;
      console.log(`[ProtectedRoute] Effect: No user & all loading complete. Redirecting to: ${redirectUrl}`);
      router.push(redirectUrl);
    } else if (!loading && !userProfileLoading && user) {
      console.log(`[ProtectedRoute] Effect: User is present and all loading complete. Access granted for path: ${pathname}`);

      // Role-based access control for admin pages
      if (pathname.startsWith('/admin') && user.role !== 'admin') {
        console.warn(`[ProtectedRoute] User ${user.uid} (role: ${user.role || 'none'}) attempted to access admin page: ${pathname}. Redirecting to dashboard.`);
        router.replace('/dashboard');
      }

    } else {
      console.log(`[ProtectedRoute] Effect: Still loading (Auth: ${loading}, Profile: ${userProfileLoading}) or user state indeterminate. Path: ${pathname}, User: ${user ? user.uid : 'null'}`);
    }
  }, [user, loading, userProfileLoading, router, pathname]);

  if (loading || userProfileLoading) { 
    console.log(`[ProtectedRoute] Render: Auth or Profile loading is true. Showing loader for path: ${pathname}. AuthLoading: ${loading}, ProfileLoading: ${userProfileLoading}`);
    return (
      <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) { 
    console.log(`[ProtectedRoute] Render: No user (and all loading complete). Showing loader (will be redirected by effect) for path: ${pathname}`);
    return (
       <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  console.log(`[ProtectedRoute] Render: User is present and all loading complete. Rendering children for path: ${pathname}`);
  return <>{children}</>;
}
