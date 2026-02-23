<script>
  import { onMount } from 'svelte';
  import { destinations } from './data.js';

  // ── State ──────────────────────────────────────────────
  let search = '';
  let activeRegion = 'All';
  let activeTag = 'All';
  let sortBy = 'featured';
  let visible = false;
  let viewMode = 'grid'; // 'grid' | 'list'

  const regions = ['All', 'Asia', 'Europe', 'Americas', 'Africa', 'Oceania'];
  const tags = ['All', 'Beach', 'Mountains', 'Culture', 'Adventure', 'Food', 'Wildlife', 'City'];

  // ── Derived ────────────────────────────────────────────
  $: filtered = destinations
    .filter((d) => {
      const matchSearch =
        search === '' ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.country.toLowerCase().includes(search.toLowerCase());
      const matchRegion = activeRegion === 'All' || d.region === activeRegion;
      const matchTag = activeTag === 'All' || d.tags.includes(activeTag);
      return matchSearch && matchRegion && matchTag;
    })
    .sort((a, b) => {
      if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  onMount(() => {
    setTimeout(() => (visible = true), 80);
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');

  :global(body) {
    font-family: 'Outfit', sans-serif;
  }

  .serif {
    font-family: 'Cormorant Garamond', serif;
  }

  /* Page header bg */
  .page-header {
    background:
      radial-gradient(ellipse 70% 80% at 80% -10%, rgba(131, 74, 237, 0.2) 0%, transparent 65%),
      radial-gradient(ellipse 40% 50% at 0% 100%, rgba(34, 211, 238, 0.1) 0%, transparent 60%),
      #F8FAFC;
    position: relative;
    overflow: hidden;
  }

  .page-header::before {
    content: 'DESTINATIONS';
    position: absolute;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(80px, 18vw, 200px);
    font-weight: 700;
    color: rgba(131, 74, 237, 0.04);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    pointer-events: none;
    letter-spacing: -4px;
    user-select: none;
  }

  .fade-up {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Destination card */
  .dest-card {
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
  }
  .dest-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 24px 48px rgba(0, 0, 0, 0.18);
  }

  .dest-card .card-bg {
    position: absolute;
    inset: 0;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .dest-card:hover .card-bg {
    transform: scale(1.06);
  }

  .dest-card .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
  }

  .dest-card .content {
    position: relative;
    z-index: 10;
  }

  .dest-card-featured {
    grid-column: span 2;
    min-height: 460px;
  }
  .dest-card-regular {
    min-height: 320px;
  }

  /* Filter pill */
  .pill {
    padding: 6px 18px;
    border-radius: 9999px;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    border: 1.5px solid transparent;
    transition: all 0.2s ease;
    white-space: nowrap;
  }
  .pill-active {
    background: #834AED;
    color: white;
    border-color: #834AED;
  }
  .pill-inactive {
    background: transparent;
    color: #0F172A;
    border-color: #E2E8F0;
  }
  .pill-inactive:hover {
    border-color: #834AED;
    color: #834AED;
  }

  /* List view card */
  .list-card {
    display: flex;
    border-radius: 16px;
    overflow: hidden;
    background: white;
    border: 1px solid #E2E8F0;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }
  .list-card:hover {
    box-shadow: 0 8px 24px rgba(131, 74, 237, 0.1);
    transform: translateY(-2px);
  }

  .results-count {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-style: italic;
  }

  .search-wrap {
    position: relative;
  }
  .search-wrap .search-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #94A3B8;
    pointer-events: none;
  }
  .search-wrap input {
    padding-left: 40px;
  }

  @media (max-width: 768px) {
    .dest-card-featured {
      grid-column: span 1;
      min-height: 300px;
    }
  }
</style>

<!-- ───────────── PAGE HEADER ───────────── -->
<section class="page-header px-6 md:px-16 lg:px-28 pt-24 pb-20">
  <div class="max-w-6xl mx-auto">
    <p class="text-xs tracking-[0.25em] uppercase text-primary font-semibold mb-5 fade-up {visible ? 'visible' : ''}" style="transition-delay:0.05s">
      120+ destinations worldwide
    </p>

    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <h1 class="serif text-6xl md:text-8xl font-bold text-base-content leading-none fade-up {visible ? 'visible' : ''}" style="transition-delay:0.1s">
        Where do<br />
        you want<br />
        to <span class="text-primary italic">go?</span>
      </h1>

      <p class="text-base-content/60 max-w-sm text-base leading-relaxed fade-up {visible ? 'visible' : ''}" style="transition-delay:0.2s">
        From ancient temples to untouched wilderness — browse our hand-picked destinations and start planning your next story.
      </p>
    </div>
  </div>
</section>

<!-- ───────────── FILTERS ───────────── -->
<section class="sticky top-0 z-30 bg-base-100/95 backdrop-blur-md border-b border-base-300 shadow-sm">
  <div class="max-w-6xl mx-auto px-6 md:px-16 lg:px-28 py-4 flex flex-col gap-3">

    <!-- Top row: search + sort + view toggle -->
    <div class="flex flex-wrap gap-3 items-center justify-between">
      <!-- Search -->
      <div class="search-wrap flex-1 min-w-[200px] max-w-sm">
        <span class="search-icon">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </span>
        <input
          type="text"
          class="input input-bordered input-sm w-full rounded-full text-sm"
          placeholder="Search destinations…"
          bind:value={search}
        />
      </div>

      <div class="flex items-center gap-2">
        <!-- Sort -->
        <select class="select select-bordered select-sm rounded-full text-sm" bind:value={sortBy}>
          <option value="featured">Featured First</option>
          <option value="rating">Top Rated</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>

        <!-- View toggle -->
        <div class="flex border border-base-300 rounded-full overflow-hidden">
          <button
            class="px-3 py-1.5 text-xs transition-colors {viewMode === 'grid' ? 'bg-primary text-white' : 'bg-base-100 text-base-content/50 hover:text-primary'}"
            on:click={() => (viewMode = 'grid')}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2zM1 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V7zM1 12a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2z"/>
            </svg>
          </button>
          <button
            class="px-3 py-1.5 text-xs transition-colors {viewMode === 'list' ? 'bg-primary text-white' : 'bg-base-100 text-base-content/50 hover:text-primary'}"
            on:click={() => (viewMode = 'list')}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Region pills -->
    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {#each regions as r}
        <button
          class="pill {activeRegion === r ? 'pill-active' : 'pill-inactive'}"
          on:click={() => (activeRegion = r)}
        >{r}</button>
      {/each}
      <div class="w-px h-6 bg-base-300 self-center mx-1"></div>
      {#each tags as t}
        <button
          class="pill {activeTag === t ? 'pill-active' : 'pill-inactive'}"
          on:click={() => (activeTag = t)}
        >{t}</button>
      {/each}
    </div>
  </div>
</section>

<!-- ───────────── RESULTS ───────────── -->
<main class="max-w-6xl mx-auto px-6 md:px-16 lg:px-28 py-12">

  <!-- Results count -->
  <div class="flex items-center justify-between mb-8">
    <p class="results-count text-base-content/50">
      Showing <strong class="text-base-content font-semibold not-italic">{filtered.length}</strong> destination{filtered.length !== 1 ? 's' : ''}
      {#if activeRegion !== 'All' || activeTag !== 'All' || search}
        <span class="text-primary"> · filtered</span>
      {/if}
    </p>

    {#if activeRegion !== 'All' || activeTag !== 'All' || search}
      <button
        class="btn btn-ghost btn-xs text-primary"
        on:click={() => { activeRegion = 'All'; activeTag = 'All'; search = ''; }}
      >
        Clear filters ×
      </button>
    {/if}
  </div>

  <!-- Empty state -->
  {#if filtered.length === 0}
    <div class="text-center py-32">
      <p class="serif text-5xl font-bold text-base-content/20 mb-4">No destinations found</p>
      <p class="text-base-content/50">Try adjusting your filters or search term.</p>
    </div>
  {:else if viewMode === 'grid'}

    <!-- GRID VIEW -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each filtered as dest, i}
        <div
          class="dest-card {i === 0 && dest.featured ? 'dest-card-featured lg:col-span-2' : 'dest-card-regular'}"
          style="transition-delay: {i * 0.05}s"
        >
          <!-- Card background gradient -->
          <div class="card-bg bg-gradient-to-br {dest.gradient} w-full h-full absolute inset-0 flex items-center justify-center">
            <span class="text-8xl opacity-20 select-none">{dest.emoji}</span>
          </div>

          <!-- Overlay -->
          <div class="overlay"></div>

          <!-- Content -->
          <div class="content flex flex-col justify-between h-full p-6 {i === 0 && dest.featured ? 'min-h-[460px]' : 'min-h-[320px]'}">
            <!-- Top -->
            <div class="flex items-start justify-between">
              {#if dest.badge}
                <span class="badge {dest.badgeColor} badge-sm font-medium">{dest.badge}</span>
              {:else}
                <div></div>
              {/if}
              <button class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center backdrop-blur-sm transition-colors">
                <svg width="14" height="14" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            <!-- Bottom -->
            <div>
              <div class="flex flex-wrap gap-1.5 mb-3">
                {#each dest.tags as tag}
                  <span class="text-xs px-2 py-0.5 rounded-full bg-white/15 text-white/80 backdrop-blur-sm">{tag}</span>
                {/each}
              </div>
              <h3 class="serif text-3xl font-bold text-white leading-tight">{dest.name}</h3>
              <p class="text-white/60 text-sm mt-0.5 font-medium">{dest.country} · {dest.region}</p>
              <p class="text-white/75 text-sm mt-2 leading-relaxed line-clamp-2">{dest.description}</p>

              <div class="mt-4 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <span class="text-white/90 text-sm flex items-center gap-1">
                    <svg class="inline" width="12" height="12" fill="#F59E0B" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {dest.rating}
                    <span class="text-white/40 text-xs">({dest.reviews.toLocaleString()})</span>
                  </span>
                  <span class="text-white/60 text-xs">{dest.duration}</span>
                </div>
                <div class="text-right">
                  <span class="text-white/50 text-xs">From</span>
                  <span class="text-white font-semibold text-lg ml-1">${dest.price.toLocaleString()}</span>
                </div>
              </div>

              <a
                href="/destinations/{dest.id}"
                class="mt-4 w-full btn btn-sm rounded-full bg-white/15 hover:bg-white text-white hover:text-base-content border-white/30 backdrop-blur-sm transition-all font-medium"
              >
                Explore {dest.name} →
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>

  {:else}

    <!-- LIST VIEW -->
    <div class="flex flex-col gap-4">
      {#each filtered as dest, i}
        <div class="list-card" style="transition-delay: {i * 0.04}s">
          <!-- Color strip -->
          <div class="w-2 flex-shrink-0 bg-gradient-to-b {dest.gradient}"></div>

          <!-- Emoji block -->
          <div class="w-20 h-20 md:w-28 md:h-auto flex-shrink-0 flex items-center justify-center text-4xl bg-gradient-to-br {dest.gradient} self-stretch">
            {dest.emoji}
          </div>

          <!-- Info -->
          <div class="flex-1 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="flex-1">
              <div class="flex items-center gap-2 flex-wrap mb-1">
                <h3 class="serif text-xl font-bold text-base-content">{dest.name}</h3>
                <span class="text-base-content/40 text-sm">{dest.country}</span>
                {#if dest.badge}
                  <span class="badge {dest.badgeColor} badge-xs">{dest.badge}</span>
                {/if}
              </div>
              <p class="text-base-content/60 text-sm leading-relaxed line-clamp-2">{dest.description}</p>
              <div class="flex flex-wrap gap-1.5 mt-2">
                {#each dest.tags as tag}
                  <span class="text-xs px-2 py-0.5 rounded-full bg-base-200 text-base-content/60">{tag}</span>
                {/each}
              </div>
            </div>

            <div class="flex items-center gap-6 flex-shrink-0">
              <div class="text-center hidden md:block">
                <div class="text-xs text-base-content/40 mb-0.5">Rating</div>
                <div class="font-semibold text-warning flex items-center gap-0.5">
                  <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {dest.rating}
                </div>
              </div>
              <div class="text-center hidden md:block">
                <div class="text-xs text-base-content/40 mb-0.5">Duration</div>
                <div class="font-semibold text-base-content text-sm">{dest.duration}</div>
              </div>
              <div class="text-right">
                <div class="text-xs text-base-content/40 mb-0.5">From</div>
                <div class="font-bold text-primary text-xl serif">${dest.price.toLocaleString()}</div>
              </div>
              <a href="/destinations/{dest.id}" class="btn btn-primary btn-sm rounded-full">
                View
              </a>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</main>

<!-- ───────────── BOTTOM CTA BAND ───────────── -->
<section class="bg-base-200 border-t border-base-300 py-16 px-6 text-center">
  <p class="serif text-3xl md:text-4xl font-bold text-base-content mb-3">
    Can't find what you're looking for?
  </p>
  <p class="text-base-content/60 mb-6">Our travel specialists can build a custom itinerary just for you.</p>
  <a href="/contact" class="btn btn-primary rounded-full px-10">Talk to a Specialist</a>
</section>