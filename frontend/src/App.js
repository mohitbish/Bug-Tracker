import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home"
import AdminRole from "./Pages/AdminRole";

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/adminrole" element={<AdminRole />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
