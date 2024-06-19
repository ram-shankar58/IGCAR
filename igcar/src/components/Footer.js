// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box className="footer">
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
