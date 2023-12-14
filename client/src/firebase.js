import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fullstackproject-20e32.firebaseapp.com",
  projectId: "fullstackproject-20e32",
  storageBucket: "fullstackproject-20e32.appspot.com",
  messagingSenderId: "273897815257",
  appId: "1:273897815257:web:9342efc12c8fd204c792c8",
};

export const app = initializeApp(firebaseConfig);
