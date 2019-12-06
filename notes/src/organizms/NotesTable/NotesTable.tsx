import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { NoteTableRow } from './NoteTableRow';
import { NoteTablePagination } from './NoteTablePagination';
import { StyledNotesCardContent } from './Styled';
import { useFetchAllNotes } from '../../hooks/note-requests/useNoteRequest';

export const NotesTable: React.FC = props => {
  const [isLoading, notes, reloadNotes] = useFetchAllNotes();

  const handleDelete = () => {
    console.log('reload');

    reloadNotes();
  };

  return (
    <StyledNotesCardContent isLoading={isLoading} title="Loading...">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '20%' }}>Date</TableCell>
            <TableCell style={{ width: '60%' }} align="left">
              Title
            </TableCell>
            <TableCell style={{ width: '20%' }} align="center">
              Delete
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {notes && notes.map(note => <NoteTableRow note={note} key={note.id!} onDelete={handleDelete} />)}
        </TableBody>
      </Table>
      <NoteTablePagination allElementsCount={notes ? notes.length : 0} />
    </StyledNotesCardContent>
  );
};
