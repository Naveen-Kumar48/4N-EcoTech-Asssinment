import { scale } from './utils/responsive';

export const colors = {
  background: '#F6EFE4',
  backgroundAlt: '#EDE3D2',
  surface: '#FFFDF8',
  surfaceElevated: '#FFFFFF',
  text: '#102133',
  muted: '#5D6B7A',
  softText: '#7A8694',
  primary: '#102133',
  primarySoft: '#D8E3EC',
  accent: '#C7782A',
  accentSoft: '#F6D7B2',
  border: '#E6D8C4',
  danger: '#B91C1C',
  dangerSoft: '#FEE2E2',
  success: '#0F766E',
  successSoft: '#CCFBF1',
};

export const categoryColors = {
  Salon:      { bg: '#FEF3C7', text: '#92400E' },
  Massage:    { bg: '#EDE9FE', text: '#5B21B6' },
  Cleaning:   { bg: '#DBEAFE', text: '#1E40AF' },
  Fitness:    { bg: '#DCFCE7', text: '#166534' },
  Dental:     { bg: '#E0F2FE', text: '#0369A1' },
  Beauty:     { bg: '#FCE7F3', text: '#9D174D' },
  Plumbing:   { bg: '#FEE2E2', text: '#991B1B' },
  Tutoring:   { bg: '#FEF9C3', text: '#854D0E' },
  Veterinary: { bg: '#F0FDF4', text: '#14532D' },
  Electrical: { bg: '#FFF7ED', text: '#9A3412' },
};

export const spacing = {
  xs: scale(6),
  sm: scale(10),
  md: scale(16),
  lg: scale(24),
  xl: scale(32),
};

export const radius = {
  sm: scale(12),
  md: scale(18),
  lg: scale(24),
  xl: scale(30),
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#102133',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4,
  },
  raised: {
    shadowColor: '#102133',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 18 },
    elevation: 7,
  },
};

export const theme = { colors, spacing, radius, shadows, categoryColors };
