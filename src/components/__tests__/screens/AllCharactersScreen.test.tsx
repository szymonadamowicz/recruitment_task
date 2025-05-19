import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import * as useCharactersHook from '../../../hooks/useCharacters';
import AllCharactersScreen from '../../../screens/AllCharactersScreen';

jest.mock('../../../hooks/useCharacters');
jest.mock('../../../components/character/CharacterCard', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({character}: any) => <Text>{character.name}</Text>;
});

describe('AllCharactersScreen', () => {
  it('shows character list and handles Load More', () => {
    const fetchNextPage = jest.fn();

    (useCharactersHook.useInfiniteCharacters as jest.Mock).mockReturnValue({
      data: {
        pages: [
          {
            results: [
              {
                id: 1,
                name: 'Rick Sanchez',
                status: 'Alive',
                species: 'Human',
                gender: 'Male',
                image: '',
                origin: {name: 'Earth'},
                location: {name: 'Earth'},
              },
            ],
          },
        ],
      },
      isLoading: false,
      error: null,
      fetchNextPage,
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    const {getByText} = render(<AllCharactersScreen />);
    expect(getByText('Rick Sanchez')).toBeTruthy();
    expect(getByText('Load More')).toBeTruthy();

    fireEvent.press(getByText('Load More'));
    expect(fetchNextPage).toHaveBeenCalled();
  });

  it('shows empty message when no characters are found', () => {
    (useCharactersHook.useInfiniteCharacters as jest.Mock).mockReturnValue({
      data: {pages: [{results: []}]},
      isLoading: false,
      error: null,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    const {getByText} = render(<AllCharactersScreen />);
    expect(getByText('No results found.')).toBeTruthy();
  });
});
