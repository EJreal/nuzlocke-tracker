const https = require('https');
const checkUrl = (url) => new Promise(res => https.get(url, (r) => { r.resume(); res(r.statusCode === 200); }));
async function main() {
  const tests = ['plasmagrunt', 'plasmagruntm', 'plasmagruntf', 'pokemonbreeder', 'pokemonbreederm', 'pokemonbreederf', 'breeder', 'sage', 'hugh', 'veteran', 'hiker', 'linebacker', 'striker', 'infielder'];
  for (const t of tests) {
    const base = `https://play.pokemonshowdown.com/sprites/trainers/${t}.png`;
    const gen5 = `https://play.pokemonshowdown.com/sprites/trainers/${t}gen5.png`;
    const okBase = await checkUrl(base);
    const okGen5 = await checkUrl(gen5);
    console.log(`${t}: base=${okBase}, gen5=${okGen5}`);
  }
}
main();
