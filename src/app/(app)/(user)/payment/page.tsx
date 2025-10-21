
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/firebase-provider";
import { PAYSTACK_PUBLIC_KEY } from "@/config/client";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function PaymentPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const payWithPaystack = () => {
    if (!scriptLoaded) {
      alert("Payment system is still loading. Please try again.");
      return;
    }

    if (!user?.email) {
      alert("Please log in to make a payment.");
      return;
    }

    setLoading(true);

    // Example subscription pricing - you can modify these values
    const subscriptionPrice = 5000; // ₦50 per month
    const totalAmount = subscriptionPrice;

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: totalAmount * 100, // Paystack accepts kobo (₦50 → 5,000 kobo)
      currency: "NGN",
      ref: "prepmate_" + Date.now(), // unique reference
      callback: function(response: any) {
        console.log(response);

        // Send response.reference to backend to verify payment
        fetch("/api/paystack/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            reference: response.reference,
            userId: user.uid 
          })
        })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if (data.status === "success") {
            alert("Payment successful! Subscription activated.");
            router.push("/dashboard");
          } else {
            alert("Payment verification failed. Please contact support.");
          }
        })
        .catch(error => {
          setLoading(false);
          console.error("Payment verification error:", error);
          alert("Payment verification failed. Please contact support.");
        });
      },
      onClose: function() {
        setLoading(false);
        alert("Payment window closed.");
      }
    });

    handler.openIframe();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p>You need to be logged in to make a payment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-8">PrepMate Subscription</h2>
        
        <div className="mb-6">
          <div className="border rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-lg mb-2">Monthly Subscription</h3>
            <p className="text-gray-600 mb-2">Access to all exam questions and features</p>
            <p className="text-2xl font-bold text-blue-600">₦50/month</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <button
          type="button"
          onClick={payWithPaystack}
          disabled={loading || !scriptLoaded}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            loading || !scriptLoaded
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : !scriptLoaded ? "Loading..." : "Pay Now"}
        </button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Secure payment powered by Paystack
        </p>
      </div>
    </div>
  );
}
