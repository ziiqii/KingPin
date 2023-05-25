// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
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

// Initialize Firebase app, check if app is already initialized
var app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps();
}

// Initialize our own auth, and use async storage for auth persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore();
