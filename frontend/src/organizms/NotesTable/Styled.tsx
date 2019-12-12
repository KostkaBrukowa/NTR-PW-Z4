import React from 'react';
import styled from 'styled-components';
import { CardContent, TableCell, TableRow } from '@material-ui/core';
import { Spinner, SpinnerProps } from '../../molecules/Spinner/Styled';
import { CardContentProps } from '@material-ui/core/CardContent/CardContent';
import { TableCellProps } from '@material-ui/core/TableCell';
import { TableRowProps } from '@material-ui/core/TableRow';

export const StyledNotesCardContent = styled(({ isLoading, ...props }: CardContentProps & SpinnerProps) => (
  <CardContent {...props} />
))`
  ${Spinner}
  display: flex;
  flex-direction: column;
`;

interface StyledTableRowProps {
  isLoading: boolean;
}

export const StyledTableRow = styled(({ isLoading, ...props }: StyledTableRowProps & TableRowProps) => (
  <TableRow {...props} />
))`
  cursor: ${(props: StyledTableRowProps): string => (props.isLoading ? 'auto' : 'pointer')};
`;

export const StyledDeleteTableCell = styled(({ isLoading, ...props }: TableCellProps & SpinnerProps) => (
  <TableCell {...props} />
))`
  ${Spinner}
`;
