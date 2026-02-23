<script>
  let { experience } = $props();

  const typeColors = {
    trek: 'badge-primary',
    tour: 'badge-secondary',
    stay: 'badge-accent',
    outing: 'badge-info',
    sports: 'badge-warning',
    custom: 'badge-neutral',
  };
</script>

<div class="card bg-white border border-base-200 hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden group">
  <!-- Image -->
  <figure class="relative h-52 overflow-hidden">
    <img
      src={experience.image}
      alt={experience.name}
      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
    />
    <!-- Type badge -->
    <div class="absolute top-3 left-3">
      <span class="badge {typeColors[experience.type] ?? 'badge-neutral'} badge-sm font-semibold capitalize">
        {experience.type}
      </span>
    </div>
    <!-- Price -->
    <div class="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1 text-sm font-bold text-base-content">
      ₹{experience.cost_per_person.toLocaleString('en-IN')}
      <span class="text-xs font-normal text-base-content/50">/person</span>
    </div>
  </figure>

  <div class="card-body p-4 gap-2">
    <!-- Name -->
    <h3 class="card-title text-base font-semibold text-base-content leading-snug"
      style="font-family: 'Clash Display', sans-serif;">
      {experience.name}
    </h3>

    <!-- Destination & date -->
    <div class="flex items-center gap-3 text-xs text-base-content/50">
      <span class="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          <circle cx="12" cy="9" r="2.5"/>
        </svg>
        {experience.destination}
      </span>
      <span class="flex items-center gap-1">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
        {new Date(experience.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </span>
    </div>

    <!-- Description -->
    <p class="text-xs text-base-content/60 line-clamp-2 leading-relaxed">
      {experience.description}
    </p>

    <!-- Footer -->
    <div class="flex items-center justify-between mt-1 pt-3 border-t border-base-200">
      <div class="flex items-center gap-1 text-xs text-base-content/50">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
        Min {experience.min_members} members
      </div>
      <a href="/experiences/{experience.slug}" class="btn btn-primary btn-xs rounded-lg px-3 font-semibold">
        View →
      </a>
    </div>
  </div>
</div>