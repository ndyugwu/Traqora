import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import CheckoutScreen from './screens/CheckoutScreen';
import TermsAndCancellationReviewScreen from './screens/TermsAndCancellationReviewScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Checkout' | 'TermsAndCancellationReview'>('Checkout');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const navigation = {
    navigate: (screen: string) => {
      if (screen === 'TermsAndCancellationReview') {
        setCurrentScreen('TermsAndCancellationReview');
      } else if (screen === 'Checkout') {
        setCurrentScreen('Checkout');
      }
    },
    goBack: () => {
      setCurrentScreen('Checkout');
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {currentScreen === 'Checkout' ? (
          <CheckoutScreen
            navigation={navigation}
            acceptedTerms={acceptedTerms}
          />
        ) : (
          <TermsAndCancellationReviewScreen
            navigation={navigation}
            onAccept={() => {
              setAcceptedTerms(true);
              setCurrentScreen('Checkout');
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
  },
});
