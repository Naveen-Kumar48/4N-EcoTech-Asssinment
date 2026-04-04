import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, shadows, spacing } from '../theme';
import ScreenShell from '../components/ScreenShell';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState('Test User');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name.trim() || !email.trim() || password.length < 6) {
      Alert.alert('Invalid details', 'Use a name, email, and a password with at least 6 characters.');
      return;
    }

    setLoading(true);
    const result = await signUp({ name, email, password });
    setLoading(false);

    if (!result.ok) {
      Alert.alert('Registration failed', 'An account with that email already exists.');
    }
  }

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.badge}>Create account</Text>
        <Text style={styles.title}>A faster way to book.</Text>
        <Text style={styles.subtitle}>Set up a local demo account and start booking services.</Text>

        <View style={styles.card}>
          <TextInput value={name} onChangeText={setName} placeholder="Full name" placeholderTextColor={colors.softText} style={styles.input} />
          <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor={colors.softText} autoCapitalize="none" keyboardType="email-address" style={styles.input} />
          <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor={colors.softText} secureTextEntry style={styles.input} />

          <Pressable onPress={handleRegister} style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
            <Text style={styles.primaryButtonText}>{loading ? 'Creating...' : 'Create account'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Back to sign in</Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  badge: {
    color: colors.accent,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1.1,
    fontSize: 12,
  },
  title: {
    marginTop: 10,
    fontSize: 38,
    lineHeight: 44,
    color: colors.text,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 12,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: 28,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 16,
    marginBottom: 14,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: 6,
  },
  pressed: {
    opacity: 0.9,
  },
  primaryButtonText: {
    color: '#F8FAFC',
    fontWeight: '800',
    fontSize: 16,
  },
  link: {
    color: colors.accent,
    textAlign: 'center',
    marginTop: 18,
    fontWeight: '700',
  },
});