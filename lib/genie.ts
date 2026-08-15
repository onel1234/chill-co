interface GenieTokenResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

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

let cachedToken: string | null = null;
let tokenExpiresAt: number = 0;

function getBaseUrl() {
  // Both sandbox and production use the same base URL.
  // The environment is distinguished by the credentials (appId/appKey) used.
  return 'https://api.geniebiz.lk';
}

export async function getGenieAuthToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  // The Genie API uses appId / appKey (not clientId / clientSecret).
  // In sandbox mode these come from GENIE_APP_ID / GENIE_APP_KEY.
  const appId = process.env.GENIE_APP_ID;
  const appKey = process.env.GENIE_APP_KEY;

  if (!appId || !appKey) {
    throw new Error('Genie credentials not configured (GENIE_APP_ID / GENIE_APP_KEY missing)');
  }

  const url = `${getBaseUrl()}/v1/auth/token`;
  console.log('[Genie] Requesting auth token from:', url);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ appId, appKey }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error('[Genie] Auth token error:', response.status, errText);
    throw new Error(`Failed to get Genie auth token: ${response.status} ${errText}`);
  }

  const data = (await response.json()) as GenieTokenResponse;

  cachedToken = data.accessToken;
  // Expire 1 minute early to be safe
  tokenExpiresAt = Date.now() + (data.expiresIn - 60) * 1000;

  return cachedToken;
}

export async function createGenieTransaction(params: GenieTransactionParams): Promise<GenieTransactionResponse> {
  const token = await getGenieAuthToken();

  const url = `${getBaseUrl()}/v1/transactions/create`;
  console.log('[Genie] Creating transaction at:', url, 'params:', JSON.stringify(params));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[Genie] Create transaction error:', response.status, text);
    throw new Error(`Failed to create Genie transaction: ${response.status} ${text}`);
  }

  return response.json() as Promise<GenieTransactionResponse>;
}

export async function getGenieTransactionStatus(transactionId: string): Promise<GenieStatusResponse> {
  const token = await getGenieAuthToken();

  const url = `${getBaseUrl()}/v1/transactions/${transactionId}/status`;
  console.log('[Genie] Getting transaction status from:', url);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[Genie] Transaction status error:', response.status, text);
    throw new Error(`Failed to get Genie transaction status: ${response.status} ${text}`);
  }

  return response.json() as Promise<GenieStatusResponse>;
}
