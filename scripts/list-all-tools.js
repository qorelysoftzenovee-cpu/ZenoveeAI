const fs = require('fs');

const content = fs.readFileSync('src/utils/toolsConfig.ts', 'utf8');

// Parse toolsConfig array blocks
const tools = [];
const blockRegex = /\{\s*id:\s*["']([^"']+)["']\s*,\s*title:\s*["']([^"']+)["'][\s\S]*?category:\s*["']([^"']+)["']/g;
let match;
while ((match = blockRegex.exec(content)) !== null) {
  tools.push({
    id: match[1],
    title: match[2],
    category: match[3]
  });
}

// Group by category
const grouped = {};
tools.forEach(t => {
  grouped[t.category] = grouped[t.category] || [];
  grouped[t.category].push(t);
});

let out = `# 🛠️ Complete Zenovee Tools Catalog (${tools.length} Tools across ${Object.keys(grouped).length} Categories)\n\n`;

let catNum = 1;
for (const [cat, list] of Object.entries(grouped)) {
  out += `### ${catNum}. ${cat} (${list.length} Tools)\n`;
  list.forEach((item, idx) => {
    out += `${idx + 1}. **${item.title}** (\`${item.id}\`)\n`;
  });
  out += `\n`;
  catNum++;
}

fs.writeFileSync('scripts/catalog_summary.md', out);
console.log(out);
