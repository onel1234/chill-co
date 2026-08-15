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

  // x-api-key: appKey is confirmed to pass the AWS gateway
  const gatewayHeaders: HeadersInit = { 'x-api-key': appKey, 'Content-Type': 'application/json' };

  // ── 1. Try auth/token at the /public/ path with known-working gateway key ─
  await probe('auth_public_token', `${base}/public/auth/token`, {
    method: 'POST', headers: gatewayHeaders,
    body: JSON.stringify({ appId, appKey }),
  });
  await probe('auth_public_login', `${base}/public/login`, {
    method: 'POST', headers: gatewayHeaders,
    body: JSON.stringify({ appId, appKey }),
  });
  await probe('auth_v1_token_with_gateway_key', `${base}/v1/auth/token`, {
    method: 'POST', headers: gatewayHeaders,
    body: JSON.stringify({ appId, appKey }),
  });
  await probe('auth_public_auth', `${base}/public/auth`, {
    method: 'POST', headers: gatewayHeaders,
    body: JSON.stringify({ appId, appKey }),
  });

  // ── 2. Try GET company with x-api-key (the gateway key that works) ────────
  await probe('company_with_gateway_key', `${base}/public/company`, {
    method: 'GET', headers: gatewayHeaders,
  });
  await probe('company_id_with_gateway_key', `${base}/public/company/${companyId}`, {
    method: 'GET', headers: gatewayHeaders,
  });

  // ── 3. POST transaction with companyId as query param ─────────────────────
  await probe('tx_companyId_queryparam', `${base}/public/transactions?companyId=${companyId}`, {
    method: 'POST', headers: gatewayHeaders,
    body: JSON.stringify({ amount: 100, currency: 'LKR', redirectUrl: 'https://chillco.store/checkout/callback', localId: 'test-001' }),
  });
  await probe('tx_appId_queryparam', `${base}/public/transactions?appId=${appId}`, {
    method: 'POST', headers: gatewayHeaders,
    body: JSON.stringify({ amount: 100, currency: 'LKR', redirectUrl: 'https://chillco.store/checkout/callback', localId: 'test-001' }),
  });

  // ── 4. POST transaction with companyId as custom header ───────────────────
  await probe('tx_x_company_header', `${base}/public/transactions`, {
    method: 'POST',
    headers: { ...gatewayHeaders, 'x-company-id': companyId, 'x-app-id': appId },
    body: JSON.stringify({ amount: 100, currency: 'LKR', redirectUrl: 'https://chillco.store/checkout/callback', localId: 'test-001' }),
  });

  return NextResponse.json(results);
}
