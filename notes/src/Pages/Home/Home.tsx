import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import { Button } from '@material-ui/core';
import { StyledCard, StyledCardContent } from '../Note/Styled';
import { DateField } from '../../molecules/DateField';
import { dateFromDatetime, weekAgo } from '../../utils/Date';
import { CategoryPicker } from '../../organizms/CategoryPicker/CategoryPicker';

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
    <StyledCard>
      <StyledCardContent>
        <DateField id="from" label="Date from" defaultValue={fromDate} onChange={setFromDate} />
        <DateField id="to" label="Date to" defaultValue={toDate} onChange={setToDate} />
        <CategoryPicker onChange={setSelectedCategory} category={selectedCategory} />
        <Button color="primary" variant="contained" size="large">
          Filter
        </Button>
        <Button color="secondary" variant="contained" size="large" onClick={handleClear}>
          Clear
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};
