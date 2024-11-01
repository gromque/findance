// Import the functions you need from the Firebase SDKs you want to use
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC07c7aH_sfxv5HJ8Br3tnuhi074y-7Sa4",
  authDomain: "findance-5047a.firebaseapp.com",
  projectId: "findance-5047a",
  storageBucket: "findance-5047a.appspot.com",
  messagingSenderId: "158555139909",
  appId: "1:158555139909:web:bbe091f0a024ca5c56182c",
  measurementId: "G-LJQ35ZT0WJ" // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
