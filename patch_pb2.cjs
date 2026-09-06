const fs = require('fs');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

const newMoves = [
  "Accelerock", "Boomburst", "Breaking Swipe", "Brutal Swing",
  "Dazzling Gleam", "Disarming Voice", "Draining Kiss", "Dual Wingbeat",
  "Esper Wing", "Fire Lash", "Infestation", "Headlong Rush",
  "High Horsepower", "Lunge", "Moonblast", "Mystical Fire",
  "Nuzzle", "Play Rough", "Power-Up Punch", "Psychic Fangs",
  "Psyshield Bash", "Raging Fury", "Scorching Sands", "Smart Strike",
  "Triple Axel", "Spirit Break", "Mountain Gale", "Parabolic Charge",
  "Sandsear Storm", "Bleakwind Storm", "Wildbolt Storm"
];

async function applyMovePatches() {
  const patchesPath = 'src/lib/data/patches.json';
  const patches = JSON.parse(fs.readFileSync(patchesPath, 'utf8'));
  
  if (!patches['pitchblack2']) {
    patches['pitchblack2'] = {};
  }
  if (!patches['pitchblack2'].move) {
    patches['pitchblack2'].move = {};
  }

  for (let moveName of newMoves) {
    const slug = moveName.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/ /g, '-');
    try {
      // First try normal slug
      let res;
      try {
        res = await P.getMoveByName(slug);
      } catch (e) {
        // Fallback for names with spaces
        const altSlug = moveName.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
        res = await P.getMoveByName(altSlug);
      }
      
      patches['pitchblack2'].move[slug] = {
        name: moveName,
        type: res.type.name,
        power: res.power ? res.power.toString() : "0"
      };
      console.log(`+ Added move ${moveName} (${res.type.name}, ${res.power})`);
    } catch (e) {
      console.log(`- Could not fetch move: ${moveName}`);
      patches['pitchblack2'].move[slug] = {
        name: moveName,
        type: 'normal',
        power: '0'
      };
    }
  }

  fs.writeFileSync(patchesPath, JSON.stringify(patches, null, 2));
  console.log('Successfully updated patches.json for PB2 moves!');
}

applyMovePatches();
