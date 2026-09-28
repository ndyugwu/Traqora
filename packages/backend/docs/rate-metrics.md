# Rate-Limit Abuse Dashboard & Metrics

## Overview
The Traqora rate metrics collector tracks request volume, tier distribution, and block events across API routes to detect potential DDoS or rate-limit abuse in real-time.

## Endpoints

### `GET /api/v1/admin/rate-metrics`
Returns aggregated rate-limit statistics, top abusing IP addresses, and recent request/block records.

- **Authentication**: Required (`X-Admin-Api-Key` header or admin bearer token)
- **Inputs**: Optional query parameters for limiting recent records.
- **Outputs**:
  ```json
  {
    "success": true,
    "data": {
      "totalHits": 150,
      "totalBlocked": 12,
      "topAbuseIps": [
        { "ip": "192.168.1.100", "count": 25 }
      ],
      "recentRecords": []
    }
  }
  ```
- **Error Cases**:
  - `401 Unauthorized`: Missing or invalid admin API key.
  - `500 Internal Server Error`: Unexpected failure during metrics aggregation.

## Operator Usage
Operators can monitor rate-limit metrics directly from the Admin Security and Audit Logs dashboard in the Traqora client application.
