import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlYShU_ZKDGrsoo9i1lm7zuDYjCWqCN34",
  authDomain: "clone-reactjs-2d8e0.firebaseapp.com",
  projectId: "clone-reactjs-2d8e0",
  storageBucket: "clone-reactjs-2d8e0.appspot.com",
  messagingSenderId: "643683881478",
  appId: "1:643683881478:web:b5a13424a747970960a987"
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export {
  db,
  auth,
  provider,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
  signInWithPopup,
  onAuthStateChanged,
  signOut
};
