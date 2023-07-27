import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout.jsx";

function Home() {
  const navigate = useNavigate()
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  },[]);
  return (
    <>
    <div>
        <div className=" flex justify-end">
        <Logout/>
        </div>
        <div className="w-[50%] m-auto mt-3 ">
          <SearchBar />
        </div>
      </div>
    
    </>
  );
}

export default Home;
