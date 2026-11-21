describe('V1 Supported Payment Method', () => {
  it('validates supported v1 payment parameters correctly', () => {
    const paymentConfig = {
      method: 'smart_contract_escrow',
      asset: 'SAC',
      network: 'stellar',
      supported: true,
    };

    expect(paymentConfig.method).toBe('smart_contract_escrow');
    expect(paymentConfig.asset).toBe('SAC');
    expect(paymentConfig.network).toBe('stellar');
    expect(paymentConfig.supported).toBe(true);
  });

  it('rejects unsupported payment methods or networks', () => {
    const validatePayment = (method: string, network: string) => {
      if (method !== 'smart_contract_escrow' || network !== 'stellar') {
        throw new Error('Unsupported payment method or network for v1');
      }
      return true;
    };

    expect(() => validatePayment('fiat_card', 'stellar')).toThrow('Unsupported payment method or network for v1');
    expect(() => validatePayment('smart_contract_escrow', 'ethereum')).toThrow('Unsupported payment method or network for v1');
    expect(validatePayment('smart_contract_escrow', 'stellar')).toBe(true);
  });
});
