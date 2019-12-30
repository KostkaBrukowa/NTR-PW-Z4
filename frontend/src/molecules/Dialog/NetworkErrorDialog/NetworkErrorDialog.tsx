import React from 'react';
import { ErrorDialog } from '../Dialog';
import { useDispatchError } from '../../../hooks/errors/useDispatchError';

const requestErrorText = 'There was error with your request. ';

export const NetworkErrorDialog: React.FC = () => {
  const { error, dispatchClearError } = useDispatchError();

  const headingText = error ? error.message : '';

  return (
    <ErrorDialog
      actions={['Ok']}
      open={!!error}
      headingText={headingText}
      infoText={requestErrorText}
      onClose={dispatchClearError}
    />
  );
};
