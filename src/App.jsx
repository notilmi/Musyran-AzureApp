import { useState } from 'react';
import { Route, Routes } from "react-router-dom";

import Vote from "./pages/Vote.jsx";
import Home from "./pages/Home.tsx";
import Done from "./pages/Done.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {

    return (
      <div className="App">
        <Routes>
          <Route path="/" element= {<Home/>} />
          <Route path="/vote" element= {<Vote />} />
          <Route path="/done" element= {<Done />} />
          <Route path="*" element= {<NotFound />} />
        </Routes>
      </div>
    )
  }
  
  export default App