import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <View style={styles.noticeContainer} testID="checkout-privacy-notice">
        <Text style={styles.noticeText}>
          Passenger data is collected strictly for supplier fulfillment and ticket issuance. We do not collect unrelated personal information.
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  noticeContainer: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
    marginTop: 12,
  },
  noticeText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
  },
});
