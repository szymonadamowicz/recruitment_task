import React from 'react';
import {Image, Text, Pressable, StyleSheet} from 'react-native';
import {CharacterTypeProps} from '../../types/types';
import {useFavorites} from '../../context/FavoriteContext';

const FavoriteButton = ({character}: CharacterTypeProps) => {
  const {isFavorite, toggleFavorite} = useFavorites();
  const liked = isFavorite(character.id);

  const handleToggle = () => {
    toggleFavorite(character);
  };

  return (
    <Pressable
      onPress={handleToggle}
      style={[styles.button, liked && styles.likedBg]}>
      <Image
        source={
          liked
            ? require('../../../assets/icon1.png')
            : require('../../../assets/icon2.png')
        }
        style={styles.icon}
      />
      <Text style={styles.text}>{liked ? 'UNLIKE' : 'LIKE'}</Text>
    </Pressable>
  );
};

export default FavoriteButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: '#0f3d1d',
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f5fdf8',
  },
  likedBg: {
    backgroundColor: '#d8f3e0',
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 6,
  },
  text: {
    color: '#0f3d1d',
    fontWeight: '600',
    fontSize: 13,
    letterSpacing: 0.6,
  },
});
