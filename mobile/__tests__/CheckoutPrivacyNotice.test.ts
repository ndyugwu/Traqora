describe('Checkout Privacy Notice (V1)', () => {
  it('explains supplier fulfillment data usage and avoids collecting unrelated personal information', () => {
    const privacyNoticeText = 'Passenger data is used strictly for supplier fulfillment and ticket issuance. We do not collect unrelated personal information.';
    expect(privacyNoticeText).toContain('supplier fulfillment');
    expect(privacyNoticeText).toContain('unrelated personal information');
  });
});
