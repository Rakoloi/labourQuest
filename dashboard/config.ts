import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyBmK-nzDZArLok-jICypl1Grfiy6Zf0v-o",
  // authDomain: "ijob-b6948.firebaseapp.com",
  // projectId: "ijob-b6948",
  // storageBucket: "ijob-b6948.firebasestorage.app",
  // messagingSenderId: "431595290912",
  // appId: "1:431595290912:web:1465fa009d432392a3d745",
  // measurementId: "G-73BP5F8NS2",

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_Measurement_ID!,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);