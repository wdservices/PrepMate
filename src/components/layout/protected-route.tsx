
"use client";

import type { ReactNode } from "react";
// import { useAuth } from "@/components/providers/firebase-provider"; // Not needed for now
// import { useRouter } from "next/navigation"; // Not needed for now
// import { useEffect } from "react"; // Not needed for now
// import { Loader2 } from "lucide-react"; // Not needed for now

export function ProtectedRoute({ children }: { children: ReactNode }) {
  // const { user, loading } = useAuth(); // Temporarily disabled
  // const router = useRouter(); // Temporarily disabled

  // useEffect(() => { // Temporarily disabled
  //   if (!loading && !user) {
  //     router.push("/auth/login?redirect=" + encodeURIComponent(window.location.pathname + window.location.search));
  //   }
  // }, [user, loading, router]);

  // if (loading) { // Temporarily disabled
  //   return (
  //     <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
  //       <Loader2 className="h-10 w-10 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  // if (!user) { // Temporarily disabled
  //   return (
  //      <div className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center">
  //       <Loader2 className="h-10 w-10 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  // Authentication is temporarily bypassed.
  return <>{children}</>;
}
