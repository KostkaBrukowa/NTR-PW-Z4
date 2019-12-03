import React, { ReactNode, useEffect, useState } from 'react';
import { Link, navigate, RouteComponentProps } from '@reach/router';
import { Field, FieldArray, Formik, FormikConfig, withFormik } from 'formik';
import * as Yup from 'yup';
import {
  StyledButtonWrapper,
  StyledCancelButton,
  StyledCard,
  StyledContentField,
  StyledForm,
  StyledTitleField,
  StyledTypography,
  StyledWrapper
} from './Styled';
import { CheckboxFormField } from '../../molecules/CheckboxFormField';
import { CategoryFormPicker } from '../../organizms/CategoryFromPicker/CategoryFormPicker';
import { Button } from '@material-ui/core';
import { TextFormField } from '../../molecules/TextFormField';
import { FormikHelpers } from 'formik/dist/types';
import { StyledLink } from '../../organizms/Navbar/Styled';
import { Spinner } from '../../molecules/Spinner/Spinner';
import { NoteModel } from '../../data/models/NoteModel';

interface RouteProps {
  noteId: string;
}

type OwnProps = RouteComponentProps<RouteProps>;

interface FormValues {
  title: string;
  content: string;
  categories: string[];
  markdown: boolean;
}

type SubmitHandler<Values> = (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;

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

export const Note: React.FC<OwnProps> = ({ noteId }) => {
  const [initialValues, setInitialValues] = useState<FormValues>({
    title: '',
    markdown: false,
    content: '',
    categories: []
  });
  const [noteFetching, setNoteFetching] = useState(true);

  useEffect(() => {
    if (noteId !== '0') {
      setInitialValues(
        new NoteModel().copy({
          title: 'test initial',
          content: 'test initial content',
          categories: []
        })
      );
    }

    setNoteFetching(false);
  }, [noteId]);

  const handleSubmit: SubmitHandler<FormValues> = (values, formikHelpers) => {
    const promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve('foo');
      }, 1000);
    });

    return promise1.then(() => {
      navigate('/');
    });
  };

  if (noteFetching) {
    return null;
  }

  return (
    <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ handleSubmit, errors, values, isSubmitting }): ReactNode => (
        <StyledWrapper>
          {isSubmitting && <Spinner label="Saving..." />}
          <StyledCard isSubmitting={isSubmitting}>
            <StyledForm onSubmit={handleSubmit}>
              <StyledTypography variant="body1">Add new note</StyledTypography>
              <TextFormField name="title" label="Title" as={StyledTitleField} />
              <CheckboxFormField name="markdown" label="Markdown" type="checkbox" />
              <TextFormField name="content" label="Content" rows={2} as={StyledContentField} />
              <FieldArray name="categories">
                {(arrayProps): ReactNode => <CategoryFormPicker {...arrayProps} />}
              </FieldArray>
              {/*<pre>{JSON.stringify(values, null, 2)}</pre>*/}
              {/*<pre>{JSON.stringify(errors, null, 2)}</pre>*/}
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
        </StyledWrapper>
      )}
    </Formik>
  );
};
