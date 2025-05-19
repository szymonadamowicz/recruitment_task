import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/searchIcon.png')}
        style={styles.icon}
      />
      <TextInput
        placeholder="Search the characters"
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#6b7280"
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChange('')}>
          <Image
            source={require('../../../assets/ClearSearch.png')}
            style={styles.clearIcon}
          />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 45,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#111827',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    flex: 1,
    color: '#111827',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  clearIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
});
