<script>
  let activeTab = $state('overview');

  const user = {
    name: 'Arjun Mehta',
    email: 'arjun.mehta@gmail.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    avatar: 'AM',
    joined: 'January 2025',
    trips_completed: 4,
    trips_upcoming: 2,
    total_spent: 87500,
  };

  const preferences = $state({
    adventure: true,
    wildlife: true,
    beach: false,
    mountains: true,
    cultural: false,
    luxury: false,
    budget: 'medium', // 'budget' | 'medium' | 'premium'
    group_size: 'small', // 'solo' | 'small' | 'large'
    notifications_email: true,
    notifications_sms: false,
  });

  const upcomingBookings = [
    {
      id: 'BK1021', name: 'Himalayan Base Camp Trek', destination: 'Himachal Pradesh',
      date: '2026-04-15', end_date: '2026-04-28', members: 4, amount: 74000,
      status: 'Confirmed', days_left: 49,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80',
      type: 'Trek',
    },
    {
      id: 'BK1022', name: 'Ranthambore Tiger Safari', destination: 'Rajasthan',
      date: '2026-03-22', end_date: '2026-03-24', members: 2, amount: 24000,
      status: 'Pending', days_left: 25,
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80',
      type: 'Safari',
    },
  ];

  const pastBookings = [
    {
      id: 'BK0981', name: 'Coorg Coffee Trail', destination: 'Karnataka',
      date: '2025-12-15', end_date: '2025-12-18', members: 2, amount: 18000,
      status: 'Completed', rating: 5,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
      type: 'Tour',
    },
    {
      id: 'BK0942', name: 'Goa Water Sports', destination: 'Goa',
      date: '2025-09-10', end_date: '2025-09-12', members: 3, amount: 19500,
      status: 'Completed', rating: 4,
      image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=600&q=80',
      type: 'Sports',
    },
    {
      id: 'BK0901', name: 'Kerala Backwater Cruise', destination: 'Kerala',
      date: '2025-07-05', end_date: '2025-07-10', members: 2, amount: 26000,
      status: 'Completed', rating: 5,
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80',
      type: 'Stay',
    },
  ];

  const savedExperiences = [
    {
      id: 'EXP004', name: 'Ladakh Road Trip', destination: 'Ladakh',
      date: '2026-08-05', price: 22000, type: 'Tour', spots_left: 12,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    },
    {
      id: 'EXP007', name: 'Andaman Diving Expedition', destination: 'Andaman',
      date: '2026-06-10', price: 35000, type: 'Sports', spots_left: 6,
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    },
    {
      id: 'EXP009', name: 'Rajasthan Desert Camp', destination: 'Rajasthan',
      date: '2026-05-01', price: 14000, type: 'Stay', spots_left: 3,
      image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80',
    },
  ];

  const navItems = [
    { id: 'overview',  label: 'Overview',   icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'upcoming',  label: 'Upcoming',   icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { id: 'past',      label: 'Past Trips',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { id: 'saved',     label: 'Saved',      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { id: 'profile',   label: 'Profile',    icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  ];

  function daysLabel(n) {
    if (n <= 7)  return { txt: `${n}d`, cls: 'text-rose-400' };
    if (n <= 30) return { txt: `${n}d`, cls: 'text-amber-400' };
    return { txt: `${n}d`, cls: 'text-slate-400' };
  }

  function stars(n) {
    return '★'.repeat(n) + '☆'.repeat(5 - n);
  }

  let editMode = $state(false);
  let profileData = $state({ ...user });

  // ── THEME ──
  let theme = $state('dark'); // 'dark' | 'light'
  function toggleTheme() {
    theme = theme === 'dark' ? 'light' : 'dark';
  }
</script>

<div class="dashboard-root" data-theme={theme}>

  <!-- ─── SIDEBAR ─── -->
  <aside class="sidebar">
    <div class="sidebar-top">

      <!-- Brand -->
      <div class="brand">
        <div class="brand-mark">
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4AB565"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
        </div>
        <span class="brand-name"><span class="brand-voyage">Voyage</span><span style="color:#4AB565">Roots</span></span>
      </div>

      <!-- Avatar -->
      <div class="avatar-block">
        <div class="avatar-ring">
          <div class="avatar">{user.avatar}</div>
        </div>
        <div>
          <p class="avatar-name">{user.name}</p>
          <p class="avatar-sub">{user.trips_completed} trips completed</p>
        </div>
      </div>

      <!-- Nav -->
      <nav class="sidebar-nav">
        {#each navItems as item}
          <button
            onclick={() => activeTab = item.id}
            class="nav-item {activeTab === item.id ? 'nav-item--active' : ''}"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d={item.icon}/>
            </svg>
            {item.label}
            {#if item.id === 'upcoming'}
              <span class="nav-badge">{upcomingBookings.length}</span>
            {/if}
          </button>
        {/each}
      </nav>
    </div>

    <!-- Bottom -->
    <div class="sidebar-bottom">
      <button onclick={toggleTheme} class="theme-toggle-btn">
        {#if theme === 'dark'}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
          Light mode
        {:else}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
          Dark mode
        {/if}
      </button>
      <a href="/auth/login" class="signout-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        Sign out
      </a>
    </div>
  </aside>

  <!-- ─── MAIN ─── -->
  <main class="main">

    <!-- ══ OVERVIEW ══ -->
    {#if activeTab === 'overview'}
      <div class="section-enter">
        <div class="page-header">
          <div>
            <p class="page-eyebrow">Good afternoon ✦</p>
            <h1 class="page-title">Welcome back, {user.name.split(' ')[0]}</h1>
          </div>
          <button onclick={() => activeTab = 'upcoming'} class="btn-primary-outline">
            View All Trips →
          </button>
        </div>

        <!-- Stats -->
        <div class="stats-row">
          <div class="stat-card stat-card--amber">
            <div class="stat-icon">✈️</div>
            <p class="stat-val">{user.trips_upcoming}</p>
            <p class="stat-label">Upcoming</p>
          </div>
          <div class="stat-card stat-card--teal">
            <div class="stat-icon">🌄</div>
            <p class="stat-val">{user.trips_completed}</p>
            <p class="stat-label">Completed</p>
          </div>
          <div class="stat-card stat-card--purple">
            <div class="stat-icon">💸</div>
            <p class="stat-val">₹{(user.total_spent / 1000).toFixed(0)}K</p>
            <p class="stat-label">Total Spent</p>
          </div>
          <div class="stat-card stat-card--green">
            <div class="stat-icon">❤️</div>
            <p class="stat-val">{savedExperiences.length}</p>
            <p class="stat-label">Saved</p>
          </div>
        </div>

        <!-- Next trip hero -->
        {#if upcomingBookings.length > 0}
          {@const next = upcomingBookings[0]}
          <div class="next-trip-card" style="--img: url('{next.image}')">
            <div class="next-trip-overlay"></div>
            <div class="next-trip-content">
              <div>
                <p class="next-eyebrow">Next Adventure</p>
                <h2 class="next-title">{next.name}</h2>
                <p class="next-meta">📍 {next.destination} · {new Date(next.date).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year:'numeric'})}</p>
              </div>
              <div class="next-right">
                <div class="countdown-pill">
                  <span class="countdown-num">{next.days_left}</span>
                  <span class="countdown-label">days to go</span>
                </div>
                <button onclick={() => activeTab = 'upcoming'} class="btn-white">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        {/if}

        <!-- Saved preview -->
        <div class="section-block">
          <div class="section-block-header">
            <h3 class="section-heading">Saved Experiences</h3>
            <button onclick={() => activeTab = 'saved'} class="see-all">See all →</button>
          </div>
          <div class="saved-preview-row">
            {#each savedExperiences.slice(0, 3) as exp}
              <div class="saved-mini" style="--img: url('{exp.image}')">
                <div class="saved-mini-overlay"></div>
                <div class="saved-mini-content">
                  <span class="type-chip">{exp.type}</span>
                  <div>
                    <p class="saved-mini-name">{exp.name}</p>
                    <p class="saved-mini-price">From ₹{exp.price.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>

    <!-- ══ UPCOMING ══ -->
    {:else if activeTab === 'upcoming'}
      <div class="section-enter">
        <div class="page-header">
          <div>
            <p class="page-eyebrow">Your calendar</p>
            <h1 class="page-title">Upcoming Trips</h1>
          </div>
        </div>

        {#if upcomingBookings.length === 0}
          <div class="empty-state">
            <div class="empty-icon">🗺️</div>
            <p class="empty-title">No upcoming trips</p>
            <p class="empty-sub">Explore experiences and book your next adventure</p>
            <a href="/experiences" class="btn-primary-solid">Browse Experiences</a>
          </div>
        {:else}
          <div class="booking-list">
            {#each upcomingBookings as b}
              {@const dl = daysLabel(b.days_left)}
              <div class="booking-card">
                <div class="booking-img" style="background-image: url('{b.image}')">
                  <span class="booking-type-chip">{b.type}</span>
                </div>
                <div class="booking-body">
                  <div class="booking-top">
                    <div>
                      <p class="booking-id">#{b.id}</p>
                      <h3 class="booking-name">{b.name}</h3>
                      <p class="booking-dest">📍 {b.destination}</p>
                    </div>
                    <span class="status-pill {b.status === 'Confirmed' ? 'status-confirmed' : 'status-pending'}">
                      {b.status}
                    </span>
                  </div>

                  <div class="booking-meta-row">
                    <div class="booking-meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                      {new Date(b.date).toLocaleDateString('en-IN', {day:'numeric', month:'short'})} → {new Date(b.end_date).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}
                    </div>
                    <div class="booking-meta-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
                      {b.members} members
                    </div>
                    <div class="booking-meta-item">
                      ₹{b.amount.toLocaleString('en-IN')} paid
                    </div>
                  </div>

                  <div class="booking-footer">
                    <div class="countdown-row">
                      <span class="countdown-dot"></span>
                      <span class={dl.cls + ' text-sm font-semibold'}>{dl.txt} to go</span>
                    </div>
                    <a href="/dashboard/bookings/{b.id}" class="btn-ghost-sm">View Details →</a>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      </div>

    <!-- ══ PAST TRIPS ══ -->
    {:else if activeTab === 'past'}
      <div class="section-enter">
        <div class="page-header">
          <div>
            <p class="page-eyebrow">Your journey so far</p>
            <h1 class="page-title">Past Trips</h1>
          </div>
        </div>

        <div class="past-grid">
          {#each pastBookings as b}
            <div class="past-card">
              <div class="past-img" style="background-image: url('{b.image}')">
                <div class="past-img-overlay"></div>
                <span class="booking-type-chip">{b.type}</span>
                <div class="past-stars">{stars(b.rating)}</div>
              </div>
              <div class="past-body">
                <h3 class="past-name">{b.name}</h3>
                <p class="past-dest">📍 {b.destination}</p>
                <div class="past-row">
                  <span class="past-date">{new Date(b.date).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}</span>
                  <span class="past-amount">₹{b.amount.toLocaleString('en-IN')}</span>
                </div>
                <div class="past-actions">
                  <button class="btn-ghost-sm">View Receipt</button>
                  <button class="btn-primary-outline-sm">Book Again</button>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>

    <!-- ══ SAVED ══ -->
    {:else if activeTab === 'saved'}
      <div class="section-enter">
        <div class="page-header">
          <div>
            <p class="page-eyebrow">Your wishlist</p>
            <h1 class="page-title">Saved Experiences</h1>
          </div>
        </div>

        <div class="saved-grid">
          {#each savedExperiences as exp}
            <div class="saved-card">
              <div class="saved-img" style="background-image: url('{exp.image}')">
                <div class="saved-img-overlay"></div>
                <button class="heart-btn" title="Remove from saved">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                  </svg>
                </button>
                <span class="booking-type-chip">{exp.type}</span>
              </div>
              <div class="saved-body">
                <h3 class="saved-name">{exp.name}</h3>
                <p class="saved-dest">📍 {exp.destination}</p>
                <div class="saved-row">
                  <div>
                    <p class="saved-price-label">from</p>
                    <p class="saved-price">₹{exp.price.toLocaleString('en-IN')}<span class="saved-per">/person</span></p>
                  </div>
                  <div class="text-right">
                    <p class="saved-price-label">spots left</p>
                    <p class="saved-spots {exp.spots_left <= 3 ? 'text-rose-400' : 'text-emerald-400'}">{exp.spots_left}</p>
                  </div>
                </div>
                <div class="saved-date">
                  🗓 {new Date(exp.date).toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'})}
                </div>
                <a href="/experiences/{exp.id}" class="book-btn">Book Now →</a>
              </div>
            </div>
          {/each}
        </div>
      </div>

    <!-- ══ PROFILE ══ -->
    {:else if activeTab === 'profile'}
      <div class="section-enter">
        <div class="page-header">
          <div>
            <p class="page-eyebrow">Your account</p>
            <h1 class="page-title">Profile</h1>
          </div>
          <button onclick={() => editMode = !editMode} class="{editMode ? 'btn-amber' : 'btn-primary-outline'}">
            {editMode ? '✓ Save Changes' : '✏ Edit Profile'}
          </button>
        </div>

        <div class="profile-grid">

          <!-- Left: personal info -->
          <div class="profile-left">

            <!-- Avatar section -->
            <div class="profile-avatar-card">
              <div class="profile-avatar-ring">
                <div class="profile-avatar">{user.avatar}</div>
              </div>
              {#if editMode}
                <button class="change-photo-btn">Change Photo</button>
              {/if}
              <p class="profile-name">{user.name}</p>
              <p class="profile-since">Member since {user.joined}</p>
              <div class="profile-badges">
                <span class="profile-badge">🏔️ Trekker</span>
                <span class="profile-badge">🦁 Explorer</span>
              </div>
            </div>

            <!-- Personal info -->
            <div class="profile-info-card">
              <h3 class="profile-section-title">Personal Info</h3>
              <div class="profile-fields">
                <div class="profile-field">
                  <label class="field-label">Full Name</label>
                  {#if editMode}
                    <input bind:value={profileData.name} class="field-input" type="text"/>
                  {:else}
                    <p class="field-value">{profileData.name}</p>
                  {/if}
                </div>
                <div class="profile-field">
                  <label class="field-label">Email</label>
                  {#if editMode}
                    <input bind:value={profileData.email} class="field-input" type="email"/>
                  {:else}
                    <p class="field-value">{profileData.email}</p>
                  {/if}
                </div>
                <div class="profile-field">
                  <label class="field-label">Phone</label>
                  {#if editMode}
                    <input bind:value={profileData.phone} class="field-input" type="tel"/>
                  {:else}
                    <p class="field-value">{profileData.phone}</p>
                  {/if}
                </div>
                <div class="profile-field">
                  <label class="field-label">Location</label>
                  {#if editMode}
                    <input bind:value={profileData.location} class="field-input" type="text"/>
                  {:else}
                    <p class="field-value">{profileData.location}</p>
                  {/if}
                </div>
              </div>
            </div>
          </div>

          <!-- Right: preferences -->
          <div class="profile-right">

            <!-- Travel Interests -->
            <div class="profile-info-card">
              <h3 class="profile-section-title">Travel Interests</h3>
              <p class="profile-section-sub">We use these to personalise your recommendations</p>
              <div class="interest-grid">
                {#each [
                  {key:'adventure', emoji:'🧗', label:'Adventure'},
                  {key:'wildlife',  emoji:'🦁', label:'Wildlife'},
                  {key:'beach',     emoji:'🏖️', label:'Beach'},
                  {key:'mountains', emoji:'🏔️', label:'Mountains'},
                  {key:'cultural',  emoji:'🏛️', label:'Cultural'},
                  {key:'luxury',    emoji:'💎', label:'Luxury'},
                ] as interest}
                  <button
                    onclick={() => preferences[interest.key] = !preferences[interest.key]}
                    class="interest-chip {preferences[interest.key] ? 'interest-chip--on' : ''}"
                  >
                    <span>{interest.emoji}</span>
                    {interest.label}
                  </button>
                {/each}
              </div>
            </div>

            <!-- Budget & Group Size -->
            <div class="profile-info-card">
              <h3 class="profile-section-title">Travel Style</h3>
              <div class="pref-block">
                <label class="field-label">Budget Range</label>
                <div class="pref-pills">
                  {#each [{v:'budget', l:'Budget'}, {v:'medium', l:'Mid-range'}, {v:'premium', l:'Premium'}] as opt}
                    <button
                      onclick={() => preferences.budget = opt.v}
                      class="pref-pill {preferences.budget === opt.v ? 'pref-pill--on' : ''}"
                    >{opt.l}</button>
                  {/each}
                </div>
              </div>
              <div class="pref-block">
                <label class="field-label">Group Size</label>
                <div class="pref-pills">
                  {#each [{v:'solo', l:'Solo'}, {v:'small', l:'Small (2–6)'}, {v:'large', l:'Large (7+)'}] as opt}
                    <button
                      onclick={() => preferences.group_size = opt.v}
                      class="pref-pill {preferences.group_size === opt.v ? 'pref-pill--on' : ''}"
                    >{opt.l}</button>
                  {/each}
                </div>
              </div>
            </div>

            <!-- Notifications -->
            <div class="profile-info-card">
              <h3 class="profile-section-title">Notifications</h3>
              <div class="toggle-row">
                <div>
                  <p class="toggle-label">Email notifications</p>
                  <p class="toggle-sub">Booking confirmations, trip reminders</p>
                </div>
                <button
                  onclick={() => preferences.notifications_email = !preferences.notifications_email}
                  class="toggle-btn {preferences.notifications_email ? 'toggle-btn--on' : ''}"
                >
                  <div class="toggle-knob"></div>
                </button>
              </div>
              <div class="toggle-row">
                <div>
                  <p class="toggle-label">SMS notifications</p>
                  <p class="toggle-sub">Day-of trip reminders via text</p>
                </div>
                <button
                  onclick={() => preferences.notifications_sms = !preferences.notifications_sms}
                  class="toggle-btn {preferences.notifications_sms ? 'toggle-btn--on' : ''}"
                >
                  <div class="toggle-knob"></div>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  :global(*) { box-sizing: border-box; margin: 0; padding: 0; }
  :global(body) { font-family: 'Satoshi', sans-serif; }

  /* ─── THEME TOKENS ─── */
  .dashboard-root {
    /* Dark theme (default) */
    --bg-root:      #0d1117;
    --bg-sidebar:   #111827;
    --bg-card:      #111827;
    --bg-card2:     #0d1117;
    --bg-input:     #0d1117;
    --bg-nav-hover: rgba(255,255,255,0.05);
    --bg-nav-act:   rgba(74,181,101,0.1);
    --border:       rgba(255,255,255,0.07);
    --border-hover: rgba(255,255,255,0.15);
    --border-nav:   rgba(74,181,101,0.2);
    --border-input: rgba(255,255,255,0.1);
    --text-primary: #f1f5f9;
    --text-sec:     #cbd5e1;
    --text-muted:   #64748b;
    --text-faint:   #475569;
    --text-nav:     #64748b;
    --text-nav-act: #4AB565;
    --toggle-track: rgba(255,255,255,0.08);
    --divider:      rgba(255,255,255,0.05);
    --chip-bg:      rgba(255,255,255,0.03);
    --chip-border:  rgba(255,255,255,0.08);
    --chip-hover-b: rgba(255,255,255,0.2);
    --chip-color:   #64748b;
    --chip-hover-c: #94a3b8;
    --avatar-bg:    #1e293b;
    --badge-bg:     rgba(255,255,255,0.05);
    --badge-border: rgba(255,255,255,0.1);
    --brand-voyage: #fff;
  }

  .dashboard-root[data-theme="light"] {
    --bg-root:      #f0f4f8;
    --bg-sidebar:   #ffffff;
    --bg-card:      #ffffff;
    --bg-card2:     #f8fafc;
    --bg-input:     #f8fafc;
    --bg-nav-hover: rgba(0,0,0,0.04);
    --bg-nav-act:   rgba(74,181,101,0.08);
    --border:       rgba(0,0,0,0.08);
    --border-hover: rgba(0,0,0,0.15);
    --border-nav:   rgba(74,181,101,0.3);
    --border-input: rgba(0,0,0,0.12);
    --text-primary: #0f172a;
    --text-sec:     #1e293b;
    --text-muted:   #64748b;
    --text-faint:   #94a3b8;
    --text-nav:     #64748b;
    --text-nav-act: #3da356;
    --toggle-track: rgba(0,0,0,0.1);
    --divider:      rgba(0,0,0,0.06);
    --chip-bg:      rgba(0,0,0,0.03);
    --chip-border:  rgba(0,0,0,0.1);
    --chip-hover-b: rgba(0,0,0,0.18);
    --chip-color:   #64748b;
    --chip-hover-c: #1e293b;
    --avatar-bg:    #e2e8f0;
    --badge-bg:     rgba(0,0,0,0.04);
    --badge-border: rgba(0,0,0,0.08);
    --brand-voyage: #0f172a;
  }

  /* ─── ROOT LAYOUT ─── */
  .dashboard-root {
    display: flex;
    min-height: 100vh;
    background: var(--bg-root);
    color: var(--text-primary);
    transition: background 0.3s, color 0.3s;
  }

  /* ─── SIDEBAR ─── */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: var(--bg-sidebar);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow-y: auto;
    transition: background 0.3s, border-color 0.3s;
  }

  .sidebar-top { display: flex; flex-direction: column; gap: 2rem; }

  .brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0 0.5rem;
  }

  .brand-mark {
    width: 32px; height: 32px;
    background: rgba(74,181,101,0.15);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
  }

  .brand-name {
    font-family: 'Clash Display', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }
  .brand-voyage { color: var(--brand-voyage); }

  .avatar-block {
    display: flex; align-items: center; gap: 0.75rem;
    background: var(--chip-bg);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 0.85rem;
  }

  .avatar-ring {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4AB565, #22D3EE);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .avatar {
    width: 36px; height: 36px;
    border-radius: 50%;
    background: var(--avatar-bg);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 800; color: var(--text-primary);
    letter-spacing: 0.05em;
  }

  .avatar-name { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); }
  .avatar-sub  { font-size: 0.7rem; color: var(--text-muted); margin-top: 1px; }

  .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }

  .nav-item {
    display: flex; align-items: center; gap: 0.65rem;
    width: 100%; padding: 0.65rem 0.85rem;
    border-radius: 10px; border: none;
    background: transparent;
    color: var(--text-nav);
    font-family: 'Satoshi', sans-serif;
    font-size: 0.85rem; font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    text-align: left;
  }

  .nav-item:hover { background: var(--bg-nav-hover); color: var(--text-sec); }

  .nav-item--active {
    background: var(--bg-nav-act);
    color: var(--text-nav-act);
    border: 1px solid var(--border-nav);
  }

  .nav-badge {
    margin-left: auto;
    background: #4AB565;
    color: #fff;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 999px;
  }

  .sidebar-bottom { padding-top: 1rem; border-top: 1px solid var(--divider); display: flex; flex-direction: column; gap: 0.25rem; }

  .theme-toggle-btn {
    display: flex; align-items: center; gap: 0.5rem;
    color: var(--text-muted); font-size: 0.8rem; font-weight: 500;
    padding: 0.5rem 0.85rem; border-radius: 8px;
    background: none; border: none; cursor: pointer;
    font-family: 'Satoshi', sans-serif;
    transition: all 0.2s; width: 100%; text-align: left;
  }
  .theme-toggle-btn:hover { color: var(--text-primary); background: var(--bg-nav-hover); }

  .signout-btn {
    display: flex; align-items: center; gap: 0.5rem;
    color: var(--text-muted); font-size: 0.8rem; font-weight: 500;
    padding: 0.5rem 0.85rem; border-radius: 8px;
    text-decoration: none; transition: all 0.2s;
  }
  .signout-btn:hover { color: #ef4444; background: rgba(239,68,68,0.08); }

  /* ─── MAIN ─── */
  .main {
    flex: 1;
    min-height: 100vh;
    padding: 2.5rem 2.5rem;
    overflow-y: auto;
    max-width: 1100px;
  }

  .section-enter {
    animation: fadeUp 0.4s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ─── PAGE HEADER ─── */
  .page-header {
    display: flex; align-items: flex-end; justify-content: space-between;
    margin-bottom: 2rem;
    flex-wrap: wrap; gap: 1rem;
  }

  .page-eyebrow {
    font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: #4AB565; margin-bottom: 0.4rem;
  }

  .page-title {
    font-family: 'Clash Display', sans-serif;
    font-size: 2rem; font-weight: 700;
    color: var(--text-primary); line-height: 1.1;
  }

  /* ─── BUTTONS ─── */
  .btn-primary-outline {
    padding: 0.55rem 1.25rem;
    border: 1.5px solid rgba(74,181,101,0.5);
    border-radius: 10px;
    background: transparent;
    color: #4AB565;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-primary-outline:hover { background: rgba(74,181,101,0.1); }

  .btn-primary-outline-sm {
    padding: 0.4rem 0.9rem;
    border: 1.5px solid rgba(74,181,101,0.4);
    border-radius: 8px; background: transparent;
    color: #4AB565; font-family: 'Satoshi', sans-serif;
    font-size: 0.78rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-primary-outline-sm:hover { background: rgba(74,181,101,0.1); }

  .btn-ghost-sm {
    padding: 0.4rem 0.9rem;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; background: transparent;
    color: #94a3b8; font-family: 'Satoshi', sans-serif;
    font-size: 0.78rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-ghost-sm:hover { border-color: rgba(255,255,255,0.2); color: #cbd5e1; }

  .btn-primary-solid {
    display: inline-block;
    padding: 0.7rem 1.5rem;
    background: #4AB565; color: #fff;
    border-radius: 10px;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.9rem; font-weight: 700;
    text-decoration: none; transition: all 0.2s;
    border: none; cursor: pointer;
  }
  .btn-primary-solid:hover { background: #3da356; }

  .btn-white {
    padding: 0.55rem 1.25rem;
    border-radius: 10px;
    background: rgba(255,255,255,0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    color: #fff;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-white:hover { background: rgba(255,255,255,0.25); }

  .btn-amber {
    padding: 0.55rem 1.25rem;
    border-radius: 10px;
    background: rgba(245,158,11,0.15);
    border: 1.5px solid rgba(245,158,11,0.4);
    color: #f59e0b;
    font-family: 'Satoshi', sans-serif;
    font-size: 0.85rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
  }
  .btn-amber:hover { background: rgba(245,158,11,0.22); }

  /* ─── STATS ─── */
  .stats-row {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-card {
    border-radius: 16px;
    padding: 1.25rem;
    display: flex; flex-direction: column; gap: 0.5rem;
    border: 1px solid transparent;
    transition: transform 0.2s;
  }
  .stat-card:hover { transform: translateY(-2px); }

  .stat-card--amber  { background: rgba(245,158,11,0.08); border-color: rgba(245,158,11,0.15); }
  .stat-card--teal   { background: rgba(34,211,238,0.08); border-color: rgba(34,211,238,0.15); }
  .stat-card--purple { background: rgba(131,74,237,0.08); border-color: rgba(131,74,237,0.15); }
  .stat-card--green  { background: rgba(74,181,101,0.08); border-color: rgba(74,181,101,0.15); }

  .stat-icon { font-size: 1.4rem; }
  .stat-val  { font-family: 'Clash Display', sans-serif; font-size: 1.6rem; font-weight: 700; color: var(--text-primary); }
  .stat-label{ font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }

  /* ─── NEXT TRIP HERO ─── */
  .next-trip-card {
    background: var(--img) center/cover no-repeat;
    border-radius: 20px;
    height: 220px;
    position: relative;
    overflow: hidden;
    margin-bottom: 1.5rem;
    display: flex; align-items: flex-end;
  }

  .next-trip-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.1) 100%);
  }

  .next-trip-content {
    position: relative; z-index: 1;
    width: 100%;
    display: flex; align-items: flex-end; justify-content: space-between;
    padding: 1.75rem;
    gap: 1rem;
  }

  .next-eyebrow { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #4AB565; margin-bottom: 0.35rem; }
  .next-title   { font-family: 'Clash Display', sans-serif; font-size: 1.6rem; font-weight: 700; color: #fff; line-height: 1.1; margin-bottom: 0.4rem; }
  .next-meta    { font-size: 0.82rem; color: rgba(255,255,255,0.65); }
  .next-right   { display: flex; flex-direction: column; align-items: flex-end; gap: 0.75rem; flex-shrink: 0; }

  .countdown-pill {
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 12px;
    padding: 0.6rem 1rem;
    text-align: center;
  }
  .countdown-num   { display: block; font-family: 'Clash Display', sans-serif; font-size: 1.6rem; font-weight: 800; color: #fff; line-height: 1; }
  .countdown-label { display: block; font-size: 0.65rem; color: rgba(255,255,255,0.55); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 2px; }

  /* ─── SECTION BLOCK ─── */
  .section-block { }
  .section-block-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem; }
  .section-heading { font-family: 'Clash Display', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
  .see-all { font-size: 0.82rem; color: #4AB565; font-weight: 600; cursor: pointer; background: none; border: none; transition: opacity 0.2s; }
  .see-all:hover { opacity: 0.7; }

  /* ─── SAVED PREVIEW ─── */
  .saved-preview-row {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
  }

  .saved-mini {
    background: var(--img) center/cover no-repeat;
    border-radius: 14px; height: 160px;
    position: relative; overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s;
  }
  .saved-mini:hover { transform: scale(1.02); }

  .saved-mini-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%);
  }

  .saved-mini-content {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 0.85rem;
  }

  .type-chip {
    align-self: flex-start;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.68rem; font-weight: 700;
    color: #fff; text-transform: uppercase; letter-spacing: 0.08em;
  }

  .saved-mini-name  { font-size: 0.85rem; font-weight: 700; color: #fff; line-height: 1.2; }
  .saved-mini-price { font-size: 0.72rem; color: rgba(255,255,255,0.65); margin-top: 2px; }

  /* ─── BOOKING CARDS ─── */
  .booking-list { display: flex; flex-direction: column; gap: 1rem; }

  .booking-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    display: flex;
    transition: border-color 0.2s, background 0.3s;
  }
  .booking-card:hover { border-color: rgba(74,181,101,0.3); }

  .booking-img {
    width: 180px; flex-shrink: 0;
    background-size: cover; background-position: center;
    position: relative;
  }

  .booking-type-chip {
    position: absolute; top: 10px; left: 10px;
    background: rgba(0,0,0,0.5);
    backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 999px;
    padding: 2px 10px;
    font-size: 0.65rem; font-weight: 700;
    color: #fff; text-transform: uppercase; letter-spacing: 0.08em;
  }

  .booking-body { flex: 1; padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }

  .booking-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
  .booking-id   { font-size: 0.7rem; color: var(--text-faint); font-weight: 600; margin-bottom: 0.2rem; letter-spacing: 0.05em; }
  .booking-name { font-family: 'Clash Display', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
  .booking-dest { font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem; }

  .status-pill {
    flex-shrink: 0; padding: 3px 12px; border-radius: 999px;
    font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;
  }
  .status-confirmed { background: rgba(74,181,101,0.12); color: #4AB565; border: 1px solid rgba(74,181,101,0.25); }
  .status-pending   { background: rgba(245,158,11,0.12); color: #f59e0b; border: 1px solid rgba(245,158,11,0.25); }

  .booking-meta-row { display: flex; gap: 1.5rem; flex-wrap: wrap; }
  .booking-meta-item { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: var(--text-muted); }

  .booking-footer { display: flex; align-items: center; justify-content: space-between; margin-top: auto; }
  .countdown-row  { display: flex; align-items: center; gap: 0.5rem; }
  .countdown-dot  { width: 6px; height: 6px; border-radius: 50%; background: #4AB565; }

  /* ─── PAST GRID ─── */
  .past-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

  .past-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s, background 0.3s;
  }
  .past-card:hover { border-color: var(--border-hover); transform: translateY(-3px); }

  .past-img {
    height: 160px;
    background-size: cover; background-position: center;
    position: relative;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 0.75rem;
  }

  .past-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent); }

  .past-stars { position: relative; z-index: 1; align-self: flex-end; font-size: 0.8rem; color: #f59e0b; }

  .past-body { padding: 1rem; }
  .past-name { font-family: 'Clash Display', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.25rem; }
  .past-dest { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem; }
  .past-row  { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; }
  .past-date { font-size: 0.75rem; color: var(--text-faint); }
  .past-amount { font-size: 0.85rem; font-weight: 700; color: var(--text-primary); }
  .past-actions { display: flex; gap: 0.5rem; }

  /* ─── SAVED GRID ─── */
  .saved-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }

  .saved-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 16px; overflow: hidden;
    transition: border-color 0.2s, transform 0.2s, background 0.3s;
  }
  .saved-card:hover { border-color: var(--border-hover); transform: translateY(-3px); }

  .saved-img {
    height: 170px;
    background-size: cover; background-position: center;
    position: relative;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 0.75rem;
  }

  .saved-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.4), transparent); }

  .heart-btn {
    position: relative; z-index: 1; align-self: flex-end;
    background: rgba(0,0,0,0.4); backdrop-filter: blur(6px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50%; width: 32px; height: 32px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: transform 0.2s;
  }
  .heart-btn:hover { transform: scale(1.15); }

  .saved-body { padding: 1rem; }
  .saved-name  { font-family: 'Clash Display', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem; }
  .saved-dest  { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem; }
  .saved-row   { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 0.6rem; }
  .saved-price-label { font-size: 0.68rem; color: var(--text-faint); text-transform: uppercase; letter-spacing: 0.06em; }
  .saved-price { font-size: 1rem; font-weight: 800; color: var(--text-primary); line-height: 1.1; }
  .saved-per   { font-size: 0.7rem; font-weight: 400; color: var(--text-muted); }
  .saved-spots { font-size: 1rem; font-weight: 800; }
  .saved-date  { font-size: 0.75rem; color: var(--text-faint); margin-bottom: 0.75rem; }

  .book-btn {
    display: block; width: 100%;
    padding: 0.6rem; text-align: center;
    background: rgba(74,181,101,0.12);
    border: 1px solid rgba(74,181,101,0.25);
    border-radius: 9px;
    color: #4AB565; font-size: 0.85rem; font-weight: 700;
    text-decoration: none; transition: all 0.2s;
  }
  .book-btn:hover { background: rgba(74,181,101,0.2); }

  /* ─── PROFILE ─── */
  .profile-grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 1.25rem;
    align-items: start;
  }

  .profile-left, .profile-right { display: flex; flex-direction: column; gap: 1.25rem; }

  .profile-avatar-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 2rem 1.5rem;
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    gap: 0.5rem;
    transition: background 0.3s;
  }

  .profile-avatar-ring {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4AB565, #22D3EE);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 0.25rem;
  }

  .profile-avatar {
    width: 64px; height: 64px; border-radius: 50%;
    background: var(--avatar-bg);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; font-weight: 900; color: var(--text-primary); letter-spacing: 0.05em;
  }

  .change-photo-btn {
    font-size: 0.75rem; color: #4AB565; background: none; border: none; cursor: pointer; font-weight: 600;
  }

  .profile-name  { font-family: 'Clash Display', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--text-primary); }
  .profile-since { font-size: 0.75rem; color: var(--text-muted); }

  .profile-badges { display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center; margin-top: 0.5rem; }
  .profile-badge {
    background: var(--badge-bg);
    border: 1px solid var(--badge-border);
    border-radius: 999px; padding: 3px 10px;
    font-size: 0.72rem; color: var(--text-muted); font-weight: 500;
  }

  .profile-info-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 1.5rem;
    transition: background 0.3s;
  }

  .profile-section-title { font-family: 'Clash Display', sans-serif; font-size: 0.95rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.3rem; }
  .profile-section-sub   { font-size: 0.75rem; color: var(--text-faint); margin-bottom: 1rem; }

  .profile-fields { display: flex; flex-direction: column; gap: 1rem; }

  .profile-field {}
  .field-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); display: block; margin-bottom: 0.35rem; }
  .field-value { font-size: 0.88rem; color: var(--text-sec); font-weight: 500; }
  .field-input {
    width: 100%; padding: 0.55rem 0.85rem;
    background: var(--bg-input);
    border: 1.5px solid var(--border-input);
    border-radius: 9px; color: var(--text-primary);
    font-family: 'Satoshi', sans-serif; font-size: 0.88rem;
    outline: none; transition: border-color 0.2s;
  }
  .field-input:focus { border-color: #4AB565; }

  /* Interest chips */
  .interest-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 0.75rem; }

  .interest-chip {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.55rem 0.65rem;
    border-radius: 10px;
    background: var(--chip-bg);
    border: 1.5px solid var(--chip-border);
    color: var(--chip-color); font-size: 0.8rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Satoshi', sans-serif;
  }
  .interest-chip:hover { border-color: var(--chip-hover-b); color: var(--chip-hover-c); }
  .interest-chip--on {
    background: rgba(74,181,101,0.1);
    border-color: rgba(74,181,101,0.35);
    color: #4AB565;
  }

  /* Pref pills */
  .pref-block { margin-bottom: 1rem; }
  .pref-pills { display: flex; gap: 0.5rem; margin-top: 0.5rem; flex-wrap: wrap; }

  .pref-pill {
    padding: 0.4rem 0.9rem; border-radius: 999px;
    background: var(--chip-bg);
    border: 1.5px solid var(--chip-border);
    color: var(--chip-color); font-size: 0.78rem; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    font-family: 'Satoshi', sans-serif;
  }
  .pref-pill:hover { border-color: var(--chip-hover-b); color: var(--chip-hover-c); }
  .pref-pill--on { background: rgba(34,211,238,0.1); border-color: rgba(34,211,238,0.3); color: #22D3EE; }

  /* Toggles */
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.85rem 0;
    border-bottom: 1px solid var(--divider);
  }
  .toggle-row:last-child { border-bottom: none; padding-bottom: 0; }

  .toggle-label { font-size: 0.85rem; font-weight: 600; color: var(--text-sec); margin-bottom: 2px; }
  .toggle-sub   { font-size: 0.72rem; color: var(--text-muted); }

  .toggle-btn {
    width: 44px; height: 24px; border-radius: 999px;
    border: none; cursor: pointer; padding: 2px;
    background: var(--toggle-track);
    transition: all 0.25s;
    flex-shrink: 0;
    display: flex; align-items: center;
  }
  .toggle-btn--on { background: #4AB565; justify-content: flex-end; }

  .toggle-knob {
    width: 20px; height: 20px; border-radius: 50%;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    transition: all 0.25s;
  }

  /* ─── EMPTY STATE ─── */
  .empty-state {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 5rem 2rem; text-align: center;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: 20px;
  }
  .empty-icon  { font-size: 3rem; margin-bottom: 1rem; }
  .empty-title { font-family: 'Clash Display', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.4rem; }
  .empty-sub   { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1.5rem; }

  /* ─── RESPONSIVE ─── */
  @media (max-width: 1024px) {
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .past-grid, .saved-grid { grid-template-columns: repeat(2, 1fr); }
    .saved-preview-row { grid-template-columns: 1fr 1fr; }
    .profile-grid { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .sidebar { display: none; }
    .main { padding: 1.5rem; }
    .stats-row { grid-template-columns: repeat(2, 1fr); }
    .past-grid, .saved-grid { grid-template-columns: 1fr; }
    .saved-preview-row { grid-template-columns: 1fr; }
    .booking-card { flex-direction: column; }
    .booking-img  { width: 100%; height: 160px; }
    .interest-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>