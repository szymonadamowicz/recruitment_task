import {useQuery} from '@tanstack/react-query';
import {fetchCharacterById} from '../api/api';
import {Character} from '../types/types';

export const useCharacter = (id: number) => {
  return useQuery<Character, Error>({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
