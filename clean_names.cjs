const fs = require('fs');

async function cleanPokemon() {
  const res = await fetch('http://localhost:5173/api/pokemon/pitchblack2.json');
  const allPokemon = await res.json();
  const pokemonDict = {};
  for (const p of allPokemon) {
    pokemonDict[p.alias.toLowerCase()] = p;
    pokemonDict[p.name.toLowerCase()] = p;
  }

  const files = [
    'static/api/league/pitchblack2.fire.json',
    'static/api/league/pitchblack2.water.json',
    'static/api/league/pitchblack2.grass.json'
  ];

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    for (const key in data) {
      const boss = data[key];

      for (const p of boss.pokemon) {
        if (p.name.includes('(chose')) {
           p.name = p.name.split('(chose')[0].trim();
        }
        if (p.name === 'farfetch\'d') p.name = 'farfetchd';
        if (p.name === 'shaymin-s') p.name = 'shaymin-sky';
        if (p.name === 'landorus-t') p.name = 'landorus-therian';
        if (p.name === 'thundurus-t') p.name = 'thundurus-therian';
        if (p.name === 'tornadus-t') p.name = 'tornadus-therian';
        if (p.name === 'darmanitan-z') p.name = 'darmanitan-zen';
        if (p.name === 'keldeo-r') p.name = 'keldeo-resolute';
        if (p.name === 'meloetta-p') p.name = 'meloetta-pirouette';
        if (p.name === 'rotom-w') p.name = 'rotom-wash';
        if (p.name === 'rotom-h') p.name = 'rotom-heat';
        if (p.name === 'rotom-c') p.name = 'rotom-mow';
        if (p.name === 'rotom-f') p.name = 'rotom-frost';
        if (p.name === 'rotom-s') p.name = 'rotom-fan';
        if (p.name === 'giratina-o') p.name = 'giratina-origin';
        if (p.name === 'kyurem-b') p.name = 'kyurem-black';
        if (p.name === 'kyurem-w') p.name = 'kyurem-white';
        if (p.name === 'mr. mime') p.name = 'mr-mime';

        const pkmnInfo = pokemonDict[p.name.toLowerCase()];
        if (pkmnInfo) {
          p.sprite = pkmnInfo.imgId ? pkmnInfo.imgId.toString() : pkmnInfo.sprite;
          p.types = pkmnInfo.types;
          p.stats = pkmnInfo.baseStats;
        } else {
          console.log('Still not found in lookup:', p.name);
        }
      }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('Fixed aliases and sprites in', file);
  }
}

cleanPokemon();
