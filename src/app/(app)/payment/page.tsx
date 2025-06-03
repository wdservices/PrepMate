
"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, CreditCard, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/components/providers/firebase-provider';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle as AlertTitleComponent } from "@/components/ui/alert"; // Renamed AlertTitle to avoid conflict

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examIdQuery = searchParams.get('examId');
  const amount = 1500; 
  const currency = 'NGN';
  
  const appBaseUrl = typeof window !== 'undefined' ? window.location.origin : (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002');
  // This is the URL Flutterwave will redirect to *after* payment attempt.
  const flutterwaveRedirectUrl = `${appBaseUrl}/payment-status`; 

  useEffect(() => {
    if (!authLoading && !user) {
      const loginRedirectPath = `/auth/login?redirect=/payment${examIdQuery ? `?examId=${examIdQuery}` : ''}`;
      console.log(`[PaymentPage] No user found. Redirecting to login: ${loginRedirectPath}`);
      router.replace(loginRedirectPath);
    }
  }, [user, authLoading, router, examIdQuery]);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);
    console.log("[PaymentPage] handlePayment function started.");

    if (!user) {
      setError("User not authenticated. Please log in again.");
      setIsLoading(false);
      toast({ title: "Authentication Error", description: "User not found.", variant: "destructive" });
      return;
    }

    const paymentDetails = {
      amount: amount,
      currency: currency,
      customerEmail: user.email || 'anonymous@prepmate.com',
      customerName: user.displayName || 'PrepMate User',
      customerPhone: user.phoneNumber || '', // Optional, pass if available
      redirectUrl: flutterwaveRedirectUrl, 
      examId: examIdQuery, // For meta field
      userId: user.uid, // For meta field
      // Add other fields from your Node.js example payload that are client-configurable
      // For instance, customizations (title, logo) can be passed if desired
      customizations: {
        title: `PrepMate: ${examIdQuery ? `Exam ${examIdQuery.toUpperCase()}` : 'Subscription'}`,
        logo: `${appBaseUrl}/images/prepmate-logo.png` // Ensure this logo exists in your public/images folder
      },
      paymentOptions: "card,ussd,banktransfer,mpesa", // Added mpesa as an example
    };

    console.log("[PaymentPage] Initiating payment with details:", paymentDetails);

    try {
      const response = await fetch('/api/flutterwave/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentDetails),
      });

      const responseData = await response.json();
      console.log("[PaymentPage] Response from /api/flutterwave/create-payment:", responseData);

      if (!response.ok) {
        const errorMsg = responseData.error || responseData.message || `API Error: ${response.status}`;
        console.error("[PaymentPage] API response not OK.", errorMsg, "Details:", responseData.details);
        setError(`Failed to initiate payment: ${errorMsg}`);
        toast({ title: "Payment Initiation Failed", description: errorMsg, variant: "destructive" });
        setIsLoading(false);
        return;
      }

      if (responseData.paymentLink && typeof responseData.paymentLink === 'string') {
        console.log("[PaymentPage] Payment link received:", responseData.paymentLink);
        console.log("[PaymentPage] Attempting to redirect to Flutterwave...");
        window.location.href = responseData.paymentLink;
      } else {
        console.error("[PaymentPage] Payment link not found or invalid in API response:", responseData);
        setError("Could not retrieve payment link. Please try again.");
        toast({ title: "Payment Link Error", description: "Failed to get payment link from server.", variant: "destructive" });
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("[PaymentPage] Error during payment initiation or redirection:", err);
      setError(`An unexpected error occurred: ${err.message}`);
      toast({ title: "Payment Error", description: err.message || "An unexpected error occurred.", variant: "destructive" });
      setIsLoading(false);
    }
  };

  if (authLoading || (!user && !authLoading)) { 
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading payment details...</p>
      </div>
    );
  }
  
  if (!user) { // Should be caught by useEffect, but as a fallback
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <p className="mt-4 text-muted-foreground text-xl">User not authenticated. Redirecting to login...</p>
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
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitleComponent>Payment Error</AlertTitleComponent>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <p className="text-xs text-muted-foreground text-center mt-1">
            You will be redirected to Flutterwave's secure payment gateway.
          </p>
          <Button 
            onClick={handlePayment} 
            disabled={isLoading}
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 text-white font-medium text-sm rounded-md px-6 py-3 flex items-center justify-center gap-2 transition-all duration-100 ease-in"
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CreditCard className="h-5 w-5" />
            )}
            Proceed to Payment
          </Button>
        </CardContent>
        <CardFooter className="flex-col items-center">
           <Button variant="link" onClick={() => router.back()} className="mt-4 text-muted-foreground">
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
