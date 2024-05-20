import React, { useEffect } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuth, isAuth }) => {
  // Navigateを使うためのインスタンス化の記述。
  const navgate = useNavigate();
  // googleからログアウト
  const logoutFromGoogle = () => {
    // authはユーザーの情報が格納されている。
    signOut(auth).then(() => {
      // ローカルストレージのキャッシュをクリア
      localStorage.clear();
      // 状態変数をfalseに戻す
      setIsAuth(false);
      // ログインページにリダイレクト
      navgate("/login");
    });
  };

  // ログインしていないとき（!isAuthがtrue）、/logoutが叩かれてもloginにリダイレクトさせる
  useEffect(() => {
    if (!isAuth) {
      navgate("/login");
    }
  }, []);

  return (
    <div>
      <p>ログアウトする</p>
      <button onClick={logoutFromGoogle}>Googleでログアウト</button>
    </div>
  );
};

export default Logout;
