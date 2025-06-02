
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgpd1npqTYHcvvPRmDNYErrVxnN4fi-gY",
  authDomain: "petshop-a6ab2.firebaseapp.com",
  projectId: "petshop-a6ab2",
  storageBucket: "petshop-a6ab2.firebasestorage.app",
  messagingSenderId: "112712715612",
  appId: "1:112712715612:web:dd354bc297de07d45a4599",
  measurementId: "G-8EF2LGZ3HT"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const db = getFirestore(app);

export {auth,db};