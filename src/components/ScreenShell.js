import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function ScreenShell({ children, contentStyle }) {
  return (
    <SafeAreaView style={styles.container}>
      <View pointerEvents="none" style={styles.blobOne} />
      <View pointerEvents="none" style={styles.blobTwo} />
      <View pointerEvents="none" style={styles.grid} />
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  blobOne: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#F0D9BA',
    opacity: 0.28,
    top: -70,
    right: -80,
  },
  blobTwo: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: '#C5D8E8',
    opacity: 0.18,
    left: -70,
    bottom: 90,
  },
  grid: {
    position: 'absolute',
    inset: 0,
    opacity: 0.05,
    backgroundColor: 'transparent',
  },
});