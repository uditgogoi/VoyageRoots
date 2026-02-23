<script>
  let activeTab = $state('upcoming');
  let searchQuery = $state('');
  let statusFilter = $state('all');
  let typeFilter = $state('all');
  let sortBy = $state('date_desc');

  const bookings = [
    { id: '#BK1021', customer: 'Arjun Mehta',  avatar: 'AM', title: 'Sunset Desert Safari',    type: 'Experience', date: '2026-03-15', price: 2999,  status: 'Confirmed', upcoming: true  },
    { id: '#BK1022', customer: 'Riya Kapoor',  avatar: 'RK', title: 'Luxury Kerala Retreat',   type: 'Trip',       date: '2026-04-10', price: 18999, status: 'Pending',   upcoming: true  },
    { id: '#BK1023', customer: 'Sneha Iyer',   avatar: 'SI', title: 'Himalayan Base Trek',      type: 'Trip',       date: '2026-05-01', price: 14500, status: 'Confirmed', upcoming: true  },
    { id: '#BK1024', customer: 'Karan Mehta',  avatar: 'KM', title: 'Goa Water Sports',        type: 'Experience', date: '2026-03-28', price: 6500,  status: 'Pending',   upcoming: true  },
    { id: '#BK1025', customer: 'Nisha Sharma', avatar: 'NS', title: 'Coorg Coffee Trail',       type: 'Trip',       date: '2026-06-10', price: 8000,  status: 'Confirmed', upcoming: true  },
    { id: '#BK1018', customer: 'Vikram Shah',  avatar: 'VS', title: 'Himalayan Adventure',      type: 'Trip',       date: '2025-12-01', price: 14999, status: 'Completed', upcoming: false },
    { id: '#BK1017', customer: 'Pooja Nair',   avatar: 'PN', title: 'Ranthambore Safari',       type: 'Experience', date: '2025-11-15', price: 12000, status: 'Completed', upcoming: false },
    { id: '#BK1016', customer: 'Rohit Das',    avatar: 'RD', title: 'Kerala Backwater Stay',    type: 'Trip',       date: '2025-10-20', price: 9500,  status: 'Cancelled', upcoming: false },
    { id: '#BK1015', customer: 'Meena Joshi',  avatar: 'MJ', title: 'Ladakh Road Trip',         type: 'Trip',       date: '2025-09-05', price: 22000, status: 'Completed', upcoming: false },
  ];

  let filtered = $derived(
    bookings
      .filter(b => activeTab === 'upcoming' ? b.upcoming : !b.upcoming)
      .filter(b => statusFilter === 'all' || b.status.toLowerCase() === statusFilter)
      .filter(b => typeFilter === 'all' || b.type.toLowerCase() === typeFilter)
      .filter(b =>
        searchQuery === '' ||
        b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date_desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date_asc')  return new Date(a.date) - new Date(b.date);
        if (sortBy === 'price_desc') return b.price - a.price;
        if (sortBy === 'price_asc')  return a.price - b.price;
        return 0;
      })
  );

  let totalRevenue = $derived(filtered.reduce((s, b) => s + b.price, 0));
  let nextTrip = $derived(
    bookings
      .filter(b => b.upcoming && b.status !== 'Cancelled')
      .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
  );

  const statusConfig = {
    Confirmed: { cls: 'bg-success/10 text-success',   dot: 'bg-success'  },
    Pending:   { cls: 'bg-warning/10 text-warning',   dot: 'bg-warning'  },
    Completed: { cls: 'bg-secondary/10 text-secondary', dot: 'bg-secondary' },
    Cancelled: { cls: 'bg-error/10 text-error',        dot: 'bg-error'    },
  };

  function clearFilters() {
    searchQuery = '';
    statusFilter = 'all';
    typeFilter = 'all';
    sortBy = 'date_desc';
  }

  let hasFilters = $derived(
    searchQuery !== '' || statusFilter !== 'all' || typeFilter !== 'all'
  );
</script>

