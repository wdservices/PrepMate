
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
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const formSchemaBase = {
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
};

const signUpSchema = z.object({
  ...formSchemaBase,
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

const loginSchema = z.object(formSchemaBase);

type AuthFormProps = {
  mode: "login" | "signup";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const currentSchema = mode === "signup" ? signUpSchema : loginSchema;
  type FormValues = z.infer<typeof currentSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(currentSchema),
    defaultValues: mode === "signup" ? { name: "", email: "", password: "" } : { email: "", password: "" },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    try {
      if (mode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        if (userCredential.user && 'name' in values && values.name) {
          await updateProfile(userCredential.user, { displayName: values.name });
        }
        toast({ title: "Account Created", description: `Welcome to ${siteConfig.name}!` });
      } else {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        toast({ title: "Logged In", description: "Welcome back!" });
      }
      const redirectUrl = searchParams.get('redirect') || '/dashboard';
      router.push(redirectUrl);
    } catch (error: any) {
      console.error(`${mode} failed:`, error);
      toast({
        title: `${mode === "signup" ? "Sign Up" : "Login"} Failed`,
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {mode === "signup" && (
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
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "signup" ? "Create Account" : "Login"}
        </Button>
        
        {mode === "login" && (
          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        )}
        {mode === "signup" && (
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Login
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
}
