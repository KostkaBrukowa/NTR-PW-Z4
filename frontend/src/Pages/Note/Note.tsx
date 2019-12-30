import React, { ReactNode, useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik/dist/types';
import { Form } from './Form';
import { useFetchSingleNoteQuery, useSaveNoteMutation } from '../../generated/graphql';
import { useDispatchError } from '../../hooks/errors/useDispatchError';

interface RouteProps {
  noteId: string;
}

type OwnProps = RouteComponentProps<RouteProps>;

export interface FormValues {
  noteID: string | null;
  rowVersionString: string | null;
  title: string;
  description: string;
  categories: string[];
  markdown: boolean;
}

type SubmitHandler<Values> = (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;

const defaultInitialValues: FormValues = {
  noteID: null,
  rowVersionString: null,
  title: '',
  markdown: false,
  description: '',
  categories: []
};

const validationSchema = Yup.object<FormValues>({
  noteID: Yup.string().nullable(),
  rowVersionString: Yup.string().nullable(),
  title: Yup.string()
    .min(3)
    .max(64)
    .required(),
  markdown: Yup.boolean(),
  description: Yup.string()
    .min(1)
    .max(1024)
    .required(),
  categories: Yup.array()
    .of(Yup.string())
    // .min(1)
    .max(10)
});

export const Note: React.FC<OwnProps> = ({ noteId }) => {
  const [initialValues, setInitialValues] = useState<FormValues>(defaultInitialValues);
  const { dispatchError } = useDispatchError();
  const { data, loading } = useFetchSingleNoteQuery({
    variables: { id: noteId! },
    skip: noteId === 'new',
    fetchPolicy: 'no-cache'
  });

  const [postNote, { loading: isPosting, error }] = useSaveNoteMutation({
    onCompleted: () => {
      navigate('/');
    }
  });

  useEffect(() => {
    if (noteId === 'new') {
      setInitialValues(defaultInitialValues);
    }
  }, [noteId]);

  useEffect(() => {
    if (data && data.note) {
      const { __typename, ...note } = data.note;
      setInitialValues(note);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatchError(error);
    }
  }, [error]);

  const handleSubmit: SubmitHandler<FormValues> = (values): void => {
    postNote({ variables: { input: values } });
  };

  return (
    <div>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formProps): ReactNode => <Form {...formProps} isPosting={isPosting} isLoading={loading} />}
      </Formik>
    </div>
  );
};
