import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const fetchCharacterById = async (id: number) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

export const fetchCharacters = async (params: any) => {
  const query = new URLSearchParams();
  if (params.page) query.append('page', String(params.page));
  if (params.name) query.append('name', params.name);
  if (params.status) query.append('status', params.status);
  if (params.species) query.append('species', params.species);

  const res = await fetch(`https://rickandmortyapi.com/api/character?${query}`);

  if (res.status === 404) {
    return {
      info: {count: 0, pages: 0, next: null, prev: null},
      results: [],
    };
  }

  if (!res.ok) throw new Error('Failed to fetch characters');

  return res.json();
};
