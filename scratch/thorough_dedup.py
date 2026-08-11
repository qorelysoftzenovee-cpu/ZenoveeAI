import re

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()
tool_matches = re.findall(r'\{\s*id:\s*"([^"]+)".*?title:\s*"([^"]+)"', content, re.DOTALL)

print(f"Total tools in toolsConfig.ts: {len(tool_matches)}")

# Check for duplicate IDs or titles
ids = [t[0] for t in tool_matches]
titles = [t[1] for t in tool_matches]

print("Duplicate IDs:", [x for x in ids if ids.count(x) > 1])
print("Duplicate Titles:", [x for x in titles if titles.count(x) > 1])
