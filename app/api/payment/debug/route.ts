import { NextResponse } from 'next/server';

// TEMPORARY DEBUG — tests original production credentials against the correct /public/ paths
export async function GET() {
  const base = 'https://api.geniebiz.lk';

  // ── Original production credentials (restored for testing) ───────────
  const prodAppId       = '455e0af8-319a-4e85-9493-aa1d32850b7c';
  const prodAppKey      = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjQ1NWUwYWY4LTMxOWEtNGU4NS05NDkzLWFhMWQzMjg1MGI3YyIsImNvbXBhbnlJZCI6IjZhMzJlNzJlMmRmZTFjMDAwMmI5YTAyNSIsImlhdCI6MTc4MTcyMTE1MCwiZXhwIjo0OTM3Mzk0NzUwfQ.es4XY8DmZzILpuLX4PtQfwDVzTPYZwKSCF_MT3qxvpg';
  const prodApiKey      = 'pk_production_ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpJam9pTm1Fek1tVTNNbVV5WkdabE1XTXdNREF5WWpsaE1ESTFJaXdpYUNJNkltaDBkSEJ6T2k4dlpHRnphR0p2WVhKa0xtZGxibWxsWW1sNkxteHJJaXdpWVNJNklqUTFOV1V3WVdZNExUTXhPV0V0TkdVNE5TMDVORGt6TFdGaE1XUXpNamcxTUdJM1l5SXNJblZ4SWpvaU56UTVNR0UxTURndE9HWTBaQzAwT1dGa0xXSmxZemd0TWpVeU5qY3haakF4WXpabElpd2lhV0YwSWpveE56Z3hOekl4TVRVd0xDSmxlSEFpT2pRNU16Y3pPVFEzTlRCOS5YSUtPalVBWDZvRk9QZUtEQVd5UnROYjF1bE50TFc4cFFCa0pmc2xyajc0';
  const prodCompanyId   = '6a32e72e2dfe1c0002b9a025';

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

  // ── Test 1: pkKey as x-api-key + appKey as Bearer ─────────────────────
  await probe('P1_pkKey_Bearer', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': prodApiKey, 'Authorization': `Bearer ${prodAppKey}`, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Test 2: pkKey as x-api-key only ───────────────────────────────────
  await probe('P2_pkKey_only', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': prodApiKey, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Test 3: appKey as x-api-key + Bearer ──────────────────────────────
  await probe('P3_appKey_Both', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': prodAppKey, 'Authorization': `Bearer ${prodAppKey}`, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Test 4: GET company with pkKey as x-api-key + Bearer ──────────────
  await probe('P4_company_pkKey_Bearer', `${base}/public/company`, {
    method: 'GET',
    headers: { 'x-api-key': prodApiKey, 'Authorization': `Bearer ${prodAppKey}`, 'Content-Type': 'application/json' },
  });

  // ── Test 5: GET company/companyId ─────────────────────────────────────
  await probe('P5_company_id_pkKey_Bearer', `${base}/public/company/${prodCompanyId}`, {
    method: 'GET',
    headers: { 'x-api-key': prodApiKey, 'Authorization': `Bearer ${prodAppKey}`, 'Content-Type': 'application/json' },
  });

  // ── Test 6: v1/auth/token with pkKey ──────────────────────────────────
  await probe('P6_auth_token_pkKey', `${base}/v1/auth/token`, {
    method: 'POST',
    headers: { 'x-api-key': prodApiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ appId: prodAppId, appKey: prodAppKey }),
  });

  // ── Test 7: v1/auth/token with appKey as both ─────────────────────────
  await probe('P7_auth_token_appKey', `${base}/v1/auth/token`, {
    method: 'POST',
    headers: { 'x-api-key': prodAppKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ appId: prodAppId }),
  });

  return NextResponse.json(results);
}
