<script>
  let viewMode = $state('grid');
  let searchQuery = $state('');
  let typeFilter = $state('all');
  let statusFilter = $state('all');
  let sortBy = $state('newest');

  const experiences = [
    {
      id: 'EXP001', slug: 'himalayan-base-camp-trek',
      name: 'Himalayan Base Camp Trek',
      type: 'trek', destination: 'Himachal Pradesh',
      date: '2026-04-15', end_date: '2026-04-28',
      cost_per_person: 18500, min_members: 4, max_members: 15,
      members_joined: 11, bookings: 12, revenue: 203500,
      status: 'active', created_at: '2025-12-01',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
    },
    {
      id: 'EXP002', slug: 'ranthambore-tiger-safari',
      name: 'Ranthambore Tiger Safari',
      type: 'outing', destination: 'Rajasthan',
      date: '2026-03-22', end_date: '2026-03-24',
      cost_per_person: 12000, min_members: 2, max_members: 10,
      members_joined: 10, bookings: 8, revenue: 120000,
      status: 'active', created_at: '2025-11-15',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80',
    },
    {
      id: 'EXP003', slug: 'kerala-backwater-stay',
      name: 'Kerala Backwater Stay',
      type: 'stay', destination: 'Kerala',
      date: '2026-05-01', end_date: '2026-05-07',
      cost_per_person: 9500, min_members: 2, max_members: 8,
      members_joined: 3, bookings: 5, revenue: 28500,
      status: 'active', created_at: '2025-11-20',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
    },
    {
      id: 'EXP004', slug: 'ladakh-road-trip',
      name: 'Ladakh Road Trip',
      type: 'tour', destination: 'Ladakh',
      date: '2026-08-05', end_date: '2026-08-14',
      cost_per_person: 22000, min_members: 3, max_members: 12,
      members_joined: 0, bookings: 0, revenue: 0,
      status: 'draft', created_at: '2026-01-10',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    },
    {
      id: 'EXP005', slug: 'goa-water-sports',
      name: 'Goa Water Sports Package',
      type: 'sports', destination: 'Goa',
      date: '2026-03-28', end_date: '2026-03-30',
      cost_per_person: 6500, min_members: 2, max_members: 20,
      members_joined: 14, bookings: 9, revenue: 91000,
      status: 'active', created_at: '2025-10-05',
      image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=600&q=80',
    },
    {
      id: 'EXP006', slug: 'coorg-coffee-trail',
      name: 'Coorg Coffee Trail',
      type: 'tour', destination: 'Karnataka',
      date: '2025-12-15', end_date: '2025-12-18',
      cost_per_person: 8000, min_members: 2, max_members: 10,
      members_joined: 10, bookings: 7, revenue: 80000,
      status: 'completed', created_at: '2025-09-01',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
    },
  ];

  const types = ['all', 'trek', 'tour', 'stay', 'outing', 'sports', 'custom'];
  const statuses = ['all', 'active', 'draft', 'completed', 'cancelled'];

  let filtered = $derived(
    experiences
      .filter(e => typeFilter === 'all' || e.type === typeFilter)
      .filter(e => statusFilter === 'all' || e.status === statusFilter)
      .filter(e =>
        searchQuery === '' ||
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.destination.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'newest')     return new Date(b.created_at) - new Date(a.created_at);
        if (sortBy === 'date_asc')   return new Date(a.date) - new Date(b.date);
        if (sortBy === 'revenue')    return b.revenue - a.revenue;
        if (sortBy === 'members')    return b.members_joined - a.members_joined;
        return 0;
      })
  );

  // Page metrics
  let totalRevenue    = $derived(experiences.reduce((s, e) => s + e.revenue, 0));
  let totalPeople     = $derived(experiences.reduce((s, e) => s + e.members_joined, 0));
  let totalBookings   = $derived(experiences.reduce((s, e) => s + e.bookings, 0));
  let upcomingCount   = $derived(experiences.filter(e => e.status === 'active' && new Date(e.date) > new Date()).length);

  const typeColors = {
    trek: 'badge-primary', tour: 'badge-secondary', stay: 'badge-accent',
    outing: 'badge-warning', sports: 'badge-info', custom: 'badge-neutral',
  };

  const statusConfig = {
    active:    { cls: 'bg-success/10 text-success',    dot: 'bg-success',    label: 'Active'    },
    draft:     { cls: 'bg-base-300 text-base-content/50', dot: 'bg-base-content/30', label: 'Draft' },
    completed: { cls: 'bg-secondary/10 text-secondary', dot: 'bg-secondary', label: 'Completed' },
    cancelled: { cls: 'bg-error/10 text-error',         dot: 'bg-error',     label: 'Cancelled' },
  };

  function daysUntil(dateStr) {
    const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0)  return { label: 'Past', cls: 'text-base-content/40' };
    if (diff === 0) return { label: 'Today!', cls: 'text-error font-bold' };
    if (diff <= 7)  return { label: `In ${diff}d`, cls: 'text-error font-semibold' };
    if (diff <= 30) return { label: `In ${diff}d`, cls: 'text-warning font-semibold' };
    return { label: `In ${diff}d`, cls: 'text-base-content/50' };
  }

  function spotsLeft(e) {
    return e.max_members - e.members_joined;
  }

  function fillPercent(e) {
    return Math.round((e.members_joined / e.max_members) * 100);
  }

  function formatRevenue(n) {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  }

  function typeEmoji(type) {
    return { trek: '🏔️', outing: '🦁', stay: '🏡', tour: '🗺️', sports: '🏄', custom: '✦' }[type] ?? '✦';
  }
