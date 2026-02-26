<script>
  import { supabase } from '$lib/supabase';
  import { page } from '$app/stores';
  let resent = $state(false);
  let loading = $state(false);

  // Get email from the session (user just signed up)
  let email = $state($page.url.searchParams.get('email') ?? '');

  async function resendEmail() {
    loading = true;
    await supabase.auth.resend({ type: 'signup', email });
    resent = true;
    loading = false;
  }
</script>

<div class="min-h-screen bg-[#F8FAF8] flex items-center justify-center px-4">
  <div class="w-full max-w-md">

    <!-- Logo -->
    <div class="mb-8 text-center">
      <a href="/" class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 40" fill="none" height="36">
          <rect width="36" height="36" x="0" y="2" rx="8" fill="#4AB565"/>
          <path d="M18 7C14.13 7 11 10.13 11 14c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
          <circle cx="18" cy="14" r="2.5" fill="#4AB565" stroke="none"/>
          <text x="46" y="27" font-family="Georgia, serif" font-size="20" font-weight="700" letter-spacing="0.3">
            <tspan fill="#0F172A">Voyage</tspan><tspan fill="#4AB565">Roots</tspan>
          </text>
        </svg>
      </a>
    </div>

    <div class="bg-white border border-base-200 rounded-2xl shadow-sm p-8 text-center">

      <!-- Icon -->
      <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4AB565" stroke-width="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      </div>

      <h1 class="text-2xl font-bold text-base-content mb-2" style="font-family: Georgia, serif;">
        Check your inbox
      </h1>
      <p class="text-sm text-base-content/50 mb-6 leading-relaxed">
        We've sent a confirmation link to <br/>
        <span class="font-semibold text-base-content">{email || 'your email address'}</span>.<br/>
        Click the link to activate your account.
      </p>

      {#if resent}
        <div class="alert alert-success rounded-xl mb-4 text-sm py-2">
          ✓ Confirmation email resent!
        </div>
      {/if}

      <button
        onclick={resendEmail}
        disabled={loading || resent}
        class="btn btn-outline btn-sm rounded-xl w-full text-sm"
      >
        {#if loading}
          <span class="loading loading-spinner loading-xs"></span>
        {:else if resent}
          Email sent ✓
        {:else}
          Resend confirmation email
        {/if}
      </button>

      <p class="text-xs text-base-content/40 mt-6">
        Wrong email? <a href="/auth/register" class="text-primary hover:underline">Sign up again</a>
      </p>
    </div>

  </div>
</div>