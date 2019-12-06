import React, { ReactNode } from 'react';
import {
  StyledButtonWrapper,
  StyledCancelButton,
  StyledCard,
  StyledContentField,
  StyledForm,
  StyledTitleField,
  StyledTypography
} from './Styled';
import { Button } from '@material-ui/core';
import { TextFormField } from '../../molecules/TextFormField';
import { CheckboxFormField } from '../../molecules/CheckboxFormField';
import { FieldArray, FormikProps } from 'formik';
import { CategoryFormPicker } from '../../organizms/CategoryFromPicker/CategoryFormPicker';
import { StyledLink } from '../../organizms/Navbar/Styled';
import { FormValues } from './Note';

interface OwnProps extends FormikProps<FormValues> {
  isLoading: boolean;
  isPosting: boolean;
}

export const Form: React.FC<OwnProps> = ({ isPosting, isLoading, handleSubmit, errors }) => {
  const spinnerVisible = isPosting || isLoading;
  const spinnerLabel = isPosting ? 'Saving...' : 'Loading...';

  return (
    <StyledCard isLoading={spinnerVisible} title={spinnerLabel}>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTypography variant="body1">Add new note</StyledTypography>
        <TextFormField name="title" label="Title" as={StyledTitleField} />
        <CheckboxFormField name="markdown" label="Markdown" type="checkbox" />
        <TextFormField name="content" label="Content" rows={2} as={StyledContentField} />
        <FieldArray name="categories">{(arrayProps): ReactNode => <CategoryFormPicker {...arrayProps} />}</FieldArray>
      </StyledForm>
      <StyledButtonWrapper>
        <Button color="primary" variant="contained" onClick={(): void => handleSubmit()}>
          Save note
        </Button>
        <StyledLink to="/">
          <StyledCancelButton color="secondary" variant="contained">
            Cancel
          </StyledCancelButton>
        </StyledLink>
      </StyledButtonWrapper>
    </StyledCard>
  );
};
