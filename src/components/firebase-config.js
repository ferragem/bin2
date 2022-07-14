// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuFqsILQJK9mDBXbQwmK9_T3Ec_fCzl-0",
  authDomain: "bigmeta-d4066.firebaseapp.com",
  databaseURL: "https://bigmeta-d4066-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bigmeta-d4066",
  storageBucket: "bigmeta-d4066.appspot.com",
  messagingSenderId: "318360248788",
  appId: "1:318360248788:web:711c6d5494b5c6ace17641",
  measurementId: "G-FRFBEZHX8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);

