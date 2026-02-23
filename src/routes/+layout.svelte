<script>
  import "../app.css";
  import favicon from '$lib/assets/favicon.svg';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import { page } from '$app/state';

  let { children } = $props();


 let hideNav = $derived(
  ['/admin', '/auth'].some(p => page.url.pathname.startsWith(p))
);
  const noWrapper = ['/terms', '/privacy', '/about'];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if !hideNav}
  <Navbar />
{/if}

{#if noWrapper.includes(page.url.pathname)}
  {@render children()}
{:else}
  <div>
    {@render children()}
  </div>
{/if}