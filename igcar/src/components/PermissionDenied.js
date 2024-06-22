import React from 'react';
import { Box, Typography } from '@mui/material';

const PermissionDenied = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Permission Denied
      </Typography>
      <Typography variant="body1">
        You do not have permission to view this page.
      </Typography>
    </Box>
  );
};

export default PermissionDenied;
