
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

// These are the strictly required Firebase configs for basic initialization.
// Other services might require their specific variables too.
const requiredConfigs: Record<string, string | undefined> = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  // Add other critical ones if needed, e.g., appId
};

let allConfigsPresent = true;
const missingOrPlaceholderKeys: string[] = [];

for (const [key, value] of Object.entries(requiredConfigs)) {
  const envVarName = `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`;
  if (!value || value.includes("YOUR_ACTUAL_") || value.includes("_HERE") || value.trim() === "") {
    allConfigsPresent = false;
    missingOrPlaceholderKeys.push(envVarName);
    if (typeof window === 'undefined') {
      // Server-side logging for missing/placeholder values
      console.error(`Firebase config error: ${envVarName} is missing or uses a placeholder value in .env`);
    } else {
      // Client-side logging for missing/placeholder values
      console.warn(`Firebase config warning: ${envVarName} is missing or uses a placeholder value. Firebase features requiring this will be disabled.`);
    }
  }
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (allConfigsPresent) {
  try {
    if (typeof window !== 'undefined') {
      console.log("Attempting to initialize Firebase with config:", {
        apiKey: firebaseConfig.apiKey ? '*********** (set)' : 'NOT SET', // Don't log actual key client-side
        authDomain: firebaseConfig.authDomain,
        projectId: firebaseConfig.projectId,
        // Add other keys if useful for debugging, but avoid logging sensitive ones directly
      });
    }
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    if (typeof window === 'undefined') {
      console.log("Firebase SDK initialized successfully on the server with provided configuration.");
    } else {
      console.log("Firebase SDK initialized successfully on the client.");
    }
  } catch (error: any) {
    if (typeof window === 'undefined') {
      console.error("CRITICAL: Firebase SDK server-side initialization failed despite configs appearing present:", error.message);
    } else {
      console.error("CRITICAL: Firebase SDK client-side initialization failed:", error.message);
    }
    // Ensure services are null if initialization fails
    app = null;
    auth = null;
    db = null;
    const message = "Firebase SDK initialization failed. Auth and DB features will be disabled. Double-check all Firebase credentials and project setup.";
    if (typeof window === 'undefined') {
      console.error(`
        ****************************************************************************************
        ${message}
        ****************************************************************************************
      `);
    } else {
       console.error(message);
    }
  }
} else {
  const message = `One or more required Firebase environment variables are missing or placeholders: ${missingOrPlaceholderKeys.join(', ')}. Firebase SDK will NOT be initialized. Auth and DB features will be disabled.`;
  if (typeof window === 'undefined') {
    console.error(`
      ****************************************************************************************
      CRITICAL: ${message}
      Please check your .env file and ensure all NEXT_PUBLIC_FIREBASE_... variables are correctly set.
      ****************************************************************************************
    `);
  } else {
     console.warn(`FIREBASE WARNING: ${message} Please check your .env file.`);
  }
  // app, auth, db remain null by default if allConfigsPresent is false
}

export { app, auth, db };
