# V1 Supported Payment Method and Asset Specification

## Overview
This document defines the single initial payment method, supported asset, network, and unsupported payment cases for Traqora v1 bookings.

## Supported Scope (v1)

### 1. Payment Method
- **Method:** Soroban Smart Contract Token Transfer / Escrow (`pay_for_booking` invoking SEP-41 token transfer).
- **Network:** Stellar Soroban (Testnet / Mainnet as configured per environment deployment).
- **Supported Asset:** USDC (or protocol designated Soroban token contract matching SEP-41 standard).

### 2. Normal Payment Flow
1. Traveler creates a booking via the `booking` / `flight_booking` contract (`create_booking`).
2. Traveler approves or invokes payment via `pay_for_booking`, which transfers the exact amount of the supported token asset from the traveler's address into the booking escrow contract.
3. The booking status transitions to paid/escrowed, enabling airline confirmation or refund automation.

### 3. Unsupported Payment Cases & Validation
- **Non-Supported Assets / Tokens:** Any token contract address other than the designated v1 supported asset contract is rejected by contract validation checks.
- **Insufficient Balance / Allowance:** Transfers fail if the traveler's account balance is less than the booking price or if token allowance is insufficient.
- **Direct Native XLM Payments:** Direct native lumen transfers without the Soroban SEP-41 token contract escrow wrapper are unsupported in v1.
- **Off-chain fiat / non-stellar payment rails:** Credit cards or off-chain payment intents (such as Stripe fiat integrations) are reconciled separately or mapped to on-chain settlement according to v1 architecture; direct non-crypto payment execution against smart contract escrow is unsupported.

## Security and Privacy
- All payment operations require explicit Soroban authorization (`env.mock_all_auths()` or direct traveler signature).
- Amounts and balances are validated using checked arithmetic to prevent overflow or underflow.
