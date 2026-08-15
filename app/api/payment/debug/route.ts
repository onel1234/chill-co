import { NextResponse } from 'next/server';

export async function GET() {
  const base = 'https://api.geniebiz.lk';
  const appId  = process.env.GENIE_APP_ID!;
  const appKey = process.env.GENIE_APP_KEY!;
  const companyId = process.env.GENIE_MERCHANT_ID!;

  // The raw production API key we found
  const prodApiKey = 'pk_production_ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpJam9pTm1Fek1tVTNNbVV5WkdabE1XTXdNREF5WWpsaE1ESTFJaXdpYUNJNkltaDBkSEJ6T2k4dlpHRnphR0p2WVhKa0xtZGxibWxsWW1sNkxteHJJaXdpWVNJNklqUTFOV1V3WVdZNExUTXhPV0V0TkdVNE5TMDVORGt6TFdGaE1XUXpNamcxTUdJM1l5SXNJblZ4SWpvaU56UTVNR0UxTURndE9HWTBaQzAwT1dGa0xXSmxZemd0TWpVeU5qY3haakF4WXpabElpd2lhV0YwSWpveE56Z3hOekl4TVRVd0xDSmxlSEFpT2pRNU16Y3pPVFEzTlRCOS5YSUtPalVBWDZvRk9QZUtEQVd5UnROYjF1bE50TFc4cFFCa0pmc2xyajc0';

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

  // We know that `x-api-key` is REQUIRED by the AWS API Gateway, otherwise we get 403.
  // We'll use the prodApiKey for the gateway, and test various ways to pass the appKey and appId to the application.
  
  const h_base = { 'x-api-key': prodApiKey, 'Content-Type': 'application/json' };

  // 1. Authorization header without Bearer
  await probe('Auth_AppKey_NoBearer', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base, 'Authorization': appKey }, body: txBody
  });

  // 2. Custom headers matching the dashboard names
  await probe('Custom_App_Headers', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base, 'App-Id': appId, 'App-Key': appKey }, body: txBody
  });

  // 3. Client ID and Secret names
  await probe('Custom_Client_Headers', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base, 'client-id': appId, 'client-secret': appKey }, body: txBody
  });

  // 4. Token header
  await probe('Custom_Token_Header', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base, 'token': appKey }, body: txBody
  });

  // 5. Basic Auth with AppId:AppKey
  const basicAuth = Buffer.from(`${appId}:${appKey}`).toString('base64');
  await probe('Auth_Basic', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base, 'Authorization': `Basic ${basicAuth}` }, body: txBody
  });

  // 6. Try the same but with appKey as the x-api-key instead of prodApiKey
  const h_base_appKey = { 'x-api-key': appKey, 'Content-Type': 'application/json' };
  
  await probe('Auth_AppKey_NoBearer_appKey', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base_appKey, 'Authorization': appKey }, body: txBody
  });
  
  await probe('Custom_App_Headers_appKey', `${base}/public/transactions`, {
    method: 'POST', headers: { ...h_base_appKey, 'App-Id': appId, 'App-Key': appKey }, body: txBody
  });

  return NextResponse.json(results);
}
