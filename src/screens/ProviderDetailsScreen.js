import React, { useMemo } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import SlotButton from '../components/SlotButton';
import { providers } from '../data/providers';
import ScreenShell from '../components/ScreenShell';
import { colors, radius, shadows, spacing } from '../theme';

export default function ProviderDetailsScreen({ route, navigation }) {
  const { providerId } = route.params;
  const provider = useMemo(() => providers.find((item) => item.id === providerId), [providerId]);

  if (!provider) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>Provider not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <View style={styles.imageWrap}>
          <Image source={{ uri: provider.image }} style={styles.image} />
          <View style={styles.imageOverlay} />
          <View style={styles.pill}>
            <Text style={styles.pillText}>{provider.rating} rating</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.category}>{provider.category}</Text>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.meta}>{provider.rating} rating · {provider.price}</Text>
          <Text style={styles.bio}>{provider.bio}</Text>

          <Text style={styles.sectionTitle}>Available slots</Text>
          <View style={styles.slotRow}>
            {provider.slots.map((slot) => (
              <SlotButton
                key={slot}
                label={slot}
                onPress={() => navigation.navigate('Booking', { providerId: provider.id, slot })}
              />
            ))}
          </View>

          <Pressable onPress={() => navigation.navigate('Booking', { providerId: provider.id })} style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Continue to booking</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: colors.text,
    fontWeight: '800',
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
    backgroundColor: 'rgba(16, 33, 51, 0.14)',
  },
  pill: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    backgroundColor: 'rgba(255, 253, 248, 0.92)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
  },
  pillText: {
    color: colors.text,
    fontWeight: '800',
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
  category: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  name: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 34,
    color: colors.text,
    fontWeight: '900',
  },
  meta: {
    color: colors.muted,
    marginTop: 8,
    marginBottom: 14,
  },
  bio: {
    color: colors.text,
    lineHeight: 22,
  },
  sectionTitle: {
    marginTop: 22,
    marginBottom: 12,
    fontSize: 18,
    color: colors.text,
    fontWeight: '800',
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  primaryButton: {
    marginTop: 10,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '800',
  },
  error: {
    padding: 24,
    color: colors.danger,
  },
});