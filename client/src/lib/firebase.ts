import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "A1zsSyCWSTA98e9j5jThI4-7X16n8oH-pHWkD2",
  authDomain: "lifesync-320ze.firebaseapp.com",
  projectId: "lifesync-320ze",
  storageBucket: "lifesync-320ze.firebasestorage.app",
  messagingSenderId: "740137400429",
  appId: "1:740137400429:web:d5c9b9d8d9cb82cb2764",
  measurementId: "G-LSDFA47WDL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
