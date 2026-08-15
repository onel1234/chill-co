import { NextResponse } from 'next/server';

export async function GET() {
  const base = 'https://api.geniebiz.lk';

  const prodAppId     = '455e0af8-319a-4e85-9493-aa1d32850b7c';
  const prodAppKey    = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6IjQ1NWUwYWY4LTMxOWEtNGU4NS05NDkzLWFhMWQzMjg1MGI3YyIsImNvbXBhbnlJZCI6IjZhMzJlNzJlMmRmZTFjMDAwMmI5YTAyNSIsImlhdCI6MTc4MTcyMTE1MCwiZXhwIjo0OTM3Mzk0NzUwfQ.es4XY8DmZzILpuLX4PtQfwDVzTPYZwKSCF_MT3qxvpg';
  const prodApiKeyRaw = 'pk_production_ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpJam9pTm1Fek1tVTNNbVV5WkdabE1XTXdNREF5WWpsaE1ESTFJaXdpYUNJNkltaDBkSEJ6T2k4dlpHRnphR0p2WVhKa0xtZGxibWxsWW1sNkxteHJJaXdpWVNJNklqUTFOV1V3WVdZNExUTXhPV0V0TkdVNE5TMDVORGt6TFdGaE1XUXpNamcxTUdJM1l5SXNJblZ4SWpvaU56UTVNR0UxTURndE9HWTBaQzAwT1dGa0xXSmxZemd0TWpVeU5qY3haakF4WXpabElpd2lhV0YwSWpveE56Z3hOekl4TVRVd0xDSmxlSEFpT2pRNU16Y3pPVFEzTlRCOS5YSUtPalVBWDZvRk9QZUtEQVd5UnROYjF1bE50TFc4cFFCa0pmc2xyajc0';
  const prodCompanyId = '6a32e72e2dfe1c0002b9a025';

  // Decode the pk_production_ key → strip prefix, base64-decode → inner JWT
  const b64Part = prodApiKeyRaw.replace('pk_production_', '');
  const decodedApiKey = Buffer.from(b64Part, 'base64').toString('utf8');

  const results: Record<string, unknown> = {
    decodedApiKeyPreview: decodedApiKey.slice(0, 60) + '...',
    decodedApiKeyLength: decodedApiKey.length,
  };

  // Decode the inner JWT payload to see what's inside
  try {
    const parts = decodedApiKey.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
      results.decodedApiKeyPayload = payload;
    }
  } catch (e) {
    results.decodedApiKeyDecodeError = String(e);
  }

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

  // ── Test decoded inner JWT as x-api-key ─────────────────────────────
  await probe('T1_decodedKey_only', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': decodedApiKey, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Test decoded inner JWT as x-api-key + appKey as Bearer ───────────
  await probe('T2_decodedKey_Bearer', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'x-api-key': decodedApiKey, 'Authorization': `Bearer ${prodAppKey}`, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Test decoded inner JWT as Bearer only ────────────────────────────
  await probe('T3_decodedKey_Bearer_only', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${decodedApiKey}`, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Test full pk_production string as Bearer (not x-api-key) ────────
  await probe('T4_fullKey_Bearer', `${base}/public/transactions`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${prodApiKeyRaw}`, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // ── Token exchange: use decoded key as x-api-key ──────────────────────
  await probe('T5_auth_decodedKey', `${base}/v1/auth/token`, {
    method: 'POST',
    headers: { 'x-api-key': decodedApiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ appId: prodAppId, appKey: prodAppKey }),
  });

  return NextResponse.json(results);
}
