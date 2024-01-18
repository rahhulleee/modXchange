// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhyYhJqHduu1xl9rkh9sYfEMgY6bOxnF4",
  authDomain: "modexchange-7c561.firebaseapp.com",
  projectId: "modexchange-7c561",
  storageBucket: "modexchange-7c561.appspot.com",
  messagingSenderId: "737110776037",
  appId: "1:737110776037:web:6baa10276ba1cd96869c0c",
  measurementId: "G-VPE6EDSTH8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase initialized successfully');
const analytics = getAnalytics(app);
const db = getFirestore(app);



const auth = getAuth(app);
export { auth, db };