import React, { ReactNode } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledButtonWrapper,
  StyledCard,
  StyledContentField,
  StyledForm,
  StyledTitleField,
  StyledTypography
} from './Styled';
import { CheckboxFormField } from '../../molecules/CheckboxFormField';
import { CategoryFormPicker } from '../../organizms/CategoryFromPicker/CategoryFormPicker';
import { Button } from '@material-ui/core';

interface RouteProps {
  noteId: number;
}

type OwnProps = RouteComponentProps<RouteProps>;

interface FormValues {
  title: string;
  markdown: boolean;
  content: string;
  categories: string[];
}

const initialValues: FormValues = { title: '', markdown: false, content: '', categories: ['test1', 'text 2'] };

const validationSchema = Yup.object<FormValues>({
  title: Yup.string()
    .min(3)
    .max(64)
    .required(),
  markdown: Yup.boolean(),
  content: Yup.string()
    .min(1)
    .max(1024)
    .required(),
  categories: Yup.array()
    .of(Yup.string())
    .min(1)
    .max(10)
});

export const Note: React.FC<OwnProps> = props => {
  const handleSubmit = () => console.log('submit');

  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, values, errors }): ReactNode => (
        <>
          <StyledCard>
            <StyledForm onSubmit={handleSubmit}>
              <StyledTypography variant="body1">Add new note</StyledTypography>
              <Field name="title" type="input" label="Title" as={StyledTitleField} />
              <CheckboxFormField name="markdown" label="Markdown" type="checkbox" />
              <Field name="content" type="input" label="Content" rows={2} multiline as={StyledContentField} />
              <FieldArray name="categories">
                {(arrayProps): ReactNode => <CategoryFormPicker {...arrayProps} />}
              </FieldArray>
              {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
              {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
            </StyledForm>
            <StyledButtonWrapper>
              <Button color="primary" variant="contained">
                Save note
              </Button>
              <Button color="secondary" variant="contained">
                Cancel
              </Button>
            </StyledButtonWrapper>
          </StyledCard>
        </>
      )}
    </Formik>
  );
};
