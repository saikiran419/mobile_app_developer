import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import api, { setApiBaseUrl } from '../services/api';
import Constants from 'expo-constants';

export default function DebugScreen() {
  const [output, setOutput] = useState('');

  const baseURL = api.defaults.baseURL || 'not-set';

  async function fetchItems() {
    setOutput('loading...');
    try {
      const res = await api.get('/items');
      setOutput(JSON.stringify(res.data, null, 2));
    } catch (e) {
      setOutput(String(e));
    }
  }

  function showInfo() {
    const info = {
      expoAppOwnership: Constants.appOwnership,
      manifestHost: (Constants.manifest && Constants.manifest.debuggerHost) || null,
      apiBaseURL: baseURL,
    };
    setOutput(JSON.stringify(info, null, 2));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Debug / API</Text>
      <Text style={styles.label}>Base URL:</Text>
      <Text style={styles.value}>{baseURL}</Text>

      <View style={{ height: 10 }} />
      <Button title="Show runtime info" onPress={showInfo} />
      <View style={{ height: 8 }} />
      <Button title="Fetch /items" onPress={fetchItems} />
      <View style={{ height: 16 }} />

      <Text style={styles.label}>Output</Text>
      <Text style={styles.output}>{output}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  label: { fontSize: 14, fontWeight: '600', marginTop: 8 },
  value: { fontSize: 13, color: '#333', marginBottom: 8 },
  output: { fontFamily: 'monospace', marginTop: 8, color: '#111' },
});
