# V1 Supported Payment Method, Asset, and Network

## Overview
This document defines the single initial payment method, supported asset, network requirements, and unsupported payment cases for Traqora v1 bookings.

## Supported v1 Scope
- **Payment Method:** Soroban Smart Contract Escrow / Direct Token Transfer
- **Supported Asset:** USDC (USD Coin) issued on Stellar
- **Supported Network:** Stellar Network (Mainnet / Testnet via appropriate network passphrase and RPC endpoints)

## Unsupported Payment Cases (Explicitly Out of Scope for v1)
- Native XLM direct payments for flight booking settlement
- Fiat credit/debit card payments processed on-chain (Stripe is used strictly for fiat-to-crypto off-chain onboarding where applicable, but on-chain settlement strictly requires USDC via Soroban contracts)
- Non-Stellar blockchains (e.g., Ethereum, Solana, Bitcoin)
- Custom user-issued Stellar assets or non-USDC custom tokens for flight booking escrow

## Automated Validation & Testing
- Payment contract tests enforce that only the designated USDC token contract and valid payment amounts are accepted during `pay_for_booking`.
- Any attempt to pay with unsupported tokens or incorrect parameters fails validation as verified by integration and unit test suites.