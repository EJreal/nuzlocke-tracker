const fs = require('fs');

// Map of name fragments to their image path and speciality
const guestLeaderMap = [
  { fragment: 'falkner', img: '/leaders/gs-falkner', speciality: 'flying' },
  { fragment: 'brawly', img: '/leaders/rs-brawly', speciality: 'fighting' },
  { fragment: 'misty', img: '/leaders/gs-misty2', speciality: 'water' },
  { fragment: 'fantina', img: '/leaders/dp-fantina', speciality: 'ghost' },
  { fragment: 'flannery', img: '/leaders/rs-flannery-oras', speciality: 'fire' },
  { fragment: 'chuck', img: '/leaders/gs-chuck', speciality: 'fighting' },
  { fragment: 'lt. surge', img: '/leaders/gs-surge2', speciality: 'electric' },
  { fragment: 'colress', img: '/leaders/blwh-colress', speciality: '' },
  { fragment: 'ingo', img: '/leaders/blwh-ingo-emmet', speciality: '' },
  { fragment: 'grimsely', img: '/leaders/blwh-grimsley', speciality: 'dark' },  // typo in data
  { fragment: 'grimsley', img: '/leaders/blwh-grimsley', speciality: 'dark' },
  // Standard Unova leaders already mapped - just in case they're missing
  { fragment: 'gym leader cheren', img: '/leaders/blwh-cheren-boss', speciality: 'normal' },
  { fragment: 'gym leader roxie', img: '/leaders/blwh-roxie', speciality: 'poison' },
  { fragment: 'gym leader burgh', img: '/leaders/blwh-burgh', speciality: 'bug' },
  { fragment: 'gym leader elesa', img: '/leaders/blwh-elesa-2', speciality: 'electric' },
  { fragment: 'gym leader clay', img: '/leaders/blwh-clay', speciality: 'ground' },
  { fragment: 'gym leader skyla', img: '/leaders/blwh-skyla', speciality: 'flying' },
  { fragment: 'gym leader drayden', img: '/leaders/blwh-drayden', speciality: 'dragon' },
  { fragment: 'gym leader marlon', img: '/leaders/blwh-marlon', speciality: 'water' },
  { fragment: 'elite four shauntal', img: '/leaders/blwh-shauntal', speciality: 'ghost' },
  { fragment: 'elite four caitlin', img: '/leaders/blwh-caitlin', speciality: 'psychic' },
  { fragment: 'elite four marshal', img: '/leaders/blwh-marshal', speciality: 'fighting' },
  { fragment: 'champion iris', img: '/leaders/blwh-iris-champion', speciality: 'dragon' },
  // Rivals and Bosses
  { fragment: 'mimsu', img: '/leaders/blwh-hugh', speciality: '' }, // Rival is often named Mimsu in this file?
  { fragment: 'pokémon trainer n', img: '/leaders/blwh-n-2', speciality: '' },
  { fragment: 'pkmn trainer n', img: '/leaders/blwh-n-2', speciality: '' },
  { fragment: 'ghetsis', img: '/leaders/blwh-ghetsis', speciality: '' },
  { fragment: 'pokémon trainer hugh', img: '/leaders/blwh-hugh', speciality: '' },
  { fragment: 'pkmn trainer hugh', img: '/leaders/blwh-hugh', speciality: '' },
  { fragment: 'pkmn trainer cheren', img: '/leaders/blwh-cheren-boss', speciality: '' },
  { fragment: 'pkmn trainer bianca', img: '/leaders/blwh-bianca', speciality: '' },
  { fragment: 'shadow triad', img: '/leaders/blwh-shadow', speciality: '' },
  { fragment: 'zinzolin', img: '/leaders/blwh-zinzolin', speciality: '' }
];

const files = [
  'static/api/league/pitchblack2.fire.json',
  'static/api/league/pitchblack2.water.json',
  'static/api/league/pitchblack2.grass.json'
];

let totalFixed = 0;
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const [k, boss] of Object.entries(data)) {
    const lower = boss.name.toLowerCase();
    
    // Always check for fragment matches to assign img (even if already has img, to fix missing ones)
    if (!boss.img) {
      for (const { fragment, img, speciality } of guestLeaderMap) {
        if (lower.includes(fragment)) {
          if (img) boss.img = img;
          if (speciality) boss.speciality = speciality;
          totalFixed++;
          break;
        }
      }
    }
    
    // Clean up boss name: remove reward text and other junk
    const cleanPatterns = [
      /\s*Reward:.*$/i,
      /\s*Rewards:.*$/i,
      /\s*\(Double Battle!.*$/i,
      /\s*\(Fights with you!.*$/i,
      /\s*\(Singles Team!\)$/i,
      /\s*\(Doubles Team!\)$/i,
      /\s*↕️.*↕️\s*/g,
      /\s*Guards:.*$/i,
      /\s*Uses.*$/i,
    ];
    
    for (const pattern of cleanPatterns) {
      boss.name = boss.name.replace(pattern, '').trim();
    }
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  console.log('Fixed guest leaders in', file);
}

console.log('Total fixed:', totalFixed);
