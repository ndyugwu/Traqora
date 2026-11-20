import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TermsAndCancellationReviewScreen from '../src/screens/TermsAndCancellationReviewScreen';
import CheckoutScreen from '../src/screens/CheckoutScreen';
import App from '../src/App';

describe('TermsAndCancellationReviewScreen and Checkout Integration', () => {
  it('renders fare and cancellation terms correctly', () => {
    const { getByText, getByAccessibilityLabel } = render(
      <TermsAndCancellationReviewScreen
        fareDetails={{
          fareBasis: 'Economy Flex',
          cancellationPolicy: 'Full refund up to 48 hours before departure.',
          baggageTerms: '2 checked bags included.',
          changeFee: 'None',
        }}
      />
    );

    expect(getByText('Fare & Cancellation Review')).toBeTruthy();
    expect(getByText('Economy Flex')).toBeTruthy();
    expect(getByText('Full refund up to 48 hours before departure.')).toBeTruthy();
    expect(getByAccessibilityLabel('Accept terms and proceed to payment authorization')).toBeTruthy();
  });

  it('handles acceptance of terms and invokes callback', () => {
    const onAcceptMock = jest.fn();
    const { getByAccessibilityLabel } = render(
      <TermsAndCancellationReviewScreen onAccept={onAcceptMock} />
    );

    const acceptButton = getByAccessibilityLabel('Accept terms and proceed to payment authorization');
    fireEvent.press(acceptButton);

    expect(onAcceptMock).toHaveBeenCalledTimes(1);
  });

  it('prevents payment authorization when terms are not accepted', () => {
    const onAuthorizeMock = jest.fn();
    const { getByAccessibilityLabel } = render(
      <CheckoutScreen acceptedTerms={false} onAuthorizePayment={onAuthorizeMock} />
    );

    const payButton = getByAccessibilityLabel('Authorize payment');
    fireEvent.press(payButton);

    expect(onAuthorizeMock).not.toHaveBeenCalled();
  });

  it('allows payment authorization when terms are accepted', () => {
    const onAuthorizeMock = jest.fn();
    const { getByAccessibilityLabel } = render(
      <CheckoutScreen acceptedTerms={true} onAuthorizePayment={onAuthorizeMock} />
    );

    const payButton = getByAccessibilityLabel('Authorize payment');
    fireEvent.press(payButton);

    expect(onAuthorizeMock).toHaveBeenCalledTimes(1);
  });

  it('navigates through the complete review and checkout flow in App container', () => {
    const { getByAccessibilityLabel, getByText } = render(<App />);

    expect(getByText('Checkout & Payment')).toBeTruthy();
    expect(getByText('Not Reviewed')).toBeTruthy();

    const reviewButton = getByAccessibilityLabel('Review fare and cancellation terms');
    fireEvent.press(reviewButton);

    expect(getByText('Fare & Cancellation Review')).toBeTruthy();

    const acceptButton = getByAccessibilityLabel('Accept terms and proceed to payment authorization');
    fireEvent.press(acceptButton);

    expect(getByText('Checkout & Payment')).toBeTruthy();
    expect(getByText('Reviewed & Accepted')).toBeTruthy();
  });
});
