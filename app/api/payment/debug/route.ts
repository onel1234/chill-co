import { NextResponse } from 'next/server';

export async function GET() {
  const appId = process.env.GENIE_APP_ID!;
  const appKey = process.env.GENIE_APP_KEY!;
  const base = 'https://api.geniebiz.lk';

  const results: Record<string, unknown> = { appId };

  async function probe(label: string, url: string, opts: RequestInit) {
    try {
      const r = await fetch(url, opts);
      const body = await r.text();
      results[label] = { status: r.status, body: body.slice(0, 300), url };
    } catch (e) {
      results[label] = { error: String(e), url };
    }
  }

  const dummyTxId = 'test-tx-123';
  
  // Headers to test
  const h1 = { 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' };
  const h2 = { 'x-api-key': appId, 'Content-Type': 'application/json' };
  const h3 = { 'x-api-key': appKey, 'Content-Type': 'application/json' };
  const h4 = { 'Authorization': appKey, 'Content-Type': 'application/json' };
  const h5 = { 'x-api-key': appKey, 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' };
  
  // As per PDF, Get Transaction is /public/transactions/{transactionId}
  await probe('GetTx_Bearer', `${base}/public/transactions/${dummyTxId}`, { method: 'GET', headers: h1 });
  await probe('GetTx_XApiKey_AppId', `${base}/public/transactions/${dummyTxId}`, { method: 'GET', headers: h2 });
  await probe('GetTx_XApiKey_AppKey', `${base}/public/transactions/${dummyTxId}`, { method: 'GET', headers: h3 });
  
  await probe('CreateTx_Bearer', `${base}/public/transactions`, { method: 'POST', headers: h1, body: '{}' });
  await probe('CreateTx_XApiKey_AppKey', `${base}/public/transactions`, { method: 'POST', headers: h3, body: '{}' });
  
  // Let's also check if they use /api/public/...
  await probe('GetTx_api_public_Bearer', `${base}/api/public/transactions/${dummyTxId}`, { method: 'GET', headers: h1 });

  return NextResponse.json(results);
}
