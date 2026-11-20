import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CheckoutScreen from '../../booking/checkout';
import PassengerDetailsScreen from '../../booking/passenger_details';

describe('Checkout Privacy Notices and Validation', () => {
  it('renders privacy notice on Checkout screen', () => {
    const { getByText } = render(<CheckoutScreen />);
    expect(getByText('Privacy & Data Usage Notice')).toBeTruthy();
    expect(
      getByText(
        /Passenger data collected during checkout is used strictly for supplier fulfillment and airline ticketing/i
      )
    ).toBeTruthy();
  });

  it('renders privacy notice and restricted fields on Passenger Details screen', () => {
    const { getByTestId, getByText } = render(<PassengerDetailsScreen />);
    expect(getByTestId('first-name-input')).toBeTruthy();
    expect(getByTestId('last-name-input')).toBeTruthy();
    expect(getByTestId('passenger-privacy-notice')).toBeTruthy();
    expect(
      getByText(
        /Notice: Passenger information is collected solely for supplier fulfillment/i
      )
    ).toBeTruthy();
  });

  it('shows validation error when passenger details are submitted empty', () => {
    const { getByTestId, queryByTestId } = render(<PassengerDetailsScreen />);
    const validateButton = getByTestId('validate-button');

    fireEvent.press(validateButton);

    const errorText = getByTestId('passenger-error');
    expect(errorText).toBeTruthy();
  });

  it('passes validation when passenger details are provided', () => {
    const { getByTestId, queryByTestId } = render(<PassengerDetailsScreen />);
    const firstNameInput = getByTestId('first-name-input');
    const lastNameInput = getByTestId('last-name-input');
    const validateButton = getByTestId('validate-button');

    fireEvent.changeText(firstNameInput, 'Jane');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.press(validateButton);

    expect(queryByTestId('passenger-error')).toBeNull();
  });
});
