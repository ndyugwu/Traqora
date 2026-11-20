import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

interface CheckoutScreenProps {
  route?: { params?: { acceptedTerms?: boolean; fareDetails?: any } };
  navigation?: { navigate: (screen: string, params?: any) => void };
  acceptedTerms?: boolean;
  onAuthorizePayment?: () => void;
  onReviewTerms?: () => void;
}

export default function CheckoutScreen({
  route,
  navigation,
  acceptedTerms: propAccepted,
  onAuthorizePayment,
  onReviewTerms,
}: CheckoutScreenProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const accepted = propAccepted !== undefined ? propAccepted : (route?.params?.acceptedTerms || false);

  const handleProceedToReview = () => {
    if (onReviewTerms) {
      onReviewTerms();
    } else if (navigation) {
      navigation.navigate('TermsAndCancellationReview');
    }
  };

  const handleAuthorize = () => {
    if (!accepted) {
      Alert.alert('Terms Required', 'Please review and accept the fare and cancellation terms before authorizing payment.');
      return;
    }
    setIsAuthorized(true);
    if (onAuthorizePayment) {
      onAuthorizePayment();
    } else {
      Alert.alert('Success', 'Payment authorized successfully on Stellar network.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle} accessibilityRole="header">
        Checkout & Payment
      </Text>
      <Text style={styles.subtitle}>
        Review your booking payment and finalize authorization.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Fare & Terms Status</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Cancellation & Fare Terms:</Text>
          <Text style={[styles.statusText, accepted ? styles.accepted : styles.pending]}>
            {accepted ? 'Reviewed & Accepted' : 'Not Reviewed'}
          </Text>
        </View>

        {!accepted ? (
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={handleProceedToReview}
            accessibilityLabel="Review fare and cancellation terms"
            accessibilityRole="button"
          >
            <Text style={styles.reviewButtonText}>Review Terms & Cancellation Policy</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleProceedToReview}
            accessibilityLabel="View fare and cancellation terms"
            accessibilityRole="button"
          >
            <Text style={styles.editButtonText}>View / Re-check Terms</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Payment Summary</Text>
        <Text style={styles.label}>Total Amount: <Text style={styles.value}>250 XLM</Text></Text>
        <Text style={styles.label}>Escrow Contract: <Text style={styles.value}>Soroban Booking Escrow</Text></Text>
      </View>

      <TouchableOpacity
        style={[styles.payButton, (!accepted || isAuthorized) && styles.disabledButton]}
        onPress={handleAuthorize}
        disabled={!accepted || isAuthorized}
        accessibilityLabel="Authorize payment"
        accessibilityRole="button"
      >
        <Text style={styles.payButtonText}>
          {isAuthorized ? 'Payment Authorized' : 'Authorize Payment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 6,
  },
  value: {
    fontSize: 14,
    color: '#334155',
    fontWeight: '500',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  accepted: {
    color: '#16a34a',
  },
  pending: {
    color: '#dc2626',
  },
  reviewButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  reviewButtonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  editButtonText: {
    color: '#475569',
    fontWeight: '600',
    fontSize: 14,
  },
  payButton: {
    backgroundColor: '#16a34a',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  payButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
