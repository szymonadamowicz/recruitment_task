import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const getStatusColor = (status: string) => {
  if (status === 'Alive') return styles.alive;
  if (status === 'Dead') return styles.dead;
  return styles.unknown;
};

const CharacterStatusBadge = ({status}: {status: string}) => (
  <View style={[styles.badge, getStatusColor(status)]}>
    <Text style={styles.badgeText}>{status}</Text>
  </View>
);

export default CharacterStatusBadge;

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
  },
  alive: {
    backgroundColor: '#22c55e',
  },
  dead: {
    backgroundColor: '#ef4444',
  },
  unknown: {
    backgroundColor: '#9ca3af',
  },
});
