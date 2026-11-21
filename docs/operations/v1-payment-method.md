# V1 Supported Payment Method and Scope

## Overview
This document defines the single initial payment method, supported asset, network, and unsupported payment cases for Traqora v1.

## Supported v1 Payment Scope
- **Payment Method:** Direct smart contract token escrow transfer (`pay_for_booking` invoking token `transfer`).
- **Supported Asset:** Soroban Stellar Asset Contract (SAC) representing the canonical stablecoin / native token initialized for v1 booking contracts.
- **Supported Network:** Stellar Testnet and Mainnet via Soroban smart contracts (Protocol version 22+).

## Unsupported Payment Cases (Out of Scope for v1)
- Off-chain credit card or fiat gateway direct payments without on-chain settlement/escrow binding.
- Multi-asset arbitrary token swaps during booking checkout.
- Non-Soroban blockchain networks or alternative L1/L2 chains.
- Unauthenticated or direct transfers without valid booking ID state mapping.

## Validation & Failure Paths
- Insufficient token allowance or balance results in transaction revert with standard Soroban token error.
- Mismatched booking status or already paid/cancelled bookings reject subsequent payment attempts.
