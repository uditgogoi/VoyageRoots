<script>
  import "../app.css";
  import favicon from '$lib/assets/favicon.svg';
  import Navbar from '$lib/components/nav/Navbar.svelte';
  import { page } from '$app/state';

  let { children } = $props();

  const hideNavbar = ['/auth/login', '/auth/register'];
  const noWrapper = ['/terms', '/privacy', '/about'];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{#if !hideNavbar.includes(page.url.pathname)}
  <Navbar />
{/if}

{#if noWrapper.includes(page.url.pathname)}
  {@render children()}
{:else}
  <div>
    {@render children()}
  </div>
{/if}