<script>
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';

  // Mock data — replace with Supabase fetch later
  const allExperiences = [
    {
      id: '1', slug: 'himalayan-trek', name: 'Himalayan Base Camp Trek',
      type: 'trek', destination: 'Himachal Pradesh', cost_per_person: 18500,
      min_members: 4, date: '2025-06-15',
      description: 'A breathtaking high-altitude trek through ancient Himalayan trails, glaciers, and remote villages.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
    },
    {
      id: '2', slug: 'ranthambore-safari', name: 'Ranthambore Tiger Safari',
      type: 'outing', destination: 'Rajasthan', cost_per_person: 12000,
      min_members: 2, date: '2025-05-10',
      description: 'Spot the majestic Bengal tiger in its natural habitat across the historic Ranthambore forest.',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80'
    },
    {
      id: '3', slug: 'kerala-backwaters', name: 'Kerala Backwater Stay',
      type: 'stay', destination: 'Kerala', cost_per_person: 9500,
      min_members: 2, date: '2025-07-01',
      description: 'Float through serene backwaters on a traditional houseboat, surrounded by lush paddy fields.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80'
    },
    {
      id: '4', slug: 'ladakh-road-trip', name: 'Ladakh Road Trip',
      type: 'tour', destination: 'Ladakh', cost_per_person: 22000,
      min_members: 3, date: '2025-08-05',
      description: 'Ride through the world\'s highest motorable passes, monasteries, and surreal lunar landscapes.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
    },
    {
      id: '5', slug: 'goa-water-sports', name: 'Goa Water Sports Package',
      type: 'sports', destination: 'Goa', cost_per_person: 6500,
      min_members: 2, date: '2025-05-20',
      description: 'Surf, parasail, jet ski and dive in the warm Arabian Sea with certified instructors.',
      image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=600&q=80'
    },
    {
      id: '6', slug: 'coorg-coffee-trail', name: 'Coorg Coffee Trail',
      type: 'tour', destination: 'Karnataka', cost_per_person: 8000,
      min_members: 2, date: '2025-06-01',
      description: 'Walk through misty coffee and spice plantations in the Scotland of India.',
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80'
    },
  ];

  const types = ['all', 'trek', 'tour', 'stay', 'outing', 'sports', 'custom'];

  let selectedType = $state('all');
  let searchQuery = $state('');
  let sortBy = $state('date');

  let filtered = $derived(
    allExperiences
      .filter(e => selectedType === 'all' || e.type === selectedType)
      .filter(e =>
        searchQuery === '' ||
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.destination.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.cost_per_person - b.cost_per_person;
        if (sortBy === 'price-high') return b.cost_per_person - a.cost_per_person;
        return new Date(a.date) - new Date(b.date);
      })
  );
</script>

<!-- Page -->
<div class="min-h-screen bg-white">

  <!-- Hero Header -->
  <div class="bg-base-200 border-b border-base-300 py-12 px-4">
    <div class="max-w-7xl mx-auto">
      <p class="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Explore</p>
      <h1 class="text-4xl font-bold text-base-content mb-3" style="font-family: 'Clash Display', sans-serif;">
        All Experiences
      </h1>
      <p class="text-base-content/50 text-sm max-w-lg">
        Hand-picked treks, safaris, stays and adventures across India. Find your next journey.
      </p>

      <!-- Search -->
      <div class="mt-6 flex items-center gap-2 max-w-md">
        <label class="input input-bordered flex items-center gap-2 w-full bg-white text-sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-base-content/40">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name or destination..."
            bind:value={searchQuery}
            class="grow bg-transparent outline-none"
          />
        </label>
      </div>
    </div>
  </div>

  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Filters Row -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">

      <!-- Type filters -->
      <div class="flex flex-wrap gap-2">
        {#each types as type}
          <button
            onclick={() => selectedType = type}
            class="btn btn-sm rounded-full capitalize font-medium
              {selectedType === type
                ? 'btn-primary'
                : 'btn-ghost border border-base-300 text-base-content/60 hover:border-primary hover:text-primary'}"
          >
            {type === 'all' ? '✦ All' : type}
          </button>
        {/each}
      </div>

      <!-- Sort -->
      <div class="flex items-center gap-2 text-sm">
        <span class="text-base-content/40 text-xs">Sort by</span>
        <select
          bind:value={sortBy}
          class="select select-bordered select-sm bg-white text-sm rounded-lg"
        >
          <option value="date">Date</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
    </div>

    <!-- Results count -->
    <p class="text-xs text-base-content/40 mb-5">
      Showing <span class="font-semibold text-base-content">{filtered.length}</span> experiences
    </p>

    <!-- Grid -->
    {#if filtered.length > 0}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each filtered as experience (experience.id)}
          <ExperienceCard {experience} />
        {/each}
      </div>
    {:else}
      <!-- Empty state -->
      <div class="flex flex-col items-center justify-center py-24 text-center">
        <div class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="text-base-content/30">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
        </div>
        <h3 class="font-semibold text-base-content mb-1" style="font-family: 'Clash Display', sans-serif;">
          No experiences found
        </h3>
        <p class="text-sm text-base-content/40">Try a different search or filter</p>
        <button onclick={() => { searchQuery = ''; selectedType = 'all'; }}
          class="btn btn-sm btn-outline mt-4 rounded-lg">
          Clear filters
        </button>
      </div>
    {/if}
  </div>
</div>