# test-icp-server

A minimal x402-protected Express server that accepts ICP micropayments using [@canister-software/x402-icp](https://www.npmjs.com/package/@canister-software/x402-icp).

## Setup

Clone the repo and install dependencies:

\```bash
npm install
\```

Create a `.env` file:

\```
FACILITATOR_URL=https://facilitator.canister.software
PAYTO_PRINCIPAL=your-icp-principal-here
\```

## Run

\```bash
npx ts-node server.ts
\```

## Routes

| Route | Protection | Price |
|---|---|---|
| `GET /api/data` | x402 | 100000 e8s (0.001 TESTICP) |
| `GET /health` | None | Free |

## Related

- [@canister-software/x402-icp](https://www.npmjs.com/package/@canister-software/x402-icp)
- [x402 protocol](https://x402.org)
