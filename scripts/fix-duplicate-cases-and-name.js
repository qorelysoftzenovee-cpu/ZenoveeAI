const fs = require('fs');

// 1. Fix package.json name to "zenovee"
const pkgPath = 'package.json';
let pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.name = 'zenovee';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('Updated package.json name to "zenovee"');

// 2. Create wrangler.jsonc with "name": "zenovee"
const wranglerConfig = `{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "zenovee",
  "compatibility_date": "2026-08-03",
  "observability": {
    "enabled": true
  },
  "compatibility_flags": [
    "nodejs_compat"
  ]
}
`;
fs.writeFileSync('wrangler.jsonc', wranglerConfig);
console.log('Created wrangler.jsonc with name "zenovee"');

// 3. Remove duplicate switch cases in page.tsx
const pagePath = 'src/app/dashboard/tools/[toolId]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

['utm-builder', 'mortgage-amortization'].forEach(id => {
  const casePattern = `case "${id}":`;
  const firstIdx = pageContent.indexOf(casePattern);
  if (firstIdx !== -1) {
    const secondIdx = pageContent.indexOf(casePattern, firstIdx + casePattern.length);
    if (secondIdx !== -1) {
      // Find end of this duplicate case block (up to next `case ` or `default:`)
      let nextCaseIdx = pageContent.indexOf('case "', secondIdx + casePattern.length);
      if (nextCaseIdx === -1) nextCaseIdx = pageContent.indexOf('default:', secondIdx);
      
      if (nextCaseIdx !== -1) {
        pageContent = pageContent.slice(0, secondIdx) + pageContent.slice(nextCaseIdx);
        console.log(`Removed duplicate case "${id}"`);
      }
    }
  }
});

fs.writeFileSync(pagePath, pageContent);
