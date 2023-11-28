<svelte:options customElement="ps-svelte-teacher-portal-section-filter" />
<script>
  import { onMount } from 'svelte';
  import md5 from 'md5';
  import devSections from '$ps/teachers/json/section.json';

  let sections = [];
  let filters = new Set(['Hey']); // Use a Set to store unique values

  async function loadSections() {
    const isProduction = false; /* Add your logic here to check if the environment is production */
    if (isProduction) {
      const response = await fetch('/teachers/json/section.json');
      sections = await response.json();
    } else {
      sections = devSections;
    }
  }

  function processSection(section) {
    let not_in_session = false;
    
    const this_filters = [
      `Course: ${section.COURSE_NAME}`,
      `Exp: ${section.EXTERNAL_EXPRESSION}`,
      `Term: ${section.TERM}`,
      `Period: ${section.EXTERNAL_EXPRESSION.split('(')[0]}`,
      `Days: ${section.EXTERNAL_EXPRESSION.split('(')[1].replaceAll(')', '')}`,
      `${section.ACTIVE == 1 ? 'Term: Active' : 'Inactive'}`,
      `Meets Today: ${not_in_session ? 'No' : 'Yes'}`
    ];

    this_filters.forEach((filter) => {
      filters = new Set([...filters, filter]); // Use a new Set to trigger reactivity
    });
  }

  onMount(async () => {
    await loadSections();
    sections.forEach(processSection);
    filters = new Set([...Array.from(filters).sort((a, b) => {
      if (a.includes('Meets Today:')) return -1;
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })]);
  });
</script>

<select name="section_filters" id="section_filters">
  {#if filters.size > 0}
    {#each Array.from(filters) as filter, index (index)}
      <option value={md5(filter)}>{filter}</option>
    {/each}
  {:else}
    <option value="">No filters available</option>
  {/if}
</select>

<pre>{Array.from(filters)}</pre>

<style>
  #section_filters {
    margin: 0 0 0 10px;
    padding: 0;
    height: 30px;
    font-size: 14px;
    font-weight: bold;
    color: #000;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 5px;
  }
</style>
