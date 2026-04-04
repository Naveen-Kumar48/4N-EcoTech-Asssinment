import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, shadows } from '../theme';

export default function ProviderCard({ provider, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <Image source={{ uri: provider.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.badgeRow}>
          <Text style={styles.category}>{provider.category}</Text>
          <Text style={styles.rating}>{provider.rating}★</Text>
        </View>
        <Text style={styles.name}>{provider.name}</Text>
        <Text style={styles.meta}>{provider.price}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.96,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  category: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  rating: {
    color: colors.text,
    fontWeight: '800',
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    overflow: 'hidden',
    fontSize: 12,
  },
  name: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginTop: 6,
  },
  meta: {
    color: colors.muted,
    marginTop: 8,
  },
});