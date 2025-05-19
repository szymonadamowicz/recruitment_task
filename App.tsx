import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {FavoritesProvider} from './src/context/FavoriteContext';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppStack from './src/navigation/AppStack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </FavoritesProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
