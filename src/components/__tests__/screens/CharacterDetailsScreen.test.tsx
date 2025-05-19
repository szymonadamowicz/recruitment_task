import React from 'react';
import {render} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import CharacterDetailsScreen from '../../../screens/CharacterDetailsScreen';

jest.mock('../../../components/character/CharacterDetails', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return ({character}: {character: any}) => <Text>{character.name}</Text>;
});

jest.mock('../../../components/UI/GoBackLink', () => {
  const React = require('react');
  const {Text} = require('react-native');
  return () => <Text>Go Back</Text>;
});

jest.mock('../../../api/api', () => ({
  fetchCharacterById: jest.fn(),
}));

const {fetchCharacterById} = require('../../../api/api');

jest.mock('@react-navigation/native', () => ({
  useRoute: () => ({params: {id: 1}}),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({children}: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('CharacterDetailsScreen', () => {
  it('shows character details when loaded', async () => {
    fetchCharacterById.mockResolvedValueOnce({
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      image: '',
      origin: {name: 'Earth'},
      location: {name: 'Earth'},
    });

    const screen = render(<CharacterDetailsScreen />, {
      wrapper: createWrapper(),
    });

    expect(await screen.findByText('Rick Sanchez')).toBeTruthy();
  });

  it('shows loading state', () => {
    fetchCharacterById.mockReturnValue(new Promise(() => {}));

    const screen = render(<CharacterDetailsScreen />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText('Loading...')).toBeTruthy();
  });

  it('shows error state', async () => {
    fetchCharacterById.mockRejectedValueOnce(new Error('Boom'));

    const screen = render(<CharacterDetailsScreen />, {
      wrapper: createWrapper(),
    });

    await screen.findByText('Loading...');

    const errorText = await screen.findByText(/something went wrong/i);
    expect(errorText).toBeTruthy();
  });
});
