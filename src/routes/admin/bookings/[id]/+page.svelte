<script>
  // Mock data — replace with Supabase fetch using params.id later
  const booking = {
    id: '#BK1021',
    status: 'Confirmed',
    created_at: '2026-02-10T14:32:00',
    payment_id: 'pay_PQR123XYZ',
    payment_status: 'Paid',
    payment_method: 'UPI',

    customer: {
      name: 'Arjun Mehta',
      email: 'arjun.mehta@gmail.com',
      phone: '+91 98765 43210',
      avatar: 'AM',
      joined: 'Jan 2025',
      total_bookings: 3,
    },

    experience: {
      name: 'Sunset Desert Safari',
      type: 'Experience',
      destination: 'Rajasthan, India',
      date: '2026-03-15',
      end_date: '2026-03-17',
      duration: '2 nights / 3 days',
      slug: 'sunset-desert-safari',
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80',
    },

    members: [
      { name: 'Arjun Mehta',  email: 'arjun.mehta@gmail.com',   phone: '+91 98765 43210', is_lead: true  },
      { name: 'Priya Mehta',  email: 'priya.mehta@gmail.com',   phone: '+91 98765 43211', is_lead: false },
      { name: 'Rahul Sharma', email: 'rahul.sharma@gmail.com',  phone: '+91 98765 43212', is_lead: false },
    ],

    pricing: {
      per_person: 2999,
      members: 3,
      subtotal: 8997,
      platform_fee: 450,
      tax: 1619,
      total: 11066,
    },

    timeline: [
      { event: 'Booking Created',    time: '10 Feb 2026, 2:32 PM', done: true  },
      { event: 'Payment Received',   time: '10 Feb 2026, 2:34 PM', done: true  },
      { event: 'Booking Confirmed',  time: '10 Feb 2026, 3:00 PM', done: true  },
      { event: 'Reminder Sent',      time: '8 Mar 2026, 9:00 AM',  done: false },
      { event: 'Experience Date',    time: '15 Mar 2026',           done: false },
    ],

    notes: 'Customer requested a vegetarian meal plan for all members. One member has mild altitude sensitivity — please inform the guide.',
  };

  const statusConfig = {
    Confirmed: { cls: 'bg-success/10 text-success',    dot: 'bg-success'   },
    Pending:   { cls: 'bg-warning/10 text-warning',    dot: 'bg-warning'   },
    Completed: { cls: 'bg-secondary/10 text-secondary', dot: 'bg-secondary' },
    Cancelled: { cls: 'bg-error/10 text-error',         dot: 'bg-error'     },
  };

  const paymentConfig = {
    Paid:    'bg-success/10 text-success',
    Pending: 'bg-warning/10 text-warning',
    Refunded:'bg-info/10 text-info',
    Failed:  'bg-error/10 text-error',
  };

  let confirmCancel = $state(false);
</script>

