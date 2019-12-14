import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { StyledButton, StyledLink } from './Styled';

export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        {/*<StyledNews variant="h6">Notes</StyledNews>*/}
        <StyledLink to="/">
          <StyledButton color="inherit">Notes</StyledButton>
        </StyledLink>
        <StyledLink to="/note/new">
          <StyledButton color="inherit">New note</StyledButton>
        </StyledLink>
      </Toolbar>
    </AppBar>
  );
};
