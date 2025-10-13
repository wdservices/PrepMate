
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { COUNTRY_OPTIONS } from "./_components/country-options";
import { generateReferenceKey } from "@/lib/utils";
import { FLUTTERWAVE_PUBLIC_KEY } from "@/config/client";
import { getAuth } from "firebase/auth";
import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";
import { paymentService } from "@/lib/firestore-service";
import { Payment } from "@/types";

"use client";
import React, { useEffect, useState } from "react";
// import { toast } from "@/hooks/use-toast"; // Uncomment if you have a toast hook
import { Button } from "@/components/ui/button";
import { functions } from "@/lib/firebase";
import { getAuth } from "firebase/auth";
import { httpsCallable } from "firebase/functions";

const COUNTRY_OPTIONS = [
  { code: "NG", name: "Nigeria", currency: "NGN", symbol: "₦", planId: "143879", amount: 1500 },
  { code: "GH", name: "Ghana", currency: "GHS", symbol: "₵", planId: "143880", amount: 13.8 },
  { code: "GM", name: "Gambia", currency: "GMD", symbol: "D", planId: "143883", amount: 70 },
  { code: "LR", name: "Liberia", currency: "LRD", symbol: "$", planId: "143881", amount: 180 },
  { code: "SL", name: "Sierra Leone", currency: "SLL", symbol: "Le", planId: "143882", amount: 20500 },
  // Add more WAEC countries as needed
];

const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK-f1ca421754831757166c4e74547967c0-X"; // Replace with your key

export default function PaymentPage() {
  const [selectedCountry, setSelectedCountry] = useState(() => {
    return COUNTRY_OPTIONS.length > 0 ? COUNTRY_OPTIONS[0] : null;
  });
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Dynamically load Flutterwave script
    let script: HTMLScriptElement | null = null;
    const loadScript = () => {
      if (document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]')) {
        setIsScriptLoaded(true);
        return;
      }
      script = document.createElement("script");
      script.src = "https://checkout.flutterwave.com/v3.js";
      script.async = true;
      script.onload = () => setIsScriptLoaded(true);
      script.onerror = () => setIsScriptLoaded(false);
      document.body.appendChild(script);
    };
    loadScript();
    return () => {
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  function generateReferenceKey(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  const handlePayment = () => {
    if (!isScriptLoaded) {
      alert("Payment system is still loading. Please try again in a moment.");
      return;
    }
    setIsProcessing(true);
    // TODO: Replace with real user info
    const user = { email: "test@example.com", name: "Test User" };
    // TODO: Fill in planId for each country when available
    const planId = selectedCountry?.planId || "";
    // @ts-ignore
    window.FlutterwaveCheckout({
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: generateReferenceKey(25),
      amount: selectedCountry?.amount || 0,
      currency: selectedCountry?.currency || "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: user.email,
        name: user.name,
      },
      customizations: {
        title: "PrepMate Subscription",
        description: `Access to all WAEC/JAMB/NECO past questions and features for 1 month` ,
        logo: "/images/prepmate- students writing exams.webp",
      },
      payment_plan: planId,
      callback: async (response: any) => {
        setIsProcessing(false);
        if (response.status === "successful") {
          // Call the Firebase function to set subscription claim
          try {
            if (!functions) {
              throw new Error("Firebase functions not initialized");
            }
            const setSubscription = httpsCallable(functions, 'setSubscriptionAfterPayment');
            await setSubscription();

            // Add payment record to Firestore
            const newPayment: Payment = {
              userId: user.uid, // Assuming user is logged in and user.uid is available
              amount: selectedCountry?.amount || 0,
              currency: selectedCountry?.currency || "NGN",
              paymentGateway: "Flutterwave",
              transactionRef: response.tx_ref,
              status: "successful",
              paymentDate: new Date(),
              // Add other relevant fields from the response or local state
            };
            await paymentService.addPayment(newPayment);

            // Force token refresh
            const auth = getAuth();
            await auth.currentUser?.getIdToken(true);
            alert("Payment successful! Thank you for subscribing. Your access has been updated.");
          } catch (err) {
            console.error("Error setting subscription or adding payment:", err);
            alert("Payment succeeded, but failed to update your subscription or record payment. Please contact support.");
          }
        } else {
          alert("Payment not completed.");
        }
      },
      onclose: () => setIsProcessing(false),
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Subscribe to PrepMate</h1>
      {!selectedCountry ? (
        <div className="text-center text-red-500">
          Loading payment options...
        </div>
      ) : (
        <>
          <label className="block mb-2 font-medium">Select your country:</label>
          <select
            className="w-full p-2 border rounded mb-4"
            value={selectedCountry?.code}
            onChange={e => {
              const country = COUNTRY_OPTIONS.find(c => c.code === e.target.value);
              if (country) setSelectedCountry(country);
            }}
          >
            {COUNTRY_OPTIONS.map(country => (
              <option key={country.code} value={country.code}>
                {country.name} ({country.symbol})
              </option>
            ))}
          </select>
          <div className="mb-4">
            <div className="text-lg font-semibold">
              {selectedCountry?.symbol}{selectedCountry?.amount} / 1 month
            </div>
            <div className="text-gray-600 text-sm">
              Access to all past questions, AI tutor, and more.
            </div>
          </div>
          <Button
            onClick={handlePayment}
            disabled={isProcessing || !isScriptLoaded}
            className="w-full"
          >
            {isProcessing ? "Processing..." : `Pay ${selectedCountry?.symbol}${selectedCountry?.amount}`}
          </Button>
          <div className="text-xs text-gray-400 mt-4">
            Powered by Flutterwave. Plan IDs will be set for each country soon.
          </div>
        </>
      )}
    </div>
  );
}
