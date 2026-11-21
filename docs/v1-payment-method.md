# V1 Supported Payment Method and Scope

## Overview
This document defines the single initial payment method, supported asset, network, and unsupported payment cases for Traqora v1.

## Supported v1 Payment Specifications
- **Payment Method:** Direct Soroban smart contract token transfer via payment escrow (`pay_for_booking`).
- **Supported Asset:** Native/Stellar Soroban Token Contract (e.g., USDC or platform token initialized via shared token fixtures/contracts).
- **Network:** Stellar network (Soroban testnet and mainnet).
- **Unsupported Payment Cases:** 
  - Off-chain fiat card payments directly inside smart contracts (fiat onboarding handled externally via Stripe, settled on-chain via token transfer).
  - Multi-asset basket swaps or non-whitelisted custom tokens during v1 checkout.
  - Direct peer-to-peer unescrowed transfers for flight bookings.
