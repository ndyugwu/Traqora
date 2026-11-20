import React from 'react';
import { render } from '@testing-library/react-native';
import { CheckoutPrivacyNotice } from '../screens/CheckoutScreen';

describe('CheckoutPrivacyNotice', () => {
  it('renders privacy notice with supplier fulfillment explanation', () => {
    const { getByTestId, getByText } = render(<CheckoutPrivacyNotice />);
    
    const noticeElement = getByTestId('checkout-privacy-notice');
    expect(noticeElement).toBeTruthy();
    
    expect(getByText('Passenger Data & Privacy Notice')).toBeTruthy();
    expect(getByText(/used strictly for supplier fulfillment/i)).toBeTruthy();
  });
});
