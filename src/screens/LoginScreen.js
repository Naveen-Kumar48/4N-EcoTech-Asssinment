import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import ScreenShell from '../components/ScreenShell';
import { colors, radius, shadows, spacing } from '../theme';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError('');
    if (!email.trim()) { setError('Email is required.'); return; }
    if (!password) { setError('Password is required.'); return; }

    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);

    if (!result.ok) {
      setError('Incorrect email or password. Please try again.');
    }
  }

  return (
    <ScreenShell>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.badge}>📅 BookEase</Text>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to manage your appointments.</Text>

        {/* Demo hint */}
        <View style={styles.demoHint}>
          <Text style={styles.demoHintText}>
            Demo credentials are pre-filled. Just tap Sign In.
          </Text>
        </View>

        <View style={styles.card}>
          {/* Email */}
          <Text style={styles.fieldLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(v) => { setEmail(v); setError(''); }}
            placeholder="you@example.com"
            placeholderTextColor={colors.softText}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, error && !email.trim() && styles.inputError]}
          />

          {/* Password */}
          <Text style={styles.fieldLabel}>Password</Text>
          <View style={styles.passwordWrap}>
            <TextInput
              value={password}
              onChangeText={(v) => { setPassword(v); setError(''); }}
              placeholder="••••••"
              placeholderTextColor={colors.softText}
              secureTextEntry={!showPassword}
              style={[styles.input, styles.passwordInput, error && !password && styles.inputError]}
            />
            <Pressable onPress={() => setShowPassword((s) => !s)} style={styles.eyeBtn}>
              <Text style={styles.eyeText}>{showPassword ? '🙈' : '👁️'}</Text>
            </Pressable>
          </View>

          {/* Inline error */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.primaryButtonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Don't have an account? Create one →</Text>
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
  demoHint: {
    marginTop: 16,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  demoHintText: {
    color: colors.accent,
    fontWeight: '700',
    fontSize: 13,
  },
  card: {
    marginTop: 20,
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
