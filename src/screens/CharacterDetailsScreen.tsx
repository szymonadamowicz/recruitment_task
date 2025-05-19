import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useQuery} from '@tanstack/react-query';
import {fetchCharacterById} from '../api/api';
import CharacterDetails from '../components/character/CharacterDetails';
import GoBackLink from '../components/UI/GoBackLink';
import {ScreenLayoutWrapper} from '../components/layouts/ScreenLayout';

const CharacterDetailsScreen = () => {
  const route = useRoute<any>();
  const {id} = route.params;

  const {data, isLoading, error} = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterById(id),
    retry: false,
  });

  if (isLoading) return <Text style={styles.loading}>Loading...</Text>;
  if (error || !data)
    return <Text style={styles.loading}>Something went wrong.</Text>;

  return (
    <ScreenLayoutWrapper showTitle={false} scrollable>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <GoBackLink />
        <CharacterDetails character={data} />
      </ScrollView>
    </ScreenLayoutWrapper>
  );
};

export default CharacterDetailsScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 48,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  loading: {
    textAlign: 'center',
    marginTop: 40,
    color: '#4b5563',
  },
});
