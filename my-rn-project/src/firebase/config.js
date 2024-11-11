import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCMsWRfx1JVikr4QMOM2WS46FgiPKj-Pmk",
  authDomain: "pisegundaparte.firebaseapp.com",
  projectId: "pisegundaparte",
  storageBucket: "pisegundaparte.firebasestorage.app",
  messagingSenderId: "644866193982",
  appId: "1:644866193982:web:16d4adb77e981ba776ef6f"

};
app.initializeApp(firebaseConfig);


export const auth = firebase.auth(); // Obtener la instancia de autenticación
export const db = app.firestore(); // Obtener la instancia de Realtime Database. LA CAMBIE RECIEN 
export const storage = app.storage(); // Obtener la instancia de Storage

