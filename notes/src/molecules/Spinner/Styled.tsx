import styled, { keyframes } from 'styled-components';
import { Typography } from '@material-ui/core';

const spin = keyframes`
  0% {
  transform-origin: top right;
  transform: rotate(0turn);
  }

  100%{
  transform-origin: top left;
  transform: rotate(1turn);
  }
`;

export const StyledDiv = styled.div`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledSpinner = styled.div`
  position: relative;

  &::after {
    content: '';
    width: 25px;
    height: 5px;
    background: aqua;
    position: absolute;
    animation: ${spin} 1s linear infinite;
  }
`;
export const StyledLoadingText = styled(Typography)`
  position: absolute;
  transform: translate(-25%, 16px);
`;
