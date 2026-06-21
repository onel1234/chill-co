import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ isAdmin: false });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin = !!profile?.is_admin || adminEmails.includes(user.email.toLowerCase());

  // Sync is_admin to the database so RLS policies work
  if (isAdmin && !profile?.is_admin) {
    await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', user.id);
  }

  return NextResponse.json({ isAdmin });
}
