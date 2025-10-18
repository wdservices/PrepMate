
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { auth as firebaseAuth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";
import { Loader2, AlertTriangle, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchemaBase = {
  email: z.string().email({ message: "Invalid email address." }),
};

const signUpSchema = z.object({
  ...formSchemaBase,
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const loginSchema = z.object({
  ...formSchemaBase,
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const forgotPasswordSchema = z.object(formSchemaBase);

// Use a single, comprehensive type for the form values based on the sign-up schema,
// which includes all possible fields. This ensures all fields are controlled from the start.
type FormValues = z.infer<typeof signUpSchema>;


type AuthFormProps = {
  initialMode?: "login" | "signup";
};

export function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthDisabled, setIsAuthDisabled] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup" | "forgotPassword">(initialMode);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!firebaseAuth) {
      setIsAuthDisabled(true);
      toast({
        title: "Authentication Service Not Ready",
        description: "Firebase authentication is not initialized. Please check console logs from firebase.ts and ensure your Firebase config is correct.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const currentSchema =
    authMode === "signup" ? signUpSchema :
    authMode === "login" ? loginSchema :
    forgotPasswordSchema;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema) as any,
    // Initialize all possible form fields with a default value to make them controlled.
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Reset the form when the auth mode changes to clear previous inputs.
  useEffect(() => {
    form.reset({
      name: "",
      email: "",
      password: "",
    });
    setShowPassword(false);
  }, [authMode, form]);


  async function onSubmit(values: FormValues) {
    if (!firebaseAuth) {
      toast({
        title: "Authentication Service Unavailable",
        description: "PrepMate's authentication system is not ready. Please check Firebase configuration and ensure all services are running.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    console.log(`[AuthForm] Starting ${authMode} process...`);
    try {
      if (authMode === "signup") {
        const { name, email, password } = values as z.infer<typeof signUpSchema>;
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        if (userCredential.user && name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
        toast({ title: "Account Created", description: `Welcome to ${siteConfig.name}!` });
        const redirectUrl = searchParams?.get('redirect') || '/dashboard';
        console.log(`[AuthForm] Signup successful. Attempting to redirect to: ${redirectUrl}`);
        router.replace(redirectUrl);
        console.log(`[AuthForm] router.replace(${redirectUrl}) called after signup.`);
      } else if (authMode === "login") {
        const { email, password } = values as z.infer<typeof loginSchema>;
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const idTokenResult = await userCredential.user.getIdTokenResult(true);
        const role = idTokenResult.claims.role as 'admin' | 'student' | undefined;

        toast({ title: "Logged In", description: "Welcome back!" });

        let redirectUrl = searchParams?.get('redirect') || '/dashboard';
        if (role === 'admin') {
          redirectUrl = '/admin';
        }

        console.log(`[AuthForm] Login successful. User role: ${role}. Calculated redirectUrl: ${redirectUrl}. Attempting redirect...`);
        router.replace(redirectUrl);
        console.log(`[AuthForm] router.replace(${redirectUrl}) called after login.`);
      } else if (authMode === "forgotPassword") {
        const { email } = values as z.infer<typeof forgotPasswordSchema>;
        await sendPasswordResetEmail(firebaseAuth, email);
        toast({
          title: "Password Reset Email Sent",
          description: "If an account exists for this email, a password reset link has been sent."
        });
        setAuthMode("login");
      }
    } catch (error: any) {
      console.error(`[AuthForm] ${authMode} failed:`, error);
      let errorMessage = error.message || "An unexpected error occurred.";
      if (error.code === 'auth/invalid-credential' && authMode === 'login') {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.code === 'auth/email-already-in-use' && authMode === 'signup') {
        errorMessage = "This email is already registered. Please try logging in.";
      } else if (error.code === 'auth/user-not-found' && (authMode === 'login' || authMode === 'forgotPassword')) {
        errorMessage = "No account found with this email. Please sign up or check your email.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many login attempts. Please try again later or reset your password.";
      }
      toast({
        title:
          authMode === "signup" ? "Sign Up Failed" :
          authMode === "login" ? "Login Failed" :
          "Password Reset Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      console.log(`[AuthForm] ${authMode} process finished.`);
    }
  }

  if (isAuthDisabled && authMode !== "forgotPassword") {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Authentication System Offline</AlertTitle>
        <AlertDescription>
          The login and sign-up features are temporarily unavailable. This usually means there's an issue with the Firebase configuration or service. Please check your .env file and Firebase console settings. Reload the page after corrections.
        </AlertDescription>
      </Alert>
    );
  }

  const renderTitleAndDescription = () => {
    if (authMode === 'login') {
      return {
        title: 'Welcome back',
        description: 'Enter your credentials to access your account.'
      };
    }
    if (authMode === 'signup') {
      return {
        title: 'Create an account',
        description: `Enter your details to get started with ${siteConfig.name}.`
      };
    }
    if (authMode === 'forgotPassword') {
      return {
        title: 'Reset Password',
        description: 'Enter your email address to receive a password reset link.'
      };
    }
    return { title: '', description: ''};
  };

  const { title, description } = renderTitleAndDescription();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mb-6 text-sm text-muted-foreground">
            {description}
        </p>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {authMode === "signup" && (
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                    <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            )}
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            {(authMode === "login" || authMode === "signup") && (
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                        <FormControl>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="pr-10"
                        />
                        </FormControl>
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-auto p-1 text-muted-foreground hover:text-foreground"
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                    </div>
                    <FormMessage />
                </FormItem>
                )}
            />
            )}
            <Button type="submit" className="w-full" disabled={isLoading || (isAuthDisabled && authMode !== "forgotPassword")}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {authMode === "signup" ? "Create Account" :
             authMode === "login" ? "Login" :
             "Send Reset Link"}
            </Button>

            {authMode === "login" && (
            <div className="text-sm text-muted-foreground text-center space-y-2">
                <p>
                Don&apos;t have an account?{" "}
                <Button variant="link" type="button" onClick={() => setAuthMode("signup")} className="p-0 h-auto font-medium text-primary hover:underline">
                    Sign up
                </Button>
                </p>
                <p>
                <Button variant="link" type="button" onClick={() => setAuthMode("forgotPassword")} className="p-0 h-auto font-medium text-primary hover:underline">
                    Forgot Password?
                </Button>
                </p>
            </div>
            )}
            {authMode === "signup" && (
            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Button variant="link" type="button" onClick={() => setAuthMode("login")} className="p-0 h-auto font-medium text-primary hover:underline">
                Login
                </Button>
            </p>
            )}
            {authMode === "forgotPassword" && (
            <p className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Button variant="link" type="button" onClick={() => setAuthMode("login")} className="p-0 h-auto font-medium text-primary hover:underline">
                Login
                </Button>
            </p>
            )}
        </form>
        </Form>
    </div>
  );
}
