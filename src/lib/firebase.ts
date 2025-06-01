
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

// Explicitly define what firebaseConfig will look like using process.env
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Keys considered essential for a basic Firebase App initialization, especially for Auth.
const CRITICAL_CONFIG_KEYS: (keyof FirebaseOptions)[] = ['apiKey', 'authDomain', 'projectId', 'appId'];

let allCriticalConfigsPresent = true;
const missingOrPlaceholderCriticalKeys: string[] = [];

for (const key of CRITICAL_CONFIG_KEYS) {
  const value = firebaseConfig[key];
  // Construct the expected environment variable name for logging
  // Simplified key to env var name logic, assuming direct mapping for these specific keys
  const envVarName = `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, (match) => `_${match}`).toUpperCase()}`;

  if (typeof value !== 'string' || !value || value.includes("YOUR_ACTUAL_") || value.includes("_HERE") || value.trim() === "") {
    allCriticalConfigsPresent = false;
    missingOrPlaceholderCriticalKeys.push(envVarName);
  }
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (allCriticalConfigsPresent) {
  try {
    if (typeof window !== 'undefined') {
      // Client-side: Log only that an attempt is being made.
      console.log("Attempting to initialize Firebase on the client...");
    } else {
      // Server-side or build-time
      console.log("Attempting to initialize Firebase (server-side/build)...");
    }
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app); // Initialize Firestore as well

    if (typeof window === 'undefined') {
      console.log("Firebase SDK initialized successfully on the server (or during build).");
    } else {
      console.log("Firebase SDK initialized successfully on the client.");
    }
  } catch (error: any) {
    const errorMsg = `CRITICAL: Firebase SDK initialization failed: ${error.message || error.toString()}`;
    const configSummaryForLog = {
        apiKey: firebaseConfig.apiKey ? 'SET' : 'NOT_SET_OR_EMPTY',
        authDomain: firebaseConfig.authDomain || 'NOT_SET_OR_EMPTY',
        projectId: firebaseConfig.projectId || 'NOT_SET_OR_EMPTY',
        appId: firebaseConfig.appId || 'NOT_SET_OR_EMPTY',
      };

    if (typeof window === 'undefined') {
      console.error("****************************************************************************************");
      console.error(errorMsg + " (Server-side or build error)");
      console.error("Firebase config summary used:", JSON.stringify(configSummaryForLog));
      console.error("****************************************************************************************");
    } else {
      console.error(errorMsg + " (Client-side error)");
      console.error("Firebase config summary used:", configSummaryForLog);
    }
    // Ensure services are null if initialization fails
    app = null;
    auth = null;
    db = null;
  }
} else {
  const message = `One or more CRITICAL Firebase environment variables are missing or use placeholder values: ${missingOrPlaceholderCriticalKeys.join(', ')}. Critical keys checked: ${CRITICAL_CONFIG_KEYS.join(', ')}. Firebase SDK will NOT be initialized. Auth and DB features will be disabled.`;
  if (typeof window === 'undefined') {
    console.error(`
      ****************************************************************************************
      CRITICAL: ${message} (Server-side or build)
      Please check your .env file and ensure all NEXT_PUBLIC_FIREBASE_... variables for these critical keys are correctly set and non-empty.
      ****************************************************************************************
    `);
  } else {
     console.warn(`FIREBASE WARNING: ${message} (Client-side) Please check your .env file.`);
  }
  // app, auth, db remain null by default if critical configs are not present
}

export { app, auth, db };
