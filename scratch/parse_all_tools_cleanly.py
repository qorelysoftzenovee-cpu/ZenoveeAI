import re

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Match every { id: "..." block inside export const toolsConfig
tool_ids = re.findall(r'id:\s*"([a-z0-9-]+)"', content)

# Filter out input IDs like input_data, mode, format, etc.
input_ids = {"input_data", "inputdata", "mode", "format", "quality", "maxwidth", "text", "style", "styleName", "code"}

top_level_tool_ids = [tid for tid in tool_ids if tid not in input_ids]

print(f"Total top-level unique tools in toolsConfig.ts: {len(top_level_tool_ids)}")
print("Any duplicate tool IDs?", len(top_level_tool_ids) != len(set(top_level_tool_ids)))

if len(top_level_tool_ids) != len(set(top_level_tool_ids)):
    dups = [x for x in set(top_level_tool_ids) if top_level_tool_ids.count(x) > 1]
    print("Duplicate IDs found:", dups)
