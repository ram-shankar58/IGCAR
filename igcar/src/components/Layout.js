import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Box, Container } from '@mui/material';
import './Layout.css';

const Layout = ({ children }) => {
    return (
        <Box className="layout-container">
            <Header />
            <Container className="layout-content">
                {children}
            </Container>
            <Footer />
        </Box>
    );
};

export default Layout;
