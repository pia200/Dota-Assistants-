import React, { useState } from 'react';
import {
  View, Text, TextInput, ScrollView,
  Pressable, StyleSheet, StatusBar
} from 'react-native';

const heroes = [
  { name: 'Anti-Mage', role: 'Carry', attr: 'AGILITY', icon: '⚔️' },
  { name: 'Axe', role: 'Offlane', attr: 'STRENGTH', icon: '🪓' },
  { name: 'Invoker', role: 'Mid', attr: 'INTELLIGENCE', icon: '🔮' },
  { name: 'Lion', role: 'Support', attr: 'INTELLIGENCE', icon: '🦁' },
  { name: 'Phantom Assassin', role: 'Carry', attr: 'AGILITY', icon: '🗡️' },
  { name: 'Pudge', role: 'Offlane', attr: 'STRENGTH', icon: '🪝' },
  { name: 'Shadow Fiend', role: 'Mid', attr: 'AGILITY', icon: '🔥' },
  { name: 'Crystal Maiden', role: 'Support', attr: 'INTELLIGENCE', icon: '❄️' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<any>(null);

  const roles = ['All', 'Carry', 'Mid', 'Offlane', 'Support'];

  const filtered = heroes.filter(hero =>
    hero.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'All' || hero.role === filter)
  );

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={s.logo}>DOTA<Text style={s.red}> ASSISTANT</Text></Text>
        <Text style={s.subtitle}>YOUR PERSONAL DOTA 2 COMPANION</Text>

        <View style={s.banner}>
          <Text style={s.small}>WELCOME TO THE BATTLE</Text>
          <Text style={s.heading}>Master the game.</Text>
          <Text style={s.description}>
            Find heroes, explore strategies and improve your gameplay.
          </Text>
          <Text style={s.bannerIcon}>⚔️</Text>
        </View>

        {selected ? (
          <View>
            <Pressable onPress={() => setSelected(null)}>
              <Text style={s.back}>← BACK TO HEROES</Text>
            </Pressable>
            <View style={s.detail}>
              <Text style={s.heroIcon}>{selected.icon}</Text>
              <Text style={s.heroName}>{selected.name}</Text>
              <Text style={s.role}>{selected.role} • {selected.attr}</Text>
              <Text style={s.description}>
                Hero profile. Strategies, abilities and recommended items
                will be added in the next development stages.
              </Text>
            </View>
          </View>
        ) : (
          <>
            <Text style={s.section}>Hero database</Text>
            <Text style={s.muted}>Choose your hero</Text>

            <TextInput
              style={s.search}
              placeholder="Search heroes..."
              placeholderTextColor="#777"
              value={search}
              onChangeText={setSearch}
            />

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {roles.map(role => (
                <Pressable
                  key={role}
                  onPress={() => setFilter(role)}
                  style={[s.chip, filter === role && s.activeChip]}
                >
                  <Text style={s.chipText}>{role}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <View style={s.grid}>
              {filtered.map(hero => (
                <Pressable
                  key={hero.name}
                  style={s.card}
                  onPress={() => setSelected(hero)}
                >
                  <Text style={s.cardIcon}>{hero.icon}</Text>
                  <Text style={s.cardName}>{hero.name}</Text>
                  <Text style={s.cardRole}>{hero.role}</Text>
                </Pressable>
              ))}
            </View>

            {filtered.length === 0 && (
              <Text style={s.muted}>No heroes found.</Text>
            )}
          </>
        )}

        <Text style={s.footer}>DOTA ASSISTANT • VERSION 1.0</Text>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0e14', padding: 20 },
  logo: { color: '#fff', fontSize: 25, fontWeight: '900', marginTop: 45 },
  red: { color: '#e34b55' },
  subtitle: { color: '#737d8d', fontSize: 10, letterSpacing: 2, marginTop: 7 },
  banner: { backgroundColor: '#191f2b', padding: 22, borderRadius: 18, marginTop: 28 },
  small: { color: '#e34b55', fontSize: 11, fontWeight: 'bold' },
  heading: { color: '#fff', fontSize: 27, fontWeight: 'bold', marginTop: 12 },
  description: { color: '#9ba5b5', fontSize: 14, lineHeight: 22, marginTop: 10 },
  bannerIcon: { fontSize: 35, marginTop: 15 },
  section: { color: '#fff', fontSize: 23, fontWeight: 'bold', marginTop: 30 },
  muted: { color: '#8993a3', marginTop: 7, marginBottom: 15 },
  search: { backgroundColor: '#191f2b', color: '#fff', padding: 16, borderRadius: 12, marginVertical: 15 },
  chip: { padding: 11, paddingHorizontal: 16, backgroundColor: '#191f2b', borderRadius: 20, marginRight: 8 },
  activeChip: { backgroundColor: '#a93640' },
  chipText: { color: '#fff', fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 20 },
  card: { width: '48%', backgroundColor: '#191f2b', borderRadius: 15, padding: 16, marginBottom: 12, minHeight: 125 },
  cardIcon: { fontSize: 30 },
  cardName: { color: '#fff', fontWeight: 'bold', marginTop: 12 },
  cardRole: { color: '#8993a3', fontSize: 12, marginTop: 5 },
  back: { color: '#e34b55', marginTop: 25, fontWeight: 'bold' },
  detail: { backgroundColor: '#191f2b', padding: 25, borderRadius: 18, marginTop: 20 },
  heroIcon: { fontSize: 65, textAlign: 'center', margin: 20 },
  heroName: { color: '#fff', fontSize: 26, fontWeight: 'bold', textAlign: 'center' },
  role: { color: '#e34b55', textAlign: 'center', marginTop: 10 },
  footer: { color: '#596273', textAlign: 'center', fontSize: 10, marginVertical: 35 },
});