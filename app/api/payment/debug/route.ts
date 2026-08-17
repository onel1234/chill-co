import { NextResponse } from 'next/server';

export async function GET() {
  const appKey = process.env.GENIE_APP_KEY!;
  const companyId = process.env.GENIE_MERCHANT_ID!;
  const geniEnv = process.env.GENIE_ENV;
  const baseUrl = (geniEnv === 'sandbox' || geniEnv === 'uat')
    ? 'https://api.uat.geniebiz.lk'
    : 'https://api.geniebiz.lk';

  const results: Record<string, unknown> = {
    _config: { env: geniEnv, baseUrl, hasAppKey: !!appKey, hasCompanyId: !!companyId },
  };

  async function probe(label: string, url: string, opts: RequestInit) {
    try {
      const r = await fetch(url, opts);
      const body = await r.text();
      // Parse JSON so the browser shows the full object without truncation
      try {
        results[label] = { status: r.status, body: JSON.parse(body) };
      } catch {
        results[label] = { status: r.status, body };
      }
    } catch (e) {
      results[label] = { error: String(e) };
    }
  }

  const txBody = JSON.stringify({
    apiVersion: '2.0',
    companyId,
    amount: 100,
    currency: 'LKR',
    localId: `test-order-debug-${Date.now()}`,
    redirectUrl: 'https://chillco.store/checkout/callback',
    webhook: 'https://chillco.store/api/payment/webhook',
    customerReference: 'debug-test',
  });

  // Test 1: Correct auth — raw appKey, no Bearer prefix
  await probe('correct_auth_no_bearer', `${baseUrl}/public/transactions`, {
    method: 'POST',
    headers: { Authorization: appKey, 'x-api-key': appKey, 'Content-Type': 'application/json' },
    body: txBody,
  });

  // Test 2: Bearer prefix (old / wrong approach — expected to fail)
  await probe('wrong_bearer_prefix', `${baseUrl}/public/transactions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${appKey}`, 'x-api-key': appKey, 'Content-Type': 'application/json' },
    body: txBody,
  });

  return NextResponse.json(results);
}
