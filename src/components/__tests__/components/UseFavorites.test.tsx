import React, {useEffect} from 'react';
import {FavoritesProvider, useFavorites} from '../../../context/FavoriteContext';
import {Character} from '../../../types/types';
import {act, render, renderHook} from '@testing-library/react-native';
import {Text} from 'react-native';

jest.mock('@react-native-async-storage/async-storage');

const wrapper = ({children}: {children: React.ReactNode}) => (
  <FavoritesProvider>{children}</FavoritesProvider>
);

const mockCharacter: Character = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  image: 'https://rick.com/morty.png',
  origin: {name: 'Earth'},
  location: {name: 'Earth'},
};

describe('useFavorites', () => {
  it('adds and removes favorite character', () => {
    const {result} = renderHook(() => useFavorites(), {wrapper});

    act(() => {
      result.current.toggleFavorite(mockCharacter);
    });

    expect(result.current.isFavorite(mockCharacter.id)).toBe(true);

    act(() => {
      result.current.removeFavorite(mockCharacter.id);
    });

    expect(result.current.isFavorite(mockCharacter.id)).toBe(false);
  });

  it('removes favorite character correctly', () => {
    const TestComponent = () => {
      const {favorites, toggleFavorite, removeFavorite} = useFavorites();
      const character = mockCharacter;

      useEffect(() => {
        toggleFavorite(character);
        removeFavorite(character.id);
      }, []);

      return <Text>{favorites.length === 0 ? 'None' : 'Exists'}</Text>;
    };

    const wrapper = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>,
    );

    expect(wrapper.getByText('None')).toBeTruthy();
  });
});
