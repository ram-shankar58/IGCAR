import React from 'react';
import { Card } from '@mui/material';
import styled, { keyframes } from 'styled-components';

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



const NeonCard = styled(Card)(({ theme }) => ({
    backgroundColor: 'rgba(10,10,10,0.7)', 
    backdropFilter: 'blur(10px)', 
    color: '#fff',
    boxShadow: '0 0 5px #9d00ff, 0 0 25px #9d00ff, 0 0 50px #9d00ff, 0 0 100px #9d00ff', 
    '&:hover': {
      boxShadow: '0 0 15px #9d00ff, 0 0 35px #9d00ff, 0 0 75px #9d00ff, 0 0 125px #9d00ff', 
      transform: 'scale(1.05)',
      transition: 'transform .2s ease-in-out, box-shadow .2s ease-in-out', 
    },
  }));
  
  
  export default NeonCard;
  
