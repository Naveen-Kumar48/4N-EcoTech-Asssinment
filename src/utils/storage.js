import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'users';
const APPOINTMENTS_KEY = 'appointments';
const SESSION_KEY = 'session';

async function readJson(key, fallback) {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

async function writeJson(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getUsers() {
  return readJson(USERS_KEY, []);
}

export async function registerUser(user) {
  const users = await getUsers();
  const nextUsers = [...users, user];
  await writeJson(USERS_KEY, nextUsers);
  return user;
}

export async function loginUser(email, password) {
  const users = await getUsers();
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password) || null;
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
  const nextAppointments = [...appointments, appointment];
  await writeJson(APPOINTMENTS_KEY, nextAppointments);
  return appointment;
}

export async function cancelAppointment(id) {
  const appointments = await getAppointments();
  const nextAppointments = appointments.filter((appointment) => appointment.id !== id);
  await writeJson(APPOINTMENTS_KEY, nextAppointments);
}

export async function hasConflictingAppointment({ date, slot, providerId }) {
  const appointments = await getAppointments();
  return appointments.some((appointment) => appointment.date === date && appointment.slot === slot && appointment.providerId === providerId);
}