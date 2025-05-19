import React from 'react';
import {Text, StyleSheet} from 'react-native';

const PageTitle = ({title}: {title: string}) => (
  <>
    <Text style={styles.heading}>{title}</Text>
  </>
);

export default PageTitle;

const styles = StyleSheet.create({
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f3d1d',
    marginTop: 16,
    marginBottom: 16,
    marginHorizontal: 16,
  },
});
