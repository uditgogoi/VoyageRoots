<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  let mobileOpen = $state(false);
  let dropdownOpen = $state(false);
  let user = $state(null);     // raw Supabase user
  let profile = $state(null);  // { role, full_name } from profiles table
  let ready = $state(false);
  // Load session + profile on mount
  onMount(async () => {
    const currentPath = $page.url.pathname;
  
  // Only fetch profile on /user routes
  if (currentPath.startsWith('/user')) {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      user = session.user;
      await loadProfile(session.user.id);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      user = session?.user ?? null;
      if (user) await loadProfile(user.id);
      else profile = null;
    });

    ready = true;
    return () => subscription.unsubscribe();
  }

  ready = true;
  });

  async function loadProfile(userId) {
    const { data } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();
    profile = data;
  }

  async function handleLogout() {
    await fetch('/auth/logout', { method: 'POST' });
    user = null;
    profile = null;
    dropdownOpen = false;
    goto('/');
  }

  // Close dropdown when clicking outside
  function handleClickOutside(e) {
    if (!e.target.closest('.profile-dropdown')) dropdownOpen = false;
  }

  // Derived
  let isOperator = $derived(
    $page.url.pathname.startsWith('/user') ? profile?.role === 'operator' : false
  );  
  let displayName = $derived(profile?.full_name || user?.email?.split('@')[0] || '?');
  let initials = $derived(displayName.slice(0, 2).toUpperCase());

  const consumerLinks = [
    { label: 'Experiences',  href: '/experiences'  },
    { label: 'Destinations', href: '/destinations' },
    { label: 'About',        href: '/about'        },
  ];

  let navLinks = $derived(isOperator ? [] : consumerLinks);

  
</script>

<svelte:window onclick={handleClickOutside} />
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-base-200">
      <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        <!-- Logo -->
        <a href={isOperator ? '/admin' : '/'} class="flex-shrink-0">
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
        {:else if isOperator}
          <span class="hidden md:block text-xs font-semibold uppercase tracking-widest text-base-content/30">
            Operator Panel
          </span>
        {/if}

        <!-- Right side -->
        <div class="flex items-center gap-2">
        {#if ready}
          {#if user}
            <!-- Profile dropdown -->
            <div class="profile-dropdown relative">
              <button
                onclick={(e) => { e.stopPropagation(); dropdownOpen = !dropdownOpen; }}
                class="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-base-200 bg-white hover:bg-base-100 transition-colors"
              >
                <!-- Avatar -->
                <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {initials}
                </div>
                <!-- Email (desktop only) -->
                <span class="hidden md:block text-sm font-medium text-base-content max-w-[160px] truncate">
                  {user.email}
                </span>
                <!-- Role badge -->
                {#if isOperator}
                  <span class="hidden md:block badge badge-primary badge-xs">Operator</span>
                {/if}
                <!-- Chevron -->
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
                  class="text-base-content/40 transition-transform duration-200 {dropdownOpen ? 'rotate-180' : ''}"
                >
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </button>

              <!-- Dropdown menu -->
              {#if dropdownOpen}
                <div class="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-base-200 shadow-xl py-1.5 z-50 overflow-hidden">

                  <!-- User info header -->
                  <div class="px-4 py-3 border-b border-base-100">
                    <p class="text-xs font-semibold text-base-content truncate">{displayName}</p>
                    <p class="text-xs text-base-content/50 truncate mt-0.5">{user.email}</p>
                  </div>

                  <!-- Menu items -->
                  <div class="py-1">
                    {#if isOperator}
                      <a
                        href="/admin/settings"
                        onclick={() => dropdownOpen = false}
                        class="dropdown-item"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
                        Settings
                      </a>
                    {:else}
                      <a
                        href="/user/profile"
                        onclick={() => dropdownOpen = false}
                        class="dropdown-item"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                        Profile
                      </a>
                    {/if}
                  </div>

                  <!-- Logout -->
                  <div class="border-t border-base-100 py-1">
                    <button onclick={handleLogout} class="dropdown-item text-error w-full">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Sign out
                    </button>
                  </div>

                </div>
              {/if}
            </div>

          {:else}
            <!-- Logged out: show Sign in + Get Started -->
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
              <!-- Mobile user info -->
              <div class="flex items-center gap-3 px-2 pb-2">
                <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {initials}
                </div>
                <div>
                  <p class="text-sm font-semibold text-base-content">{displayName}</p>
                  <p class="text-xs text-base-content/50">{user.email}</p>
                </div>
              </div>
              {#if isOperator}
                <a href="/admin/settings" class="btn btn-outline btn-sm rounded-lg" onclick={() => mobileOpen = false}>Settings</a>
              {:else}
                <a href="/user/profile" class="btn btn-outline btn-sm rounded-lg" onclick={() => mobileOpen = false}>Profile</a>
              {/if}
              <button onclick={handleLogout} class="btn btn-error btn-outline btn-sm rounded-lg">Sign out</button>
            {:else}
              <a href="/auth/login" class="btn btn-outline btn-sm rounded-lg">Sign In</a>
              <a href="/auth/register" class="btn btn-primary btn-sm rounded-lg">Get Started</a>
            {/if}
          </div>
        </div>
      {/if}
    </header>

<style>
  :global(.dropdown-item) {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    color: oklch(var(--bc));
    transition: background 0.15s;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
  }
  :global(.dropdown-item:hover) {
    background: oklch(var(--b2));
  }
  :global(.dropdown-item.text-error) {
    color: oklch(var(--er));
  }
</style>