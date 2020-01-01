import { useContext } from 'react';

import { GlobalStateStore } from '../../data/state/GlobalStateContext';
import { FiltersModel } from '../../data/state/FiltersModel';
import { ActionType } from '../../data/state/GlobalStateReducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useFilters() {
  const { state, dispatch } = useContext(GlobalStateStore);

  const setFilters = (filters: FiltersModel): void => dispatch({ type: ActionType.CHANGE_FILTERS, payload: filters });

  const setPage = (page: number): void => setFilters(state.filters.copy({ page: page }));

  const setPageSize = (pageSize: number): void => setFilters(state.filters.copy({ pageSize: pageSize }));

  const setDateFrom = (dateFrom: string): void => setFilters(state.filters.copy({ dateFrom: new Date(dateFrom) }));

  const setDateTo = (dateTo: string): void => setFilters(state.filters.copy({ dateTo: new Date(dateTo) }));

  const setCategory = (category: string | null): void => setFilters(state.filters.copy({ category: category }));

  const clearFilters = (): void => setFilters(state.filters.clear());

  return {
    filters: state.filters,
    setFilters,
    setPage,
    setCategory,
    setDateFrom,
    setDateTo,
    setPageSize,
    clearFilters
  };
}
