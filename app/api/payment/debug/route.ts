import { NextResponse } from 'next/server';

// TEMPORARY DEBUG ENDPOINT — REMOVE BEFORE GOING TO PRODUCTION
export async function GET() {
  const appId = process.env.GENIE_APP_ID!;   // UUID — likely the x-api-key
  const appKey = process.env.GENIE_APP_KEY!;  // JWT  — likely the Bearer token
  const companyId = process.env.GENIE_MERCHANT_ID!;
  const base = 'https://api.geniebiz.lk';

  const results: Record<string, unknown> = { appId, companyId };

  // Helper to make a request and capture status + body
  async function probe(label: string, url: string, opts: RequestInit) {
    try {
      const r = await fetch(url, opts);
      const body = await r.text();
      results[label] = { status: r.status, body: body.slice(0, 300), url };
    } catch (e) {
      results[label] = { error: String(e), url };
    }
  }

  const bearerOnly    = { 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' };
  const uuidKey       = { 'x-api-key': appId, 'Content-Type': 'application/json' };
  const uuidKeyBearer = { 'x-api-key': appId, 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' };
  const jwtKey        = { 'x-api-key': appKey, 'Content-Type': 'application/json' };
  const jwtKeyBearer  = { 'x-api-key': appKey, 'Authorization': `Bearer ${appKey}`, 'Content-Type': 'application/json' };

  // ── Test URL path variants with the most likely auth combo ───────────
  // Pattern A: appId as x-api-key + appKey as Bearer
  await probe('A1_company',           `${base}/v1/company`,                             { headers: uuidKeyBearer });
  await probe('A2_companies_id',      `${base}/v1/companies/${companyId}`,              { headers: uuidKeyBearer });
  await probe('A3_merchant',          `${base}/v1/merchant`,                            { headers: uuidKeyBearer });
  await probe('A4_app_company',       `${base}/v1/app/company`,                         { headers: uuidKeyBearer });
  await probe('A5_business_company',  `${base}/v1/business/company`,                   { headers: uuidKeyBearer });
  await probe('A6_prod_company',      `${base}/prod/v1/company`,                        { headers: uuidKeyBearer });

  // ── Pattern B: appId as x-api-key only (no Bearer) ───────────────────
  await probe('B1_company_uuidOnly',  `${base}/v1/company`,                             { headers: uuidKey });

  // ── Pattern C: Bearer only (no x-api-key) ────────────────────────────
  await probe('C1_company_bearer',    `${base}/v1/company`,                             { headers: bearerOnly });
  await probe('C2_companies_bearer',  `${base}/v1/companies/${companyId}`,              { headers: bearerOnly });

  // ── Pattern D: appKey JWT as x-api-key (what we tried before) ────────
  await probe('D1_company_jwtKey',    `${base}/v1/company`,                             { headers: jwtKey });
  await probe('D2_company_jwtBoth',   `${base}/v1/company`,                             { headers: jwtKeyBearer });

  // ── Try auth/token with appId as x-api-key ───────────────────────────
  await probe('E1_auth_uuidKey', `${base}/v1/auth/token`, {
    method: 'POST',
    headers: uuidKey,
    body: JSON.stringify({ appId, appKey }),
  });
  await probe('E2_auth_bearerOnly', `${base}/v1/auth/token`, {
    method: 'POST',
    headers: bearerOnly,
    body: JSON.stringify({ appId }),
  });

  // ── Probe root to see what info we get ───────────────────────────────
  await probe('Z_root', base, { headers: uuidKeyBearer });

  return NextResponse.json(results);
}
