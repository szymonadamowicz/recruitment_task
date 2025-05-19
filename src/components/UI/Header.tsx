import {Image, View, StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Header = () => (
  <View style={styles.container}>
    <Image
      source={require('../../../assets/rickHeader.png')}
      style={styles.logo}
      resizeMode="contain"
    />
  </View>
);

export default Header

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    backgroundColor: '#0f3d1d',
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  logo: {
    width: 160,
    height: 40,
  },
});
