// NeonCard.js
import React from 'react';
import { Card } from '@mui/material';
import styled, { keyframes } from 'styled-components';

// Define the pulse animation using keyframes
const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: none;
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 5px #9d00ff, 0 0 25px #9d00ff, 0 0 50px #9d00ff, 0 0 100px #9d00ff;
  }
  100% {
    transform: scale(1);
    box-shadow: none;
  }
`;



/// ... other imports remain unchanged
const NeonCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#f5f5f5', // Light grey background
    backdropFilter: 'blur(10px)', // Blur effect for the background
    color: '#fff', // Light text color for contrast
    boxShadow: '0 0 5px #9d00ff, 0 0 25px #9d00ff, 0 0 50px #9d00ff, 0 0 100px #9d00ff', // Neon glow effect
    '&:hover': {
      boxShadow: '0 0 15px #9d00ff, 0 0 35px #9d00ff, 0 0 75px #9d00ff, 0 0 125px #9d00ff', // Enhanced glow on hover
      transform: 'scale(1.05)', // Slightly enlarge on hover
      transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out', // Smooth transition for hover effects
    },
  }));
  
  // ... rest of your Register component remains unchanged
  
  export default NeonCard;
  