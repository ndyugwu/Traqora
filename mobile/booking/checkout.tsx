import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.privacyNoticeContainer}>
        <Text style={styles.privacyTitle}>Privacy & Data Usage Notice</Text>
        <Text style={styles.privacyText}>
          Passenger data collected during checkout is used strictly for supplier fulfillment and airline ticketing. We do not collect unrelated personal information.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  privacyNoticeContainer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  privacyTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#333',
  },
  privacyText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
});
