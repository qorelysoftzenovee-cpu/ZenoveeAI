import re

category_map = {
    # Developer & Tech Utilities (17 tools)
    "json-formatter": "Developer & Tech Utilities",
    "jwt-decoder": "Developer & Tech Utilities",
    "cron-humanizer": "Developer & Tech Utilities",
    "uuid-generator": "Developer & Tech Utilities",
    "url-encoder-decoder": "Developer & Tech Utilities",
    "color-code-converter": "Developer & Tech Utilities",
    "unix-timestamp-converter": "Developer & Tech Utilities",
    "html-entity-encoder": "Developer & Tech Utilities",
    "sql-formatter": "Developer & Tech Utilities",
    "text-diff-checker": "Developer & Tech Utilities",
    "text-stats-counter": "Developer & Tech Utilities",
    "url-slug-generator": "Developer & Tech Utilities",
    "htaccess-rule-builder": "Developer & Tech Utilities",
    "favicon-generator-ui": "Developer & Tech Utilities",
    "yaml-to-json": "Developer & Tech Utilities",
    "css-js-compressor": "Developer & Tech Utilities",
    "mime-inspector": "Developer & Tech Utilities",

    # Calculators & Mathematics (12 tools)
    "percentage-calculator": "Calculators & Mathematics",
    "bmi-body-fat": "Calculators & Mathematics",
    "age-date-difference": "Calculators & Mathematics",
    "gpa-calculator": "Calculators & Mathematics",
    "salary-to-hourly": "Calculators & Mathematics",
    "tip-bill-splitter": "Calculators & Mathematics",
    "discount-sales-tax": "Calculators & Mathematics",
    "fuel-cost-calculator": "Calculators & Mathematics",
    "random-number-gen": "Calculators & Mathematics",
    "multi-unit-converter": "Calculators & Mathematics",
    "live-currency-calculator": "Calculators & Mathematics",
    "file-hash": "Calculators & Mathematics",

    # Financial & Investment Engines (10 tools)
    "fire-calculator": "Financial & Investment Engines",
    "mortgage-amortization": "Financial & Investment Engines",
    "compound-interest": "Financial & Investment Engines",
    "freelance-rate": "Financial & Investment Engines",
    "saas-forecaster": "Financial & Investment Engines",
    "debt-planner": "Financial & Investment Engines",
    "portfolio-rebalance": "Financial & Investment Engines",
    "salary-tax": "Financial & Investment Engines",
    "inflation-calculator": "Financial & Investment Engines",
    "real-estate-analyzer": "Financial & Investment Engines",

    # Growth Marketing & SEO Suite (11 tools)
    "schema-builder": "Growth Marketing & SEO Suite",
    "utm-builder": "Growth Marketing & SEO Suite",
    "serp-simulator": "Growth Marketing & SEO Suite",
    "robots-sitemap-builder": "Growth Marketing & SEO Suite",
    "email-signature": "Growth Marketing & SEO Suite",
    "qr-studio": "Growth Marketing & SEO Suite",
    "keyword-density": "Growth Marketing & SEO Suite",
    "og-tag-generator": "Growth Marketing & SEO Suite",
    "robots-txt-builder": "Growth Marketing & SEO Suite",
    "og-generator": "Growth Marketing & SEO Suite",
    "code-beautifier": "Growth Marketing & SEO Suite",

    # Network & Server Utilities (10 tools)
    "ip-lookup": "Network & Server Utilities",
    "dns-propagation": "Network & Server Utilities",
    "ping-tester": "Network & Server Utilities",
    "cidr-calculator": "Network & Server Utilities",
    "header-inspector": "Network & Server Utilities",
    "ssl-checker": "Network & Server Utilities",
    "mac-vendor": "Network & Server Utilities",
    "speed-test": "Network & Server Utilities",
    "whois-lookup": "Network & Server Utilities",
    "screen-recorder": "Network & Server Utilities",

    # Media, Design & Productivity (10 tools)
    "image-compressor": "Media, Design & Productivity",
    "svg-editor": "Media, Design & Productivity",
    "batch-watermarker": "Media, Design & Productivity",
    "lottie-gif-extractor": "Media, Design & Productivity",
    "pdf-merger": "Media, Design & Productivity",
    "ocr-extractor": "Media, Design & Productivity",
    "pomodoro-tracker": "Media, Design & Productivity",
    "timezone-scheduler": "Media, Design & Productivity",
    "markdown-kanban": "Media, Design & Productivity",
    "voice-transcriber": "Media, Design & Productivity",
}

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

def replacer(match):
    full_block = match.group(0)
    tool_id = match.group(1)
    new_cat = category_map.get(tool_id)
    if new_cat:
        return re.sub(r'category:\s*"[^"]+"', f'category: "{new_cat}"', full_block)
    return full_block

# Replace category in each tool block
new_content = re.sub(r'\{\s*id:\s*"([^"]+)".*?category:\s*"[^"]+"', replacer, content, flags=re.DOTALL)

with open('src/utils/toolsConfig.ts', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updated toolsConfig.ts categories successfully!")
