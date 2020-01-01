import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { NoteTableRow } from './NoteTableRow';
import { NoteTablePagination } from './NoteTablePagination';
import { StyledNotesCardContent } from './Styled';
import { useFetchAllNotesQuery } from '../../generated/graphql';
import { useFilters } from '../../hooks/filters/useFilters';
import { useDispatchError } from '../../hooks/errors/useDispatchError';

export const NotesTable: React.FC = () => {
  const { filters } = useFilters();
  const { dispatchError } = useDispatchError();
  const { data, loading, refetch, error } = useFetchAllNotesQuery({
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'no-cache',
    variables: {
      filters
    }
  });

  useEffect(() => {
    dispatchError(error);
  }, [error]);

  return (
    <StyledNotesCardContent isLoading={loading} title="Loading...">
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
          {data &&
            data.notes &&
            data.notes.values.map(note => <NoteTableRow note={note} key={note.noteID} onDelete={refetch} />)}
        </TableBody>
      </Table>
      <NoteTablePagination allElementsCount={data && data.notes.total} />
    </StyledNotesCardContent>
  );
};
