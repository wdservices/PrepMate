"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = exports.getFirestoreDb = exports.auth = exports.app = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var functions_1 = require("firebase/functions");
var firestore_1 = require("firebase/firestore");
var firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
var db = null;
// Initialize Firebase
var app = !(0, app_1.getApps)().length ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApp)();
exports.app = app;
var auth = (0, auth_1.getAuth)(app);
exports.auth = auth;
var functions = (0, functions_1.getFunctions)(app);
exports.functions = functions;
// Function to get Firestore DB instance, ensuring it's initialized
var getFirestoreDb = function () {
    if (!db) {
        db = (0, firestore_1.getFirestore)(app);
    }
    return db;
};
exports.getFirestoreDb = getFirestoreDb;
