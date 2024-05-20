// {}は名前付きインポート、{}なしはデフォルトインポート（復習）。
import React, { useEffect, useState } from "react";
import "./CreatePost.css";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
  // Navigateを使うためのインスタンス化の記述。
  const navgate = useNavigate();
  // 投稿のタイトルと投稿内容の格納するための状態変数
  const [title, setTitle] = useState();
  const [postText, setPostText] = useState();

  const createPost = async () => {
    // console.log(title);
    // console.log(postText);
    // データ構造を定義し、firestoreにデータを送信（サ→デ）。
    // addDoc, collection, db, authなどの値は全てfirebaseが用意してくれているもの（import要チェック）。
    // collectionの第二引数はコレクション名。postやgetの指定は標準メソッド内で行ってくれている。
    await addDoc(collection(db, "posts"), {
      title: title,
      postText: postText,
      author: {
        username: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    });
    navgate("/");
  };

  // ログインしていないとき（!isAuthがtrue）、/createpostが叩かれてもloginにリダイレクトさせる
  useEffect(() => {
    if (!isAuth) {
      navgate("/login");
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="postContainer">
        <h1>記事を投稿する</h1>
        <div className="inputPost">
          <div>タイトル</div>
          <input
            type="text"
            placeholder="タイトルを記入"
            // onChangeはイベントメソッドなので、イベントオブジェクトを受け取ることができる。
            // event = {target:{value:"入力内容"}, ...}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="inputPost">
          <div>投稿</div>
          <textarea
            placeholder="投稿内容を記入"
            onChange={(e) => setPostText(e.target.value)}
          />
        </div>
        <button className="postButton" onClick={createPost}>
          投稿する
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
