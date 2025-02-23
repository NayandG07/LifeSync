import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
  throw new Error(
    "Firebase configuration is missing. Please set FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, and FIREBASE_CLIENT_EMAIL environment variables.",
  );
}

// Initialize Firebase Admin
const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  }),
});

// Get Firestore instance
export const db = getFirestore(app);

// Collection references
export const usersCollection = db.collection('users');
export const moodsCollection = db.collection('moods');
export const symptomsCollection = db.collection('symptoms');
export const healthMetricsCollection = db.collection('health_metrics');

// Helper function to convert Firestore timestamp to Date
export const timestampToDate = (timestamp: FirebaseFirestore.Timestamp): Date => {
  return timestamp.toDate();
};

// Helper function to convert Date to Firestore timestamp
export const dateToTimestamp = (date: Date): FirebaseFirestore.Timestamp => {
  return FirebaseFirestore.Timestamp.fromDate(date);
}; 