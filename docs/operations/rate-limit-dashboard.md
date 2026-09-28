# Rate-Limit Abuse Dashboard Operator Guide

Traqora provides a built-in rate-limit abuse monitoring dashboard to track, inspect, and reset rate-limiting decisions, throttles, and blocking violations across public and authenticated tiers.

## Endpoints

All administrative rate-limit endpoints require the `X-Admin-Api-Key` header.

### 1. Get Rate Limit Metrics and Abuse Summary
- **URL**: `GET /api/v1/admin/security/rate-limits/metrics`
- **Headers**: `X-Admin-Api-Key: <admin-key>`
- **Query Parameters (Optional)**:
  - `tier`: Filter snapshot by tier (e.g., `public`, `user`, `premium`)
  - `limit`: Maximum number of snapshot items to return
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "totals": { "allowed": 150, "blocked": 5 },
    "snapshot": [
      {
        "endpoint": "/api/v1/flights/search",
        "tier": "public",
        "allowed": 100,
        "blocked": 2,
        "lastBlockedAt": "2026-03-30T12:00:00.000Z"
      }
    ],
    "abuseSummary": {
      "totalViolations": 1,
      "recentEvents": [
        {
          "tier": "public",
          "endpoint": "/api/v1/flights/search",
          "clientIp": "203.0.113.50",
          "action": "block",
          "timestamp": "2026-03-30T12:00:00.000Z"
        }
      ]
    }
  }
}
```
- **Error Cases**:
  - `401 Unauthorized`: Missing or invalid `X-Admin-Api-Key`.
  - `400 Validation Error`: Invalid query parameters (e.g., non-numeric `limit`).
  - `500 Internal Server Error`: Unexpected failure retrieving metrics.

### 2. Reset Rate Limit Abuse Metrics
- **URL**: `POST /api/v1/admin/security/rate-limits/reset`
- **Headers**: `X-Admin-Api-Key: <admin-key>`
- **Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Rate limit abuse metrics reset successfully"
}
```

## Monitoring & Prometheus Metrics
In addition to the JSON dashboard API, rate-limit violations are exported via Prometheus:
- `traqora_rate_limit_violations_total{tier, endpoint, client_ip, action}`
- `traqora_rate_limit_block_duration_seconds{tier}`
- `traqora_rate_limit_active_blocks{tier}`
