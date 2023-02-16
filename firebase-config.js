import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDdsqTucmXrm4QWE-tDbo7idxtCEGwSy4Y",
  authDomain: "interview-9995b.firebaseapp.com",
  projectId: "interview-9995b",
  storageBucket: "interview-9995b.appspot.com",
  messagingSenderId: "325664491085",
  appId: "1:325664491085:web:bbb1772915a10710cf7e04",
  measurementId: "G-8B3D0EQ6F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);