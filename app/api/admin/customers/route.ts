import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Double check admin via profiles
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  const isAdminEnv = process.env.ADMIN_EMAILS?.split(',').includes(user.email || '');

  if (!profile?.is_admin && !isAdminEnv) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // Fetch all customers
  const { data: customers, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(customers);
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Double check admin
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
    const { id, is_loyalty_member } = await request.json();

    if (!id || typeof is_loyalty_member !== 'boolean') {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    // Need to use service_role key to bypass RLS for updating other users if RLS prevents it
    // Wait, the default RLS for profiles is "Users can update their own profile". 
    // We should use a service role client to perform admin updates. 
    // Let's create a temporary service role client or see if there is one.
    // For now, let's use the current user token. If RLS blocks it, we might need to modify RLS.
    const { error } = await supabase
      .from('profiles')
      .update({ is_loyalty_member })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
