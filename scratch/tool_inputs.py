
# Comprehensive tool input definitions for all 77 new tools
# Each entry: id → new inputs block (TypeScript)

TOOL_INPUTS = {

"json-to-csv-converter": '''    inputs: [
      { id: "input_data", label: "JSON Array (paste your JSON here)", type: "textarea", placeholder: '[\\n  {"name":"Alice","age":30,"city":"London"},\\n  {"name":"Bob","age":25,"city":"New York"}\\n]' },
      { id: "mode", label: "Delimiter", type: "dropdown", options: ["Comma (,)", "Semicolon (;)", "Tab (\\\\t)", "Pipe (|)"] }
    ]''',

"html-to-markdown": '''    inputs: [
      { id: "input_data", label: "HTML Code to Convert", type: "textarea", placeholder: "<h1>Hello World</h1>\\n<p>This is a <strong>test</strong> paragraph.</p>\\n<ul><li>Item 1</li><li>Item 2</li></ul>" },
      { id: "mode", label: "Output Style", type: "dropdown", options: ["GitHub Flavored Markdown", "Standard Markdown", "Minimal (headings only)"] }
    ]''',

"xml-to-json": '''    inputs: [
      { id: "input_data", label: "XML Input", type: "textarea", placeholder: '<root>\\n  <user id="1">\\n    <name>Alice</name>\\n    <age>30</age>\\n  </user>\\n</root>' },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["Pretty (indented)", "Minified", "With attributes (@)"] }
    ]''',

"javascript-minifier": '''    inputs: [
      { id: "input_data", label: "JavaScript Code", type: "textarea", placeholder: "function greet(name) {\\n  const message = \\"Hello, \\" + name + \\"!\\";\\n  console.log(message);\\n  return message;\\n}" },
      { id: "mode", label: "Operation", type: "dropdown", options: ["Minify (compress)", "Beautify (format)", "Remove Comments Only"] }
    ]''',

"http-status-code-lookup": '''    inputs: [
      { id: "input_data", label: "HTTP Status Code (e.g. 404, 200, 500)", type: "text", placeholder: "404" },
      { id: "mode", label: "Show Category", type: "dropdown", options: ["Show All Details", "2xx Success Only", "4xx Client Errors", "5xx Server Errors"] }
    ]''',

"git-commit-message-gen": '''    inputs: [
      { id: "input_data", label: "Describe what you changed", type: "textarea", placeholder: "fixed the login button not working on mobile browsers" },
      { id: "mode", label: "Commit Type Override", type: "dropdown", options: ["Auto-detect", "feat (new feature)", "fix (bug fix)", "docs (documentation)", "style (formatting)", "refactor", "test", "chore"] }
    ]''',

"markdown-to-html": '''    inputs: [
      { id: "input_data", label: "Markdown Input", type: "textarea", placeholder: "# Hello World\\n\\nThis is **bold** and *italic* text.\\n\\n- Item 1\\n- Item 2\\n\\n[Link](https://example.com)" },
      { id: "mode", label: "Output Options", type: "dropdown", options: ["Full HTML with tags", "Fragment (no doctype)", "Include CSS styles"] }
    ]''',

"env-file-parser": '''    inputs: [
      { id: "input_data", label: "Paste your .env file contents", type: "textarea", placeholder: "DATABASE_URL=postgres://user:pass@localhost:5432/db\\nAPI_KEY=sk-abc123\\n# Comment line\\nDEBUG=true\\nEMPTY_VALUE=" },
      { id: "mode", label: "Check For", type: "dropdown", options: ["All Issues", "Duplicates Only", "Empty Values Only", "Security Risks"] }
    ]''',

"api-mock-generator": '''    inputs: [
      { id: "input_data", label: "Schema Type (user / product / order / custom)", type: "text", placeholder: "user" },
      { id: "mode", label: "Number of Records", type: "dropdown", options: ["3 records", "5 records", "10 records", "Custom JSON template"] }
    ]''',

"code-snippet-image": '''    inputs: [
      { id: "input_data", label: "Code to Snapshot", type: "textarea", placeholder: "const greet = (name) => `Hello, ${name}!`;\\nconsole.log(greet(\\"World\\"));" },
      { id: "mode", label: "Language / Theme", type: "dropdown", options: ["JavaScript — Dracula", "TypeScript — GitHub Light", "Python — One Dark", "CSS — Solarized", "Go — Nord"] }
    ]''',

"package-json-analyzer": '''    inputs: [
      { id: "input_data", label: "Paste package.json contents", type: "textarea", placeholder: '{"name":"my-app","version":"1.0.0","dependencies":{"react":"^18.0.0","lodash":"^4.17.21","moment":"^2.29.0"},"devDependencies":{"typescript":"^5.0.0"}}' },
      { id: "mode", label: "Analysis Focus", type: "dropdown", options: ["All Dependencies", "Production Only", "Dev Dependencies Only", "Find Heavy Packages"] }
    ]''',

"json-path-tester": '''    inputs: [
      { id: "input_data", label: "JSON Data", type: "textarea", placeholder: '{"store":{"books":[{"title":"Moby Dick","price":9.99},{"title":"War and Peace","price":14.99}],"name":"Book Store"}}' },
      { id: "mode", label: "JSONPath Query", type: "text", placeholder: "$.store.books[0].title" }
    ]''',

"curl-to-code": '''    inputs: [
      { id: "input_data", label: "cURL Command", type: "textarea", placeholder: "curl -X POST https://api.example.com/users -H 'Content-Type: application/json' -d '{\"name\":\"Alice\"}'" },
      { id: "mode", label: "Target Language", type: "dropdown", options: ["Python (requests)", "JavaScript (fetch)", "PHP (curl)", "Go (net/http)", "All Languages"] }
    ]''',

"color-palette-generator": '''    inputs: [
      { id: "input_data", label: "Seed Color (HEX)", type: "text", placeholder: "#3b82f6" },
      { id: "mode", label: "Palette Style", type: "dropdown", options: ["Complementary (2 colors)", "Analogous (3 colors)", "Triadic (3 colors)", "Full 5-color Palette", "Monochromatic shades"] }
    ]''',

"robots-txt-tester": '''    inputs: [
      { id: "input_data", label: "robots.txt Content", type: "textarea", placeholder: "User-agent: *\\nDisallow: /admin/\\nDisallow: /private/\\nAllow: /public/\\nSitemap: https://example.com/sitemap.xml" },
      { id: "mode", label: "URL to Test", type: "text", placeholder: "/admin/dashboard" }
    ]''',

"json-schema-validator": '''    inputs: [
      { id: "input_data", label: "JSON Data to Validate", type: "textarea", placeholder: '{"name": "Alice", "age": 30, "email": "alice@example.com"}' },
      { id: "mode", label: "Validation Mode", type: "dropdown", options: ["Structural Check", "Strict (no nulls/empty)", "Type Inference", "Generate Schema from JSON"] }
    ]''',

"sql-to-json": '''    inputs: [
      { id: "input_data", label: "SQL CREATE TABLE Statement", type: "textarea", placeholder: "CREATE TABLE users (\\n  id INT PRIMARY KEY,\\n  name VARCHAR(255) NOT NULL,\\n  email VARCHAR(255) UNIQUE,\\n  age INT,\\n  created_at TIMESTAMP\\n);" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["JSON Schema (Draft-07)", "TypeScript Interface", "OpenAPI Properties", "GraphQL Type"] }
    ]''',

"npm-package-size-checker": '''    inputs: [
      { id: "input_data", label: "NPM Package Name", type: "text", placeholder: "lodash" },
      { id: "mode", label: "Compare With", type: "dropdown", options: ["Show size only", "Compare: lodash vs lodash-es", "Compare: moment vs dayjs", "Compare: axios vs fetch"] }
    ]''',

"image-to-base64": '''    inputs: [
      { id: "input_data", label: "Or enter image URL to encode", type: "text", placeholder: "https://example.com/image.png (or upload a file above)" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["Data URI (base64)", "Base64 string only", "CSS background-image", "HTML <img> tag"] }
    ]''',

"text-to-speech": '''    inputs: [
      { id: "input_data", label: "Text to Speak", type: "textarea", placeholder: "Hello! Welcome to Zenovee, your ultimate free tool suite." },
      { id: "mode", label: "Voice / Speed", type: "dropdown", options: ["English US — Normal", "English UK — Normal", "English US — Slow", "English US — Fast", "Generate Browser Code"] }
    ]''',

"pdf-to-text": '''    inputs: [
      { id: "input_data", label: "Or paste PDF text content directly", type: "textarea", placeholder: "Paste extracted text here, or upload a PDF file above..." },
      { id: "mode", label: "Extraction Mode", type: "dropdown", options: ["Extract all text", "First page only", "Remove page numbers", "Clean whitespace"] }
    ]''',

"resume-ats-scanner": '''    inputs: [
      { id: "input_data", label: "Paste Your Resume Text", type: "textarea", placeholder: "John Doe\\nSoftware Engineer | john@email.com | +1-555-0100\\n\\nEXPERIENCE\\n- 3 years React & Node.js development\\n- Led team of 5 engineers\\n\\nSKILLS: JavaScript, Python, SQL, AWS\\n\\nEDUCATION\\nB.Sc Computer Science, 2020" },
      { id: "mode", label: "Target Job Type", type: "dropdown", options: ["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager", "General ATS Check"] }
    ]''',

"social-image-resizer": '''    inputs: [
      { id: "input_data", label: "Image URL or description", type: "text", placeholder: "https://example.com/my-photo.jpg" },
      { id: "mode", label: "Target Platform", type: "dropdown", options: ["Instagram Post (1080×1080)", "Instagram Story (1080×1920)", "Twitter Post (1200×675)", "LinkedIn Post (1200×627)", "Facebook Post (1200×630)", "YouTube Thumbnail (1280×720)", "TikTok (1080×1920)"] }
    ]''',

"word-cloud-generator": '''    inputs: [
      { id: "input_data", label: "Paste Text to Analyze", type: "textarea", placeholder: "developer tools free online web design coding programming javascript react python cloud computing software technology digital innovation" },
      { id: "mode", label: "Display Options", type: "dropdown", options: ["Top 30 words", "Top 50 words", "Top 20 words", "Remove common words (stop words)", "Show frequency table only"] }
    ]''',

"ascii-art-generator": '''    inputs: [
      { id: "input_data", label: "Text to Convert (max 8 characters)", type: "text", placeholder: "ZENOVEE" },
      { id: "mode", label: "Art Style", type: "dropdown", options: ["Block Capitals", "Simple ASCII", "Stars Pattern", "Box Border", "Banner Style"] }
    ]''',

"invoice-generator": '''    inputs: [
      { id: "input_data", label: "Client / Company Name", type: "text", placeholder: "Acme Corp" },
      { id: "mode", label: "Currency & Tax", type: "dropdown", options: ["USD — 10% Tax", "USD — No Tax", "EUR — 20% VAT", "GBP — 20% VAT", "INR — 18% GST", "Custom (no tax)"] }
    ]''',

"meme-generator": '''    inputs: [
      { id: "input_data", label: "Top Caption Text", type: "text", placeholder: "When the client says" },
      { id: "mode", label: "Bottom Caption / Template", type: "text", placeholder: '"just make it pop"' }
    ]''',

"timeline-maker": '''    inputs: [
      { id: "input_data", label: "Timeline Events (one per line, format: YEAR: Event)", type: "textarea", placeholder: "2020: Company Founded\\n2021: First Product Launch\\n2022: 10,000 Users Milestone\\n2023: Series A Funding\\n2024: International Expansion" },
      { id: "mode", label: "Timeline Style", type: "dropdown", options: ["Vertical Timeline", "Horizontal (table)", "Milestones only", "With descriptions"] }
    ]''',

"signature-generator": '''    inputs: [
      { id: "input_data", label: "Your Full Name", type: "text", placeholder: "John Doe" },
      { id: "mode", label: "Signature Style", type: "dropdown", options: ["Cursive (Unicode)", "Bold Print", "Minimal Initials", "All Three Styles"] }
    ]''',

"mind-map-builder": '''    inputs: [
      { id: "input_data", label: "Central Topic / Main Idea", type: "text", placeholder: "Product Launch Strategy" },
      { id: "mode", label: "Branch Template", type: "dropdown", options: ["Business Plan (Marketing, Sales, Dev, Ops, Finance)", "Study Notes (Introduction, Key Concepts, Examples, Summary)", "Project Plan (Goals, Tasks, Resources, Timeline, Risks)", "Custom (auto-generate branches)"] }
    ]''',

"thumbnail-generator": '''    inputs: [
      { id: "input_data", label: "Video Title or Content Idea", type: "text", placeholder: "10 Web Dev Tricks You NEED to Know in 2025" },
      { id: "mode", label: "Platform & Style", type: "dropdown", options: ["YouTube — Tech", "YouTube — Tutorial", "YouTube — Vlog", "TikTok Cover", "Instagram Reel Cover"] }
    ]''',

"photo-filters-editor": '''    inputs: [
      { id: "input_data", label: "Image URL (or upload above)", type: "text", placeholder: "https://example.com/photo.jpg" },
      { id: "mode", label: "Filter Preset", type: "dropdown", options: ["Vivid (bright & saturated)", "Vintage (warm sepia)", "B&W (grayscale)", "Cool (blue tone)", "Dramatic (high contrast)", "Soft (low contrast)", "Generate CSS code"] }
    ]''',

"color-picker-eyedropper": '''    inputs: [
      { id: "input_data", label: "Color Value (HEX, RGB, or HSL)", type: "text", placeholder: "#3b82f6  OR  rgb(59,130,246)  OR  hsl(217,91%,60%)" },
      { id: "mode", label: "Output Formats", type: "dropdown", options: ["All Formats (HEX + RGB + HSL)", "HEX only", "RGB only", "HSL only", "CSS Variables snippet"] }
    ]''',

"image-metadata-viewer": '''    inputs: [
      { id: "input_data", label: "Image URL to inspect", type: "text", placeholder: "https://example.com/photo.jpg (or upload above)" },
      { id: "mode", label: "Metadata Type", type: "dropdown", options: ["All Metadata (EXIF + IPTC)", "EXIF only (camera data)", "GPS Location", "File info only", "Privacy check (strip guide)"] }
    ]''',

"svg-to-png-converter": '''    inputs: [
      { id: "input_data", label: "SVG Code", type: "textarea", placeholder: '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">\\n  <circle cx="100" cy="100" r="80" fill="#3b82f6"/>\\n  <text x="100" y="110" text-anchor="middle" fill="white" font-size="40">Z</text>\\n</svg>' },
      { id: "mode", label: "Output Resolution", type: "dropdown", options: ["512×512 px", "256×256 px", "1024×1024 px", "1920×1080 px", "Custom size"] }
    ]''',

"speech-to-text": '''    inputs: [
      { id: "input_data", label: "Or paste audio transcript to clean up", type: "textarea", placeholder: "um so basically I wanted to talk about you know web development and like the tools that we use..." },
      { id: "mode", label: "Language / Mode", type: "dropdown", options: ["English US (en-US)", "English UK (en-GB)", "Hindi (hi-IN)", "Spanish (es-ES)", "French (fr-FR)", "Generate Browser Code"] }
    ]''',

"scientific-calculator": '''    inputs: [
      { id: "input_data", label: "Mathematical Expression", type: "text", placeholder: "sin(30) * cos(45) + log(100)" },
      { id: "mode", label: "Angle Unit", type: "dropdown", options: ["Degrees (°)", "Radians (rad)", "Gradians (grad)"] }
    ]''',

"fraction-calculator": '''    inputs: [
      { id: "input_data", label: "Fraction Expression", type: "text", placeholder: "3/4 + 1/3  (use +, -, *, /)" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["Simplified fraction + decimal", "Mixed number (e.g. 1 1/4)", "Decimal only", "Step-by-step working"] }
    ]''',

"date-duration-calculator": '''    inputs: [
      { id: "input_data", label: "Start Date (YYYY-MM-DD)", type: "text", placeholder: "2024-01-01" },
      { id: "mode", label: "End Date (YYYY-MM-DD)", type: "text", placeholder: "2024-12-31" }
    ]''',

"calorie-macro-calculator": '''    inputs: [
      { id: "input_data", label: "Body Weight (kg)", type: "text", placeholder: "70" },
      { id: "mode", label: "Fitness Goal", type: "dropdown", options: ["Maintenance (stay same weight)", "Fat Loss (cut calories)", "Muscle Gain (bulk)", "Aggressive Cut (-1000 kcal)", "Lean Bulk (+200 kcal)"] }
    ]''',

"pace-calculator": '''    inputs: [
      { id: "input_data", label: "Your Running Pace (minutes per km)", type: "text", placeholder: "5.5  (e.g. 5.5 = 5 min 30 sec per km)" },
      { id: "mode", label: "Race Distance", type: "dropdown", options: ["All races (5K, 10K, Half, Marathon)", "5K only", "10K only", "Half Marathon only", "Full Marathon only"] }
    ]''',

"blood-pressure-analyzer": '''    inputs: [
      { id: "input_data", label: "Blood Pressure Reading (Systolic/Diastolic)", type: "text", placeholder: "120/80" },
      { id: "mode", label: "Show Details", type: "dropdown", options: ["Full analysis + advice", "Classification only", "Compare to WHO ranges", "Track multiple readings"] }
    ]''',

"pregnancy-due-date": '''    inputs: [
      { id: "input_data", label: "Last Menstrual Period (LMP) Date (YYYY-MM-DD)", type: "text", placeholder: "2024-03-15" },
      { id: "mode", label: "Calendar Style", type: "dropdown", options: ["All milestones (full report)", "Due date only", "Week-by-week tracker", "Trimester overview"] }
    ]''',

"sleep-cycle-calculator": '''    inputs: [
      { id: "input_data", label: "Bedtime (HH:MM, 24-hour format)", type: "text", placeholder: "23:00" },
      { id: "mode", label: "Sleep Goal", type: "dropdown", options: ["Find optimal wake times", "7-9 hours target", "6 hours (minimum)", "Nap optimizer (20-90 min)", "Night shift worker"] }
    ]''',

"investment-return-calculator": '''    inputs: [
      { id: "input_data", label: "Initial Investment Amount ($)", type: "text", placeholder: "10000" },
      { id: "mode", label: "Final Value ($) or Return %", type: "text", placeholder: "15000  (or enter as: 50% return)" }
    ]''',

"currency-converter": '''    inputs: [
      { id: "input_data", label: "Amount to Convert", type: "text", placeholder: "100" },
      { id: "mode", label: "From Currency", type: "dropdown", options: ["USD (US Dollar)", "EUR (Euro)", "GBP (British Pound)", "INR (Indian Rupee)", "JPY (Japanese Yen)", "AED (UAE Dirham)", "SAR (Saudi Riyal)", "CAD (Canadian Dollar)", "AUD (Australian Dollar)"] }
    ]''',

"matrix-calculator": '''    inputs: [
      { id: "input_data", label: "Matrix A (rows separated by newlines, values by commas)", type: "textarea", placeholder: "1, 2\\n3, 4" },
      { id: "mode", label: "Operation", type: "dropdown", options: ["Multiply A × B", "Add A + B", "Subtract A - B", "Transpose A", "Determinant of A", "Inverse of A (2×2)"] }
    ]''',

"prime-number-checker": '''    inputs: [
      { id: "input_data", label: "Number to Check", type: "text", placeholder: "97" },
      { id: "mode", label: "Additional Options", type: "dropdown", options: ["Is it prime?", "List primes up to N", "Find next prime", "Factorize the number", "List first 50 primes"] }
    ]''',

"alcohol-unit-calculator": '''    inputs: [
      { id: "input_data", label: "Number of Drinks Consumed", type: "text", placeholder: "3" },
      { id: "mode", label: "Drink Type & Body Weight", type: "dropdown", options: ["Beer (330ml 5%) — 70kg", "Beer (500ml 5%) — 70kg", "Wine (175ml 13%) — 70kg", "Spirit (25ml 40%) — 70kg", "Beer — 60kg", "Beer — 80kg", "Beer — 90kg"] }
    ]''',

"hashtag-generator": '''    inputs: [
      { id: "input_data", label: "Topic, Keywords or Caption", type: "textarea", placeholder: "web development tutorial javascript react coding tips for beginners" },
      { id: "mode", label: "Platform & Count", type: "dropdown", options: ["Instagram — 30 hashtags", "TikTok — 10 hashtags", "Twitter/X — 5 hashtags", "LinkedIn — 8 hashtags", "All Platforms"] }
    ]''',

"social-bio-generator": '''    inputs: [
      { id: "input_data", label: "Your Role / Keywords / Niche", type: "textarea", placeholder: "Full-stack developer | JavaScript & React specialist | Building SaaS products | Open source contributor" },
      { id: "mode", label: "Target Platform", type: "dropdown", options: ["All Platforms", "Instagram Only", "Twitter/X Only", "LinkedIn Only", "TikTok Only"] }
    ]''',

"blog-title-generator": '''    inputs: [
      { id: "input_data", label: "Blog Topic or Main Keyword", type: "text", placeholder: "JavaScript performance optimization" },
      { id: "mode", label: "Content Format", type: "dropdown", options: ["Listicle (e.g. 10 tips...)", "How-to Guide", "Ultimate Guide", "Case Study", "Beginner Tutorial", "Expert Deep-Dive"] }
    ]''',

"cta-copywriter": '''    inputs: [
      { id: "input_data", label: "Product / Service Name", type: "text", placeholder: "free developer tool suite" },
      { id: "mode", label: "CTA Goal", type: "dropdown", options: ["Free Trial / Sign Up", "Buy Now / Purchase", "Learn More", "Download", "Book a Demo", "Get a Quote"] }
    ]''',

"email-subject-line-tester": '''    inputs: [
      { id: "input_data", label: "Email Subject Line to Test", type: "text", placeholder: "You need to see this deal before it expires tonight" },
      { id: "mode", label: "Email Type", type: "dropdown", options: ["Promotional / Sale", "Newsletter", "Cold Outreach", "Transactional", "Re-engagement"] }
    ]''',

"ab-test-calculator": '''    inputs: [
      { id: "input_data", label: "Control Conversion Rate (%)", type: "text", placeholder: "5" },
      { id: "mode", label: "Variant Conversion Rate (%)", type: "text", placeholder: "6.5" }
    ]''',

"competitor-keyword-analyzer": '''    inputs: [
      { id: "input_data", label: "Competitor Website URL", type: "text", placeholder: "https://competitor.com" },
      { id: "mode", label: "Analysis Type", type: "dropdown", options: ["Top keywords estimate", "Content gaps", "Site structure analysis", "Meta tags inspection", "Free tool recommendations"] }
    ]''',

"content-brief-generator": '''    inputs: [
      { id: "input_data", label: "Target Keyword / Topic", type: "text", placeholder: "best javascript frameworks 2025" },
      { id: "mode", label: "Content Type", type: "dropdown", options: ["Long-form Guide (2000+ words)", "Blog Post (1000 words)", "Product Review", "Landing Page Copy", "Social Media Caption"] }
    ]''',

"schema-markup-generator": '''    inputs: [
      { id: "input_data", label: "Schema Type (Article, FAQ, Product, Event, Recipe)", type: "text", placeholder: "Article" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["JSON-LD (recommended)", "Microdata", "RDFa", "Include in <head> tag example"] }
    ]''',

"link-in-bio-builder": '''    inputs: [
      { id: "input_data", label: "Your Name / Brand Name", type: "text", placeholder: "Alex Johnson" },
      { id: "mode", label: "Profile Style", type: "dropdown", options: ["Developer / Tech", "Creator / Influencer", "Business / Agency", "Artist / Musician", "E-commerce / Shop"] }
    ]''',

"affiliate-disclosure-generator": '''    inputs: [
      { id: "input_data", label: "Your Website / Blog Name", type: "text", placeholder: "TechReviews.com" },
      { id: "mode", label: "Affiliate Programs", type: "dropdown", options: ["Amazon Associates", "Multiple Programs (generic)", "ShareASale / CJ", "ClickBank", "Custom Program Name"] }
    ]''',

"newsletter-subject-analyzer": '''    inputs: [
      { id: "input_data", label: "Newsletter Subject Line", type: "text", placeholder: "This week: 3 tools every developer needs" },
      { id: "mode", label: "Newsletter Type", type: "dropdown", options: ["Weekly newsletter", "Product update", "Content roundup", "Promotional offer", "Personal/story-based"] }
    ]''',

"http-request-builder": '''    inputs: [
      { id: "input_data", label: "API Endpoint URL", type: "text", placeholder: "https://api.example.com/users" },
      { id: "mode", label: "HTTP Method", type: "dropdown", options: ["GET", "POST (with JSON body)", "PUT (update)", "DELETE", "PATCH", "HEAD", "OPTIONS"] }
    ]''',

"dns-record-checker": '''    inputs: [
      { id: "input_data", label: "Domain Name", type: "text", placeholder: "zenovee.in" },
      { id: "mode", label: "Record Type to Check", type: "dropdown", options: ["All Records (A, MX, TXT, CNAME, NS)", "A Record (IPv4)", "MX Records (Email)", "TXT Records (SPF/DKIM)", "CNAME Records", "NS Records (Name Servers)"] }
    ]''',

"web-page-speed-analyzer": '''    inputs: [
      { id: "input_data", label: "Website URL", type: "text", placeholder: "https://zenovee.in" },
      { id: "mode", label: "Test Type", type: "dropdown", options: ["Full performance audit", "Core Web Vitals only", "Mobile performance", "Desktop performance", "How to fix issues"] }
    ]''',

"json-api-formatter": '''    inputs: [
      { id: "input_data", label: "JSON API Response (paste here)", type: "textarea", placeholder: '{"id":1,"user":{"name":"Alice","email":"alice@example.com"},"items":[{"product":"Widget","qty":3,"price":9.99}],"total":29.97}' },
      { id: "mode", label: "Format Style", type: "dropdown", options: ["Pretty (2-space indent)", "Pretty (4-space indent)", "Minified", "Sorted keys", "Search for key..."] }
    ]''',

"csp-header-generator": '''    inputs: [
      { id: "input_data", label: "Your Website Domain", type: "text", placeholder: "https://zenovee.in" },
      { id: "mode", label: "Strictness Level", type: "dropdown", options: ["Strict (recommended)", "Moderate (allows inline scripts)", "Permissive (legacy apps)", "API Only (no browser UI)", "Custom builder"] }
    ]''',

"cors-policy-checker": '''    inputs: [
      { id: "input_data", label: "API URL to Analyze", type: "text", placeholder: "https://api.example.com/data" },
      { id: "mode", label: "Allowed Origin", type: "text", placeholder: "https://yourdomain.com" }
    ]''',

"firewall-rule-generator": '''    inputs: [
      { id: "input_data", label: "Port Number(s) to Allow (e.g. 443 or 80,443,8080)", type: "text", placeholder: "443" },
      { id: "mode", label: "Firewall Type", type: "dropdown", options: ["iptables (Linux)", "UFW (Ubuntu)", "Windows Firewall", "AWS Security Group rules", "Nginx deny rules"] }
    ]''',

"break-even-calculator": '''    inputs: [
      { id: "input_data", label: "Total Fixed Costs ($)", type: "text", placeholder: "10000" },
      { id: "mode", label: "Selling Price & Variable Cost", type: "dropdown", options: ["Price $50, Cost $20/unit", "Price $100, Cost $40/unit", "Price $25, Cost $10/unit", "Price $200, Cost $80/unit", "Custom values"] }
    ]''',

"stock-profit-calculator": '''    inputs: [
      { id: "input_data", label: "Number of Shares", type: "text", placeholder: "100" },
      { id: "mode", label: "Buy Price → Sell Price", type: "dropdown", options: ["$45.50 → $68.25 (50% gain)", "$100 → $150 (50% gain)", "$200 → $180 (10% loss)", "$50 → $75 (50% gain)", "Enter custom prices"] }
    ]''',

"option-payoff-calculator": '''    inputs: [
      { id: "input_data", label: "Strike Price ($)", type: "text", placeholder: "100" },
      { id: "mode", label: "Option Type & Premium", type: "dropdown", options: ["Call Option — $5 premium", "Put Option — $5 premium", "Call Option — $10 premium", "Put Option — $10 premium", "Covered Call"] }
    ]''',

"savings-goal-planner": '''    inputs: [
      { id: "input_data", label: "Savings Goal Amount ($)", type: "text", placeholder: "50000" },
      { id: "mode", label: "Target Timeframe", type: "dropdown", options: ["12 months", "24 months", "36 months", "5 years", "10 years"] }
    ]''',

"net-worth-calculator": '''    inputs: [
      { id: "input_data", label: "Total Assets ($) — include savings, investments, property", type: "text", placeholder: "115000" },
      { id: "mode", label: "Total Liabilities ($) — include loans, credit cards, mortgage", type: "text", placeholder: "23500" }
    ]''',

"crypto-profit-calculator": '''    inputs: [
      { id: "input_data", label: "Buy Price per Coin ($)", type: "text", placeholder: "30000" },
      { id: "mode", label: "Sell Price & Amount", type: "dropdown", options: ["Sell at $45,000 — 0.5 BTC", "Sell at $60,000 — 1 BTC", "Sell at $100,000 — 0.1 BTC", "Sell at $20,000 — 1 ETH", "Sell at $1 — 10,000 USDT"] }
    ]''',

"emergency-fund-calculator": '''    inputs: [
      { id: "input_data", label: "Monthly Expenses ($)", type: "text", placeholder: "3000" },
      { id: "mode", label: "Buffer Period Target", type: "dropdown", options: ["3 months (minimum)", "6 months (recommended)", "9 months (conservative)", "12 months (maximum security)", "Custom months"] }
    ]''',
}

print(f"Total tool input definitions: {len(TOOL_INPUTS)}")
print("All tool IDs defined:")
for i, k in enumerate(TOOL_INPUTS.keys(), 1):
    print(f"  {i:2d}. {k}")
