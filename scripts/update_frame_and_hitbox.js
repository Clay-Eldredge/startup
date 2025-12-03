const fs = require('fs');
const vm = require('vm');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'characters', 'characterList.jsx');
let src = fs.readFileSync(filePath, 'utf8');

const marker = 'export const characters =';
const idx = src.indexOf(marker);
if (idx === -1) {
  console.error('Could not find export marker in file');
  process.exit(1);
}

let i = src.indexOf('{', idx);
if (i === -1) { console.error('No opening brace found'); process.exit(1); }
let braceCount = 0;
let j = i;
for (; j < src.length; j++) {
  const ch = src[j];
  if (ch === '{') braceCount++;
  else if (ch === '}') {
    braceCount--;
    if (braceCount === 0) { break; }
  }
}
if (braceCount !== 0) { console.error('Braces mismatch'); process.exit(1); }

const objText = src.slice(i, j + 1);
// Evaluate the object literal safely using vm
try {
  const script = new vm.Script('(' + objText + ')');
  const characters = script.runInNewContext({});

  function toHitboxName(key) {
    // convert key like "donkey_kong" or "pac-man" to PascalCase "DonkeyKong" or "PacMan"
    return key
      .replace(/[-_]+/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map(tok => tok.charAt(0).toUpperCase() + tok.slice(1))
      .join('');
  }

  Object.keys(characters).forEach(key => {
    if (!characters[key] || typeof characters[key] !== 'object') return;
    // set frame_data_path to the lowercase_underscore key (keys are already that form)
    characters[key].frame_data_path = key;
    // add hitbox_gif_name as PascalCase concatenation
    characters[key].hitbox_gif_name = toHitboxName(key);
  });

  const newObjText = JSON.stringify(characters, null, 2);
  const before = src.slice(0, idx);
  const afterStart = src.indexOf(';', j) + 1; // position after the semicolon ending the export
  const after = src.slice(afterStart);
  const newContent = before + marker + ' ' + newObjText + ';' + '\n' + after;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Updated frame_data_path and added hitbox_gif_name inline for all characters.');
} catch (e) {
  console.error('Failed to parse object literal:', e);
  process.exit(1);
}
