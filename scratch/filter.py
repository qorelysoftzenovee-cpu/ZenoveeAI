import re
import os

page_content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()
cases = re.findall(r'case\s+\"([^\"]+)\":', page_content)
implemented_ids = set(cases)
print("Implemented tools count:", len(implemented_ids))

config_content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# toolsConfig is an array exported. We can parse it by finding each object.
# The safest way is to split by `  {` which indicates the start of a tool object.
parts = re.split(r'(?=\n  \{)', config_content)

out = []
for p in parts:
    match = re.search(r'id:\s*\"([^\"]+)\"', p)
    if match:
        tool_id = match.group(1)
        if tool_id in implemented_ids:
            out.append(p)
        else:
            print("Removing tool:", tool_id)
    else:
        # Header or footer of the file
        out.append(p)

# We need to make sure the last element doesn't have a trailing comma if it's the last tool,
# but in JS trailing commas are fine.
new_config = ''.join(out)

with open('src/utils/toolsConfig.ts', 'w', encoding='utf-8') as f:
    f.write(new_config)

print("Finished filtering toolsConfig.ts")
