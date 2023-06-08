// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCB6MjYTFtsiJ1_fwSrRLjM_l0cnKqv89M",
  authDomain: "reactproject-c34c1.firebaseapp.com",
  projectId: "reactproject-c34c1",
  storageBucket: "reactproject-c34c1.appspot.com",
  messagingSenderId: "858423401935",
  appId: "1:858423401935:web:db4abca9932d1e8e9106ba",
  measurementId: "G-J6FX3F9K97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);