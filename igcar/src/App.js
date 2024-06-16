import React from 'react';
import "./App.css";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
// App.js
import 'bootstrap/dist/css/bootstrap.min.css';

const ProtectedRoute = ({ children })=>{
  const isAuthenticated=localStorage.getItem('user');
  return isAuthenticated ? children : <Navigate to="/login" />;
};




const App = () => {
  return (
    
      <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App