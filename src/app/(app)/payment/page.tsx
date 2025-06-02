
"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button'; // We'll use this for consistent styling if possible, or a raw button
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, CreditCard, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/components/providers/firebase-provider';
import { useToast } from '@/hooks/use-toast';
// import type { Metadata } from 'next'; // Metadata is for Server Components

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const examIdQuery = searchParams.get('examId');
  const amount = 1500; // NGN - Corrected price
  const currency = 'NGN';
  
  // Generate a unique transaction reference for each payment attempt
  // For production, a more robust unique ID from backend might be preferred.
  const tx_ref = `PrepMate-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const flutterwavePublicKey = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY || "FLWPUBK_TEST-02b9b5fc6406bd4a41c3ff141cc45e93-X"; // Fallback to your example key
  
  const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002');
  const redirect_url = `${appBaseUrl}/payment-status`;

  useEffect(() => {
    if (!authLoading && !user) {
      const loginRedirectPath = `/auth/login?redirect=/payment${examIdQuery ? `?examId=${examIdQuery}` : ''}`;
      router.replace(loginRedirectPath);
    }
    if (!flutterwavePublicKey.startsWith("FLWPUBK_TEST-") && !flutterwavePublicKey.startsWith("FLWPUBK-")) {
        console.warn("[PaymentPage] Flutterwave Public Key might be missing or invalid from .env. NEXT_PUBLIC_FLW_PUBLIC_KEY. Using a fallback/example key.");
        toast({
            title: "Payment Configuration Issue",
            description: "Flutterwave public key seems to be missing or invalid. Please check configuration.",
            variant: "destructive"
        });
    }
  }, [user, authLoading, router, examIdQuery, toast, flutterwavePublicKey]);


  if (authLoading || !user) { // Wait for auth and user object
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading payment details...</p>
      </div>
    );
  }

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
          <form method="POST" action="https://checkout.flutterwave.com/v3/hosted/pay">
            {/* Static and Dynamic Hidden Fields */}
            <input type="hidden" name="public_key" value={flutterwavePublicKey} />
            <input type="hidden" name="customer[email]" value={user.email || 'anonymous@prepmate.com'} />
            <input type="hidden" name="customer[name]" value={user.displayName || 'PrepMate User'} />
            <input type="hidden" name="tx_ref" value={tx_ref} />
            <input type="hidden" name="amount" value={String(amount)} />
            <input type="hidden" name="currency" value={currency} />
            <input type="hidden" name="redirect_url" value={redirect_url} />
            <input type="hidden" name="meta[source]" value="PrepMate-WebApp" />
            <input type="hidden" name="meta[user_id]" value={user.uid} />
            {examIdQuery && <input type="hidden" name="meta[exam_id]" value={examIdQuery} />}
            {/* Customizations can be added here if supported by standard form post */}
            {/* e.g., 
            <input type="hidden" name="customizations[title]" value="PrepMate Subscription" />
            <input type="hidden" name="customizations[description]" value="Access to all exam materials." />
            <input type="hidden" name="customizations[logo]" value={`${appBaseUrl}/images/prepmate-logo.png`} />
            */}

            <p className="text-xs text-muted-foreground text-center mt-4">
              You will be redirected to Flutterwave's secure payment gateway.
              By clicking "Pay Now", you agree to PrepMate's terms and conditions.
            </p>
            
            <Button 
              type="submit" 
              id="start-payment-button"
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-md px-6 py-2.5 transition-all duration-100 ease-in"
              // Applying styles from the CSS directly using Tailwind
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Pay Now ({currency} {amount.toLocaleString()})
            </Button>
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
