import 'dotenv/config'
import express from 'express'
import { paymentMiddleware, x402ResourceServer } from '@x402/express'
import { HTTPFacilitatorClient } from '@x402/core/server'
import { ExactIcpScheme } from '@canister-software/x402-icp/server'

const FACILITATOR_URL = process.env.FACILITATOR_URL ?? 'http://localhost:3000'
const PAYTO_PRINCIPAL = process.env.PAYTO_PRINCIPAL ?? ''

if (!PAYTO_PRINCIPAL) {
  console.error('Set PAYTO_PRINCIPAL env var')
  process.exit(1)
}

const facilitatorClient = new HTTPFacilitatorClient({ url: FACILITATOR_URL })

const x402Server = new x402ResourceServer(facilitatorClient)
  .register('icp:1:xafvr-biaaa-aaaai-aql5q-cai', new ExactIcpScheme())

const app = express()
app.use(express.json())

app.use(
  paymentMiddleware(
    {
      'GET /api/data': {
        accepts: [
          {
            scheme: 'exact',
            price: '100000',
            network: 'icp:1:xafvr-biaaa-aaaai-aql5q-cai',
            payTo: PAYTO_PRINCIPAL,
          },
        ],
        description: 'Premium data endpoint',
        mimeType: 'application/json',
      },
    },
    x402Server,
  )
)

app.get('/api/data', (_req, res) => {
  res.json({
    message: 'Here is your premium data!',
    timestamp: new Date().toISOString(),
    value: Math.random(),
  })
})

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

const port = Number(process.env.PORT ?? 4000)
app.listen(port, () => {
  console.log(`\n  Resource server on :${port}`)
  console.log(`  Paid route:    GET /api/data `)
  console.log(`  Facilitator:   ${FACILITATOR_URL}`)
  console.log(`  PayTo:         ${PAYTO_PRINCIPAL}\n`)
})