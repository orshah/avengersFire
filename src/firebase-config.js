// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZc71ZvHOz1h8litIwnrLcok4oB6cGfwY",
  authDomain: "fir-todo-4f31f.firebaseapp.com",
  projectId: "fir-todo-4f31f",
  storageBucket: "fir-todo-4f31f.appspot.com",
  messagingSenderId: "18458391437",
  appId: "1:18458391437:web:2aa65774878110b5ff43c4",
  measurementId: "G-QMSZ3GM405",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
