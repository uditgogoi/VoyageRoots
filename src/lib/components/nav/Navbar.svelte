<script>
  import { page } from '$app/stores';

  let mobileOpen = $state(false);

  // TODO: replace with real Supabase session
  // e.g. import { user } from '$lib/stores/auth';
  // For now mock with: null = logged out, role = 'user' | 'admin'
  let user = $state(null); // null | { name: string, role: 'user' | 'admin' }

  // Consumer-only links — admin doesn't need these, has sidebar
  const consumerLinks = [
    { label: 'Experiences',  href: '/experiences'  },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About',        href: '/about'        },
  ];

  let navLinks = $derived(
    user?.role === 'admin' ? [] : consumerLinks
  );

  let isAdmin = $derived(user?.role === 'admin');
</script>

<header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-base-200">
  <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

    <!-- Logo -->
    <a href={isAdmin ? '/admin' : '/'} class="flex-shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 40" fill="none" height="34">
        <rect width="36" height="36" x="0" y="2" rx="8" fill="#4AB565"/>
        <path d="M18 7C14.13 7 11 10.13 11 14c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="white"/>
        <circle cx="18" cy="14" r="2.5" fill="#4AB565" stroke="none"/>
        <text x="46" y="27" font-family="'Clash Display', Georgia, serif" font-size="20" font-weight="700" letter-spacing="0.3">
          <tspan fill="#0F172A">Voyage</tspan><tspan fill="#4AB565">Roots</tspan>
        </text>
      </svg>
    </a>

    <!-- Desktop Nav — consumer only -->
    {#if navLinks.length > 0}
      <nav class="hidden md:flex items-center gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            class="px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150
              {$page.url.pathname.startsWith(link.href)
                ? 'text-primary bg-primary/8'
                : 'text-base-content/60 hover:text-base-content hover:bg-base-200'}"
          >
            {link.label}
          </a>
        {/each}
      </nav>
    {:else if isAdmin}
      <!-- Admin: subtle label instead of nav links -->
      <span class="hidden md:block text-xs font-semibold uppercase tracking-widest text-base-content/30">
        Admin Panel
      </span>
    {/if}

    <!-- Right side -->
    <div class="flex items-center gap-2">

      {#if user}
        {#if isAdmin}
          <a
            href="/admin"
            class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-base-300 bg-white hover:bg-base-100 transition-colors"
          >
            <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              {user.name?.[0] ?? 'A'}
            </div>
            <span class="text-xs font-semibold text-base-content">{user.name}</span>
            <span class="badge badge-primary badge-xs ml-0.5">Admin</span>
          </a>
        {:else}
          <a href="/dashboard" class="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-base-200 transition-colors">
            <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
              {user.name?.[0] ?? 'U'}
            </div>
            <span class="text-sm font-medium text-base-content">{user.name}</span>
          </a>
        {/if}
      {:else}
        <a
          href="/auth/login"
          class="hidden md:block text-sm font-medium text-base-content/60 hover:text-base-content px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
        >
          Sign in
        </a>
        <a href="/auth/register" class="btn btn-primary btn-sm rounded-lg text-sm font-semibold px-4 hidden md:flex">
          Get Started
        </a>
      {/if}

      <!-- Mobile toggle -->
      <button
        class="md:hidden btn btn-ghost btn-sm btn-square"
        onclick={() => mobileOpen = !mobileOpen}
        aria-label="Toggle menu"
      >
        {#if mobileOpen}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        {:else}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        {/if}
      </button>
    </div>

  </div>

  <!-- Mobile Menu -->
  {#if mobileOpen}
    <div class="md:hidden border-t border-base-200 bg-white px-4 py-3 flex flex-col gap-1">

      <!-- Consumer links only -->
      {#each navLinks as link}
        <a
          href={link.href}
          onclick={() => mobileOpen = false}
          class="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
            {$page.url.pathname.startsWith(link.href)
              ? 'text-primary bg-primary/8'
              : 'text-base-content/70 hover:text-base-content hover:bg-base-200'}"
        >
          {link.label}
        </a>
      {/each}

      <div class="border-t border-base-200 mt-2 pt-3 flex flex-col gap-2">
        {#if user}
          {#if isAdmin}
            <a href="/admin" class="btn btn-primary btn-sm rounded-lg" onclick={() => mobileOpen = false}>
              Admin Panel
            </a>
          {:else}
            <a href="/dashboard" class="btn btn-outline btn-sm rounded-lg" onclick={() => mobileOpen = false}>
              My Dashboard
            </a>
          {/if}
        {:else}
          <a href="/auth/login" class="btn btn-outline btn-sm rounded-lg">Sign In</a>
          <a href="/auth/register" class="btn btn-primary btn-sm rounded-lg">Get Started</a>
        {/if}
      </div>
    </div>
  {/if}
</header>