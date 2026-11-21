import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FinalTermsCancellationReview } from '../screens/FinalTermsCancellationReview';

describe('FinalTermsCancellationReview', () => {
  const defaultProps = {
    fareAmount: '500',
    currency: 'TRQ',
    cancellationPolicy: 'Free cancellation up to 24 hours before departure.',
    onAuthorizePayment: jest.fn(),
    onCancel: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders fare summary and cancellation policy correctly', () => {
    const { getByText } = render(<FinalTermsCancellationReview {...defaultProps} />);
    expect(getByText('Total: 500 TRQ')).toBeTruthy();
    expect(getByText('Free cancellation up to 24 hours before departure.')).toBeTruthy();
  });

  it('disables authorize payment button initially', () => {
    const { getByTestId } = render(<FinalTermsCancellationReview {...defaultProps} />);
    const authButton = getByTestId('authorize-payment-btn');
    expect(authButton.props.accessibilityState?.disabled ?? authButton.props.disabled).toBe(true);
  });

  it('enables authorize payment button when terms are accepted', () => {
    const { getByTestId } = render(<FinalTermsCancellationReview {...defaultProps} />);
    const checkbox = getByTestId('accept-terms-checkbox');
    fireEvent.press(checkbox);

    const authButton = getByTestId('authorize-payment-btn');
    expect(authButton.props.disabled).toBeFalsy();

    fireEvent.press(authButton);
    expect(defaultProps.onAuthorizePayment).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when back button is pressed', () => {
    const { getByTestId } = render(<FinalTermsCancellationReview {...defaultProps} />);
    const cancelButton = getByTestId('cancel-review-btn');
    fireEvent.press(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });
});
