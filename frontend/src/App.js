import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./container/Home.jsx";
import SearchBar from "./components/SearchBar.jsx";
import SearchFeed from "./components/SearchFeed.jsx";
import Logout from "./components/Logout.jsx";
import { useEffect } from "react";
import image from "./assets/axis_logo-05.png"
function App() {
  const token = localStorage.getItem("token");
  <Home/>
  return (
    <div className=" min-h-screen bg-black pt-1">
        <img width={"250px"} src={image}></img>
       
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search/:SearchTerm" element={<SearchFeed />} />
      </Routes>
    </div>
  );
}

export default App;
