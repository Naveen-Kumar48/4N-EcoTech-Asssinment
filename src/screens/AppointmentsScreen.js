import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { cancelAppointment, getAppointments } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import ScreenShell from '../components/ScreenShell';
import { categoryColors, colors, radius, shadows, spacing } from '../theme';

export default function AppointmentsScreen({ navigation, route }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const successMessage = route?.params?.successMessage;

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const data = await getAppointments();
    setAppointments(data.filter((a) => a.userEmail === user.email));
    setLoading(false);
  }, [user.email]);

  useEffect(() => { loadAppointments(); }, [loadAppointments]);

  async function handleCancel(id) {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'Keep It', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            await cancelAppointment(id);
            await loadAppointments();
          },
        },
      ]
    );
  }

  function Header() {
    return (
      <View style={styles.headerWrap}>
        {successMessage ? (
          <View style={styles.successBanner}>
            <Text style={styles.successBannerText}>{successMessage}</Text>
          </View>
        ) : null}
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <Text style={styles.headerSubtitle}>
          {loading
            ? 'Loading...'
            : appointments.length > 0
            ? `You have ${appointments.length} upcoming booking${appointments.length > 1 ? 's' : ''}.`
            : 'No bookings yet. Browse providers to get started.'}
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <ScreenShell>
        <View style={styles.list}>
          <Header />
          <View style={styles.loadingWrap}>
            <Text style={styles.loadingText}>Loading appointments...</Text>
          </View>
        </View>
      </ScreenShell>
    );
  }

  if (appointments.length === 0) {
    return (
      <ScreenShell>
        <View style={styles.list}>
          <Header />
          <View style={styles.emptyCard}>
            <Text style={styles.emptyEmoji}>📅</Text>
            <Text style={styles.emptyTitle}>No appointments yet</Text>
            <Text style={styles.emptyText}>
              Pick a provider from the home screen and save your first booking.
            </Text>
            <Pressable
              onPress={() => navigation.goBack()}
              style={({ pressed }) => [styles.emptyAction, pressed && styles.pressed]}
            >
              <Text style={styles.emptyActionText}>Browse Providers</Text>
            </Pressable>
          </View>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={Header}
        renderItem={({ item }) => {
          const catColor = categoryColors[item.category] || { bg: colors.primarySoft, text: colors.text };
          return (
            <View style={styles.card}>
              {/* Card header: category + confirmed badge */}
              <View style={styles.cardHeader}>
                <View style={[styles.categoryBadge, { backgroundColor: catColor.bg }]}>
                  <Text style={[styles.categoryBadgeText, { color: catColor.text }]}>
                    {item.category}
                  </Text>
                </View>
                <View style={styles.confirmedBadge}>
                  <Text style={styles.confirmedText}>✓ Confirmed</Text>
                </View>
              </View>

              <Text style={styles.provider}>{item.providerName}</Text>

              {/* Date + Time tiles */}
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>📅</Text>
                  <View>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailIcon}>🕐</Text>
                  <View>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>{item.slot}</Text>
                  </View>
                </View>
              </View>

              <Pressable
                onPress={() => handleCancel(item.id)}
                style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}
              >
                <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: 32,
  },
  loadingWrap: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    color: colors.muted,
    fontSize: 16,
  },
  headerWrap: {
    marginBottom: 20,
  },
  successBanner: {
    marginBottom: 14,
    backgroundColor: colors.successSoft,
    borderColor: '#6EE7B7',
    borderWidth: 1,
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: radius.lg,
  },
  successBannerText: {
    color: colors.success,
    fontWeight: '800',
    fontSize: 15,
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
  headerTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  headerSubtitle: {
    marginTop: 6,
    color: colors.muted,
    lineHeight: 22,
  },
  emptyCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 32,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.card,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  emptyText: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  emptyAction: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 13,
    paddingHorizontal: 24,
  },
  emptyActionText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 15,
  },
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  confirmedBadge: {
    backgroundColor: colors.successSoft,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  confirmedText: {
    color: colors.success,
    fontSize: 11,
    fontWeight: '800',
  },
  provider: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 14,
  },
  detailsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  detailItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: radius.lg,
    padding: 12,
  },
  detailIcon: {
    fontSize: 18,
  },
  detailLabel: {
    color: colors.softText,
    fontSize: 11,
    fontWeight: '600',
  },
  detailValue: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 13,
    marginTop: 2,
  },
  cancelButton: {
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    borderRadius: radius.lg,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelButtonText: {
    color: colors.danger,
    fontWeight: '800',
  },
});
