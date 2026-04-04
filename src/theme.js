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
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
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

export const theme = { colors, spacing, radius, shadows };