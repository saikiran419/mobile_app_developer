import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import api from '../services/api';

export default function ItemDetailsScreen({ route }) {
  const { itemId } = route.params || {};
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api.get(`/items/${itemId}`).then(res => mounted && setItem(res.data)).catch(() => {}).finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [itemId]);

  if (loading) return <View style={styles.center}><ActivityIndicator /></View>;
  if (!item) return <View style={styles.center}><Text>Item not found</Text></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.subtitle}</Text>
      <Text style={styles.details}>{item.details}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: '700' },
  subtitle: { color: '#666', marginTop: 8 },
  details: { marginTop: 12 }
});
