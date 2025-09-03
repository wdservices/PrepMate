
import { initializeApp, getApps, getApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

// IMPORTANT: The Firebase configuration is hardcoded here to resolve a persistent
// "auth/api-key-not-valid" error that can occur if environment variables (.env)
// are not loaded correctly in some development environments.
// For production, it is highly recommended to move this configuration back into
// environment variables (e.g., process.env.NEXT_PUBLIC_FIREBASE_API_KEY).
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyBCWamjKQNslH08io4ovsWykHpYVljwHo8",
  authDomain: "prepmate-6eb9d.firebaseapp.com",
  projectId: "prepmate-6eb9d",
  storageBucket: "prepmate-6eb9d.firebasestorage.app",
  messagingSenderId: "322875549685",
  appId: "1:322875549685:web:8b6e70dc551992c753a2bc"
};


// Initialize Firebase
let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let functions = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

try {
    // Basic check to ensure config is not empty
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
        throw new Error("Firebase configuration is missing critical values (apiKey, projectId).");
    }
    
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    auth = getAuth(app);
    functions = getFunctions(app);
    db = getFirestore(app);
    storage = getStorage(app);

    if(typeof window !== 'undefined'){
        console.log(`Firebase SDK initialized successfully for project: ${firebaseConfig.projectId}`);
    }
} catch (error) {
    console.error("CRITICAL: Firebase initialization error:", error);
    // In case of error, set to null to avoid breaking the app on the client
    app = null;
    auth = null;
    functions = null;
    db = null;
    storage = null;
}

// Export Firebase services
export { app, auth, functions, db, storage };
