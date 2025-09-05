// src/config/firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Configuración de Firebase (reemplaza con tus propios valores)
const firebaseConfig = {
  apiKey: "AIzaSyDSy_mXKRVfloOMePunm0TvRit1q4r_4oc",
  authDomain: "ayudandolesatriunfar-245c1.firebaseapp.com",
  projectId: "ayudandolesatriunfar-245c1",
  storageBucket: "ayudandolesatriunfar-245c1.firebasestorage.app",
  messagingSenderId: "562673290693",
  appId: "1:562673290693:web:ed4df3c234712831574fac",
  measurementId: "G-P27SZLS5GN"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Realtime Database
const database = getDatabase(app);

// Exportar la instancia de la base de datos
export { database };