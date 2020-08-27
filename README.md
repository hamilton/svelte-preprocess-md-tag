# svelte-preprocess-md-tag

Sometimes, I want to embed a small (but not too small) amount of copy / content into a svelte component.

This preprocessor gives me a new `{#md}` tage that will convert whatever is inside it into static html.

It lets me do things like this:

```
<script>
export let percent = 100;
</script>

<div>
  normal svelte stuff
</div>

<article>
  {#md}
    __markdown__ in my svelte component?
  {/md}
</article>
```

