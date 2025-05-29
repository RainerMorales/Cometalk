// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrNwl2bsBCUQ3fJcUcUvACRt2sl3_4bfA",
  authDomain: "cometalk-d1401.firebaseapp.com",
  projectId: "cometalk-d1401",
  storageBucket: "cometalk-d1401.firebasestorage.app",
  messagingSenderId: "682800727972",
  appId: "1:682800727972:web:1fe124199ba6f85bdee331",
  measurementId: "G-XLRKZCXFHY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
