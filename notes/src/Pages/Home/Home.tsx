import React, { useState, Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { DateField } from '../../molecules/DateField';
import { dateFromDatetime, weekAgo } from '../../utils/Date';
import { CategoryPicker } from '../../organizms/CategoryPicker/CategoryPicker';
import { StyledCard, StyledFilterCardContent, StyledNotesCardContent, StyledTableRow } from './Styled';

type OwnProps = RouteComponentProps;

export const Home: React.FC<OwnProps> = props => {
  const [fromDate, setFromDate] = useState(dateFromDatetime(weekAgo()));
  const [toDate, setToDate] = useState(dateFromDatetime(new Date()));
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleClear = () => {
    setFromDate(dateFromDatetime(weekAgo()));
    setToDate(dateFromDatetime(new Date()));
    setSelectedCategory(null);
    console.log('dupa');
  };

  return (
    <>
      <StyledCard>
        <StyledFilterCardContent>
          <DateField id="from" label="Date from" defaultValue={fromDate} onChange={setFromDate} />
          <DateField id="to" label="Date to" defaultValue={toDate} onChange={setToDate} />
          <CategoryPicker onChange={setSelectedCategory} category={selectedCategory} />
          <Button color="primary" variant="contained" size="large">
            Filter
          </Button>
          <Button color="secondary" variant="contained" size="large" onClick={handleClear}>
            Clear
          </Button>
        </StyledFilterCardContent>
      </StyledCard>
      <StyledCard>
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
              {['jarek', 'dominik'].map(row => (
                <StyledTableRow key={1} onClick={() => console.log('hello')} hover>
                  <TableCell style={{ width: '20%' }} size="small" component="th" scope="row">
                    TestName
                  </TableCell>
                  <TableCell style={{ width: '60%' }} align="left">
                    Test content
                  </TableCell>
                  <TableCell style={{ width: '20%' }} align="center">
                    <Button variant="outlined" color="secondary">
                      Delete
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={20}
            rowsPerPage={5}
            page={1}
            onChangePage={() => {}}
            onChangeRowsPerPage={() => {}}
          />
        </StyledNotesCardContent>
      </StyledCard>
    </>
  );
};
