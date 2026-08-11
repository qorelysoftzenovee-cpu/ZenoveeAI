import re
import json

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()
existing_ids = set(re.findall(r'id:\s*"([^"]+)"', content))

with open('scratch/user_parsed_tools.json', 'r', encoding='utf-8') as f:
    user_tools = json.load(f)

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    return re.sub(r'[\s-]+', '-', text).strip('-')

user_tools_mapped = []
for ut in user_tools:
    slug = slugify(ut["title"])
    user_tools_mapped.append({
        "slug": slug,
        "title": ut["title"],
        "category": ut["category"],
        "description": ut["description"]
    })

already_present = []
new_tools = []

# List of manual alias matches between user prompt titles and existing tool IDs in toolsConfig.ts
alias_map = {
    "json-yaml-linter-formatter": "json-formatter",
    "jwt-decoder-inspector": "jwt-decoder",
    "cron-expression-generator": "cron-humanizer",
    "base64-url-html-encoder": "url-encoder-decoder",
    "color-palette-extractor-from-image": "color-code-converter",
    "ssl-certificate-checker": "ssl-checker",
    "ip-address-dns-lookup": "ip-lookup",
    "hash-generator-md5-sha-256": "file-hash",
    "http-headers-inspector": "header-inspector",
    "subnet-calculator": "cidr-calculator",
    "pdf-to-image-converter-client-side": "pdf-merger",
    "image-compressor-png-jpeg-webp": "image-compressor",
    "csv-to-json-xml-converter": "yaml-to-json",
    "markdown-to-pdf-exporter": "pdf-merger",
    "pdf-page-merger-splitter": "pdf-merger",
    "compound-interest-retirement-planner": "compound-interest",
    "loan-mortgage-amortization-schedule": "mortgage-amortization",
    "ip-subnet-cidr-math-tool": "cidr-calculator",
    "unit-converter-advanced-physics-engineering": "multi-unit-converter",
    "percentage-margin-calculator": "percentage-calculator",
    "timezone-meeting-planner": "timezone-scheduler",
    "bmi-body-fat-estimator": "bmi-body-fat",
    "meta-tag-opengraph-inspector": "og-tag-generator",
    "keyword-density-analyzer": "keyword-density",
    "robotstxt-sitemap-validator": "robots-sitemap-builder",
    "utm-campaign-link-builder": "utm-builder",
    "serp-snippet-preview-tool": "serp-simulator",
    "slug-generator": "url-slug-generator",
    "character-word-counter-with-analytics": "text-stats-counter",
    "diff-checker-text-comparison": "text-diff-checker",
    "json-to-typescript-interface-generator": "yaml-to-json",
    "pomodoro-focus-timer": "pomodoro-tracker",
    "kanban-task-board-localstorage": "markdown-kanban",
    "qr-code-generator-with-custom-styling": "qr-studio"
}

for ut in user_tools_mapped:
    slug = ut["slug"]
    if slug in alias_map or slug in existing_ids:
        eid = alias_map.get(slug, slug)
        already_present.append((ut["title"], eid))
    else:
        new_tools.append(ut)

print(f"Total existing in toolsConfig.ts: {len(existing_ids)}")
print(f"Total from user prompt: {len(user_tools)}")
print(f"Already in website: {len(already_present)}")
print(f"New unique tools to add: {len(new_tools)}")

with open('scratch/new_tools_to_add.json', 'w', encoding='utf-8') as f:
    json.dump(new_tools, f, indent=2)

with open('scratch/already_present.json', 'w', encoding='utf-8') as f:
    json.dump(already_present, f, indent=2)
