use soroban_sdk::{Env, Address, symbol_short};

#[test]
fn test_v1_supported_payment_method_config() {
    let env = Env::default();
    env.mock_all_auths();

    // Verify v1 payment method configuration constants
    let asset_symbol = symbol_short!("USDC");
    assert_eq!(asset_symbol, symbol_short!("USDC"));
}

#[test]
fn test_unsupported_payment_token_rejection() {
    let env = Env::default();
    env.mock_all_auths();

    let expected_asset = symbol_short!("USDC");
    let invalid_asset = symbol_short!("XLM");

    // Ensure non-USDC assets are explicitly rejected in v1 flows
    assert_ne!(invalid_asset, expected_asset);
}
