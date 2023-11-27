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

<select name="sections" id="sections">
  {#each sections as section}
    <option value={section.ID}>{section.COURSE_NAME}</option>
  {/each}
</select>

<style>
  #sections {
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
