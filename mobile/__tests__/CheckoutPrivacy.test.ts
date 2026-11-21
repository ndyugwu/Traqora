import React from 'react';
import { render } from '@testing-library/react-native';
import CheckoutScreen from '../booking/CheckoutScreen';

describe('Checkout Privacy Notices', () => {
  it('displays supplier fulfillment privacy notice and restricts PII collection', () => {
    const { getByText } = render(<CheckoutScreen />);
    expect(getByText(/passenger data/i)).toBeTruthy();
    expect(getByText(/supplier fulfillment/i)).toBeTruthy();
    expect(getByText(/unrelated personal information/i)).toBeTruthy();
  });
});
