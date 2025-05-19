import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AppStackParamList, CharacterTypeProps} from '../../types/types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import FavoriteButton from '../UI/FavoriteButton';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.9;
const imageSize = screenWidth * 0.55;

const CharacterCard = ({character}: CharacterTypeProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  const [cardHeight, setCardHeight] = useState(0);

  return (
    <View style={styles.wrapper}>
      {cardHeight > 0 && (
        <View style={[styles.fakeShadow, {height: cardHeight}]} />
      )}
      <Pressable
        onLayout={event => setCardHeight(event.nativeEvent.layout.height)}
        onPress={() =>
          navigation.navigate('CharacterDetails', {id: character.id})
        }
        style={[styles.card, {width: cardWidth}]}>
        <View style={styles.textSection}>
          <Text style={styles.label}>NAME</Text>
          <Text style={styles.value}>{character.name}</Text>

          <Text style={styles.label}>STATUS</Text>
          <Text style={styles.value}>{character.status}</Text>

          <Text style={styles.label}>SPECIES</Text>
          <Text style={styles.value}>{character.species}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{uri: character.image}} style={styles.image} />
          <View style={styles.likeButton}>
            <FavoriteButton character={character} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default CharacterCard;

const styles = StyleSheet.create({
  wrapper: {
    width: cardWidth,
    position: 'relative',
    alignItems: 'center',
  },
  fakeShadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    width: cardWidth,
    backgroundColor: '#224229',
    borderRadius: 24,
    zIndex: -1,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'black',
  },
  textSection: {
    flex: 1,
    paddingRight: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: 'black',
  },
  imageContainer: {
    position: 'relative',
    width: imageSize,
    height: imageSize,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  likeButton: {
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
});
