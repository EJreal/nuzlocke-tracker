const fs = require('fs');
const files = fs.readdirSync('src/routes/assets/img/leaders/');
const toCheck = ['socialite', 'depotagent', 'richboy', 'hooligan', 'cynthia', 'rich', 'depot'];
for (const t of toCheck) {
  const matches = files.filter(f => f.includes(t));
  console.log(t + ': ' + (matches.length > 0 ? matches.join(', ') : 'NOT FOUND'));
}
