# 🔗 KonnectImpact — Backend Ledger Service

A Cloudflare Worker written in TypeScript that handles device credit invites and redemptions. Built using Wrangler v3 and KV Storage, with full Jest test coverage and linting.

---

## 🌍 Staging URL

Live deployment:  
👉 [https://candidate-27-konnectimpact-compute-service.candidate-27.workers.dev](https://candidate-27-konnectimpact-compute-service.candidate-27.workers.dev)

---

## 📁 API Endpoints

| Method | Endpoint               | Description                                 |
|--------|------------------------|---------------------------------------------|
| POST   | `/invite`              | Generate a 7-day invite token for device    |
| POST   | `/redeem`              | Redeem token, credit device +100            |
| GET    | `/wallet?deviceId=...` | Get wallet balance for device               |
| POST   | `/raffle/update`       | Placeholder endpoint for Stripe webhook     |

---

## ⚙️ Stack

- TypeScript 5
- Cloudflare Workers
- Wrangler v3
- KV Storage
- Jest for unit testing
- Prettier / ESLint for formatting and linting

---

## 🚀 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/MahekRohitGor/candidate-27-konnectimpact-compute-service
cd candidate-27-konnectimpact-compute-service
npm install
```
### Create KV Namespace
```bash
wrangler kv:namespace create "INVITES"
```

Then open wrangler.jsonc and add:
```bash
{
  "kv_namespaces": [
    {
      "binding": "INVITES",
      "id": "your-namespace-id"
    }
  ]
}
```

Replace your-namespace-id with the actual value from the previous command.

## Running Locally
```bash
wrangler dev
```
Visit: http://127.0.0.1:8787

## Deploying to Cloudflare
``` bash
wrangler deploy
```

Example Usage
POST /invite

```bash
curl -X POST https://candidate-27-konnectimpact-compute-service.candidate-27.workers.dev/invite \
  -H "Content-Type: application/json" \
  -d "{\"deviceId\":\"device123\"}"
```

Response
```
{ "token": "uuid-token" }
```

POST /redeem
```bash
curl -X POST https://candidate-27-konnectimpact-compute-service.candidate-27.workers.dev/redeem \
  -H "Content-Type: application/json" \
  -d "{\"deviceId\":\"device123\", \"token\":\"uuid-token\"}"
```

GET /wallet?deviceId=device123
```bash
curl "https://candidate-27-konnectimpact-compute-service.candidate-27.workers.dev/wallet?deviceId=device123"
```

POST /raffle/update
```bash
curl -X POST https://candidate-27-konnectimpact-compute-service.candidate-27.workers.dev/raffle/update
```

Response
Raffle webhook received

## Unit Test
```bash
npm test
```

## Project Structure
```bash
src/
├── handlers/
│   ├── invite.ts
│   ├── redeem.ts
│   ├── wallet.ts
│   └── raffle.ts
├── __tests__/
│   └── wallet.test.ts
├── index.ts
└── types/
    └── env.ts
```

## Screenshots
Screenshots are placed inside the screenshots/ folder.

## Submission Checklist
GitHub Repo: candidate-27-konnectimpact-compute-service
Live URL on .workers.dev
Wrangler v3, TypeScript 5, KV setup
Unit tests using Jest
README with setup + API usage
2 Screenshots: idle + running

Author
Mahek Gor
[KonnectImpact Cloudflare Worker Module Submission]


---

Let me know if you'd like me to help you [take and save screenshots to the folder](f) or prepare your [final submission message to paste in email or portal](f)!