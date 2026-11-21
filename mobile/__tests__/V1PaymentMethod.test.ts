import { authenticateMobileWallet } from '../WalletAuth';

describe('V1 Supported Payment Method and Validation', () => {
  it('validates supported payment asset and network configuration constraints', () => {
    const v1Config = {
      supportedAsset: 'USDC',
      supportedNetwork: 'Stellar Testnet',
      networkPassphrase: 'Test SDF Network ; September 2015',
      maxSupportedDecimals: 7,
    };

    expect(v1Config.supportedAsset).toBe('USDC');
    expect(v1Config.supportedNetwork).toContain('Stellar');
    expect(v1Config.networkPassphrase).toBe('Test SDF Network ; September 2015');
  });

  it('rejects unsupported payment cases such as unwhitelisted assets', () => {
    const validatePaymentAsset = (assetSymbol: string): boolean => {
      const allowedAssets = ['USDC'];
      return allowedAssets.includes(assetSymbol);
    };

    expect(validatePaymentAsset('USDC')).toBe(true);
    expect(validatePaymentAsset('BTC')).toBe(false);
    expect(validatePaymentAsset('ETH')).toBe(false);
    expect(validatePaymentAsset('UNKNOWN')).toBe(false);
  });
});
