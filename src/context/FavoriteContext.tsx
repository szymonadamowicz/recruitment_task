import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Character, FavoritesContextType} from '../types/types';

const STORAGE_KEY = 'favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Character[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };
    loadFavorites();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites)).catch(err => {
      console.error('Failed to save favorites:', err);
    });
  }, [favorites]);

  const isFavorite = (id: number) => favorites.some(c => c.id === id);

  const toggleFavorite = (character: Character) => {
    setFavorites(prev =>
      isFavorite(character.id)
        ? prev.filter(c => c.id !== character.id)
        : [...prev, character],
    );
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(c => c.id !== id));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
      }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};
