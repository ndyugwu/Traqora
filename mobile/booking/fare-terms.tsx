import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FareTermsProps {
  fareClass: string;
  cancellationPolicy: string;
  nonRefundable?: boolean;
}

export const FareTermsReview: React.FC<FareTermsProps> = ({
  fareClass,
  cancellationPolicy,
  nonRefundable = false,
}) => {
  return (
    <View style={styles.container} testID="fare-terms-review">
      <Text style={styles.title}>Fare & Cancellation Terms</Text>
      <Text style={styles.label}>Fare Class: <Text style={styles.value}>{fareClass}</Text></Text>
      <Text style={styles.label}>Policy: <Text style={styles.value}>{cancellationPolicy}</Text></Text>
      <Text style={[styles.status, nonRefundable ? styles.warning : styles.success]}>
        {nonRefundable ? 'Non-Refundable Fare' : 'Refundable / Changeable per policy'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  value: {
    fontWeight: '500',
  },
  status: {
    marginTop: 8,
    fontWeight: 'bold',
    fontSize: 13,
  },
  warning: {
    color: '#d9534f',
  },
  success: {
    color: '#5cb85c',
  },
});
