import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, query, where, orderBy, limit, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXdOPUnGHOw1ukqBBZZJ9mdJUV0juJJ6U",
  authDomain: "lifesync-app-b2558.firebaseapp.com",
  projectId: "lifesync-app-b2558",
  storageBucket: "lifesync-app-b2558.firebasestorage.app",
  messagingSenderId: "647875324235",
  appId: "1:647875324235:web:7d8275db9b538da6ffe0ce",
  measurementId: "G-HL8KQL225T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch(console.error);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firestore
const db = getFirestore(app);

// Collection References
export const usersCollection = collection(db, 'users');
export const healthMetricsCollection = collection(db, 'healthMetrics');
export const moodEntriesCollection = collection(db, 'moodEntries');
export const waterIntakeCollection = collection(db, 'waterIntake');
export const medicationsCollection = collection(db, 'medications');
export const chatMessagesCollection = collection(db, 'chatMessages');

// Helper Functions
export const getUserProfile = async (userId: string) => {
  const userDoc = await getDoc(doc(usersCollection, userId));
  return userDoc.data();
};

export const updateUserProfile = async (userId: string, data: any) => {
  await setDoc(doc(usersCollection, userId), data, { merge: true });
};

export const saveHealthMetrics = async (userId: string, metrics: any) => {
  const docRef = doc(healthMetricsCollection, userId);
  await setDoc(docRef, {
    ...metrics,
    timestamp: Timestamp.now(),
    userId
  }, { merge: true });
};

export const saveMoodEntry = async (userId: string, moodData: any) => {
  const docRef = doc(moodEntriesCollection);
  await setDoc(docRef, {
    ...moodData,
    timestamp: Timestamp.now(),
    userId
  });
};

export const updateWaterIntake = async (userId: string, intakeData: any) => {
  const docRef = doc(waterIntakeCollection, userId);
  await setDoc(docRef, {
    ...intakeData,
    timestamp: Timestamp.now(),
    userId
  }, { merge: true });
};

export const updateMedications = async (userId: string, medicationData: any) => {
  const docRef = doc(medicationsCollection, userId);
  await setDoc(docRef, {
    ...medicationData,
    timestamp: Timestamp.now(),
    userId
  }, { merge: true });
};

export const saveChatMessage = async (userId: string, message: any) => {
  const docRef = doc(chatMessagesCollection);
  await setDoc(docRef, {
    ...message,
    timestamp: Timestamp.now(),
    userId
  });
};

export const getDailyHealthMetrics = async (userId: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const q = query(
    healthMetricsCollection,
    where('userId', '==', userId),
    where('timestamp', '>=', today),
    orderBy('timestamp', 'desc'),
    limit(1)
  );
  
  return q;
};

export { app, auth, db };