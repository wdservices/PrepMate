
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, AlertTriangle, ShoppingCart, ExternalLink } from 'lucide-react';
import { useAuth } from '@/components/providers/firebase-provider';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle as AlertTitleComponent } from "@/components/ui/alert";
import Image from 'next/image';

// IMPORTANT: Replace these with your actual Lemon Squeezy Store and Variant IDs
const LEMONSQUEEZY_STORE_ID = "YOUR_STORE_ID"; // e.g., "12345"
const LEMONSQUEEZY_VARIANT_ID = "YOUR_VARIANT_ID"; // e.g., "67890"
// You can find these in your Lemon Squeezy dashboard.

export default function SubscribePage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002');
  // This is the URL Lemon Squeezy will redirect to *after* payment attempt (if configured in product settings).
  // Or, you can pass it in the API call.
  const lemonSqueezyRedirectUrl = `${appBaseUrl}/payment-status/lemonsqueezy`; 


  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);

    if (!user && !authLoading) {
      toast({ title: "Authentication Required", description: "Please log in to subscribe.", variant: "destructive" });
      router.push(`/auth/login?redirect=/subscribe`);
      setIsLoading(false);
      return;
    }
    
    if (LEMONSQUEEZY_STORE_ID === "YOUR_STORE_ID" || LEMONSQUEEZY_VARIANT_ID === "YOUR_VARIANT_ID") {
        setError("Lemon Squeezy Store ID or Variant ID is not configured in src/app/(app)/subscribe/page.tsx. Please update these placeholder values with your actual Lemon Squeezy product details.");
        toast({ title: "Configuration Error", description: "Payment gateway is not fully configured by the developer.", variant: "destructive" });
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch('/api/lemonsqueezy/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            storeId: LEMONSQUEEZY_STORE_ID, 
            variantId: LEMONSQUEEZY_VARIANT_ID,
            customerEmail: user?.email || undefined,
            customerName: user?.displayName || undefined,
            redirectUrl: lemonSqueezyRedirectUrl // Optional: customize redirect
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMsg = responseData.error || responseData.details || `API Error: ${response.status}`;
        console.error("[SubscribePage] API response not OK.", errorMsg, "Details:", responseData);
        setError(`Failed to initiate payment: ${errorMsg}`);
        toast({ title: "Payment Initiation Failed", description: errorMsg, variant: "destructive" });
        setIsLoading(false);
        return;
      }

      if (responseData.checkoutUrl) {
        console.log("[SubscribePage] Lemon Squeezy checkout URL received:", responseData.checkoutUrl);
        toast({ title: "Redirecting to Checkout", description: "You will be redirected to Lemon Squeezy." });
        window.location.href = responseData.checkoutUrl;
      } else {
        console.error("[SubscribePage] Checkout URL not found in API response:", responseData);
        setError("Could not retrieve checkout link. Please try again.");
        toast({ title: "Checkout Link Error", description: "Failed to get checkout link from server.", variant: "destructive" });
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("[SubscribePage] Error during checkout initiation:", err);
      setError(`An unexpected error occurred: ${err.message}`);
      toast({ title: "Checkout Error", description: err.message || "An unexpected error occurred.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  if (authLoading) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading subscription details...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader className="text-center">
           <div className="mx-auto mb-4 h-16 w-48 relative">
            <Image src="https://app.lemonsqueezy.com/img/logo-lemonsqueezy-logotype.svg" alt="Lemon Squeezy Logo" layout="fill" objectFit="contain" data-ai-hint="logo payment gateway"/>
          </div>
          <CardTitle className="text-3xl font-bold">Unlock PrepMate Premium</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Get full access to all exam categories, AI features, and predictive analysis to ace your exams!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitleComponent>Error</AlertTitleComponent>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="bg-primary/5 p-6 rounded-lg border border-primary/20">
            <h3 className="text-xl font-semibold text-primary mb-2">PrepMate Premium Subscription</h3>
            <p className="text-muted-foreground mb-1">One-time payment for full access.</p>
            <p className="text-4xl font-bold text-foreground my-3">
              $XX.XX <span className="text-sm font-normal text-muted-foreground">/ one-time</span> 
            </p>
            <p className="text-xs text-muted-foreground">
                (Please update this price display. The actual price is set in your Lemon Squeezy product.)
            </p>
          </div>

          <Button 
            onClick={handleSubscribe} 
            disabled={isLoading || authLoading}
            className="w-full mt-2 text-lg py-6"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ShoppingCart className="mr-2 h-5 w-5" />
            )}
            Subscribe Now & Get Full Access
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            You will be redirected to Lemon Squeezy's secure checkout.
          </p>
        </CardContent>
        <CardFooter className="flex-col items-center pt-0 pb-6">
           <Button variant="link" onClick={() => router.back()} className="text-muted-foreground text-sm">
            Maybe Later
          </Button>
        </CardFooter>
      </Card>
       <p className="text-center text-xs text-muted-foreground mt-8 max-w-md">
        By subscribing, you agree to our Terms of Service and Privacy Policy.
        Payments are securely processed by Lemon Squeezy.
      </p>
    </div>
  );
}
