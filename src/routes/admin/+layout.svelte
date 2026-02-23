<script>
  import AdminSidebar from '$lib/components/nav/AdminSidebar.svelte';
  let { children } = $props();
</script>

<div class="flex h-screen overflow-hidden">
  <AdminSidebar />

  <main class="flex-1 overflow-y-auto bg-[#F8FAFC]">
    {@render children()}
  </main>
</div>