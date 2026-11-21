import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { CheckoutPrivacyNotice } from '../../booking';

export default function CheckoutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Checkout & Passenger Details</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Required Passenger Information for Booking Fulfillment Only</Text>
        {/* Minimal necessary fields for supplier ticket issuance */}
      </View>
      <CheckoutPrivacyNotice />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#444',
  },
});
