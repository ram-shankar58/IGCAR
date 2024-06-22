// src/components/Layout.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Container } from '@mui/material';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <Box className="layout-container">
      <Header />
      <Container className="layout-content" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
