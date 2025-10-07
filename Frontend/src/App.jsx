import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Dashboard from "./pages/Dashboard/Dashboard"
import { useEffect, useState } from "react"
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute"


function App() {
  const [darkMode,setDarkMode]=useState(false);

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add("dark");
    }else{
      document.documentElement.classList.remove("dark")
    }
  },[darkMode]);
 

  return (
    <>
      <Routes>
        <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
    </Routes>

    </>
  )
}

export default App
