import React, { useState, Fragment } from 'react';
import { RouteComponentProps } from '@reach/router';
import { dateFromDatetime, weekAgo } from '../../utils/Date';
import { StyledCard } from './Styled';
import { Filters } from '../../organizms/Filters/Filters';
import { NotesTable } from '../../organizms/NotesTable/NotesTable';

type OwnProps = RouteComponentProps;

export const Home: React.FC<OwnProps> = props => (
  <>
    <StyledCard>
      <Filters />
    </StyledCard>
    <StyledCard>
      <NotesTable />
    </StyledCard>
  </>
);
