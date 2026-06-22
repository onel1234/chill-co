import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendDiscountEligibilityEmail } from '@/lib/mail';

export const dynamic = 'force-dynamic';

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Admin Check
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  const isAdminEnv = process.env.ADMIN_EMAILS?.split(',').includes(user.email || '');

  if (!profile?.is_admin && !isAdminEnv) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    // 1. Fetch all loyalty tiers, sorted by required_points DESC
    const { data: tiers, error: tiersError } = await supabase
      .from('loyalty_tiers')
      .select('*')
      .order('required_points', { ascending: false });

    if (tiersError) {
      return NextResponse.json({ error: 'Error fetching tiers: ' + tiersError.message }, { status: 500 });
    }

    if (!tiers || tiers.length === 0) {
      return NextResponse.json({ message: 'No loyalty tiers found', count: 0 }, { status: 200 });
    }

    // 2. Fetch all customers
    const { data: customers, error: customersError } = await supabase
      .from('profiles')
      .select('*');

    if (customersError) {
      return NextResponse.json({ error: 'Error fetching customers: ' + customersError.message }, { status: 500 });
    }

    if (!customers || customers.length === 0) {
      return NextResponse.json({ message: 'No customers found', count: 0 }, { status: 200 });
    }

    let emailsSent = 0;

    // 3. Process each customer
    for (const customer of customers) {
      // Find the highest tier the user qualifies for
      const eligibleTier = tiers.find(tier => customer.loyalty_points >= tier.required_points);

      if (eligibleTier && customer.email) {
        // Send email
        await sendDiscountEligibilityEmail(
          customer.email,
          customer.full_name,
          eligibleTier.name,
          eligibleTier.discount_percentage,
          customer.loyalty_points
        );
        emailsSent++;
      }
    }

    return NextResponse.json({ success: true, count: emailsSent }, { status: 200 });
  } catch (err: any) {
    console.error('Error in mail-discount route:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
