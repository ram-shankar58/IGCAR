import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const handleLogout= ()=>{
  localStorage.removeItem("user");
}

const Header = () => {
  return (
    <>
    <AppBar position="static" className="header">
      <Toolbar>
        <img src={require("../static/igcar.jpeg")} alt="Logo" style={{ height: '60px', marginRight: '10px' }} /> {/* Logo image */}

        <Typography variant="h6" className="title">
          Indira Gandhi Centre of Atomic Research, Kalpakkam
        </Typography>
        
      </Toolbar>
    </AppBar>
    
    </>
  );
};

export default Header;
