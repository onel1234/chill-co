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

  // The previous test showed that x-api-key: appKey bypassed the 403 Forbidden.
  const h_ApiKeyOnly = { 
    'x-api-key': appKey, 
    'Content-Type': 'application/json' 
  };
  
  const h_BearerAndApiKey = { 
    'x-api-key': appKey, 
    'Authorization': `Bearer ${appKey}`, 
    'Content-Type': 'application/json' 
  };
  
  const h_BearerOnly = {
    'Authorization': `Bearer ${appKey}`, 
    'Content-Type': 'application/json'
  };

  const dummyTxId = 'test-tx-123';
  const dummyPayload = JSON.stringify({
    amount: 100,
    currency: "LKR",
    redirectUrl: "https://example.com/callback",
    localId: "test-tx-123",
    customerReference: "ref-123"
  });

  // Test GET with all three header combinations to see which returns 404 (not found) instead of 401
  await probe('GetTx_ApiKeyOnly', `${base}/public/transactions/${dummyTxId}`, { method: 'GET', headers: h_ApiKeyOnly });
  await probe('GetTx_BearerAndApiKey', `${base}/public/transactions/${dummyTxId}`, { method: 'GET', headers: h_BearerAndApiKey });
  await probe('GetTx_BearerOnly', `${base}/public/transactions/${dummyTxId}`, { method: 'GET', headers: h_BearerOnly });

  // Test POST
  await probe('CreateTx_ApiKeyOnly', `${base}/public/transactions`, { method: 'POST', headers: h_ApiKeyOnly, body: dummyPayload });
  await probe('CreateTx_BearerAndApiKey', `${base}/public/transactions`, { method: 'POST', headers: h_BearerAndApiKey, body: dummyPayload });
  await probe('CreateTx_BearerOnly', `${base}/public/transactions`, { method: 'POST', headers: h_BearerOnly, body: dummyPayload });

  return NextResponse.json(results);
}
