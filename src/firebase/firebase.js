import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsJbn4taj5RSA2P0Vx4YhnQJ1T-TF_XQQ",
  authDomain: "geo-rides.firebaseapp.com",
  projectId: "geo-rides",
  storageBucket: "geo-rides.firebasestorage.app",
  messagingSenderId: "923579841164",
  appId: "1:923579841164:web:b200bada837de4fc6619a9",
  measurementId: "G-RYFCW62M6V",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);

export default app;