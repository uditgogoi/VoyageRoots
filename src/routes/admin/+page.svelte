<script>
  let metricPeriod = $state('this_month');

  const periodOptions = [
    { value: 'this_month',    label: 'This Month' },
    { value: 'last_6_months', label: 'Last 6 Months' },
    { value: 'this_year',     label: 'This Year' },
    { value: 'custom',        label: 'Custom' },
  ];

  let customFrom = $state('');
  let customTo   = $state('');

  const metricsData = {
    this_month:    { trips: 8,  revenue: 142000,  people: 64  },
    last_6_months: { trips: 47, revenue: 890000,  people: 312 },
    this_year:     { trips: 89, revenue: 1640000, people: 621 },
    custom:        { trips: 12, revenue: 220000,  people: 94  },
  };

  let metrics = $derived(metricsData[metricPeriod] ?? metricsData.this_month);

  const upcomingTrips = [
    { id: 1, name: 'Himalayan Base Camp Trek', date: 'Mar 15, 2025', members: 8,  destination: 'Himachal Pradesh', type: 'trek',   status: 'confirmed' },
    { id: 2, name: 'Ranthambore Tiger Safari', date: 'Mar 22, 2025', members: 4,  destination: 'Rajasthan',        type: 'outing', status: 'confirmed' },
    { id: 3, name: 'Kerala Backwater Stay',    date: 'Apr 1, 2025',  members: 6,  destination: 'Kerala',           type: 'stay',   status: 'pending'   },
    { id: 4, name: 'Ladakh Road Trip',         date: 'Apr 12, 2025', members: 5,  destination: 'Ladakh',           type: 'tour',   status: 'confirmed' },
    { id: 5, name: 'Coorg Coffee Trail',       date: 'Apr 20, 2025', members: 10, destination: 'Karnataka',        type: 'tour',   status: 'pending'   },
  ];

  const recentBookings = [
    { id: 'BK001', user: 'Priya Sharma', experience: 'Himalayan Trek',   date: 'Feb 20', members: 4, amount: 74000,  status: 'confirmed' },
    { id: 'BK002', user: 'Rahul Verma',  experience: 'Kerala Stay',      date: 'Feb 19', members: 2, amount: 19000,  status: 'confirmed' },
    { id: 'BK003', user: 'Ananya Nair',  experience: 'Ranthambore',      date: 'Feb 18', members: 3, amount: 36000,  status: 'pending'   },
    { id: 'BK004', user: 'Karan Mehta',  experience: 'Ladakh Road Trip', date: 'Feb 17', members: 5, amount: 110000, status: 'confirmed' },
    { id: 'BK005', user: 'Sneha Iyer',   experience: 'Coorg Trail',      date: 'Feb 16', members: 2, amount: 16000,  status: 'cancelled' },
  ];

  const statusColors = {
    confirmed: 'badge-success/30 badge-success',
    pending:   'badge-warning/30 badge-warning',
    cancelled: 'badge-error',
  };

  function formatCurrency(n) {
    if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`;
    if (n >= 1000)   return `₹${(n / 1000).toFixed(0)}K`;
    return `₹${n}`;
  }

  function tripEmoji(type) {
    return { trek: '🏔️', outing: '🦁', stay: '🏡', tour: '🗺️', sports: '🏄' }[type] ?? '✦';
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-base-200 via-base-100 to-base-200 p-8">

  <!-- Top Bar -->
  <div class="flex items-center justify-between mb-7">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-0.5">Welcome back</p>
      <h1 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        Dashboard
      </h1>
    </div>
    <a href="/admin/experiences/new" class="btn btn-outline btn-secondary btn-sm rounded-xl gap-2 font-semibold">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 5v14M5 12h14"/>
      </svg>
      New Experience
    </a>
  </div>

    <!-- ── METRICS ── -->
    <div class="mb-8">

    <!-- Header + Filters -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
        <h2 class="text-lg font-semibold text-base-content"
            style="font-family: 'Clash Display', sans-serif;">
            Performance Overview
        </h2>
        <p class="text-xs text-base-content/50">
            Track growth & performance
        </p>
        </div>

        <div class="flex items-center gap-2 flex-wrap">
        {#each periodOptions as opt}
            <button
            onclick={() => metricPeriod = opt.value}
            class="px-4 py-1.5 rounded-full text-xs font-medium transition-all
            {metricPeriod === opt.value
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}"
            >
            {opt.label}
            </button>
        {/each}
        </div>
    </div>

    {#if metricPeriod === 'custom'}
        <div class="flex items-center gap-3 mb-6 flex-wrap">
        <input type="date" bind:value={customFrom}
            class="input input-bordered input-sm rounded-lg bg-white" />
        <span class="text-gray-400 text-sm">to</span>
        <input type="date" bind:value={customTo}
            class="input input-bordered input-sm rounded-lg bg-white" />
        <button class="btn btn-primary btn-sm rounded-lg">Apply</button>
        </div>
    {/if}

    <!-- Metric Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <!-- Trips -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            🏔️
            </div>
            <span class="text-xs text-gray-400">Total Trips</span>
        </div>

        <p class="text-4xl font-bold text-gray-800 mb-1"
            style="font-family: 'Clash Display', sans-serif;">
            {metrics.trips}
        </p>

        <p class="text-xs text-gray-500">Experiences completed</p>
        </div>

        <!-- Revenue -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
            💰
            </div>
            <span class="text-xs text-gray-400">Revenue</span>
        </div>

        <p class="text-4xl font-bold text-gray-800 mb-1"
            style="font-family: 'Clash Display', sans-serif;">
            {formatCurrency(metrics.revenue)}
        </p>

        <p class="text-xs text-gray-500">Total earned</p>
        </div>

        <!-- People -->
        <div class="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
        <div class="flex items-center justify-between mb-4">
            <div class="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            👥
            </div>
            <span class="text-xs text-gray-400">Travelers</span>
        </div>

        <p class="text-4xl font-bold text-gray-800 mb-1"
            style="font-family: 'Clash Display', sans-serif;">
            {metrics.people}
        </p>

        <p class="text-xs text-gray-500">People reached</p>
        </div>

    </div>
    </div>

  <!-- ── UPCOMING + QUICK ACTIONS ── -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">

    <!-- Upcoming Trips -->
    <div class="lg:col-span-2 bg-white border border-base-300 rounded-2xl p-6">
      <div class="flex items-center justify-between mb-5">
        <h2 class="text-sm font-semibold text-base-content" style="font-family: 'Clash Display', sans-serif;">Upcoming Trips</h2>
        <a href="/admin/bookings" class="text-xs text-primary hover:underline font-medium">View all →</a>
      </div>
      <div class="flex flex-col gap-2">
        {#each upcomingTrips as trip}
          <div class="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors">
            <div class="w-9 h-9 rounded-xl bg-base-200 flex items-center justify-center flex-shrink-0 text-lg">
              {tripEmoji(trip.type)}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-base-content truncate">{trip.name}</p>
              <p class="text-xs text-base-content/40">{trip.destination} · {trip.date}</p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <span class="text-xs text-base-content/50 flex items-center gap-1">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
                {trip.members}
              </span>
              <span class="badge badge-outline {statusColors[trip.status]} badge-small capitalize text-white">{trip.status}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white border border-base-300 rounded-2xl p-6">
      <h2 class="text-sm font-semibold text-base-content mb-5" style="font-family: 'Clash Display', sans-serif;">Quick Actions</h2>
      <div class="flex flex-col gap-2">
        {#each [
          { href: '/admin/experiences/new', label: 'New Experience',   color: 'primary',   icon: '<path d="M12 5v14M5 12h14"/>' },
          { href: '/admin/bookings',        label: 'Manage Bookings',  color: 'secondary', icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
          { href: '/admin/groups',          label: 'Manage Groups',    color: 'accent',    icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>' },
          { href: '/admin/chat',            label: 'View Messages',    color: 'warning',   icon: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>' },
        ] as action}
          <a href={action.href}
            class="flex items-center gap-3 p-3 rounded-xl border border-base-200 hover:border-{action.color}/30 hover:bg-{action.color}/5 transition-all group">
            <div class="w-8 h-8 rounded-lg bg-{action.color}/10 flex items-center justify-center text-{action.color} transition-colors flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                {@html action.icon}
              </svg>
            </div>
            <span class="text-sm font-medium text-base-content">{action.label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-auto text-base-content/20 group-hover:text-base-content/50 transition-colors">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </a>
        {/each}
      </div>
    </div>
  </div>

  <!-- ── RECENT BOOKINGS TABLE ── -->
  <div class="bg-white border border-base-300 rounded-2xl p-6">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-sm font-semibold text-base-content" style="font-family: 'Clash Display', sans-serif;">Recent Bookings</h2>
      <a href="/admin/bookings" class="text-xs text-primary hover:underline font-medium">View all →</a>
    </div>
    <div class="overflow-x-auto">
      <table class="table table-sm w-full">
        <thead>
          <tr class="border-base-200">
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">ID</th>
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">Traveler</th>
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">Experience</th>
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">Date</th>
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">Members</th>
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">Amount</th>
            <th class="text-xs font-semibold uppercase tracking-wider text-base-content/40 bg-transparent">Status</th>
          </tr>
        </thead>
        <tbody>
          {#each recentBookings as b}
            <tr class="border-base-200 hover:bg-base-200 transition-colors">
              <td class="text-xs font-mono text-base-content/40">{b.id}</td>
              <td class="text-sm font-medium text-base-content">{b.user}</td>
              <td class="text-sm text-base-content/60">{b.experience}</td>
              <td class="text-xs text-base-content/40">{b.date}</td>
              <td class="text-sm text-center text-base-content/60">{b.members}</td>
              <td class="text-sm font-semibold text-base-content">₹{b.amount.toLocaleString('en-IN')}</td>
              <td><span class="badge badge-outline {statusColors[b.status]} badge-sm capitalize">{b.status}</span></td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

</div>