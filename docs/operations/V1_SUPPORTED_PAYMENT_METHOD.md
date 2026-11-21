# V1 Supported Payment Method and Scope

## Overview
This document defines the single initial payment method, supported asset, network, and unsupported payment cases for Traqora v1.

## Stated V1 Scope & Payment Specification

### 1. Supported Payment Method
- **Method:** Direct Soroban Smart Contract Escrow / Token Transfer (`pay_for_booking` via Soroban token interface).
- **Flow:** User creates a booking via the `booking` contract, then invokes payment execution to transfer tokens into the booking escrow contract securely.

### 2. Supported Asset
- **Asset:** Traqora v1 Standard Stablecoin Token (Soroban Token Contract deployed on Stellar).
- **Token Symbol / Identifier:** USDC equivalent / Protocol Stablecoin (`USDC` / designated Soroban token contract address).
- **Fungibility:** Standard SPL/Soroban token interface complying with SEP-41.

### 3. Supported Network
- **Network:** Stellar Network (Testnet for v1 staging/testing, Mainnet for production).
- **Network Passphrase:** 
  - Testnet: `Test SDF Network ; September 2015`
  - Mainnet: `Public Global Stellar Network ; September 2015`
- **RPC Provider:** Official Stellar Soroban RPC endpoints.

### 4. Unsupported Payment Cases (V1 Exclusions)
- **Fiat Credit/Debit Cards:** Direct fiat card charges (Stripe fiat rails) are out of scope for direct on-chain v1 smart contract settlement (fiat gateways are handled separately off-chain if applicable, but are not accepted natively inside smart contract escrow).
- **Alternative Cryptocurrencies / Non-Stellar Assets:** Native Bitcoin, Ethereum, or non-Stellar tokens are unsupported in v1.
- **Unapproved Tokens:** Any custom or unwhitelisted Soroban token contract address attempting to interact with the booking contract will be rejected by contract validation checks.
- **Direct Peer-to-Peer Transfers Without Contract Binding:** Direct wallet-to-wallet transfers to airlines without referencing a valid booking ID and escrow contract are unsupported and will not trigger automated booking confirmation or receipt issuance.

## Validation & Security
- All payments require valid Soroban authorization (`env.mock_all_auths()` in tests, Freighter/Albedo signatures in production).
- Balance checks and allowance verifications are enforced on-chain prior to transfer execution.
