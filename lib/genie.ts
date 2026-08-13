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
  const env = process.env.GENIE_ENV || 'sandbox';
  return env === 'production'
    ? 'https://api.geniebiz.lk'
    : 'https://api.geniebiz.lk';
}

export async function getGenieAuthToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const clientId = process.env.GENIE_CLIENT_ID;
  const clientSecret = process.env.GENIE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Genie credentials not configured');
  }

  const response = await fetch(`${getBaseUrl()}/v1/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ clientId, clientSecret }),
  });

  if (!response.ok) {
    throw new Error('Failed to get Genie auth token');
  }

  const data = (await response.json()) as GenieTokenResponse;
  
  cachedToken = data.accessToken;
  // Expire 1 minute early to be safe
  tokenExpiresAt = Date.now() + (data.expiresIn - 60) * 1000;

  return cachedToken;
}

export async function createGenieTransaction(params: GenieTransactionParams): Promise<GenieTransactionResponse> {
  const token = await getGenieAuthToken();
  const apiKey = process.env.GENIE_API_KEY;

  if (!apiKey) {
    throw new Error('Genie API key not configured');
  }

  const response = await fetch(`${getBaseUrl()}/v1/transactions/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'x-api-key': apiKey,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Genie create error:', text);
    throw new Error('Failed to create Genie transaction');
  }

  return response.json() as Promise<GenieTransactionResponse>;
}

export async function getGenieTransactionStatus(transactionId: string): Promise<GenieStatusResponse> {
  const token = await getGenieAuthToken();
  const apiKey = process.env.GENIE_API_KEY;

  if (!apiKey) {
    throw new Error('Genie API key not configured');
  }

  const response = await fetch(`${getBaseUrl()}/v1/transactions/${transactionId}/status`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get Genie transaction status');
  }

  return response.json() as Promise<GenieStatusResponse>;
}
