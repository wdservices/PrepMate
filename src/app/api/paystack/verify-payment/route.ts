import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/lib/firestore-service";
import { updateUserSubscription } from "@/lib/firebase-service";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export async function POST(request: NextRequest) {
  try {
    const { reference, userId } = await request.json();

    if (!reference || !userId) {
      return NextResponse.json(
        { status: "error", message: "Missing reference or userId" },
        { status: 400 }
      );
    }

    if (!PAYSTACK_SECRET_KEY) {
      console.error("PAYSTACK_SECRET_KEY is not configured");
      return NextResponse.json(
        { status: "error", message: "Payment configuration error" },
        { status: 500 }
      );
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const paystackData = await response.json();

    if (paystackData.data.status === "success") {
      // Payment successful - save to database
      const paymentData = {
        userId,
        reference,
        amount: paystackData.data.amount / 100, // Convert from kobo to naira
        currency: paystackData.data.currency,
        status: "success",
        gateway: "paystack",
        gatewayResponse: paystackData.data,
        createdAt: new Date(),
      };

      // Save payment record to Firestore
      await paymentService.createPayment(paymentData);

      // Update user subscription status - grant 30 days access
      await updateUserSubscription(userId, { 
        status: 'active', 
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days from now
      });

      return NextResponse.json({
        status: "success",
        data: paystackData.data,
        message: "Payment verified successfully",
      });
    } else {
      // Payment failed
      const paymentData = {
        userId,
        reference,
        amount: paystackData.data.amount / 100,
        currency: paystackData.data.currency,
        status: "failed",
        gateway: "paystack",
        gatewayResponse: paystackData.data,
        createdAt: new Date(),
      };

      await paymentService.createPayment(paymentData);

      return NextResponse.json({
        status: "failed",
        data: paystackData.data,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { 
        status: "error", 
        message: error instanceof Error ? error.message : "Unknown error occurred" 
      },
      { status: 500 }
    );
  }
}