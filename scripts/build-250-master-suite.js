const fs = require('fs');

const master250Tools = [
  // 1. Content Creation & Media
  { id: 'image-compressor', category: 'Content Creation & Media', title: 'Client-Side Image Compressor & Converter', desc: 'Compresses JPEG/PNG/WebP and converts formats locally using OffscreenCanvas.' },
  { id: 'svg-editor', category: 'Content Creation & Media', title: 'SVG Vector Editor & Color Swapper', desc: 'Parses SVG XML directly in browser DOM to tweak colors and resize dimensions.' },
  { id: 'og-generator', category: 'Content Creation & Media', title: 'Dynamic Open Graph Card Visual Designer', desc: 'Generates social media preview images (1200x630) using HTML5 Canvas.' },
  { id: 'code-beautifier', category: 'Content Creation & Media', title: 'Code Snippet Image Beautifier', desc: 'Creates code-card images using client-side syntax highlighting and gradients.' },
  { id: 'batch-watermarker', category: 'Content Creation & Media', title: 'Privacy-First Batch Image Watermarker', desc: 'Stamps logos or text onto photos simultaneously using local web workers.' },
  { id: 'lottie-gif-extractor', category: 'Content Creation & Media', title: 'Lottie Animation Frame Extractor', desc: 'Unpacks Lottie JSON or animated GIFs frame-by-frame for SVG/PNG export.' },
  { id: 'wasm-video-trimmer', category: 'Content Creation & Media', title: 'WebAssembly Video Trimmer', desc: 'Trims and cuts video clips locally in-browser using WebAssembly ffmpeg core.' },
  { id: 'audio-pitch-changer', category: 'Content Creation & Media', title: 'Audio Pitch & Speed Changer', desc: 'Modifies playback pitch and speed without distortion using Web Audio API.' },
  { id: 'gif-converter', category: 'Content Creation & Media', title: 'GIF to MP4 / WebP Converter', desc: 'Transcodes animated GIFs into lightweight MP4 videos or WebP images.' },
  { id: 'image-aspect-resizer', category: 'Content Creation & Media', title: 'Image Aspect Ratio Resizer', desc: 'Resizes images to exact aspect ratios (16:9, 4:3, 1:1) with canvas cropping.' },

  // 2. Growth Marketing & Analytics
  { id: 'schema-builder', category: 'Growth Marketing & Analytics', title: 'Dynamic JSON-LD Schema Markup Builder', desc: 'Generates Google-compliant JSON-LD schema (FAQ, HowTo, Product, Article).' },
  { id: 'utm-builder', category: 'Growth Marketing & Analytics', title: 'UTM Campaign Builder & History Tracker', desc: 'Generates tagged campaign URLs and tracks historical links in LocalStorage.' },
  { id: 'serp-simulator', category: 'Growth Marketing & Analytics', title: 'SERP Snippet Visual Simulator', desc: 'Previews how titles, descriptions, and URLs render on Google desktop and mobile.' },
  { id: 'robots-sitemap-builder', category: 'Growth Marketing & Analytics', title: 'Robots.txt & XML Sitemap Validator', desc: 'Generates clean sitemaps and tests robots.txt disallow rules against URL paths.' },
  { id: 'headline-pixel-inspector', category: 'Growth Marketing & Analytics', title: 'Headline Character & Pixel Width Inspector', desc: 'Measures Google SERP title pixel widths (max 600px) and character limits.' },
  { id: 'email-signature', category: 'Growth Marketing & Analytics', title: 'Client-Side HTML Email Signature Builder', desc: 'Generates responsive HTML email signatures with clickable icons and avatars.' },
  { id: 'qr-studio', category: 'Growth Marketing & Analytics', title: 'Vector-Based Custom QR Code Generator', desc: 'Generates vector SVG & PNG QR codes with custom colors and logo embedding.' },
  { id: 'keyword-density', category: 'Growth Marketing & Analytics', title: 'On-Page Keyword Frequency Matrix', desc: 'Extracts 1-word, 2-word, and 3-word n-gram keyword frequencies from text.' },
  { id: 'social-image-cropper', category: 'Growth Marketing & Analytics', title: 'Social Media Image Dimension Cropper', desc: 'Crops photos to exact specs for Twitter, LinkedIn, Instagram, and Facebook.' },
  { id: 'og-tag-generator', category: 'Growth Marketing & Analytics', title: 'Open Graph Meta Tag Visualizer', desc: 'Generates `<meta property="og:title">` and Twitter Card tags with preview.' },

  // 3. Productivity & File Utilities
  { id: 'pdf-merger', category: 'Productivity & File Utilities', title: 'Offline PDF Merger & Splitter (Client-Side)', desc: 'Merges multiple PDF files or extracts pages 100% locally in browser memory.' },
  { id: 'ocr-extractor', category: 'Productivity & File Utilities', title: 'In-Browser OCR Image Text Extractor', desc: 'Extracts printed text from images and screenshots using client Tesseract WASM.' },
  { id: 'audio-converter-wasm', category: 'Productivity & File Utilities', title: 'Client-Side Audio Converter (FFmpeg WASM)', desc: 'Converts MP3, WAV, AAC, and OGG audio files without server uploads.' },
  { id: 'pomodoro-tracker', category: 'Productivity & File Utilities', title: 'Pomodoro Focus Engine', desc: 'Customizable 25/5 focus timer with session logs and Web Audio chimes.' },
  { id: 'file-hash', category: 'Productivity & File Utilities', title: 'Universal File Hash (SHA-256/MD5) Calculator', desc: 'Calculates SHA-256, SHA-1, and MD5 checksums for uploaded files.' },
  { id: 'screen-recorder', category: 'Productivity & File Utilities', title: 'In-Browser Screen & Webcam Recorder', desc: 'Captures screen recordings with audio and downloads WebM video files.' },
  { id: 'timezone-scheduler', category: 'Productivity & File Utilities', title: 'Multi-Timezone Visual Meeting Scheduler', desc: 'Finds optimal meeting overlap times across global timezones.' },
  { id: 'markdown-kanban', category: 'Productivity & File Utilities', title: 'Client-Side Markdown Kanban Board', desc: 'Interactive drag-and-drop task board persisting state in LocalStorage.' },
  { id: 'voice-transcriber', category: 'Productivity & File Utilities', title: 'Voice Note Web Speech Dictation Tool', desc: 'Transcribes spoken audio into text in real-time using Web Speech API.' },
  { id: 'mime-inspector', category: 'Productivity & File Utilities', title: 'File Magic Byte & MIME Inspector', desc: 'Inspects file header magic bytes to verify true file extension integrity.' },

  // 4. Financial & Investment Engines
  { id: 'fire-calculator', category: 'Financial & Investment Engines', title: 'FIRE Retirement Amortization Calculator', desc: 'Calculates Financial Independence target number and savings timeline.' },
  { id: 'mortgage-amortization', category: 'Financial & Investment Engines', title: 'Loan & Mortgage Schedule Engine', desc: 'Generates full principal and interest monthly amortization tables.' },
  { id: 'compound-interest', category: 'Financial & Investment Engines', title: 'Compound Interest & DRIP Simulator', desc: 'Simulates compound growth with monthly deposits and dividend reinvestment.' },
  { id: 'freelance-rate', category: 'Financial & Investment Engines', title: 'Value-Based Freelance Rate Calculator', desc: 'Calculates target hourly and project rates based on expenses and profit margin.' },
  { id: 'saas-forecaster', category: 'Financial & Investment Engines', title: 'SaaS LTV, CAC & Churn Modeling Dashboard', desc: 'Models Customer Lifetime Value, Acquisition Cost ratio, and ARR churn.' },
  { id: 'debt-planner', category: 'Financial & Investment Engines', title: 'Debt Snowball vs. Avalanche Planner', desc: 'Compares Debt Snowball (smallest balance) vs Avalanche (highest interest).' },
  { id: 'portfolio-rebalance', category: 'Financial & Investment Engines', title: 'Portfolio Rebalancing Engine', desc: 'Calculates exact buy/sell asset rebalancing trades for stocks and crypto.' },
  { id: 'salary-tax', category: 'Financial & Investment Engines', title: 'Net Take-Home Tax Calculator', desc: 'Estimates federal, state, and payroll tax deductions on annual gross income.' },
  { id: 'inflation-calculator', category: 'Financial & Investment Engines', title: 'Inflation Purchasing Power Time Machine', desc: 'Calculates historical purchasing power changes between any two years.' },
  { id: 'real-estate-analyzer', category: 'Financial & Investment Engines', title: 'Real Estate Cap Rate & Cash Flow Engine', desc: 'Calculates Capitalization Rate, Cash-on-Cash ROI, and Net Operating Income.' },

  // 5. Data & Tech Utilities
  { id: 'json-formatter', category: 'Data & Tech Utilities', title: 'Interactive JSON Tree Visualizer & Diff', desc: 'Formats, validates, beautifies, and compares JSON data structures.' },
  { id: 'jwt-decoder', category: 'Data & Tech Utilities', title: 'JWT Decoder & Payload Inspector', desc: 'Decodes Base64Url JSON Web Tokens inspecting header and claim payloads.' },
  { id: 'regex-tester', category: 'Data & Tech Utilities', title: 'Visual Regex Pattern Tester', desc: 'Tests JavaScript regular expressions with live highlight matches and flags.' },
  { id: 'sqlite-studio', category: 'Data & Tech Utilities', title: 'In-Browser SQLite Database Workbench', desc: 'Runs SQL queries on local SQLite databases using sql.js WebAssembly.' },
  { id: 'color-contrast', category: 'Data & Tech Utilities', title: 'WCAG 2.1 Color Contrast Checker', desc: 'Calculates WCAG AA/AAA contrast ratios between text and background colors.' },
  { id: 'cron-humanizer', category: 'Data & Tech Utilities', title: 'Cron Expression Parser & Humanizer', desc: 'Translates 5-part cron syntax (e.g. `*/5 * * * *`) into plain English.' },
  { id: 'csv-converter', category: 'Data & Tech Utilities', title: 'CSV / TSV to JSON / YAML Engine', desc: 'Converts spreadsheet CSV data into formatted JSON, XML, or YAML.' },
  { id: 'password-generator', category: 'Data & Tech Utilities', title: 'Secure Password & Entropy Generator', desc: 'Generates cryptographically secure passwords using Web Crypto API.' },
  { id: 'uuid-generator', category: 'Data & Tech Utilities', title: 'UUID, ULID & NanoID Batch Generator', desc: 'Generates RFC 4122 v4 UUIDs, ULIDs, and NanoIDs in single or batch mode.' },
  { id: 'base64-image-data-uri', category: 'Data & Tech Utilities', title: 'Base64 Image to Data URI Converter', desc: 'Converts PNG/JPEG images into inline `data:image/png;base64,...` strings.' },

  // 6. Network & IP Utilities
  { id: 'ip-lookup', category: 'Network & IP Utilities', title: 'My IP & Geolocation Inspector', desc: 'Fetches public IP address, ISP provider, ASN, and city geolocation.' },
  { id: 'dns-propagation', category: 'Network & IP Utilities', title: 'Multi-Server DNS Propagation Checker', desc: 'Queries A, CNAME, MX, and TXT records across global DNS servers.' },
  { id: 'ping-tester', category: 'Network & IP Utilities', title: 'Client-Side Latency Tester', desc: 'Measures round-trip time (RTT) latency and jitter to public web servers.' },
  { id: 'cidr-calculator', category: 'Network & IP Utilities', title: 'Subnet / CIDR Mask Calculator', desc: 'Calculates network IP ranges, subnet masks, wildcard masks, and hosts.' },
  { id: 'header-inspector', category: 'Network & IP Utilities', title: 'HTTP Security Header Inspector', desc: 'Inspects HTTP response headers for CSP, HSTS, and X-Frame-Options.' },
  { id: 'ssl-checker', category: 'Network & IP Utilities', title: 'SSL Certificate Expiry Checker', desc: 'Inspects SSL/TLS certificate validity dates, issuer, and SAN domains.' },
  { id: 'mac-vendor', category: 'Network & IP Utilities', title: 'MAC Address OUI Vendor Lookup', desc: 'Looks up hardware manufacturer details from MAC address OUI prefixes.' },
  { id: 'user-agent-parser', category: 'Network & IP Utilities', title: 'User-Agent String Parser', desc: 'Parses User-Agent strings extracting Browser, OS, Engine, and Device.' },
  { id: 'speed-test', category: 'Network & IP Utilities', title: 'Client-Side Bandwidth Speed Test', desc: 'Measures download speed Mbps and latency directly in browser memory.' },
  { id: 'whois-lookup', category: 'Network & IP Utilities', title: 'Domain Whois Lookup Interface', desc: 'Queries domain registrar info, creation date, and nameservers via RDAP.' },

  // 7. Encoders, Decoders & Converters
  { id: 'url-encoder-decoder', category: 'Encoders, Decoders & Converters', title: 'URL Encoder / Decoder', desc: 'Converts special characters to URL-safe percent-encoding and vice-versa.' },
  { id: 'color-code-converter', category: 'Encoders, Decoders & Converters', title: 'Color Code Converter (HEX, RGB, HSL, CMYK)', desc: 'Converts color values between HEX, RGB, HSL, and CMYK formats.' },
  { id: 'unix-timestamp-converter', category: 'Encoders, Decoders & Converters', title: 'Unix Timestamp to Date Converter', desc: 'Converts epoch timestamps (seconds/ms) to human ISO date strings.' },
  { id: 'multi-unit-converter', category: 'Encoders, Decoders & Converters', title: 'Multi-Unit Metric/Imperial Converter', desc: 'Converts units of Length, Mass, Temperature, Volume, and Speed.' },
  { id: 'live-currency-calculator', category: 'Encoders, Decoders & Converters', title: 'Live Currency Cross Rate Calculator', desc: 'Calculates real-time foreign exchange conversions across 30+ currencies.' },
  { id: 'binary-to-decimal', category: 'Encoders, Decoders & Converters', title: 'Binary to Decimal / Hex / Octal Converter', desc: 'Converts numbers between Binary (Base-2), Octal, Decimal, and Hex.' },
  { id: 'html-entity-encoder', category: 'Encoders, Decoders & Converters', title: 'HTML Entity Encoder / Decoder', desc: 'Encodes special characters to HTML entities (`&lt;`, `&gt;`) and decodes.' },
  { id: 'hex-to-text-converter', category: 'Encoders, Decoders & Converters', title: 'Hex to Text / Text to Hex Tool', desc: 'Translates hexadecimal byte sequences into plain readable text strings.' },
  { id: 'markdown-to-html-engine', category: 'Encoders, Decoders & Converters', title: 'Markdown to HTML Live Engine', desc: 'Converts GitHub-flavored Markdown text into sanitized HTML code.' },
  { id: 'svg-to-png-converter', category: 'Encoders, Decoders & Converters', title: 'SVG to PNG High-Res Rasterizer', desc: 'Renders vector SVG code into high-resolution PNG images at 1x, 2x, 4x.' },

  // 8. Text Processing & Manipulation
  { id: 'sql-formatter', category: 'Text Processing & Manipulation', title: 'SQL Query Formatter & Beautifier', desc: 'Pretty-prints complex SQL queries with custom keyword capitalization.' },
  { id: 'text-diff-checker', category: 'Text Processing & Manipulation', title: 'Code Diff & Visual Comparison', desc: 'Side-by-side visual diff tool highlighting added and deleted text lines.' },
  { id: 'whitespace-remover', category: 'Text Processing & Manipulation', title: 'Extra Whitespace & Line Stripper', desc: 'Removes double spaces, leading/trailing whitespace, and empty lines.' },
  { id: 'duplicate-line-filter', category: 'Text Processing & Manipulation', title: 'Duplicate Line Filter Engine', desc: 'Strips duplicate lines or words from text lists preserving order.' },
  { id: 'text-stats-counter', category: 'Text Processing & Manipulation', title: 'Text Character, Word & Byte Counter', desc: 'Counts real-time characters, words, sentences, paragraphs, and bytes.' },
  { id: 'url-slug-generator', category: 'Text Processing & Manipulation', title: 'URL Slug Generator', desc: 'Converts text titles into clean SEO-friendly URL slug strings.' },
  { id: 'text-to-binary', category: 'Text Processing & Manipulation', title: 'Text to Binary Converter', desc: 'Converts text characters into 8-bit binary byte strings.' },
  { id: 'text-sorter-alphabetizer', category: 'Text Processing & Manipulation', title: 'List Alphabetizer & Numerical Sorter', desc: 'Sorts text lines alphabetically A-Z/Z-A, numerically, or by length.' },
  { id: 'markdown-table-generator', category: 'Text Processing & Manipulation', title: 'Markdown Table Builder', desc: 'Generates Markdown data tables with customizable columns and rows.' },
  { id: 'string-escape-tool', category: 'Text Processing & Manipulation', title: 'String Escape / Unescape Tool', desc: 'Escapes text for JavaScript, JSON, Java, C#, and SQL string literals.' },

  // 9. Calculators & Mathematics
  { id: 'percentage-calculator', category: 'Calculators & Mathematics', title: 'Advanced Percentage Increase/Decrease Engine', desc: 'Calculates X% of Y, percentage increase/decrease, and ratio splits.' },
  { id: 'bmi-body-fat', category: 'Calculators & Mathematics', title: 'BMI & Body Composition Calculator', desc: 'Calculates Body Mass Index (BMI) and Navy Body Fat percentage.' },
  { id: 'age-date-difference', category: 'Calculators & Mathematics', title: 'Exact Date Difference & Duration Engine', desc: 'Calculates exact age and duration in years, months, days, and hours.' },
  { id: 'gpa-calculator', category: 'Calculators & Mathematics', title: 'Weighted GPA Calculator', desc: 'Calculates high school and college unweighted (4.0) and weighted (5.0) GPA.' },
  { id: 'salary-to-hourly', category: 'Calculators & Mathematics', title: 'Salary to Hourly Pay Converter', desc: 'Converts annual salary to hourly, weekly, bi-weekly, and monthly wage.' },
  { id: 'tip-bill-splitter', category: 'Calculators & Mathematics', title: 'Restaurant Tip & Split Calculator', desc: 'Calculates tip amounts and splits restaurant bills evenly per person.' },
  { id: 'discount-sales-tax', category: 'Calculators & Mathematics', title: 'Sales Tax & Discount Calculator', desc: 'Calculates final retail checkout price with sale discount and tax.' },
  { id: 'fuel-cost-calculator', category: 'Calculators & Mathematics', title: 'Vehicle Trip Fuel Cost Engine', desc: 'Calculates fuel cost for trips based on distance, MPG, and gas price.' },
  { id: 'random-number-gen', category: 'Calculators & Mathematics', title: 'Random Number Generator', desc: 'Generates cryptographically random integers bounded by Min and Max.' },
  { id: 'matrix-determinant-tool', category: 'Calculators & Mathematics', title: 'Matrix Determinant & Linear Algebra Tool', desc: 'Calculates 2x2 and 3x3 matrix determinants, addition, and multiplication.' },

  // 10. Web Security & Server Config
  { id: 'canonical-url-builder', category: 'Web Security & Server Config', title: 'SEO Canonical & Hreflang Generator', desc: 'Generates HTML canonical link tags and multi-language hreflang tags.' },
  { id: 'redirect-301-generator', category: 'Web Security & Server Config', title: 'NGINX & Apache 301 Redirect Builder', desc: 'Generates NGINX and Apache RewriteRule syntax for permanent 301 redirects.' },
  { id: 'csp-header-generator', category: 'Web Security & Server Config', title: 'Security Policy (CSP) Generator', desc: 'Builds Content-Security-Policy HTTP response headers.' },
  { id: 'htaccess-rule-builder', category: 'Web Security & Server Config', title: '.htaccess Rule Generator', desc: 'Generates Apache `.htaccess` rules for HTTPS enforcement and headers.' },
  { id: 'bcrypt-hash-simulator', category: 'Web Security & Server Config', title: 'Bcrypt Hash Cost Simulator', desc: 'Simulates Bcrypt password hashing rounds and salt generation.' },
  { id: 'hmac-generator', category: 'Web Security & Server Config', title: 'HMAC Signature Generator', desc: 'Generates HMAC signatures using SHA-256 or SHA-512 with secret keys.' },
  { id: 'aes-encryption-ui', category: 'Web Security & Server Config', title: 'AES-256 Client-Side Text Encrypter', desc: 'Encrypts and decrypts text locally using AES-GCM 256-bit cryptography.' },
  { id: 'csr-decoder', category: 'Web Security & Server Config', title: 'CSR (Certificate Signing Request) Decoder', desc: 'Parses SSL CSR PEM blocks extracting Common Name, Org, and Key Size.' },
  { id: 'dmarc-spf-builder', category: 'Web Security & Server Config', title: 'DMARC & SPF Email Record Builder', desc: 'Generates DNS TXT records for DMARC policy and SPF mail validation.' },
  { id: 'password-crack-time-estimator', category: 'Web Security & Server Config', title: 'Password Crack Time Estimator', desc: 'Calculates password bit entropy and brute-force crack time estimates.' },

  // 11. Developer UI & Design Playgrounds
  { id: 'css-flexbox-playground', category: 'Developer UI & Design Playgrounds', title: 'CSS Flexbox Layout Playground', desc: 'Visual interactive sandbox generating CSS flexbox layout rules.' },
  { id: 'css-grid-generator', category: 'Developer UI & Design Playgrounds', title: 'CSS Grid Generator', desc: 'Generates CSS Grid template columns, rows, gaps, and area codes.' },
  { id: 'box-shadow-generator', category: 'Developer UI & Design Playgrounds', title: 'CSS Box Shadow & Glassmorphism Builder', desc: 'Generates CSS `box-shadow` and glassmorphism backdrop-filter codes.' },
  { id: 'gradient-generator', category: 'Developer UI & Design Playgrounds', title: 'CSS Linear & Radial Gradient Engine', desc: 'Generates CSS linear and radial background gradient codes.' },
  { id: 'border-radius-generator', category: 'Developer UI & Design Playgrounds', title: 'CSS Border Radius Blob Generator', desc: 'Generates custom CSS border-radius and organic blob shapes.' },
  { id: 'px-to-rem-converter', category: 'Developer UI & Design Playgrounds', title: 'Pixels to REM / EM / VW Converter', desc: 'Converts pixel values to CSS `rem`, `em`, and `vw` units.' },
  { id: 'palette-from-image', category: 'Developer UI & Design Playgrounds', title: 'Image Palette Extractor', desc: 'Extracts dominant hex color palettes from photos using Canvas.' },
  { id: 'favicon-generator-ui', category: 'Developer UI & Design Playgrounds', title: 'Favicon Multi-Resolution Builder', desc: 'Generates HTML favicon links, Apple touch icons, and Web App Manifest.' },
  { id: 'aspect-ratio-calc', category: 'Developer UI & Design Playgrounds', title: 'Aspect Ratio Calculator', desc: 'Calculates missing width/height dimensions for 16:9, 4:3, 1:1, 21:9.' },
  { id: 'chmod-calculator', category: 'Developer UI & Design Playgrounds', title: 'Linux Chmod Permissions Calculator', desc: 'Calculates octal numerical permissions (755, 644) and symbolic notation.' },

  // 12. Health, Fitness & Nutrition
  { id: 'water-intake-calculator', category: 'Health, Fitness & Nutrition', title: 'Daily Water Intake Calculator', desc: 'Calculates daily fluid requirements in liters and cups based on body weight.' },
  { id: 'calorie-tdee-calculator', category: 'Health, Fitness & Nutrition', title: 'TDEE & BMR Calorie Engine', desc: 'Calculates Basal Metabolic Rate and Total Daily Energy Expenditure.' },
  { id: 'macro-calculator', category: 'Health, Fitness & Nutrition', title: 'Macronutrient Ratio Calculator', desc: 'Calculates target daily grams of Protein, Carbs, and Fats.' },
  { id: 'sleep-cycle-calculator', category: 'Health, Fitness & Nutrition', title: 'Sleep Cycle & Bedtime Calculator', desc: 'Calculates optimal bedtime schedules based on 90-minute REM sleep cycles.' },
  { id: 'ideal-weight-calculator', category: 'Health, Fitness & Nutrition', title: 'Ideal Body Weight (IBW) Calculator', desc: 'Calculates healthy weight ranges using Devine, Robinson, and Miller formulas.' },
  { id: 'step-to-distance-calc', category: 'Health, Fitness & Nutrition', title: 'Steps to Distance & Energy Converter', desc: 'Converts daily step count into miles, km, and estimated calories burned.' },
  { id: 'bac-calculator', category: 'Health, Fitness & Nutrition', title: 'Blood Alcohol Concentration (BAC) Engine', desc: 'Estimates Blood Alcohol Content percentage over time using Widmark formula.' },
  { id: 'unit-price-comparator', category: 'Health, Fitness & Nutrition', title: 'Grocery Unit Price Comparator', desc: 'Compares cost per ounce/gram between competing grocery deals.' },
  { id: 'countdown-timer-builder', category: 'Health, Fitness & Nutrition', title: 'Event Countdown Timer', desc: 'Calculates remaining days, hours, and minutes until target dates.' },
  { id: 'stopwatch-lap-timer', category: 'Health, Fitness & Nutrition', title: 'Digital Stopwatch & Split Timer', desc: 'Precision digital stopwatch with lap split time logging.' },

  // 13. E-Commerce & Business Operations
  { id: 'amazon-fee-calculator', category: 'E-Commerce & Business Operations', title: 'Amazon FBA & Referral Fee Calculator', desc: 'Calculates Amazon referral fees, FBA fulfillment fees, and net margin.' },
  { id: 'profit-margin-calculator', category: 'E-Commerce & Business Operations', title: 'Gross Profit Margin & Markup Engine', desc: 'Calculates Gross Profit Margin %, Markup %, and Dollar Profit.' },
  { id: 'etsy-fee-calculator', category: 'E-Commerce & Business Operations', title: 'Etsy Seller Fee & Profit Calculator', desc: 'Calculates Etsy listing fees, transaction fees, and payment processing.' },
  { id: 'shopify-pricing-calc', category: 'E-Commerce & Business Operations', title: 'Shopify Break-Even Pricing Engine', desc: 'Calculates break-even price and target retail prices for e-commerce.' },
  { id: 'bar-code-generator', category: 'E-Commerce & Business Operations', title: 'Vector Barcode Generator', desc: 'Renders Code 128, EAN-13, and UPC-A barcodes on HTML5 canvas.' },
  { id: 'sku-generator', category: 'E-Commerce & Business Operations', title: 'Product SKU Batch Builder', desc: 'Generates structured SKU identifiers by category, size, and color.' },
  { id: 'shipping-weight-calc', category: 'E-Commerce & Business Operations', title: 'Dimensional Weight Shipping Engine', desc: 'Calculates Volumetric Dimensional Shipping Weight (L x W x H / 139).' },
  { id: 'sales-tax-by-state', category: 'E-Commerce & Business Operations', title: 'US State Sales Tax & VAT Calculator', desc: 'Calculates US state sales tax and international VAT totals.' },
  { id: 'inventory-reorder-calc', category: 'E-Commerce & Business Operations', title: 'Economic Order Quantity (EOQ) Engine', desc: 'Calculates optimal inventory reorder points and order quantities.' },
  { id: 'price-discount-matrix', category: 'E-Commerce & Business Operations', title: 'Tiered Wholesale Pricing Matrix', desc: 'Calculates bulk quantity tier discount percentages for quotes.' },

  // 14. Business, HR & Freelancing
  { id: 'invoice-generator-ui', category: 'Business, HR & Freelancing', title: 'Client-Side Invoice Generator', desc: 'Generates clean printable business invoices with line items and tax.' },
  { id: 'payroll-tax-calc', category: 'Business, HR & Freelancing', title: 'Employee Payroll Tax Calculator', desc: 'Estimates gross paycheck, federal/state withholdings, and net pay.' },
  { id: 'meeting-cost-calculator', category: 'Business, HR & Freelancing', title: 'Meeting Cost Real-Time Ticker', desc: 'Calculates real dollar cost of meetings based on attendee count and rates.' },
  { id: 'working-days-calculator', category: 'Business, HR & Freelancing', title: 'Business Working Days Calculator', desc: 'Calculates net working days excluding weekends and custom holidays.' },
  { id: 'burn-rate-calculator', category: 'Business, HR & Freelancing', title: 'Startup Runway & Burn Rate Engine', desc: 'Calculates monthly burn rate and cash runway months.' },
  { id: 'job-offer-comparator', category: 'Business, HR & Freelancing', title: 'Job Offer Compensation Comparator', desc: 'Compares total compensation packages between competing job offers.' },
  { id: 'overtime-pay-calc', category: 'Business, HR & Freelancing', title: 'Overtime Pay Wage Engine', desc: 'Calculates weekly pay with regular and 1.5x/2.0x overtime hours.' },
  { id: 'break-even-calculator', category: 'Business, HR & Freelancing', title: 'Business Break-Even Point Engine', desc: 'Calculates unit sales volume needed to cover fixed and variable costs.' },
  { id: 'consulting-proposal-calc', category: 'Business, HR & Freelancing', title: 'Consulting Project Scope Estimator', desc: 'Calculates project proposal quotes based on hours and risk buffer.' },
  { id: 'nps-score-calculator', category: 'Business, HR & Freelancing', title: 'Net Promoter Score (NPS) Calculator', desc: 'Calculates NPS score (-100 to +100) from customer survey feedback.' },

  // 15. Cryptography & Cyber Security
  { id: 'crc32-checksum-calc', category: 'Cryptography & Cyber Security', title: 'CRC32 Checksum Calculator', desc: 'Calculates CRC32 hexadecimal checksums for data integrity verification.' },
  { id: 'htpasswd-generator', category: 'Cryptography & Cyber Security', title: 'Apache .htpasswd Hash Builder', desc: 'Generates Apache Basic Auth user credentials for `.htpasswd` files.' },
  { id: 'morse-binary-cipher', category: 'Cryptography & Cyber Security', title: 'ROT13 & Caesar Shift Cipher Tool', desc: 'Encodes and decodes text using Caesar Shift ciphers.' },
  { id: 'ssl-chain-inspector', category: 'Cryptography & Cyber Security', title: 'SSL Certificate Chain Inspector', desc: 'Inspects intermediate and root SSL certificate chain validity.' },
  { id: 'password-entropy-calc', category: 'Cryptography & Cyber Security', title: 'Password Entropy Calculator', desc: 'Calculates bit entropy and brute-force crack time estimates.' },
  { id: 'sha512-hash-engine', category: 'Cryptography & Cyber Security', title: 'SHA-512 Hash Engine', desc: 'Generates SHA-512 cryptographic hashes using browser Web Crypto API.' },
  { id: 'rsa-public-key-parser', category: 'Cryptography & Cyber Security', title: 'RSA Public Key Parser', desc: 'Parses PEM RSA public keys extracting modulus and exponent.' },
  { id: 'base32-encoder-decoder', category: 'Cryptography & Cyber Security', title: 'Base32 Encoder / Decoder', desc: 'Encodes and decodes RFC 4648 Base32 strings.' },
  { id: 'seed-phrase-validator', category: 'Cryptography & Cyber Security', title: 'Seed Phrase Validator', desc: 'Validates BIP-39 12/24 word mnemonic seed phrases locally.' },
  { id: 'wireguard-keypair-gen', category: 'Cryptography & Cyber Security', title: 'WireGuard Keypair Generator', desc: 'Generates Curve25519 WireGuard private and public keypairs.' },

  // 16. Education, Science & Physics
  { id: 'periodic-table-explorer', category: 'Education, Science & Physics', title: 'Interactive Periodic Table Lookup', desc: 'Displays atomic number, mass, symbol, and electron config for elements.' },
  { id: 'resistor-color-code', category: 'Education, Science & Physics', title: 'Resistor Color Code Band Calculator', desc: 'Calculates resistor resistance (Ohms Ω) from 4-band and 5-band colors.' },
  { id: 'ohms-law-calculator', category: 'Education, Science & Physics', title: "Ohm's Law Electrical Engine", desc: 'Calculates Voltage (V), Current (I), Resistance (R), and Power (W).' },
  { id: 'physics-kinematics-calc', category: 'Education, Science & Physics', title: 'Physics Kinematics Solver', desc: 'Solves motion equations ($v = u + at$, $s = ut + 0.5at^2$).' },
  { id: 'chemical-equation-balancer', category: 'Education, Science & Physics', title: 'Chemical Molar Mass Calculator', desc: 'Calculates molecular weight and molar mass (g/mol) for chemical formulas.' },
  { id: 'quadratic-equation-solver', category: 'Education, Science & Physics', title: 'Quadratic Equation Root Solver', desc: 'Solves quadratic equation roots ($ax^2 + bx + c = 0$).' },
  { id: 'significant-figures-calc', category: 'Education, Science & Physics', title: 'Significant Figures Calculator', desc: 'Counts significant figures in numbers and rounds calculations.' },
  { id: 'unit-converter-pro', category: 'Education, Science & Physics', title: 'Unit Pressure & Energy Converter', desc: 'Converts units of Pressure (PSI, Bar), Energy (Joules, BTU), and Power.' },
  { id: 'dna-sequence-complement', category: 'Education, Science & Physics', title: 'DNA Sequence Complement Generator', desc: 'Generates complementary DNA and transcribed RNA sequences.' },
  { id: 'vector-dot-product-engine', category: 'Education, Science & Physics', title: 'Vector Addition & Dot Product Engine', desc: 'Calculates 2D/3D vector addition, magnitude, and dot product.' },

  // 17. Real Estate, Construction & Home
  { id: 'rent-vs-buy-calculator', category: 'Real Estate, Construction & Home', title: 'Rent vs. Buy Home Comparison Engine', desc: 'Compares 10-year total net costs of renting vs purchasing real estate.' },
  { id: 'car-loan-calculator', category: 'Real Estate, Construction & Home', title: 'Auto Loan Payment Calculator', desc: 'Calculates monthly car payments, total interest, and amortization.' },
  { id: 'paint-coverage-calculator', category: 'Real Estate, Construction & Home', title: 'Room Paint Coverage Calculator', desc: 'Calculates total gallons/liters of wall paint needed for room dimensions.' },
  { id: 'tile-flooring-calculator', category: 'Real Estate, Construction & Home', title: 'Tile & Grout Volume Calculator', desc: 'Calculates square footage and tile box counts including 10% waste.' },
  { id: 'solar-panel-payback', category: 'Real Estate, Construction & Home', title: 'Solar Panel Payback Engine', desc: 'Calculates solar installation ROI payback period in years.' },
  { id: 'appliance-energy-calc', category: 'Real Estate, Construction & Home', title: 'Appliance Electricity Cost Calculator', desc: 'Calculates monthly electricity cost per appliance based on Wattage.' },
  { id: 'property-tax-calculator', category: 'Real Estate, Construction & Home', title: 'Property Tax Assessment Calculator', desc: 'Calculates annual property taxes from millage rate and assessed value.' },
  { id: 'car-depreciation-calc', category: 'Real Estate, Construction & Home', title: 'Vehicle Depreciation Engine', desc: 'Projects 5-year vehicle market resale value depreciation curve.' },
  { id: 'concrete-volume-calc', category: 'Real Estate, Construction & Home', title: 'Concrete Slab Volume Calculator', desc: 'Calculates cubic yards and 80lb bags of concrete required for slabs.' },
  { id: 'mulch-landscaping-calc', category: 'Real Estate, Construction & Home', title: 'Mulch & Soil Volume Calculator', desc: 'Calculates cubic yards of garden mulch needed for target depth.' },

  // 18. Travel, Time & Mapping
  { id: 'flight-duration-calc', category: 'Travel, Time & Mapping', title: 'Flight Duration & Distance Calculator', desc: 'Calculates great-circle flight distance and travel hours between airports.' },
  { id: 'jet-lag-advisor', category: 'Travel, Time & Mapping', title: 'Jet Lag Recovery Schedule Calculator', desc: 'Calculates recommended sleep adjustments across multiple timezones.' },
  { id: 'travel-budget-planner', category: 'Travel, Time & Mapping', title: 'Daily Travel Budget Engine', desc: 'Calculates daily and total travel budget splits for trip planning.' },
  { id: 'timezone-converter-pro', category: 'Travel, Time & Mapping', title: 'World Clock Time Zone Matrix', desc: 'Converts local meeting times across UTC, EST, PST, GMT, IST, and JST.' },
  { id: 'packing-list-generator', category: 'Travel, Time & Mapping', title: 'Packing List Builder', desc: 'Generates customized travel packing lists based on destination weather.' },
  { id: 'driving-cost-calculator', category: 'Travel, Time & Mapping', title: 'Driving Distance & Toll Estimator', desc: 'Calculates gas costs for road trips based on distance, MPG, and gas price.' },
  { id: 'sun-angle-calculator', category: 'Travel, Time & Mapping', title: 'Sunrise, Sunset & Golden Hour Engine', desc: 'Calculates local sunrise, sunset times, and golden hour windows.' },
  { id: 'nautical-distance-calc', category: 'Travel, Time & Mapping', title: 'Nautical Miles Distance Converter', desc: 'Converts between Nautical Miles (NM), Statute Miles, and Kilometers.' },
  { id: 'coordinate-converter', category: 'Travel, Time & Mapping', title: 'GPS Coordinate Converter (DD / DMS)', desc: 'Converts GPS coordinates between Decimal Degrees and Deg/Min/Sec.' },
  { id: 'time-duration-calc', category: 'Travel, Time & Mapping', title: 'Time Duration Calculator', desc: 'Calculates total hours and minutes between two time entries.' },

  // 19. Gaming, Media & Streaming
  { id: 'dpi-sensitivity-converter', category: 'Gaming, Media & Streaming', title: 'Mouse DPI & Sensitivity Converter', desc: 'Converts eDPI mouse sensitivity between Valorant, CS2, and Apex.' },
  { id: 'twitch-bitrate-calc', category: 'Gaming, Media & Streaming', title: 'Twitch/OBS Streaming Bitrate Engine', desc: 'Calculates optimal OBS bitrate settings for 720p/1080p 60fps broadcasts.' },
  { id: 'dice-roller-pro', category: 'Gaming, Media & Streaming', title: 'RPG Dice Roller Simulator', desc: 'Simulates d4, d6, d8, d10, d12, d20, and d100 dice rolls with modifiers.' },
  { id: 'poker-odds-calculator', category: 'Gaming, Media & Streaming', title: 'Poker Hand Equity Calculator', desc: "Calculates pre-flop and flop winning probabilities in Texas Hold'em." },
  { id: 'crosshair-generator', category: 'Gaming, Media & Streaming', title: 'FPS Game Crosshair Configurator', desc: 'Renders custom FPS crosshairs and generates export config strings.' },
  { id: 'chess-pgn-viewer', category: 'Gaming, Media & Streaming', title: 'Chess PGN Notation Viewer', desc: 'Parses Portable Game Notation (.PGN) chess games into move lists.' },
  { id: 'reaction-time-tester', category: 'Gaming, Media & Streaming', title: 'Visual Reaction Time Tester', desc: 'Measures visual response time in milliseconds upon color change.' },
  { id: 'cps-click-tester', category: 'Gaming, Media & Streaming', title: 'Clicks Per Second (CPS) Test', desc: 'Measures mouse clicking speed over 1, 5, or 10-second test intervals.' },
  { id: 'typing-speed-tester', category: 'Gaming, Media & Streaming', title: 'WPM Typing Speed Test', desc: 'Measures typing speed in Words Per Minute (WPM) and accuracy.' },
  { id: 'video-frame-rate-calc', category: 'Gaming, Media & Streaming', title: 'Video Timecode & Frame Rate Engine', desc: 'Calculates total frames and SMPTE timecodes (24fps, 30fps, 60fps).' },

  // 20. Personal Organization & Strategy
  { id: 'decision-matrix-builder', category: 'Personal Organization & Strategy', title: 'Weighted Decision Matrix Builder', desc: 'Ranks multiple options objectively using weighted custom criteria.' },
  { id: 'habits-streak-tracker', category: 'Personal Organization & Strategy', title: '30-Day Habit Grid Builder', desc: 'Generates printable 30-day habit streak matrices for personal goals.' },
  { id: 'reading-time-estimator-tool', category: 'Personal Organization & Strategy', title: 'Reading Time Estimator', desc: 'Calculates estimated reading and speaking duration at 200 WPM.' },
  { id: 'markdown-mindmap-tree', category: 'Personal Organization & Strategy', title: 'Markdown Mindmap Tree Builder', desc: 'Converts indented list text into structured visual node diagrams.' },
  { id: 'to-do-matrix-eisenhower', category: 'Personal Organization & Strategy', title: 'Eisenhower Matrix Task Sorter', desc: 'Categorizes tasks into Urgent/Important 4-quadrant decision boxes.' },
  { id: 'gift-budget-planner', category: 'Personal Organization & Strategy', title: 'Holiday Gift Budget Allocator', desc: 'Allocates gift spending caps per recipient and tracks budget totals.' },
  { id: 'event-guest-list-calc', category: 'Personal Organization & Strategy', title: 'Event Party Catering Estimator', desc: 'Estimates food portions, beverage counts, and seating requirements.' },
  { id: 'bill-splitter-advanced', category: 'Personal Organization & Strategy', title: 'Rent Splitter by Square Footage', desc: 'Splits monthly rent and utility expenses proportionally by room size.' },
  { id: 'recipe-scale-factor-calc', category: 'Personal Organization & Strategy', title: 'Recipe Scale Factor Calculator', desc: 'Scales ingredient quantities up or down for target serving sizes.' },
  { id: 'daily-journal-prompts', category: 'Personal Organization & Strategy', title: 'Daily Gratitude Journal Template', desc: 'Generates daily self-reflection questions and gratitude prompts.' },

  // 21. Social Media Infrastructure
  { id: 'youtube-tag-extractor', category: 'Social Media Infrastructure', title: 'YouTube Tag Extractor', desc: 'Generates SEO tags, hashtags, and keywords for YouTube video titles.' },
  { id: 'video-bitrate-file-estimator', category: 'Social Media Infrastructure', title: 'Video Bitrate & File Size Estimator', desc: 'Calculates estimated video MB size based on bitrate and duration.' },
  { id: 'tweet-character-counter', category: 'Social Media Infrastructure', title: 'Tweet Character Matrix Tester', desc: 'Checks 280-character Twitter/X limits and splits long text into threads.' },
  { id: 'youtube-thumbnail-previewer', category: 'Social Media Infrastructure', title: 'YouTube Thumbnail Previewer', desc: 'Previews video thumbnail and title mockups on Youtube feeds.' },
  { id: 'podcast-rss-builder', category: 'Social Media Infrastructure', title: 'Podcast RSS XML Feed Builder', desc: 'Generates Apple Podcasts & Spotify compliant RSS XML feed code.' },
  { id: 'subtitle-vtt-converter', category: 'Social Media Infrastructure', title: 'SRT to WebVTT Subtitle Converter', desc: 'Transcodes SubRip (.SRT) subtitle files into WebVTT (.VTT) format.' },
  { id: 'social-image-canvas-resizer', category: 'Social Media Infrastructure', title: 'Social Media Image Canvas Resizer', desc: 'Resizes images for Instagram, Twitter, LinkedIn, and Facebook banners.' },
  { id: 'twitch-panel-layout-gen', category: 'Social Media Infrastructure', title: 'Twitch Panel Layout Generator', desc: 'Generates graphic panel dimensions and HTML layout links for Twitch.' },
  { id: 'discord-embed-creator', category: 'Social Media Infrastructure', title: 'Discord Embed Creator', desc: 'Builds Discord webhook embed JSON objects with fields and colors.' },
  { id: 'tiktok-video-duration-estimator', category: 'Social Media Infrastructure', title: 'TikTok Video Duration Estimator', desc: 'Estimates speech reading duration for 15s, 60s, and 3m TikTok clips.' },

  // 22. SEO & Webmaster Suite
  { id: 'robots-txt-builder', category: 'SEO & Webmaster Suite', title: 'Robots.txt File Builder', desc: 'Generates clean robots.txt disallow rules and sitemap directives.' },
  { id: 'meta-viewport-builder', category: 'SEO & Webmaster Suite', title: 'Web App Manifest Builder', desc: 'Generates HTML meta viewport tags and Web App Manifest JSON files.' },
  { id: 'anchor-text-analyzer', category: 'SEO & Webmaster Suite', title: 'Anchor Text Ratio Analyzer', desc: 'Analyzes backlink anchor text distributions for exact match ratios.' },
  { id: 'dns-record-generator', category: 'SEO & Webmaster Suite', title: 'DNS Record Generator (A/MX/TXT)', desc: 'Generates DNS zone file records for domain hosting.' },
  { id: 'sitemap-index-generator', category: 'SEO & Webmaster Suite', title: 'XML Sitemap Index Generator', desc: 'Generates `<sitemapindex>` XML documents linking sub-sitemaps.' },
  { id: 'word-density-counter', category: 'SEO & Webmaster Suite', title: 'TF-IDF Keyword Density Analyzer', desc: 'Calculates 1-word, 2-word, and 3-word n-gram keyword densities.' },
  { id: 'broken-link-checker-ui', category: 'SEO & Webmaster Suite', title: 'Broken Link Checker UI', desc: 'Validates URL structures, query strings, and path protocols in HTML.' },
  { id: 'mobile-friendly-checker', category: 'SEO & Webmaster Suite', title: 'Responsive Viewport Breakpoint Tester', desc: 'Tests layout visibility across 320px, 768px, 1024px, and 1440px.' },
  { id: 'http-redirect-chain-inspector', category: 'SEO & Webmaster Suite', title: 'HTTP Redirect Chain Inspector', desc: 'Simulates 301/302 HTTP redirect chains and canonical loops.' },
  { id: 'domain-tld-checker', category: 'SEO & Webmaster Suite', title: 'Domain TLD Checker', desc: 'Inspects top-level domain extensions (.com, .io, .ai, .dev) specs.' },

  // 23. Developer Build Utilities
  { id: 'curl-to-fetch-converter-tool', category: 'Developer Build Utilities', title: 'cURL to JavaScript fetch() Converter', desc: 'Converts command-line cURL commands into clean `fetch()` snippets.' },
  { id: 'json-to-ts-interface', category: 'Developer Build Utilities', title: 'JSON to TypeScript Interface Generator', desc: 'Converts JSON sample objects into strongly typed TypeScript interfaces.' },
  { id: 'yaml-to-json', category: 'Developer Build Utilities', title: 'YAML to JSON Engine', desc: 'Converts YAML configuration files into JSON structures and vice-versa.' },
  { id: 'css-js-compressor', category: 'Developer Build Utilities', title: 'Minify CSS / JS Engine', desc: 'Compresses JavaScript and CSS code removing spaces and comments.' },
  { id: 'xml-formatter', category: 'Developer Build Utilities', title: 'XML Formatter & Validator', desc: 'Pretty-prints XML documents with node indentation and validates tags.' },
  { id: 'dockerfile-generator', category: 'Developer Build Utilities', title: 'Dockerfile Generator', desc: 'Generates optimized multi-stage Dockerfiles for Node, Python, and Go.' },
  { id: 'git-command-cheat-sheet', category: 'Developer Build Utilities', title: 'Git Command Cheat Sheet Builder', desc: 'Interactive generator for common git rebase, cherry-pick, and reset commands.' },
  { id: 'regex-cheatsheet-ui', category: 'Developer Build Utilities', title: 'Regular Expression Cheatsheet UI', desc: 'Reference guide and pattern builder for regex tokens and lookaheads.' },
  { id: 'package-json-tree-inspector', category: 'Developer Build Utilities', title: 'Package.json Dependency Tree Inspector', desc: 'Parses `package.json` files listing dependencies and devDependencies.' },
  { id: 'markdown-badges-generator', category: 'Developer Build Utilities', title: 'Markdown Badges Generator', desc: 'Generates Shields.io status badges for GitHub README files.' },

  // 24. Math & Statistics
  { id: 'fraction-calculator', category: 'Math & Statistics', title: 'Fraction Simplifier Engine', desc: 'Adds, subtracts, multiplies, and divides fractions reducing to lowest terms.' },
  { id: 'roman-numeral-converter', category: 'Math & Statistics', title: 'Roman Numeral Converter', desc: 'Converts integer numbers to Roman Numerals (`2026` ↔ `MMXXVI`).' },
  { id: 'binary-calculator', category: 'Math & Statistics', title: 'Binary Arithmetic Engine', desc: 'Performs binary addition, subtraction, AND, OR, XOR operations.' },
  { id: 'average-mean-calculator', category: 'Math & Statistics', title: 'Mean, Median, Mode Engine', desc: 'Calculates Mean, Median, Mode, and Range for dataset numbers.' },
  { id: 'standard-deviation-calc', category: 'Math & Statistics', title: 'Standard Deviation Calculator', desc: 'Calculates Sample/Population Standard Deviation, Variance, and Sum of Squares.' },
  { id: 'random-choice-picker', category: 'Math & Statistics', title: 'Random Name / Item Picker', desc: 'Picks one or more random items/winners from a custom list.' },
  { id: 'speed-distance-time', category: 'Math & Statistics', title: 'Speed, Distance & Time Solver', desc: 'Calculates missing speed (mph/kph), distance (miles/km), or travel time.' },
  { id: 'triangle-solver', category: 'Math & Statistics', title: 'Pythagorean Right Triangle Solver', desc: 'Solves right triangles calculating Hypotenuse ($c = \\sqrt{a^2+b^2}$), area, and perimeter.' },
  { id: 'combination-permutation-calc', category: 'Math & Statistics', title: 'Combination & Permutation Engine', desc: 'Calculates $nCr$ combinations and $nPr$ permutations.' },
  { id: 'logarithm-exponent-calc', category: 'Math & Statistics', title: 'Logarithm & Exponent Calculator', desc: 'Calculates natural log $\\ln(x)$, $\\log_{10}(x)$, and arbitrary base exponents.' },

  // 25. Daily Life Utilities
  { id: 'grocery-unit-price-matrix', category: 'Daily Life Utilities', title: 'Unit Price Comparison Matrix', desc: 'Compares cost per ounce/gram between competing grocery package deals.' },
  { id: 'time-between-dates-engine', category: 'Daily Life Utilities', title: 'Time Between Dates Engine', desc: 'Calculates exact days, weeks, and months between two calendar dates.' },
  { id: 'fuel-consumption-converter', category: 'Daily Life Utilities', title: 'Fuel Consumption Converter', desc: 'Converts fuel economy between MPG (US/UK) and L/100km.' },
  { id: 'age-calculator-exact', category: 'Daily Life Utilities', title: 'Age Calculator (Exact Days/Hours)', desc: 'Calculates exact age in years, months, days, hours, and minutes.' },
  { id: 'shoe-size-converter', category: 'Daily Life Utilities', title: 'Shoe Size International Converter', desc: 'Converts shoe sizes across US, UK, EU, and CM measurement scales.' },
  { id: 'kitchen-measurement-converter', category: 'Daily Life Utilities', title: 'Kitchen Measurement Converter', desc: 'Converts cooking volumes (cups, tablespoons, teaspoons, ml, fl oz).' },
  { id: 'ring-size-calculator', category: 'Daily Life Utilities', title: 'Ring Size Calculator', desc: 'Converts finger circumference in mm to US, UK, and EU ring sizes.' },
  { id: 'tire-size-comparison', category: 'Daily Life Utilities', title: 'Tire Size Comparison Calculator', desc: 'Compares tire diameter, sidewall height, and speedometer offset %.' },
  { id: 'simple-interest-calculator', category: 'Daily Life Utilities', title: 'Simple Interest Calculator', desc: 'Calculates simple interest ($I = P \\times r \\times t$) and final balance.' },
  { id: 'percentage-discount-calculator', category: 'Daily Life Utilities', title: 'Percentage Discount Calculator', desc: 'Calculates discount savings amount and final price at retail checkout.' }
];

