# Alerting Service

A flexible alerting service built with Node.js, TypeScript, and Express that supports multiple notification channels and trigger types.

## Features

- **Multiple Trigger Types**: Webhook-based and scheduled alerts
- **Multi-Channel Support**: Email, SMS, and Slack notifications
- **Template Engine**: Dynamic message templating with variable substitution
- **Rate Limiting**: Built-in API rate limiting for security
- **Authentication**: API key-based authentication
- **Scheduled Jobs**: Cron-based scheduling for recurring alerts
- **SQLite Database**: Lightweight persistent storage

## Tech Stack

- Node.js & TypeScript
- Express.js
- SQLite3 / Better-SQLite3
- Nodemailer (email delivery)
- Node-Cron (scheduled tasks)
- Express Rate Limit

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd alerting-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
API_KEY=your-secret-api-key
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Health Check
```
GET /health
```
Returns service health status.

### Create Alert
```
POST /alerts
Content-Type: application/json
x-api-key: your-secret-api-key

{
  "name": "Payment Failed Alert",
  "trigger": "webhook",
  "channels": ["email"],
  "message": "Payment failed for user {{username}}. Amount: {{amount}}",
  "recipients": {
    "email": ["admin@example.com"]
  }
}
```

### List All Alerts
```
GET /alerts
x-api-key: your-secret-api-key
```

### Trigger Alert
```
POST /trigger/:alertId
Content-Type: application/json
x-api-key: your-secret-api-key

{
  "username": "john_doe",
  "amount": "$99.99"
}
```

## Alert Configuration

### Trigger Types
- `webhook`: Triggered via API call
- `scheduled`: Triggered automatically based on cron schedule

### Channel Types
- `email`: Email notifications
- `sms`: SMS notifications (implementation required)
- `slack`: Slack notifications (implementation required)

### Message Templates
Use double curly braces for variable substitution:
```
"Hello {{name}}, your order {{orderId}} has been {{status}}."
```

### Scheduled Alerts
For scheduled alerts, include a cron expression:
```json
{
  "trigger": "scheduled",
  "schedule": "0 9 * * *"
}
```

## Project Structure

```
alerting-service/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server entry point
│   ├── db/
│   │   └── database.ts     # Database setup
│   ├── models/
│   │   └── alert.model.ts  # Alert type definitions
│   ├── routes/
│   │   ├── alerts.ts       # Alert CRUD endpoints
│   │   ├── trigger.ts      # Alert trigger endpoint
│   │   └── health.ts       # Health check endpoint
│   ├── services/
│   │   ├── alert.service.ts    # Alert business logic
│   │   └── email.service.ts    # Email delivery
│   ├── middleware/
│   │   ├── auth.ts         # API key authentication
│   │   └── rateLimit.ts    # Rate limiting
│   ├── cron/
│   │   └── scheduler.ts    # Scheduled job management
│   └── utils/
│       ├── validator.ts    # Input validation
│       └── template.ts     # Template rendering
├── .env                    # Environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── README.md              # This file
```

## Security

- API key authentication required for all endpoints (except health check)
- Rate limiting enabled to prevent abuse
- Environment variables for sensitive configuration
- Input validation on all endpoints

## Development

The project uses `ts-node-dev` for hot-reloading during development. Any changes to TypeScript files will automatically restart the server.


