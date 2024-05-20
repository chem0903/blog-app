import { initializeApp } from "firebase/app";
// authとfirestore(firebase中のデータベース機能)をインポート
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgXaMlqB47xqwvwY7kjfHF1dA1B9sIlJI",
  authDomain: "udemy-blog-with-firebase.firebaseapp.com",
  projectId: "udemy-blog-with-firebase",
  storageBucket: "udemy-blog-with-firebase.appspot.com",
  messagingSenderId: "46701044392",
  appId: "1:46701044392:web:5ab0eb9776c2f1550c589d",
};

// reactとfirestoreを結びつけるための記述（初期化）。
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
