<script>
  import { supabase } from '$lib/supabase';
  import { goto } from '$app/navigation'; 

  let role = $state('user'); // 'user' | 'operator'
  let fullName = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let loading = $state(false);
  let showPassword = $state(false);
  let showConfirm = $state(false);
  let error= $state('');
  let googleLoading=$state(false);
  function parseError(message) {
  if (message.includes('already registered') || message.includes('User already registered'))
    return 'An account with this email already exists. Try signing in instead.';
  if (message.includes('Password should be at least'))
    return 'Password must be at least 6 characters.';
  if (message.includes('Unable to validate email'))
    return 'Please enter a valid email address.';
  if (message.includes('Email rate limit'))
    return 'Too many attempts. Please wait a few minutes and try again.';
  if (message.includes('Network') || message.includes('fetch'))
    return 'Network error. Please check your connection and try again.';
  return message; // fallback to raw message
}

async function handleSubmit(e) {
  e.preventDefault();
  error = '';

  if (password !== confirmPassword) {
    error = 'Passwords do not match.';
    return;
  }

  if (password.length < 6) {
    error = 'Password must be at least 6 characters.';
    return;
  }

  loading = true;

  try {
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?role=${role}`,
        data: { full_name: fullName, role }
      }
    });

    if (err) {
      error = parseError(err.message);
      return;
    }

    if (data.user) {
      if (data.session) {
        // Session exists = email confirmation is OFF → go straight to dashboard
        if (role === 'operator') goto('/admin');
        else goto('/user/dashboard');
      } else {
        // No session = email confirmation is ON → show confirm page
        goto(`/auth/confirm-email?email=${encodeURIComponent(email)}`);
      }
      // goto(`/auth/confirm-email?email=${encodeURIComponent(email)}`);
    }

  } catch (e) {
    console.error('Signup error:', e);
    error = 'Something went wrong. Please try again.';
  } finally {
    loading = false;
  }
}

async function handleGoogle() {
  error = '';
  googleLoading = true;

  try {
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?role=${role}`,
      }
    });

    if (err) {
      error = parseError(err.message);
      googleLoading = false;
    }
    // no finally here — page will redirect, so we keep spinner going
  } catch (e) {
    error = 'Could not connect to Google. Please try again.';
    googleLoading = false;
  }
}
</script>

