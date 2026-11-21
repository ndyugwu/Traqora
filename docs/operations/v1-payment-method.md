# V1 Supported Payment Method & Asset Scope

## Overview
This document defines the single initial payment method, supported asset, network, and unsupported payment cases for Traqora v1.

## 1. Supported Payment Method & Asset
- **Payment Method**: Direct on-chain Soroban Token transfer (escrow / booking contract settlement).
- **Supported Asset**: Native Stellar Lumens (XLM) or the designated platform stablecoin (USDC / token contract as configured per deployment), specifically initialized via the `token` smart contract crate.
- **Network**: Stellar Soroban (Testnet for v1 staging/testing, Mainnet for production deployment).

## 2. Unsupported Payment Cases (Out of Scope for v1)
- Direct credit card payments without crypto wrapping (Stripe integration is strictly for fiat-to-crypto off-ramp / intent onboarding where applicable, but on-chain settlement strictly uses supported Soroban tokens).
- Multi-asset cross-chain bridging (e.g., Ethereum ERC-20 tokens, Bitcoin, Solana) are unsupported in v1.
- Unverified custom Stellar issued assets lacking formal contract initialization or protocol allowlisting.

## 3. Security & Compliance
- All payments must adhere to the smart contract authorization requirements (`env.mock_all_auths()` in tests, explicit user signature in production).
- Replay protection and idempotency keys are enforced on all booking creation and payment intent flows.
