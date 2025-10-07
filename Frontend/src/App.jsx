import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Dashboard from "./pages/Dashboard/Dashboard"
import { useEffect, useState } from "react"



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
      
      <Route path="/" element={<Home/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>

    </>
  )
}

export default App
