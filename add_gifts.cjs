const fs = require('fs');

const path = 'src/lib/data/routes.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const pb2 = data.pitchblack2;

const newRoutes = [
  {
    type: 'route',
    name: 'Aspertia City (Gift)',
    encounters: ['treecko', 'torchic', 'mudkip']
  },
  {
    type: 'route',
    name: 'Aspertia Gate (Egg)',
    encounters: ['tyrogue', 'timburr', 'mime jr', 'smoochum']
  },
  {
    type: 'route',
    name: 'Nuvema Town (Egg)',
    encounters: ['elekid', 'magby', 'meowth']
  },
  {
    type: 'route',
    name: 'Virbank Gate (Egg)',
    encounters: ['numel', 'slugma', 'houndour', 'growlithe']
  },
  {
    type: 'route',
    name: 'Liberty Garden (Gift)',
    encounters: ['suicune', 'entei', 'raikou']
  },
  {
    type: 'route',
    name: 'Anville Town (Gift)',
    encounters: ['rotom']
  },
  {
    type: 'route',
    name: 'Driftveil Gym (Gift)',
    encounters: ['axew']
  },
  {
    type: 'route',
    name: 'Mistralton City (Gift)',
    encounters: ['anorith']
  },
  {
    type: 'route',
    name: 'Route 4 (Trade)',
    encounters: ['vulpix']
  }
];

let added = 0;
for (const nr of newRoutes) {
  if (!pb2.find(r => r.name === nr.name)) {
    pb2.push(nr);
    added++;
  }
}

if (added > 0) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log(`Added ${added} gift/trade routes to Pitch Black 2`);
} else {
  console.log('Routes already existed');
}
