import re

# Read the generated entries
entries = open('scratch/new_77_tools.txt', 'r', encoding='utf-8').read()

# Read toolsConfig.ts
content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Insert new tools before the closing ];
if content.rstrip().endswith('];'):
    new_content = content.rstrip()[:-2].rstrip() + ',\n' + entries + '\n];\n'
    open('src/utils/toolsConfig.ts', 'w', encoding='utf-8').write(new_content)
    print("Successfully appended 77 new tools to toolsConfig.ts")
    
    # Verify count
    ids = re.findall(r'\n  \{\s*\n\s*id:\s*"([^"]+)"', new_content)
    print(f"Final tool count: {len(ids)}")
else:
    print("ERROR: Could not find closing ]; in toolsConfig.ts")
    print("File ends with:", repr(content[-50:]))
