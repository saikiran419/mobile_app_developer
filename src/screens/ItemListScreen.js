import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ItemListScreen({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        // load cache first
        const cached = await AsyncStorage.getItem('items_cache');
        if (cached && mounted) setItems(JSON.parse(cached));

        // fetch fresh data
        const res = await api.get('/items');
        if (mounted) {
          setItems(res.data);
          await AsyncStorage.setItem('items_cache', JSON.stringify(res.data));
        }
      } catch (e) {
        // ignore
      } finally {
        mounted && setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <View style={styles.center}><ActivityIndicator /></View>;

  return (
    <View style={styles.container}>
      <FlatList data={items} keyExtractor={i => String(i.id)} renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', { itemId: item.id })}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </TouchableOpacity>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 16, fontWeight: '600' },
  subtitle: { color: '#666', marginTop: 4 }
});
