
import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';
import { randomUUID } from 'crypto'; // For generating unique tx_ref

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'NGN', customerEmail, customerName, customerPhone, examId } = body;

    console.log("[API /create-payment] Received request body:", body); // Log received body

    if (!amount || !customerEmail || !customerName) {
      console.error("[API /create-payment] Missing required fields. Amount:", amount, "Email:", customerEmail, "Name:", customerName);
      return NextResponse.json({ error: 'Missing required fields: amount, customerEmail, customerName' }, { status: 400 });
    }
    
    // Ensure amount is a number before converting to string for Flutterwave
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        console.error("[API /create-payment] Invalid amount:", amount);
        return NextResponse.json({ error: 'Invalid amount provided. Amount must be a positive number.' }, { status: 400 });
    }


    const secretKey = process.env.FLW_SECRET_KEY;
    if (!secretKey) {
      console.error('[API /create-payment] CRITICAL: Flutterwave secret key (FLW_SECRET_KEY) is not set in environment variables.');
      return NextResponse.json({ error: 'Payment gateway configuration error. Administrator has been notified.' }, { status: 500 });
    }

    const tx_ref = `PrepMate-${randomUUID()}`; 
    
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    const redirect_url = `${appBaseUrl}/payment-status`; 

    const payload = {
      tx_ref,
      amount: String(numericAmount), // Use the validated and potentially converted numericAmount
      currency,
      redirect_url,
      customer: {
        email: customerEmail,
        name: customerName,
        phonenumber: customerPhone || undefined, 
      },
      customizations: {
        title: `PrepMate Access - ${examId ? `Exam ${examId}` : 'Subscription'}`,
        description: `Payment for access to PrepMate ${examId ? `exam ${examId}` : 'services'}. Ref: ${tx_ref}`,
        logo: `${appBaseUrl}/images/prepmate-logo.png`, 
      },
      meta: { 
        exam_id: examId || 'general_subscription',
        user_email: customerEmail, 
      }
    };

    console.log('[API /create-payment] Sending payload to Flutterwave:', JSON.stringify({ ...payload, customer: { email: payload.customer.email, name: payload.customer.name } }, null, 2));

    const flutterwaveResponse = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      payload,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log("[API /create-payment] Flutterwave API response status:", flutterwaveResponse.status);
    console.log("[API /create-payment] Flutterwave API response data:", flutterwaveResponse.data);

    if (flutterwaveResponse.data && flutterwaveResponse.data.status === 'success') {
      console.log('[API /create-payment] Flutterwave payment link generated successfully for tx_ref:', tx_ref);
      return NextResponse.json({ 
        message: 'Payment link generated successfully', 
        paymentLink: flutterwaveResponse.data.data.link,
        tx_ref: tx_ref 
      });
    } else {
      console.error('[API /create-payment] Flutterwave API Error (Non-success status or unexpected response):', flutterwaveResponse.data);
      return NextResponse.json({ 
        error: 'Failed to create payment link with Flutterwave.', 
        details: flutterwaveResponse.data?.message || flutterwaveResponse.data || 'Unknown error from Flutterwave' 
      }, { status: flutterwaveResponse.status || 500 });
    }

  } catch (err: any) {
    console.error('[API /create-payment] Flutterwave Payment Creation API Route Error:', err.isAxiosError ? JSON.stringify(err.response?.data, null, 2) : err.message);
    const errorDetails = err.isAxiosError && err.response ? err.response.data : { message: err.message || 'Internal server error' };
    const statusCode = err.isAxiosError && err.response ? err.response.status : 500;
    
    return NextResponse.json({ 
      error: 'An unexpected error occurred during payment initiation.', 
      details: errorDetails?.message || errorDetails
    }, { status: statusCode });
  }
}
