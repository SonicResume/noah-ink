import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrck1di7_N7B2d-H8mwZud17N9CYgC8wc",
  authDomain: "resume-97612.firebaseapp.com",
  projectId: "resume-97612",
  storageBucket: "resume-97612.firebasestorage.app",
  messagingSenderId: "1096541776873",
  appId: "1:1096541776873:web:090059b8a4e4f6098f7978",
  measurementId: "G-52VSD5BLHP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Keep users signed in between refreshes
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Persistence error:", err);
});