import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PassengerDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passenger Details</Text>
      <View style={styles.noticeContainer} testID="passenger-privacy-notice">
        <Text style={styles.noticeText}>
          Information provided here is used exclusively for airline and supplier fulfillment of your booking. No unrelated personal data is requested or stored.
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
