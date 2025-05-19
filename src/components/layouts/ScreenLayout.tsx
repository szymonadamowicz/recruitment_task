import React from 'react';
import {View, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {
  SafeAreaView as SafeAreaWrapper,
  SafeAreaView as SafeAreaHeader,
} from 'react-native-safe-area-context';
import PageTitle from '../UI/PageHeader';
import SearchBar from '../UI/SearchBar';
import {
  ScreenLayoutWrapperProps,
  ScreenLayoutHeaderProps,
} from '../../types/types';
import Header from '../UI/Header';

export const ScreenLayoutWrapper = ({
  children,
  childrenAboveList,
  showHeader = true,
  showTitle = true,
  showSearch = true,
  searchValue = '',
  onSearchChange,
  scrollable = false,
  containerStyle,
}: ScreenLayoutWrapperProps) => {
  const content = (
    <View style={[styles.inner, containerStyle]}>
      {showHeader && <Header />}
      {showTitle && <PageTitle title="Characters" />}
      {showSearch && onSearchChange && (
        <SearchBar value={searchValue} onChange={onSearchChange} />
      )}
      {childrenAboveList}
      {children}
    </View>
  );

  return (
    <SafeAreaWrapper style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      {scrollable ? (
        <ScrollView
          contentContainerStyle={{}}
          keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaWrapper>
  );
};

export const ScreenLayoutHeader = ({
  showHeader = true,
  showTitle = true,
  showSearch = true,
  searchValue = '',
  onSearchChange,
  childrenAboveList,
}: ScreenLayoutHeaderProps) => (
  <SafeAreaHeader edges={['top']} style={styles.safeHeader}>
    <View style={styles.listHeader}>
      {showHeader && <Header />}
      {showTitle && <PageTitle title="Characters" />}
      {showSearch && onSearchChange && (
        <SearchBar value={searchValue} onChange={onSearchChange} />
      )}
      {childrenAboveList}
    </View>
  </SafeAreaHeader>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  inner: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  safeHeader: {
    backgroundColor: '#0f3d1d',
  },
  listHeader: {
    backgroundColor: '#f3f4f6',
    paddingBottom: 16,
  },
});
