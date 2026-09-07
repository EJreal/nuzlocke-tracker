import { building, dev } from '$app/environment'
import { base } from '$app/paths'
const rewrite = !building && !dev

// TODO: Remember to update `vercel.json` in root of project when
// modifying these sources

export const SPRITE = `${base}/assets/img/pokemon`
export const CUSTOM = 'https://img.nuzlocke.app/sprites'
export const IMG = `${base}/assets/img`
export const SHARE = 'https://share.nuzlocke.app'

export const DATA = rewrite ? '/api' : '/api' // Load locally for development

export const QRCODE = rewrite
  ? `${base}/assets/js/qrcode.min.js`
  : 'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@gh-pages/qrcode.min.js'

export const INSTASCAN = rewrite
  ? `${base}/assets/js/instascan.min.js`
  : 'https://cdn.jsdelivr.net/gh/schmich/instascan-builds@master/instascan.min.js'

export const UNOWN = 'https://img.nuzlocke.app/sprites/unown.png?v=1'

export const createImgUrl = (p, { ext = 'webp', shiny = false } = {}) => {
  if (!p) return UNOWN
  if (p.imgUrl) return `${CUSTOM}${p.imgUrl}.${ext}`

  const normalId = ('' + (p.imgId || p.sprite || ''))
    .replace('.png', '')
    .replace('.webp', '')

  if (!normalId) return UNOWN

  if (shiny) return `${SPRITE}/shiny-${normalId}.${ext}`
  return `${SPRITE}/base-${normalId}.${ext}`
}

export const bossToImage = (bossData) => {
  let img = null;
  if(typeof bossData.img !== 'undefined' && bossData.img !== null) {
    img = typeof bossData.img === 'string' ? { src: bossData.img } : bossData.img

    if(img && img.src.startsWith('/leaders/')) {
      img.src = `${base}/assets/img${img.src}`;
    }
    if(img && img.src.startsWith('/sprite/')) {
      img.src = `${base}/assets/img/pokemon/base-${img.src.slice(8)}`;
    }
  } 
  
  if (!img && bossData.name) {
    const nameLower = bossData.name.toLowerCase();
    const genericClasses = [
      'youngster', 'lass', 'janitor', 'schoolkid', 'hiker', 'preschooler',
      'twins', 'nurseryaide', 'worker', 'roughneck', 'guitarist',
      'doctor', 'scientist', 'backpacker', 'clerk', 'policeman',
      'fisherman', 'harlequin', 'biker', 'nurse', 'psychic', 'artist',
      'cyclist', 'lady', 'beauty', 'baker', 'dancer', 'parasollady',
      'acetrainer', 'pokefan', 'gentleman', 'pilot',
      'blackbelt', 'battlegirl', 'swimmer', 'smasher', 'hoopster', 'veteran'
    ];
    for (const gc of genericClasses) {
      if (nameLower.includes(gc)) {
        img = { src: `${base}/assets/img/leaders/${gc}` };
        break;
      }
    }
    // Aliases for space-separated classes
    if (!img) {
      if (nameLower.includes('ace trainer')) img = { src: `${base}/assets/img/leaders/acetrainer` };
      else if (nameLower.includes('battle girl')) img = { src: `${base}/assets/img/leaders/battlegirl` };
      else if (nameLower.includes('pkmn ranger') || nameLower.includes('pokémon ranger')) img = { src: `${base}/assets/img/leaders/acetrainer` };
      else if (nameLower.includes('school kid')) img = { src: `${base}/assets/img/leaders/schoolkid` };
      else if (nameLower.includes('parasol lady')) img = { src: `${base}/assets/img/leaders/parasollady` };
      else if (nameLower.includes('pokéfan')) img = { src: `${base}/assets/img/leaders/pokefan` };
      else if (nameLower.includes('black belt')) img = { src: `${base}/assets/img/leaders/blackbelt` };
      else if (nameLower.includes('team plasma grunt')) img = { src: `${base}/assets/img/leaders/plasmagrunt` };
      else if (nameLower.includes('pokémon breeder') || nameLower.includes('pokemon breeder') || nameLower.includes('pkmn breeder')) img = { src: `${base}/assets/img/leaders/pokemonbreeder` };
      else if (nameLower.includes('backers')) img = { src: `${base}/assets/img/leaders/acetrainer` };
      else if (nameLower.includes('game freak morimoto')) img = { src: `${base}/assets/img/leaders/veteran` };
      else if (nameLower.includes('game freak nishino')) img = { src: `${base}/assets/img/leaders/hiker` };
      else if (nameLower.includes('pokémon trainer rood') || nameLower.includes('pokemon trainer rood')) img = { src: `${base}/assets/img/leaders/sage` };
      else if (nameLower.includes('cynthia')) img = { src: `${base}/assets/img/leaders/dp-cynthia` };
      else if (nameLower.includes('depot agent')) img = { src: `${base}/assets/img/leaders/depotagent` };
      else if (nameLower.includes('rich boy')) img = { src: `${base}/assets/img/leaders/richboy` };
      else if (nameLower.includes('hooligans')) img = { src: `${base}/assets/img/leaders/hooligans` };
      else if (nameLower.includes('socialite')) img = { src: `${base}/assets/img/leaders/lady` };
      else if (nameLower.includes('team plasma shadow')) img = { src: `${base}/assets/img/leaders/blwh-shadow` };
    }
  }
  
  return img;
}
