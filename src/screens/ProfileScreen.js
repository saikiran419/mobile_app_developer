import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function ProfileScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let mounted = true;
    if (user) {
      api.get(`/users/${user.id}`).then(res => mounted && setProfile(res.data)).catch(() => {});
    }
    return () => (mounted = false);
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text>Email: {user?.email}</Text>
      {profile && <Text>Name: {profile.name || '—'}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, marginBottom: 12 } });
