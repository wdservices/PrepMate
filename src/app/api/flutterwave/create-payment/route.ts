
import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';
import { randomUUID } from 'crypto'; // For generating unique tx_ref

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      amount, 
      currency = 'NGN', 
      customerEmail, 
      customerName, 
      customerPhone, // Optional
      redirectUrl, // This is Flutterwave's redirect_url (where user goes after payment)
      examId,      // For meta
      userId,      // For meta
      customizations, // e.g., { title, logo }
      paymentOptions // e.g., "card,ussd,banktransfer"
    } = body;

    console.log("[API /create-payment] Received request body:", body);

    if (!amount || !customerEmail || !customerName || !redirectUrl || !userId) {
      const missingFields = [
        !amount && "amount",
        !customerEmail && "customerEmail",
        !customerName && "customerName",
        !redirectUrl && "redirectUrl",
        !userId && "userId",
      ].filter(Boolean).join(', ');
      console.error("[API /create-payment] Missing required fields:", missingFields, "Full body:", body);
      return NextResponse.json({ error: `Missing required fields: ${missingFields}` }, { status: 400 });
    }
    
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
        console.error("[API /create-payment] Invalid amount:", amount);
        return NextResponse.json({ error: 'Invalid amount provided. Amount must be a positive number.' }, { status: 400 });
    }

    const secretKey = process.env.FLW_SECRET_KEY;
    if (!secretKey || secretKey.includes("YOUR_ACTUAL_") || secretKey.includes("_HERE") || secretKey.trim() === "") {
      console.error('[API /create-payment] CRITICAL: Flutterwave secret key (FLW_SECRET_KEY) is not set or is a placeholder in environment variables.');
      return NextResponse.json({ error: 'Payment gateway configuration error. Please contact support.' }, { status: 500 });
    }

    const tx_ref = `PrepMate-${userId}-${Date.now()}-${randomUUID().substring(0,6)}`; 
    
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

    const payload = {
      tx_ref,
      amount: String(numericAmount),
      currency,
      redirect_url: redirectUrl, // Use the one passed from client
      customer: {
        email: customerEmail,
        name: customerName,
        phonenumber: customerPhone || undefined, 
      },
      customizations: {
        title: customizations?.title || `PrepMate Payment - Ref: ${tx_ref}`,
        description: customizations?.description || `Payment for PrepMate services. Amount: ${currency} ${numericAmount.toLocaleString()}`,
        logo: customizations?.logo || `${appBaseUrl}/images/prepmate-logo.png`, // Ensure logo exists
      },
      payment_options: paymentOptions || "card,ussd,banktransfer",
      meta: { 
        user_id: userId,
        exam_id: examId || 'general_access',
        source: 'PrepMate-WebApp-API',
        // Add other meta fields from your example if needed
        // meta_1: 'meta_value_example', 
      }
    };

    // Log sensitive data carefully or partially in production
    console.log('[API /create-payment] Sending payload to Flutterwave. Tx_ref:', tx_ref, "Amount:", numericAmount, "Customer Email:", customerEmail);


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
    // Avoid logging full response in prod if it contains sensitive info not needed for debugging this step
    // console.log("[API /create-payment] Flutterwave API response data:", flutterwaveResponse.data);


    if (flutterwaveResponse.data && flutterwaveResponse.data.status === 'success' && flutterwaveResponse.data.data.link) {
      console.log('[API /create-payment] Flutterwave payment link generated successfully for tx_ref:', tx_ref);
      return NextResponse.json({ 
        message: 'Payment link generated successfully', 
        paymentLink: flutterwaveResponse.data.data.link,
        tx_ref: tx_ref 
      });
    } else {
      console.error('[API /create-payment] Flutterwave API Error (Non-success status or missing link):', flutterwaveResponse.data);
      return NextResponse.json({ 
        error: 'Failed to create payment link with Flutterwave.', 
        details: flutterwaveResponse.data?.message || flutterwaveResponse.data || 'Unknown error from Flutterwave' 
      }, { status: flutterwaveResponse.status || 500 });
    }

  } catch (err: any) {
    const errorDetails = err.isAxiosError && err.response ? err.response.data : { message: err.message || 'Internal server error' };
    const statusCode = err.isAxiosError && err.response ? err.response.status : 500;
    console.error('[API /create-payment] Flutterwave Payment Creation API Route Error:', err.isAxiosError ? JSON.stringify(errorDetails, null, 2) : err.message);
    
    return NextResponse.json({ 
      error: 'An unexpected error occurred during payment initiation.', 
      details: errorDetails?.message || errorDetails
    }, { status: statusCode });
  }
}
