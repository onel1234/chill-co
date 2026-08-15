import { NextResponse } from 'next/server';

export async function GET() {
  const appId  = process.env.GENIE_APP_ID!;
  const appKey = process.env.GENIE_APP_KEY!;
  const companyId = process.env.GENIE_MERCHANT_ID!;
  const base = 'https://api.geniebiz.lk';

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

  // The winning auth: x-api-key: appKey
  const headers: HeadersInit = { 'x-api-key': appKey, 'Content-Type': 'application/json' };

  // Try companyId in the body under different field names
  const baseBody = {
    amount: 100,
    currency: 'LKR',
    redirectUrl: 'https://chillco.store/checkout/callback',
    localId: 'test-order-001',
  };

  await probe('body_companyId',  `${base}/public/transactions`, { method: 'POST', headers, body: JSON.stringify({ ...baseBody, companyId }) });
  await probe('body_merchantId', `${base}/public/transactions`, { method: 'POST', headers, body: JSON.stringify({ ...baseBody, merchantId: companyId }) });
  await probe('body_appId',      `${base}/public/transactions`, { method: 'POST', headers, body: JSON.stringify({ ...baseBody, appId }) });

  // Also test the "Get Company" endpoint — this would tell us what fields the API uses
  await probe('GET_company',            `${base}/public/company`,                         { headers });
  await probe('GET_company_id',         `${base}/public/company/${companyId}`,            { headers });
  await probe('GET_company_appId',      `${base}/public/company/${appId}`,                { headers });
  await probe('GET_companies_companyId',`${base}/public/companies/${companyId}`,          { headers });

  return NextResponse.json(results);
}
