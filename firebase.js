// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
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
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };
export const db = getFirestore();
