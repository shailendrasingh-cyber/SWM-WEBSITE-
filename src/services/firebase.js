// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAoM6ibpwo8shVdCHKkt5AfekfmNmiJNc",
    authDomain: "dustbin-5d55a.firebaseapp.com",
    databaseURL: "https://dustbin-5d55a-default-rtdb.firebaseio.com",
    projectId: "dustbin-5d55a",
    storageBucket: "dustbin-5d55a.appspot.com",
    messagingSenderId: "335568282600",
    appId: "1:335568282600:web:58dffc4d4b57c65f7ffa5d",
    measurementId: "G-RZR2CFQYJE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase(app);


