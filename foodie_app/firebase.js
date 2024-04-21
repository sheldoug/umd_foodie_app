import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsbXujxaXYnUblZXCryZObYL6sgyhZS7A",
  authDomain: "umd-foodie.firebaseapp.com",
  projectId: "umd-foodie",
  storageBucket: "umd-foodie.appspot.com",
  messagingSenderId: "412346293089",
  appId: "1:412346293089:web:645d0ef53dcfea58398320",
  measurementId: "G-5DHKWMMGD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);