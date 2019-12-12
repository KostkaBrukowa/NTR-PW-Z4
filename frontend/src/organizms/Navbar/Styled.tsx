import { Button, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from '@reach/router';

export const StyledNews = styled(Typography)`
  flex-grow: 1;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const StyledButton = styled(Button)`
  margin-right: 16px !important;
`;
