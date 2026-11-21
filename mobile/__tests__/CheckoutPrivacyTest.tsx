import React from 'react';
import { render } from '@testing-library/react-native';
import CheckoutScreen from '../src/screens/CheckoutScreen';
import { CheckoutPrivacyNotice } from '../booking';

describe('Checkout Privacy Notices', () => {
  it('renders the checkout privacy notice correctly on the normal path', () => {
    const { getByTestId, getByText } = render(<CheckoutPrivacyNotice />);
    
    const noticeElement = getByTestId('checkout-privacy-notice');
    expect(noticeElement).toBeTruthy();
    
    expect(getByText('Privacy & Supplier Fulfillment')).toBeTruthy();
    expect(getByText(/Passenger data.*collected strictly for flight booking and supplier fulfillment/)).toBeTruthy();
  });

  it('integrates the privacy notice into the checkout screen without unrelated data collection fields', () => {
    const { getByTestId, queryByText } = render(<CheckoutScreen />);
    
    const noticeElement = getByTestId('checkout-privacy-notice');
    expect(noticeElement).toBeTruthy();

    // Verify unrelated personal data fields are not collected
    expect(queryByText(/social security/i)).toBeNull();
    expect(queryByText(/credit score/i)).toBeNull();
  });
});
