import React from 'react';
import { TextField } from '@material-ui/core';
import { StandardTextFieldProps } from '@material-ui/core/TextField/TextField';

interface OwnProps extends Omit<StandardTextFieldProps, 'onChange'> {
  onChange(date: string): void;
}

export const DateField: React.FC<OwnProps> = ({ onChange, ...props }) => {
  return (
    <TextField
      type="date"
      InputLabelProps={{ shrink: true }}
      onChange={(event): void => onChange(event.target.value)}
      {...props}
    />
  );
};
