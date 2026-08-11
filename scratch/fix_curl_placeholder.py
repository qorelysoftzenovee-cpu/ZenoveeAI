content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Fix curl placeholder - use template-safe string with escaped quotes
old = '''      { id: "input_data", label: "cURL Command", type: "textarea", placeholder: 'curl -X POST https://api.example.com/users -H "Content-Type: application/json" -d \\'{{"name":"Alice"}}\\'' },'''

# More general approach: find and replace the entire curl input line
import re
pattern = r'(\s*\{ id: "input_data", label: "cURL Command".*?placeholder: ).*?(\},)'
replacement = r'\1"curl -X POST https://api.example.com/users -H Content-Type:application/json -d name=Alice" \2'

# Find the line directly
lines = content.split('\n')
for i, line in enumerate(lines):
    if 'cURL Command' in line and 'placeholder' in line and 'input_data' in line:
        lines[i] = '      { id: "input_data", label: "cURL Command", type: "textarea", placeholder: "curl -X POST https://api.example.com/users -H Content-Type:application/json -d name=Alice" },'
        print(f"Fixed curl placeholder at line {i+1}")
        break

content = '\n'.join(lines)
open('src/utils/toolsConfig.ts', 'w', encoding='utf-8').write(content)
print("Done")
