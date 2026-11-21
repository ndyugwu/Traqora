import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface FinalTermsProps {
  fareAmount: string;
  currency: string;
  cancellationPolicy: string;
  onAuthorizePayment: () => void;
  onCancel: () => void;
}

export const FinalTermsCancellationReview: React.FC<FinalTermsProps> = ({
  fareAmount,
  currency,
  cancellationPolicy,
  onAuthorizePayment,
  onCancel,
}) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Review Fare & Cancellation Terms</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fare Summary</Text>
        <Text style={styles.text}>Total: {fareAmount} {currency}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cancellation & Refund Policy</Text>
        <Text style={styles.text}>{cancellationPolicy}</Text>
      </View>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAccepted(!accepted)}
        testID="accept-terms-checkbox"
      >
        <Text style={styles.checkbox}>{accepted ? '[x]' : '[ ]'}</Text>
        <Text style={styles.checkboxLabel}>I accept the final terms and cancellation policy</Text>
      </TouchableOpacity>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.authButton, !accepted && styles.disabledButton]}
          disabled={!accepted}
          onPress={onAuthorizePayment}
          testID="authorize-payment-btn"
        >
          <Text style={styles.buttonText}>Authorize Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          testID="cancel-review-btn"
        >
          <Text style={styles.cancelButtonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  section: { marginBottom: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 8 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  text: { fontSize: 14, color: '#333' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { fontSize: 18, marginRight: 10, fontWeight: 'bold' },
  checkboxLabel: { fontSize: 14, color: '#333' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, padding: 15, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
  authButton: { backgroundColor: '#007AFF' },
  disabledButton: { backgroundColor: '#cccccc' },
  cancelButton: { backgroundColor: '#e9ecef' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  cancelButtonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
});
