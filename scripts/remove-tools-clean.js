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

function removeToolsFromContent(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let removed = 0;

  idsToRemove.forEach(id => {
    // Find index of `id: "tool-id"` or `id: 'tool-id'`
    const targetDouble = `id: "${id}"`;
    const targetSingle = `id: '${id}'`;
    
    let idx = content.indexOf(targetDouble);
    if (idx === -1) idx = content.indexOf(targetSingle);

    if (idx !== -1) {
      // Find start of object `{` before `idx`
      let startIdx = content.lastIndexOf('{', idx);
      // Find matching closing `}` for this tool block
      let depth = 0;
      let endIdx = -1;
      for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') depth++;
        if (content[i] === '}') {
          depth--;
          if (depth === 0) {
            endIdx = i + 1;
            break;
          }
        }
      }

      if (startIdx !== -1 && endIdx !== -1) {
        // Look ahead for comma `,`
        if (content[endIdx] === ',') endIdx++;
        content = content.slice(0, startIdx) + content.slice(endIdx);
        removed++;
      }
    }
  });

  fs.writeFileSync(filePath, content);
  console.log(`Cleanly removed ${removed} tools from ${filePath}`);
}

removeToolsFromContent('src/utils/toolsConfig.ts');
removeToolsFromContent('public/template/main.js');
