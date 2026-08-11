import re
import json

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Extract all tool objects
tool_matches = re.findall(r'\{\s*id:\s*"([^"]+)".*?title:\s*"([^"]+)".*?category:\s*"([^"]+)".*?description:\s*"([^"]+)"', content, re.DOTALL)

tools = []
for tid, title, cat, desc in tool_matches:
    tools.append({
        "id": tid,
        "title": title,
        "category": cat,
        "description": desc
    })

print("Total tools currently in config:", len(tools))

# Let's inspect tools that have duplicate IDs or duplicate functional concepts:
# For example:
# 1. 'robots-txt-builder' vs 'robots-sitemap-builder' -> Both build robots.txt!
# 2. 'og-generator' vs 'og-tag-generator' -> Both generate OpenGraph tags/cards!
# 3. 'percentage-calculator' vs 'percentage-margin-calculator' -> Both calculate percentages!
# 4. 'cidr-calculator' vs 'subnet-calculator' -> Both calculate subnets/CIDR!
# 5. 'pdf-merger' vs 'pdf-page-merger-splitter' -> Both merge/split PDFs!
# 6. 'color-code-converter' vs 'resistor-color-code-calc' (wait, resistor color code is electronics, color code converter is hex/rgb).
# 7. 'favicon-generator-ui' vs 'favicon-generator' -> Exact duplicate favicon generator!
# 8. 'box-shadow-generator' vs 'css-box-shadow-generator' (wait, let's check).
# 9. 'html-entity-encoder' vs 'base64-url-html-encoder' / 'url-encoder-decoder'.

# Let's list all 129 tool IDs to perform a clean manual deduplication audit!
with open('scratch/all_129_tools.json', 'w', encoding='utf-8') as f:
    json.dump(tools, f, indent=2)

print("Dumped all 129 tools to scratch/all_129_tools.json")
