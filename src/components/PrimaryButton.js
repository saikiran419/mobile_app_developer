import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, style, disabled }) {
  return (
    <TouchableOpacity style={[styles.button, style, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#2f80ed', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center' },
  text: { color: '#fff', fontWeight: '600' },
  disabled: { opacity: 0.6 }
});
