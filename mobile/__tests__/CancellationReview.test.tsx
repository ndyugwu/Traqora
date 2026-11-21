import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CancellationReview } from '../booking/CancellationReview';

describe('CancellationReview Component', () => {
  it('renders fare terms and cancellation policy correctly', () => {
    const { getByText } = render(
      <CancellationReview
        fareTerms="Non-refundable fare, changes allowed with fee."
        cancellationPolicy="Free cancellation within 24 hours of booking."
        onAccept={() => {}}
        onDecline={() => {}}
      />
    );

    expect(getByText('Non-refundable fare, changes allowed with fee.')).toBeTruthy();
    expect(getByText('Free cancellation within 24 hours of booking.')).toBeTruthy();
  });

  it('triggers onAccept when accept button is pressed', () => {
    const onAccept = jest.fn();
    const { getByTestId } = render(
      <CancellationReview
        fareTerms="Standard fare"
        cancellationPolicy="Standard policy"
        onAccept={onAccept}
        onDecline={() => {}}
      />
    );

    fireEvent.press(getByTestId('accept-terms-button'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('triggers onDecline when decline button is pressed', () => {
    const onDecline = jest.fn();
    const { getByTestId } = render(
      <CancellationReview
        fareTerms="Standard fare"
        cancellationPolicy="Standard policy"
        onAccept={() => {}}
        onDecline={onDecline}
      />
    );

    fireEvent.press(getByTestId('decline-terms-button'));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});
