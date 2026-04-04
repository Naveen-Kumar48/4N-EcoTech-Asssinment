import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ProviderCard from '../components/ProviderCard';
import ScreenShell from '../components/ScreenShell';
import { categories, providers } from '../data/providers';
import { useAuth } from '../context/AuthContext';
import { categoryColors, colors, radius, shadows, spacing } from '../theme';

export default function HomeScreen({ navigation }) {
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  function renderHeader() {
    return (
      <View>
        {/* Hero */}
        <View style={styles.heroCard}>
          <Text style={styles.greeting}>👋 Hi, {user?.name?.split(' ')[0] || 'there'}</Text>
          <Text style={styles.title}>Book trusted services near you</Text>
          <View style={styles.heroActions}>
            <Pressable
              onPress={() => navigation.navigate('Appointments')}
              style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            >
              <Text style={styles.primaryButtonText}>My Appointments</Text>
            </Pressable>
            <Pressable
              onPress={signOut}
              style={({ pressed }) => [styles.signOutButton, pressed && styles.pressed]}
            >
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </Pressable>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{providers.length}</Text>
            <Text style={styles.statLabel}>Providers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{categories.length - 1}</Text>
            <Text style={styles.statLabel}>Categories</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{providers.filter((p) => p.available).length}</Text>
            <Text style={styles.statLabel}>Available Now</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search providers or categories..."
            placeholderTextColor={colors.softText}
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Text style={styles.clearBtn}>✕</Text>
            </Pressable>
          )}
        </View>

        {/* Category chips — ScrollView avoids nested VirtualizedList warning */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {categories.map((item) => {
            const isActive = activeCategory === item;
            const catColor = categoryColors[item];
            return (
              <Pressable
                key={item}
                onPress={() => setActiveCategory(item)}
                style={({ pressed }) => [
                  styles.chip,
                  isActive && {
                    backgroundColor: catColor ? catColor.bg : colors.primary,
                    borderColor: catColor ? catColor.bg : colors.primary,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    isActive && { color: catColor ? catColor.text : '#fff', fontWeight: '800' },
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.resultsLabel}>
          {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
        </Text>
      </View>
    );
  }

  return (
    <ScreenShell>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No providers found</Text>
            <Text style={styles.emptyText}>Try a different search or category.</Text>
            <Pressable
              onPress={() => { setSearch(''); setActiveCategory('All'); }}
              style={({ pressed }) => [styles.resetBtn, pressed && styles.pressed]}
            >
              <Text style={styles.resetBtnText}>Reset Filters</Text>
            </Pressable>
          </View>
        }
        renderItem={({ item }) => (
          <ProviderCard
            provider={item}
            onPress={() => navigation.navigate('ProviderDetails', { providerId: item.id })}
          />
        )}
      />
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: 22,
    marginBottom: 16,
    ...shadows.raised,
  },
  greeting: {
    color: colors.accentSoft,
    fontWeight: '700',
    fontSize: 14,
  },
  title: {
    marginTop: 8,
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '900',
    color: '#F8FAFC',
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: colors.accent,
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: radius.lg,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  signOutButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  signOutButtonText: {
    color: '#F8FAFC',
    fontWeight: '700',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: colors.muted,
    marginTop: 2,
    fontWeight: '600',
  },
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    marginBottom: 14,
    ...shadows.card,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 15,
    color: colors.text,
  },
  clearBtn: {
    color: colors.softText,
    fontSize: 16,
    paddingLeft: 8,
  },
  chips: {
    paddingBottom: 14,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: {
    color: colors.muted,
    fontWeight: '600',
    fontSize: 13,
  },
  resultsLabel: {
    color: colors.softText,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 12,
  },
  emptyCard: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: radius.xl,
    padding: 28,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.card,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
  },
  emptyText: {
    color: colors.muted,
    marginTop: 6,
    textAlign: 'center',
  },
  resetBtn: {
    marginTop: 16,
    backgroundColor: colors.primary,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: radius.lg,
  },
  resetBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
});
