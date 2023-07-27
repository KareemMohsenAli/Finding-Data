import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  
  useEffect(() => {
    // window.location.reload();
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  },[]);
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { email, password };
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.message === "Done") {
          localStorage.setItem("token", data.token);
          navigate("/home");
        } else if (data.message?.password || data.message?.email) {
          setError({
            password: data.message.password,
            email: data.message.email,
          });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form onSubmit={handleLogin}>
        <h1 className="text-center text-white ">Login</h1>
        <div className=" mb-2 flex justify-center items-center">
          <input
          className="rounded"
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center">
          <input
          className="rounded" 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex justify-center mt-2">
          <button className="bg-[#31bca1] p-2 ps-4 pe-4 rounded-md" type="submit">
            Login
          </button>
       
        </div>
        <div className="text-red-600 text-center w-[100%]">
            {error.email && <p>{error.email}</p>}
            {error.password && <p>{error.password}</p>}
          </div>
      </form>
    </div>
  );
};

export default Login;
