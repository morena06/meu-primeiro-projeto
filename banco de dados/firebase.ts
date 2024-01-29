// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firestore from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmSYJKZZZn8mOScNPXDmueCpig1mq_B4s",
  authDomain: "teste-5c122.firebaseapp.com",
  projectId: "teste-5c122",
  storageBucket: "teste-5c122.appspot.com",
  messagingSenderId: "938718952667",
  appId: "1:938718952667:web:2ef54759e036034c0d60fe",
  measurementId: "G-RE0WH5R8ME"
};

// Initialize Firebase
console.log('Conectado ao Firebase!')
const Firebase = initializeApp(firebaseConfig);
export const db = firestore.getFirestore(Firebase)

export { firestore }