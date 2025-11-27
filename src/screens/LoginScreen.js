import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  async function onLogin() {
    try {
      await signIn({ email, password });
    } catch (e) {
      Alert.alert('Login failed', e?.response?.data?.message || e.message);
    }
  }

  return (
    <View style={styles.container}>
      {/* <Header title="Login" /> */}
      <Text style={styles.label}>Email</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <Text style={styles.label}>Password</Text>
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <View style={{ height: 12 }} />
      <Button title="Login" onPress={onLogin} />
      <Button title="Sign up" onPress={() => navigation.navigate('Signup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  label: { marginTop: 12, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 6 }
});
