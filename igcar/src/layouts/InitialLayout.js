import React from 'react';
import styled from 'styled-components';
import InitHeader from '../components/InitHeader';

const StyledDiv = styled.div`
  background-color: transparent;
  border: 2px solid #000;
  border-radius: 4px;
  padding: 10px;
  font-family: 'Your Chosen Font', sans-serif;
  font-size: 24px;
  color: #000;
  transform-style: preserve-3d;
  perspective: 1000px;
`;

const InitialLayout = ({children}) => {
  return (
    <>
    <InitHeader />
    
    <StyledDiv>
      <h5>Welcome to the IGCAR website!</h5>
      {children}
    </StyledDiv>
    
    </>
  );
};

export default InitialLayout;
