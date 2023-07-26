import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home"
import AdminRole from "./Pages/AdminRole";
import Projects from "./Pages/Projects";
import DarkModeComponent from "./Components/DarkModeComponent";
import ProjectDetail from "./Pages/ProjectDetail";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
