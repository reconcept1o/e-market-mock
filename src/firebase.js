// src/firebase.js

// Gerekli fonksiyonları firebase'den import ediyoruz
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore için bu gerekli!

// Your web app's Firebase configuration (Bu bilgiler doğru)
const firebaseConfig = {
  apiKey: "AIzaSyC3LtZG9WMDrehBUGbljWNx_WcJyt6E2oA",
  authDomain: "kendimden-d8fd0.firebaseapp.com",
  projectId: "kendimden-d8fd0",
  storageBucket: "kendimden-d8fd0.firebasestorage.app",
  messagingSenderId: "421136705163",
  appId: "1:421136705163:web:7250d426f21cab523c168e",
  measurementId: "G-5QRCRCMH8K"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Cloud Firestore'u başlat ve db objesi olarak dışarı aktar
// Home.jsx bu 'db' objesini kullanacak
export const db = getFirestore(app);