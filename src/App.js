import "./App.css";
// BrowserRouterと書くのを簡略化できる。
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Navbar from "./components/Navbar";
import { useState } from "react";
import NotFound from "./components/NotFound";

function App() {
  // ユーザーがログインしたかどうかを管理する状態変数。（プロップスでlogin.jsに渡す）
  // これだと、リロードするたびにfalseがセットされてしまい、ログアウト状態になってしまう。
  // const [isAuth, setIsAuth] = useState(false);
  // 以下のように、初期値をローカルストレージから取ってくることでローカルストレージ（JSの標準オブジェクト）の状態が常に反映される。
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <Router basename="/blog-app">
      <Navbar isAuth={isAuth} />
      <Routes>
        {/* ルーティング：以下の記述で"/"を叩くとHomeコンポーネントを出力することができる。
        jsの、get("/", (req, res) => res.render("index.html")) */}
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route
          path="/logout"
          element={<Logout setIsAuth={setIsAuth} isAuth={isAuth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
