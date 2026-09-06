const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\ejrea\\Documents\\Dev\\Code\\EJreal-NuzlockeTracker\\Pitch Black 2 Hardcore Mode\\Gift & Trade Changes.txt', 'utf8').split('\n');

const gifts = {};
let currentLoc = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.startsWith('+---') && lines[i+1] && lines[i+1].includes('|') && !lines[i+1].includes('Pokmon') && !lines[i+1].includes('Mn') && !lines[i+2]?.includes('Mn')) {
    currentLoc = lines[i+1].replace(/\|/g, '').trim();
    if (!gifts[currentLoc]) gifts[currentLoc] = [];
  } else if (currentLoc && line.startsWith('|') && !line.includes('Mn') && !line.includes('Pokmon') && !line.includes('Eggs')) {
    const parts = line.split('|').map(s => s.trim()).filter(Boolean);
    if (parts.length > 0 && isNaN(parseInt(parts[0]))) {
      const pkmn = parts[0].toLowerCase().replace('', 'e');
      if (pkmn) gifts[currentLoc].push(pkmn);
    }
  }
}

console.log(JSON.stringify(gifts, null, 2));