</script>

<div class="p-6 min-h-screen bg-base-200">

  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-0.5">Admin</p>
      <h1 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        Experiences
      </h1>
    </div>
    <a href="/admin/experiences/new" class="btn btn-secondary btn-sm rounded-xl gap-2 font-semibold">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 5v14M5 12h14"/>
      </svg>
      New Experience
    </a>
  </div>

  <!-- Metrics -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-2">
        <div class="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-sm">🏔️</div>
        <span class="text-xs text-base-content/40">Total</span>
      </div>
      <p class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">{experiences.length}</p>
      <p class="text-xs text-base-content/40 mt-0.5">Experiences created</p>
    </div>

    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-2">
        <div class="w-8 h-8 rounded-xl bg-warning/10 flex items-center justify-center text-sm">⚡</div>
        <span class="text-xs text-base-content/40">Live</span>
      </div>
      <p class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">{upcomingCount}</p>
      <p class="text-xs text-base-content/40 mt-0.5">Upcoming experiences</p>
    </div>

    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-2">
        <div class="w-8 h-8 rounded-xl bg-secondary/10 flex items-center justify-center text-sm">💚</div>
        <span class="text-xs text-base-content/40">Revenue</span>
      </div>
      <p class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">{formatRevenue(totalRevenue)}</p>
      <p class="text-xs text-base-content/40 mt-0.5">Total earned</p>
    </div>

    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <div class="flex items-center justify-between mb-2">
        <div class="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center text-sm">👥</div>
        <span class="text-xs text-base-content/40">People</span>
      </div>
      <p class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">{totalPeople}</p>
      <p class="text-xs text-base-content/40 mt-0.5">Travelers joined</p>
    </div>
  </div>

  <!-- Upcoming alert -->
  {#each experiences.filter(e => {
    const diff = Math.ceil((new Date(e.date) - new Date()) / (1000 * 60 * 60 * 24));
    return diff > 0 && diff <= 14 && e.status === 'active';
  }) as urgent}
    <div class="bg-warning/5 border border-warning/30 rounded-2xl px-5 py-4 mb-4 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-xl bg-warning/15 flex items-center justify-center text-warning flex-shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-base-content">
            <span class="text-warning">{daysUntil(urgent.date).label}</span>
            &nbsp;— {urgent.name}
          </p>
          <p class="text-xs text-base-content/50">
            {urgent.members_joined}/{urgent.max_members} members joined · {urgent.destination}
          </p>
        </div>
      </div>
      <a href="/admin/experiences/{urgent.id}" class="btn btn-warning btn-xs rounded-xl font-semibold flex-shrink-0">
        Manage →
      </a>
    </div>
  {/each}

  <!-- Filters + View Toggle -->
  <div class="bg-white border border-base-300 rounded-2xl p-4 mb-4">
    <div class="flex flex-wrap items-center gap-3">

      <!-- Search -->
      <div class="flex items-center gap-2 border border-base-300 rounded-xl px-3 py-2 bg-base-100 flex-1 min-w-48">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-base-content/30 flex-shrink-0">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search experiences..."
          class="bg-transparent outline-none text-sm w-full text-base-content placeholder:text-base-content/30"
        />
      </div>

      <!-- Type filter -->
      <select bind:value={typeFilter} class="select select-bordered select-sm bg-white text-sm rounded-xl">
        {#each types as t}
          <option value={t}>{t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}</option>
        {/each}
      </select>

      <!-- Status filter -->
      <select bind:value={statusFilter} class="select select-bordered select-sm bg-white text-sm rounded-xl">
        {#each statuses as s}
          <option value={s}>{s === 'all' ? 'All Status' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
        {/each}
      </select>

      <!-- Sort -->
      <select bind:value={sortBy} class="select select-bordered select-sm bg-white text-sm rounded-xl">
        <option value="newest">Newest First</option>
        <option value="date_asc">By Date</option>
        <option value="revenue">By Revenue</option>
        <option value="members">By Members</option>
      </select>

      <!-- View toggle -->
      <div class="flex items-center gap-1 bg-base-200 rounded-xl p-1 ml-auto">
        <button
          onclick={() => viewMode = 'grid'}
          class="p-2 rounded-lg transition-colors {viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-base-content/40 hover:text-base-content'}"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </button>
        <button
          onclick={() => viewMode = 'list'}
          class="p-2 rounded-lg transition-colors {viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-base-content/40 hover:text-base-content'}"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
        </button>
      </div>

    </div>
  </div>

  <!-- Results count -->
  <p class="text-xs text-base-content/40 mb-4">
    Showing <span class="font-semibold text-base-content">{filtered.length}</span> of {experiences.length} experiences
  </p>

  <!-- ── GRID VIEW ── -->
  {#if viewMode === 'grid'}
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {#each filtered as exp (exp.id)}
        {@const days = daysUntil(exp.date)}
        {@const fill = fillPercent(exp)}
        {@const left = spotsLeft(exp)}

        <div class="bg-white border border-base-300 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">

          <!-- Image -->
          <div class="relative h-44 overflow-hidden">
            <img src={exp.image} alt={exp.name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            <!-- Status badge -->
            <div class="absolute top-3 left-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full {statusConfig[exp.status]?.cls} backdrop-blur-sm">
                <span class="w-1.5 h-1.5 rounded-full {statusConfig[exp.status]?.dot}"></span>
                {statusConfig[exp.status]?.label}
              </span>
            </div>

            <!-- Days until -->
            <div class="absolute top-3 right-3">
              <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-black/40 text-white backdrop-blur-sm">
                {days.label}
              </span>
            </div>

            <!-- Revenue bottom left -->
            <div class="absolute bottom-3 left-3 text-white">
              <p class="text-xs text-white/70">Revenue</p>
              <p class="text-sm font-bold">{formatRevenue(exp.revenue)}</p>
            </div>

            <!-- Type bottom right -->
            <div class="absolute bottom-3 right-3">
              <span class="badge {typeColors[exp.type]} badge-sm capitalize text-sm">{exp.type}</span>
            </div>
          </div>

          <!-- Body -->
          <div class="p-4">
            <h3 class="font-semibold text-base-content text-sm mb-1 leading-snug"
              style="font-family: 'Clash Display', sans-serif;">
              {exp.name}
            </h3>
            <p class="text-xs text-base-content/40 mb-3 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              </svg>
              {exp.destination} ·
              {new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>

            <!-- Members progress -->
            <div class="mb-3">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs text-base-content/50">
                  {exp.members_joined}/{exp.max_members} members joined
                </span>
                <span class="text-xs font-semibold {left === 0 ? 'text-error' : left <= 3 ? 'text-warning' : 'text-base-content/40'}">
                  {left === 0 ? 'Full' : `${left} left`}
                </span>
              </div>
              <div class="w-full h-1.5 bg-base-200 rounded-full overflow-hidden">
                <div
                  class="h-full rounded-full transition-all duration-500
                    {fill >= 100 ? 'bg-error' : fill >= 75 ? 'bg-warning' : 'bg-secondary'}"
                  style="width: {fill}%"
                ></div>
              </div>
            </div>

            <!-- Stats row -->
            <div class="flex items-center justify-between pt-3 border-t border-base-200">
              <div class="flex items-center gap-3 text-xs text-base-content/50">
                <span class="flex items-center gap-1">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  {exp.bookings} bookings
                </span>
                <span>₹{exp.cost_per_person.toLocaleString('en-IN')}/person</span>
              </div>
              <div class="flex gap-1.5">
                <a href="/admin/experiences/{exp.id}"
                  class="btn btn-neutral btn-xs rounded-lg border border-base-300 text-xs">
                  View
                </a>
                <!-- <a href="/admin/experiences/{exp.id}"
                  class="btn btn-primary btn-xs rounded-lg text-xs">
                  Edit
                </a> -->
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

  <!-- ── LIST VIEW ── -->
  {:else}
    <div class="bg-white border border-base-300 rounded-2xl overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-base-200 bg-base-100">
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Experience</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Date</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Members</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Bookings</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Revenue</th>
            <th class="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Status</th>
            <th class="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-base-content/40">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-base-200">
          {#each filtered as exp (exp.id)}
            {@const days = daysUntil(exp.date)}
            {@const fill = fillPercent(exp)}
            {@const left = spotsLeft(exp)}
            <tr class="hover:bg-base-100/80 transition-colors">

              <!-- Experience -->
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={exp.image} alt={exp.name} class="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <p class="font-semibold text-base-content text-sm">{exp.name}</p>
                    <div class="flex items-center gap-2 mt-0.5">
                      <span class="badge {typeColors[exp.type]} badge-xs capitalize">{exp.type}</span>
                      <span class="text-xs text-base-content/40">{exp.destination}</span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Date + countdown -->
              <td class="px-5 py-4">
                <p class="text-sm text-base-content">
                  {new Date(exp.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
                <p class="text-xs {days.cls} mt-0.5">{days.label}</p>
              </td>

              <!-- Members + progress -->
              <td class="px-5 py-4 min-w-36">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs text-base-content/60">{exp.members_joined}/{exp.max_members}</span>
                  <span class="text-xs {left === 0 ? 'text-error' : left <= 3 ? 'text-warning' : 'text-base-content/40'}">
                    {left === 0 ? 'Full' : `${left} left`}
                  </span>
                </div>
                <div class="w-full h-1.5 bg-base-200 rounded-full overflow-hidden">
                  <div
                    class="h-full rounded-full {fill >= 100 ? 'bg-error' : fill >= 75 ? 'bg-warning' : 'bg-secondary'}"
                    style="width: {fill}%"
                  ></div>
                </div>
              </td>

              <!-- Bookings -->
              <td class="px-5 py-4 text-sm text-base-content/70">{exp.bookings}</td>

              <!-- Revenue -->
              <td class="px-5 py-4 font-semibold text-base-content">{formatRevenue(exp.revenue)}</td>

              <!-- Status -->
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full {statusConfig[exp.status]?.cls}">
                  <span class="w-1.5 h-1.5 rounded-full {statusConfig[exp.status]?.dot}"></span>
                  {statusConfig[exp.status]?.label}
                </span>
              </td>

              <!-- Actions -->
              <td class="px-5 py-4">
                <div class="flex justify-end gap-1.5">
                  <a href="/admin/experiences/{exp.id}" class="btn btn-neutral btn-xs rounded-lg border border-base-300 text-xs">View</a>
                  <!-- <a href="/admin/experiences/{exp.id}/edit" class="btn btn-primary btn-xs rounded-lg text-xs">Edit</a> -->
                </div>
              </td>

            </tr>
          {/each}
        </tbody>
      </table>

      {#if filtered.length === 0}
        <div class="py-20 flex flex-col items-center justify-center text-center">
          <div class="text-4xl mb-3">🏔️</div>
          <p class="font-semibold text-base-content mb-1" style="font-family: 'Clash Display', sans-serif;">No experiences found</p>
          <p class="text-sm text-base-content/40 mb-4">Try adjusting your search or filters</p>
          <a href="/admin/experiences/new" class="btn btn-primary btn-sm rounded-xl">Create one →</a>
        </div>
      {/if}
    </div>
  {/if}

  <!-- Empty state for grid -->
  {#if viewMode === 'grid' && filtered.length === 0}
    <div class="bg-white border border-base-300 rounded-2xl py-20 flex flex-col items-center justify-center text-center">
      <div class="text-4xl mb-3">🏔️</div>
      <p class="font-semibold text-base-content mb-1" style="font-family: 'Clash Display', sans-serif;">No experiences found</p>
      <p class="text-sm text-base-content/40 mb-4">Try adjusting your filters or create a new one</p>
      <a href="/admin/experiences/new" class="btn btn-primary btn-sm rounded-xl">Create Experience →</a>
    </div>
  {/if}

</div>