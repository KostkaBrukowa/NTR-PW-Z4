import React, { useState } from 'react';
import { FieldArrayRenderProps, useField } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { CategoryFormRow } from '../../molecules/CategoryFormRow/CategoryFormRow';
import { StyledCategoriesWrapper, StyledCategoryInputWrapper, StyledWrapper } from './Styled';
import { animated, useTransition, config } from 'react-spring';

const transition = {
  from: { transform: 'translate3d(-100%, 0, 0) ', opacity: '-0.2' },
  enter: { transform: 'translate3d(0%, 0,0) ', opacity: '1' },
  leave: { transform: 'translate3d(-100%, 0,0) ', opacity: '-0.2' }
};

const AnimatedCategoryFormRow = animated(CategoryFormRow);

export const CategoryFormPicker: React.FC<FieldArrayRenderProps> = ({ push, remove, name }) => {
  const [category, setCategory] = useState('');
  const { value: categories } = useField<string[]>(name)[0];
  const transitions = useTransition(categories, item => item, transition);

  const handleAddCategoryButtonClick = (): void => {
    if (!category || categories.includes(category)) {
      return;
    }

    push(category);
    setCategory('');
  };

  const handleRemove = (categoryName: string): void => remove(categories.indexOf(categoryName));

  return (
    <StyledWrapper>
      <StyledCategoriesWrapper>
        {transitions.reverse().map(({ item, props, key }) => (
          <AnimatedCategoryFormRow key={key} style={props} categoryName={item} onRemove={handleRemove} />
        ))}
      </StyledCategoriesWrapper>
      <StyledCategoryInputWrapper>
        <TextField value={category} onChange={event => setCategory(event.target.value)} label="Add category" />
        <Button variant="outlined" color="secondary" onClick={handleAddCategoryButtonClick} size="small">
          Add
        </Button>
      </StyledCategoryInputWrapper>
    </StyledWrapper>
  );
};
