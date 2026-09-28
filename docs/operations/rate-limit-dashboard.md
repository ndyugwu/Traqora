# Rate-Limit Abuse Dashboard Operator Guide

## Overview
The Rate-Limit Abuse Dashboard provides operators with real-time visibility into incoming traffic, throttling decisions, allowed requests, and blocked potential abuse across all API endpoints and tiered rate limits in Traqora.

## Endpoint Contract

### Get Rate-Limit Metrics
- **URL:** `/api/v1/admin/rate-metrics`
- **Method:** `GET`
- **Authentication:** Required (Admin API Key via `X-Admin-Api-Key` header or admin session token)

### Input Parameters
None (queries global in-memory rate-limit decision snapshot).

### Output Schema (Success - 200 OK)
```json
{
  "success": true,
  "data": {
    "totals": {
      "allowed": 1540,
      "blocked": 23
    },
    "items": [
      {
        "endpoint": "/api/v1/flights/search",
        "tier": "public",
        "allowed": 1200,
        "blocked": 15,
        "lastBlockedAt": "2026-03-30T12:45:00.000Z"
      }
    ],
    "generatedAt": "2026-03-30T13:00:00.000Z"
  }
}
```

### Error Cases
- **401 Unauthorized:** Missing or invalid admin API key.
- **500 Internal Server Error:** Unexpected failure retrieving metrics snapshot.

## Operator Instructions
1. Use this dashboard to monitor potential denial-of-service (DoS) or brute-force activities targeting search or booking endpoints.
2. Review high `blocked` counts per tier to determine if rate limit thresholds require adjustment.
3. Integrate with Prometheus/Grafana or SIEM tooling by scraping or polling this endpoint periodically.