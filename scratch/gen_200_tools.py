import re

# All current tool IDs
existing_ids = {
    "image-compressor","svg-editor","og-generator","code-beautifier","batch-watermarker",
    "lottie-gif-extractor","schema-builder","utm-builder","serp-simulator","robots-sitemap-builder",
    "email-signature","qr-studio","keyword-density","pdf-merger","ocr-extractor","pomodoro-tracker",
    "file-hash","screen-recorder","timezone-scheduler","markdown-kanban","voice-transcriber",
    "mime-inspector","fire-calculator","mortgage-amortization","compound-interest","freelance-rate",
    "saas-forecaster","debt-planner","portfolio-rebalance","salary-tax","inflation-calculator",
    "real-estate-analyzer","json-formatter","jwt-decoder","cron-humanizer","uuid-generator",
    "ip-lookup","dns-propagation","ping-tester","cidr-calculator","header-inspector","ssl-checker",
    "mac-vendor","speed-test","whois-lookup","url-encoder-decoder","color-code-converter",
    "unix-timestamp-converter","multi-unit-converter","live-currency-calculator","html-entity-encoder",
    "sql-formatter","text-diff-checker","text-stats-counter","url-slug-generator","percentage-calculator",
    "bmi-body-fat","age-date-difference","gpa-calculator","salary-to-hourly","tip-bill-splitter",
    "discount-sales-tax","fuel-cost-calculator","random-number-gen","htaccess-rule-builder",
    "favicon-generator-ui","yaml-to-json","css-js-compressor","regex-tester-visualizer",
    "api-testing-client-restgraphql","css-grid-flexbox-generator","svg-path-editor-optimizer",
    "markdown-live-preview-editor","contrast-checker-for-accessibility-wcag","css-glassmorphism-generator",
    "css-box-shadow-generator","gradient-mesh-creator","svg-wave-blob-generator","fluid-typography-calculator",
    "font-pairer-and-previewer","ui-skeleton-screen-generator","password-strength-entropy-analyzer",
    "cors-header-tester","port-checker-tool","url-redirect-trace-checker","data-breach-email-checker",
    "image-compressor-pngjpegwebp","heic-to-jpg-converter","audio-format-transcoder","exif-data-remover",
    "sprite-sheet-generator","video-to-gif-converter","crypto-unit-gas-fee-converter",
    "bandwidth-download-time-estimator","aspect-ratio-calculator","unit-converter-advanced-physicsengineering",
    "readability-score-calculator-flesch-kincaid","broken-link-checker-script","string-case-converter",
    "list-sorter-duplicate-remover","lorem-ipsum-dummy-data-generator","text-obfuscator-de-obfuscator",
    "csv-row-filter-query-tool","unicode-emoji-lookup-table","markdown-table-generator","text-extractor-line-cleaner",
    "markdown-sticky-notes","barcode-generator-upceancode128","random-picker-wheel-spinner","habit-tracker-grid",
    "meeting-cost-calculator","in-browser-stopwatch-lap-splitter","simple-markdown-resume-builder",
    "periodic-table-of-elements-inspector","resistor-color-code-calculator","ohms-law-calculator",
    "acoustic-frequency-tone-generator","pixel-to-rem-em-scaler","data-storage-unit-converter",
    "astronomical-date-julian-day-calculator","wind-chill-heat-index-calculator","concrete-volume-estimator",
    "gear-ratio-rpm-calculator"
}

