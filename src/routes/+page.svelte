<script>
  import ExperienceCard from '$lib/components/ExperienceCard.svelte';

  // Mock data — replace with Supabase fetch later
  const featured = [
    {
      id: '1', slug: 'himalayan-base-camp-trek', name: 'Himalayan Base Camp Trek',
      type: 'trek', destination: 'Himachal Pradesh', cost_per_person: 18500,
      min_members: 4, date: '2025-06-15',
      description: 'Breathtaking high-altitude trek through ancient Himalayan trails, glaciers and remote villages.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80'
    },
    {
      id: '2', slug: 'ranthambore-tiger-safari', name: 'Ranthambore Tiger Safari',
      type: 'outing', destination: 'Rajasthan', cost_per_person: 12000,
      min_members: 2, date: '2025-05-10',
      description: 'Spot the majestic Bengal tiger in its natural habitat across historic Ranthambore forest.',
      image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80'
    },
    {
      id: '3', slug: 'kerala-backwater-stay', name: 'Kerala Backwater Stay',
      type: 'stay', destination: 'Kerala', cost_per_person: 9500,
      min_members: 2, date: '2025-07-01',
      description: 'Float through serene backwaters on a traditional houseboat surrounded by lush paddy fields.',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80'
    },
    {
      id: '4', slug: 'ladakh-road-trip', name: 'Ladakh Road Trip',
      type: 'tour', destination: 'Ladakh', cost_per_person: 22000,
      min_members: 3, date: '2025-08-05',
      description: "Ride through the world's highest motorable passes, monasteries and surreal lunar landscapes.",
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'
    },
  ];

  const categories = [
    { label: 'Treks', icon: '🏔️', type: 'trek', bg: 'bg-primary/10', color: 'text-primary', count: 24 },
    { label: 'Safaris', icon: '🦁', type: 'outing', bg: 'bg-warning/10', color: 'text-warning', count: 18 },
    { label: 'Stays', icon: '🏡', type: 'stay', bg: 'bg-secondary/10', color: 'text-secondary', count: 32 },
    { label: 'Tours', icon: '🗺️', type: 'tour', bg: 'bg-info/10', color: 'text-info', count: 15 },
    { label: 'Sports', icon: '🏄', type: 'sports', bg: 'bg-accent/10', color: 'text-accent', count: 11 },
    { label: 'Outings', icon: '🌿', type: 'outing', bg: 'bg-success/10', color: 'text-success', count: 9 },
  ];

  const destinations = [
    { name: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', count: 14 },
    { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80', count: 11 },
    { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80', count: 9 },
    { name: 'Ladakh', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80', count: 7 },
    { name: 'Goa', image: 'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&q=80', count: 12 },
    { name: 'Uttarakhand', image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&q=80', count: 8 },
  ];

  const stats = [
    { value: '500+', label: 'Experiences' },
    { value: '12K+', label: 'Happy Travelers' },
    { value: '28', label: 'States Covered' },
    { value: '4.9★', label: 'Avg. Rating' },
  ];

  const howItWorks = [
    { step: '01', icon: '🔍', title: 'Browse', desc: 'Explore hundreds of curated experiences across India filtered by type, destination and budget.' },
    { step: '02', icon: '📅', title: 'Book', desc: 'Select your dates, add your group members and confirm your booking in under 2 minutes.' },
    { step: '03', icon: '🌄', title: 'Go', desc: 'Show up and experience the adventure. Everything is pre-arranged — just bring yourself.' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', location: 'Mumbai', text: 'The Ladakh trip was life-changing. Every detail was perfectly organized — from permits to campsites.', avatar: 'PS', rating: 5 },
    { name: 'Rahul Verma', location: 'Bangalore', text: 'Booked the Kerala backwater stay for our anniversary. Absolutely magical. Will be back for more!', avatar: 'RV', rating: 5 },
    { name: 'Ananya Nair', location: 'Delhi', text: 'As a solo traveler I was nervous, but the group trek was the best decision. Met amazing people.', avatar: 'AN', rating: 5 },
  ];

  let searchQuery = $state('');
</script>

<!-- ═══════════════════════════════════════════
     HERO
═══════════════════════════════════════════ -->
<section class="relative bg-white overflow-hidden">
  <!-- Background decoration -->
  <div class="absolute top-0 right-0 w-1/2 h-full bg-base-200 rounded-bl-[80px] -z-0"></div>
  <div class="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-0"></div>

  <div class="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    <!-- Left -->
    <div class="flex flex-col gap-6">
      <div class="inline-flex items-center gap-2 bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
        <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
        500+ experiences across India
      </div>

      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-base-content leading-[1.1]"
        style="font-family: 'Clash Display', sans-serif;">
        Discover India<br/>
        <span class="text-primary">Your Way</span>
      </h1>

      <p class="text-base-content/60 text-base leading-relaxed max-w-md">
        Hand-picked treks, safaris, stays and adventures. Book with verified operators, travel with confidence.
      </p>

      <!-- Search bar -->
      <div class="flex items-center gap-2 bg-white border border-base-300 rounded-2xl shadow-sm p-2 max-w-md">
        <div class="flex items-center gap-2 flex-1 px-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-base-content/30 flex-shrink-0">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search destinations, experiences..."
            class="bg-transparent outline-none text-sm text-base-content w-full placeholder:text-base-content/30"
          />
        </div>
        <a href="/experiences?q={searchQuery}" class="btn btn-primary btn-sm rounded-xl px-5 font-semibold text-sm">
          Search
        </a>
      </div>

      <!-- Quick links -->
      <div class="flex flex-wrap gap-2">
        {#each ['Himalayan Trek', 'Kerala Stay', 'Ladakh Tour', 'Tiger Safari'] as tag}
          <a href="/experiences?q={tag}"
            class="text-xs px-3 py-1.5 rounded-full border border-base-300 text-base-content/50 hover:border-primary hover:text-primary transition-colors">
            {tag}
          </a>
        {/each}
      </div>
    </div>

    <!-- Right: hero image collage -->
    <div class="relative hidden md:flex items-center justify-center">
      <div class="grid grid-cols-2 gap-3 w-full max-w-sm">
        <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80"
          alt="Trek" class="rounded-2xl h-48 w-full object-cover shadow-md"/>
        <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"
          alt="Stay" class="rounded-2xl h-48 w-full object-cover shadow-md mt-8"/>
        <img src="https://images.unsplash.com/photo-1530053969600-caed2596d242?w=400&q=80"
          alt="Sports" class="rounded-2xl h-36 w-full object-cover shadow-md -mt-4"/>
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80"
          alt="Tour" class="rounded-2xl h-36 w-full object-cover shadow-md mt-4"/>
      </div>
      <!-- Floating stat card -->
      <div class="absolute -bottom-4 -left-4 bg-white border border-base-200 rounded-2xl shadow-lg p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-lg">🌟</div>
        <div>
          <p class="text-xs text-base-content/50">Avg. Rating</p>
          <p class="text-sm font-bold text-base-content">4.9 / 5.0</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     STATS BAR
═══════════════════════════════════════════ -->
<section class="bg-primary py-8">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {#each stats as stat}
        <div>
          <p class="text-2xl font-bold text-white" style="font-family: 'Clash Display', sans-serif;">{stat.value}</p>
          <p class="text-primary-content/70 text-sm mt-0.5">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     CATEGORIES
═══════════════════════════════════════════ -->
<section class="py-14 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Browse by type</p>
        <h2 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
          What are you looking for?
        </h2>
      </div>
      <a href="/experiences" class="text-sm text-primary font-medium hover:underline hidden md:block">
        View all →
      </a>
    </div>

    <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
      {#each categories as cat}
        <a href="/experiences?type={cat.type}"
          class="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-base-200 hover:border-primary/30 hover:shadow-sm transition-all group cursor-pointer bg-white">
          <div class="w-12 h-12 rounded-xl {cat.bg} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            {cat.icon}
          </div>
          <p class="text-xs font-semibold text-base-content">{cat.label}</p>
          <p class="text-xs text-base-content/40">{cat.count} trips</p>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     FEATURED EXPERIENCES
═══════════════════════════════════════════ -->
<section class="py-14 bg-base-200">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Hand-picked for you</p>
        <h2 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
          Featured Experiences
        </h2>
      </div>
      <a href="/experiences" class="text-sm text-primary font-medium hover:underline hidden md:block">
        See all →
      </a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each featured as experience (experience.id)}
        <ExperienceCard {experience} />
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     DESTINATIONS
═══════════════════════════════════════════ -->
<section class="py-14 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Top destinations</p>
        <h2 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
          Popular Destinations
        </h2>
      </div>
      <a href="/destinations" class="text-sm text-primary font-medium hover:underline hidden md:block">
        Explore all →
      </a>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {#each destinations as dest}
        <a href="/destinations/{dest.name.toLowerCase().replace(' ', '-')}"
          class="group relative rounded-2xl overflow-hidden cursor-pointer h-40">
          <img src={dest.image} alt={dest.name}
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-3">
            <p class="text-white text-xs font-semibold leading-tight">{dest.name}</p>
            <p class="text-white/60 text-xs">{dest.count} trips</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     HOW IT WORKS
═══════════════════════════════════════════ -->
<section class="py-14 bg-base-200">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-10">
      <p class="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Simple process</p>
      <h2 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        How VoyageRoots Works
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      <!-- Connecting line (desktop only) -->
      <div class="hidden md:block absolute top-10 left-1/4 right-1/4 h-px bg-base-300 -z-0"></div>

      {#each howItWorks as step, i}
        <div class="bg-white rounded-2xl border border-base-200 p-6 flex flex-col gap-4 relative z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
              {step.icon}
            </div>
            <span class="text-3xl font-bold text-base-300" style="font-family: 'Clash Display', sans-serif;">
              {step.step}
            </span>
          </div>
          <div>
            <h3 class="text-base font-semibold text-base-content mb-1" style="font-family: 'Clash Display', sans-serif;">
              {step.title}
            </h3>
            <p class="text-sm text-base-content/60 leading-relaxed">{step.desc}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     TESTIMONIALS
═══════════════════════════════════════════ -->
<section class="py-14 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <div class="text-center mb-10">
      <p class="text-xs font-semibold tracking-widest text-primary uppercase mb-1">Travelers love us</p>
      <h2 class="text-2xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        Real Stories, Real Adventures
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      {#each testimonials as t}
        <div class="bg-white border border-base-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
          <!-- Stars -->
          <div class="flex gap-0.5">
            {#each Array(t.rating) as _}
              <span class="text-warning text-sm">★</span>
            {/each}
          </div>
          <p class="text-sm text-base-content/70 leading-relaxed italic">"{t.text}"</p>
          <div class="flex items-center gap-3 mt-auto pt-3 border-t border-base-200">
            <div class="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
              {t.avatar}
            </div>
            <div>
              <p class="text-sm font-semibold text-base-content">{t.name}</p>
              <p class="text-xs text-base-content/40">{t.location}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     OPERATOR CTA
═══════════════════════════════════════════ -->
<section class="py-12 bg-base-200">
  <div class="max-w-7xl mx-auto px-4">
    <div class="bg-white border border-base-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <p class="text-xs font-semibold tracking-widest text-secondary uppercase mb-2">For operators</p>
        <h2 class="text-2xl font-bold text-base-content mb-2" style="font-family: 'Clash Display', sans-serif;">
          List your experience on VoyageRoots
        </h2>
        <p class="text-sm text-base-content/50 max-w-md">
          Reach thousands of travelers. Create and manage your experiences, accept bookings and grow your adventure business.
        </p>
      </div>
      <div class="flex gap-3 flex-shrink-0">
        <a href="/auth/register" class="btn btn-secondary rounded-xl font-semibold text-sm px-6">
          Become an Operator →
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     FINAL CTA
═══════════════════════════════════════════ -->
<section class="py-20 bg-primary">
  <div class="max-w-2xl mx-auto px-4 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-4" style="font-family: 'Clash Display', sans-serif;">
      Your next adventure<br/>starts here
    </h2>
    <p class="text-primary-content/70 text-sm mb-8">
      Join 12,000+ travelers who've discovered India through VoyageRoots
    </p>
    <div class="flex items-center justify-center gap-3">
      <a href="/auth/register" class="btn bg-white text-primary hover:bg-base-100 border-none rounded-xl font-semibold px-8">
        Get Started — It's Free
      </a>
      <a href="/experiences" class="btn btn-ghost text-white border border-white/30 rounded-xl font-semibold px-8">
        Browse Experiences
      </a>
    </div>
  </div>
</section>

<!-- ═══════════════════════════════════════════
     FOOTER
═══════════════════════════════════════════ -->
<footer class="bg-neutral text-neutral-content py-12">
  <div class="max-w-7xl mx-auto px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

      <!-- Brand -->
      <div class="col-span-2 md:col-span-1">
        <div class="flex items-center gap-2 mb-4">
          <div class="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="white" stroke="none"/>
            </svg>
          </div>
          <span class="font-bold text-white" style="font-family: 'Clash Display', sans-serif;">VoyageRoots</span>
        </div>
        <p class="text-neutral-content/50 text-xs leading-relaxed">
          Curated travel experiences across India. Trek, stay, explore.
        </p>
      </div>

      <!-- Explore -->
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-neutral-content/40 mb-4">Explore</p>
        <ul class="flex flex-col gap-2.5 text-sm text-neutral-content/60">
          <li><a href="/experiences" class="hover:text-white transition-colors">Experiences</a></li>
          <li><a href="/destinations" class="hover:text-white transition-colors">Destinations</a></li>
          <li><a href="/groups" class="hover:text-white transition-colors">Group Tours</a></li>
          <li><a href="/about" class="hover:text-white transition-colors">About Us</a></li>
        </ul>
      </div>

      <!-- Account -->
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-neutral-content/40 mb-4">Account</p>
        <ul class="flex flex-col gap-2.5 text-sm text-neutral-content/60">
          <li><a href="/auth/login" class="hover:text-white transition-colors">Sign In</a></li>
          <li><a href="/auth/register" class="hover:text-white transition-colors">Register</a></li>
          <li><a href="/dashboard" class="hover:text-white transition-colors">My Bookings</a></li>
          <li><a href="/auth/register" class="hover:text-white transition-colors">Become Operator</a></li>
        </ul>
      </div>

      <!-- Legal -->
      <div>
        <p class="text-xs font-semibold uppercase tracking-widest text-neutral-content/40 mb-4">Legal</p>
        <ul class="flex flex-col gap-2.5 text-sm text-neutral-content/60">
          <li><a href="/privacy" class="hover:text-white transition-colors">Privacy Policy</a></li>
          <li><a href="/terms" class="hover:text-white transition-colors">Terms of Service</a></li>
          <li><a href="/refunds" class="hover:text-white transition-colors">Refund Policy</a></li>
          <li><a href="/contact" class="hover:text-white transition-colors">Contact</a></li>
        </ul>
      </div>
    </div>

    <div class="border-t border-neutral-content/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
      <p class="text-xs text-neutral-content/30">© 2025 VoyageRoots. All rights reserved.</p>
      <p class="text-xs text-neutral-content/30">Made with ❤️ for Indian explorers</p>
    </div>
  </div>
</footer>