import React, { useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SlotButton from '../components/SlotButton';
import { providers } from '../data/providers';
import ScreenShell from '../components/ScreenShell';
import { categoryColors, colors, radius, shadows, spacing } from '../theme';

export default function ProviderDetailsScreen({ route, navigation }) {
  const { providerId } = route.params;
  const provider = useMemo(() => providers.find((item) => item.id === providerId), [providerId]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  if (!provider) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Text style={{ padding: 24, color: colors.danger }}>Provider not found.</Text>
      </SafeAreaView>
    );
  }

  const catColor = categoryColors[provider.category] || { bg: colors.primarySoft, text: colors.text };

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Back */}
        <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>

        {/* Hero image */}
        <View style={styles.imageWrap}>
          <Image source={{ uri: provider.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
          <View style={[styles.categoryPill, { backgroundColor: catColor.bg }]}>
            <Text style={[styles.categoryPillText, { color: catColor.text }]}>{provider.category}</Text>
          </View>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingPillText}>★ {provider.rating} · {provider.reviews} reviews</Text>
          </View>
        </View>

        {/* Info card */}
        <View style={styles.card}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{provider.name}</Text>
            <View style={[styles.availBadge, { backgroundColor: provider.available ? '#DCFCE7' : '#FEE2E2' }]}>
              <Text style={[styles.availText, { color: provider.available ? colors.success : colors.danger }]}>
                {provider.available ? '● Available' : '● Fully Booked'}
              </Text>
            </View>
          </View>
          <Text style={styles.price}>{provider.price} per session</Text>
          <Text style={styles.bio}>{provider.bio}</Text>

          {/* Divider */}
          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Choose a time slot</Text>
          <View style={styles.slotRow}>
            {provider.slots.map((slot) => (
              <SlotButton
                key={slot}
                label={slot}
                selected={selectedSlot === slot}
                onPress={() => setSelectedSlot(slot)}
              />
            ))}
          </View>

          {selectedSlot && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedInfoText}>Selected: {selectedSlot}</Text>
            </View>
          )}

          <Pressable
            onPress={() => navigation.navigate('Booking', { providerId: provider.id, slot: selectedSlot || provider.slots[0] })}
            style={({ pressed }) => [styles.primaryButton, !provider.available && styles.disabledButton, pressed && styles.pressed]}
            disabled={!provider.available}
          >
            <Text style={styles.primaryButtonText}>
              {provider.available ? 'Continue to Booking →' : 'Currently Unavailable'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: colors.text,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  imageWrap: {
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadows.raised,
  },
  image: {
    width: '100%',
    height: 260,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16,33,51,0.22)',
  },
  categoryPill: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  ratingPill: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    backgroundColor: 'rgba(255,253,248,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: radius.pill,
  },
  ratingPillText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 13,
  },
  card: {
    marginTop: 16,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  name: {
    flex: 1,
    fontSize: 26,
    lineHeight: 32,
    color: colors.text,
    fontWeight: '900',
  },
  availBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginTop: 4,
  },
  availText: {
    fontSize: 11,
    fontWeight: '800',
  },
  price: {
    color: colors.accent,
    fontWeight: '800',
    marginTop: 6,
    fontSize: 15,
  },
  bio: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 17,
    color: colors.text,
    fontWeight: '800',
    marginBottom: 12,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  selectedInfo: {
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  selectedInfoText: {
    color: colors.accent,
    fontWeight: '800',
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: colors.muted,
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 15,
  },
});
