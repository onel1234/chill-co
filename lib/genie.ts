// Genie Business (Dialog Pay) API integration.
//
// Authentication: Authorization: <appKey>  (NO "Bearer" prefix)
//   Also send x-api-key: <appKey> for AWS API Gateway usage plan.
//
// Endpoints (v2.0):
//   Create transaction : POST /public/transactions
//   Get status         : GET  /public/transactions/{transactionId}
//
// The request body must include:
//   apiVersion      : "2.0"
//   companyId       : your merchant / company ID
//   localId         : your internal order ID (maps to orderId)
//   amount          : integer in smallest currency unit (cents / LKR paise)
//   currency        : "LKR"
//   redirectUrl     : where user lands after payment
//   webhook         : server-side callback URL (optional)
//   customerReference: free-text customer identifier (optional)

const GENIE_API_VERSION = '2.0';

function getBaseUrl(): string {
  const env = process.env.GENIE_ENV;
  if (env === 'sandbox' || env === 'uat') {
    return 'https://api.uat.geniebiz.lk';
  }
  return 'https://api.geniebiz.lk';
}

function getAuthHeaders(): HeadersInit {
  const appKey = process.env.GENIE_APP_KEY;
  if (!appKey) {
    throw new Error('GENIE_APP_KEY is not configured');
  }
  return {
    'Content-Type': 'application/json',
    // Genie uses the raw App Key directly — no "Bearer" prefix
    'Authorization': appKey,
    'x-api-key': appKey,
  };
}

interface GenieTransactionParams {
  companyId: string;
  orderId: string;      // becomes localId in the Genie payload
  amount: number;       // in LKR (will be sent as-is — Genie accepts decimal LKR)
  currency: string;
  redirectUrl: string;
  webhookUrl?: string;
  customerReference?: string;
  description?: string;
}

interface GenieCreateResponse {
  // Genie returns the transaction object on success
  transactionId: string;
  localId: string;
  paymentUrl: string;
  status: string;
  expiresAt?: string;
}

interface GenieStatusResponse {
  transactionId: string;
  localId: string;
  paymentStatus: string; // "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED"
  amount: number;
  currency: string;
  paymentMethod?: string;
  transactionTimestamp?: string;
}

export async function createGenieTransaction(
  params: GenieTransactionParams
): Promise<{ status: string; data: { transactionId: string; orderId: string; paymentUrl: string; expiresAt: string } }> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/public/transactions`;

  const payload = {
    apiVersion: GENIE_API_VERSION,
    companyId: params.companyId,
    localId: params.orderId,
    amount: params.amount,
    currency: params.currency,
    redirectUrl: params.redirectUrl,
    ...(params.webhookUrl ? { webhook: params.webhookUrl } : {}),
    ...(params.customerReference ? { customerReference: params.customerReference } : {}),
    ...(params.description ? { description: params.description } : {}),
  };

  console.log('[Genie] Creating transaction at:', url);
  console.log('[Genie] Payload:', JSON.stringify(payload));

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const responseText = await response.text();
  console.log('[Genie] Create response status:', response.status);
  console.log('[Genie] Create response body:', responseText);

  if (!response.ok) {
    throw new Error(
      `Genie createTransaction failed: ${response.status} ${responseText}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let raw: Record<string, any>;
  try {
    raw = JSON.parse(responseText);
  } catch {
    throw new Error(`Genie createTransaction: invalid JSON response: ${responseText}`);
  }

  console.log('[Genie] Parsed create response keys:', Object.keys(raw));

  // Genie returns a flat transaction object — extract id and payment URL
  // defensively across known field name variants.
  const transactionId: string =
    raw.transactionId ??
    raw.id ??
    raw._id ??
    raw.txnId ??
    null;

  const paymentUrl: string =
    raw.paymentUrl ??
    raw.checkoutUrl ??
    raw.paymentLink ??
    raw.url ??
    raw.links?.payment ??
    raw.links?.checkout ??
    null;

  const expiresAt: string = raw.expiresAt ?? raw.expiry ?? raw.expireAt ?? '';

  if (!transactionId) {
    throw new Error(
      `Genie createTransaction: cannot find transaction ID in response. Keys: ${Object.keys(raw).join(', ')}. Body: ${responseText.slice(0, 300)}`
    );
  }

  if (!paymentUrl) {
    throw new Error(
      `Genie createTransaction: cannot find payment URL in response. Keys: ${Object.keys(raw).join(', ')}. Body: ${responseText.slice(0, 300)}`
    );
  }

  return {
    status: 'SUCCESS',
    data: {
      transactionId,
      orderId: raw.localId ?? params.orderId,
      paymentUrl,
      expiresAt,
    },
  };
}

export async function getGenieTransactionStatus(
  transactionId: string
): Promise<{ status: string; data: GenieStatusResponse }> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/public/transactions/${transactionId}`;

  console.log('[Genie] Getting status from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const responseText = await response.text();
  console.log('[Genie] Status response:', response.status, responseText);

  if (!response.ok) {
    throw new Error(
      `Genie getTransactionStatus failed: ${response.status} ${responseText}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let raw: Record<string, any>;
  try {
    raw = JSON.parse(responseText);
  } catch {
    throw new Error(`Genie getTransactionStatus: invalid JSON response: ${responseText}`);
  }

  console.log('[Genie] Parsed status response keys:', Object.keys(raw));

  // Map known field name variants to our internal GenieStatusResponse shape
  const mapped: GenieStatusResponse = {
    transactionId: raw.transactionId ?? raw.id ?? raw._id ?? '',
    localId: raw.localId ?? raw.orderId ?? '',
    // Genie uses "state" in some versions, "paymentStatus" in others
    paymentStatus: raw.paymentStatus ?? raw.state ?? raw.status ?? 'UNKNOWN',
    amount: raw.amount ?? 0,
    currency: raw.currency ?? 'LKR',
    paymentMethod: raw.paymentMethod ?? raw.provider ?? undefined,
    transactionTimestamp: raw.transactionTimestamp ?? raw.updatedAt ?? raw.updated ?? undefined,
  };

  return { status: 'SUCCESS', data: mapped };
}
