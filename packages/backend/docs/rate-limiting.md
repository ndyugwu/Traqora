# Traqora Backend Rate-Limiting & Abuse Protection

Traqora implements tiered rate limiting and abuse prevention middleware to protect search and transactional endpoints from distributed denial-of-service (DDoS) and brute-force attacks.

## Tiers and Limits
- **Public / Anonymous**: Stricter limits applied by IP address.
- **User / Authenticated**: Higher limits applied per authenticated user ID.
- **Premium / Partner**: Highest tier limits.

## Operator Controls
Operators can inspect real-time rate limit metrics, violations, and active blocks using the Admin API dashboard endpoints located under `/api/v1/admin/security/rate-limits/metrics`.

Refer to `docs/operations/rate-limit-dashboard.md` for complete API contract definitions, query parameters, and response schemas.
