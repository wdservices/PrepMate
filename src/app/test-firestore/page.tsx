"use client";

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function TestPage() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    const testFirestore = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'exams'));
        setMessage(`Found ${snapshot.size} exams`);
      } catch (error) {
        console.error('Test failed:', error);
        setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    };

    testFirestore();
  }, []);

  return (
    <div className="p-8">
      <h1>Firestore Test</h1>
      <p>{message}</p>
    </div>
  );
}