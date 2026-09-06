const fs = require('fs');
const https = require('https');

const trainers = [
  'plasmagrunt', 'pokemonbreeder', 'sage'
];

const dest = './src/routes/assets/img/leaders';
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

async function download(url, path) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const f = fs.createWriteStream(path);
        res.pipe(f);
        f.on('finish', () => resolve(true));
      } else {
        res.resume();
        resolve(false);
      }
    }).on('error', reject);
  });
}

async function run() {
  for (const t of trainers) {
    const p1 = `https://play.pokemonshowdown.com/sprites/trainers/${t}.png`;
    
    let ok = await download(p1, `${dest}/${t}.png`);
    
    if (ok) {
      console.log(`Downloaded ${t}.png`);
    } else {
      console.log(`Failed to download ${t}`);
    }
  }
}

run();
