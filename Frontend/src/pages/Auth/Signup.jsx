import React, { useState } from 'react';
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { signup } from '../../api/api.js';


export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit=async(e)=>{
   e.preventDefault();
   try {
    const res=await signup(email,password,username);
    console.log(res);
    
    if(res.data.success){
         toast.success("Signup successfull!");
            navigate("/dashboard");
     }else{
         toast.error(res.data.message)
     }
   } catch (error) {
   console.log("Error full object:", error);
  console.log("Response data:", error?.response?.data);
  toast.error(error?.response?.data?.message || "Something went wrong during signup!");
   }

  }

  return (
    <>
    <Navbar type={"landing"}/>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-800 to-gray-950 px-4">
        
        {/* Glass Card */}
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 hover:scale-105 transition-transform duration-500">
          
          {/* Title */}
          <h2 className="text-2xl font-bold mb-6 text-center text-white tracking-wide">
            Create Your Account
          </h2>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-white">
            
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm mb-1 font-medium">
                Username
              </label>
              <input
                className="w-full p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm mb-1 font-medium">
                Email
              </label>
              <input
                className="w-full p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                type="email"
                id="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm mb-1 font-medium">
                Password
              </label>
              <input
                className="w-full p-3 rounded-xl border border-white/30 bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-green-700  text-white font-bold hover:bg-blue-200 transition-all duration-300 shadow-lg"
            >
              Sign Up
            </button>

            {/* Redirect to Login */}
            <p className="text-center text-sm mt-4 text-gray-200">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-green-600 font-semibold cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
