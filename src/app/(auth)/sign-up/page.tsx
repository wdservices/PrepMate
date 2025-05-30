
import { AuthForm } from "@/components/auth/auth-form";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
};

export default function SignUpPage() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Create an account</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Enter your details to get started with ExamAI Prep.
      </p>
      <AuthForm mode="signup" />
    </div>
  );
}
