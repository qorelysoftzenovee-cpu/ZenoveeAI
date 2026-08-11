import re
from collections import Counter

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()
categories = re.findall(r'category:\s*"([^"]+)"', content)
counts = Counter(categories)
print("Categories and tool counts:")
for cat, count in sorted(counts.items()):
    print(f"  '{cat}': {count}")
print("Total tools:", len(categories))
