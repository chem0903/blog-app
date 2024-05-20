import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {
  // Navigateを使うためのインスタンス化の記述。
  const navgate = useNavigate();
  // googleでログイン
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // signInWithPopup(auth, provider)の記述だけでもログインはできる。（ログインしたユーザー情報はオブジェクト形式でresultに渡される。）
      // console.log(result);
      // しかし、ユーザー情報を保存しないと、リロードするとその情報は失われてしまう。
      // ブラウザにはローカルストレージが存在し、そこに一時的に情報を保存しておくことができる（管理者ツールからApplication→localstorageで確認）。
      // 第一引数にキー（プロパティ）名、第二引数に値を代入。
      localStorage.setItem("isAuth", true);
      // ログインした＝trueという形で情報を代入。
      setIsAuth(true);
      // ルートパスにリダイレクトする（JSでのres.redirect("index.html")）。
      navgate("/");
    });
  };
  return (
    <div>
      <p>ログインして始める</p>
      <button onClick={loginWithGoogle}>Googleでログイン</button>
    </div>
  );
};

export default Login;
