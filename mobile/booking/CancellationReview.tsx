import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

interface CancellationReviewProps {
  fareTerms: string;
  cancellationPolicy: string;
  onAccept: () => void;
  onDecline: () => void;
}

export const CancellationReview: React.FC<CancellationReviewProps> = ({
  fareTerms,
  cancellationPolicy,
  onAccept,
  onDecline,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Final Terms & Cancellation Review</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fare Terms</Text>
        <Text style={styles.sectionContent}>{fareTerms}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cancellation Policy</Text>
        <Text style={styles.sectionContent}>{cancellationPolicy}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.acceptButton} onPress={onAccept} testID="accept-terms-button">
          <Text style={styles.buttonText}>Accept & Authorize Payment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.declineButton} onPress={onDecline} testID="decline-terms-button">
          <Text style={styles.declineButtonText}>Decline</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  declineButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  declineButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
