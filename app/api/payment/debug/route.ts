import { NextResponse } from 'next/server';

// TEMPORARY DEBUG ENDPOINT — REMOVE BEFORE GOING TO PRODUCTION
export async function GET() {
  const appId = process.env.GENIE_APP_ID;
  const appKey = process.env.GENIE_APP_KEY;
  const merchantId = process.env.GENIE_MERCHANT_ID;
  const baseUrl = 'https://api.geniebiz.lk';

  const result: Record<string, unknown> = {
    merchantId,
    merchantIdMatchesSandbox: merchantId === '6397f39df07fba000842a90b',
  };

  // ── Test 1: appKey as x-api-key header, appId in body ──────────────────
  const authUrl = `${baseUrl}/v1/auth/token`;
  try {
    const res = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': appKey!,
      },
      body: JSON.stringify({ appId }),
    });
    const body = await res.text();
    result.test1_desc = 'POST /v1/auth/token — x-api-key: appKey, body: { appId }';
    result.test1_status = res.status;
    result.test1_response = body.slice(0, 500);
  } catch (err) {
    result.test1_error = String(err);
  }

  // ── Test 2: appKey as Bearer token directly (no separate auth step) ────
  const companyUrl = `${baseUrl}/v1/company`;
  try {
    const res = await fetch(companyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appKey}`,
        'x-api-key': appKey!,
      },
    });
    const body = await res.text();
    result.test2_desc = 'GET /v1/company — Authorization: Bearer appKey + x-api-key: appKey';
    result.test2_status = res.status;
    result.test2_response = body.slice(0, 500);
  } catch (err) {
    result.test2_error = String(err);
  }

  // ── Test 3: appKey as Bearer only (no x-api-key) ──────────────────────
  try {
    const res = await fetch(companyUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appKey}`,
      },
    });
    const body = await res.text();
    result.test3_desc = 'GET /v1/company — Authorization: Bearer appKey only';
    result.test3_status = res.status;
    result.test3_response = body.slice(0, 500);
  } catch (err) {
    result.test3_error = String(err);
  }

  return NextResponse.json(result);
}
