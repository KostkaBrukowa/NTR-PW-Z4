import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { StyledCard } from './Styled';
import { Filters } from '../../organizms/Filters/Filters';
import { NotesTable } from '../../organizms/NotesTable/NotesTable';

type OwnProps = RouteComponentProps & { style: React.CSSProperties };

export const Home: React.FC<OwnProps> = ({ style }) => (
  <div style={{ ...style, willChange: 'transform, opacity' }}>
    <StyledCard>
      <Filters />
    </StyledCard>
    <StyledCard>
      <NotesTable />
    </StyledCard>
  </div>
);
