import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Initialize Firebase
const firebaseConfig = {
    // Your Firebase configuration
    apiKey: "AIzaSyDT271ghPffAyZnYmYx9PLEQfz1xD5cV-Q",
    authDomain: "olx-clone-bffae.firebaseapp.com",
    projectId: "olx-clone-bffae",
    storageBucket: "olx-clone-bffae.appspot.com",
    messagingSenderId: "680254567043",
    appId: "1:680254567043:web:471969eded8601ade061b6",
    measurementId: "G-T4LP1HPYHE"
};

const app = initializeApp(firebaseConfig);

export default app;