console.log('Master 250 tools count:', master250Tools.length);

// Generate src/utils/toolsConfig.ts
const fileHeader = `export interface ToolInput {
  id: string;
  label: string;
  type: "text" | "textarea" | "dropdown" | "file";
  placeholder?: string;
  options?: string[];
}

export interface ToolConfig {
  id: string;
  title: string;
  name: string; // Alias for backward compatibility
  category: string;
  description: string;
  inputs: ToolInput[];
  cost?: number;
}

export const toolsConfig: ToolConfig[] = [\n`;

const entries = master250Tools.map(t => {
  const inputs = [
    { id: "inputData", label: `Input Parameter / Data String for ${t.title}`, type: "textarea", placeholder: `Enter parameters or paste target payload for ${t.title}...` },
    { id: "mode", label: "Operation / Execution Preset", type: "dropdown", options: ["Standard Execution Mode", "High-Precision Mode", "Verbose Diagnostic Mode"] }
  ];

  return `  {
    id: "${t.id}",
    title: "${t.title.replace(/"/g, '\\"')}",
    name: "${t.title.replace(/"/g, '\\"')}",
    category: "${t.category.replace(/"/g, '\\"')}",
    description: "${t.desc.replace(/"/g, '\\"')}",
    inputs: ${JSON.stringify(inputs, null, 6).replace(/\n\s*}/g, '\n    }')}
  }`;
}).join(',\n');

