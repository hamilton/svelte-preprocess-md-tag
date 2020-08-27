<script>
  export let percent = 100;
</script>

<style>
  div {
    padding: 8px;
    background-color: black;
    color: white;
  }
</style>

<div>there is no markdown in this file ({percent}%) certainty</div>

<ul>
  {#each [1, 2, 3] as k}
    <li>tried {k} - no dice</li>
  {/each}
</ul>
There's still no markdown.
