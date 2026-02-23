<script>
  import { onMount } from 'svelte';

  // Mock data — replace with Supabase fetch using params.id
  let experience = $state({
    id: 'EXP001',
    slug: 'himalayan-base-camp-trek',
    name: 'Himalayan Base Camp Trek',
    type: 'trek',
    custom_type_name: '',
    custom_type_desc: '',
    destination: 'Himachal Pradesh',
    description: `A breathtaking high-altitude trek through ancient Himalayan trails, glaciers, and remote villages. This is one of India's most iconic adventures — winding through dense forests, alpine meadows, and dramatic ridgelines before reaching the base camp at 4,200m.`,
    date: '2026-04-15',
    end_date: '2026-04-28',
    cost_per_person: 18500,
    min_members: 4,
    max_members: 15,
    prerequisites: 'Valid ID, medical fitness certificate, travel insurance.',
    requirements: 'Moderate fitness level. Ability to walk 8–12km per day.',
    notifications: 'Participants will receive a detailed packing list 7 days before departure.',
    status: 'active',
    is_visible: true,
    members_joined: 11,
    bookings: 12,
    revenue: 203500,
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80',
      'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80',
    ],
  });

  const types = ['trek', 'tour', 'stay', 'outing', 'sports', 'custom'];

  const statusOptions = [
    { value: 'active',    label: 'Active',    cls: 'bg-success/10 text-success'    },
    { value: 'draft',     label: 'Draft',     cls: 'bg-base-300 text-base-content/50' },
    { value: 'completed', label: 'Completed', cls: 'bg-secondary/10 text-secondary' },
    { value: 'cancelled', label: 'Cancelled', cls: 'bg-error/10 text-error'        },
  ];

  let activeTab = $state('details'); // 'details' | 'images' | 'settings' | 'bookings'
  let saving = $state(false);
  let saved = $state(false);
  let deleteConfirm = $state('');
  let coverIndex = $state(0);
  let dragOver = $state(false);

  const recentBookings = [
    { id: 'BK1021', user: 'Arjun Mehta',  members: 4, date: 'Feb 20', amount: 74000,  status: 'Confirmed' },
    { id: 'BK1022', user: 'Priya Kapoor', members: 2, date: 'Feb 19', amount: 37000,  status: 'Confirmed' },
    { id: 'BK1023', user: 'Rahul Verma',  members: 3, date: 'Feb 18', amount: 55500,  status: 'Pending'   },
    { id: 'BK1024', user: 'Ananya Nair',  members: 2, date: 'Feb 17', amount: 37000,  status: 'Confirmed' },
  ];

  const statusColors = {
    Confirmed: 'bg-success/10 text-success',
    Pending:   'bg-warning/10 text-warning',
    Cancelled: 'bg-error/10 text-error',
  };

  function fillPercent() {
    return Math.round((experience.members_joined / experience.max_members) * 100);
  }

  function daysUntil() {
    const diff = Math.ceil((new Date(experience.date) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0)  return { label: 'Past', cls: 'text-base-content/40' };
    if (diff <= 7)  return { label: `In ${diff} days`, cls: 'text-error font-semibold' };
    if (diff <= 30) return { label: `In ${diff} days`, cls: 'text-warning font-semibold' };
    return { label: `In ${diff} days`, cls: 'text-base-content/50' };
  }

  async function handleSave() {
    saving = true;
    await new Promise(r => setTimeout(r, 1000));
    saving = false;
    saved = true;
    setTimeout(() => saved = false, 2500);
  }

  function removeImage(index) {
    experience.images = experience.images.filter((_, i) => i !== index);
    if (coverIndex >= experience.images.length) coverIndex = 0;
  }

  function setCover(index) {
    coverIndex = index;
  }

  const tabs = [
    { id: 'details',  label: 'Details',  icon: '<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>' },
    { id: 'images',   label: 'Images',   icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>' },
    { id: 'settings', label: 'Settings', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>' },
    { id: 'bookings', label: 'Bookings', icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>' },
  ];
</script>

<div class="p-6 min-h-screen bg-base-200">

  <!-- Header -->
  <div class="flex items-center justify-between mb-6 flex-wrap gap-4">
    <div class="flex items-center gap-3">
      <a href="/admin/experiences"
        class="w-9 h-9 rounded-xl border border-base-300 bg-white flex items-center justify-center hover:bg-base-200 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </a>
      <div>
        <p class="text-xs text-base-content/40">Experiences / {experience.id}</p>
        <h1 class="text-xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
          {experience.name}
        </h1>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Visibility toggle -->
      <label class="flex items-center gap-2 cursor-pointer bg-white border border-base-300 rounded-xl px-4 py-2">
        <span class="text-sm text-base-content/60 font-medium">
          {experience.is_visible ? 'Visible' : 'Hidden'}
        </span>
        <input type="checkbox" class="toggle toggle-sm toggle-secondary" bind:checked={experience.is_visible} />
      </label>

      <a href="/experiences/{experience.slug}" target="_blank"
        class="btn btn-outline btn-sm rounded-xl gap-2 text-sm">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
        Preview
      </a>

      <button
        onclick={handleSave}
        class="btn btn-primary btn-sm rounded-xl gap-2 font-semibold"
        disabled={saving}
      >
        {#if saving}
          <span class="loading loading-spinner loading-xs"></span> Saving...
        {:else if saved}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg> Saved!
        {:else}
          Save Changes
        {/if}
      </button>
    </div>
  </div>

  <!-- Stats Strip -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
    <div class="bg-white border border-base-300 rounded-2xl p-4">
      <p class="text-xs text-base-content/40 mb-1">Members Joined</p>
      <p class="text-xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        {experience.members_joined}/{experience.max_members}
      </p>
      <div class="w-full h-1.5 bg-base-200 rounded-full mt-2 overflow-hidden">
        <div class="h-full rounded-full bg-secondary transition-all" style="width: {fillPercent()}%"></div>
      </div>
    </div>
    <div class="bg-white border border-base-300 rounded-2xl p-4">
      <p class="text-xs text-base-content/40 mb-1">Total Bookings</p>
      <p class="text-xl font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">{experience.bookings}</p>
      <p class="text-xs text-base-content/40 mt-1">confirmed reservations</p>
    </div>
    <div class="bg-white border border-base-300 rounded-2xl p-4">
      <p class="text-xs text-base-content/40 mb-1">Revenue</p>
      <p class="text-xl font-bold text-secondary" style="font-family: 'Clash Display', sans-serif;">
        ₹{(experience.revenue / 100000).toFixed(1)}L
      </p>
      <p class="text-xs text-base-content/40 mt-1">total earned</p>
    </div>
    <div class="bg-white border border-base-300 rounded-2xl p-4">
      <p class="text-xs text-base-content/40 mb-1">Experience Date</p>
      <p class="text-sm font-bold text-base-content" style="font-family: 'Clash Display', sans-serif;">
        {new Date(experience.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
      <p class="text-xs mt-1 {daysUntil().cls}">{daysUntil().label}</p>
    </div>
  </div>

  <!-- Tabs -->
  <div class="flex items-center gap-1 bg-white border border-base-300 rounded-2xl p-1.5 mb-5 w-fit">
    {#each tabs as tab}
      <button
        onclick={() => activeTab = tab.id}
        class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
          {activeTab === tab.id
            ? 'bg-primary text-white shadow-sm'
            : 'text-base-content/50 hover:text-base-content hover:bg-base-200'}"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          {@html tab.icon}
        </svg>
        {tab.label}
      </button>
    {/each}
  </div>

  <!-- ── DETAILS TAB ── -->
  {#if activeTab === 'details'}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

      <div class="lg:col-span-2 flex flex-col gap-5">

        <!-- Basic Info -->
        <div class="bg-white border border-base-300 rounded-2xl p-6">
          <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
            Basic Information
          </h3>
          <div class="flex flex-col gap-4">

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Experience Name</label>
              <input
                type="text"
                bind:value={experience.name}
                class="input input-bordered bg-white text-sm rounded-xl focus:input-primary"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Type</label>
                <select bind:value={experience.type} class="select select-bordered bg-white text-sm rounded-xl">
                  {#each types as t}
                    <option value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                  {/each}
                </select>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Destination</label>
                <input
                  type="text"
                  bind:value={experience.destination}
                  class="input input-bordered bg-white text-sm rounded-xl focus:input-primary"
                />
              </div>
            </div>

            {#if experience.type === 'custom'}
              <div class="flex flex-col gap-1.5">
                <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Custom Type Name</label>
                <input
                  type="text"
                  bind:value={experience.custom_type_name}
                  placeholder="e.g. Wellness Retreat"
                  class="input input-bordered bg-white text-sm rounded-xl focus:input-primary"
                />
              </div>
            {/if}

            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Description</label>
              <textarea
                bind:value={experience.description}
                rows="4"
                class="textarea textarea-bordered bg-white text-sm rounded-xl focus:textarea-primary resize-none"
              ></textarea>
            </div>

          </div>
        </div>

        <!-- Dates & Pricing -->
        <div class="bg-white border border-base-300 rounded-2xl p-6">
          <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
            Dates & Pricing
          </h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Start Date</label>
              <input type="date" bind:value={experience.date}
                class="input input-bordered bg-white text-sm rounded-xl focus:input-primary" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">End Date</label>
              <input type="date" bind:value={experience.end_date}
                class="input input-bordered bg-white text-sm rounded-xl focus:input-primary" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Cost per Person (₹)</label>
              <input type="number" bind:value={experience.cost_per_person}
                class="input input-bordered bg-white text-sm rounded-xl focus:input-primary" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Min Members</label>
              <input type="number" bind:value={experience.min_members}
                class="input input-bordered bg-white text-sm rounded-xl focus:input-primary" />
            </div>
            <div class="flex flex-col gap-1.5 col-span-2">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Max Members</label>
              <input type="number" bind:value={experience.max_members}
                class="input input-bordered bg-white text-sm rounded-xl focus:input-primary" />
            </div>
          </div>
        </div>

        <!-- Requirements -->
        <div class="bg-white border border-base-300 rounded-2xl p-6">
          <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
            Requirements & Notes
          </h3>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Prerequisites</label>
              <textarea bind:value={experience.prerequisites} rows="2"
                class="textarea textarea-bordered bg-white text-sm rounded-xl resize-none focus:textarea-primary"></textarea>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Requirements</label>
              <textarea bind:value={experience.requirements} rows="2"
                class="textarea textarea-bordered bg-white text-sm rounded-xl resize-none focus:textarea-primary"></textarea>
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Notifications to Participants</label>
              <textarea bind:value={experience.notifications} rows="2"
                class="textarea textarea-bordered bg-white text-sm rounded-xl resize-none focus:textarea-primary"></textarea>
            </div>
          </div>
        </div>

      </div>

      <!-- Right sidebar -->
      <div class="flex flex-col gap-5">

        <!-- Cover preview -->
        <div class="bg-white border border-base-300 rounded-2xl overflow-hidden">
          <img src={experience.images[coverIndex]} alt="cover"
            class="w-full h-44 object-cover"/>
          <div class="p-4">
            <p class="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-1">Cover Image</p>
            <p class="text-xs text-base-content/50">Change in the Images tab</p>
          </div>
        </div>

        <!-- Status -->
        <div class="bg-white border border-base-300 rounded-2xl p-5">
          <h3 class="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-3">Status</h3>
          <div class="flex flex-col gap-2">
            {#each statusOptions as opt}
              <label class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all
                {experience.status === opt.value ? 'border-primary bg-primary/5' : 'border-base-200 hover:border-base-300'}">
                <input type="radio" bind:group={experience.status} value={opt.value} class="radio radio-primary radio-sm" />
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full {opt.cls}">
                  {opt.label}
                </span>
              </label>
            {/each}
          </div>
        </div>

        <!-- Quick stats -->
        <div class="bg-base-200 border border-base-300 rounded-2xl p-5">
          <h3 class="text-xs font-semibold text-base-content/40 uppercase tracking-wider mb-3">Quick Info</h3>
          <div class="flex flex-col gap-2 text-sm">
            <div class="flex justify-between">
              <span class="text-base-content/50">Price</span>
              <span class="font-semibold text-base-content">₹{experience.cost_per_person.toLocaleString('en-IN')}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-base-content/50">Spots left</span>
              <span class="font-semibold text-base-content">{experience.max_members - experience.members_joined}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-base-content/50">Visibility</span>
              <span class="font-semibold {experience.is_visible ? 'text-success' : 'text-error'}">
                {experience.is_visible ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>

  <!-- ── IMAGES TAB ── -->
  {:else if activeTab === 'images'}
    <div class="flex flex-col gap-5">

      <!-- Upload area -->
      <div
        class="bg-white border-2 border-dashed border-base-300 rounded-2xl p-10 text-center transition-colors
          {dragOver ? 'border-primary bg-primary/5' : 'hover:border-primary/50'}"
        ondragover={(e) => { e.preventDefault(); dragOver = true; }}
        ondragleave={() => dragOver = false}
        ondrop={(e) => { e.preventDefault(); dragOver = false; }}
      >
        <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#834AED" stroke-width="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
          </svg>
        </div>
        <p class="font-semibold text-base-content mb-1" style="font-family: 'Clash Display', sans-serif;">
          Drop images here
        </p>
        <p class="text-sm text-base-content/40 mb-4">PNG, JPG up to 10MB each</p>
        <label class="btn btn-primary btn-sm rounded-xl cursor-pointer">
          Browse Files
          <input type="file" accept="image/*" multiple class="hidden" />
        </label>
      </div>

      <!-- Image grid -->
      <div class="bg-white border border-base-300 rounded-2xl p-5">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-base-content" style="font-family: 'Clash Display', sans-serif;">
            Experience Images
          </h3>
          <p class="text-xs text-base-content/40">{experience.images.length} images · Click to set as cover</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          {#each experience.images as img, i}
            <div class="relative group rounded-xl overflow-hidden border-2 transition-all
              {coverIndex === i ? 'border-primary shadow-md' : 'border-transparent'}">
              <img src={img} alt="experience" class="w-full h-36 object-cover"/>

              <!-- Cover badge -->
              {#if coverIndex === i}
                <div class="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-lg">
                  Cover
                </div>
              {/if}

              <!-- Hover actions -->
              <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onclick={() => setCover(i)}
                  class="btn btn-xs btn-white rounded-lg text-xs bg-white text-base-content hover:bg-base-100"
                  title="Set as cover"
                >
                  ★ Cover
                </button>
                <button
                  onclick={() => removeImage(i)}
                  class="btn btn-xs btn-error rounded-lg text-xs"
                  title="Remove"
                >
                  Remove
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>

  <!-- ── SETTINGS TAB ── -->
  {:else if activeTab === 'settings'}
    <div class="flex flex-col gap-5 max-w-2xl">

      <!-- Visibility -->
      <div class="bg-white border border-base-300 rounded-2xl p-6">
        <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
          Visibility & Discoverability
        </h3>
        <div class="flex flex-col gap-4">
          <div class="flex items-center justify-between p-4 bg-base-100 rounded-xl border border-base-200">
            <div>
              <p class="text-sm font-semibold text-base-content">Show on public catalog</p>
              <p class="text-xs text-base-content/40 mt-0.5">Travelers can discover and book this experience</p>
            </div>
            <input type="checkbox" class="toggle toggle-secondary" bind:checked={experience.is_visible} />
          </div>
        </div>
      </div>

      <!-- Booking settings -->
      <div class="bg-white border border-base-300 rounded-2xl p-6">
        <h3 class="text-sm font-semibold text-base-content mb-4" style="font-family: 'Clash Display', sans-serif;">
          Booking Settings
        </h3>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Minimum Members to Confirm</label>
            <input type="number" bind:value={experience.min_members}
              class="input input-bordered bg-white text-sm rounded-xl focus:input-primary w-32" />
            <p class="text-xs text-base-content/40">Experience only runs if this many people book</p>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-base-content/60 uppercase tracking-wider">Maximum Group Size</label>
            <input type="number" bind:value={experience.max_members}
              class="input input-bordered bg-white text-sm rounded-xl focus:input-primary w-32" />
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <div class="bg-error/5 border border-error/30 rounded-2xl p-6">
        <h3 class="text-sm font-semibold text-error mb-1" style="font-family: 'Clash Display', sans-serif;">
          Danger Zone
        </h3>
        <p class="text-xs text-base-content/50 mb-5">
          These actions are irreversible. Please be certain before proceeding.
        </p>

        <div class="flex flex-col gap-3">

          <!-- Hide -->
          <div class="flex items-center justify-between p-4 bg-white border border-base-200 rounded-xl">
            <div>
              <p class="text-sm font-semibold text-base-content">Hide Experience</p>
              <p class="text-xs text-base-content/40 mt-0.5">Remove from public catalog without deleting</p>
            </div>
            <button
              onclick={() => experience.is_visible = false}
              class="btn btn-warning btn-sm rounded-xl text-xs font-semibold"
            >
              Hide
            </button>
          </div>

          <!-- Cancel -->
          <div class="flex items-center justify-between p-4 bg-white border border-base-200 rounded-xl">
            <div>
              <p class="text-sm font-semibold text-base-content">Cancel Experience</p>
              <p class="text-xs text-base-content/40 mt-0.5">Mark as cancelled and notify all bookings</p>
            </div>
            <button
              onclick={() => experience.status = 'cancelled'}
              class="btn btn-error btn-outline btn-sm rounded-xl text-xs font-semibold"
            >
              Cancel
            </button>
          </div>

          <!-- Delete -->
          <div class="p-4 bg-white border border-error/30 rounded-xl">
            <p class="text-sm font-semibold text-base-content mb-0.5">Delete Experience</p>
            <p class="text-xs text-base-content/40 mb-3">
              Permanently delete this experience and all its data. Type the experience name to confirm.
            </p>
            <div class="flex items-center gap-2">
              <input
                type="text"
                bind:value={deleteConfirm}
                placeholder="Type experience name to confirm..."
                class="input input-bordered input-sm bg-white text-sm rounded-xl flex-1 focus:input-error"
              />
              <button
                class="btn btn-error btn-sm rounded-xl font-semibold text-xs"
                disabled={deleteConfirm !== experience.name}
              >
                Delete
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  <!-- ── BOOKINGS TAB ── -->
  {:else if activeTab === 'bookings'}
    <div class="bg-white border border-base-300 rounded-2xl overflow-hidden">
      <div class="p-5 border-b border-base-200 flex items-center justify-between">
        <h3 class="text-sm font-semibold text-base-content" style="font-family: 'Clash Display', sans-serif;">
          Bookings for this Experience
        </h3>
        <span class="text-xs text-base-content/40">{recentBookings.length} bookings</span>
      </div>
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-base-200 bg-base-100">
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Booking ID</th>
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Traveler</th>
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Members</th>
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Date</th>
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Amount</th>
            <th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-base-content/40">Status</th>
            <th class="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-base-content/40">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-base-200">
          {#each recentBookings as b}
            <tr class="hover:bg-base-100 transition-colors">
              <td class="px-5 py-4 font-mono text-xs text-base-content/50">#{b.id}</td>
              <td class="px-5 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {b.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span class="text-sm font-medium text-base-content">{b.user}</span>
                </div>
              </td>
              <td class="px-5 py-4 text-sm text-base-content/60">{b.members}</td>
              <td class="px-5 py-4 text-sm text-base-content/60">{b.date}</td>
              <td class="px-5 py-4 font-semibold text-base-content">₹{b.amount.toLocaleString('en-IN')}</td>
              <td class="px-5 py-4">
                <span class="px-2.5 py-1 text-xs font-semibold rounded-full {statusColors[b.status]}">
                  {b.status}
                </span>
              </td>
              <td class="px-5 py-4 text-right">
                <a href="/admin/bookings/{b.id}" class="btn btn-ghost btn-xs rounded-lg border border-base-300 text-xs">
                  View
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {/if}

  <!-- Floating save bar -->
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
    <div class="bg-neutral text-white rounded-2xl shadow-2xl px-6 py-3 flex items-center gap-4">
      <p class="text-sm text-white/70">You have unsaved changes</p>
      <button onclick={handleSave} class="btn btn-secondary btn-sm rounded-xl font-semibold" disabled={saving}>
        {#if saving}
          <span class="loading loading-spinner loading-xs"></span> Saving...
        {:else}
          Save Changes
        {/if}
      </button>
    </div>
  </div>

</div>