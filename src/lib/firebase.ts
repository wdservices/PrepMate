
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

const CRITICAL_CONFIG_KEYS: (keyof FirebaseOptions)[] = ['apiKey', 'authDomain', 'projectId', 'appId'];
// This is the named database ID you confirmed for the 'prepmate-nrnik' project
const FIREBASE_DATABASE_ID = "prepmatedataupload"; 

let allCriticalConfigsPresent = true;
const missingOrPlaceholderCriticalKeys: string[] = [];
const presentCriticalKeys: Record<string, string> = {};

for (const key of CRITICAL_CONFIG_KEYS) {
  const value = firebaseConfig[key];
  const envVarName = `NEXT_PUBLIC_FIREBASE_${key.replace(/([A-Z])/g, (match) => `_${match}`).toUpperCase()}`;

  if (typeof value === 'string' && value && !value.includes("YOUR_ACTUAL_") && !value.includes("_HERE") && value.trim() !== "") {
    presentCriticalKeys[envVarName] = value;
  } else {
    allCriticalConfigsPresent = false;
    missingOrPlaceholderCriticalKeys.push(`${envVarName} (Value: ${value === undefined ? 'undefined' : `"${value}"`})`);
  }
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;

if (typeof window !== 'undefined') {
  console.log("Firebase Initialization Check (Client-side):");
  console.log("  Attempting to use environment variables for Firebase config.");
  console.log("  Target Firebase Project ID from .env:", firebaseConfig.projectId);
  console.log("  Target Firestore Database ID:", FIREBASE_DATABASE_ID);
  console.log("  Critical Config Keys Present & Valid in .env:", presentCriticalKeys);
  if (missingOrPlaceholderCriticalKeys.length > 0) {
    console.error("  CRITICAL Missing/Placeholder Firebase Config Keys in .env:", missingOrPlaceholderCriticalKeys);
  }
}

if (allCriticalConfigsPresent) {
  try {
    if (typeof window === 'undefined') {
      // console.log("Attempting to initialize Firebase (server-side/build)...");
    } else {
      // console.log("Attempting to initialize Firebase on the client...");
    }
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    
    if (FIREBASE_DATABASE_ID && FIREBASE_DATABASE_ID !== "(default)") {
        db = getFirestore(app, FIREBASE_DATABASE_ID);
        console.log(`Firebase SDK initialized. Using NAMED Firestore database: '${FIREBASE_DATABASE_ID}' for project '${firebaseConfig.projectId}'.`);
    } else {
        db = getFirestore(app); 
        console.log(`Firebase SDK initialized. Using DEFAULT Firestore database for project '${firebaseConfig.projectId}'.`);
    }

    if (typeof window === 'undefined') {
      // console.log(`Firebase SDK initialized successfully on the server (or during build). Auth and DB (ID: ${FIREBASE_DATABASE_ID}) services should be available for project ${firebaseConfig.projectId}.`);
    } else {
      // console.log(`Firebase SDK initialized successfully on the client. Auth and DB (ID: ${FIREBASE_DATABASE_ID}) services should be available for project ${firebaseConfig.projectId}.`);
    }
  } catch (error: any) {
    const errorMsg = `CRITICAL: Firebase SDK initialization FAILED: ${error.message || error.toString()}`;
    const configSummaryForLog = {
        apiKey: firebaseConfig.apiKey ? 'SET_OK' : 'NOT_SET_OR_EMPTY_OR_PLACEHOLDER',
        authDomain: firebaseConfig.authDomain && !firebaseConfig.authDomain.includes("YOUR_ACTUAL_") ? 'SET_OK' : 'NOT_SET_OR_EMPTY_OR_PLACEHOLDER',
        projectId: firebaseConfig.projectId && !firebaseConfig.projectId.includes("YOUR_ACTUAL_") ? 'SET_OK' : 'NOT_SET_OR_EMPTY_OR_PLACEHOLDER',
        appId: firebaseConfig.appId && !firebaseConfig.appId.includes("YOUR_ACTUAL_") ? 'SET_OK' : 'NOT_SET_OR_EMPTY_OR_PLACEHOLDER',
        databaseId: FIREBASE_DATABASE_ID,
      };

    if (typeof window === 'undefined') {
      console.error("****************************************************************************************");
      console.error(errorMsg + " (Server-side or build error)");
      console.error("Firebase config summary used (based on values, not actual content):", JSON.stringify(configSummaryForLog));
      console.error("****************************************************************************************");
    } else {
      console.error(errorMsg + " (Client-side error)");
      console.error("Firebase config summary used (based on values, not actual content):", configSummaryForLog);
    }
    app = null;
    auth = null;
    db = null;
  }
} else {
  const message = `One or more CRITICAL Firebase environment variables are missing or use placeholder values. Firebase SDK will NOT be initialized. Auth and DB features will be disabled.`;
  if (typeof window === 'undefined') {
    console.error(`
      ****************************************************************************************
      CRITICAL: ${message} (Server-side or build)
      Missing or placeholder critical keys: ${missingOrPlaceholderCriticalKeys.join(', ')}.
      Critical keys checked: ${CRITICAL_CONFIG_KEYS.join(', ')}.
      Please check your .env file and ensure all NEXT_PUBLIC_FIREBASE_... variables for these critical keys are correctly set, non-empty, and not using placeholder text.
      ****************************************************************************************
    `);
  } else {
     console.error(`CRITICAL: ${message} (Client-side)
     Missing or placeholder critical keys: ${missingOrPlaceholderCriticalKeys.join(', ')}.
     Critical keys checked: ${CRITICAL_CONFIG_KEYS.join(', ')}.
     Please check your .env file. Auth and DB services will be unavailable.`);
  }
}

export { app, auth, db };
