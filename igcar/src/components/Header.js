import React from 'react';
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user'); //USER IS key

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff' }}> {/* AppBar background color */}
      <Toolbar>
        <img src={require("../static/igcar.jpeg")} alt="Logo" style={{ height: '60px', marginRight: '10px' }} /> {/* Logo image */}
        <Typography variant="h6" component="div" style={{fontSize:'250%'}} sx={{ flexGrow: 1, color: 'purple'}}> {/* Text color */}
          Indira Gandhi Centre of Atomic Research
        </Typography>
        {isLoggedIn ? (
          <Button color="inherit" onClick={handleLogout} sx={{ backgroundColor: '#007bff', color: '#fff' }}> {/* Button colors */}
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ backgroundColor: '#007bff', color: '#fff' }}> {/* Button colors */}
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
