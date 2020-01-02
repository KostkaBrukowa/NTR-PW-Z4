import React, { useEffect } from 'react';
import { Button, TableCell } from '@material-ui/core';
import { navigate } from '@reach/router';

import { StyledDeleteTableCell, StyledTableRow } from './Styled';
import { dateFromDatetime } from '../../utils/Date';
import { Note, useDeleteNoteMutation } from '../../generated/graphql';
import { useDispatchError } from '../../hooks/errors/useDispatchError';

interface OwnProps {
  note: Omit<Note, 'categories'>;

  onDelete(): void;
}

export const NoteTableRow: React.FC<OwnProps> = ({ note, onDelete }) => {
  const { noteDate, title, noteID, rowVersionString } = note;
  const [deleteNote, { loading, error }] = useDeleteNoteMutation({});
  const { dispatchError } = useDispatchError();

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    event.stopPropagation();

    await deleteNote({ variables: { id: noteID, rowVersion: rowVersionString } });
    onDelete();
  };

  useEffect(() => {
    if (error) {
      dispatchError(error);
    }
  }, [error]);

  const handleRowClick = (): Promise<void> | boolean => !loading && navigate(`/note/${noteID}`);

  return (
    <StyledTableRow onClick={handleRowClick} isLoading={loading} hover={!loading}>
      <TableCell style={{ width: '20%' }} scope="row">
        {dateFromDatetime(noteDate)}
      </TableCell>
      <TableCell style={{ width: '60%' }} align="left">
        {title}
      </TableCell>
      <StyledDeleteTableCell style={{ width: '20%' }} align="center" isLoading={loading}>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </StyledDeleteTableCell>
    </StyledTableRow>
  );
};
