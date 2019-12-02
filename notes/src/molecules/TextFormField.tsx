import React, { ReactNode } from 'react';
import { Field, FieldAttributes, useField } from 'formik';
import { StandardTextFieldProps } from '@material-ui/core/TextField';

interface OwnProps extends StandardTextFieldProps {
  label: string;
  as: ReactNode;
}

export const TextFormField: React.FC<OwnProps & FieldAttributes<{}>> = props => {
  const [field, meta] = useField<{}>(props);
  const error = meta.touched && meta.error;

  return <Field {...field} type="input" label={props.label} error={Boolean(error)} helperText={error} as={props.as} />;
};
