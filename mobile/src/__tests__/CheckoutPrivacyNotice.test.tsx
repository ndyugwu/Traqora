import React from 'react';
import { render } from '@testing-library/react-native';
import { CheckoutPrivacyNotice } from '../screens/CheckoutPrivacyNotice';

describe('CheckoutPrivacyNotice', () => {
  it('renders privacy notice correctly', () => {
    const { getByText, getByLabelText } = render(<CheckoutPrivacyNotice />);
    expect(getByLabelText('Checkout Privacy Notice')).toBeTruthy();
    expect(getByText('Privacy & Passenger Data Notice')).toBeTruthy();
    expect(getByText(/supplier fulfillment/)).toBeTruthy();
  });
});
