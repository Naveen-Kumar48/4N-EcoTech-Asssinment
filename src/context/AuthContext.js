import React, { createContext, useContext, useEffect, useState } from 'react';
import { clearSession, getSession, getUsers, loginUser, registerUser, saveSession } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function bootstrap() {
      const storedUser = await getSession();
      if (active) {
        setUser(storedUser);
        setIsBootstrapping(false);
      }
    }

    bootstrap();

    return () => {
      active = false;
    };
  }, []);

  async function signIn(email, password) {
    setError('');
    const matchedUser = await loginUser(email.trim(), password);
    if (!matchedUser) {
      setError('Invalid email or password.');
      return { ok: false };
    }

    await saveSession(matchedUser);
    setUser(matchedUser);
    return { ok: true };
  }

  async function signUp({ name, email, password }) {
    setError('');
    const existingUsers = await getUsers();
    const duplicateUser = existingUsers.find((existing) => existing.email.toLowerCase() === email.trim().toLowerCase());
    if (duplicateUser) {
      setError('An account with that email already exists.');
      return { ok: false };
    }

    const nextUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    await registerUser(nextUser);
    await saveSession(nextUser);
    setUser(nextUser);
    return { ok: true };
  }

  async function signOut() {
    await clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, error, setError, signIn, signUp, signOut, isBootstrapping }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}