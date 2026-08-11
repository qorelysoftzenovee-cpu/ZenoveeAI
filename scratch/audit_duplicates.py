import json
import re

with open('scratch/all_129_tools.json', 'r', encoding='utf-8') as f:
    tools = json.load(f)

# Define redundant tool IDs to remove because an equivalent/better tool is already present
duplicate_ids_to_remove = {
    "favicon-generator",           # Duplicate of favicon-generator-ui
    "robots-txt-builder",          # Duplicate of robots-sitemap-builder
    "og-tag-generator",            # Duplicate of og-generator
    "percentage-margin-calculator",# Duplicate of percentage-calculator
    "subnet-calculator",           # Duplicate of cidr-calculator
    "sql-query-formatter-optimizer", # Duplicate of sql-formatter
    "h1-h6-heading-hierarchy-tree",# Duplicate of heading-hierarchy-tree
    "diff-checker-text-comparison",# Duplicate of text-diff-checker
    "pdf-page-merger-splitter",    # Duplicate of pdf-merger
    "hash-generator-md5-sha-256",  # Duplicate of file-hash
    "http-headers-inspector",      # Duplicate of header-inspector
    "ip-address-dns-lookup",       # Duplicate of ip-lookup
    "ssl-certificate-checker",     # Duplicate of ssl-checker
    "compound-interest-retirement-planner", # Duplicate of compound-interest
    "loan-mortgage-amortization-schedule",  # Duplicate of mortgage-amortization
    "bmi-body-fat-estimator",      # Duplicate of bmi-body-fat
    "utm-campaign-link-builder",   # Duplicate of utm-builder
    "serp-snippet-preview-tool",   # Duplicate of serp-simulator
    "keyword-density-analyzer",    # Duplicate of keyword-density
    "slug-generator",              # Duplicate of url-slug-generator
    "character-word-counter-with-analytics", # Duplicate of text-stats-counter
    "kanban-task-board-localstorage", # Duplicate of markdown-kanban
    "pomodoro-focus-timer",        # Duplicate of pomodoro-tracker
    "qr-code-generator-with-custom-styling", # Duplicate of qr-studio
    "image-compressor-png-jpeg-webp", # Duplicate of image-compressor
    "json-yaml-linter-formatter",   # Duplicate of json-formatter / yaml-to-json
    "jwt-decoder-inspector",        # Duplicate of jwt-decoder
    "cron-expression-generator",    # Duplicate of cron-humanizer
}

remaining_tools = [t for t in tools if t["id"] not in duplicate_ids_to_remove]

print("Original tool count:", len(tools))
print("Removed duplicate tool count:", len(duplicate_ids_to_remove))
print("Remaining clean unique tool count:", len(remaining_tools))

# Verify category counts for remaining tools
from collections import Counter
counts = Counter([t["category"] for t in remaining_tools])
print("\nCategory counts after removing duplicates:")
for cat, cnt in sorted(counts.items()):
    print(f"  '{cat}': {cnt} tools (>= 10: {cnt >= 10})")

with open('scratch/cleaned_unique_tools.json', 'w', encoding='utf-8') as f:
    json.dump(remaining_tools, f, indent=2)
