const fs = require('fs');

let mainJs = fs.readFileSync('public/template/main.js', 'utf8');
const target = "id: 'mortgage-amortization'";
const idx1 = mainJs.indexOf(target);
const idx2 = mainJs.indexOf(target, idx1 + 1);

if (idx2 !== -1) {
  const blockEnd = mainJs.indexOf('},', idx2) + 2;
  mainJs = mainJs.slice(0, idx2) + mainJs.slice(blockEnd);
  fs.writeFileSync('public/template/main.js', mainJs);
  console.log('Successfully removed duplicate mortgage-amortization from main.js');
} else {
  console.log('No duplicate found in main.js');
}
