import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', textAlign: 'center', backgroundColor: '#3f51b5', color: '#fff' }}>
            <Typography variant="body1">My footer content</Typography>
        </Box>
    );
};

export default Footer;
