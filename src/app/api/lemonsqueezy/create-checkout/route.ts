
import { NextResponse, type NextRequest } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      storeId, 
      variantId,
      customPrice, // New: optional custom price in smallest currency unit (e.g., cents)
      customerName, // Optional: pass if available
      customerEmail, // Optional: pass if available
      redirectUrl // Optional: custom redirect URL after payment
    } = body;

    console.log("[API /lemonsqueezy/create-checkout] Received request body:", body);

    if (!storeId || !variantId) {
      const missingFields = [
        !storeId && "storeId",
        !variantId && "variantId",
      ].filter(Boolean).join(', ');
      console.error("[API /lemonsqueezy/create-checkout] Missing required fields:", missingFields);
      return NextResponse.json({ error: `Missing required fields: ${missingFields}` }, { status: 400 });
    }
    
    const apiKey = process.env.LEMONSQUEEZY_API_KEY;
    if (!apiKey || apiKey.includes("YOUR_LEMONSQUEEZY_API_KEY_HERE") || apiKey.trim() === "") {
      console.error('[API /lemonsqueezy/create-checkout] CRITICAL: Lemon Squeezy API key (LEMONSQUEEZY_API_KEY) is not set or is a placeholder in environment variables.');
      return NextResponse.json({ error: 'Payment gateway configuration error. Please contact support.' }, { status: 500 });
    }

    const payload: any = {
      data: {
        type: "checkouts",
        attributes: {
          checkout_options: {
            embed: false,
            // media: true,
            // logo: true,
            // desc: true,
            // discount: true,
            // dark: false,
            // subscription_preview: true,
          },
          // checkout_data will be built conditionally below
          // product_options will be built conditionally below
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: String(storeId),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(variantId),
            },
          },
        },
      },
    };
    
    if (customPrice && typeof customPrice === 'number' && customPrice > 0) {
      payload.data.attributes.custom_price = customPrice;
      console.log(`[API /lemonsqueezy/create-checkout] Using custom price: ${customPrice}`);
    }

    // Initialize checkout_data and product_options if they will be populated
    let checkoutDataExists = false;
    let productOptionsExists = false;

    if (customerEmail || customerName) {
      payload.data.attributes.checkout_data = {};
      checkoutDataExists = true;
    }
    if (redirectUrl) {
      payload.data.attributes.product_options = {};
      productOptionsExists = true;
    }

    if (redirectUrl) {
        payload.data.attributes.product_options.redirect_url = redirectUrl;
    }
    if (customerEmail) {
        payload.data.attributes.checkout_data.email = customerEmail;
    }
    if (customerName) {
        payload.data.attributes.checkout_data.name = customerName;
    }
    
    // Clean up empty objects if not populated
    if (checkoutDataExists && Object.keys(payload.data.attributes.checkout_data).length === 0) {
        delete payload.data.attributes.checkout_data;
    }
    if (productOptionsExists && Object.keys(payload.data.attributes.product_options).length === 0) {
        delete payload.data.attributes.product_options;
    }


    console.log('[API /lemonsqueezy/create-checkout] Sending payload to Lemon Squeezy:', JSON.stringify(payload, null, 2));

    const lemonsqueezyResponse = await axios.post(
      'https://api.lemonsqueezy.com/v1/checkouts',
      payload,
      {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Content-Type': 'application/vnd.api+json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    console.log("[API /lemonsqueezy/create-checkout] Lemon Squeezy API response status:", lemonsqueezyResponse.status);
    
    if (lemonsqueezyResponse.data && lemonsqueezyResponse.data.data && lemonsqueezyResponse.data.data.attributes && lemonsqueezyResponse.data.data.attributes.url) {
      console.log('[API /lemonsqueezy/create-checkout] Lemon Squeezy checkout URL generated:', lemonsqueezyResponse.data.data.attributes.url);
      return NextResponse.json({ 
        message: 'Checkout created successfully', 
        checkoutUrl: lemonsqueezyResponse.data.data.attributes.url,
        checkoutId: lemonsqueezyResponse.data.data.id
      });
    } else {
      console.error('[API /lemonsqueezy/create-checkout] Lemon Squeezy API Error (Unexpected response structure):', lemonsqueezyResponse.data);
      return NextResponse.json({ 
        error: 'Failed to create checkout with Lemon Squeezy.', 
        details: lemonsqueezyResponse.data?.errors || lemonsqueezyResponse.data || 'Unknown error from Lemon Squeezy' 
      }, { status: lemonsqueezyResponse.status || 500 });
    }

  } catch (err: any) {
    const errorDetails = err.isAxiosError && err.response ? err.response.data : { message: err.message || 'Internal server error' };
    const statusCode = err.isAxiosError && err.response ? err.response.status : 500;
    console.error('[API /lemonsqueezy/create-checkout] Lemon Squeezy Checkout API Route Error:', err.isAxiosError ? JSON.stringify(errorDetails, null, 2) : err.message, err.stack);
    
    return NextResponse.json({ 
      error: 'An unexpected error occurred during checkout creation.', 
      details: errorDetails?.message || errorDetails?.errors?.[0]?.detail || errorDetails
    }, { status: statusCode });
  }
}
