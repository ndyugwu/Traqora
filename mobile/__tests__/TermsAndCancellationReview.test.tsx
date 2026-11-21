import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TermsAndCancellationReview } from '../booking/TermsAndCancellationReview';

describe('TermsAndCancellationReview', () => {
  const defaultProps = {
    fareTerms: 'Non-refundable fare, changes allowed with fee.',
    cancellationPolicy: 'Cancel up to 24 hours before departure for travel credit.',
    onAccept: jest.fn(),
    onCancel: jest.fn(),
    accepted: false,
  };

  it('renders fare terms and cancellation policy correctly', () => {
    const { getByText } = render(<TermsAndCancellationReview {...defaultProps} />);
    expect(getByText('Non-refundable fare, changes allowed with fee.')).toBeTruthy();
    expect(getByText('Cancel up to 24 hours before departure for travel credit.')).toBeTruthy();
  });

  it('triggers onAccept when accept button is pressed', () => {
    const onAccept = jest.fn();
    const { getByText } = render(<TermsAndCancellationReview {...defaultProps} onAccept={onAccept} />);
    
    fireEvent.press(getByText('Accept & Authorize Payment'));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it('triggers onCancel when cancel button is pressed', () => {
    const onCancel = jest.fn();
    const { getByText } = render(<TermsAndCancellationReview {...defaultProps} onCancel={onCancel} />);
    
    fireEvent.press(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('displays accepted state when accepted is true', () => {
    const { getByText } = render(<TermsAndCancellationReview {...defaultProps} accepted={true} />);
    expect(getByText('Terms Accepted')).toBeTruthy();
  });
});
