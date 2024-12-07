
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_API_KEY,
  // authDomain: import.meta.env.VITE_AUTH_ID,
  // projectId: import.meta.env.VITE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_STORAGE_ID,
  // messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
  // appId: import.meta.env.VITE_APP_ID,

  apiKey: "AIzaSyByUOWAZyI79j_iuoXd-ptZINIjG7TATZQ",
  authDomain: "api-chat-78331.firebaseapp.com",
  projectId: "api-chat-78331",
  storageBucket: "api-chat-78331.appspot.com",
  messagingSenderId: "200344286458",
  appId: "1:200344286458:web:825ce6e49501653a310543",

};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);