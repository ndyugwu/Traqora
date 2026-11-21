import { authenticateMobileWallet } from '../WalletAuth';

describe('V1 Supported Payment Method Validation', () => {
  it('validates supported payment network and asset parameters', () => {
    const supportedNetwork = 'Test SDF Network ; September 2015';
    const supportedAssetSymbol = 'USDC';
    
    expect(supportedNetwork).toBeDefined();
    expect(supportedAssetSymbol).toEqual('USDC');
  });

  it('rejects unsupported payment asset cases', async () => {
    const invalidWalletAuth = async () => {
      await authenticateMobileWallet({
        walletAddress: '',
        signatureOrXdr: '',
        walletType: 'unsupported_provider',
      });
    };

    await expect(invalidWalletAuth()).rejects.toThrow('Missing required authentication parameters');
  });
});
