import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

interface TermsAndCancellationReviewScreenProps {
  route?: { params?: { fareDetails?: any; onAccept?: () => void } };
  navigation?: { goBack: () => void; navigate: (screen: string, params?: any) => void };
  fareDetails?: any;
  onAccept?: () => void;
  onBack?: () => void;
}

export default function TermsAndCancellationReviewScreen({
  route,
  navigation,
  fareDetails,
  onAccept,
  onBack,
}: TermsAndCancellationReviewScreenProps) {
  const resolvedFare = fareDetails || route?.params?.fareDetails || {
    fareBasis: 'Economy Standard',
    cancellationPolicy: 'Refundable up to 24 hours before departure with a 10% fee.',
    baggageTerms: '1 carry-on and 1 personal item included.',
    changeFee: '50 XLM per change',
  };

  const handleAccept = () => {
    if (onAccept) {
      onAccept();
    } else if (navigation) {
      navigation.navigate('Checkout', { acceptedTerms: true, fareDetails: resolvedFare });
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation) {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerTitle} accessibilityRole="header">
        Fare & Cancellation Review
      </Text>
      <Text style={styles.subtitle}>
        Please review the applicable fare and cancellation terms before authorizing payment.
      </Text>

      <View style={styles.sectionCard} accessibilityRole="summary">
        <Text style={styles.sectionTitle}>Fare Rules</Text>
        <Text style={styles.label}>Fare Basis: <Text style={styles.value}>{resolvedFare.fareBasis}</Text></Text>
        <Text style={styles.label}>Baggage: <Text style={styles.value}>{resolvedFare.baggageTerms}</Text></Text>
        <Text style={styles.label}>Changes: <Text style={styles.value}>{resolvedFare.changeFee}</Text></Text>
      </View>

      <View style={styles.sectionCard} accessibilityRole="summary">
        <Text style={styles.sectionTitle}>Cancellation & Refund Policy</Text>
        <Text style={styles.value}>{resolvedFare.cancellationPolicy}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Back to passenger details"
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={handleAccept}
          accessibilityLabel="Accept terms and proceed to payment authorization"
          accessibilityRole="button"
        >
          <Text style={styles.acceptButtonText}>Accept & Authorize Payment</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
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
  sectionCard: {
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
  },
  acceptButton: {
    flex: 2,
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