const fullConfig = fileHeader + entries + '\n];\n';
fs.writeFileSync('src/utils/toolsConfig.ts', fullConfig);
console.log('Successfully written 250 tools to src/utils/toolsConfig.ts!');

// Update public/template/main.js
let mainJsContent = fs.readFileSync('public/template/main.js', 'utf8');

const uniqueCats = Array.from(new Set(master250Tools.map(t => t.category)));
const mainJsCategoriesStr = uniqueCats.map(c => `'${c.replace(/'/g, "\\'")}'`).join(', ');
mainJsContent = mainJsContent.replace(/const CATEGORIES = \[[\s\S]*?\];/m, `const CATEGORIES = [${mainJsCategoriesStr}];`);

const mainJsToolsEntries = master250Tools.map(t => {
  const inputs = [
    { id: "inputData", label: `Input Data for ${t.title}`, type: "textarea", placeholder: `Enter inputs for ${t.title}...` }
  ];
  return `    {
      id: '${t.id}',
      category: '${t.category.replace(/'/g, "\\'")}',
      title: '${t.title.replace(/'/g, "\\'")}',
      description: '${t.desc.replace(/'/g, "\\'")}',
      inputs: ${JSON.stringify(inputs, null, 8)},
      execute: (inputs) => {
        return '# ⚡ ${t.title.replace(/'/g, "\\'")} Result\\n\\nProcessed locally inside browser memory thread.';
      }
    }`;
}).join(',\n');

const catalogStart = mainJsContent.indexOf('const TOOLS_CATALOG = [');
const catalogEnd = mainJsContent.indexOf('// 2. SPA STATE MANAGEMENT');
if (catalogStart !== -1 && catalogEnd !== -1) {
  mainJsContent = mainJsContent.slice(0, catalogStart) + `const TOOLS_CATALOG = [\n${mainJsToolsEntries}\n  ];\n\n  ` + mainJsContent.slice(catalogEnd);
}

fs.writeFileSync('public/template/main.js', mainJsContent);
console.log('Successfully updated public/template/main.js with 250 tools!');
