# V1 Supported Payment Method & Network Scope

## Overview
This document defines the single initial payment method, supported asset, network parameters, and unsupported payment cases for Traqora v1 bookings and wallet interactions.

## 1. Supported Payment Method & Asset
- **Payment Method**: Direct Soroban smart contract token transfer / escrow (`pay_for_booking`).
- **Supported Asset**: USDC (USD Coin) issued on the Stellar network.
- **Asset Decimals**: 7 decimals (standard Soroban token representation).

## 2. Network Scope
- **Network**: Stellar (Soroban smart contracts).
- **v1 Networks**: 
  - Testnet (`Test SDF Network ; September 2015`)
  - Mainnet (`Public Global Stellar Network ; September 2015`)
- **RPC Endpoints**: Official Stellar / Soroban RPC endpoints.

## 3. Unsupported Payment Cases (v1 Scope)
To maintain safety and scope adherence in v1, the following are explicitly unsupported:
- Native Stellar Lumens (XLM) for direct flight booking payments (USDC token escrow is required).
- Credit/debit card native cryptocurrency on-ramps inside smart contract escrow (Stripe is used strictly for fiat booking intents where applicable, separate from on-chain escrow settlements).
- Cross-chain bridged tokens (e.g., Ethereum or Solana USDC) without official Stellar network canonical asset issuance.
- Privacy-preserving or zero-knowledge payment routing layers.

## 4. Security & Compliance
- All on-chain transfers require explicit Soroban authorization (`env.mock_all_auths()` in testing or wallet signature approvals in production).
- Anti-phishing guidelines (`docs/security/wallet-phishing.md`) apply to all client wallet prompts.
