import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import SlotButton from '../components/SlotButton';
import { providers } from '../data/providers';
import { bookAppointment, hasConflictingAppointment } from '../utils/storage';
import { useAuth } from '../context/AuthContext';
import ScreenShell from '../components/ScreenShell';
import { categoryColors, colors, radius, shadows, spacing } from '../theme';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export default function BookingScreen({ route, navigation }) {
  const { providerId, slot: initialSlot } = route.params || {};
  const provider = useMemo(
    () => providers.find((item) => item.id === providerId) || providers[0],
    [providerId]
  );
  const { user } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [selectedSlot, setSelectedSlot] = useState(initialSlot || provider.slots[0]);
  const [dateError, setDateError] = useState('');
  const [loading, setLoading] = useState(false);

  const catColor = categoryColors[provider.category] || { bg: colors.primarySoft, text: colors.text };

  function handleDateChange(val) {
    setDate(val);
    if (dateError) setDateError('');
  }

  async function handleBook() {
    // Validate date format
    if (!DATE_REGEX.test(date)) {
      setDateError('Enter a valid date in YYYY-MM-DD format.');
      return;
    }
    const parsed = new Date(date);
    if (isNaN(parsed.getTime())) {
      setDateError('Enter a valid calendar date.');
      return;
    }
    if (parsed < new Date(new Date().toDateString())) {
      setDateError('Date cannot be in the past.');
      return;
    }
    setDateError('');

    setLoading(true);
    const conflict = await hasConflictingAppointment({ date, slot: selectedSlot, providerId: provider.id });
    if (conflict) {
      setLoading(false);
      Alert.alert('Slot Unavailable', 'This slot is already booked. Please choose a different time.');
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
    // Navigate first — screen unmounts so no need to reset loading state
    navigation.navigate('Appointments', { successMessage: 'Your appointment has been saved! 🎉' });
  }

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Back */}
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </Pressable>

        <Text style={styles.pageTitle}>Confirm Booking</Text>

        {/* Provider summary card */}
        <View style={styles.summaryCard}>
          <View style={[styles.categoryChip, { backgroundColor: catColor.bg }]}>
            <Text style={[styles.categoryChipText, { color: catColor.text }]}>{provider.category}</Text>
          </View>
          <Text style={styles.providerName}>{provider.name}</Text>
          <Text style={styles.providerMeta}>{provider.price} per session · ★ {provider.rating}</Text>
        </View>

        {/* Date */}
        <View style={styles.section}>
          <Text style={styles.label}>📅 Select Date</Text>
          <TextInput
            value={date}
            onChangeText={handleDateChange}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={colors.softText}
            style={[styles.input, dateError && styles.inputError]}
            maxLength={10}
          />
          {dateError ? <Text style={styles.errorText}>{dateError}</Text> : null}
        </View>

        {/* Slot picker */}
        <View style={styles.section}>
          <Text style={styles.label}>🕐 Select Time Slot</Text>
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
        </View>

        {/* Live booking summary */}
        <View style={styles.bookingSummary}>
          <Text style={styles.summaryTitle}>Booking Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Provider</Text>
            <Text style={styles.summaryVal}>{provider.name}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Date</Text>
            <Text style={[styles.summaryVal, dateError && { color: colors.danger }]}>{date || '—'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Time</Text>
            <Text style={styles.summaryVal}>{selectedSlot || '—'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryKey}>Price</Text>
            <Text style={[styles.summaryVal, { color: colors.accent }]}>{provider.price}</Text>
          </View>
        </View>

        {/* Confirm */}
        <Pressable
          onPress={handleBook}
          style={({ pressed }) => [styles.confirmButton, loading && styles.confirmButtonLoading, pressed && styles.pressed]}
          disabled={loading}
        >
          <Text style={styles.confirmButtonText}>{loading ? 'Booking...' : '✓ Confirm Booking'}</Text>
        </Pressable>
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
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 18,
  },
  summaryCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 20,
    marginBottom: 20,
    ...shadows.raised,
  },
  categoryChip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    marginBottom: 10,
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  providerName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#F8FAFC',
  },
  providerMeta: {
    color: colors.accentSoft,
    marginTop: 4,
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 15,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surfaceElevated,
    ...shadows.card,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 13,
    marginTop: 6,
  },
  slotRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  bookingSummary: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
    ...shadows.card,
  },
  summaryTitle: {
    fontWeight: '900',
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  summaryKey: {
    color: colors.softText,
    fontWeight: '600',
  },
  summaryVal: {
    color: colors.text,
    fontWeight: '800',
  },
  confirmButton: {
    backgroundColor: colors.success,
    paddingVertical: 16,
    borderRadius: radius.lg,
    alignItems: 'center',
    ...shadows.raised,
  },
  confirmButtonLoading: {
    opacity: 0.7,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 16,
  },
});
