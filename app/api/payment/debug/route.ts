import { NextResponse } from 'next/server';

// TEMPORARY DEBUG ENDPOINT — REMOVE BEFORE GOING TO PRODUCTION
// Visit: /api/payment/debug to see Genie API connectivity details
export async function GET() {
  const appId = process.env.GENIE_APP_ID;
  const appKey = process.env.GENIE_APP_KEY;
  const merchantId = process.env.GENIE_MERCHANT_ID;
  const env = process.env.GENIE_ENV || 'sandbox';

  // Both sandbox and production use the same URL
  const baseUrl = 'https://api.geniebiz.lk';

  const result: Record<string, unknown> = {
    env,
    baseUrl,
    hasAppId: !!appId,
    appIdLength: appId?.length,
    appIdPreview: appId ? `${appId.slice(0, 8)}...` : null,
    hasAppKey: !!appKey,
    appKeyLength: appKey?.length,
    hasMerchantId: !!merchantId,
    merchantId,
    expectedSandboxMerchantId: '6397f39df07fba000842a90b',
    merchantIdMatchesSandbox: merchantId === '6397f39df07fba000842a90b',
  };

  // Try the auth token endpoint
  const authUrl = `${baseUrl}/v1/auth/token`;
  try {
    const res = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ appId, appKey }),
    });
    const body = await res.text();
    result.authUrl = authUrl;
    result.authStatus = res.status;
    result.authHeaders = Object.fromEntries(res.headers.entries());
    result.authResponse = body.slice(0, 1000);
  } catch (err) {
    result.authUrl = authUrl;
    result.authError = String(err);
  }

  return NextResponse.json(result);
}
