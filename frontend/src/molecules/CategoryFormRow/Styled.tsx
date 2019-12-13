import styled from 'styled-components';
import { IconButton, Typography } from '@material-ui/core';

export const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  border: #333 solid 1px;
  border-radius: 3px;

  margin-top: 16px;
`;

export const StyledIconButton = styled(IconButton)`
  width: 25%;
  transform: scaleY(0.9);
`;

export const StyledTypography = styled(Typography)`
  overflow-wrap: break-word;
  width: 75%;
`;
