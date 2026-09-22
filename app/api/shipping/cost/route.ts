import { NextResponse } from 'next/server';
import { getShippingCost } from '@/lib/curfox';

/**
 * GET /api/shipping/cost?city=Kandy&state=Central+Province&weight=0.5&cod=2500
 *
 * Returns the Royal Express shipping charge for a given destination.
 * Falls back to Rs. 350 until Royal Express provides a valid API token.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const city = searchParams.get('city')?.trim();
  const state = searchParams.get('state')?.trim() || '';
  const weight = parseFloat(searchParams.get('weight') || '0.5');
  const cod = parseFloat(searchParams.get('cod') || '0');

  if (!city) {
    return NextResponse.json({ error: 'city is required' }, { status: 400 });
  }

  const result = await getShippingCost({
    destinationCity: city,
    destinationState: state,
    weightKg: isNaN(weight) ? 0.5 : weight,
    codAmount: isNaN(cod) ? 0 : cod,
  });

  return NextResponse.json(result);
}
