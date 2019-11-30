import React from 'react';
import { Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { NoteTableRow } from './NoteTableRow';
import { NoteTablePagination } from './NoteTablePagination';
import { StyledNotesCardContent } from './Styled';
import { NoteModel } from '../../data/models/NoteModel';

export const NotesTable: React.FC = props => {
  const notes = [
    new NoteModel().copy({ title: 'Title of the first note', id: 1 }),
    new NoteModel().copy({ title: 'Title of the second note', id: 2 })
  ];

  return (
    <StyledNotesCardContent>
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
          {notes.map(note => (
            <NoteTableRow note={note} key={note.id} onDelete={() => {}} />
          ))}
        </TableBody>
      </Table>
      <NoteTablePagination allElementsCount={notes.length} />
    </StyledNotesCardContent>
  );
};
