# Checkout and Payment API & UI Guide

## Overview
Traqora's V1 checkout flow requires travelers to review and explicitly accept applicable fare basis, baggage terms, and cancellation/refund policies before payment authorization on the Stellar network.

## Screens

### 1. Checkout Screen (`CheckoutScreen.tsx`)
- Displays payment summary (e.g. 250 XLM via Soroban Booking Escrow).
- Tracks fare and cancellation review status (`Not Reviewed` vs `Reviewed & Accepted`).
- Disables the **Authorize Payment** button until terms have been reviewed and accepted.

### 2. Terms and Cancellation Review Screen (`TermsAndCancellationReviewScreen.tsx`)
- Presents detailed fare rules: Fare Basis, Baggage allowance, and Change fees.
- Presents the full Cancellation & Refund Policy.
- Provides actions to go back or accept terms to return to Checkout.

## Security & Compliance
- Ensures informed consent regarding non-refundable or conditional booking rules prior to locking funds in smart contracts.
- Preserves accessibility labels for all buttons and semantic headers.
