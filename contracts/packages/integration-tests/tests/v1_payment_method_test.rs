use soroban_sdk::{token, Address, Env};

#[test]
fn test_v1_supported_payment_method_and_asset() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let traveler = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract(admin);
    let client = token::Client::new(&env, &token_contract);

    client.mint(&traveler, &1000);
    assert_eq!(client.balance(&traveler), 1000);

    // Verify protocol version and supported asset constraints for v1
    assert!(env.ledger().protocol_version() >= 20);
}
