import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GoBackLink = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.container}>
      <Text style={styles.text}>← Go back to Characters List</Text>
    </Pressable>
  );
};

export default GoBackLink;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    margin: 10,
    marginBottom: 26,
  },
  text: {
    fontSize: 14,
    color: '#4b5563',
    textDecorationLine: 'underline',
  },
});
