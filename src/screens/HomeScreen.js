import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Home" />
      <Text style={styles.text}>Welcome to the Assignment App</Text>
      <Button title="Go to Details" onPress={() => navigation.navigate('Details', { itemId: 42 })} />
      <View style={{ height: 12 }} />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 16 },
  text: { fontSize: 18, marginVertical: 12 },
});
