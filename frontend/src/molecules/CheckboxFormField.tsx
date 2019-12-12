import React from 'react';
import { FieldAttributes, useField } from 'formik';
import { Checkbox, FormControlLabel } from '@material-ui/core';

interface OwnProps {
  label: string;
}

export const CheckboxFormField: React.FC<OwnProps & FieldAttributes<{}>> = props => {
  const [field] = useField<{}>(props);

  return <FormControlLabel {...field} control={<Checkbox />} label={props.label} />;
};
