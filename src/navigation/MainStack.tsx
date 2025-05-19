import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllCharactersScreen from '../screens/AllCharactersScreen';
import { MainStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllCharacters"
        component={AllCharactersScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainStack