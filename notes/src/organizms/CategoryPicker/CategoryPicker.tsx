import React, { ChangeEvent } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { StyledFormControl } from './Styled';

interface OwnProps {
  category: string | null;

  onChange(category: string | null): void;
}

export const CategoryPicker: React.FC<OwnProps> = ({ category, onChange }) => {
  const categories = ['test1', 'test2', 'test3'];

  const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>): void => {
    onChange(event.target.value as string);
  };

  return (
    <StyledFormControl>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category || ''} onChange={handleChange}>
        {categories.map(category => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
