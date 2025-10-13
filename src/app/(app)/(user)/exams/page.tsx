
// This is a placeholder redirect. 
// The "Exams" link in the sidebar now points to /dashboard.
// If you want a dedicated /exams page, you can build it here.
// For now, we'll redirect to /dashboard as it lists the exams.

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ExamsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="ml-4">Redirecting to Exam Dashboard...</p>
    </div>
  );
}

