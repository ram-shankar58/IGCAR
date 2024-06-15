import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
// App.js
import 'bootstrap/dist/css/bootstrap.min.css';



const App = () => {
  return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App