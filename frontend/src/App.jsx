import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home"
import AdminRole from "./Pages/AdminRole";
import Projects from "./Pages/Projects";
import DarkModeComponent from "./Components/DarkModeComponent";
import ProjectDetail from "./Pages/ProjectDetail";
import Profile from "./Pages/Profile";

function App() {
  
  return (
    <>
    <DarkModeComponent/>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/adminrole" element={<AdminRole />}/>
          <Route path="/projects" element={<Projects />}/>
          <Route path="/projectdetail" element={<ProjectDetail />}/>
          <Route path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
