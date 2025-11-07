// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoWndrvluyQ7qV9NKgAhkgkYjJuKaLqBI",
  authDomain: "proyectofinal-noticias.firebaseapp.com",
  projectId: "proyectofinal-noticias",
  storageBucket: "proyectofinal-noticias.firebasestorage.app",
  messagingSenderId: "851490735485",
  appId: "1:851490735485:web:854ccb4936b0ef4fd0f814"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);