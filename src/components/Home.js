import React, { useEffect } from "react";
import "./Home.css";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const Home = () => {
  const [postList, setPostList] = useState([]);
  // const navgate = useNavigate();

  // 第二引数に空配列を渡すと、最初リロードしたときのみ発火するメソッドを作成できる。
  // つまり、この中のコールバック関数は最初のリロード以降実行されることはない。
  // 注）リロードとは直前のパスを再び叩くことであるから、ページ内のボタンなどでパスが叩かれた場合もこの中のメソッドが発火する。
  useEffect(() => {
    const getPosts = async () => {
      // firestoreの標準メソッド。collectionの第二引数はコレクション名。
      // postやgetの指定は標準メソッド内で行ってくれている（今回はget: サ→デ）。
      // 戻り値として取得したデータがdataにオブジェクト形式で格納される。
      const data = await getDocs(collection(db, "posts"));
      // 確認。欲しいデータ（タイトル、テキストコンテンツ、名前、idなど）がどのプロパティにあるかをしっかり確認。
      // console.log(data);
      // console.log(data.docs);
      // console.log(data.docs.map((doc) => ({ doc })));
      // 深いネストになっており、欲しいデータを取ってくるのが大変だが、dataメソッドを用いると用意に取ってこれる。
      // console.log(data.docs.map((doc) => ({ ...doc.data() })));
      // console.log(data.docs.map((doc) => ({ ...doc.data().author.username })));
      // idの情報も追加。str = {a: あ, b: い}, newStr = {...str, c: う}として新たなオブジェクトを作成している。
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // 取得したデータを状態変数に格納
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const handleDelete = async (id) => {
    // docメソッドはdocumentを見に行くメソッド。deleteDocはドキュメントを削除するメソッド。どちらも標準メソッド。
    await deleteDoc(doc(db, "posts", id));
    // nativeとの違いは？→ nativeは現在とは異なるパスにリダイレクトするときに使う（React再レンダリングの仕様により）。
    // 今回はルートからルートのためwindow.location.hrefを使う。
    window.location.href = "/";
  };

  return (
    <div className="homePage">
      {postList.map((post) => (
        // リスト形式で等価な要素を複数出力する場合には、識別子（key）を一意に割り振る必要がある。
        // 一意であればなんでもよいが、今回はpost.id(setPostList引数中のid: doc.idのことで、firebase側でランダムに生成されている)を用いている。
        <div className="postContents" key={post.id}>
          <div className="postHeader">
            <h1>{post.title}</h1>
          </div>
          <div className="postTextContainer">{post.postText}</div>
          <div className="nameAndDeleteButton">
            <h3>@{post.author.username}</h3>
            {/* 記事投稿者のidと現在ログインしている人のidが一致している場合のみ削除ボタンを表示 */}
            {post.author.id === auth.currentUser?.uid && (
              <button onClick={() => handleDelete(post.id)}>削除</button>
            )}
            {/* 補足 */}
            {/* 1. jsx文のonClickなどのイベントメソッドに引数を渡したい場合はコールバック関数として呼び出すのであった（復習） */}
            {/* 2. auth.currentUser?.uidの?(オプショナルチェックイン)について。ログインしていない場合auth.currentUserがnullになってしまい、
            nullに対して、.uidのプロパティにアクセスしてしまうためホームに行くとエラーが出てしまう。そこで上記のようにすることで、nullであった場合には
            その次のプロパティにはアクセスされずに済む */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
