import { NextResponse } from 'next/server';

export async function GET() {
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
  
  // Test different apiVersion values since the API explicitly requested it
  const versions = ['v1', 'v2', '2.0', '1.0'];
  
  for (const v of versions) {
    const txBody = JSON.stringify({
      apiVersion: v,
      amount: 100,
      currency: 'LKR',
      redirectUrl: 'https://chillco.store/checkout/callback',
      webhook: 'https://chillco.store/api/payment/webhook',
      localId: `test-order-${v}`,
      customerReference: 'cust-123'
    });

    await probe(`CreateTx_${v}`, `${baseUat}/public/transactions`, {
      method: 'POST',
      headers: { 'Authorization': appKey, 'Content-Type': 'application/json' },
      body: txBody
    });
  }

  return NextResponse.json(results);
}
