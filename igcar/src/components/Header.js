// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const handleLogout= ()=>{
  localStorage.removeItem("user");
}

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="h6" className="title">
          MyApp
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/settings">Settings</Button>
        <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
        <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
        <Button color="inherit" onClick={handleLogout} component={Link} to="/login">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
