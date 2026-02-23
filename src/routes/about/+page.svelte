<script>
  import { onMount } from 'svelte';

  let visible = false;
  let statsVisible = false;

  const stats = [
    { value: '120+', label: 'Destinations' },
    { value: '50K+', label: 'Happy Travelers' },
    { value: '2K+', label: 'Curated Experiences' },
    { value: '4.9★', label: 'Average Rating' },
  ];

  const values = [
    {
      icon: '🌍',
      title: 'Authentic Experiences',
      desc: 'Every experience is hand-picked and verified by locals and expert travelers who know the destination inside out.',
    },
    {
      icon: '⚡',
      title: 'Effortless Booking',
      desc: 'From flights to stays to day tours — book everything in one seamless flow, no tab-switching required.',
    },
    {
      icon: '🗺️',
      title: 'Destination Intelligence',
      desc: 'Our guides go beyond the highlights. We surface hidden gems, seasonal tips, and cultural context.',
    },
    {
      icon: '🛡️',
      title: 'Travel with Confidence',
      desc: 'Flexible cancellations, 24/7 support, and transparent pricing. We have your back from day one.',
    },
  ];

  const team = [
    { name: 'Udit Gogoi', role: 'Creater / Developer', initials: 'UG', color: 'bg-primary' },
  ];

  onMount(() => {
    setTimeout(() => (visible = true), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) statsVisible = true;
      },
      { threshold: 0.3 }
    );
    const statsEl = document.getElementById('stats-section');
    if (statsEl) observer.observe(statsEl);

    return () => observer.disconnect();
  });
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

  :global(body) {
    font-family: 'DM Sans', sans-serif;
  }

  .display-font {
    font-family: 'Playfair Display', serif;
  }

  .hero-section {
    background:
      radial-gradient(ellipse 80% 60% at 60% 0%, rgba(131, 74, 237, 0.18) 0%, transparent 70%),
      radial-gradient(ellipse 50% 40% at 10% 80%, rgba(74, 181, 101, 0.12) 0%, transparent 60%),
      #F8FAFC;
  }

  .card-hover {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(131, 74, 237, 0.12);
  }

  .fade-up {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.8rem;
    font-weight: 900;
    color: #834AED;
    line-height: 1;
  }

  .story-blob {
    background: linear-gradient(135deg, rgba(131, 74, 237, 0.08) 0%, rgba(74, 181, 101, 0.08) 100%);
    border-radius: 40px 8px 40px 8px;
  }

  .divider-line {
    height: 3px;
    background: linear-gradient(90deg, #834AED, #4AB565, #22D3EE);
    border-radius: 9999px;
    width: 64px;
  }

  .team-card:hover .team-initials {
    transform: scale(1.05);
  }
  .team-initials {
    transition: transform 0.3s ease;
  }

  .route-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #834AED;
    display: inline-block;
  }
  .route-line {
    display: inline-block;
    width: 32px;
    height: 2px;
    background: linear-gradient(90deg, #834AED, #4AB565);
    vertical-align: middle;
    margin: 0 4px;
  }
</style>

<!-- ───────────── HERO ───────────── -->
<section class="hero-section min-h-[88vh] flex flex-col justify-center px-6 md:px-16 lg:px-28 pt-24 pb-16">
  <div class="max-w-5xl mx-auto w-full">
    <!-- breadcrumb feel -->
    <p class="text-sm tracking-widest uppercase text-primary font-medium mb-6 flex items-center gap-2">
      <span class="route-dot"></span>
      <span class="route-line"></span>
      About VoyageRoots
    </p>

    <h1
      class="display-font text-5xl md:text-7xl lg:text-8xl font-black leading-[1.05] text-base-content fade-up {visible ? 'visible' : ''}"
      style="transition-delay: 0.05s"
    >
      Travel is not<br />
      a <span class="text-primary italic">destination</span>,<br />
      it's a <span class="text-secondary italic">story</span>.
    </h1>

    <p
      class="mt-8 text-lg md:text-xl text-base-content/70 max-w-2xl leading-relaxed fade-up {visible ? 'visible' : ''}"
      style="transition-delay: 0.2s"
    >
      VoyageRoots was built for travelers who want more than a ticket — people who want context, connection,
      and the kind of moments that still feel vivid years later. We combine smart booking with deeply
      curated experiences across 120+ destinations worldwide.
    </p>

    <div class="mt-10 flex flex-wrap gap-4 fade-up {visible ? 'visible' : ''}" style="transition-delay:0.35s">
      <a href="/destinations" class="btn btn-primary btn-lg rounded-full px-8 shadow-lg">
        Explore Destinations
      </a>
      <a href="/experiences" class="btn btn-outline btn-lg rounded-full px-8">
        Browse Experiences
      </a>
    </div>
  </div>
</section>

<!-- ───────────── STATS ───────────── -->
<section id="stats-section" class="bg-base-200 py-20 px-6">
  <div class="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
    {#each stats as s, i}
      <div class="fade-up {statsVisible ? 'visible' : ''}" style="transition-delay: {i * 0.1}s">
        <div class="stat-num">{s.value}</div>
        <div class="text-sm uppercase tracking-widest text-base-content/50 mt-2 font-medium">{s.label}</div>
      </div>
    {/each}
  </div>
</section>

<!-- ───────────── STORY ───────────── -->
<section class="py-24 px-6 md:px-16 lg:px-28">
  <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
    <div>
      <div class="divider-line mb-6"></div>
      <h2 class="display-font text-4xl md:text-5xl font-bold text-base-content leading-tight">
        Where the idea<br />took root
      </h2>
      <p class="mt-6 text-base-content/70 leading-relaxed">
        It started with a frustrating trip. Our founders spent weeks juggling a dozen browser tabs,
        losing bookings to clunky payment flows, and arriving at "must-see" spots that felt hollow
        and over-touristed. They knew there had to be a better way.
      </p>
      <p class="mt-4 text-base-content/70 leading-relaxed">
        VoyageRoots launched in 2022 with one mission: make meaningful travel accessible. Not just
        logistically — but in terms of knowing <em>why</em> a place matters, who lives there, and what
        experiences go beyond the postcard version.
      </p>
    </div>

    <div class="story-blob p-10 space-y-6">
      <div class="flex items-start gap-4">
        <span class="text-3xl mt-1">✈️</span>
        <div>
          <p class="font-semibold text-base-content">2022 — Founded</p>
          <p class="text-sm text-base-content/60">Born out of a solo trip gone wrong and a big idea</p>
        </div>
      </div>
      <div class="flex items-start gap-4">
        <span class="text-3xl mt-1">🌐</span>
        <div>
          <p class="font-semibold text-base-content">2023 — Went Global</p>
          <p class="text-sm text-base-content/60">Expanded to 80 destinations across 4 continents</p>
        </div>
      </div>
      <div class="flex items-start gap-4">
        <span class="text-3xl mt-1">🏆</span>
        <div>
          <p class="font-semibold text-base-content">2024 — Best New Travel App</p>
          <p class="text-sm text-base-content/60">Recognised by TravelTech Summit & ProductHunt</p>
        </div>
      </div>
      <div class="flex items-start gap-4">
        <span class="text-3xl mt-1">🌿</span>
        <div>
          <p class="font-semibold text-base-content">Today — Still Growing</p>
          <p class="text-sm text-base-content/60">120+ destinations, 50K+ travelers, and counting</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ───────────── VALUES ───────────── -->
<section class="bg-base-200 py-24 px-6 md:px-16 lg:px-28">
  <div class="max-w-5xl mx-auto">
    <div class="text-center mb-16">
      <div class="divider-line mx-auto mb-6"></div>
      <h2 class="display-font text-4xl md:text-5xl font-bold text-base-content">What we stand for</h2>
      <p class="mt-4 text-base-content/60 max-w-xl mx-auto">
        Four principles that guide every feature we build and every experience we list.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each values as v}
        <div class="card bg-base-100 shadow-sm p-6 card-hover border border-base-300/60">
          <div class="text-4xl mb-4">{v.icon}</div>
          <h3 class="font-semibold text-base-content text-lg mb-2">{v.title}</h3>
          <p class="text-sm text-base-content/60 leading-relaxed">{v.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ───────────── TEAM ───────────── -->
<section class="py-24 px-6 md:px-16 lg:px-28">
  <div class="max-w-5xl mx-auto">
    <div class="mb-16">
      <div class="divider-line mb-6"></div>
      <h2 class="display-font text-4xl md:text-5xl font-bold text-base-content">The people behind it</h2>
      <p class="mt-4 text-base-content/60 max-w-xl">
        A small team of travelers, designers, and engineers who genuinely love going places.
      </p>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each team as member}
        <div class="team-card text-center group cursor-default">
          <div
            class="team-initials {member.color} text-white w-20 h-20 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md"
          >
            {member.initials}
          </div>
          <p class="font-semibold text-base-content">{member.name}</p>
          <p class="text-sm text-base-content/50 mt-1">{member.role}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ───────────── CTA ───────────── -->
<section class="py-24 px-6">
  <div class="max-w-3xl mx-auto text-center">
    <div
      class="rounded-[32px] p-14"
      style="background: linear-gradient(135deg, rgba(131,74,237,0.1) 0%, rgba(74,181,101,0.08) 100%); border: 1.5px solid rgba(131,74,237,0.15);"
    >
      <h2 class="display-font text-4xl md:text-5xl font-bold text-base-content leading-tight">
        Your next story<br />starts here.
      </h2>
      <p class="mt-5 text-base-content/60 text-lg">
        Browse 120+ destinations and thousands of curated experiences — then book in minutes.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-4">
        <a href="/experiences" class="btn btn-primary rounded-full px-10 shadow-lg">Start Exploring</a>
        <a href="/contact" class="btn btn-ghost rounded-full px-10">Contact Us</a>
      </div>
    </div>
  </div>
</section>