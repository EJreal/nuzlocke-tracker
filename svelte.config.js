import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { readFileSync } from 'fs';
const getEntries = () => {
    try {
        const gamesJson = JSON.parse(readFileSync('./src/lib/data/games.json', 'utf8'));
        const routes = JSON.parse(readFileSync('./src/lib/data/routes.json', 'utf8'));
        const league = JSON.parse(readFileSync('./src/lib/data/league.json', 'utf8'));
        
        // Expand games just like src/lib/data/games.js
        const games = Object.fromEntries(
            Object.entries(gamesJson).reduce((acc, [key, game]) => {
                if (!game.difficulty) return acc.concat([[key, game]]);
                return acc.concat(
                    game.difficulty.map((d) => {
                        const [name, idmod] = d.split(':');
                        return [
                            key + idmod,
                            {
                                ...game,
                                difficulty: name,
                                pid: game.pid + idmod,
                                title: game.title + ' ' + name
                            }
                        ];
                    })
                );
            }, [])
        );

        let entries = ['*'];
        
        for (const gameKey of Object.keys(games)) {
            entries.push(`/api/pokemon/${gameKey}.json`);
            entries.push(`/api/${gameKey}/trainers.json`);
        }
        
        for (const gen of Object.keys(routes)) {
            entries.push(`/api/route/${gen}.json`);
            entries.push(`/api/route/generate/${gen}.json`);
        }
        
        return entries;
    } catch (e) {
        console.error("Error generating entries:", e);
        return ['*'];
    }
};

export default {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: '/nuzlocke-tracker'
    },
    prerender: {
      entries: getEntries()
    }
  },

  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};
