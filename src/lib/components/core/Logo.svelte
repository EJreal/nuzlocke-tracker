<script>
  import { base } from '$app/paths'
  export let logo = '', alt = '', aspect = '4x4', pixelated = false, role = '', pictureClass = ''
  import { fade } from 'svelte/transition'

  const [width, height] = aspect.split('x')
</script>

<picture in:fade class={pictureClass || ''}>
  {#if logo}
    <source
      media='(min-width: 600px)'
      type='image/webp'
      srcset='{base}/assets/img/logos/{logo}-small.webp 2x'
    />
    <source
      media='(min-width: 600px)'
      srcset='{base}/assets/img/logos/{logo}-small.png 2x'
    />
    <source
      srcset='{base}/assets/img/logos/{logo}-small.webp'
      type='image/webp'
    />
  {/if}

  <img class={$$restProps.class || ''}
       decoding=aysnc

       class:pixelated={pixelated}
       src='{base}/assets/img/logos/{logo}-small.png'
       loading="lazy"
       {width}
       {height}
       {alt}
       {role}
       type="image/png"
     />
</picture>

<style lang="postcss">
  img.pixelated {
    image-rendering: pixelated;
  }
</style>
