import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabsNavigator from './TabsNavigator';
import CharacterDetailsScreen from '../screens/CharacterDetailsScreen';
import {AppStackParamList} from '../types/types';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CharacterDetails"
        component={CharacterDetailsScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
