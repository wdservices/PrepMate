
import { AuthForm } from "@/components/auth/auth-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Welcome back</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Enter your credentials to access your account.
      </p>
      <AuthForm mode="login" />
    </div>
  );
}
