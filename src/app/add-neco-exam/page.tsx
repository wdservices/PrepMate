'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export default function AddNecoExam() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const addNecoExam = async () => {
    try {
      setLoading(true);
      
      if (!db) {
        throw new Error('Firestore not initialized');
      }
      
      // Add the NECO exam document with specific ID 'neco'
      const examRef = doc(db, 'exams', 'neco');
      await setDoc(examRef, {
        name: 'NECO',
        description: 'National Examinations Council',
        iconName: 'BookOpen',
        order: 3, // WAEC is 1, JAMB is 2, so NECO will be 3
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      console.log('NECO exam added/updated with ID: neco');
      setSuccess(true);
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error adding NECO exam: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Add NECO Exam</h1>
        
        <p className="text-gray-600">
          This will add the NECO exam to your Firestore database with the following details:
        </p>
        
        <div className="p-4 bg-gray-50 rounded-md">
          <p><span className="font-semibold">Name:</span> NECO</p>
          <p><span className="font-semibold">Description:</span> National Examinations Council</p>
          <p><span className="font-semibold">Order:</span> 3</p>
        </div>
        
        {success ? (
          <div className="p-4 text-center text-green-600 bg-green-100 rounded-md">
            NECO exam added successfully! Redirecting...
          </div>
        ) : (
          <Button 
            onClick={addNecoExam} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Adding NECO Exam...' : 'Add NECO Exam'}
          </Button>
        )}
      </div>
    </div>
  );
}
