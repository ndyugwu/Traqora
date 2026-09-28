# Rate-Limit Abuse Dashboard

## Overview
The Traqora rate-limit abuse dashboard monitors and aggregates rate limit violations across public, user, and premium tiers. It helps operators identify high-frequency scrapers, credential stuffers, and potential DDoS actors in real time.

## API Endpoints

### Get Rate Limit Abuse Metrics
- **URL:** `/api/v1/admin/security/rate-limits/metrics`
- **Method:** `GET`
- **Authentication:** Requires Admin API Key (`X-Admin-Api-Key` header or admin session).

#### Success Response (`200 OK`)
```json
{
  "success": true,
  "data": {
    "totalBlocked": 42,
    "topAbusers": [
      {
        "ip": "203.0.113.77",
        "endpoint": "/api/v1/flights/search",
        "tier": "public",
        "blockedCount": 15,
        "lastBlockedAt": "2026-03-30T12:34:56.789Z",
        "reason": "RATE_LIMIT_EXCEEDED"
      }
    ],
    "activeThrottlesCount": 3,
    "timestamp": "2026-03-30T12:35:00.000Z"
  }
}
```

#### Error Cases
- **`401 UNAUTHORIZED`**: Returned when the request lacks valid admin credentials.
- **`500 INTERNAL_SERVER_ERROR`**: Returned if an unexpected failure occurs while gathering metrics.

## Operator Runbook
1. Check `topAbusers` for outlier IP addresses exceeding expected request volumes.
2. Cross-reference offending IPs with security audit logs or upstream WAF blocks.
3. Adjust tier limits in configuration if legitimate users are affected.
