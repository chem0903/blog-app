import React, { useEffect } from "react";
import "./Home.css";
import { collection, deleteDoc, getDocs, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const NotFound = () => {


  return (
    <div className="homePage">
      <h5>Not Found</h5>
    </div>
  );
};

export default NotFound;
