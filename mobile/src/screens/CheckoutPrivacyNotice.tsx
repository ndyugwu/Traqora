import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface CheckoutPrivacyNoticeProps {
  onAccept?: () => void;
}

export const CheckoutPrivacyNotice: React.FC<CheckoutPrivacyNoticeProps> = () => {
  return (
    <View style={styles.container} accessible={true} accessibilityLabel="Checkout Privacy Notice">
      <Text style={styles.title}>Privacy & Passenger Data Notice</Text>
      <Text style={styles.body}>
        Passenger data collected during checkout is used solely for supplier fulfillment (such as airline ticketing and reservations). We do not collect unrelated personal information.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  body: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
