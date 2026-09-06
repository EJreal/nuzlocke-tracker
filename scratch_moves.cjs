const fs = require('fs');
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();

async function fixMoves() {
  const moveCache = {};
  for (const variant of ['fire', 'water', 'grass']) {
    const p = `static/api/league/pitchblack2.${variant}.json`;
    const league = JSON.parse(fs.readFileSync(p, 'utf8'));
    
    for (const boss of Object.values(league)) {
      for (const pkmn of boss.pokemon) {
        for (const move of pkmn.moves) {
          const mname = move.name.toLowerCase().replace(/[^a-z0-9-]/g, '').replace(' ', '-');
          if (!mname) continue;
          
          if (!moveCache[mname]) {
            try {
              const res = await P.getMoveByName(mname);
              moveCache[mname] = {
                type: res.type.name,
                damage_class: res.damage_class.name,
                power: res.power || 0,
                priority: res.priority || 0
              };
            } catch(e) {
              // Try replacing spaces with hyphens for things like "Quick Attack" -> "quick-attack"
              const altName = move.name.toLowerCase().replace(/ /g, '-').replace(/[^a-z0-9-]/g, '');
              try {
                const res = await P.getMoveByName(altName);
                moveCache[mname] = {
                  type: res.type.name,
                  damage_class: res.damage_class.name,
                  power: res.power || 0,
                  priority: res.priority || 0
                };
              } catch(e2) {
                 console.log("Could not find move:", move.name);
                 moveCache[mname] = { type: 'normal', damage_class: 'physical', power: 0, priority: 0 };
              }
            }
          }
          
          move.type = moveCache[mname].type;
          move.damage_class = moveCache[mname].damage_class;
          move.power = moveCache[mname].power;
          move.priority = moveCache[mname].priority;
        }
      }
    }
    fs.writeFileSync(p, JSON.stringify(league, null, 2));
    console.log("Fixed moves in", p);
  }
}

fixMoves();