<div class="p-6 min-h-screen bg-base-200">

  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div class="flex items-center gap-3">
      <a href="/admin/bookings"
        class="w-9 h-9 rounded-xl border border-base-300 bg-white flex items-center justify-center hover:bg-base-200 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </a>
      <div>
        <p class="text-xs text-base-content/40 font-medium">Bookings / {booking.id}</p>
        <h1 class="text-xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
          Booking Details
        </h1>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <button class="btn btn-outline btn-sm rounded-xl gap-2 text-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
        </svg>
        Export
      </button>
      <button class="btn btn-primary btn-sm rounded-xl gap-2 text-sm">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
        Edit Booking
      </button>
    </div>
  </div>

  <!-- Status Bar -->
  <div class="bg-white border border-base-300 rounded-2xl p-5 mb-5 flex flex-wrap items-center justify-between gap-4">
    <div class="flex items-center gap-4 flex-wrap">
      <div>
        <p class="text-xs text-base-content/40 mb-1">Booking ID</p>
        <p class="font-mono text-sm font-bold text-base-content">{booking.id}</p>
      </div>
      <div class="w-px h-8 bg-base-200"></div>
      <div>
        <p class="text-xs text-base-content/40 mb-1">Status</p>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full {statusConfig[booking.status]?.cls}">
          <span class="w-1.5 h-1.5 rounded-full {statusConfig[booking.status]?.dot}"></span>
          {booking.status}
        </span>
      </div>
      <div class="w-px h-8 bg-base-200"></div>
      <div>
        <p class="text-xs text-base-content/40 mb-1">Payment</p>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full {paymentConfig[booking.payment_status]}">
          {booking.payment_status} · {booking.payment_method}
        </span>
      </div>
      <div class="w-px h-8 bg-base-200"></div>
      <div>
        <p class="text-xs text-base-content/40 mb-1">Booked On</p>
        <p class="text-sm font-medium text-base-content">
          {new Date(booking.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </div>

    <!-- Quick status change -->
    <div class="flex items-center gap-2">
      {#if booking.status === 'Pending'}
        <button class="btn btn-success btn-sm rounded-xl text-xs font-semibold">✓ Confirm</button>
      {/if}
      {#if !confirmCancel}
        <button onclick={() => confirmCancel = true}
          class="btn btn-ghost btn-sm rounded-xl text-xs text-error border border-error/30 hover:bg-error/5">
          Cancel Booking
        </button>
      {:else}
        <div class="flex items-center gap-2 bg-error/5 border border-error/20 rounded-xl px-3 py-2">
          <p class="text-xs text-error font-medium">Are you sure?</p>
          <button class="btn btn-error btn-xs rounded-lg">Yes, Cancel</button>
          <button onclick={() => confirmCancel = false} class="btn btn-ghost btn-xs rounded-lg">No</button>
        </div>
      {/if}
    </div>
  </div>

  <!-- Main Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

    <!-- LEFT: 2/3 -->
    <div class="lg:col-span-2 flex flex-col gap-5">

      <!-- Experience Info -->
      <div class="bg-white border border-base-300 rounded-2xl overflow-hidden">
        <img src={booking.experience.image} alt={booking.experience.name}
          class="w-full h-40 object-cover"/>
        <div class="p-5">
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="badge badge-primary badge-sm capitalize mb-2">{booking.experience.type}</span>
              <h2 class="text-lg font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
                {booking.experience.name}
              </h2>
              <div class="flex flex-wrap gap-4 mt-2 text-xs text-base-content/50">
                <span class="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  </svg>
                  {booking.experience.destination}
                </span>
                <span class="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                  </svg>
                  {new Date(booking.experience.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  &nbsp;→&nbsp;
                  {new Date(booking.experience.end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span class="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                  </svg>
                  {booking.experience.duration}
                </span>
              </div>
            </div>
            <a href="/admin/experiences/{booking.experience.slug}"
              class="btn btn-outline btn-sm rounded-xl text-xs flex-shrink-0">
              View Experience
            </a>
          </div>
        </div>
      </div>

      <!-- Members -->
      <div class="bg-white border border-base-300 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-base-content" style="font-family: 'Clash Display', sans-serif;">
            Group Members
          </h3>
          <span class="text-xs text-base-content/40">{booking.members.length} members</span>
        </div>
        <div class="flex flex-col gap-3">
          {#each booking.members as member}
            <div class="flex items-center gap-4 p-3 rounded-xl bg-base-100 border border-base-200">
              <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <p class="text-sm font-semibold text-base-content">{member.name}</p>
                  {#if member.is_lead}
                    <span class="badge badge-primary badge-xs">Lead</span>
                  {/if}
                </div>
                <p class="text-xs text-base-content/40">{member.email}</p>
              </div>
              <p class="text-xs text-base-content/40 flex-shrink-0">{member.phone}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Notes -->
      {#if booking.notes}
        <div class="bg-warning/5 border border-warning/20 rounded-2xl p-5">
          <div class="flex items-center gap-2 mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>
            </svg>
            <p class="text-xs font-semibold text-warning">Special Notes</p>
          </div>
          <p class="text-sm text-base-content/70 leading-relaxed">{booking.notes}</p>
        </div>
      {/if}

    </div>

    <!-- RIGHT: 1/3 -->
    <div class="flex flex-col gap-5">

      <!-- Customer -->
      <div class="bg-white border border-base-300 rounded-2xl p-5">
        <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
          Customer
        </h3>
        <div class="flex items-center gap-3 mb-4">
          <div class="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
            {booking.customer.avatar}
          </div>
          <div>
            <p class="font-semibold text-base-content text-sm">{booking.customer.name}</p>
            <p class="text-xs text-base-content/40">Member since {booking.customer.joined}</p>
          </div>
        </div>
        <div class="flex flex-col gap-2.5 text-xs">
          <div class="flex items-center gap-2 text-base-content/60">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {booking.customer.email}
          </div>
          <div class="flex items-center gap-2 text-base-content/60">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.15 1.19 2 2 0 012.12 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-.85a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
            {booking.customer.phone}
          </div>
          <div class="flex items-center gap-2 text-base-content/60">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
            </svg>
            {booking.customer.total_bookings} total bookings
          </div>
        </div>
        <div class="border-t border-base-200 mt-4 pt-3">
          <a href="/admin/customers/{booking.customer.email}"
            class="text-xs text-primary hover:underline font-medium">
            View customer profile →
          </a>
        </div>
      </div>

      <!-- Payment Summary -->
      <div class="bg-white border border-base-300 rounded-2xl p-5">
        <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
          Payment Summary
        </h3>
        <div class="flex flex-col gap-2.5 text-sm">
          <div class="flex justify-between text-base-content/60">
            <span>₹{booking.pricing.per_person.toLocaleString('en-IN')} × {booking.pricing.members} members</span>
            <span>₹{booking.pricing.subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-base-content/60">
            <span>Platform fee</span>
            <span>₹{booking.pricing.platform_fee.toLocaleString('en-IN')}</span>
          </div>
          <div class="flex justify-between text-base-content/60">
            <span>GST (18%)</span>
            <span>₹{booking.pricing.tax.toLocaleString('en-IN')}</span>
          </div>
          <div class="border-t border-base-200 pt-2.5 flex justify-between font-bold text-base-content">
            <span>Total Paid</span>
            <span class="text-secondary">₹{booking.pricing.total.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-base-200">
          <p class="text-xs text-base-content/40">Payment ID</p>
          <p class="text-xs font-mono text-base-content/60 mt-0.5">{booking.payment_id}</p>
        </div>
      </div>

      <!-- Booking Timeline -->
      <div class="bg-white border border-base-300 rounded-2xl p-5">
        <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
          Timeline
        </h3>
        <div class="flex flex-col gap-0">
          {#each booking.timeline as event, i}
            <div class="flex gap-3 {i < booking.timeline.length - 1 ? 'pb-4' : ''}">
              <div class="flex flex-col items-center gap-0 flex-shrink-0">
                <div class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
                  {event.done ? 'bg-secondary text-white' : 'bg-base-200 text-base-content/30'}">
                  {#if event.done}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  {:else}
                    <div class="w-2 h-2 rounded-full bg-base-300"></div>
                  {/if}
                </div>
                {#if i < booking.timeline.length - 1}
                  <div class="w-px flex-1 mt-1 {event.done ? 'bg-secondary/30' : 'bg-base-200'}"></div>
                {/if}
              </div>
              <div class="pb-1">
                <p class="text-xs font-semibold {event.done ? 'text-base-content' : 'text-base-content/40'}">
                  {event.event}
                </p>
                <p class="text-xs text-base-content/40 mt-0.5">{event.time}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

    </div>
  </div>
</div>