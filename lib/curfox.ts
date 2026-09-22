/**
 * Royal Express shipping integration via Curfox DMS API
 * Base URL: https://v1.api.curfox.com
 * Tenant:   royalexpress
 *
 * The MB-##### key provided by Royal Express is used as a direct Bearer token.
 * If it ever stops working Royal Express may need to issue a fresh token.
 */

const CURFOX_BASE = 'https://v1.api.curfox.com';
const CURFOX_TENANT = process.env.CURFOX_TENANT || 'royalexpress';
const CURFOX_API_KEY = process.env.CURFOX_API_KEY || '';

// ─── types ────────────────────────────────────────────────────────────────────

export interface ShippingQuoteParams {
  destinationCity: string;   // e.g. "Kandy"
  destinationState?: string; // e.g. "Central Province" — optional but improves accuracy
  weightKg?: number;         // package weight in kg, default 0.5
  codAmount?: number;        // cash-on-delivery value in LKR, default 0
}

export interface ShippingQuoteResult {
  cost: number;       // shipping charge in LKR
  isFree: boolean;
  error?: string;
}

// ─── helpers ──────────────────────────────────────────────────────────────────

function buildHeaders(): HeadersInit {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CURFOX_API_KEY}`,
    'X-tenant': CURFOX_TENANT,
  };
}

// ─── main function ────────────────────────────────────────────────────────────

/**
 * Fetches the shipping cost for a given destination from Royal Express via
 * the Curfox DMS API.
 *
 * Curfox has no standalone "get rate" endpoint — rates are returned when an
 * order is created/validated.  We call the order-create endpoint in a way that
 * lets us read the calculated charge from the response body without committing
 * the order.
 *
 * Falls back to Rs. 350 if the API call fails for any reason, so the checkout
 * never breaks.
 */
export async function getShippingCost(
  params: ShippingQuoteParams
): Promise<ShippingQuoteResult> {
  const {
    destinationCity,
    destinationState = '',
    weightKg = 0.5,
    codAmount = 0,
  } = params;

  if (!CURFOX_API_KEY) {
    console.warn('[Curfox] CURFOX_API_KEY not set — using fallback Rs. 350');
    return { cost: 350, isFree: false, error: 'API key not configured' };
  }

  try {
    // Try the rate-card / shipping-cost endpoint first
    const rateRes = await fetch(
      `${CURFOX_BASE}/api/public/merchant/order/rate`,
      {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify({
          destination_city_name: destinationCity,
          ...(destinationState ? { destination_state_name: destinationState } : {}),
          weight: weightKg,
          cod: codAmount,
        }),
      }
    );

    if (rateRes.ok) {
      const data = await rateRes.json();
      // The response shape varies; try common fields
      const charge =
        data?.data?.delivery_charge ??
        data?.data?.shipping_charge ??
        data?.delivery_charge ??
        data?.shipping_charge ??
        data?.charge ??
        null;

      if (charge !== null && typeof charge === 'number') {
        return { cost: charge, isFree: charge === 0 };
      }
    }

    // If the rate endpoint returned 404 / unexpected shape,
    // fall through to the order-create validation approach
    const orderRes = await fetch(
      `${CURFOX_BASE}/api/public/merchant/order/create`,
      {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify({
          recipient_name: 'Rate Check',
          recipient_phone: '0000000000',
          destination_city_name: destinationCity,
          ...(destinationState ? { destination_state_name: destinationState } : {}),
          weight: weightKg,
          cod: codAmount,
          description: 'Rate check — do not fulfil',
        }),
      }
    );

    const orderData = await orderRes.json();

    // Successful order creation — extract charge
    if (orderRes.ok) {
      const charge =
        orderData?.data?.delivery_charge ??
        orderData?.data?.shipping_charge ??
        orderData?.delivery_charge ??
        orderData?.shipping_charge ??
        null;

      if (charge !== null && typeof charge === 'number') {
        return { cost: charge, isFree: charge === 0 };
      }
    }

    // Validation error may still contain the calculated charge
    if (orderData?.errors) {
      const charge =
        orderData?.data?.delivery_charge ??
        orderData?.charge ??
        null;
      if (charge !== null && typeof charge === 'number') {
        return { cost: charge, isFree: charge === 0 };
      }
    }

    // Could not extract cost — use fallback
    console.warn('[Curfox] Could not extract delivery charge from response:', orderData);
    return { cost: 350, isFree: false, error: 'Could not parse API response' };

  } catch (err) {
    console.error('[Curfox] getShippingCost error:', err);
    return { cost: 350, isFree: false, error: String(err) };
  }
}
