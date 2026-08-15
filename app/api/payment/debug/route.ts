import { NextResponse } from 'next/server';

export async function GET() {
  const appId  = process.env.GENIE_APP_ID!;
  const appKey = process.env.GENIE_APP_KEY!;
  const companyId = process.env.GENIE_MERCHANT_ID!;

  const results: Record<string, unknown> = {};

  async function probe(label: string, url: string, opts: RequestInit) {
    try {
      const r = await fetch(url, opts);
      const body = await r.text();
      results[label] = { status: r.status, body: body.slice(0, 500) };
    } catch (e) {
      results[label] = { error: String(e) };
    }
  }

  const txBody = JSON.stringify({
    amount: 100,
    currency: 'LKR',
    redirectUrl: 'https://chillco.store/checkout/callback',
    localId: 'test-order-001',
  });

  const bases = [
    'https://api.uat.geniebiz.lk',
    'https://uat-api.geniebiz.lk',
    'https://api.geniebiz.lk'
  ];

  // We are going to test Authorization: Bearer <appKey> + x-api-key: <appId> on UAT domains!
  const headers = {
    'x-api-key': appId, // UUID
    'Authorization': `Bearer ${appKey}`,
    'Content-Type': 'application/json'
  };
  
  const headers2 = {
    'x-api-key': appKey, // JWT as API key
    'Authorization': `Bearer ${appKey}`,
    'Content-Type': 'application/json'
  };

  for (const base of bases) {
    const safeName = base.replace('https://', '').replace(/\./g, '_');
    await probe(`${safeName}_h1`, `${base}/public/transactions`, { method: 'POST', headers, body: txBody });
    await probe(`${safeName}_h2`, `${base}/public/transactions`, { method: 'POST', headers: headers2, body: txBody });
    // Also test GET company just in case
    await probe(`${safeName}_company_h1`, `${base}/public/company/${companyId}`, { method: 'GET', headers });
  }

  return NextResponse.json(results);
}
