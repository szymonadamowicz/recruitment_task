import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavoritesScreen from '../screens/FavoriteScreen';
import {Image, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MainStack from './MainStack';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: '#122a1d',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({focused}) => {
          let icon;

          if (route.name === 'AllCharactersMain') {
            icon = require('../../assets/All.png');
          } else if (route.name === 'LikedCharacters') {
            icon = require('../../assets/Favorite.png');
          }

          return <Image source={icon} style={styles.icon} />;
        },
        tabBarActiveBackgroundColor: '#23432c',
        tabBarInactiveBackgroundColor: '#122a1d',
      })}>
      <Tab.Screen
        name="AllCharactersMain"
        component={MainStack}
        options={{title: 'ALL CHARACTERS'}}
      />
      <Tab.Screen
        name="LikedCharacters"
        component={FavoritesScreen}
        options={{title: 'LIKED CHARACTERS'}}
      />
    </Tab.Navigator>
  );
};

export default TabsNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
    tintColor: 'white',
  },
  label: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
