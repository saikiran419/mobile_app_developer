import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onLogin() {
    // simple mock login behaviour
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    Alert.alert('Logged in', `Welcome ${email}`);
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Header title="Login" />
      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="you@example.com" />
      <Text style={styles.label}>Password</Text>
      <TextInput secureTextEntry value={password} onChangeText={setPassword} style={styles.input} placeholder="password" />
      <View style={{ height: 12 }} />
      <Button title="Login" onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 }
});
