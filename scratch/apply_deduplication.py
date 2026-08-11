import json
import re

config_path = 'src/utils/toolsConfig.ts'
config_content = open(config_path, 'r', encoding='utf-8').read()

# Load duplicate IDs to remove
duplicate_ids_to_remove = {
    "favicon-generator",
    "robots-txt-builder",
    "og-tag-generator",
    "percentage-margin-calculator",
    "subnet-calculator",
    "sql-query-formatter-optimizer",
    "h1-h6-heading-hierarchy-tree",
    "diff-checker-text-comparison",
    "pdf-page-merger-splitter",
    "hash-generator-md5-sha-256",
    "http-headers-inspector",
    "ip-address-dns-lookup",
    "ssl-certificate-checker",
    "compound-interest-retirement-planner",
    "loan-mortgage-amortization-schedule",
    "bmi-body-fat-estimator",
    "utm-campaign-link-builder",
    "serp-snippet-preview-tool",
    "keyword-density-analyzer",
    "slug-generator",
    "character-word-counter-with-analytics",
    "kanban-task-board-localstorage",
    "pomodoro-focus-timer",
    "qr-code-generator-with-custom-styling",
    "image-compressor-png-jpeg-webp",
    "json-yaml-linter-formatter",
    "jwt-decoder-inspector",
    "cron-expression-generator",
}

# Read tool objects from toolsConfig.ts
# Split by `{` that starts a tool entry
parts = re.split(r'(?=\n  \{)', config_content)

header = parts[0]
tool_blocks = parts[1:]

cleaned_blocks = []
removed_count = 0

for block in tool_blocks:
    match = re.search(r'id:\s*"([^"]+)"', block)
    if match:
        tid = match.group(1)
        if tid in duplicate_ids_to_remove:
            removed_count += 1
            print(f"Removing duplicate tool: {tid}")
        else:
            cleaned_blocks.append(block)
    else:
        cleaned_blocks.append(block)

# Reconstruct file content
new_content = header + ''.join(cleaned_blocks)

# Fix trailing syntax / closing brackets
new_content = new_content.strip()
if new_content.endswith(','):
    new_content = new_content[:-1].strip()
if not new_content.endswith('];'):
    if new_content.endswith(']'):
        new_content = new_content + ';'
    else:
        new_content = new_content + '\n];\n'

with open(config_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print(f"\nRemoved {removed_count} duplicate tools from toolsConfig.ts successfully!")
