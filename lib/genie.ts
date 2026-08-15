// Genie Business (Dialog Pay) API integration.
//
// The App Key is a long-lived JWT issued by Genie — it does NOT need to be
// exchanged for a short-lived token. It is used directly as:
//   Authorization: Bearer <appKey>
//   x-api-key: <appKey>   (required by AWS API Gateway usage plan)

interface GenieTransactionParams {
  merchantId: string;
  orderId: string;
  amount: number;
  currency: string;
  redirectUrl: string;
  webhookUrl?: string;
  customerDetails?: {
    customerEmail?: string;
    customerPhone?: string;
  };
  description?: string;
}

interface GenieTransactionResponse {
  status: string;
  data: {
    transactionId: string;
    orderId: string;
    paymentUrl: string;
    expiresAt: string;
  };
}

interface GenieStatusResponse {
  status: string;
  data: {
    transactionId: string;
    orderId: string;
    paymentStatus: string;
    amount: number;
    currency: string;
    paymentMethod: string;
    transactionTimestamp: string;
  };
}

const BASE_URL = 'https://api.geniebiz.lk';

function getAuthHeaders(): HeadersInit {
  const appKey = process.env.GENIE_APP_KEY;
  if (!appKey) {
    throw new Error('GENIE_APP_KEY is not configured');
  }
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${appKey}`,
    'x-api-key': appKey,
  };
}

export async function createGenieTransaction(
  params: GenieTransactionParams
): Promise<GenieTransactionResponse> {
  const url = `${BASE_URL}/v1/transactions/create`;
  console.log('[Genie] Creating transaction at:', url, JSON.stringify(params));

  const response = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[Genie] Create transaction error:', response.status, text);
    throw new Error(
      `Genie createTransaction failed: ${response.status} ${text}`
    );
  }

  return response.json() as Promise<GenieTransactionResponse>;
}

export async function getGenieTransactionStatus(
  transactionId: string
): Promise<GenieStatusResponse> {
  const url = `${BASE_URL}/v1/transactions/${transactionId}/status`;
  console.log('[Genie] Getting status from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[Genie] Status error:', response.status, text);
    throw new Error(
      `Genie getTransactionStatus failed: ${response.status} ${text}`
    );
  }

  return response.json() as Promise<GenieStatusResponse>;
}
