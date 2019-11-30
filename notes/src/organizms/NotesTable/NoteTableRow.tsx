import React from 'react';
import { Button, TableCell } from '@material-ui/core';
import { navigate } from '@reach/router';

import { StyledTableRow } from './Styled';
import { NoteModel } from '../../data/models/NoteModel';
import { dateFromDatetime } from '../../utils/Date';

interface OwnProps {
  note: NoteModel;

  onDelete(note: NoteModel): void;
}

export const NoteTableRow: React.FC<OwnProps> = ({ note, onDelete }) => {
  const { creationDate, title, id } = note;

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();

    onDelete(note);
  };

  const handleRowClick = (): Promise<void> => navigate(`/note/${id}`);

  return (
    <StyledTableRow onClick={handleRowClick} hover>
      <TableCell style={{ width: '20%' }} scope="row">
        {dateFromDatetime(creationDate)}
      </TableCell>
      <TableCell style={{ width: '60%' }} align="left">
        {title}
      </TableCell>
      <TableCell style={{ width: '20%' }} align="center">
        <Button variant="outlined" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </TableCell>
    </StyledTableRow>
  );
};
