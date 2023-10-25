// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFKys5Nx2rcGqk5bDUsztNf9Ij7LIO9kQ",
    authDomain: "dragon-news-auth-a2eed.firebaseapp.com",
    projectId: "dragon-news-auth-a2eed",
    storageBucket: "dragon-news-auth-a2eed.appspot.com",
    messagingSenderId: "21010470014",
    appId: "1:21010470014:web:430000c51abda0f5b8742f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;