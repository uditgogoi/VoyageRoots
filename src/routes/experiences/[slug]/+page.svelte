<script>
  // Mock data — replace with Supabase fetch using params.slug later
  const experience = {
    id: '1',
    slug: 'himalayan-base-camp-trek',
    name: 'Himalayan Base Camp Trek',
    type: 'trek',
    destination: 'Himachal Pradesh',
    cost_per_person: 18500,
    min_members: 4,
    max_members: 15,
    date: '2025-06-15',
    end_date: '2025-06-28',
    description: `A breathtaking high-altitude trek through ancient Himalayan trails, glaciers, and remote villages. This is one of India's most iconic adventures — winding through dense forests, alpine meadows, and dramatic ridgelines before reaching the base camp at 4,200m.

    You'll camp under a sky full of stars, interact with local mountain communities, and witness some of the most dramatic landscapes on earth. No prior mountaineering experience required — just a good level of fitness and an adventurous spirit.`,
    requirements: 'Moderate fitness level. Ability to walk 8-12km per day.',
    prerequisites: 'Valid ID, medical fitness certificate, travel insurance.',
    notifications: 'Participants will receive a detailed packing list and briefing 7 days before departure.',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80',
    ],
    includes: ['Accommodation', 'All meals', 'Expert guide', 'Permits & fees', 'First aid kit'],
    excludes: ['Travel to base location', 'Personal gear', 'Travel insurance'],
  };

  const typeColors = {
    trek: 'badge-primary', tour: 'badge-secondary', stay: 'badge-accent',
    outing: 'badge-info', sports: 'badge-warning', custom: 'badge-neutral',
  };

  let activeImage = $state(0);
  let members = $state(experience.min_members);

  const totalCost = $derived(members * experience.cost_per_person);

  const nights = Math.round(
    (new Date(experience.end_date) - new Date(experience.date)) / (1000 * 60 * 60 * 24)
  );
</script>

