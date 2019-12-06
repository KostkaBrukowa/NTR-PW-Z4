import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface OwnProps {
  headingText: string;
  infoText: string;
  actions: string[];
  open: boolean;

  onClose?(): void;
}

export const ErrorDialog: React.FC<OwnProps> = ({ open = true, headingText, infoText, actions, onClose }) => {
  const handleClose = (): void => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{headingText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{infoText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map(action => (
          <Button onClick={handleClose} color="primary" key={action}>
            {action}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};
