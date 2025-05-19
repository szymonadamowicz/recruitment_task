import {useInfiniteQuery} from '@tanstack/react-query';
import {fetchCharacters} from '../api/api';
import {CharactersResponse, Filters} from '../types/types';

export const useInfiniteCharacters = (filters: Filters) => {
  return useInfiniteQuery<CharactersResponse>({
    queryKey: ['characters', filters],
    queryFn: ({pageParam = 1}) =>
      fetchCharacters({...filters, page: pageParam}),
    getNextPageParam: lastPage => {
      const next = lastPage.info.next;
      return next ? Number(new URL(next).searchParams.get('page')) : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};
