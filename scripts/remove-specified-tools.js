const fs = require('fs');

const idsToRemove = new Set([
  'case-converter',
  'duplicate-line-remover',
  'word-scrambler',
  'reverse-text-generator',
  'text-sorter',
  'text-repeater',
  'tiktok-caption-generator',
  'social-bio-generator',
  'instagram-hashtag-generator',
  'seo-meta-generator',
  'lorem-generator',
  'curl-to-fetch',
  'markdown-to-html',
  'json-to-csv',
  'base64-encoder-decoder',
  'headline-analyzer',
  'reading-time-calculator'
]);

console.log('Tools to remove count:', idsToRemove.size);

// 1. Clean toolsConfig.ts
const toolsConfigPath = 'src/utils/toolsConfig.ts';
let configContent = fs.readFileSync(toolsConfigPath, 'utf8');

let removedConfigCount = 0;
idsToRemove.forEach(id => {
  const regex = new RegExp(`\\s*\\{\\s*id:\\s*["']${id}["'][\\s\\S]*?\\},\\s*\\n?`, 'g');
  if (regex.test(configContent)) {
    configContent = configContent.replace(regex, '');
    removedConfigCount++;
  }
});

fs.writeFileSync(toolsConfigPath, configContent);
console.log(`Removed ${removedConfigCount} tool entries from toolsConfig.ts!`);

// 2. Clean public/template/main.js
const mainJsPath = 'public/template/main.js';
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

let removedMainCount = 0;
idsToRemove.forEach(id => {
  const regex = new RegExp(`\\s*\\{\\s*id:\\s*['"]${id}['"][\\s\\S]*?\\},\\s*\\n?`, 'g');
  if (regex.test(mainJsContent)) {
    mainJsContent = mainJsContent.replace(regex, '');
    removedMainCount++;
  }
});

fs.writeFileSync(mainJsPath, mainJsContent);
console.log(`Removed ${removedMainCount} tool entries from public/template/main.js!`);
