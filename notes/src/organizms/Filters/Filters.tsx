import React from 'react';
import { DateField } from '../../molecules/DateField';
import { CategoryPicker } from '../CategoryPicker/CategoryPicker';
import { Button } from '@material-ui/core';
import { StyledCardContent } from './Styled';
import { useFilters } from '../../hooks/filters/useFilters';
import { dateFromDatetime } from '../../utils/Date';

export const Filters: React.FC = () => {
  const {
    filters: { dateFrom, dateTo, category },
    setDateFrom,
    setDateTo,
    setCategory,
    clearFilters
  } = useFilters();

  return (
    <StyledCardContent>
      <DateField id="from" label="Date from" defaultValue={dateFromDatetime(dateFrom)} onChange={setDateFrom} />
      <DateField id="to" label="Date to" defaultValue={dateFromDatetime(dateTo)} onChange={setDateTo} />
      <CategoryPicker category={category} onChange={setCategory} />
      <Button color="primary" variant="contained" size="large">
        Filter
      </Button>
      <Button color="secondary" variant="contained" size="large" onClick={clearFilters}>
        Clear
      </Button>
    </StyledCardContent>
  );
};
