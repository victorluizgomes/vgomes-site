import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "vgomes-site.firebaseapp.com",
    projectId: "vgomes-site",
    storageBucket: "vgomes-site.appspot.com",
    messagingSenderId: "609994544380",
    appId: "1:609994544380:web:be6fe960fc8bca921bf379",
    measurementId: "G-M8106Y69T3"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { storage, db };