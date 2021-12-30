import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9YBlbLQ59pHNqmQO8e_sZvOLm5pQoUiY",
  authDomain: "journal-app-b2ec2.firebaseapp.com",
  projectId: "journal-app-b2ec2",
  storageBucket: "journal-app-b2ec2.appspot.com",
  messagingSenderId: "1032005234284",
  appId: "1:1032005234284:web:ad1d38368c71df95fab249",
  measurementId: "G-J007L6QS82"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();
const auth = getAuth();

export {
    db,
    googleAuthProvider,
    auth
}