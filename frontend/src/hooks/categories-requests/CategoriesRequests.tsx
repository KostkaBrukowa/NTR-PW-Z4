import useFetch from 'react-fetch-hook';
import { CategoriesResponseDTO } from '../../data/contracts/CategoriesContrant';

export function useFetchAllCategories() {
  return useFetch<CategoriesResponseDTO>(`/api/categories`);
}
