import { initializeApp } from "firebase/app";
import {getFirestore, getStorage} from "@firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBsbXujxaXYnUblZXCryZObYL6sgyhZS7A",
//   authDomain: "umd-foodie.firebaseapp.com",
//   projectId: "umd-foodie",
//   storageBucket: "umd-foodie.appspot.com",
//   messagingSenderId: "412346293089",
//   appId: "1:412346293089:web:645d0ef53dcfea58398320",
//   measurementId: "G-5DHKWMMGD6"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const firestore = getFirestore(app);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCroielwgkwU_ZIWJFLVksc8ptdWrXu6YI",
  authDomain: "umd-foodies.firebaseapp.com",
  projectId: "umd-foodies",
  storageBucket: "umd-foodies.appspot.com",
  messagingSenderId: "772481496493",
  appId: "1:772481496493:web:c7fb0108a9a0f8cfecdd24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app)