import {StyleProp, ViewStyle} from 'react-native';

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  image: string;
  origin: {name: string};
  location: {name: string};
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

export interface CharacterFilters {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
}

export interface CharacterTypeProps {
  character: Character;
}

export interface FavoritesContextType {
  favorites: Character[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (character: Character) => void;
  removeFavorite: (id: number) => void;
}

export interface LoadMoreLayoutProps<T> {
  data: T[];
  renderItem: ({item}: {item: T}) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  ListHeaderComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

export interface ScreenLayoutWrapperProps {
  children: React.ReactNode;
  childrenAboveList?: React.ReactNode;
  showHeader?: boolean;
  showTitle?: boolean;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  scrollable?: boolean;
  containerStyle?: ViewStyle;
}

export interface ScreenLayoutHeaderProps {
  showHeader?: boolean;
  showTitle?: boolean;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  childrenAboveList?: React.ReactNode;
}

export interface Filters {
  name?: string;
  status?: string;
  species?: string;
}

export interface FilterModalProps {
  visible: boolean;
  filters: {
    status: string[];
    species: string[];
  };
  onClose: () => void;
  onApply: (filters: {status: string[]; species: string[]}) => void;
}

export type AppStackParamList = {
  Tabs: undefined;
  CharacterDetails: {id: number};
};

export type MainStackParamList = {
  AllCharacters: undefined;
};
