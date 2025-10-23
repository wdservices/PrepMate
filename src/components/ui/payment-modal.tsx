"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Loader2, CreditCard, Check, X } from 'lucide-react';
import { useAuth } from '@/components/providers/firebase-provider';
import { PAYSTACK_PUBLIC_KEY } from '@/config/client';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  examTitle: string;
  examId: string;
  price?: number;
}

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  examTitle,
  examId,
  price = 5000 // Default price in kobo (₦50)
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(price);
  const [priceLoading, setPriceLoading] = useState(false);
  const [scholarshipActive, setScholarshipActive] = useState(false);
  const [scholarshipLoading, setScholarshipLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen && !paystackLoaded) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => setPaystackLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, paystackLoaded]);

  useEffect(() => {
    if (isOpen) {
      fetchCurrentPrice();
      checkScholarshipStatus();
    }
  }, [isOpen]);

  const fetchCurrentPrice = async () => {
    setPriceLoading(true);
    try {
      const response = await fetch('/api/admin/pricing');
      const result = await response.json();
      
      if (result.success && result.data && typeof result.data.monthlyPrice === 'number') {
        setCurrentPrice(result.data.monthlyPrice);
      } else {
        // Fallback to default price if API returns invalid data
        setCurrentPrice(price);
      }
    } catch (error) {
      console.error('Error fetching price:', error);
      // Keep default price if fetch fails
      setCurrentPrice(price);
    } finally {
      setPriceLoading(false);
    }
  };

  const checkScholarshipStatus = async () => {
    setScholarshipLoading(true);
    try {
      const response = await fetch('/api/admin/scholarship');
      const result = await response.json();
      
      if (result.success && result.data) {
        setScholarshipActive(result.data.isActive);
      }
    } catch (error) {
      console.error('Error fetching scholarship status:', error);
      // Default to false if fetch fails
      setScholarshipActive(false);
    } finally {
      setScholarshipLoading(false);
    }
  };

  const handleFreeAccess = () => {
    // Grant free access when scholarship is active
    onSuccess();
    onClose();
  };

  const verifyPayment = async (reference: string) => {
    try {
      const verifyResponse = await fetch('/api/paystack/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reference,
          examId,
          userId: user.uid,
        }),
      });

      const result = await verifyResponse.json();

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        throw new Error(result.error || 'Payment verification failed');
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      alert('Payment verification failed. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = async () => {
    if (!user || !paystackLoaded || scholarshipActive) return;

    setIsLoading(true);

    try {
      // Define callback function as synchronous (Paystack requirement)
      const paymentCallback = (response: any) => {
        if (!response || !response.reference) {
          console.error('Invalid payment response');
          alert('Invalid payment response. Please try again.');
          setIsLoading(false);
          return;
        }

        // Handle async verification separately
        verifyPayment(response.reference);
      };

      const closeCallback = () => {
        setIsLoading(false);
      };

      // Validate that PaystackPop is available and has setup method
      if (!window.PaystackPop || typeof window.PaystackPop.setup !== 'function') {
        throw new Error('Paystack library not loaded properly');
      }

      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: currentPrice, // Amount in kobo
        currency: 'NGN',
        ref: `exam_${examId}_${Date.now()}`,
        metadata: {
          examId,
          examTitle,
          userId: user.uid,
          custom_fields: [
            {
              display_name: "Exam",
              variable_name: "exam",
              value: examTitle
            }
          ]
        },
        callback: paymentCallback,
        onClose: closeCallback
      });

      if (!handler || typeof handler.openIframe !== 'function') {
        throw new Error('Failed to initialize Paystack handler');
      }

      handler.openIframe();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
      setIsLoading(false);
    }
  };

  const formatPrice = (priceInKobo: number) => {
    // Validate input and provide fallback
    if (typeof priceInKobo !== 'number' || isNaN(priceInKobo) || priceInKobo < 0) {
      return `₦${(price / 100).toFixed(0)}`; // Use default price as fallback
    }
    
    const priceInNaira = priceInKobo / 100;
    // If it's a whole number, show without decimals
    if (priceInNaira % 1 === 0) {
      return `₦${priceInNaira}`;
    }
    // If it has decimals, show with one decimal place
    return `₦${priceInNaira.toFixed(1)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Access Exam
          </DialogTitle>
          <DialogDescription>
            Complete payment to access past questions for this exam
          </DialogDescription>
        </DialogHeader>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">{examTitle}</CardTitle>
            <CardDescription>
              Get unlimited access to past questions and practice tests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scholarshipActive ? (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="font-medium text-green-800">🎓 Scholarship Active</span>
                <Badge variant="default" className="bg-green-600 text-white text-lg font-bold">
                  FREE ACCESS
                </Badge>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span className="font-medium">Subscription Price</span>
                <Badge variant="secondary" className="text-lg font-bold">
                  {priceLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    `${formatPrice(currentPrice)}/month`
                  )}
                </Badge>
              </div>
            )}

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Unlimited access to past questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Practice tests and mock exams</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>AI-powered insights and analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>Progress tracking and performance analytics</span>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="button"
                onClick={scholarshipActive ? handleFreeAccess : handlePayment}
                className={`flex-1 ${scholarshipActive ? 'bg-green-600 hover:bg-green-700' : ''}`}
                disabled={isLoading || (!scholarshipActive && (!paystackLoaded || !user || priceLoading)) || scholarshipLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : scholarshipLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : scholarshipActive ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Access for Free
                  </>
                ) : priceLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay {formatPrice(currentPrice)}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}