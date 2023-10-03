import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqsZapLwVIPrHOJnfUNQ-vQ_omiloIv_Y",
  authDomain: "m-city-9ff4c.firebaseapp.com",
  projectId: "m-city-9ff4c",
  storageBucket: "m-city-9ff4c.appspot.com",
  messagingSenderId: "713955481301",
  appId: "1:713955481301:web:481c4acd51819f79c6b45c",
  measurementId: "G-W55SY7DE95"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
