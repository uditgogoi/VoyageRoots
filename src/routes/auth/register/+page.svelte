<script>
  let role = $state('user'); // 'user' | 'operator'
  let fullName = $state('');
  let email = $state('');
  let password = $state('');
  let confirmPassword = $state('');
  let loading = $state(false);
  let showPassword = $state(false);
  let showConfirm = $state(false);

  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;
    // TODO: connect Supabase auth
    // Pass role to profiles table on signup
    await new Promise(r => setTimeout(r, 1500));
    loading = false;
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

        <!-- Submit -->
        <button
          type="submit"
          class="btn w-full rounded-xl mt-1 text-sm font-semibold
            {role === 'operator' ? 'btn-secondary' : 'btn-primary'}"
          disabled={loading || (confirmPassword && confirmPassword !== password)}
        >
          {#if loading}
            <span class="loading loading-spinner loading-sm"></span>
          {:else}
            {role === 'user' ? '🧳 Create Traveler Account' : '🏕️ Create Operator Account'}
          {/if}
        </button>

        <!-- Divider -->
        <div class="divider text-xs text-base-content/40 my-0">or</div>

        <!-- Google -->
        <button
          type="button"
          class="btn btn-outline w-full text-sm font-medium gap-2 border-base-300 text-base-content"
        >
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
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