import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { fetchHistoryData } from "./my-modules/fetchHistoryData.js";
import { submitData } from "./my-modules/submit-data.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3aJfzZ74kB2VnK_tFgAla4gALFuUlMXQ",
  authDomain: "daily-report-7eff0.firebaseapp.com",
  projectId: "daily-report-7eff0",
  storageBucket: "daily-report-7eff0.firebasestorage.app",
  messagingSenderId: "658851324236",
  appId: "1:658851324236:web:735906b84f6c42cc192fe9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

  //fetchHistoryDataインポート
  if (document.getElementById("js-history")) {
    fetchHistoryData(getDocs, collection, db);
  }

  //submitDataインポート
  if (document.getElementById("js-form")) {
    document
      .getElementById("js-form")
      .addEventListener("submit", (e) => submitData(e, addDoc, collection, db));
  }
