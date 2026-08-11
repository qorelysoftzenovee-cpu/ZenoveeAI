import re
content = open('src/utils/toolsConfig.ts','r',encoding='utf-8').read()
tools = re.findall(r'id:\s*"([^"]+)"', content)
cats = re.findall(r'category:\s*"([^"]+)"', content)
descs = re.findall(r'description:\s*"([^"]+)"', content)
titles = re.findall(r'title:\s*"([^"]+)"', content)
from collections import Counter

print('Total tools:', len(tools))
print('\nCategories:')
for cat, count in Counter(cats).items():
    print(f'  {cat}: {count}')

print('\nFirst 5 tools with details:')
for i in range(min(5, len(tools))):
    t = tools[i]
    ti = titles[i] if i < len(titles) else 'N/A'
    d = descs[i] if i < len(descs) else 'N/A'
    print(f'  id={t}, title={ti[:50]}, desc={d[:60]}')
