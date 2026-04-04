import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius } from '../theme';

export default function SlotButton({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, selected && styles.selected, pressed && styles.pressed]}>
      <Text style={[styles.text, selected && styles.selectedText]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: colors.surfaceElevated,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pressed: {
    opacity: 0.9,
  },
  text: {
    color: colors.text,
    fontWeight: '700',
  },
  selectedText: {
    color: '#F8FAFC',
  },
});