import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CheckoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout & Passenger Details</Text>
      <Text style={styles.notice}>
        Passenger data is collected strictly for supplier fulfillment (airline booking). We do not collect unrelated personal information.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  notice: { fontSize: 14, color: '#555' },
});
