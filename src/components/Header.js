import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { width: '100%', paddingVertical: 12, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' },
  title: { fontSize: 20, fontWeight: '600' }
});
