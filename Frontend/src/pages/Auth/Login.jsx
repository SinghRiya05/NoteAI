import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../../api/api.js"
import toast from "react-hot-toast"
import Navbar from "../../components/Navbar/Navbar.jsx";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res=await login(email,password);
    if(res.data.success){
        toast.success("Login seccessfull!");
           navigate("/dashboard");
    }else{
        toast.error(res.data.message)
    }
    } catch (error) {
      toast.error(error?.response?.data?.message||"Something went wrong during login!")
      
    }
  };

  return (<>  
    <Navbar type={"landing"}/>
    <div className="min-h-screen flex flex-col">
      {/* Background Gradient */}
      <div className="flex-1  flex items-center justify-center bg-gradient-to-br from-green-800  to-gray-950 px-4">
        {/* Glassmorphism Card */}
        <div className="relative my-20 bg-white/10 backdrop-blur-lg border border-white/20 px-10 py-10 rounded-2xl shadow-2xl w-full max-w-md text-white transition-all duration-700 hover:scale-[1.02]">
         

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-gray-500 focus:border-blue-400 outline-none text-white placeholder-gray-300"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                className="w-full p-3 rounded-xl bg-white/10 border border-gray-500 focus:border-blue-400 outline-none text-white placeholder-gray-300"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-4 bg-green-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg "
            >
              Login
            </button>
          </form>

          {/* Signup Redirect */}
          <p className="mt-8 text-center text-gray-300">
            Don’t have an account?{" "}
            <span
              className="cursor-pointer font-semibold text-green-500 hover:text-blue-300 transition-all"
              onClick={() => navigate("/signup")}
            >
              Signup now
            </span>
          </p>
        </div>
      </div>
  
    </div></>

  );
}
