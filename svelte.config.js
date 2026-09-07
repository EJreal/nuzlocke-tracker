import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: '/nuzlocke-tracker'
    }
  },

  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};
