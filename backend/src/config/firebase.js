// backend/src/config/firebase.js
import { initializeApp } from 'firebase/app'

// Configuración de tu proyecto Firebase (idéntica a la de front)
const firebaseConfig = {
  apiKey: "AIzaSyCD3F1TZSbO4J96WOQ525J5ceuiPjndrlw",
  authDomain: "tucweb-d752d.firebaseapp.com",
  projectId: "tucweb-d752d",
  storageBucket: "tucweb-d752d.firebasestorage.app",
  messagingSenderId: "792220064754",
  appId: "1:792220064754:web:3cf441fa9bdb3dc177696b"
}

// Inicializa la app de Firebase
export const firebaseApp = initializeApp(firebaseConfig)
