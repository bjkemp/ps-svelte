<svelte:options customElement="ps-svelte-teacher-portal-section-filter" />
<script>
  import { onMount } from 'svelte';
  import devSections from '$ps/teachers/json/section.json';

  let sections = [];

  onMount(async () => {
    const isProduction = false /* Add your logic here to check if the environment is production */;
    if (isProduction) {
      const response = await fetch('/teachers/json/section.json');
      sections = await response.json();
    } else {
      sections = devSections;
    }
  });
</script>

Hi, I'm a teacher portal section filter!
{sections}
