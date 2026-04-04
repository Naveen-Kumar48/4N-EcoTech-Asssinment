import React from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ProviderCard from '../components/ProviderCard';
import { providers } from '../data/providers';
import { useAuth } from '../context/AuthContext';
import ScreenShell from '../components/ScreenShell';
import { colors, radius, shadows, spacing } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();

  return (
    <ScreenShell>
      <View style={styles.hero}>
        <View style={styles.heroCard}>
          <Text style={styles.greeting}>Hi, {user?.name?.split(' ')[0] || 'there'}</Text>
          <Text style={styles.title}>Find a provider, compare slots, and book instantly.</Text>
          <Text style={styles.subtitle}>A polished local booking flow for your assignment demo.</Text>
          <View style={styles.heroActions}>
            <Pressable onPress={() => navigation.navigate('Appointments')} style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>My appointments</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Appointments')} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>View schedule</Text>
            </Pressable>
            <Pressable onPress={signOut} style={styles.signOutButton}>
              <Text style={styles.signOutButtonText}>Sign out</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <FlatList
        data={providers}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ProviderCard provider={item} onPress={() => navigation.navigate('ProviderDetails', { providerId: item.id })} />
        )}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  heroCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.raised,
  },
  greeting: {
    color: colors.accent,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontSize: 12,
  },
  title: {
    marginTop: 10,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    marginTop: 10,
    color: colors.muted,
    lineHeight: 22,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    flexWrap: 'wrap',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: radius.lg,
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryButtonText: {
    color: colors.text,
    fontWeight: '700',
  },
  signOutButton: {
    backgroundColor: colors.dangerSoft,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.dangerSoft,
  },
  signOutButtonText: {
    color: colors.danger,
    fontWeight: '800',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 24,
  },
});