import React, {useEffect, useState} from 'react';
import {
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  FlatListProps,
} from 'react-native';
import {LoadMoreLayoutProps} from '../../types/types';

const PAGE_SIZE = 20;

function LoadMoreLayout<T>({
  data,
  renderItem,
  keyExtractor,
  ListHeaderComponent,
  ListEmptyComponent,
  contentContainerStyle,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
}: LoadMoreLayoutProps<T> & {
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
}) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const localVisibleData = data.slice(0, visibleCount);
  const isServerPaginated = !!onLoadMore;

  const handleLoadMore = () => {
    if (isServerPaginated) {
      onLoadMore?.();
    } else {
      setVisibleCount(prev => prev + PAGE_SIZE);
    }
  };

  useEffect(() => {
    setVisibleCount(prev => (data.length < prev ? PAGE_SIZE : prev));
  }, [data.length]);

  return (
    <FlatList
      data={isServerPaginated ? data : localVisibleData}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={ListEmptyComponent}
      contentContainerStyle={[styles.defaultContainer, contentContainerStyle]}
      ListFooterComponent={
        (isServerPaginated && hasMore) ||
        (!isServerPaginated && visibleCount < data.length) ? (
          <TouchableOpacity onPress={handleLoadMore} style={styles.button}>
            <Text style={styles.buttonText}>
              {isLoadingMore ? 'Loading...' : 'Load More'}
            </Text>
          </TouchableOpacity>
        ) : null
      }
    />
  );
}

export default LoadMoreLayout;

const styles = StyleSheet.create({
  defaultContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6366f1',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
