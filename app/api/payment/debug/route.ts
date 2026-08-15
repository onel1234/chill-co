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

  const baseUat = 'https://api.uat.geniebiz.lk';
  
  const txBody = JSON.stringify({
    amount: 100,
    currency: 'LKR',
    redirectUrl: 'https://chillco.store/checkout/callback',
    localId: 'test-order-001',
    companyId: companyId
  });

  // 1. UAT with NO Authorization header, only x-api-key 
  // If this gives PP-T-002 (Unspecified company), we know UAT behaves exactly like Prod.
  await probe('UAT_NoAuth_ApiKey_appId', `${baseUat}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': appId, 'Content-Type': 'application/json' },
    body: txBody
  });

  await probe('UAT_NoAuth_ApiKey_appKey', `${baseUat}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': appKey, 'Content-Type': 'application/json' },
    body: txBody
  });

  // 2. UAT with Authorization header ONLY
  await probe('UAT_Bearer_Only', `${baseUat}/public/transactions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' },
    body: txBody
  });

  // 3. UAT with Authorization (no Bearer)
  await probe('UAT_AuthNoBearer_Only', `${baseUat}/public/transactions`, {
    method: 'POST',
    headers: { 'Authorization': appKey, 'Content-Type': 'application/json' },
    body: txBody
  });
  
  // 4. Test the v1/auth/token endpoint on UAT
  await probe('UAT_AuthToken_appId', `${baseUat}/v1/auth/token`, {
    method: 'POST',
    headers: { 'x-api-key': appId, 'Content-Type': 'application/json' },
    body: JSON.stringify({ appId, appKey })
  });
  
  await probe('UAT_AuthToken_appKey', `${baseUat}/v1/auth/token`, {
    method: 'POST',
    headers: { 'x-api-key': appKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ appId, appKey })
  });

  return NextResponse.json(results);
}
