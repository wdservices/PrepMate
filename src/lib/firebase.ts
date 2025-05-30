
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

if (!apiKey && typeof window === 'undefined') {
  console.warn(`
    ****************************************************************************************
    WARNING: Firebase API Key is MISSING!
    Please ensure NEXT_PUBLIC_FIREBASE_API_KEY is set in your .env file.
    The application will likely fail to connect to Firebase services.
    ****************************************************************************************
  `);
} else if (!apiKey && typeof window !== 'undefined') {
   console.warn("Firebase API Key is missing. Firebase might not work correctly.");
}

const firebaseConfig: FirebaseOptions = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

// Log the configuration being used (excluding API key for security in client-side logs if it were to be logged there)
// On the server-side, this log will appear in your Next.js development server console.
if (typeof window === 'undefined') { // Log only on the server-side
  console.log("Attempting to initialize Firebase with the following configuration (API Key is intentionally omitted from this log for security):");
  console.log({
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    storageBucket: firebaseConfig.storageBucket,
    messagingSenderId: firebaseConfig.messagingSenderId,
    appId: firebaseConfig.appId,
    apiKeyProvided: !!firebaseConfig.apiKey
  });
}

// Check if all required Firebase config values are present
const requiredConfigs = {
  apiKey,
  authDomain,
  projectId,
  // storageBucket, messagingSenderId, and appId are often optional for basic auth/firestore but good to have
};

let allConfigsPresent = true;
for (const [key, value] of Object.entries(requiredConfigs)) {
  if (!value) {
    allConfigsPresent = false;
    if (typeof window === 'undefined') {
      console.error(`Firebase config error: NEXT_PUBLIC_FIREBASE_${key.toUpperCase()} is missing in .env`);
    } else {
      console.error(`Firebase config error: NEXT_PUBLIC_FIREBASE_${key.toUpperCase()} is missing.`);
    }
  }
}

if (!allConfigsPresent && typeof window === 'undefined') {
  console.error(`
    ****************************************************************************************
    CRITICAL: One or more required Firebase environment variables are missing.
    Firebase SDK will not initialize correctly. Please check your .env file.
    Ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set.
    ****************************************************************************************
  `);
}


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

