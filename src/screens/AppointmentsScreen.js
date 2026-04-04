import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { cancelAppointment, getAppointments } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import ScreenShell from '../components/ScreenShell';
import { colors, radius, shadows, spacing } from '../theme';

export default function AppointmentsScreen({ navigation, route }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const successMessage = route?.params?.successMessage;

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    const data = await getAppointments();
    setAppointments(data.filter((appointment) => appointment.userEmail === user.email));
    setLoading(false);
  }, [user.email]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  async function handleCancel(id) {
    await cancelAppointment(id);
    Alert.alert('Cancelled', 'The appointment has been removed.');
    loadAppointments();
  }

  if (loading) {
    return (
      <ScreenShell>
        <Text style={styles.message}>Loading appointments...</Text>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={appointments.length === 0 ? styles.emptyState : styles.list}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            {successMessage ? (
              <View style={styles.successBanner}>
                <Text style={styles.successBannerText}>{successMessage}</Text>
              </View>
            ) : null}
            <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={styles.headerTitle}>My appointments</Text>
            <Text style={styles.headerSubtitle}>Manage upcoming bookings and remove any slot you no longer need.</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No appointments yet.</Text>
            <Text style={styles.emptyText}>Pick a provider from the home screen and save your first booking.</Text>
            <Pressable onPress={() => navigation.goBack()} style={({ pressed }) => [styles.emptyAction, pressed && styles.pressed]}>
              <Text style={styles.emptyActionText}>Go back</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.provider}>{item.providerName}</Text>
            <Text style={styles.meta}>{item.category}</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{item.date}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Slot</Text>
              <Text style={styles.detailValue}>{item.slot}</Text>
            </View>
            <Pressable onPress={() => handleCancel(item.id)} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        )}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: {
    padding: spacing.lg,
    paddingBottom: 28,
  },
  headerWrap: {
    marginBottom: 14,
  },
  successBanner: {
    marginBottom: 14,
    backgroundColor: '#DCFCE7',
    borderColor: '#86EFAC',
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: radius.lg,
  },
  successBannerText: {
    color: '#166534',
    fontWeight: '800',
  },
  headerTitle: {
    marginTop: 14,
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  headerSubtitle: {
    marginTop: 8,
    color: colors.muted,
    lineHeight: 22,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 4,
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
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.99 }],
  },
  emptyState: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emptyCard: {
    width: '100%',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    ...shadows.card,
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
    marginTop: 16,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  emptyActionText: {
    color: '#F8FAFC',
    fontWeight: '800',
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
  provider: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  meta: {
    color: colors.accent,
    marginTop: 4,
    fontWeight: '700',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  detailLabel: {
    color: colors.softText,
    fontWeight: '700',
  },
  detailValue: {
    color: colors.text,
    fontWeight: '800',
  },
  cancelButton: {
    marginTop: 14,
    backgroundColor: colors.dangerSoft,
    alignItems: 'center',
    borderRadius: radius.lg,
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: colors.danger,
    fontWeight: '800',
  },
});