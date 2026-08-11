import re
import json

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Match top-level tool objects
tool_matches = re.findall(r'\{\s*id:\s*"([a-z0-9-]+)",\s*title:\s*"([^"]+)",\s*category:\s*"([^"]+)"', content)

print("Total top-level tools in toolsConfig.ts:", len(tool_matches))

tool_ids = [t[0] for t in tool_matches]
tool_titles = [t[1] for t in tool_matches]

print("Duplicate Tool IDs:", [x for x in set(tool_ids) if tool_ids.count(x) > 1])
print("Duplicate Tool Titles:", [x for x in set(tool_titles) if tool_titles.count(x) > 1])

# Check functional concept duplicates
concepts = {}
dups = []
for tid, title, cat in tool_matches:
    slug = tid.replace("-", "")
    if slug in concepts:
        dups.append((tid, title, concepts[slug]))
    else:
        concepts[slug] = (tid, title)

print(f"\nExact slug collisions: {len(dups)}")
for d in dups:
    print(f"  Collision: {d[0]} ({d[1]}) vs {d[2][0]} ({d[2][1]})")