<div class="p-6 min-h-screen bg-base-200">

  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <p class="text-xs font-semibold uppercase tracking-widest text-base-content/40 mb-0.5">Admin</p>
      <h1 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        Bookings
      </h1>
    </div>
    <button class="btn btn-primary btn-sm rounded-xl gap-2 font-semibold">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M12 5v14M5 12h14"/>
      </svg>
      New Booking
    </button>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <p class="text-xs text-base-content/40 mb-1">Total Bookings</p>
      <p class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        {filtered.length}
      </p>
      <p class="text-xs text-base-content/40 mt-0.5">in current view</p>
    </div>
    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <p class="text-xs text-base-content/40 mb-1">Revenue</p>
      <p class="text-2xl font-bold text-secondary" style="font-family: 'Clash Display', sans-serif;">
        ₹{totalRevenue.toLocaleString('en-IN')}
      </p>
      <p class="text-xs text-base-content/40 mt-0.5">in current view</p>
    </div>
    <div class="bg-white border border-base-300 rounded-2xl p-5">
      <p class="text-xs text-base-content/40 mb-1">Next Upcoming Trip</p>
      <p class="text-lg font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        {nextTrip ? new Date(nextTrip.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
      </p>
      <p class="text-xs text-base-content/40 mt-0.5">{nextTrip?.title ?? 'No upcoming trips'}</p>
    </div>
  </div>

  <!-- Main Card -->
  <div class="bg-white border border-base-300 rounded-2xl overflow-hidden">

    <!-- Tabs + Search + Filters -->
    <div class="p-5 border-b border-base-200 flex flex-wrap items-center gap-4">

      <!-- Toggle tabs -->
      <div class="relative inline-flex bg-base-200 rounded-full p-1 flex-shrink-0">
        <div
          class="absolute top-1 bottom-1 w-1/2 bg-white rounded-full shadow-sm transition-all duration-300"
          style="left: {activeTab === 'upcoming' ? '4px' : '50%'};"
        ></div>
        <button
          onclick={() => activeTab = 'upcoming'}
          class="relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200
            {activeTab === 'upcoming' ? 'text-primary' : 'text-base-content/50'}"
        >
          Upcoming
          <span class="ml-1.5 text-xs font-bold">
            {bookings.filter(b => b.upcoming).length}
          </span>
        </button>
        <button
          onclick={() => activeTab = 'past'}
          class="relative z-10 px-5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200
            {activeTab === 'past' ? 'text-primary' : 'text-base-content/50'}"
        >
          Past
          <span class="ml-1.5 text-xs font-bold">
            {bookings.filter(b => !b.upcoming).length}
          </span>
        </button>
      </div>

      <!-- Search -->
      <div class="flex items-center gap-2 border border-base-300 rounded-xl px-3 py-2 bg-base-100 flex-1 min-w-48">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-base-content/30 flex-shrink-0">
          <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
        </svg>
        <input
          type="text"
          bind:value={searchQuery}
          placeholder="Search by name, title, ID..."
          class="bg-transparent outline-none text-sm w-full text-base-content placeholder:text-base-content/30"
        />
        {#if searchQuery}
          <button onclick={() => searchQuery = ''} class="text-base-content/30 hover:text-base-content">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        {/if}
      </div>

      <!-- Status filter -->
      <select
        bind:value={statusFilter}
        class="select select-bordered select-sm bg-white text-sm rounded-xl min-w-32"
      >
        <option value="all">All Status</option>
        <option value="confirmed">Confirmed</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <!-- Type filter -->
      <select
        bind:value={typeFilter}
        class="select select-bordered select-sm bg-white text-sm rounded-xl min-w-32"
      >
        <option value="all">All Types</option>
        <option value="trip">Trip</option>
        <option value="experience">Experience</option>
      </select>

      <!-- Sort -->
      <select
        bind:value={sortBy}
        class="select select-bordered select-sm bg-white text-sm rounded-xl min-w-36"
      >
        <option value="date_desc">Newest First</option>
        <option value="date_asc">Oldest First</option>
        <option value="price_desc">Price: High → Low</option>
        <option value="price_asc">Price: Low → High</option>
      </select>

      <!-- Clear filters -->
      {#if hasFilters}
        <button
          onclick={clearFilters}
          class="btn btn-ghost btn-sm rounded-xl text-xs text-base-content/50 gap-1"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          Clear
        </button>
      {/if}
    </div>

    <!-- Results count -->
    <div class="px-6 py-2.5 bg-base-100 border-b border-base-200">
      <p class="text-xs text-base-content/40">
        Showing <span class="font-semibold text-base-content">{filtered.length}</span> bookings
        {#if hasFilters}<span class="text-primary font-medium"> · filters active</span>{/if}
      </p>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-base-200 bg-base-100">
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Booking ID</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Customer</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Experience</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Date</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Status</th>
            <th class="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Amount</th>
            <th class="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-base-content/40">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-base-200">
          {#each filtered as booking (booking.id)}
            <tr class="hover:bg-base-100/80 transition-colors group">

              <!-- ID -->
              <td class="px-6 py-4 font-mono text-xs text-base-content/50">
                {booking.id}
              </td>

              <!-- Customer -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                    {booking.avatar}
                  </div>
                  <div>
                    <p class="font-semibold text-base-content text-sm">{booking.customer}</p>
                    <p class="text-xs text-base-content/40">{booking.type}</p>
                  </div>
                </div>
              </td>

              <!-- Experience -->
              <td class="px-6 py-4">
                <p class="font-medium text-base-content">{booking.title}</p>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 text-sm text-base-content/60">
                {new Date(booking.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>

              <!-- Status -->
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full {statusConfig[booking.status]?.cls}">
                  <span class="w-1.5 h-1.5 rounded-full {statusConfig[booking.status]?.dot}"></span>
                  {booking.status}
                </span>
              </td>

              <!-- Amount -->
              <td class="px-6 py-4 font-bold text-base-content">
                ₹{booking.price.toLocaleString('en-IN')}
              </td>

              <!-- Actions -->
              <td class="px-6 py-4">
                <div class="flex justify-end gap-2">
                  <!-- <button class="btn btn-ghost btn-xs rounded-lg border border-base-300 hover:border-base-400 text-xs">
                    View
                  </button> -->
                  <a href="/admin/bookings/{booking.id.replace('#', '')}" class="btn btn-ghost btn-xs rounded-lg border border-base-300 hover:border-base-400 text-xs">View</a>
                  <button class="btn btn-primary btn-xs rounded-lg text-xs">
                    Edit
                  </button>
                </div>
              </td>

            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Empty state -->
    {#if filtered.length === 0}
      <div class="py-20 flex flex-col items-center justify-center text-center">
        <div class="w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-base-content/30">
            <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </div>
        <p class="font-semibold text-base-content mb-1" style="font-family: 'Clash Display', sans-serif;">No bookings found</p>
        <p class="text-sm text-base-content/40 mb-4">Try adjusting your search or filters</p>
        <button onclick={clearFilters} class="btn btn-sm btn-outline rounded-xl">Clear filters</button>
      </div>
    {/if}

    <!-- Table footer -->
    {#if filtered.length > 0}
      <div class="px-6 py-4 border-t border-base-200 flex items-center justify-between">
        <p class="text-xs text-base-content/40">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </p>
        <p class="text-xs font-semibold text-base-content">
          Total: <span class="text-secondary">₹{totalRevenue.toLocaleString('en-IN')}</span>
        </p>
      </div>
    {/if}

  </div>
</div>