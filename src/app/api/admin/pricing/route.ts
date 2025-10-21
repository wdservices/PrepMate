import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// GET - Fetch current pricing
export async function GET() {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }
    
    const pricingRef = doc(db, 'settings', 'pricing');
    const docSnap = await getDoc(pricingRef);
    
    if (docSnap.exists()) {
      return NextResponse.json({
        success: true,
        data: docSnap.data()
      });
    } else {
      // Return default pricing if not set
      const defaultPricing = { monthlyPrice: 500000 }; // ₦5000 in kobo
      return NextResponse.json({
        success: true,
        data: defaultPricing
      });
    }
  } catch (error) {
    console.error('Error fetching pricing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pricing' },
      { status: 500 }
    );
  }
}

// PUT - Update pricing
export async function PUT(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }
    
    const body = await request.json();
    const { monthlyPrice } = body;

    if (!monthlyPrice || typeof monthlyPrice !== 'number' || monthlyPrice <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid monthly price' },
        { status: 400 }
      );
    }

    const pricingData = {
      monthlyPrice,
      currency: 'NGN',
      lastUpdated: new Date().toISOString(),
    };

    const pricingRef = doc(db, 'settings', 'pricing');
    await setDoc(pricingRef, pricingData);

    return NextResponse.json({
      success: true,
      data: pricingData
    });
  } catch (error) {
    console.error('Error updating pricing:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update pricing' },
      { status: 500 }
    );
  }
}