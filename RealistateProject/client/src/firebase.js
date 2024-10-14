// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBa870XHh-5krwpsgLnkEBkmDVUEC3whNc',
  authDomain: "mern-realestate-project-fcf74.firebaseapp.com",
  projectId: "mern-realestate-project-fcf74",
  storageBucket: "mern-realestate-project-fcf74.appspot.com",
  messagingSenderId: "729614450295",
  appId: "1:729614450295:web:1ee59e599174513d79d072"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);