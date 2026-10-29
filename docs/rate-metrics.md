# Rate-Limit Abuse Dashboard

## Overview
The Rate-Limit Abuse Dashboard provides administrators with visibility into API rate limiting, allowed requests, and blocked potential abuse metrics.

## Contract
### `GET /api/v1/admin/rate-metrics`

Requires admin authentication via header `x-admin-key` or standard admin middleware credentials.

#### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "endpoint": "/api/v1/flights/search",
        "tier": "public",
        "allowedCount": 10,
        "blockedCount": 2,
        "lastBlockedTimestamp": "2023-10-27T10:00:00.000Z"
      }
    ],
    "timestamp": "2023-10-27T10:05:00.000Z"
  }
}
```

#### Error Cases
- **401 Unauthorized**: Missing or invalid admin credentials.
- **500 Internal Server Error**: Failure retrieving underlying metrics (e.g., Prometheus store error).
