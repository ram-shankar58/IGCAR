import React from 'react';
import Layout from '../../layouts/Layout';
import {Box, Typography} from '@mui/material';

const PermissionRestricted = () => (
    
        <Layout>
            <Box sx={{p:3}}>
                <Typography variant="h3" gutterbottom >
                    Sorry, you are not permitted to view this page.
                </Typography>
            </Box>
        </Layout>
   
);
export default PermissionRestricted;
