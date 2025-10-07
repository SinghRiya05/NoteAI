import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    setError("");

    try {
 
     const res = await axios.post("http://localhost:5000/api/login", {
        name,
        password,
      });
      
      if (res.data.success) {
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      } else {
       
        setError(res.data.message || "Invalid credentials");
      }
    } catch (error) {    
      navigate("/");    

      setError(error.response.data.message)
      
    }
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gradient-to-r from-green-400 via-gray-600 to-gray-800">
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-green-200 shadow-2xl rounded-2xl px-10 py-8 w-96">
        <h1 className="text-3xl font-extrabold text-green-600 mb-6">
          Welcome Back 👋
        </h1>

        {error && (
          <p className="text-red-500 text-sm font-medium mb-3">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col text-left">
            <label htmlFor="name" className="font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <div className="flex flex-col text-left">
            <label htmlFor="password" className="font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-green-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-6">
          Don’t have an account?{" "}
          <span className="text-green-600 font-medium cursor-pointer hover:underline">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
