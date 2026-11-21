import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TermsAndCancellationReview } from '../src/screens/TermsAndCancellationReview';

describe('TermsAndCancellationReview', () => {
  it('renders fare terms and cancellation policy correctly', () => {
    const { getByText } = render(
      <TermsAndCancellationReview
        fareTerms="Non-refundable basic economy ticket."
        cancellationPolicy="Cancellations within 24 hours receive a full refund."
        onAuthorizePayment={() => {}}
        onCancel={() => {}}
      />
    );

    expect(getByText('Non-refundable basic economy ticket.')).toBeTruthy();
    expect(getByText('Cancellations within 24 hours receive a full refund.')).toBeTruthy();
  });

  it('triggers onAuthorizePayment when authorize button is pressed', () => {
    const handleAuthorize = jest.fn();
    const { getByTestId } = render(
      <TermsAndCancellationReview
        fareTerms="Standard fare"
        cancellationPolicy="Standard policy"
        onAuthorizePayment={handleAuthorize}
        onCancel={() => {}}
      />
    );

    fireEvent.press(getByTestId('authorize-payment-button'));
    expect(handleAuthorize).toHaveBeenCalledTimes(1);
  });

  it('triggers onCancel when back button is pressed', () => {
    const handleCancel = jest.fn();
    const { getByTestId } = render(
      <TermsAndCancellationReview
        fareTerms="Standard fare"
        cancellationPolicy="Standard policy"
        onAuthorizePayment={() => {}}
        onCancel={handleCancel}
      />
    );

    fireEvent.press(getByTestId('cancel-review-button'));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});