<div class="min-h-screen bg-white">

  <!-- Breadcrumb -->
  <div class="border-b border-base-200 bg-base-200 px-4 py-3">
    <div class="max-w-7xl mx-auto text-xs text-base-content/40 flex items-center gap-2">
      <a href="/" class="hover:text-primary transition-colors">Home</a>
      <span>/</span>
      <a href="/experiences" class="hover:text-primary transition-colors">Experiences</a>
      <span>/</span>
      <span class="text-base-content/70">{experience.name}</span>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

      <!-- LEFT: Main Content -->
      <div class="lg:col-span-2 flex flex-col gap-8">

        <!-- Image Gallery -->
        <div class="flex flex-col gap-3">
          <!-- Main image -->
          <div class="rounded-2xl overflow-hidden h-80 md:h-[420px] w-full">
            <img
              src={experience.images[activeImage]}
              alt={experience.name}
              class="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <!-- Thumbnails -->
          <div class="flex gap-2">
            {#each experience.images as img, i}
              <button
                onclick={() => activeImage = i}
                class="w-20 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 flex-shrink-0
                  {activeImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}"
              >
                <img src={img} alt="thumb" class="w-full h-full object-cover"/>
              </button>
            {/each}
          </div>
        </div>

        <!-- Title & Meta -->
        <div>
          <div class="flex items-center gap-2 mb-3">
            <span class="badge {typeColors[experience.type] ?? 'badge-neutral'} badge-sm capitalize font-semibold">
              {experience.type}
            </span>
            <span class="text-xs text-base-content/40">{nights} nights</span>
          </div>

          <h1 class="text-3xl font-bold text-base-content mb-3 leading-tight"
            style="font-family: 'Clash Display', sans-serif;">
            {experience.name}
          </h1>

          <!-- Quick stats -->
          <div class="flex flex-wrap gap-4 text-sm text-base-content/60">
            <span class="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              {experience.destination}
            </span>
            <span class="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
              {new Date(experience.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              &nbsp;→&nbsp;
              {new Date(experience.end_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span class="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
              {experience.min_members}–{experience.max_members} members
            </span>
          </div>
        </div>

        <!-- Divider -->
        <div class="divider my-0"></div>

        <!-- Description -->
        <div>
          <h2 class="text-lg font-semibold text-base-content mb-3"
            style="font-family: 'Clash Display', sans-serif;">About this experience</h2>
          <p class="text-sm text-base-content/70 leading-relaxed whitespace-pre-line">
            {experience.description}
          </p>
        </div>

        <!-- Includes / Excludes -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="bg-secondary/5 border border-secondary/20 rounded-2xl p-5">
            <h3 class="text-sm font-semibold text-secondary mb-3">✓ What's included</h3>
            <ul class="flex flex-col gap-2">
              {#each experience.includes as item}
                <li class="text-sm text-base-content/70 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0"></span>
                  {item}
                </li>
              {/each}
            </ul>
          </div>
          <div class="bg-error/5 border border-error/20 rounded-2xl p-5">
            <h3 class="text-sm font-semibold text-error mb-3">✕ Not included</h3>
            <ul class="flex flex-col gap-2">
              {#each experience.excludes as item}
                <li class="text-sm text-base-content/70 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-error flex-shrink-0"></span>
                  {item}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <!-- Requirements -->
        <div class="bg-base-200 rounded-2xl p-5 flex flex-col gap-4">
          <div>
            <h3 class="text-sm font-semibold text-base-content mb-1">Requirements</h3>
            <p class="text-sm text-base-content/60">{experience.requirements}</p>
          </div>
          <div class="divider my-0"></div>
          <div>
            <h3 class="text-sm font-semibold text-base-content mb-1">Prerequisites</h3>
            <p class="text-sm text-base-content/60">{experience.prerequisites}</p>
          </div>
          <div class="divider my-0"></div>
          <div>
            <h3 class="text-sm font-semibold text-base-content mb-1">📣 Notifications</h3>
            <p class="text-sm text-base-content/60">{experience.notifications}</p>
          </div>
        </div>

      </div>

      <!-- RIGHT: Booking Card (sticky) -->
      <div class="lg:col-span-1">
        <div class="sticky top-20 flex flex-col gap-4">

          <!-- Price card -->
          <div class="bg-white border border-base-200 rounded-2xl shadow-sm p-6 flex flex-col gap-5">

            <div>
              <p class="text-xs text-base-content/40 uppercase tracking-widest mb-1">Price per person</p>
              <p class="text-3xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
                ₹{experience.cost_per_person.toLocaleString('en-IN')}
              </p>
            </div>

            <div class="divider my-0"></div>

            <!-- Member selector -->
            <div>
              <label class="text-sm font-medium text-base-content block mb-2">Number of members</label>
              <div class="flex items-center gap-3">
                <button
                  class="btn btn-sm btn-outline btn-square rounded-lg"
                  onclick={() => members = Math.max(experience.min_members, members - 1)}
                >−</button>
                <span class="text-lg font-bold w-8 text-center text-base-content">{members}</span>
                <button
                  class="btn btn-sm btn-outline btn-square rounded-lg"
                  onclick={() => members = Math.min(experience.max_members, members + 1)}
                >+</button>
                <span class="text-xs text-base-content/40 ml-1">
                  min {experience.min_members} · max {experience.max_members}
                </span>
              </div>
            </div>

            <!-- Total -->
            <div class="bg-base-200 rounded-xl p-4 flex items-center justify-between">
              <span class="text-sm text-base-content/60">Total cost</span>
              <span class="text-xl font-bold text-primary" style="font-family: 'Clash Display', sans-serif;">
                ₹{totalCost.toLocaleString('en-IN')}
              </span>
            </div>

            <!-- CTA -->
            <a href="/experiences/{experience.slug}/book" class="btn btn-primary w-full rounded-xl font-semibold text-sm">
              Book Now →
            </a>

            <p class="text-xs text-center text-base-content/40">
              No payment charged yet. Review before confirming.
            </p>
          </div>

          <!-- Chat card -->
          <div class="bg-white border border-base-200 rounded-2xl p-5 flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#834AED" stroke-width="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold text-base-content">Have questions?</p>
              <p class="text-xs text-base-content/50">Chat with our team</p>
            </div>
            <a href="/experiences/{experience.slug}/chat" class="btn btn-sm btn-outline rounded-lg text-xs">
              Chat
            </a>
          </div>

        </div>
      </div>

    </div>
  </div>
</div>