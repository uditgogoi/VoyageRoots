<script>
  let email = $state('');
  let password = $state('');
  let loading = $state(false);

  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;
    // TODO: connect Supabase auth here
    await new Promise(r => setTimeout(r, 1500));
    loading = false;
  }
</script>

<div class="min-h-screen bg-white flex items-center justify-center px-4 py-12">
  <div class="w-full max-w-md">

    <!-- Logo -->
    <div class="mb-10 text-center">
      <a href="/" class="inline-flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            <circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/>
          </svg>
        </div>
        <span class="font-bold text-xl text-base-content" style="font-family: 'Clash Display', sans-serif;">
          VoyageRoots
        </span>
      </a>
    </div>

    <!-- Card -->
    <div class="bg-white border border-base-300 rounded-2xl shadow-sm p-8">

      <!-- Header -->
      <div class="mb-7">
        <h1 class="text-2xl font-semibold text-base-content mb-1"
          style="font-family: 'Clash Display', sans-serif;">
          Welcome back
        </h1>
        <p class="text-sm text-base-content/50">
          Sign in to continue your journey
        </p>
      </div>

      <!-- Form -->
      <form onsubmit={handleSubmit} class="flex flex-col gap-4">

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

        <div class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-base-content">Password</label>
            <a href="/auth/forgot" class="text-xs text-primary hover:underline">
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            bind:value={password}
            placeholder="••••••••"
            class="input input-bordered w-full bg-white focus:input-primary text-sm"
            required
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="btn btn-primary w-full mt-1 text-sm font-semibold"
          disabled={loading}
        >
          {#if loading}
            <span class="loading loading-spinner loading-sm"></span>
          {:else}
            Sign In
          {/if}
        </button>

        <!-- Divider -->
        <div class="divider text-xs text-base-content/40 my-0">or</div>

        <!-- Google -->
        <button type="button" class="btn btn-outline w-full text-sm font-medium gap-2 border-base-300 text-base-content">
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
      Don't have an account?
      <a href="/auth/register" class="text-primary font-semibold hover:underline ml-1">
        Sign up
      </a>
    </p>

  </div>
</div>