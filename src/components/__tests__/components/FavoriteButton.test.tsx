import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {FavoritesProvider} from '../../../context/FavoriteContext';
import FavoriteButton from '../../UI/FavoriteButton';
import {mockCharacter} from '../../../../__mocks__/mock_character';

describe('FavoriteButton', () => {
  it('toggles label between LIKE and UNLIKE when pressed', async () => {
    const wrapper = render(
      <FavoritesProvider>
        <FavoriteButton character={mockCharacter} />
      </FavoritesProvider>,
    );

    const likeButton = wrapper.getByText('LIKE');
    expect(likeButton).toBeTruthy();

    fireEvent.press(likeButton);

    const unlikeButton = await wrapper.findByText('UNLIKE');
    expect(unlikeButton).toBeTruthy();

    fireEvent.press(unlikeButton);

    const likeAgain = await wrapper.findByText('LIKE');
    expect(likeAgain).toBeTruthy();
  });
});
