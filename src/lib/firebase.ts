
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

if (typeof window === 'undefined') {
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

const requiredConfigs = {
  apiKey,
  authDomain,
  projectId,
};

let allConfigsPresent = true;
for (const [key, value] of Object.entries(requiredConfigs)) {
  if (!value || value.includes("YOUR_ACTUAL_") || value.includes("_HERE")) {
    allConfigsPresent = false;
    const envVarName = `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
    if (typeof window === 'undefined') {
      console.error(`Firebase config error: ${envVarName} is missing or uses a placeholder value in .env`);
    } else {
      console.error(`Firebase config error: ${envVarName} is missing or uses a placeholder value.`);
    }
  }
}

if (!allConfigsPresent && typeof window === 'undefined') {
  console.error(`
    ****************************************************************************************
    CRITICAL: One or more required Firebase environment variables are missing or placeholders.
    Firebase SDK will not initialize correctly. Please check your .env file.
    Ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set.
    ****************************************************************************************
  `);
}

// !!! TEMPORARILY DISABLING FIREBASE AUTH AND FIRESTORE INITIALIZATION !!!
// !!! This is to bypass 'auth/invalid-api-key' errors.              !!!
// !!! Login, Sign Up, and Firestore-dependent features will not work.   !!!
// !!! User needs to provide correct Firebase config in .env and uncomment original code. !!!
console.warn("FIREBASE AUTH & FIRESTORE ARE TEMPORARILY DISABLED to bypass config errors. Login and DB features are off. Ensure .env is correct and re-enable.");

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app); // Temporarily disabled
// const db = getFirestore(app); // Temporarily disabled

export const auth = null; // Force auth to be null
export const db = null;   // Force db to be null
export { app };

/*
// Original Firebase initialization (RE-ENABLE WHEN .ENV IS CORRECT):
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
*/
