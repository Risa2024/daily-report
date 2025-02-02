import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3aJfzZ74kB2VnK_tFgAla4gALFuUlMXQ",
  authDomain: "daily-report-7eff0.firebaseapp.com",
  projectId: "daily-report-7eff0",
  storageBucket: "daily-report-7eff0.firebasestorage.app",
  messagingSenderId: "658851324236",
  appId: "1:658851324236:web:735906b84f6c42cc192fe9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = "";

  // reportsコレクションのデータを取得
  const querySnapshot = await getDocs(collection(db, "reports"));
  
  // データをテーブル表の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
  });
  document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById("js-history")) {
  fetchHistoryData(getDocs, collection, db);
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    const docRef = await addDoc(collection(db, "reports"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment"),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Cloud Firestoreにデータを送信する
if (document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => submitData(e, addDoc, collection, db));
}
