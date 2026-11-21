import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface FinalTermsReviewProps {
  fareTerms: string;
  cancellationPolicy: string;
  onAuthorizePayment: () => void;
  onCancel: () => void;
}

export const FinalTermsReviewScreen: React.FC<FinalTermsReviewProps> = ({
  fareTerms,
  cancellationPolicy,
  onAuthorizePayment,
  onCancel,
}) => {
  return (
    <ScrollView style={styles.container} testID="final-terms-container">
      <Text style={styles.header}>Review Fare & Cancellation Terms</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fare Terms</Text>
        <Text style={styles.sectionBody} testID="fare-terms-text">{fareTerms}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cancellation Policy</Text>
        <Text style={styles.sectionBody} testID="cancellation-terms-text">{cancellationPolicy}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.authorizeButton}
          onPress={onAuthorizePayment}
          testID="authorize-payment-btn"
        >
          <Text style={styles.buttonText}>Authorize Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={onCancel}
          testID="cancel-review-btn"
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
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
  sectionBody: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 40,
  },
  authorizeButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
  },
});
