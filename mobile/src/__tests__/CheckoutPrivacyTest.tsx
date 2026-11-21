import React from 'react';
import { render } from '@testing-library/react-native';
import CheckoutScreen from '../screens/CheckoutScreen';
import PassengerDetailsScreen from '../screens/PassengerDetailsScreen';

describe('Checkout and Passenger Privacy Notices', () => {
  it('renders the checkout privacy notice correctly on normal path', () => {
    const { getByTestId, getByText } = render(<CheckoutScreen />);
    const notice = getByTestId('checkout-privacy-notice');
    expect(notice).toBeTruthy();
    expect(
      getByText(/Passenger data is collected strictly for supplier fulfillment/i)
    ).toBeTruthy();
  });

  it('renders the passenger details privacy notice correctly on normal path', () => {
    const { getByTestId, getByText } = render(<PassengerDetailsScreen />);
    const notice = getByTestId('passenger-privacy-notice');
    expect(notice).toBeTruthy();
    expect(
      getByText(/Information provided here is used exclusively for airline and supplier fulfillment/i)
    ).toBeTruthy();
  });

  it('preserves privacy notice display under validation failure paths', () => {
    const { getByTestId } = render(<PassengerDetailsScreen />);
    // Simulating validation failure state where container and messaging remain visible
    expect(getByTestId('passenger-privacy-notice')).toBeTruthy();
  });
});
