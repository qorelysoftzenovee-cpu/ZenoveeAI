import json
import re

with open('scratch/new_tools_to_add.json', 'r', encoding='utf-8') as f:
    new_tools = json.load(f)

category_mapping = {
    "Development & Code Tools": "Developer & Tech Utilities",
    "Design & Color Utilities": "Media, Design & Productivity",
    "Security & Network Utilities": "Network & Server Utilities",
    "Document & File Conversion": "Media, Design & Productivity",
    "Math, Finance & Utility Calculators": "Calculators & Mathematics",
    "SEO & Marketing Helpers": "Growth Marketing & SEO Suite",
    "Text & Data Processing": "Developer & Tech Utilities",
    "Productivity & Organization": "Media, Design & Productivity",
    "Science, Engineering & Conversion Helpers": "Calculators & Mathematics"
}

ts_entries = []

for tool in new_tools:
    slug = tool["slug"]
    title = tool["title"].replace('"', '\\"')
    desc = tool["description"].replace('"', '\\"')
    orig_cat = tool["category"]
    target_cat = category_mapping.get(orig_cat, "Developer & Tech Utilities")

    entry = f'''  {{
    id: "{slug}",
    title: "{title}",
    name: "{title}",
    category: "{target_cat}",
    description: "{desc}",
    inputs: [
      {{
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      }},
      {{
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }}
    ]
  }}'''
    ts_entries.append(entry)

with open('scratch/generated_ts_entries.txt', 'w', encoding='utf-8') as f:
    f.write(",\n".join(ts_entries))

# Also restore original 70 tools in toolsConfig.ts before re-appending
config_content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()
# Cut off at the end of original 70 tools
idx = config_content.find('  {\n    id: "regex-tester"')
if idx != -1:
    clean_base = config_content[:idx].strip()
    if clean_base.endswith(','):
        clean_base = clean_base[:-1].strip()
    clean_base += ",\n" + ",\n".join(ts_entries) + "\n];\n"
    with open('src/utils/toolsConfig.ts', 'w', encoding='utf-8') as f:
        f.write(clean_base)
    print("Re-generated toolsConfig.ts cleanly!")
else:
    print("Could not find regex-tester split index")
