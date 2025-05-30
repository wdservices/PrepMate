
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

const firebaseConfig: FirebaseOptions = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const requiredConfigs: Record<string, string | undefined> = {
  apiKey,
  authDomain,
  projectId,
};

let allConfigsPresent = true;
const missingOrPlaceholderKeys: string[] = [];

for (const [key, value] of Object.entries(requiredConfigs)) {
  if (!value || value.includes("YOUR_ACTUAL_") || value.includes("_HERE") || value.trim() === "") {
    allConfigsPresent = false;
    const envVarName = `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
    missingOrPlaceholderKeys.push(envVarName);
    if (typeof window === 'undefined') {
      // Server-side logging for missing/placeholder values
      console.error(`Firebase config error: ${envVarName} is missing or uses a placeholder value in .env`);
    } else {
      // Client-side logging for missing/placeholder values
      console.error(`Firebase config error: ${envVarName} is missing or uses a placeholder value.`);
    }
  }
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (allConfigsPresent) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    if (typeof window === 'undefined') {
      console.log("Firebase SDK initialized successfully with provided configuration.");
    }
  } catch (error: any) {
    if (typeof window === 'undefined') {
      console.error("Firebase SDK initialization failed despite configs appearing present:", error.message);
    } else {
      console.error("Firebase SDK client-side initialization failed:", error.message);
    }
    // Ensure services are null if initialization fails
    app = null;
    auth = null;
    db = null;
     if (typeof window === 'undefined') {
      console.error(`
        ****************************************************************************************
        CRITICAL: Firebase SDK failed to initialize. Auth and DB features will be disabled.
        This might be due to an invalid API key or other configuration mismatch even if
        the basic environment variables seemed present. Double-check all Firebase credentials.
        ****************************************************************************************
      `);
    } else {
       console.warn("FIREBASE AUTH & FIRESTORE ARE DISABLED due to an SDK initialization error. Login and DB features are off. Please check Firebase credentials in .env.");
    }
  }
} else {
  if (typeof window === 'undefined') {
    console.error(`
      ****************************************************************************************
      CRITICAL: One or more required Firebase environment variables are missing or placeholders.
      Firebase SDK will NOT be initialized. Auth and DB features will be disabled.
      Please check your .env file and ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set.
      Problematic variable(s): ${missingOrPlaceholderKeys.join(', ')}
      ****************************************************************************************
    `);
  } else {
     console.warn("FIREBASE AUTH & FIRESTORE ARE DISABLED due to missing/placeholder configuration in .env. Login and DB features are off. Please check your .env file.");
  }
  // app, auth, db remain null by default
}

export { app, auth, db };

/*
// Original Firebase initialization (RE-ENABLE WHEN .ENV IS CORRECT AND 'allConfigsPresent' logic is removed/adjusted):
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const auth = getAuth(app);
// const db = getFirestore(app);
// export { app, auth, db };
*/
