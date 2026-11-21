import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FinalTermsReviewScreen } from '../screens/FinalTermsReviewScreen';

describe('FinalTermsReviewScreen', () => {
  const defaultProps = {
    fareTerms: 'Non-refundable baseline fare with 1 free carry-on bag.',
    cancellationPolicy: 'Free cancellation within 24 hours of booking. 50% fee thereafter.',
    onAuthorizePayment: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fare terms and cancellation policy correctly', () => {
    const { getByTestId } = render(<FinalTermsReviewScreen {...defaultProps} />);

    expect(getByTestId('fare-terms-text').props.children).toBe(defaultProps.fareTerms);
    expect(getByTestId('cancellation-terms-text').props.children).toBe(defaultProps.cancellationPolicy);
  });

  it('triggers onAuthorizePayment when authorize button is pressed', () => {
    const { getByTestId } = render(<FinalTermsReviewScreen {...defaultProps} />);

    fireEvent.press(getByTestId('authorize-payment-btn'));
    expect(defaultProps.onAuthorizePayment).toHaveBeenCalledTimes(1);
  });

  it('triggers onCancel when cancel button is pressed', () => {
    const { getByTestId } = render(<FinalTermsReviewScreen {...defaultProps} />);

    fireEvent.press(getByTestId('cancel-review-btn'));
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
