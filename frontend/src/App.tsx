import {  Route, Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/Registerpage";
import DashboardPage from "./Pages/DashboardPage";

import ProtectedRoute from "./Components/ProtectedRoutes";
import Dashboard from "./Pages/DashboardPage";
import CheckInPage from "./Pages/CheckInPage";


function App() {
  return (
     
    
  
      <Routes>
         
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/dashboard" element={<DashboardPage/>} />

         {/* Protected routes */}
      <Route element={<ProtectedRoute />}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/checkin" element={<CheckInPage />} />

      </Route>

      </Routes>

   
  )
}

export default App