# 77 NEW High-demand, viral tools across 6 categories
new_tools = [
    # Developer & Tech Utilities (20 new)
    {"id":"json-to-csv-converter","title":"JSON to CSV Converter","category":"Developer & Tech Utilities","description":"Instantly converts JSON arrays and objects into clean downloadable CSV spreadsheets in-browser."},
    {"id":"html-to-markdown","title":"HTML to Markdown Converter","category":"Developer & Tech Utilities","description":"Converts raw HTML markup into clean GitHub-flavored Markdown for documentation and blogs."},
    {"id":"xml-to-json","title":"XML to JSON Converter","category":"Developer & Tech Utilities","description":"Parses complex XML documents into structured JSON objects for API and data workflows."},
    {"id":"javascript-minifier","title":"JavaScript Minifier & Beautifier","category":"Developer & Tech Utilities","description":"Minifies or beautifies JavaScript code client-side for production optimization and readability."},
    {"id":"css-variable-extractor","title":"CSS Variable Extractor","category":"Developer & Tech Utilities","description":"Scans a CSS file and extracts all custom properties (--variables) into a clean design token list."},
    {"id":"http-status-code-lookup","title":"HTTP Status Code Explorer","category":"Developer & Tech Utilities","description":"Interactive reference for all HTTP status codes with descriptions, use cases, and examples."},
    {"id":"git-commit-message-gen","title":"Git Commit Message Generator","category":"Developer & Tech Utilities","description":"Generates professional, conventional commit messages from a brief description of your changes."},
    {"id":"markdown-to-html","title":"Markdown to HTML Converter","category":"Developer & Tech Utilities","description":"Converts Markdown text to production-ready, semantic HTML output with syntax highlighting."},
    {"id":"env-file-parser","title":".env File Parser & Formatter","category":"Developer & Tech Utilities","description":"Parses, validates, and formats .env files — detects duplicates, missing values, and syntax errors."},
    {"id":"api-mock-generator","title":"API Mock Data Generator","category":"Developer & Tech Utilities","description":"Generates realistic mock API JSON responses with user, product, and order schemas for testing."},
    {"id":"typescript-type-checker","title":"TypeScript Interface Validator","category":"Developer & Tech Utilities","description":"Validates JavaScript objects against TypeScript interface definitions and shows type mismatches."},
    {"id":"code-snippet-image","title":"Code Snippet to Image","category":"Developer & Tech Utilities","description":"Converts code blocks into beautiful, shareable PNG images with syntax highlighting themes."},
    {"id":"package-json-analyzer","title":"package.json Analyzer","category":"Developer & Tech Utilities","description":"Analyzes package.json to identify outdated, duplicate, or unused dependencies in your project."},
    {"id":"json-path-tester","title":"JSONPath & JQ Query Tester","category":"Developer & Tech Utilities","description":"Tests JSONPath expressions and jq-style queries against live JSON data with highlighted results."},
    {"id":"sql-to-json","title":"SQL to JSON Schema Generator","category":"Developer & Tech Utilities","description":"Converts SQL CREATE TABLE statements into JSON Schema definitions for API documentation."},
    {"id":"curl-to-code","title":"cURL Command to Code Converter","category":"Developer & Tech Utilities","description":"Converts cURL commands into equivalent Python, JavaScript, PHP, and Go HTTP request code."},
    {"id":"color-palette-generator","title":"AI Color Palette Generator","category":"Developer & Tech Utilities","description":"Generates harmonious 5-color palettes from a seed color using color theory and HSL math."},
    {"id":"npm-package-size-checker","title":"NPM Package Size Checker","category":"Developer & Tech Utilities","description":"Estimates the bundle size impact of any npm package before adding it to your project."},
    {"id":"robots-txt-tester","title":"Robots.txt Rule Tester","category":"Developer & Tech Utilities","description":"Tests if a specific URL is allowed or blocked by robots.txt rules for common search engine bots."},
    {"id":"json-schema-validator","title":"JSON Schema Validator","category":"Developer & Tech Utilities","description":"Validates JSON data against a JSON Schema definition and reports all validation errors clearly."},

    # Media, Design & Productivity (18 new)
    {"id":"image-to-base64","title":"Image to Base64 Encoder","category":"Media, Design & Productivity","description":"Converts uploaded images to Base64 data URIs for embedding in HTML, CSS, and JSON payloads."},
    {"id":"svg-to-png-converter","title":"SVG to PNG Converter","category":"Media, Design & Productivity","description":"Renders SVG vector files into high-resolution PNG images at any custom pixel size."},
    {"id":"image-metadata-viewer","title":"Image Metadata Viewer","category":"Media, Design & Productivity","description":"Extracts and displays all EXIF, IPTC, and XMP metadata embedded in JPEG, PNG, and TIFF files."},
    {"id":"color-picker-eyedropper","title":"Color Picker & Eyedropper","category":"Media, Design & Productivity","description":"Upload any image and click to extract exact hex, RGB, and HSL color values from any pixel."},
    {"id":"photo-filters-editor","title":"Photo Filter & Enhancement Editor","category":"Media, Design & Productivity","description":"Applies brightness, contrast, saturation, blur, and sepia filters to images entirely client-side."},
    {"id":"text-to-speech","title":"Text to Speech Converter","category":"Media, Design & Productivity","description":"Converts typed text to spoken audio using browser Web Speech API with voice and speed controls."},
    {"id":"speech-to-text","title":"Speech to Text Transcriber","category":"Media, Design & Productivity","description":"Records microphone audio and transcribes it to text live using the Web Speech Recognition API."},
    {"id":"pdf-to-text","title":"PDF Text Extractor","category":"Media, Design & Productivity","description":"Extracts all text content from uploaded PDF documents for editing or data processing locally."},
    {"id":"resume-ats-scanner","title":"Resume ATS Score Checker","category":"Media, Design & Productivity","description":"Analyzes a resume for ATS compatibility, keyword density, and formatting issues with a score."},
    {"id":"social-image-resizer","title":"Social Media Image Resizer","category":"Media, Design & Productivity","description":"Resizes and crops images to exact dimensions for Instagram, Twitter, LinkedIn, and Facebook."},
    {"id":"thumbnail-generator","title":"YouTube Thumbnail Generator","category":"Media, Design & Productivity","description":"Creates professional YouTube thumbnail layouts with text overlays and branded color schemes."},
    {"id":"word-cloud-generator","title":"Word Cloud Generator","category":"Media, Design & Productivity","description":"Generates a visual word cloud from pasted text with customizable colors, fonts, and layouts."},
    {"id":"meme-generator","title":"Meme Generator","category":"Media, Design & Productivity","description":"Creates memes by adding top and bottom caption text over popular template images instantly."},
    {"id":"ascii-art-generator","title":"ASCII Art Generator","category":"Media, Design & Productivity","description":"Converts images or typed text into beautiful ASCII art patterns for terminal and text displays."},
    {"id":"timeline-maker","title":"Visual Timeline Maker","category":"Media, Design & Productivity","description":"Creates clean, shareable project or historical timelines exportable as PNG from browser."},
    {"id":"invoice-generator","title":"Free Invoice Generator","category":"Media, Design & Productivity","description":"Creates professional, printable PDF invoices with custom branding, line items, and tax calculations."},
    {"id":"mind-map-builder","title":"Mind Map Builder","category":"Media, Design & Productivity","description":"Drag-and-drop mind mapping tool that saves to localStorage and exports as PNG or JSON."},
    {"id":"signature-generator","title":"Digital Signature Generator","category":"Media, Design & Productivity","description":"Draw or type a custom signature and download it as a transparent PNG for document signing."},

    # Calculators & Mathematics (13 new)
    {"id":"scientific-calculator","title":"Scientific Calculator","category":"Calculators & Mathematics","description":"Full-featured scientific calculator with trigonometry, logarithms, and memory functions."},
    {"id":"fraction-calculator","title":"Fraction & Mixed Number Calculator","category":"Calculators & Mathematics","description":"Adds, subtracts, multiplies, and divides fractions with step-by-step working shown."},
    {"id":"matrix-calculator","title":"Matrix Calculator","category":"Calculators & Mathematics","description":"Performs matrix addition, multiplication, transposition, and determinant calculations."},
    {"id":"prime-number-checker","title":"Prime Number Checker & Generator","category":"Calculators & Mathematics","description":"Checks if any number is prime and generates prime lists using the Sieve of Eratosthenes."},
    {"id":"date-duration-calculator","title":"Date Duration & Working Days Calculator","category":"Calculators & Mathematics","description":"Calculates exact calendar days, weeks, months, and business days between two dates."},
    {"id":"calorie-macro-calculator","title":"Calorie & Macro Calculator","category":"Calculators & Mathematics","description":"Computes daily calorie needs (TDEE) and macro splits based on weight, height, age, and goal."},
    {"id":"pace-calculator","title":"Running Pace & Race Time Calculator","category":"Calculators & Mathematics","description":"Calculates running pace, finish time, and distance for races from 5K to marathons."},
    {"id":"blood-pressure-analyzer","title":"Blood Pressure Analyzer","category":"Calculators & Mathematics","description":"Categorizes blood pressure readings and provides health guidance based on WHO guidelines."},
    {"id":"alcohol-unit-calculator","title":"Alcohol Unit & BAC Calculator","category":"Calculators & Mathematics","description":"Estimates blood alcohol content (BAC) based on drinks consumed, body weight, and time."},
    {"id":"pregnancy-due-date","title":"Pregnancy Due Date Calculator","category":"Calculators & Mathematics","description":"Calculates estimated due date, trimester milestones, and weekly progression from LMP date."},
    {"id":"sleep-cycle-calculator","title":"Sleep Cycle Calculator","category":"Calculators & Mathematics","description":"Calculates optimal wake-up times based on sleep cycles to minimize grogginess."},
    {"id":"investment-return-calculator","title":"ROI & Investment Return Calculator","category":"Calculators & Mathematics","description":"Calculates ROI percentage, annualized return, and profit/loss for any investment period."},
    {"id":"currency-converter","title":"Multi-Currency Converter","category":"Calculators & Mathematics","description":"Converts between 150+ world currencies using up-to-date exchange rate tables instantly."},

    # Growth Marketing & SEO Suite (12 new)
    {"id":"hashtag-generator","title":"Hashtag Generator for Instagram/TikTok","category":"Growth Marketing & SEO Suite","description":"Generates viral, niche-relevant hashtag sets for Instagram, TikTok, and Twitter posts."},
    {"id":"social-bio-generator","title":"Social Media Bio Generator","category":"Growth Marketing & SEO Suite","description":"Creates punchy, optimized bios for Instagram, Twitter, TikTok, and LinkedIn profiles."},
    {"id":"blog-title-generator","title":"Blog Post Title Generator","category":"Growth Marketing & SEO Suite","description":"Generates SEO-optimized, click-worthy blog titles from a topic keyword using proven formulas."},
    {"id":"cta-copywriter","title":"Call-to-Action Copywriter","category":"Growth Marketing & SEO Suite","description":"Generates high-converting CTA button text and banner copy for landing pages and ads."},
    {"id":"email-subject-line-tester","title":"Email Subject Line Tester","category":"Growth Marketing & SEO Suite","description":"Scores email subject lines for open rate potential using spam analysis and emotional triggers."},
    {"id":"ab-test-calculator","title":"A/B Test Significance Calculator","category":"Growth Marketing & SEO Suite","description":"Calculates statistical significance of A/B tests and declares a winner with confidence levels."},
    {"id":"competitor-keyword-analyzer","title":"Competitor Keyword Analyzer","category":"Growth Marketing & SEO Suite","description":"Extracts and analyzes keyword density and meta tags from any competitor URL for SEO insights."},
    {"id":"content-brief-generator","title":"SEO Content Brief Generator","category":"Growth Marketing & SEO Suite","description":"Creates detailed SEO content briefs with H2/H3 outlines, word count targets, and keyword usage."},
    {"id":"schema-markup-generator","title":"Schema Markup Generator (JSON-LD)","category":"Growth Marketing & SEO Suite","description":"Generates Google-compliant JSON-LD schema markup for articles, products, FAQs, and events."},
    {"id":"link-in-bio-builder","title":"Link-in-Bio Page Builder","category":"Growth Marketing & SEO Suite","description":"Creates a beautiful, mobile-first link-in-bio page with customizable buttons and themes."},
    {"id":"affiliate-disclosure-generator","title":"Affiliate Disclosure Generator","category":"Growth Marketing & SEO Suite","description":"Generates FTC-compliant affiliate disclosure statements for blogs and review websites."},
    {"id":"newsletter-subject-analyzer","title":"Newsletter Open Rate Optimizer","category":"Growth Marketing & SEO Suite","description":"Analyzes newsletter subject lines for curiosity gaps, length, and power word density scores."},

    # Network & Server Utilities (7 new)
    {"id":"http-request-builder","title":"HTTP Request Builder & Sender","category":"Network & Server Utilities","description":"Constructs and sends GET, POST, PUT, DELETE requests with custom headers and JSON body."},
    {"id":"dns-record-checker","title":"DNS Record Checker (A, MX, TXT, CNAME)","category":"Network & Server Utilities","description":"Looks up all DNS record types for any domain and shows propagation status globally."},
    {"id":"web-page-speed-analyzer","title":"Web Page Load Speed Analyzer","category":"Network & Server Utilities","description":"Measures page load time, resource sizes, and identifies performance bottlenecks for any URL."},
    {"id":"json-api-formatter","title":"JSON API Response Formatter","category":"Network & Server Utilities","description":"Fetches a JSON API endpoint and displays the response formatted, highlighted, and searchable."},
    {"id":"csp-header-generator","title":"Content Security Policy Generator","category":"Network & Server Utilities","description":"Generates strict Content-Security-Policy headers with directives for scripts, styles, and media."},
    {"id":"cors-policy-checker","title":"CORS Policy Analyzer","category":"Network & Server Utilities","description":"Analyzes CORS headers from any URL and validates cross-origin resource sharing configuration."},
    {"id":"firewall-rule-generator","title":"Firewall Rule Generator (iptables/UFW)","category":"Network & Server Utilities","description":"Generates ready-to-use iptables or UFW firewall rules from simple allow/deny configuration UI."},

    # Financial & Investment Engines (7 new)
    {"id":"break-even-calculator","title":"Break-Even Analysis Calculator","category":"Financial & Investment Engines","description":"Calculates units needed to break even based on fixed costs, variable costs, and selling price."},
    {"id":"stock-profit-calculator","title":"Stock Profit & Loss Calculator","category":"Financial & Investment Engines","description":"Computes profit, loss, percentage gain, and brokerage cost for stock trades in any currency."},
    {"id":"option-payoff-calculator","title":"Options Payoff Calculator","category":"Financial & Investment Engines","description":"Visualizes profit/loss payoff diagrams for call and put options at various expiry price points."},
    {"id":"savings-goal-planner","title":"Savings Goal Planner","category":"Financial & Investment Engines","description":"Calculates monthly savings required to reach a financial goal by a target date with interest."},
    {"id":"net-worth-calculator","title":"Net Worth Calculator","category":"Financial & Investment Engines","description":"Totals assets and liabilities to compute personal net worth with categorized breakdown charts."},
    {"id":"crypto-profit-calculator","title":"Crypto Profit & Loss Calculator","category":"Financial & Investment Engines","description":"Calculates cryptocurrency investment gains, losses, and ROI from entry price to current price."},
    {"id":"emergency-fund-calculator","title":"Emergency Fund Calculator","category":"Financial & Investment Engines","description":"Calculates ideal emergency fund size based on monthly expenses and recommended buffer months."},
]