<div class="min-h-screen bg-white flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-md">

    <!-- Logo -->
    <div class="mb-8 text-center">
      <a href="/" class="inline-flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 40" fill="none" height="36">
          <rect width="36" height="36" x="0" y="2" rx="8" fill="#4AB565"/>
          <path d="M18 7C14.13 7 11 10.13 11 14c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
          <circle cx="18" cy="14" r="2.5" fill="#4AB565" stroke="none"/>
          <text x="46" y="27" font-family="'Clash Display', Georgia, serif" font-size="20" font-weight="700" letter-spacing="0.3">
            <tspan fill="#0F172A">Voyage</tspan><tspan fill="#4AB565">Roots</tspan>
          </text>
        </svg>
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white border border-base-300 rounded-2xl shadow-sm p-8">

      <!-- Header -->
      <div class="mb-6">
        <h1 class="text-2xl font-semibold text-base-content mb-1"
          style="font-family: 'Clash Display', sans-serif;">
          Create your account
        </h1>
        <p class="text-sm text-base-content/50">
          Join VoyageRoots and start your journey
        </p>
      </div>

      <!-- Role Selector -->
      <div class="grid grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onclick={() => role = 'user'}
          class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
            {role === 'user'
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-base-300 text-base-content/50 hover:border-base-400'}"
        >
          <span class="text-2xl">🧳</span>
          <div class="text-center">
            <p class="text-sm font-semibold">Traveler</p>
            <p class="text-xs opacity-70">Book experiences</p>
          </div>
        </button>

        <button
          type="button"
          onclick={() => role = 'operator'}
          class="flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer
            {role === 'operator'
              ? 'border-secondary bg-secondary/5 text-secondary'
              : 'border-base-300 text-base-content/50 hover:border-base-400'}"
        >
          <span class="text-2xl">🏕️</span>
          <div class="text-center">
            <p class="text-sm font-semibold">Operator</p>
            <p class="text-xs opacity-70">Create & manage</p>
          </div>
        </button>
      </div>

      <!-- Form -->
      <form onsubmit={handleSubmit} class="flex flex-col gap-4">

        <!-- Full Name -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-base-content">Full Name</label>
          <input
            type="text"
            bind:value={fullName}
            placeholder="Arjun Mehta"
            class="input input-bordered w-full bg-white focus:input-primary text-sm"
            required
          />
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-base-content">Email</label>
          <input
            type="email"
            bind:value={email}
            placeholder="you@example.com"
            class="input input-bordered w-full bg-white focus:input-primary text-sm"
            required
          />
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-base-content">Password</label>
          <div class="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              bind:value={password}
              placeholder="Min. 8 characters"
              class="input input-bordered w-full bg-white focus:input-primary text-sm pr-10"
              required
            />
            <button
              type="button"
              onclick={() => showPassword = !showPassword}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60 transition-colors"
            >
              {#if showPassword}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              {:else}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              {/if}
            </button>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="flex flex-col gap-1.5">
          <label class="text-sm font-medium text-base-content">Confirm Password</label>
          <div class="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              bind:value={confirmPassword}
              placeholder="Repeat your password"
              class="input input-bordered w-full bg-white focus:input-primary text-sm pr-10
                {confirmPassword && confirmPassword !== password ? 'input-error' : ''}
                {confirmPassword && confirmPassword === password ? 'input-success' : ''}"
              required
            />
            <button
              type="button"
              onclick={() => showConfirm = !showConfirm}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60 transition-colors"
            >
              {#if showConfirm}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              {:else}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              {/if}
            </button>
          </div>
          {#if confirmPassword && confirmPassword !== password}
            <p class="text-xs text-error">Passwords do not match</p>
          {/if}
        </div>

        <!-- Terms -->
        <label class="flex items-start gap-3 cursor-pointer mt-1">
          <input type="checkbox" class="checkbox checkbox-primary checkbox-sm mt-0.5" required />
          <span class="text-xs text-base-content/50 leading-relaxed">
            I agree to the
            <a href="/terms" class="text-primary hover:underline">Terms of Service</a>
            and
            <a href="/privacy" class="text-primary hover:underline">Privacy Policy</a>
          </span>
        </label>

        {#if error}
          <div class="flex items-start gap-2 bg-error/5 border border-error/20 text-error rounded-xl px-4 py-3 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 flex-shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <span>{error}</span>
          </div>
        {/if}

        <!-- Submit -->
        <button
          type="submit"
          class="btn w-full rounded-xl mt-1 text-sm font-semibold
            {role === 'operator' ? 'btn-secondary' : 'btn-primary'}"
          disabled={loading || googleLoading || (confirmPassword && confirmPassword !== password)}
        >
          {#if loading}
            <span class="loading loading-spinner loading-sm"></span>
            Creating your account...
          {:else}
            {role === 'user' ? '🧳 Create Traveler Account' : '🏕️ Create Operator Account'}
          {/if}
        </button>

        <!-- Divider -->
        <div class="divider text-xs text-base-content/40 my-0">or</div>

        <!-- Google -->
        <button
          type="button"
          onclick={handleGoogle}
          disabled={googleLoading || loading}
          class="btn btn-outline w-full text-sm font-medium gap-2 border-base-300 text-base-content"
        >
          {#if googleLoading}
            <span class="loading loading-spinner loading-sm"></span>
            Connecting to Google...
          {:else}
            <!-- your existing Google SVG -->
            Continue with Google
          {/if}
        </button>

      </form>
    </div>

    <!-- Footer -->
    <p class="text-center text-sm text-base-content/50 mt-6">
      Already have an account?
      <a href="/auth/login" class="text-primary font-semibold hover:underline ml-1">Sign in</a>
    </p>

  </div>
</div>