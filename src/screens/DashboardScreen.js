import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome{user ? `, ${user.email}` : ''}</Text>
      <PrimaryButton title="Browse Items" onPress={() => navigation.navigate('Items')} style={{ marginTop: 12 }} />
      <PrimaryButton title="Profile" onPress={() => navigation.navigate('Profile')} style={{ marginTop: 12 }} />
      <PrimaryButton title="Debug / API" onPress={() => navigation.navigate('Debug')} style={{ marginTop: 12 }} />
      <PrimaryButton title="Logout" onPress={() => signOut()} style={{ marginTop: 12, backgroundColor: '#e74c3c' }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12 }
});
