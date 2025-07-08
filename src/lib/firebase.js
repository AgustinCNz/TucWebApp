// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD3F1TZSbO4J96WOQ525J5ceuiPjndrlw",
  authDomain: "tucweb-d752d.firebaseapp.com",
  projectId: "tucweb-d752d",
  storageBucket: "tucweb-d752d.firebasestorage.app",
  messagingSenderId: "792220064754",
  appId: "1:792220064754:web:3cf441fa9bdb3dc177696b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export { auth };