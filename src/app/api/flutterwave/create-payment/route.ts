
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
      console.error('Flutterwave secret key is not set.');
      return NextResponse.json({ error: 'Payment gateway configuration error.' }, { status: 500 });
    }

    const tx_ref = `PrepMate-${randomUUID()}`; // Generate a unique transaction reference
    
    // Ensure redirect_url is correctly formed using environment variables for domain
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
        title: `PrepMate Exam Access - ${examId ? `Exam ${examId}` : 'Subscription'}`,
        description: `Payment for access to PrepMate ${examId ? `exam ${examId}` : 'services'}.`,
        logo: `${appBaseUrl}/images/prepmate-logo.png`, // Optional: path to your logo in public/images
      },
      meta: { // Optional metadata
        exam_id: examId || 'general_subscription',
      }
    };

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
      return NextResponse.json({ 
        message: 'Payment link generated successfully', 
        paymentLink: flutterwaveResponse.data.data.link,
        tx_ref: tx_ref 
      });
    } else {
      console.error('Flutterwave API Error:', flutterwaveResponse.data);
      return NextResponse.json({ error: 'Failed to create payment link.', details: flutterwaveResponse.data }, { status: 500 });
    }

  } catch (err: any) {
    console.error('Flutterwave Payment Creation Error:', err.response ? err.response.data : err.message);
    return NextResponse.json({ error: 'An unexpected error occurred during payment creation.', details: err.response ? err.response.data : err.message }, { status: 500 });
  }
}
