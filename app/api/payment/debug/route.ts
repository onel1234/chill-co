import { NextResponse } from 'next/server';

export async function GET() {
  const appId = process.env.GENIE_APP_ID!;
  const appKey = process.env.GENIE_APP_KEY!;
  const companyId = process.env.GENIE_MERCHANT_ID!;
  const base = 'https://api.geniebiz.lk';

  const results: Record<string, unknown> = {};

  async function probe(label: string, url: string, opts: RequestInit) {
    try {
      const r = await fetch(url, opts);
      const body = await r.text();
      results[label] = { status: r.status, body: body.slice(0, 300) };
    } catch (e) {
      results[label] = { error: String(e) };
    }
  }

  const dummyTxId = 'test-tx-123';
  const dummyPayload = JSON.stringify({
    amount: 100,
    currency: "LKR",
    redirectUrl: "https://example.com/callback",
    localId: "test-tx-123",
    customerReference: "ref-123"
  });

  // Since x-api-key: appKey bypassed 403 but gave "Unspecified company" (PP-T-002),
  // we will try adding companyId or appId in various headers.
  
  const headersToTest: Record<string, HeadersInit> = {
    'ApiKey_And_AppId_Header': { 'x-api-key': appKey, 'x-app-id': appId, 'Content-Type': 'application/json' },
    'ApiKey_And_CompanyId_Header': { 'x-api-key': appKey, 'x-company-id': companyId, 'Content-Type': 'application/json' },
    'ApiKey_And_MerchantId_Header': { 'x-api-key': appKey, 'x-merchant-id': companyId, 'Content-Type': 'application/json' },
    // Maybe AppId is the x-api-key, and AppKey is the Bearer? We missed testing this for /public/
    'AppIdAsApiKey_AppKeyAsBearer': { 'x-api-key': appId, 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' },
    // Maybe AppId is the x-api-key and the company is inferred?
    'AppIdAsApiKey_Only': { 'x-api-key': appId, 'Content-Type': 'application/json' },
  };

  for (const [key, headers] of Object.entries(headersToTest)) {
    await probe(`CreateTx_${key}`, `${base}/public/transactions`, { method: 'POST', headers, body: dummyPayload });
  }

  return NextResponse.json(results);
}
