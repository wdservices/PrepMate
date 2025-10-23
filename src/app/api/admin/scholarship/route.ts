import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Default scholarship data
const defaultScholarshipData = {
  isActive: false,
  duration: 0, // in days
  description: '',
  startDate: null as string | null,
  endDate: null as string | null,
  lastUpdated: '',
};

export async function GET() {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const scholarshipRef = doc(db, 'settings', 'scholarship');
    const docSnap = await getDoc(scholarshipRef);
    
    let scholarshipData = docSnap.exists() ? docSnap.data() : defaultScholarshipData;

    // Check if scholarship has expired and auto-disable
    if (scholarshipData.isActive && scholarshipData.endDate) {
      const now = new Date();
      const endDate = new Date(scholarshipData.endDate);
      
      if (now > endDate) {
        scholarshipData.isActive = false;
        scholarshipData.lastUpdated = now.toISOString();
        
        // Update in database
        await setDoc(scholarshipRef, scholarshipData);
      }
    }

    return NextResponse.json(scholarshipData);
  } catch (error) {
    console.error('Error fetching scholarship data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch scholarship data' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const body = await request.json();
    const { isActive, duration, description } = body;

    // Validate input
    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { success: false, error: 'isActive must be a boolean' },
        { status: 400 }
      );
    }

    if (duration !== undefined && (typeof duration !== 'number' || duration < 0)) {
      return NextResponse.json(
        { success: false, error: 'duration must be a non-negative number' },
        { status: 400 }
      );
    }

    const scholarshipRef = doc(db, 'settings', 'scholarship');
    const docSnap = await getDoc(scholarshipRef);
    let currentData = docSnap.exists() ? docSnap.data() : defaultScholarshipData;

    // Calculate dates if activating scholarship
    let startDate = currentData.startDate;
    let endDate = currentData.endDate;

    if (isActive && duration > 0) {
      const now = new Date();
      startDate = now.toISOString();
      endDate = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000).toISOString(); // duration in days
    } else if (!isActive) {
      startDate = null;
      endDate = null;
    }

    // Update scholarship data
    const updatedData = {
      ...currentData,
      isActive,
      duration: duration !== undefined ? duration : currentData.duration,
      description: description !== undefined ? description : currentData.description,
      startDate,
      endDate,
      lastUpdated: new Date().toISOString(),
    };

    await setDoc(scholarshipRef, updatedData);

    return NextResponse.json(updatedData);
  } catch (error) {
    console.error('Error updating scholarship data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update scholarship data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!db) {
      throw new Error('Database not initialized');
    }

    const body = await request.json();
    const { action } = body;

    if (action === "toggle") {
      const scholarshipRef = doc(db, 'settings', 'scholarship');
      const docSnap = await getDoc(scholarshipRef);
      let currentData = docSnap.exists() ? docSnap.data() : defaultScholarshipData;

      const now = new Date();
      const newActiveState = !currentData.isActive;
      
      let updatedData = {
        ...currentData,
        isActive: newActiveState,
        lastUpdated: now.toISOString(),
      };

      // Validate duration before activating
      if (newActiveState && (!currentData.duration || currentData.duration <= 0)) {
        return NextResponse.json(
          { error: "Cannot activate scholarship: Duration must be greater than 0 days" },
          { status: 400 }
        );
      }

      // Set dates when activating
      if (newActiveState && currentData.duration > 0) {
        updatedData.startDate = now.toISOString();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + currentData.duration);
        updatedData.endDate = endDate.toISOString();
      } else if (!newActiveState) {
        // Clear dates when deactivating
        updatedData.startDate = null;
        updatedData.endDate = null;
      }

      // Save to database
      await setDoc(scholarshipRef, updatedData);

      return NextResponse.json(updatedData);
    }

    return NextResponse.json(
      { error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error toggling scholarship:", error);
    return NextResponse.json(
      { error: "Failed to toggle scholarship" },
      { status: 500 }
    );
  }
}