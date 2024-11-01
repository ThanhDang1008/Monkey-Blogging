// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyCzPS7LDCaQilJkCwbQ6MapHsojRssyJqg",
//   authDomain: "monkey-bloging-274cb.firebaseapp.com",
//   projectId: "monkey-bloging-274cb",
//   storageBucket: "monkey-bloging-274cb.appspot.com",
//   messagingSenderId: "7494354351",
//   appId: "1:7494354351:web:b4b9daa5fa9a20cbd75b5a",
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCzPS7LDCaQilJkCwbQ6MapHsojRssyJqg",
  authDomain: "monkey-bloging-274cb.firebaseapp.com",
  projectId: "monkey-bloging-274cb",
  storageBucket: "monkey-bloging-274cb.appspot.com",
  messagingSenderId: "7494354351",
  appId: "1:7494354351:web:b4b9daa5fa9a20cbd75b5a",
};

// Initialize Firebase app and services
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
