import React from 'react';
import { TablePagination } from '@material-ui/core';
import { useFilters } from '../../hooks/filters/useFilters';

interface OwnProps {
  allElementsCount?: number;
}

type PageChanger = (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
type PageSizeChanger = React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;

export const NoteTablePagination: React.FC<OwnProps> = ({ allElementsCount }) => {
  const {
    filters: { page, pageSize },
    setPage,
    setPageSize
  } = useFilters();

  const handlePageChange: PageChanger = (_, page) => setPage(page);
  const handlePageSizeChange: PageSizeChanger = event => setPageSize(event && +event.target.value);

  return (
    <TablePagination
      rowsPerPageOptions={[3, 10, 25]}
      component="div"
      count={allElementsCount || 0}
      rowsPerPage={pageSize}
      page={page}
      onChangePage={handlePageChange}
      onChangeRowsPerPage={handlePageSizeChange}
    />
  );
};
