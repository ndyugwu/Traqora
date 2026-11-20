import React from 'react';
import { render } from '@testing-library/react-native';
import { FareTermsReview } from '../../booking/fare-terms';

describe('FareTermsReview', () => {
  it('renders standard refundable fare terms correctly', () => {
    const { getByText } = render(
      <FareTermsReview
        fareClass="Economy Flexible"
        cancellationPolicy="Full refund up to 24 hours before departure."
        nonRefundable={false}
      />
    );

    expect(getByText('Economy Flexible')).toBeTruthy();
    expect(getByText('Full refund up to 24 hours before departure.')).toBeTruthy();
    expect(getByText('Refundable / Changeable per policy')).toBeTruthy();
  });

  it('renders non-refundable fare terms correctly', () => {
    const { getByText } = render(
      <FareTermsReview
        fareClass="Economy Basic"
        cancellationPolicy="No refunds or changes allowed."
        nonRefundable={true}
      />
    );

    expect(getByText('Economy Basic')).toBeTruthy();
    expect(getByText('No refunds or changes allowed.')).toBeTruthy();
    expect(getByText('Non-Refundable Fare')).toBeTruthy();
  });

  it('handles missing or empty fare class and cancellation policy gracefully (validation/failure path)', () => {
    const { getByText } = render(
      <FareTermsReview
        fareClass=""
        cancellationPolicy=""
        nonRefundable={false}
      />
    );

    expect(getByText('Fare & Cancellation Terms')).toBeTruthy();
    expect(getByText('Refundable / Changeable per policy')).toBeTruthy();
  });

  it('handles extremely long or malformed input text safely (failure resilience path)', () => {
    const malformedPolicy = 'A'.repeat(1000);
    const { getByText } = render(
      <FareTermsReview
        fareClass="Business Suite"
        cancellationPolicy={malformedPolicy}
        nonRefundable={true}
      />
    );

    expect(getByText('Business Suite')).toBeTruthy();
    expect(getByText(malformedPolicy)).toBeTruthy();
    expect(getByText('Non-Refundable Fare')).toBeTruthy();
  });
});
