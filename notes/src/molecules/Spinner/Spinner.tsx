import React from 'react';
import { StyledDiv, StyledLoadingText, StyledSpinner } from './Styled';
import { Typography } from '@material-ui/core';

interface OwnProps {
  label: string;
}

export const Spinner: React.FC<OwnProps> = ({ label }) => {
  return (
    <StyledDiv>
      <StyledSpinner />
      <StyledLoadingText variant="h6">{label}</StyledLoadingText>
    </StyledDiv>
  );
};
