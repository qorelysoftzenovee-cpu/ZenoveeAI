import re

content = open('src/utils/toolsConfig.ts','r',encoding='utf-8').read()
blocks = re.findall(r'\n  \{\s*\n\s*id:\s*"([^"]+)"', content)
cats = re.findall(r'category:\s*"([^"]+)"', content)
descs_raw = re.findall(r'description:\s*"([^"]+)"', content)
titles_raw = re.findall(r'title:\s*"([^"]+)"', content)

print(f'Actual tool count: {len(blocks)}')

from collections import Counter
print('\nCategories:')
for cat, count in Counter(cats).items():
    print(f'  {cat}: {count}')

print('\nFirst 5 tools:')
for i, tid in enumerate(blocks[:5]):
    print(f'  {i+1}. {tid}')

print('\nLast 5 tools:')
for tid in blocks[-5:]:
    print(f'  {tid}')

# Write all tool IDs to file for use in other scripts
with open('scratch/all_tool_ids.txt','w',encoding='utf-8') as f:
    for tid in blocks:
        f.write(tid + '\n')
print(f'\nWritten {len(blocks)} tool IDs to scratch/all_tool_ids.txt')
