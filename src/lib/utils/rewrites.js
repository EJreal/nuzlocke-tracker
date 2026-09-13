import { building, dev } from '$app/environment'
import { base } from '$app/paths'
const rewrite = !building && !dev

// TODO: Remember to update `vercel.json` in root of project when
// modifying these sources

export const SPRITE = `${base}/assets/img/pokemon`
export const CUSTOM = 'https://img.nuzlocke.app/sprites'
export const IMG = `${base}/assets/img`
export const SHARE = 'https://share.nuzlocke.app'

export const DATA = rewrite ? `${base}/api` : `${base}/api` // Load locally for development

export const QRCODE = rewrite
  ? `${base}/assets/js/qrcode.min.js`
  : 'https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@gh-pages/qrcode.min.js'

export const INSTASCAN = rewrite
  ? `${base}/assets/js/instascan.min.js`
  : 'https://cdn.jsdelivr.net/gh/schmich/instascan-builds@master/instascan.min.js'

export const UNOWN = 'https://img.nuzlocke.app/sprites/unown.png?v=1'

export const createImgUrl = (p, { ext = 'png', shiny = false } = {}) => {
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
      'twins', 'worker', 'roughneck', 'guitarist',
      'doctor', 'policeman',
      'fisherman', 'harlequin', 'biker', 'artist',
      'cyclist', 'lady', 'beauty', 'baker', 'dancer', 'parasollady',
      'pokefan', 'gentleman', 'pilot',
      'blackbelt', 'battlegirl', 'smasher', 'hoopster'
    ];
    for (const gc of genericClasses) {
      if (nameLower.includes(gc)) {
        img = { src: `${base}/assets/img/leaders/${gc}`, webp: false };
        break;
      }
    }
    // Aliases for space-separated classes
    if (!img) {
      if (nameLower.includes('ace trainer') || nameLower.includes('acetrainer')) {
        const isFemale = /(belle|mary|vicki|cora|summer|junko|angi|melina|jeanne|sable|shelly|chandra|shanta|caroll)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/acetrainer${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('swimmer')) {
        const isFemale = /(arissa|mitzi|desiree|kaoru)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/swimmer${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('veteran')) {
        const isFemale = /(rhona|denae|cecile|cathy|portia)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/veteran${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('psychic')) {
        const isFemale = /(ena|dua|joyce|micki|sarah|lynette|alia)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/psychic${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('nursery aide') || nameLower.includes('nurseryaide')) {
        img = { src: `${base}/assets/img/leaders/nurseryaide`, webp: false };
      }
      else if (nameLower.includes('nurse')) {
        img = { src: `${base}/assets/img/leaders/nurse`, webp: false };
      }
      else if (nameLower.includes('battle girl')) img = { src: `${base}/assets/img/leaders/battlegirl`, webp: false };
      else if (nameLower.includes('pkmn ranger') || nameLower.includes('pokémon ranger')) {
        const isFemale = /(naoko|serenity|lois|briana|eliza|dianne|thalia|mikiko|lena|elle|anja)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/pokemonranger${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('school kid')) {
        const isFemale = /(cassie|mara|alberta)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/schoolkid${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('parasol lady')) img = { src: `${base}/assets/img/leaders/parasollady`, webp: false };
      else if (nameLower.includes('pokéfan')) img = { src: `${base}/assets/img/leaders/pokefan`, webp: false };
      else if (nameLower.includes('black belt')) img = { src: `${base}/assets/img/leaders/blackbelt`, webp: false };
      else if (nameLower.includes('team plasma grunt')) {
        const isFemale = /(#763|#587|#801|#436|#343|#437|#810|#438|#439)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/plasmagrunt${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('pokémon breeder') || nameLower.includes('pokemon breeder') || nameLower.includes('pkmn breeder')) img = { src: `${base}/assets/img/leaders/pokemonbreeder`, webp: false };
      else if (nameLower.includes('scientist')) {
        const isFemale = /(caroline|lumina|marissa|lumi)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/scientist${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('backpacker')) {
        const isFemale = /(tami|clara|blossom|eileen|annie|kumiko|kiyo|myra|mae)/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/backpacker${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('clerk')) {
        const isFemale = /♀|britney/i.test(nameLower);
        img = { src: `${base}/assets/img/leaders/clerk${isFemale ? '-f' : ''}`, webp: false };
      }
      else if (nameLower.includes('backers')) img = { src: `${base}/assets/img/leaders/acetrainer`, webp: false };
      else if (nameLower.includes('game freak morimoto')) img = { src: `${base}/assets/img/leaders/veteran`, webp: false };
      else if (nameLower.includes('game freak nishino')) img = { src: `${base}/assets/img/leaders/hiker`, webp: false };
      else if (nameLower.includes('pokémon trainer rood') || nameLower.includes('pokemon trainer rood')) img = { src: `${base}/assets/img/leaders/sage`, webp: false };
      else if (nameLower.includes('cynthia')) img = { src: `${base}/assets/img/leaders/dp-cynthia`, webp: false };
      else if (nameLower.includes('depot agent')) img = { src: `${base}/assets/img/leaders/depotagent`, webp: false };
      else if (nameLower.includes('rich boy')) img = { src: `${base}/assets/img/leaders/richboy`, webp: false };
      else if (nameLower.includes('hooligans')) img = { src: `${base}/assets/img/leaders/hooligans`, webp: false };
      else if (nameLower.includes('socialite')) img = { src: `${base}/assets/img/leaders/lady`, webp: false };
      else if (nameLower.includes('team plasma shadow')) img = { src: `${base}/assets/img/leaders/blwh-shadow`, webp: false };
    }
  }
  
  return img;
}
