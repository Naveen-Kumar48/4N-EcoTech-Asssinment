import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';
const APPOINTMENTS_KEY = 'appointments';
const SESSION_KEY = 'session';
const SEEDED_KEY = 'demo_seeded';

async function readJson(key, fallback) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

// Seeds a demo account once so the pre-filled login credentials work immediately
export async function seedDemoUser() {
  const already = await AsyncStorage.getItem(SEEDED_KEY);
  if (already) return;
  const users = await readJson(USERS_KEY, []);
  const exists = users.find((u) => u.email === 'test@gmail.com');
  if (!exists) {
    await writeJson(USERS_KEY, [
      ...users,
      { id: 'demo', name: 'Test User', email: 'test@gmail.com', password: '123456' },
    ]);
  }
  await AsyncStorage.setItem(SEEDED_KEY, '1');
}

export async function getUsers() {
  return readJson(USERS_KEY, []);
}

export async function registerUser(user) {
  const users = await getUsers();
  await writeJson(USERS_KEY, [...users, user]);
  return user;
}

export async function loginUser(email, password) {
  const users = await getUsers();
  return (
    users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    ) || null
  );
}

export async function saveSession(user) {
  await writeJson(SESSION_KEY, user);
}

export async function getSession() {
  return readJson(SESSION_KEY, null);
}

export async function clearSession() {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function getAppointments() {
  return readJson(APPOINTMENTS_KEY, []);
}

export async function bookAppointment(appointment) {
  const appointments = await getAppointments();
  await writeJson(APPOINTMENTS_KEY, [...appointments, appointment]);
  return appointment;
}

export async function cancelAppointment(id) {
  const appointments = await getAppointments();
  await writeJson(
    APPOINTMENTS_KEY,
    appointments.filter((a) => a.id !== id)
  );
}

export async function hasConflictingAppointment({ date, slot, providerId }) {
  const appointments = await getAppointments();
  return appointments.some(
    (a) => a.date === date && a.slot === slot && a.providerId === providerId
  );
}
