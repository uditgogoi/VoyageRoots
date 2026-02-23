<script>
  import { page } from '$app/state';

  let collapsed = $state(false);

  const navItems = [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard', href: '/admin', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>` },
      ]
    },
    {
      group: 'Manage',
      items: [
        { label: 'Experiences', href: '/admin/experiences', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>` },
        { label: 'Bookings', href: '/admin/bookings', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>` },
        { label: 'Groups', href: '/admin/groups', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>` },
        { label: 'Chat', href: '/admin/chat', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>` },
      ]
    },
    {
      group: 'Account',
      items: [
        { label: 'Settings', href: '/admin/settings', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>` },
        { label: 'Profile', href: '/admin/profile', icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>` },
      ]
    }
  ];

  function isActive(href) {
    if (href === '/admin') return page.url.pathname === '/admin';
    return page.url.pathname.startsWith(href);
  }
</script>

<aside
  class="h-screen flex flex-col bg-neutral text-neutral-content transition-all duration-300 flex-shrink-0"
  style="width: {collapsed ? '64px' : '220px'};"
>
  <!-- Logo -->
  <div class="flex items-center gap-3 px-4 py-5 border-b border-white/10 overflow-hidden">
    <div class="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
        <circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/>
      </svg>
    </div>
    {#if !collapsed}
      <span class="font-bold text-white text-sm whitespace-nowrap"
        style="font-family: 'Clash Display', sans-serif;">
        VoyageRoots
      </span>
    {/if}
  </div>

  <!-- Nav -->
  <nav class="flex-1 py-4 overflow-y-auto overflow-x-hidden">
    {#each navItems as group}
      <div class="mb-4">
        {#if !collapsed}
          <p class="text-xs font-semibold uppercase tracking-widest text-white/30 px-4 mb-1">
            {group.group}
          </p>
        {/if}
        {#each group.items as item}
          <a
            href={item.href}
            class="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl transition-all duration-150 no-underline
              {isActive(item.href)
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white hover:bg-white/5'}"
            title={collapsed ? item.label : ''}
          >
            <span class="flex-shrink-0 {isActive(item.href) ? 'text-secondary' : ''}">
              {@html item.icon}
            </span>
            {#if !collapsed}
              <span class="text-sm font-medium whitespace-nowrap">{item.label}</span>
            {/if}
            {#if !collapsed && isActive(item.href)}
              <span class="ml-auto w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
            {/if}
          </a>
        {/each}
      </div>
    {/each}
  </nav>

  <!-- Bottom -->
  <div class="border-t border-white/10 p-3 flex flex-col gap-2">
    {#if !collapsed}
      <div class="flex items-center gap-2 px-2 py-2 rounded-xl bg-white/5">
        <div class="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">A</div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold text-white truncate">Admin</p>
          <p class="text-xs text-white/40 truncate">admin@voyageroots.in</p>
        </div>
      </div>
    {/if}
    <button
      onclick={() => collapsed = !collapsed}
      class="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        class="transition-transform duration-300 {collapsed ? 'rotate-180' : ''}">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
      {#if !collapsed}<span class="text-xs">Collapse</span>{/if}
    </button>
  </div>
</aside>