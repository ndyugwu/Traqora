import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface TermsAndCancellationReviewProps {
  fareTerms: string;
  cancellationPolicy: string;
  onAccept: () => void;
  onCancel: () => void;
  accepted: boolean;
}

export const TermsAndCancellationReview: React.FC<TermsAndCancellationReviewProps> = ({
  fareTerms,
  cancellationPolicy,
  onAccept,
  onCancel,
  accepted,
}) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Final Fare & Cancellation Review</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fare Terms</Text>
        <Text style={styles.sectionText}>{fareTerms}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cancellation & Refund Policy</Text>
        <Text style={styles.sectionText}>{cancellationPolicy}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.acceptButton, accepted && styles.acceptedButton]}
          onPress={onAccept}
          accessibilityRole="button"
          accessibilityLabel="Accept terms and authorize payment"
        >
          <Text style={styles.buttonText}>{accepted ? 'Terms Accepted' : 'Accept & Authorize Payment'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel="Cancel booking review"
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
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 10,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButton: {
    backgroundColor: '#007AFF',
  },
  acceptedButton: {
    backgroundColor: '#34C759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
