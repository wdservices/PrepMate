
import { AuthForm } from "@/components/auth/auth-form";
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthForm initialMode="login" />
    </Suspense>
  );
}
