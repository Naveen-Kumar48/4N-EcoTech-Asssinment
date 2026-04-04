import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors, radius, shadows, spacing } from '../theme';
import ScreenShell from '../components/ScreenShell';

export default function RegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError('');
    if (!name.trim()) { setError('Full name is required.'); return; }
    if (!email.trim() || !email.includes('@')) { setError('Enter a valid email address.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }

    setLoading(true);
    const result = await signUp({ name: name.trim(), email: email.trim(), password });
    setLoading(false);

    if (!result.ok) {
      setError('An account with that email already exists.');
    }
  }

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.badge}>📅 BookEase</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Register to start booking services instantly.</Text>

        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={(v) => { setName(v); setError(''); }}
            placeholder="Jane Smith"
            placeholderTextColor={colors.softText}
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(v) => { setEmail(v); setError(''); }}
            placeholder="you@example.com"
            placeholderTextColor={colors.softText}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
          />

          <Text style={styles.fieldLabel}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={(v) => { setPassword(v); setError(''); }}
              placeholder="Min. 6 characters"
              placeholderTextColor={colors.softText}
              secureTextEntry={!showPassword}
              style={[styles.input, styles.passwordInput]}
            />
            <Pressable onPress={() => setShowPassword((s) => !s)} style={styles.eyeBtn}>
              <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
            </Pressable>
          </View>

          <Text style={styles.fieldLabel}>Confirm Password</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={(v) => { setConfirmPassword(v); setError(''); }}
            placeholder="Re-enter password"
            placeholderTextColor={colors.softText}
            secureTextEntry={!showPassword}
            style={[styles.input, confirmPassword && confirmPassword !== password && styles.inputError]}
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            onPress={handleRegister}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.primaryButtonText}>{loading ? 'Creating...' : 'Create Account'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Already have an account? Sign in →</Text>
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
    fontWeight: '800',
    fontSize: 18,
    marginBottom: 4,
  },
  title: {
    marginTop: 6,
    fontSize: 36,
    lineHeight: 42,
    color: colors.text,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 8,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
  },
  card: {
    marginTop: 24,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  fieldLabel: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 6,
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
  inputError: {
    borderColor: colors.danger,
  },
  passwordWrap: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
  eyeText: {
    fontSize: 18,
  },
  errorText: {
    color: colors.danger,
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 12,
    marginTop: -6,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: radius.lg,
    alignItems: 'center',
    marginTop: 4,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
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
    fontSize: 14,
  },
});
