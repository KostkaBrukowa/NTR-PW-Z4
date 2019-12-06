import React, { ReactNode, useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik/dist/types';
import { useFetchNote } from '../../hooks/note-requests/useNoteRequest';
import { Form } from './Form';

interface RouteProps {
  noteId: string;
}

type OwnProps = RouteComponentProps<RouteProps>;

export interface FormValues {
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
  const [isLoading, note] = useFetchNote(noteId);

  useEffect(() => {
    if (note) {
      setInitialValues(note);
    }
  }, [note]);

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

  return (
    <Formik<FormValues>
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formProps): ReactNode => <Form {...formProps} isLoading={isLoading} />}
    </Formik>
  );
};
