import React, { ChangeEvent } from 'react';
import { InputLabel, MenuItem, Select } from '@material-ui/core';
import { StyledFormControl } from './Styled';
import { useFetchAllCategories } from '../../hooks/categories-requests/CategoriesRequests';

interface OwnProps {
  category: string | null;

  onChange(category: string | null): void;
}

export const CategoryPicker: React.FC<OwnProps> = ({ category, onChange }) => {
  const { data } = useFetchAllCategories();

  const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>): void => {
    onChange(event.target.value as string);
  };

  return (
    <StyledFormControl>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category || ''} onChange={handleChange}>
        {data &&
          data.categories &&
          data.categories.map(category => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
      </Select>
    </StyledFormControl>
  );
};
