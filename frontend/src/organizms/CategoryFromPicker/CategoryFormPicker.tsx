import React, { useState } from 'react';
import { FieldArrayRenderProps, useField } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { CategoryFormRow } from '../../molecules/CategoryFormRow/CategoryFormRow';
import { StyledCategoriesWrapper, StyledCategoryInputWrapper, StyledWrapper, StyledAddButton } from './Styled';
import { animated, useTransition, config } from 'react-spring';

const transition = {
  from: { transform: 'translate3d(-100%, 0, 0) ', opacity: '-0.2' },
  enter: { transform: 'translate3d(0%, 0,0) ', opacity: '1' },
  leave: { transform: 'translate3d(-100%, 0,0) ', opacity: '-0.2' }
};

const AnimatedCategoryFormRow = animated(CategoryFormRow);

export const CategoryFormPicker: React.FC<FieldArrayRenderProps> = ({ push, remove, name }) => {
  const [category, setCategory] = useState('');
  const { value } = useField<string[]>(name)[0];
  const categories = value || [];
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
        {transitions
          .filter(Boolean)
          .reverse()
          .map(({ item, props, key }) => (
            <AnimatedCategoryFormRow key={key} style={props} categoryName={item} onRemove={handleRemove} />
          ))}
      </StyledCategoriesWrapper>
      <StyledCategoryInputWrapper>
        <TextField value={category} onChange={event => setCategory(event.target.value)} label="Add category" />
        <StyledAddButton variant="outlined" color="secondary" onClick={handleAddCategoryButtonClick} size="small">
          Add
        </StyledAddButton>
      </StyledCategoryInputWrapper>
    </StyledWrapper>
  );
};
