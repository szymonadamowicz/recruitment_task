import React from 'react';
import {render} from '@testing-library/react-native';
import {FavoritesProvider} from '../../../context/FavoriteContext';
import FavoritesScreen from '../../../screens/FavoriteScreen';
import {Character} from '../../../types/types';

jest.mock('../../../components/character/CharacterCard', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({character}: {character: Character}) => <Text>{character.name}</Text>;
});

describe('FavoritesScreen', () => {
  it('renders message when no favorites match filters', () => {
    const {getByText} = render(
      <FavoritesProvider>
        <FavoritesScreen />
      </FavoritesProvider>,
    );

    expect(getByText('No results found.')).toBeTruthy();
  });
});
