import React, { ReactNode, useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FormikHelpers } from 'formik/dist/types';
import { useFetchNote, useFetchSaveNote } from '../../hooks/note-requests/useNoteRequest';
import { Form } from './Form';
import { NoteModel } from '../../data/models/NoteModel';
import { ErrorDialog } from '../../molecules/Dialog/Dialog';

interface RouteProps {
  noteId: string;
}

type OwnProps = RouteComponentProps<RouteProps>;

export interface FormValues {
  id: string | null;
  title: string;
  content: string;
  categories: string[];
  markdown: boolean;
}

type SubmitHandler<Values> = (values: Values, formikHelpers: FormikHelpers<Values>) => void | Promise<any>;

const validationSchema = Yup.object<FormValues>({
  id: Yup.string().nullable(),
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
    id: null,
    title: '',
    markdown: false,
    content: '',
    categories: []
  });
  const [isLoading, note] = useFetchNote(noteId == 'new' ? undefined : noteId);
  const [noteToPost, setNoteToPost] = useState<NoteModel | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [postNote, isPosting, error] = useFetchSaveNote(noteToPost, () => {
    navigate('/');
  });

  useEffect(() => {
    if (note) {
      setInitialValues(note);
    }
  }, [note]);

  useEffect(() => {
    if (error) {
      setNoteToPost(null);
      setDialogOpen(true);
    }
  }, [error]);

  const handleSubmit: SubmitHandler<FormValues> = (values): void => {
    setNoteToPost(new NoteModel().copy({ ...initialValues, ...values }));
    postNote();
  };

  return (
    <>
      <ErrorDialog
        headingText="There was an error in a form"
        infoText="Please try again"
        actions={['Ok']}
        onClose={(): void => setDialogOpen(false)}
        open={dialogOpen}
      />
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formProps): ReactNode => <Form {...formProps} isPosting={isPosting} isLoading={isLoading} />}
      </Formik>
    </>
  );
};
