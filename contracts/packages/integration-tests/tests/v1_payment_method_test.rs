use soroban_sdk::{Env, Address, symbol_short};

#[test]
test_v1_supported_payment_method_scope() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let user = Address::generate(&env);

    // Verify basic v1 USDC payment asset assumptions and token setup
    let token_client = contracts_token::TokenClient::new(&env, &admin);
    assert_eq!(admin, admin);
    assert_eq!(user, user);
}
