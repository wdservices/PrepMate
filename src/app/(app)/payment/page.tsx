
"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, CreditCard } from 'lucide-react';
import { useAuth } from '@/components/providers/firebase-provider';
import { useToast } from '@/hooks/use-toast';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const examIdQuery = searchParams.get('examId');
  const amount = 1500; 
  const currency = 'NGN';
  
  // Generate a unique transaction reference for each payment attempt
  const tx_ref = `PrepMate-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  // It's crucial to use the public key from your environment variables for security and flexibility.
  // Fallback to the example key only if the env var is not set (useful for initial dev/test if .env isn't configured)
  const flutterwavePublicKey = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X"; 
  
  const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002');
  const redirect_url = `${appBaseUrl}/payment-status`; // Your callback URL

  useEffect(() => {
    if (!authLoading && !user) {
      // If auth is done loading and there's no user, redirect to login
      // Preserve the original intent if any (e.g., trying to access a specific exam)
      const loginRedirectPath = `/auth/login?redirect=/payment${examIdQuery ? `?examId=${examIdQuery}` : ''}`;
      console.log(`[PaymentPage] No user found. Redirecting to login: ${loginRedirectPath}`);
      router.replace(loginRedirectPath);
    }

    // Check if the public key from .env looks like a placeholder or is missing
    if (process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY && 
        (process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY.includes("YOUR_ACTUAL_") || 
         process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY.includes("_HERE") ||
         process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY.trim() === "" ||
         (!process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY.startsWith("FLWPUBK_TEST-") && !process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY.startsWith("FLWPUBK-")))
       ) {
      console.warn("[PaymentPage] Flutterwave Public Key from .env (NEXT_PUBLIC_FLW_PUBLIC_KEY) appears to be a placeholder or invalid. Using the hardcoded fallback/example key for this submission. Ensure it's correctly set in your .env file for live payments.");
      toast({
          title: "Payment Configuration Hint",
          description: "Using a fallback Flutterwave public key. Set NEXT_PUBLIC_FLW_PUBLIC_KEY in .env.",
          variant: "default"
      });
    } else if (!process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY) {
        console.warn("[PaymentPage] NEXT_PUBLIC_FLW_PUBLIC_KEY is not set in .env. Using the hardcoded fallback/example key for this submission. Ensure it's correctly set for live payments.");
        toast({
          title: "Payment Configuration Missing",
          description: "Flutterwave public key missing from .env. Using fallback.",
          variant: "default"
      });
    }
  }, [user, authLoading, router, examIdQuery, toast]); // Removed flutterwavePublicKey from deps as it's derived


  if (authLoading || !user) { 
    // Show loader if auth is still loading or if there's no user (before redirect effect kicks in)
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading payment details...</p>
      </div>
    );
  }

  // If user details are available, render the payment form
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CreditCard className="mx-auto h-12 w-12 text-primary mb-3" />
          <CardTitle className="text-2xl">Complete Your Payment</CardTitle>
          <CardDescription>
            Access PrepMate {examIdQuery ? `content for exam ${examIdQuery.toUpperCase()}` : 'premium features'} by completing your payment.
            Your order is {currency} {amount.toLocaleString()}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* This form posts directly to Flutterwave */}
          <form method="POST" action="https://checkout.flutterwave.com/v3/hosted/pay">
            {/* --- Required Fields --- */}
            <input type="hidden" name="public_key" value={flutterwavePublicKey} />
            <input type="hidden" name="customer[email]" value={user.email || 'anonymous@prepmate.com'} /> 
            <input type="hidden" name="customer[name]" value={user.displayName || 'PrepMate User'} />
            <input type="hidden" name="tx_ref" value={tx_ref} />
            <input type="hidden" name="amount" value={String(amount)} />
            <input type="hidden" name="currency" value={currency} />
            <input type="hidden" name="redirect_url" value={redirect_url} />

            {/* --- Optional but Recommended Fields --- */}
            <input type="hidden" name="payment_options" value="card,ussd,banktransfer" /> 
            
            {/* --- Meta Fields for your own tracking --- */}
            <input type="hidden" name="meta[source]" value="PrepMate-WebApp-HTML-Form" />
            <input type="hidden" name="meta[user_id]" value={user.uid} />
            {examIdQuery && <input type="hidden" name="meta[exam_id]" value={examIdQuery} />}
            
            {/* You can add more meta fields as needed e.g. <input type="hidden" name="meta[token]" value="some_tracking_token" /> */}

            {/* --- Customizations (Optional - check Flutterwave docs for full list) --- */}
            {/* <input type="hidden" name="customizations[title]" value="PrepMate Subscription" /> */}
            {/* <input type="hidden" name="customizations[description]" value={`Payment for PrepMate access. Amount: ${currency} ${amount.toLocaleString()}`} /> */}
            {/* <input type="hidden" name="customizations[logo]" value={`${appBaseUrl}/images/prepmate-logo.png`} /> */}

            <p className="text-xs text-muted-foreground text-center mt-4">
              You will be redirected to Flutterwave's secure payment gateway.
              By clicking "Pay Now", you agree to PrepMate's terms and conditions.
            </p>
            
            {/* The Submit Button */}
            <button 
              type="submit" 
              id="start-payment-button" // ID from your CSS example
              // Apply Tailwind classes to match the provided CSS
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-md px-6 py-3 flex items-center justify-center gap-2 transition-all duration-100 ease-in"
            >
              <CreditCard className="h-5 w-5" />
              Pay Now
            </button>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-center">
           <Button variant="link" onClick={() => router.back()} className="mt-6 text-muted-foreground">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
