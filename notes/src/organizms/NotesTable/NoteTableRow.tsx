import React from 'react';
import { Button, TableCell } from '@material-ui/core';
import { navigate } from '@reach/router';

import { StyledDeleteTableCell, StyledTableRow } from './Styled';
import { NoteModel } from '../../data/models/NoteModel';
import { dateFromDatetime } from '../../utils/Date';
import { useFetchDeleteNote } from '../../hooks/note-requests/useNoteRequest';

interface OwnProps {
  note: NoteModel;

  onDelete(): void;
}

export const NoteTableRow: React.FC<OwnProps> = ({ note, onDelete }) => {
  const { creationDate, title, id } = note;
  const [deleteNote, isLoading] = useFetchDeleteNote(note.id, onDelete);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    console.log('deleted');

    deleteNote();
  };

  const handleRowClick = (): Promise<void> | boolean => !isLoading && navigate(`/note/${id}`);

  return (
    <StyledTableRow onClick={handleRowClick} isLoading={isLoading} hover={!isLoading}>
      <TableCell style={{ width: '20%' }} scope="row">
        {dateFromDatetime(creationDate)}
      </TableCell>
      <TableCell style={{ width: '60%' }} align="left">
        {title}
      </TableCell>
      <StyledDeleteTableCell style={{ width: '20%' }} align="center" isLoading={isLoading}>
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </StyledDeleteTableCell>
    </StyledTableRow>
  );
};
