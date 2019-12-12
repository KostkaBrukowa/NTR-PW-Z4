import styled from 'styled-components';

export const StyledWrapper = styled.div`
  grid-column: 1 / span 3;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-column-gap: 16px;
`;

export const StyledCategoryInputWrapper = styled.div`
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 3fr 1fr;
  justify-content: end;
  align-items: baseline;
  margin-left: 32px;
`;

export const StyledCategoriesWrapper = styled.div`
  //display: grid;
  //grid-row-gap: 16px;
  overflow-y: auto;
  height: 10rem;
`;
