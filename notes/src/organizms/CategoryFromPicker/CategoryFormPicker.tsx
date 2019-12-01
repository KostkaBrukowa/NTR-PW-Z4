import React, { useState } from 'react';
import { FieldArrayRenderProps, useField } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { CategoryFormRow } from '../../molecules/CategoryFormRow/CategoryFormRow';
import { StyledCategoriesWrapper, StyledCategoryInputWrapper, StyledWrapper } from './Styled';

export const CategoryFormPicker: React.FC<FieldArrayRenderProps> = props => {
  const { push, remove } = props;
  const { value: categories } = useField<string[]>(props.name)[0];
  const [category, setCategory] = useState('');

  const handleAddCategoryButtonClick = (): void => {
    if (categories.includes(category)) {
      return;
    }

    push(category);
    setCategory('');
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
        <TextField value={category} onChange={event => setCategory(event.target.value)} label="Add category" />
        <Button variant="outlined" color="secondary" onClick={handleAddCategoryButtonClick}>
          Add category
        </Button>
      </StyledCategoryInputWrapper>
    </StyledWrapper>
  );
};
