import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const session = locals.session;
  if (!session) throw redirect(303, '/auth/login');
  const { data: profile } = await locals.supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (profile?.role !== 'user') throw redirect(303, '/admin');

  return { session };
};