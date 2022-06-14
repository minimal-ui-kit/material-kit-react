// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxaTEewm79JCVPNpLKny4O_oJ-VJ41Ndg",
  authDomain: "move-89a33.firebaseapp.com",
  projectId: "move-89a33",
  storageBucket: "move-89a33.appspot.com",
  messagingSenderId: "706994731823",
  appId: "1:706994731823:web:5b74dca6067ff51278ffda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };