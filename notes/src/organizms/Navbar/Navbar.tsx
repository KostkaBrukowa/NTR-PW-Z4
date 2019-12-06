import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { StyledButton, StyledLink } from './Styled';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*<StyledNews variant="h6">Notes</StyledNews>*/}
        <StyledButton color="inherit">
          <StyledLink to="/">Notes</StyledLink>
        </StyledButton>
        <StyledButton color="inherit">
          <StyledLink to="/note/new">New note</StyledLink>
        </StyledButton>
      </Toolbar>
    </AppBar>
  );
};
