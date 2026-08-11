import re

content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Find all case declarations to detect duplicates
cases = list(re.finditer(r'      case "([^"]+)":', content))
seen = {}
duplicates = []
for m in cases:
    name = m.group(1)
    if name in seen:
        duplicates.append((name, seen[name], m.start()))
        print(f"DUPLICATE: '{name}' first at {seen[name]}, second at {m.start()}")
    else:
        seen[name] = m.start()

print(f"\nTotal cases: {len(cases)}, Duplicates: {len(duplicates)}")
