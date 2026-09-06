const https = require('https');
const checkUrl = (url) => new Promise(res => https.get(url, (r) => { r.resume(); res(r.statusCode === 200); }));
async function main() {
  const tests = ['socialite', 'depotagent', 'richboy', 'hooligan', 'hooligans'];
  for (const t of tests) {
    const base = `https://play.pokemonshowdown.com/sprites/trainers/${t}.png`;
    const okBase = await checkUrl(base);
    console.log(`${t}: ${okBase}`);
  }
}
main();
