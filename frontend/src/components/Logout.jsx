import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/user/logout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const data = await response.json();
      if (data?.message) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        localStorage.removeItem("token");
        navigate("/");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <button
          type="submit"
          className=" w-60 text-[black] rounded-md bg-slate-100 px-4 py-1 hover:bg-blue-600 hover:text-white hover:translate-y-1  transition duration-500"
        >
          Logout
        </button>
      </form>
    </>
  );
}

export default Logout;
