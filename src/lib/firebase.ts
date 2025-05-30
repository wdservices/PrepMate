
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!apiKey && typeof window === 'undefined') {
  // This check runs on the server-side
  console.warn(`
    ****************************************************************************************
    WARNING: Firebase API Key is MISSING!
    Please ensure NEXT_PUBLIC_FIREBASE_API_KEY is set in your .env file.
    The application will likely fail to connect to Firebase services.
    ****************************************************************************************
  `);
} else if (!apiKey && typeof window !== 'undefined') {
  // This check runs on the client-side (though server-side error is more likely for initial load)
   console.warn("Firebase API Key is missing. Firebase might not work correctly.");
}


const firebaseConfig: FirebaseOptions = {
  apiKey: apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
