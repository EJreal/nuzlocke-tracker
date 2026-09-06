const fs = require('fs');
const http = require('http');

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  const pokelist = await fetchJSON('http://localhost:5173/api/pokemon/pitchblack2.json');
  
  // Build a lookup that ALWAYS prefers the base form (lowest imgId for that name)
  const byName = {};
  for (const p of pokelist) {
    const key = p.name.toLowerCase();
    if (!byName[key] || p.imgId < byName[key].imgId) {
      byName[key] = p;
    }
  }
  
  // Also build by alias
  const byAlias = {};
  for (const p of pokelist) {
    if (p.alias) {
      const key = p.alias.toLowerCase();
      if (!byAlias[key] || p.imgId < byAlias[key].imgId) {
        byAlias[key] = p;
      }
    }
  }

  const files = [
    'static/api/league/pitchblack2.fire.json',
    'static/api/league/pitchblack2.water.json',
    'static/api/league/pitchblack2.grass.json'
  ];

  let fixed = 0;
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));

    for (const boss of Object.values(data)) {
      for (const p of boss.pokemon) {
        const pkmnInfo = byName[p.name.toLowerCase()] || byAlias[p.name.toLowerCase()];
        if (pkmnInfo) {
          // Use the sprite field (like "gyarados") not imgId (which might be mega)
          // The createImgUrl function uses p.sprite first as a string fallback
          const baseImgId = pkmnInfo.imgId < 10000 ? pkmnInfo.imgId : null;
          // If base form exists use it, else keep the special form sprite as-is
          if (baseImgId) {
            p.sprite = baseImgId.toString();
          }
          // Types and stats come from base form too
          p.types = pkmnInfo.types;
          p.stats = pkmnInfo.baseStats;
          fixed++;
        }
      }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    console.log('Patched', file);
  }
  console.log('Total pokemon entries fixed:', fixed);
}

main();
