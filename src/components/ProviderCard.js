import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { categoryColors, colors, radius, shadows } from '../theme';

export default function ProviderCard({ provider, onPress }) {
  const catColor = categoryColors[provider.category] || { bg: colors.primarySoft, text: colors.text };

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: provider.image }} style={styles.image} />
        <View style={styles.imageOverlay} />
        <View style={[styles.categoryBadge, { backgroundColor: catColor.bg }]}>
          <Text style={[styles.categoryText, { color: catColor.text }]}>{provider.category}</Text>
        </View>
        {!provider.available && (
          <View style={styles.unavailableBadge}>
            <Text style={styles.unavailableText}>Fully Booked</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>{provider.name}</Text>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingText}>★ {provider.rating}</Text>
          </View>
        </View>
        <Text style={styles.reviews}>{provider.reviews} reviews</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{provider.price}</Text>
          <View style={[styles.availDot, { backgroundColor: provider.available ? colors.success : colors.danger }]} />
          <Text style={[styles.availText, { color: provider.available ? colors.success : colors.danger }]}>
            {provider.available ? 'Available' : 'Unavailable'}
          </Text>
        </View>
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
    transform: [{ scale: 0.975 }],
    opacity: 0.94,
  },
  imageWrap: {
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 10,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,33,51,0.18)',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  unavailableBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: colors.danger,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  unavailableText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  content: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
    marginRight: 8,
  },
  ratingPill: {
    backgroundColor: colors.accentSoft,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  ratingText: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 12,
  },
  reviews: {
    color: colors.softText,
    fontSize: 12,
    marginTop: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 6,
  },
  price: {
    color: colors.text,
    fontWeight: '800',
    flex: 1,
  },
  availDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  availText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
