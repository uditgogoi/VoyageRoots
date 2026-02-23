<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { getDestinationById } from '../data.js';

  // Grab destination from URL param
  $: dest = getDestinationById($page.params.id);

  // UI state
  let visible = false;
  let activeTab = 'overview'; // 'overview' | 'experiences' | 'plan'
  let selectedExperience = null;
  let bookingGuests = 2;

  // Experiences filter
  let expFilter = 'All';
  $: expTypes = dest
    ? ['All', ...new Set(dest.experiences.map((e) => e.type))]
    : ['All'];
  $: filteredExps = dest
    ? dest.experiences.filter((e) => expFilter === 'All' || e.type === expFilter)
    : [];

  // Total booking estimate
  $: bookingTotal = dest ? dest.price * bookingGuests : 0;

  onMount(() => {
    setTimeout(() => (visible = true), 80);
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

  :global(body) {
    font-family: 'Outfit', sans-serif;
  }

  .serif { font-family: 'Cormorant Garamond', serif; }

  /* ── Hero ─────────────────────────────────────────── */
  .hero-wrap {
    position: relative;
    height: 92vh;
    min-height: 560px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(180px, 30vw, 400px);
    transition: transform 0.6s ease;
    user-select: none;
  }
  .hero-wrap:hover .hero-bg {
    transform: scale(1.04);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.88) 0%,
      rgba(0, 0, 0, 0.4) 40%,
      rgba(0, 0, 0, 0.15) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 10;
    padding: 2.5rem clamp(1.5rem, 5vw, 7rem) 3rem;
  }

  /* ── Sticky nav tabs ──────────────────────────────── */
  .tab-bar {
    position: sticky;
    top: 0;
    z-index: 40;
    background: rgba(248, 250, 252, 0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #E2E8F0;
  }

  .tab-btn {
    padding: 14px 24px;
    font-size: 0.875rem;
    font-weight: 500;
    border-bottom: 2.5px solid transparent;
    transition: color 0.2s, border-color 0.2s;
    color: #64748B;
    white-space: nowrap;
  }
  .tab-btn:hover { color: #834AED; }
  .tab-btn.active {
    color: #834AED;
    border-bottom-color: #834AED;
  }

  /* ── Layout ───────────────────────────────────────── */
  .page-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 2.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem clamp(1rem, 4vw, 4rem);
    align-items: start;
  }
  @media (max-width: 1024px) {
    .page-grid { grid-template-columns: 1fr; }
    .sidebar-col { order: -1; }
  }

  /* ── Quick-fact pills ─────────────────────────────── */
  .fact-chip {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #F8FAFC;
    border: 1px solid #E2E8F0;
    border-radius: 14px;
    padding: 1rem 1.25rem;
    min-width: 130px;
  }

  /* ── Highlight card ───────────────────────────────── */
  .highlight-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #834AED;
    flex-shrink: 0;
    margin-top: 5px;
  }

  /* ── Experience cards ─────────────────────────────── */
  .exp-card {
    border: 1.5px solid #E2E8F0;
    border-radius: 18px;
    overflow: hidden;
    background: white;
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s;
    cursor: pointer;
  }
  .exp-card:hover {
    box-shadow: 0 12px 32px rgba(131, 74, 237, 0.12);
    transform: translateY(-3px);
    border-color: rgba(131, 74, 237, 0.3);
  }
  .exp-card.selected {
    border-color: #834AED;
    box-shadow: 0 0 0 3px rgba(131, 74, 237, 0.12);
  }

  .exp-badge-highlight {
    position: absolute;
    top: 12px;
    right: 12px;
    background: #834AED;
    color: white;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 999px;
  }

  /* ── Booking sidebar ──────────────────────────────── */
  .booking-card {
    border: 1.5px solid #E2E8F0;
    border-radius: 20px;
    background: white;
    box-shadow: 0 8px 32px rgba(0,0,0,0.06);
    overflow: hidden;
    position: sticky;
    top: 72px;
  }

  .price-display {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.8rem;
    font-weight: 700;
    color: #834AED;
    line-height: 1;
  }

  /* ── fade-up ──────────────────────────────────────── */
  .fade-up {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-up.visible { opacity: 1; transform: translateY(0); }
</style>

{#if !dest}
  <!-- 404 state -->
  <div class="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
    <p class="serif text-7xl text-base-content/10 font-bold">404</p>
    <p class="text-2xl font-semibold text-base-content">Destination not found</p>
    <p class="text-base-content/50">We couldn't find a destination with that ID.</p>
    <a href="/destinations" class="btn btn-primary rounded-full mt-2">← Back to Destinations</a>
  </div>

{:else}

  <!-- ───────────── HERO ───────────── -->
  <section class="hero-wrap">
    <!-- Gradient bg + big emoji -->
    <div class="hero-bg bg-gradient-to-br {dest.gradient}">
      <span class="opacity-25">{dest.emoji}</span>
    </div>
    <div class="hero-overlay"></div>

    <!-- Back button -->
    <a
      href="/destinations"
      class="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors group"
    >
      <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" class="group-hover:-translate-x-1 transition-transform">
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </svg>
      All Destinations
    </a>

    <!-- Hero content -->
    <div class="hero-content fade-up {visible ? 'visible' : ''}">
      <div class="flex flex-wrap items-center gap-2 mb-4">
        <span class="text-white/60 text-sm font-medium tracking-wider uppercase">{dest.region}</span>
        <span class="text-white/30">·</span>
        <span class="text-white/60 text-sm">{dest.country}</span>
        {#if dest.badge}
          <span class="badge {dest.badgeColor} badge-sm ml-1">{dest.badge}</span>
        {/if}
      </div>

      <h1 class="serif text-6xl sm:text-7xl md:text-8xl font-bold text-white leading-none">
        {dest.name}
      </h1>

      <p class="mt-4 text-white/70 text-lg max-w-2xl leading-relaxed">
        {dest.description}
      </p>

      <div class="mt-6 flex flex-wrap items-center gap-6">
        <!-- Rating -->
        <div class="flex items-center gap-2 text-white">
          <svg width="16" height="16" fill="#F59E0B" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          <span class="font-semibold">{dest.rating}</span>
          <span class="text-white/50 text-sm">({dest.reviews.toLocaleString()} reviews)</span>
        </div>
        <!-- Tags -->
        {#each dest.tags as tag}
          <span class="px-3 py-1 rounded-full bg-white/15 text-white/80 text-sm backdrop-blur-sm">{tag}</span>
        {/each}
        <!-- Duration -->
        <span class="text-white/50 text-sm">{dest.duration} recommended</span>
      </div>
    </div>
  </section>

  <!-- ───────────── TAB BAR ───────────── -->
  <nav class="tab-bar">
    <div class="max-w-screen-xl mx-auto px-6 md:px-12 flex gap-1 overflow-x-auto">
      {#each [['overview','Overview'], ['experiences','Experiences'], ['plan','Plan & Book']] as [key, label]}
        <button
          class="tab-btn {activeTab === key ? 'active' : ''}"
          on:click={() => activeTab = key}
        >{label}</button>
      {/each}
    </div>
  </nav>

  <!-- ───────────── MAIN CONTENT ───────────── -->
  <div class="page-grid">

    <!-- ── LEFT COLUMN ── -->
    <div class="main-col space-y-14">

      <!-- ◆ OVERVIEW TAB ───────────────────────── -->
      {#if activeTab === 'overview'}

        <!-- About section -->
        <section class="fade-up {visible ? 'visible' : ''}" style="transition-delay:0.1s">
          <div class="flex items-center gap-3 mb-5">
            <div class="w-10 h-[3px] rounded-full bg-gradient-to-r from-primary to-secondary"></div>
            <h2 class="serif text-3xl font-bold text-base-content">About {dest.name}</h2>
          </div>
          <p class="text-base-content/70 leading-[1.85] text-base">{dest.overview}</p>
        </section>

        <!-- Quick facts -->
        <section class="fade-up {visible ? 'visible' : ''}" style="transition-delay:0.15s">
          <h3 class="serif text-2xl font-bold text-base-content mb-5">At a Glance</h3>
          <div class="flex flex-wrap gap-3">
            {#each [
              { label: 'Language', value: dest.language, icon: '🗣️' },
              { label: 'Currency', value: dest.currency, icon: '💱' },
              { label: 'Timezone', value: dest.timezone, icon: '🕐' },
              { label: 'Climate', value: dest.climate, icon: '🌤️' },
              { label: 'Best Time', value: dest.bestTime, icon: '📅' },
            ] as f}
              <div class="fact-chip text-center flex-1" style="min-width:140px">
                <span class="text-2xl mb-1">{f.icon}</span>
                <span class="text-xs text-base-content/40 uppercase tracking-widest">{f.label}</span>
                <span class="text-sm font-medium text-base-content text-center mt-0.5">{f.value}</span>
              </div>
            {/each}
          </div>
        </section>

        <!-- Destination stats -->
        <section class="fade-up {visible ? 'visible' : ''}" style="transition-delay:0.2s">
          <h3 class="serif text-2xl font-bold text-base-content mb-5">Key Facts</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {#each dest.quickFacts as fact}
              <div class="bg-base-200 rounded-2xl p-4 text-center">
                <p class="text-xs text-base-content/40 uppercase tracking-widest mb-1">{fact.label}</p>
                <p class="font-semibold text-base-content text-sm">{fact.value}</p>
              </div>
            {/each}
          </div>
        </section>

        <!-- Highlights -->
        <section class="fade-up {visible ? 'visible' : ''}" style="transition-delay:0.25s">
          <h3 class="serif text-2xl font-bold text-base-content mb-5">Must-See Highlights</h3>
          <ul class="space-y-3">
            {#each dest.highlights as hl, i}
              <li class="flex items-start gap-3 group">
                <div class="highlight-dot mt-[5px] group-hover:scale-125 transition-transform"></div>
                <div>
                  <span class="font-medium text-base-content">{hl}</span>
                </div>
                <span class="ml-auto text-xs text-base-content/30 font-mono mt-1">0{i+1}</span>
              </li>
            {/each}
          </ul>
        </section>

        <!-- CTA to experiences -->
        <div class="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p class="font-semibold text-base-content">Ready to explore {dest.name}?</p>
            <p class="text-sm text-base-content/60 mt-1">{dest.experiences.length} curated experiences available</p>
          </div>
          <button class="btn btn-primary rounded-full" on:click={() => activeTab = 'experiences'}>
            See Experiences →
          </button>
        </div>

      <!-- ◆ EXPERIENCES TAB ──────────────────────── -->
      {:else if activeTab === 'experiences'}

        <section>
          <div class="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <div class="w-10 h-[3px] rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                <h2 class="serif text-3xl font-bold text-base-content">Experiences in {dest.name}</h2>
              </div>
              <p class="text-base-content/50 text-sm">{dest.experiences.length} handpicked experiences by our local team</p>
            </div>
          </div>

          <!-- Type filter pills -->
          <div class="flex flex-wrap gap-2 mb-8">
            {#each expTypes as t}
              <button
                class="px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                  {expFilter === t
                    ? 'bg-primary text-white border-primary'
                    : 'bg-transparent text-base-content border-base-300 hover:border-primary hover:text-primary'
                  }"
                on:click={() => expFilter = t}
              >{t}</button>
            {/each}
          </div>

          <!-- Experience cards grid -->
          <div class="grid gap-5 sm:grid-cols-2">
            {#each filteredExps as exp}
              <div
                class="exp-card {selectedExperience === exp.id ? 'selected' : ''}"
                on:click={() => selectedExperience = selectedExperience === exp.id ? null : exp.id}
                role="button"
                tabindex="0"
                on:keydown={(e) => e.key === 'Enter' && (selectedExperience = selectedExperience === exp.id ? null : exp.id)}
              >
                <!-- Emoji header -->
                <div
                  class="relative h-28 flex items-center justify-center text-6xl bg-gradient-to-br {dest.gradient} select-none"
                >
                  <span class="opacity-60">{exp.emoji}</span>
                  {#if exp.highlight}
                    <span class="exp-badge-highlight">Staff Pick</span>
                  {/if}
                </div>

                <!-- Body -->
                <div class="p-5">
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <h4 class="font-semibold text-base-content leading-snug">{exp.title}</h4>
                    <span class="badge badge-ghost badge-sm flex-shrink-0 mt-0.5">{exp.type}</span>
                  </div>

                  <p class="text-sm text-base-content/60 leading-relaxed mb-4">{exp.description}</p>

                  <!-- Meta row -->
                  <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/50 mb-4">
                    <span class="flex items-center gap-1">
                      <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                      {exp.duration}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                      {exp.groupSize}
                    </span>
                    <span class="flex items-center gap-1 text-warning">
                      <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      {exp.rating} <span class="text-base-content/40">({exp.reviews})</span>
                    </span>
                  </div>

                  <!-- Tags -->
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    {#each exp.tags as tag}
                      <span class="text-xs px-2 py-0.5 rounded-full bg-base-200 text-base-content/60">{tag}</span>
                    {/each}
                  </div>

                  <!-- Price & CTA -->
                  <div class="flex items-center justify-between pt-3 border-t border-base-200">
                    <div>
                      <span class="text-xs text-base-content/40">From</span>
                      <span class="serif text-2xl font-bold text-primary ml-1.5">${exp.price}</span>
                      <span class="text-xs text-base-content/40">/person</span>
                    </div>
                    <button
                      class="btn btn-primary btn-sm rounded-full"
                      on:click|stopPropagation={() => activeTab = 'plan'}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            {/each}
          </div>
        </section>

      <!-- ◆ PLAN & BOOK TAB ─────────────────────── -->
      {:else}

        <section class="space-y-8">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <div class="w-10 h-[3px] rounded-full bg-gradient-to-r from-primary to-secondary"></div>
              <h2 class="serif text-3xl font-bold text-base-content">Plan Your Trip</h2>
            </div>
            <p class="text-base-content/50 text-sm">Select your dates, guests, and add experiences to your itinerary.</p>
          </div>

          <!-- Date pickers -->
          <div class="grid sm:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Departure Date</span></label>
              <input type="date" class="input input-bordered rounded-xl" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text font-medium">Return Date</span></label>
              <input type="date" class="input input-bordered rounded-xl" />
            </div>
          </div>

          <!-- Guests -->
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Number of Guests</span></label>
            <div class="flex items-center gap-4">
              <button
                class="btn btn-outline btn-circle btn-sm"
                on:click={() => bookingGuests = Math.max(1, bookingGuests - 1)}
              >−</button>
              <span class="text-2xl font-bold text-base-content w-8 text-center serif">{bookingGuests}</span>
              <button
                class="btn btn-outline btn-circle btn-sm"
                on:click={() => bookingGuests = Math.min(20, bookingGuests + 1)}
              >+</button>
              <span class="text-sm text-base-content/50 ml-2">guests</span>
            </div>
          </div>

          <!-- Add experiences -->
          <div>
            <h3 class="serif text-2xl font-bold text-base-content mb-4">Add Experiences</h3>
            <div class="space-y-3">
              {#each dest.experiences as exp}
                <label class="flex items-center gap-4 p-4 border border-base-300 rounded-xl cursor-pointer hover:border-primary/40 transition-colors group">
                  <input type="checkbox" class="checkbox checkbox-primary" />
                  <span class="text-2xl">{exp.emoji}</span>
                  <div class="flex-1">
                    <p class="font-medium text-base-content group-hover:text-primary transition-colors text-sm">{exp.title}</p>
                    <p class="text-xs text-base-content/50">{exp.duration} · {exp.type}</p>
                  </div>
                  <span class="text-primary font-semibold serif text-lg">${exp.price}<span class="text-xs font-normal text-base-content/40">/pp</span></span>
                </label>
              {/each}
            </div>
          </div>

          <!-- Special requests -->
          <div class="form-control">
            <label class="label"><span class="label-text font-medium">Special Requests</span></label>
            <textarea
              class="textarea textarea-bordered rounded-xl h-28 resize-none"
              placeholder="Dietary requirements, accessibility needs, anniversaries, anything else…"
            ></textarea>
          </div>

          <!-- Submit -->
          <button class="btn btn-primary btn-lg w-full rounded-full text-base shadow-lg shadow-primary/20">
            Request to Book — Est. ${bookingTotal.toLocaleString()}
          </button>
          <p class="text-xs text-base-content/40 text-center">
            No payment yet. A specialist will confirm availability within 24 hours.
          </p>
        </section>

      {/if}
    </div>

    <!-- ── RIGHT SIDEBAR ── -->
    <aside class="sidebar-col">
      <div class="booking-card">
        <!-- Price header -->
        <div class="bg-gradient-to-br {dest.gradient} p-6 text-white">
          <p class="text-white/60 text-sm uppercase tracking-widest">Packages from</p>
          <div class="price-display mt-1 text-white">${dest.price.toLocaleString()}</div>
          <p class="text-white/60 text-sm mt-0.5">per person · {dest.duration}</p>

          <div class="flex items-center gap-1.5 mt-3">
            <svg width="13" height="13" fill="#F59E0B" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span class="text-white text-sm font-semibold">{dest.rating}</span>
            <span class="text-white/50 text-xs">({dest.reviews.toLocaleString()} reviews)</span>
          </div>
        </div>

        <!-- Quick info -->
        <div class="p-5 space-y-3 border-b border-base-200">
          {#each [
            { icon: '🗓️', label: 'Best Time', val: dest.bestTime },
            { icon: '⏱️', label: 'Duration', val: dest.duration },
            { icon: '🌍', label: 'Region', val: dest.region },
            { icon: '💬', label: 'Language', val: dest.language },
          ] as row}
            <div class="flex items-start gap-3">
              <span class="text-lg mt-0.5">{row.icon}</span>
              <div>
                <p class="text-xs text-base-content/40 uppercase tracking-wider">{row.label}</p>
                <p class="text-sm font-medium text-base-content">{row.val}</p>
              </div>
            </div>
          {/each}
        </div>

        <!-- Experiences count -->
        <div class="px-5 py-4 border-b border-base-200">
          <p class="text-xs text-base-content/40 uppercase tracking-wider mb-2">Experiences Available</p>
          <div class="flex flex-wrap gap-1.5">
            {#each [...new Set(dest.experiences.map(e => e.type))] as t}
              <span class="badge badge-ghost badge-sm">{t}</span>
            {/each}
          </div>
          <p class="text-primary font-semibold mt-2 text-sm">{dest.experiences.length} total experiences</p>
        </div>

        <!-- CTA buttons -->
        <div class="p-5 space-y-2">
          <button
            class="btn btn-primary w-full rounded-full"
            on:click={() => activeTab = 'plan'}
          >
            Book This Destination
          </button>
          <button
            class="btn btn-outline w-full rounded-full"
            on:click={() => activeTab = 'experiences'}
          >
            Browse Experiences
          </button>
        </div>

        <!-- Reassurance strip -->
        <div class="bg-base-200 px-5 py-3 text-center">
          <p class="text-xs text-base-content/50">✓ Free cancellation  ·  ✓ 24/7 support  ·  ✓ Best price guarantee</p>
        </div>
      </div>
    </aside>
  </div>

  <!-- ───────────── SIMILAR DESTINATIONS ───────────── -->
  <!-- Import and show 3 others at the bottom -->

{/if}