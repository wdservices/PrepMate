
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, CreditCard, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/components/providers/firebase-provider';
import { useToast } from '@/hooks/use-toast';
import type { Metadata } from 'next';

// Client components cannot export metadata directly, it should be handled by the nearest Server Component parent or layout.
// export const metadata: Metadata = {
//   title: 'Complete Payment',
// };

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examId = searchParams.get('examId'); // Or determine payment type differently
  const amount = 7500; // NGN - This could be dynamic based on examId or subscription type
  const currency = 'NGN';

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/auth/login?redirect=/payment${examId ? `?examId=${examId}` : ''}`);
    }
  }, [user, authLoading, router, examId]);

  const handlePayment = async () => {
    if (!user) {
      toast({ title: "Authentication Error", description: "You must be logged in to make a payment.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/flutterwave/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency,
          customerEmail: user.email,
          customerName: user.displayName || 'PrepMate User',
          customerPhone: user.phoneNumber || '', // Flutterwave might require this for some payment methods
          examId: examId || 'general_subscription', 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details?.message || 'Failed to initiate payment.');
      }

      if (data.paymentLink) {
        // Redirect to Flutterwave payment page
        window.location.href = data.paymentLink;
      } else {
        throw new Error('Payment link not received from server.');
      }
    } catch (err: any) {
      console.error("Payment initiation failed:", err);
      setError(err.message || "An unexpected error occurred. Please try again.");
      toast({ title: "Payment Error", description: err.message, variant: "destructive" });
      setIsLoading(false);
    }
    // setIsLoading(false); // Will be false on redirect or error
  };
  
  if (authLoading) {
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
            Access PrepMate {examId ? `content for exam ${examId.toUpperCase()}` : 'premium features'} by completing your payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">You are about to pay:</p>
            <p className="text-4xl font-bold text-foreground">
              {currency} {amount.toLocaleString()}
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-2 text-sm text-destructive border border-destructive/30">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <p className="text-xs text-muted-foreground text-center">
            You will be redirected to Flutterwave's secure payment gateway.
            By clicking "Proceed to Payment", you agree to PrepMate's terms and conditions.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handlePayment} 
            disabled={isLoading || !user} 
            className="w-full" 
            size="lg"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <CreditCard className="mr-2 h-5 w-5" />
            )}
            Proceed to Payment
          </Button>
        </CardFooter>
      </Card>
       <Button variant="link" onClick={() => router.back()} className="mt-6 text-muted-foreground">
        Go Back
      </Button>
    </div>
  );
}
