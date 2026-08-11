import json

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

config_content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Replace any name: "input_data" with id: "input_data"
config_content = config_content.replace('name: "input_data"', 'id: "input_data"').replace('name: "mode"', 'id: "mode"')

# Ensure title is followed by name if missing
with open('src/utils/toolsConfig.ts', 'w', encoding='utf-8') as f:
    f.write(config_content)

print("Updated toolsConfig.ts property names to match TypeScript interfaces!")
