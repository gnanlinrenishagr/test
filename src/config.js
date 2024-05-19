import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQnfJGWTvLcqXhyqxb8W_GY-yogP-BWdY",
  authDomain: "my-app-6a827.firebaseapp.com",
  projectId: "my-app-6a827",
  storageBucket: "my-app-6a827.appspot.com",
  messagingSenderId: "299895393598",
  appId: "1:299895393598:web:496088b2f994a9dd55b06f",
  measurementId: "G-1J8LS6VF7J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, getDocs, doc, updateDoc, addDoc, deleteDoc };
