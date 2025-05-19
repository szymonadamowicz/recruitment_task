import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import FavoriteButton from '../UI/FavoriteButton';
import {Character} from '../../types/types';

const screenWidth = Dimensions.get('window').width;

const CharacterDetails = ({character}: {character: Character}) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.fakeShadow} />
      <View style={styles.outer}>
        <Image source={{uri: character.image}} style={styles.image} />

        <View style={styles.infoWrapper}>
          <Text style={styles.label}>NAME</Text>
          <Text style={styles.name}>{character.name}</Text>

          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>STATUS</Text>
              <Text style={styles.gridValue}>{character.status}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>ORIGIN</Text>
              <Text style={styles.gridValue}>{character.origin.name}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>SPECIES</Text>
              <Text style={styles.gridValue}>{character.species}</Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.gridLabel}>GENDER</Text>
              <Text style={styles.gridValue}>{character.gender}</Text>
            </View>
          </View>

          <View style={styles.favContainer}>
            <FavoriteButton character={character} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CharacterDetails;

const styles = StyleSheet.create({
  wrapper: {
    width: screenWidth * 0.91,
    alignItems: 'center',
    position: 'relative',
  },
  fakeShadow: {
    position: 'absolute',
    top: 6,
    left: 6,
    width: screenWidth * 0.9,
    backgroundColor: '#224229',
    borderRadius: 32,
    height: '100%',
    zIndex: -1,
  },
  outer: {
    width: screenWidth * 0.9,
    backgroundColor: '#fff',
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#0f3d1d',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    borderRadius: 24,
    marginBottom: 16,
  },
  infoWrapper: {
    width: '100%',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  name: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  grid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 8,
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  gridValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  favContainer: {
    marginTop: 12,
    width: '100%',
  },
});
