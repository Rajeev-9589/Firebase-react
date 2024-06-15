// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALfSnSaCAV7VUKa-Ahv9Cp81IjSEtBFBc",
  authDomain: "todo-498d2.firebaseapp.com",
  projectId: "todo-498d2",
  storageBucket: "todo-498d2.appspot.com",
  messagingSenderId: "1011119757429",
  appId: "1:1011119757429:web:c8c97504e23ed4d25b403c"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };
