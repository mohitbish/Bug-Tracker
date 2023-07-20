import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Landing from "./Pages/Landing";
import Home from "./Pages/Home"

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/home" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
