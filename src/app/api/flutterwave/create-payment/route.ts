
import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';
import { randomUUID } from 'crypto'; // For generating unique tx_ref

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'NGN', customerEmail, customerName, customerPhone, examId } = body;

    if (!amount || !customerEmail || !customerName) {
      return NextResponse.json({ error: 'Missing required fields: amount, customerEmail, customerName' }, { status: 400 });
    }

    const secretKey = process.env.FLW_SECRET_KEY;
    if (!secretKey) {
      console.error('CRITICAL: Flutterwave secret key (FLW_SECRET_KEY) is not set in environment variables.');
      return NextResponse.json({ error: 'Payment gateway configuration error. Administrator has been notified.' }, { status: 500 });
    }

    const tx_ref = `PrepMate-${randomUUID()}`; // Generate a unique transaction reference
    
    const appBaseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';
    const redirect_url = `${appBaseUrl}/payment-status`; // User will be redirected here after payment

    const payload = {
      tx_ref,
      amount: String(amount), // Amount should be a string
      currency,
      redirect_url,
      customer: {
        email: customerEmail,
        name: customerName,
        phonenumber: customerPhone || undefined, // Phone number is optional
      },
      customizations: {
        title: `PrepMate Access - ${examId ? `Exam ${examId}` : 'Subscription'}`,
        description: `Payment for access to PrepMate ${examId ? `exam ${examId}` : 'services'}. Ref: ${tx_ref}`,
        logo: `${appBaseUrl}/images/prepmate-logo.png`, 
      },
      meta: { 
        exam_id: examId || 'general_subscription',
        user_email: customerEmail, // Adding user email to meta for easier tracking if needed
      }
    };

    // Log the payload for debugging (excluding sensitive parts if any, though this payload is generally safe)
    console.log('Sending payload to Flutterwave:', JSON.stringify({ ...payload, customer: { email: payload.customer.email, name: payload.customer.name } }, null, 2));

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

    if (flutterwaveResponse.data && flutterwaveResponse.data.status === 'success') {
      console.log('Flutterwave payment link generated successfully for tx_ref:', tx_ref);
      return NextResponse.json({ 
        message: 'Payment link generated successfully', 
        paymentLink: flutterwaveResponse.data.data.link,
        tx_ref: tx_ref 
      });
    } else {
      console.error('Flutterwave API Error (Non-success status):', flutterwaveResponse.data);
      return NextResponse.json({ error: 'Failed to create payment link with Flutterwave.', details: flutterwaveResponse.data }, { status: flutterwaveResponse.status || 500 });
    }

  } catch (err: any) {
    console.error('Flutterwave Payment Creation API Route Error:', err.response ? JSON.stringify(err.response.data, null, 2) : err.message);
    const errorDetails = err.response ? err.response.data : { message: err.message };
    const statusCode = err.response ? err.response.status : 500;
    return NextResponse.json({ 
      error: 'An unexpected error occurred during payment initiation.', 
      details: errorDetails
    }, { status: statusCode });
  }
}
