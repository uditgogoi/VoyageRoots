import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
  const session = locals.session;;
  if (!session) throw redirect(303, '/auth/login');

  const { data: profile } = await locals.supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (profile?.role !== 'operator') throw redirect(303, '/user/dashboard');

  return { session };
};