
import { AuthForm } from "@/components/auth/auth-form";
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm initialMode="signup" />
    </Suspense>
  );
}
