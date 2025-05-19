import React, {useState, useMemo} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import CharacterCard from '../components/character/CharacterCard';
import {useFavorites} from '../context/FavoriteContext';
import {ScreenLayoutHeader} from '../components/layouts/ScreenLayout';
import FilterModal from '../components/UI/FilterModal';
import LoadMoreLayout from '../components/layouts/LoadMoreLayout';
import {Character} from '../types/types';

const FavoritesScreen = () => {
  const {favorites} = useFavorites();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{status: string[]; species: string[]}>(
    {
      status: [],
      species: [],
    },
  );

  const filteredCharacters = useMemo(() => {
    return favorites.filter((char: Character) => {
      const matchesSearch = char.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus =
        filters.status.length === 0 ||
        filters.status.some(s => s.toLowerCase() === char.status.toLowerCase());
      const matchesSpecies =
        filters.species.length === 0 ||
        filters.species.some(
          s => s.toLowerCase() === char.species.toLowerCase(),
        );
      return matchesSearch && matchesStatus && matchesSpecies;
    });
  }, [favorites, search, filters]);

  return (
    <SafeAreaView style={styles.container}>
      <LoadMoreLayout<Character>
        data={filteredCharacters}
        renderItem={({item}) => <CharacterCard character={item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <ScreenLayoutHeader
            searchValue={search}
            onSearchChange={setSearch}
            childrenAboveList={
              <FilterModal filters={filters} onApply={setFilters} />
            }
          />
        }
        ListEmptyComponent={
          <Text style={styles.message}>No results found.</Text>
        }
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    paddingBottom: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  message: {
    textAlign: 'center',
    color: '#4b5563',
    marginTop: 40,
    fontSize: 16,
  },
});
