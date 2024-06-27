import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Box, Container } from '@mui/material';
import './Layout.css';

const Layout = ({ children }) => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component is mounted
  }, []);

  return (
    <Box className="layout-container">
      <Header />
      <Container className="layout-content" sx={{ mt: 4, mb: 4 }}>
        {children}
      </Container>
      <Footer className="footer" />
    </Box>
  );
};

export default Layout;
