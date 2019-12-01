import React from 'react';
import { StyledDiv, StyledIconButton, StyledTypography } from './Styled';
import DeleteIcon from '@material-ui/icons/Delete';

interface OwnProps {
  categoryName: string;

  onRemove(category: string): void;
}

export const CategoryFormRow: React.FC<OwnProps> = ({ categoryName, onRemove }) => {
  const handleRemove = (): void => onRemove(categoryName);

  return (
    <StyledDiv>
      <StyledTypography variant="h6">{categoryName}</StyledTypography>
      <StyledIconButton onClick={handleRemove}>
        <DeleteIcon color="error" />
      </StyledIconButton>
    </StyledDiv>
  );
};
