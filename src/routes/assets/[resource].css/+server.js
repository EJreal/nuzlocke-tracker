import Clean from 'clean-css'

export const prerender = true


import badges from './_badges.css'
import blazingem from './_pokemon-blazingem.css'
import radicalred from './_pokemon-radicalred.css'
import pokemon from './_pokemon.css'

const clean = new Clean({ level: 2 })
const resourceMap = {
  'pokemon-blazingem': blazingem,
  'pokemon-radicalred': radicalred,
  pokemon,
  badges
}

import { base } from '$app/paths'

export async function GET({ params }) {
  const { resource } = params
  if (!resourceMap[resource]) return

  const cssContent = clean.minify(resourceMap[resource]).styles.replace(/\.\.\/img/g, `${base}/assets/img`)

  return new Response(cssContent, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'Content-Type': 'text/css'
    }
  })
}
