import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Header.css';

const handleLogout = () => {
  localStorage.removeItem("user");
}

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const allowedDesignations = ['E', 'F', 'G'];

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <img src={require("../static/igcar.jpeg")} alt="Logo" style={{ height: '60px', marginRight: '10px' }} /> {/* Logo image */}

        <Typography variant="h6" className="title">
          Indira Gandhi Centre of Atomic Research, Kalpakkam
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/meeting">Meeting</Button>
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <Button color="inherit" component={Link} to="/settings">Settings</Button>
        <Button color="inherit" component={Link} to="/notifications">Notifications</Button>
        {user && allowedDesignations.includes(user.designation) && (
          <>
            <Button color="inherit" component={Link} to="/reports">Reports</Button>
            <Button color="inherit" component={Link} to="/analytics">Analytics</Button>
          </>
        )}
        <Button color="inherit" onClick={handleLogout} component={Link} to="/login">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
