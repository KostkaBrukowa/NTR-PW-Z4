import React, { useState } from 'react';
import { FieldArrayRenderProps, useField } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { CategoryFormRow } from '../../molecules/CategoryFormRow/CategoryFormRow';
import { StyledCategoriesWrapper, StyledCategoryInputWrapper, StyledWrapper } from './Styled';

export const CategoryFormPicker: React.FC<FieldArrayRenderProps> = ({ push, remove, name, form }) => {
  const [category, setCategory] = useState('');
  const [inputProps, meta] = useField<string[]>(name);
  const { value: categories } = inputProps;
  const error = false;

  const handleAddCategoryButtonClick = (): void => {
    if (!category || categories.includes(category)) {
      return;
    }

    push(category);
  };

  const handleRemove = (categoryName: string): void => remove(categories.indexOf(categoryName));

  return (
    <StyledWrapper>
      <StyledCategoriesWrapper>
        {categories.map(category => (
          <CategoryFormRow key={category} categoryName={category} onRemove={handleRemove} />
        ))}
      </StyledCategoriesWrapper>
      <StyledCategoryInputWrapper>
        <TextField
          value={category}
          onChange={event => setCategory(event.target.value)}
          label="Add category"
          error={Boolean(error)}
          helperText={error}
        />
        <Button variant="outlined" color="secondary" onClick={handleAddCategoryButtonClick} size="small">
          Add category
        </Button>
      </StyledCategoryInputWrapper>
    </StyledWrapper>
  );
};
