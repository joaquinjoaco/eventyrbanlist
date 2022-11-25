import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
     apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
     projectId: process.env.REACT_APP_PROJECT_ID,
     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_MESSAGING_SERVER_ID,
     appId: process.env.REACT_APP_APPID,
     measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
