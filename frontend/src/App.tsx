import {  Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/Registerpage";
import DashboardPage from "./Pages/DashboardPage";


function App() {
  return (
     
    
  
      <Routes>
         
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />

      </Routes>

   
  )
}

export default App