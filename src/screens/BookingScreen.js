import React, { useMemo, useState } from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import SlotButton from '../components/SlotButton';
import { providers } from '../data/providers';
import { bookAppointment, hasConflictingAppointment } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import ScreenShell from '../components/ScreenShell';
import { colors, radius, shadows, spacing } from '../theme';

export default function BookingScreen({ route, navigation }) {
  const { providerId, slot: initialSlot } = route.params || {};
  const provider = useMemo(() => providers.find((item) => item.id === providerId) || providers[0], [providerId]);
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || provider.slots[0]);
  const [loading, setLoading] = useState(false);

  async function handleBook() {
    if (!date || !selectedSlot) {
      Alert.alert('Missing details', 'Choose a date and slot.');
      return;
    }

    setLoading(true);
    const conflict = await hasConflictingAppointment({ date, slot: selectedSlot, providerId: provider.id });
    if (conflict) {
      setLoading(false);
      Alert.alert('Slot unavailable', 'This provider already has a booking for that slot.');
      return;
    }

    await bookAppointment({
      id: Date.now().toString(),
      providerId: provider.id,
      userEmail: user.email,
      slot: selectedSlot,
      date,
      providerName: provider.name,
      category: provider.category,
    });

    setLoading(false);
    navigation.navigate('Appointments', {
      successMessage: 'Your appointment has been saved.',
    });
  }

  return (
    <ScreenShell>
      <View style={styles.card}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <Text style={styles.label}>Provider</Text>
        <Text style={styles.provider}>{provider.name}</Text>
        <Text style={styles.meta}>{provider.category} · {provider.price}</Text>

        <Text style={styles.label}>Date</Text>
        <TextInput value={date} onChangeText={setDate} placeholder="YYYY-MM-DD" placeholderTextColor={colors.softText} style={styles.input} />

        <Text style={styles.label}>Slot</Text>
        <View style={styles.slotRow}>
          {provider.slots.map((slot) => (
            <SlotButton key={slot} label={slot} selected={selectedSlot === slot} onPress={() => setSelectedSlot(slot)} />
          ))}
        </View>

        <Pressable onPress={handleBook} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
          <Text style={styles.primaryButtonText}>{loading ? 'Booking...' : 'Confirm booking'}</Text>
        </Pressable>
      </View>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 22,
    margin: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButtonText: {
    color: colors.text,
    fontWeight: '800',
  },
  label: {
    marginTop: 10,
    marginBottom: 8,
    color: colors.accent,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontSize: 12,
  },
  provider: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  meta: {
    marginTop: 6,
    color: colors.muted,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: 12,
  },
  pressed: {
    opacity: 0.9,
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 16,
  },
});