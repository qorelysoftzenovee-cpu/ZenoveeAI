import re

config_path = 'src/utils/toolsConfig.ts'
config_content = open(config_path, 'r', encoding='utf-8').read().strip()

new_entries = open('scratch/generated_ts_entries.txt', 'r', encoding='utf-8').read().strip()

# Find closing bracket of the array
if config_content.endswith('];'):
    config_content = config_content[:-2].strip()
elif config_content.endswith(']'):
    config_content = config_content[:-1].strip()

if config_content.endswith(','):
    config_content = config_content[:-1].strip()

updated_content = config_content + ",\n" + new_entries + "\n];\n"

with open(config_path, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Appended 59 new tools to toolsConfig.ts successfully!")
