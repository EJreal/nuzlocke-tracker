<script>
  export let data

  import { updateGame, savedGames, IDS } from '$lib/store'
  import { base } from '$app/paths'
  import { Loader } from '$c/core'
  import { onMount } from 'svelte'

  onMount(() => {
    window.localStorage.setItem(
      IDS.game(data.save.id),
      JSON.stringify(data.data)
    )
    savedGames.update(updateGame(data.save))
    window.location = `${base}/saves`
  })
</script>

<svelte:head>
  <meta name="robots" content="nofollow, noindex" />
</svelte:head>

<Loader />
