import styled from 'styled-components';

export const StyledWrapper = styled.div`
  display: grid;
  grid-column: 1 / span 3;
  grid-template-columns: 2fr 4fr;
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
  padding: 0 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  height: 10rem;
`;
