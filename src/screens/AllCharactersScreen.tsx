import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import {useInfiniteCharacters} from '../hooks/useCharacters';
import CharacterCard from '../components/character/CharacterCard';
import FilterModal from '../components/UI/FilterModal';
import {ScreenLayoutHeader} from '../components/layouts/ScreenLayout';
import {Character} from '../types/types';
import LoadMoreLayout from '../components/layouts/LoadMoreLayout';

const AllCharactersScreen = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{status: string[]; species: string[]}>(
    {
      status: [],
      species: [],
    },
  );

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCharacters({
    name: search,
    status: filters.status.join(','),
    species: filters.species.join(','),
  }) as {
    data: {pages: {results: Character[]}[]};
    isLoading: boolean;
    error: unknown;
    fetchNextPage: () => void;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
  };

  const characters: Character[] =
    data?.pages.flatMap(page => page.results) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <LoadMoreLayout<Character>
        data={characters}
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
          isLoading ? (
            <Text style={styles.message}>Loading...</Text>
          ) : error ? (
            <Text style={styles.message}>
              Error: {(error as Error).message}
            </Text>
          ) : (
            <Text style={styles.message}>No results found.</Text>
          )
        }
        contentContainerStyle={styles.listContent}
        onLoadMore={fetchNextPage}
        hasMore={hasNextPage}
        isLoadingMore={isFetchingNextPage}
      />
    </SafeAreaView>
  );
};

export default AllCharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  listContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    padding: 20,
    color: '#4b5563',
  },
});
