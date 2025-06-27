
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

// Your web app's Firebase configuration is read from environment variables
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};


// Initialize Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

try {
    // Check if all necessary environment variables are set
    const areAllConfigsPresent = 
        firebaseConfig.apiKey &&
        firebaseConfig.authDomain &&
        firebaseConfig.projectId &&
        firebaseConfig.appId;
    
    if (!areAllConfigsPresent) {
        throw new Error("One or more critical Firebase environment variables are missing. Check your .env file.");
    }
    
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);

    if(typeof window !== 'undefined'){
        console.log(`Firebase SDK initialized successfully for project: ${firebaseConfig.projectId}`);
    }
} catch (error) {
    console.error("CRITICAL: Firebase initialization error:", error);
    // In case of error, set to null to avoid breaking the app on the client
    app = null;
    auth = null;
}

export { app, auth };
