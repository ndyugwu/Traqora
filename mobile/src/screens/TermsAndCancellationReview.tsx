import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface TermsAndCancellationReviewProps {
  fareTerms: string;
  cancellationPolicy: string;
  onAuthorizePayment: () => void;
  onCancel: () => void;
  isAuthorized?: boolean;
}

export const TermsAndCancellationReview: React.FC<TermsAndCancellationReviewProps> = ({
  fareTerms,
  cancellationPolicy,
  onAuthorizePayment,
  onCancel,
  isAuthorized = false,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Review Fare & Cancellation Terms</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fare Terms</Text>
        <Text style={styles.text}>{fareTerms}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cancellation Policy</Text>
        <Text style={styles.text}>{cancellationPolicy}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.primaryButton]}
          onPress={onAuthorizePayment}
          testID="authorize-payment-button"
        >
          <Text style={styles.primaryButtonText}>
            {isAuthorized ? 'Authorized' : 'Authorize Payment'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={onCancel}
          testID="cancel-review-button"
        >
          <Text style={styles.secondaryButtonText}>Back / Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#E5E5EA',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
