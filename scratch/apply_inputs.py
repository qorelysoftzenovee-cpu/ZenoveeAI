import re
import sys

# Execute tool_inputs.py to get TOOL_INPUTS dict
exec(open('scratch/tool_inputs.py').read())

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

replaced = 0
not_found = []

GENERIC_INPUTS_PATTERN = re.compile(
    r'inputs: \[\s*\{\s*id: "input_data",\s*label: "Input Data / Parameters",\s*type: "textarea",\s*placeholder: "Enter your data, URL, text, or configuration here\.\.\."\s*\},\s*\{\s*id: "mode",\s*label: "Mode / Options",\s*type: "dropdown",\s*options: \["Standard Mode", "Advanced Mode", "Export Output"\]\s*\}\s*\]',
    re.DOTALL
)

for tool_id, new_inputs in TOOL_INPUTS.items():
    # Find the tool block
    tool_start = content.find(f'id: "{tool_id}"')
    if tool_start == -1:
        not_found.append(tool_id)
        continue

    # Find inputs block within next 600 chars of tool
    tool_section = content[tool_start:tool_start+800]
    
    # Find the generic inputs pattern in this section
    m = GENERIC_INPUTS_PATTERN.search(tool_section)
    if m:
        # Replace in the full content at the right position
        abs_start = tool_start + m.start()
        abs_end = tool_start + m.end()
        content = content[:abs_start] + new_inputs + content[abs_end:]
        replaced += 1
        print(f"OK Fixed: {tool_id}")
    else:
        # Check if already customized
        if '"Input Data / Parameters"' not in tool_section:
            print(f"  (already custom): {tool_id}")
        else:
            not_found.append(tool_id)
            print(f"MISS: {tool_id}")

open('src/utils/toolsConfig.ts', 'w', encoding='utf-8').write(content)
print(f"\nReplaced {replaced} generic input blocks")
if not_found:
    print(f"NOT FOUND: {not_found}")
