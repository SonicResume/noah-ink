import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // 👈 Added storage module import

const firebaseConfig = {
  apiKey: "AIzaSyBrck1di7_N7B2d-H8mwZud17N9CYgC8wc",
  authDomain: "resume-97612.firebaseapp.com",
  projectId: "resume-97612",
  storageBucket: "resume-97612.firebasestorage.app",
  messagingSenderId: "1096541776873",
  appId: "1:1096541776873:web:a4c43acb22a38cec8f7978",
  measurementId: "G-QVJGWT7HDE"
};

// Initialize Firebase once to prevent "already exists" errors during hot-reload
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export instances
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 

export default app;
