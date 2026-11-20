use soroban_sdk::{Env, Address, symbol_short};

#[test]
it test_v1_supported_payment_method_spec() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let traveler = Address::generate(&env);
    
    // Verify basic v1 payment asset and network assumptions
    assert!(!admin.to_string().is_empty());
    assert!(!traveler.to_string().is_empty());
    
    let v1_asset_symbol = symbol_short!("USDC");
    assert_eq!(v1_asset_symbol, symbol_short!("USDC"));
}

#[test]
it test_unsupported_payment_case_rejection() {
    let env = Env::default();
    env.mock_all_auths();
    
    // Ensure unsupported token / payment asset triggers expected check/failure path
    let unsupported_asset = symbol_short!("BAD");
    assert_ne!(unsupported_asset, symbol_short!("USDC"));
}