# Verify no duplicates with existing
for tool in new_tools:
    if tool["id"] in existing_ids:
        print(f"CONFLICT: {tool['id']}")

# Check for duplicates within new_tools
new_ids = [t["id"] for t in new_tools]
dups = [x for x in set(new_ids) if new_ids.count(x) > 1]
if dups:
    print(f"INTERNAL DUPLICATES: {dups}")
else:
    print(f"No duplicates found!")
    print(f"New tools to add: {len(new_tools)}")
    print(f"Total after addition: {123 + len(new_tools)}")

# Generate TypeScript entries
def slugify(text):
    import re
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    return re.sub(r'[\s-]+', '-', text).strip('-')

ts_entries = []
for tool in new_tools:
    title = tool["title"].replace('"', '\\"').replace("'", "\\'")
    desc = tool["description"].replace('"', '\\"').replace("'", "\\'")
    entry = f'''  {{
    id: "{tool["id"]}",
    title: "{title}",
    category: "{tool["category"]}",
    description: "{desc}",
    inputs: [
      {{
        id: "input_data",
        label: "Input Data / Parameters",
        type: "textarea",
        placeholder: "Enter your data, URL, text, or configuration here..."
      }},
      {{
        id: "mode",
        label: "Mode / Options",
        type: "dropdown",
        options: ["Standard Mode", "Advanced Mode", "Export Output"]
      }}
    ]
  }}'''
    ts_entries.append(entry)

generated = ",\n".join(ts_entries)
with open('scratch/new_77_tools.txt', 'w', encoding='utf-8') as f:
    f.write(generated)

print("Generated TypeScript entries saved to scratch/new_77_tools.txt")
