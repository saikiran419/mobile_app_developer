import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function DetailsScreen({ route, navigation }) {
  const { itemId } = route.params || {};
  return (
    <View style={styles.container}>
      <Header title="Details" />
      <Text style={styles.text}>Details for item: {itemId ?? 'N/A'}</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  text: { fontSize: 16, marginVertical: 12 },
});
