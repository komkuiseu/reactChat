import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyAT9WLeEb9wt41blo-YAjieg_kxGL9iy38",
  authDomain: "reactchat-72803.firebaseapp.com",
  projectId: "reactchat-72803",
  storageBucket: "reactchat-72803.appspot.com",
  messagingSenderId: "279651162054",
  appId: "1:279651162054:web:15ceb36b8a33e7e28604c7"
};


const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const db =getFirestore()
export const storage=getStorage()