// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjW03NyeT3zZEQFrU8LXKK1aIfyUWIw2o",
  authDomain: "pathfinderedu-dc6d0.firebaseapp.com",
  databaseURL: "https://pathfinderedu-dc6d0-default-rtdb.firebaseio.com",
  projectId: "pathfinderedu-dc6d0",
  storageBucket: "pathfinderedu-dc6d0.appspot.com",
  messagingSenderId: "294288749116",
  appId: "1:294288749116:web:0ffd24548bb56de4150939",
  measurementId: "G-1PN8HWY5LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app); // Export the auth instance

export { db, auth };
export default app;
