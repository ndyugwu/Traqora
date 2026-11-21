import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function CheckoutPrivacyNotice() {
  return (
    <View style={styles.container} accessibilityRole="summary" testID="checkout-privacy-notice">
      <Text style={styles.title}>Privacy & Supplier Fulfillment</Text>
      <Text style={styles.text}>
        Passenger data (such as full name and contact details) is collected strictly for flight booking and supplier fulfillment. We do not collect unrelated personal information.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  text: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
});
