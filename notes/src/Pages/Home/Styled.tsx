import { Card, CardContent, TableRow } from '@material-ui/core';
import styled from 'styled-components';

export const StyledCard = styled(Card)`
  margin-top: 16px;
`;

export const StyledFilterCardContent = styled(CardContent)`
  display: flex;
  justify-content: space-between;
`;

export const StyledNotesCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
`;

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;
`;
