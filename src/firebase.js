import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
     apiKey: "AIzaSyDHbrxWPP-vHl2HdHR54zTCpWec596rfuU",
     authDomain: "eventyrbanlist.firebaseapp.com",
     projectId: "eventyrbanlist",
     storageBucket: "eventyrbanlist.appspot.com",
     messagingSenderId: "999683237408",
     appId: "1:999683237408:web:c36560541f8590d8a4be45",
     measurementId: "G-F1TE0G0L0D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
