// Import the functions you need from the SDKs you need
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgxcV3PKT_agkWf0uJWTY4P5KAIArWU14",
  authDomain: "kingpin-e51a4.firebaseapp.com",
  projectId: "kingpin-e51a4",
  storageBucket: "kingpin-e51a4.appspot.com",
  messagingSenderId: "180440714870",
  appId: "1:180440714870:web:cb7327224c7919c68e1957",
  measurementId: "G-J6CEF38E6S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);


export const db = getFirestore();
