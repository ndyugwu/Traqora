import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CheckoutPrivacyNotice: React.FC = () => {
  return (
    <View style={styles.container} testID="checkout-privacy-notice">
      <Text style={styles.title}>Passenger Data & Privacy Notice</Text>
      <Text style={styles.text}>
        Passenger data collected during checkout (such as name, contact, and passport details) is used strictly for supplier fulfillment (airline ticketing and reservation verification). We do not collect unrelated personal information.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#343a40',
  },
  text: {
    fontSize: 12,
    color: '#6c757d',
    lineHeight: 18,
  },
});
