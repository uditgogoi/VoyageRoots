// export const GET = async ({ url, locals }) => {
//   const code = url.searchParams.get('code');
//   const role = url.searchParams.get('role') ?? 'user';

//   if (code) {
//     const { data, error } = await locals.supabase.auth.exchangeCodeForSession(code);

//     if (!error && data.user) {
//       await locals.supabase
//         .from('profiles')
//         .update({ role })
//         .eq('id', data.user.id);

//       throw redirect(303, role === 'operator' ? '/admin' : '/user/dashboard');
//     }
//   }

//   throw redirect(303, '/auth/login?error=confirmation_failed');
// };

import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals }) => {
  console.log('✅ callback hit');
  console.log('code:', url.searchParams.get('code'));
  console.log('full URL:', url.toString());

  const code = url.searchParams.get('code');
  const role = url.searchParams.get('role') ?? 'user';

   if (code) {
    const { data, error } = await locals.supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      await locals.supabase
        .from('profiles')
        .update({ role })
        .eq('id', data.user.id);

      throw redirect(303, role === 'operator' ? '/admin' : '/user/dashboard');
    }
  }

  throw redirect(303, '/auth/login?error=confirmation_failed');
};
