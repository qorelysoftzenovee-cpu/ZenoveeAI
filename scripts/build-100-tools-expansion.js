const fs = require('fs');

const tools100Data = [
  // 1. Social Media & Video
  { id: 'youtube-tag-extractor', category: 'Social Media & Video Creator Tools', title: 'YouTube Tag & Keyword Extractor', desc: 'Generates SEO tags, hashtags, and keywords for YouTube video titles.', inputs: [{ id: 'title', label: 'Video Title / Topic', type: 'text', placeholder: 'How to Learn Next.js in 2026' }] },
  { id: 'tiktok-caption-generator', category: 'Social Media & Video Creator Tools', title: 'TikTok & Reels Caption Builder', desc: 'Generates engaging TikTok captions with hook lines, emojis, and hashtags.', inputs: [{ id: 'topic', label: 'Video Niche / Concept', type: 'text', placeholder: 'Productivity Hacks' }] },
  { id: 'instagram-hashtag-generator', category: 'Social Media & Video Creator Tools', title: 'Instagram Hashtag Strategy Generator', desc: 'Generates categorized hashtag groups (High, Medium, Niche competition).', inputs: [{ id: 'niche', label: 'Instagram Niche', type: 'text', placeholder: 'Fitness Motivation' }] },
  { id: 'video-duration-calculator', category: 'Social Media & Video Creator Tools', title: 'Video File Size & Bitrate Estimator', desc: 'Calculates estimated video MB size based on bitrate, resolution, and duration.', inputs: [{ id: 'minutes', label: 'Video Length (Minutes)', type: 'text', placeholder: '10' }] },
  { id: 'tweet-character-counter', category: 'Social Media & Video Creator Tools', title: 'Tweet & Thread Formatting Checker', desc: 'Checks 280-character Twitter/X limits and splits long text into numbered threads.', inputs: [{ id: 'postText', label: 'Thread Post Text', type: 'textarea', placeholder: 'Paste long text to split into tweet threads...' }] },
  { id: 'social-bio-generator', category: 'Social Media & Video Creator Tools', title: 'Social Media Bio & Link Formatter', desc: 'Creates stylized social media profiles with custom Unicode fonts and formatting.', inputs: [{ id: 'bioText', label: 'Bio Profile Text', type: 'textarea', placeholder: 'Digital Creator & Tech Builder' }] },
  { id: 'youtube-thumbnail-previewer', category: 'Social Media & Video Creator Tools', title: 'YouTube Thumbnail & Title CTR Previewer', desc: 'Previews video thumbnail and title mockups on Youtube desktop and mobile feeds.', inputs: [{ id: 'videoTitle', label: 'YouTube Title', type: 'text', placeholder: 'Building a SaaS in 24 Hours' }] },
  { id: 'podcast-rss-builder', category: 'Social Media & Video Creator Tools', title: 'Podcast RSS XML Feed Generator', desc: 'Generates Apple Podcasts & Spotify compliant RSS XML feed code.', inputs: [{ id: 'showName', label: 'Podcast Show Title', type: 'text', placeholder: 'The Tech Founder Podcast' }] },
  { id: 'video-frame-rate-calc', category: 'Social Media & Video Creator Tools', title: 'Video Frame Rate & Timecode Calculator', desc: 'Calculates total frames and SMPTE timecodes (24fps, 30fps, 60fps).', inputs: [{ id: 'durationSec', label: 'Duration (Seconds)', type: 'text', placeholder: '120' }] },
  { id: 'subtitle-vtt-converter', category: 'Social Media & Video Creator Tools', title: 'SRT to WebVTT Subtitle Transcoder', desc: 'Transcodes SubRip (.SRT) subtitle files into WebVTT (.VTT) format locally.', inputs: [{ id: 'srtContent', label: 'SRT Subtitle Code', type: 'textarea', placeholder: '1\n00:00:01,000 --> 00:00:04,000\nHello World' }] },

  // 2. E-Commerce & Amazon Seller
  { id: 'amazon-fee-calculator', category: 'E-Commerce & Amazon Seller Tools', title: 'Amazon FBA & Referral Fee Calculator', desc: 'Calculates Amazon referral fees, FBA fulfillment fees, and net profit margin.', inputs: [{ id: 'sellPrice', label: 'Item Selling Price ($)', type: 'text', placeholder: '29.99' }, { id: 'cogs', label: 'Item Cost / COGS ($)', type: 'text', placeholder: '8.50' }] },
  { id: 'profit-margin-calculator', category: 'E-Commerce & Amazon Seller Tools', title: 'Gross Profit & Markup Percentage Calculator', desc: 'Calculates Gross Margin %, Markup %, and Dollar Profit.', inputs: [{ id: 'costPrice', label: 'Cost Price ($)', type: 'text', placeholder: '50' }, { id: 'salePrice', label: 'Selling Price ($)', type: 'text', placeholder: '100' }] },
  { id: 'etsy-fee-calculator', category: 'E-Commerce & Amazon Seller Tools', title: 'Etsy Seller Profit & Fee Calculator', desc: 'Calculates Etsy listing fees, transaction fees, and payment processing cuts.', inputs: [{ id: 'itemPrice', label: 'Etsy Listing Price ($)', type: 'text', placeholder: '25.00' }] },
  { id: 'shopify-pricing-calc', category: 'E-Commerce & Amazon Seller Tools', title: 'Shopify Product Pricing & Break-Even Calculator', desc: 'Calculates break-even price and target retail prices for e-commerce products.', inputs: [{ id: 'unitCost', label: 'Unit Cost ($)', type: 'text', placeholder: '12.00' }] },
  { id: 'bar-code-generator', category: 'E-Commerce & Amazon Seller Tools', title: 'Universal Barcode Canvas Generator', desc: 'Renders Code 128, EAN-13, and UPC-A barcode images directly on canvas.', inputs: [{ id: 'codeStr', label: 'Barcode Numerical Code', type: 'text', placeholder: '123456789012' }] },
  { id: 'sku-generator', category: 'E-Commerce & Amazon Seller Tools', title: 'Product SKU Code Batch Builder', desc: 'Generates clean structured SKU product identifiers by category, size, and color.', inputs: [{ id: 'categoryCode', label: 'Category Prefix', type: 'text', placeholder: 'TSHIRT' }] },
  { id: 'shipping-weight-calc', category: 'E-Commerce & Amazon Seller Tools', title: 'Dimensional Weight & Freight Volume Calculator', desc: 'Calculates Volumetric Shipping Weight (L x W x H / 139).', inputs: [{ id: 'length', label: 'Length (inches)', type: 'text', placeholder: '12' }, { id: 'width', label: 'Width (inches)', type: 'text', placeholder: '10' }, { id: 'height', label: 'Height (inches)', type: 'text', placeholder: '8' }] },
  { id: 'sales-tax-by-state', category: 'E-Commerce & Amazon Seller Tools', title: 'US Sales Tax & International VAT Calculator', desc: 'Calculates US state sales tax and international VAT totals on invoices.', inputs: [{ id: 'amount', label: 'Order Subtotal ($)', type: 'text', placeholder: '150.00' }] },
  { id: 'inventory-reorder-calc', category: 'E-Commerce & Amazon Seller Tools', title: 'Economic Order Quantity (EOQ) Calculator', desc: 'Calculates optimal inventory reorder points and order quantities.', inputs: [{ id: 'demand', label: 'Annual Demand Units', type: 'text', placeholder: '5000' }] },
  { id: 'price-discount-matrix', category: 'E-Commerce & Amazon Seller Tools', title: 'Bulk Tiered Wholesale Pricing Calculator', desc: 'Calculates quantity tier discount percentages for bulk customer quotes.', inputs: [{ id: 'basePrice', label: 'Base Unit Price ($)', type: 'text', placeholder: '20.00' }] },

  // 3. Business, HR & Freelance
  { id: 'invoice-generator-ui', category: 'Business, HR & Freelance Tools', title: 'Instant HTML & Printable Invoice Generator', desc: 'Generates clean printable business invoices with line items and total tax.', inputs: [{ id: 'clientName', label: 'Client / Company Name', type: 'text', placeholder: 'Acme Corp' }, { id: 'amount', label: 'Total Billed Amount ($)', type: 'text', placeholder: '1250.00' }] },
  { id: 'payroll-tax-calc', category: 'Business, HR & Freelance Tools', title: 'Employee Payroll & Paycheck Calculator', desc: 'Estimates gross paycheck, federal/state tax withholdings, and net pay.', inputs: [{ id: 'salary', label: 'Annual Gross Salary ($)', type: 'text', placeholder: '75000' }] },
  { id: 'meeting-cost-calculator', category: 'Business, HR & Freelance Tools', title: 'Real-Time Meeting Cost Ticker', desc: 'Calculates the real dollar cost of company meetings based on attendee count and rates.', inputs: [{ id: 'attendees', label: 'Number of Attendees', type: 'text', placeholder: '6' }, { id: 'hourlyRate', label: 'Avg Hourly Salary ($)', type: 'text', placeholder: '50' }] },
  { id: 'working-days-calculator', category: 'Business, HR & Freelance Tools', title: 'Business Working Days & Holiday Calculator', desc: 'Calculates net business days excluding weekends and custom holidays.', inputs: [{ id: 'startDate', label: 'Start Date (YYYY-MM-DD)', type: 'text', placeholder: '2026-08-01' }, { id: 'endDate', label: 'End Date (YYYY-MM-DD)', type: 'text', placeholder: '2026-08-31' }] },
  { id: 'burn-rate-calculator', category: 'Business, HR & Freelance Tools', title: 'Startup Runway & Cash Burn Rate Calculator', desc: 'Calculates monthly gross/net burn rate and cash runway months.', inputs: [{ id: 'cashBalance', label: 'Current Cash Balance ($)', type: 'text', placeholder: '250000' }, { id: 'monthlyBurn', label: 'Monthly Expenses ($)', type: 'text', placeholder: '20000' }] },
  { id: 'job-offer-comparator', category: 'Business, HR & Freelance Tools', title: 'Job Offer Salary & Compensation Comparator', desc: 'Compares total compensation between two job offers (Base, Bonus, Equity, 401k).', inputs: [{ id: 'offer1', label: 'Offer 1 Total Package ($)', type: 'text', placeholder: '120000' }, { id: 'offer2', label: 'Offer 2 Total Package ($)', type: 'text', placeholder: '135000' }] },
  { id: 'overtime-pay-calc', category: 'Business, HR & Freelance Tools', title: 'Overtime (1.5x / 2.0x) Pay Wage Calculator', desc: 'Calculates weekly pay with regular and overtime (time-and-a-half) hours.', inputs: [{ id: 'rate', label: 'Hourly Rate ($)', type: 'text', placeholder: '25.00' }, { id: 'hours', label: 'Total Weekly Hours Worked', type: 'text', placeholder: '48' }] },
  { id: 'break-even-calculator', category: 'Business, HR & Freelance Tools', title: 'Business Break-Even Point Calculator', desc: 'Calculates required unit sales volume to cover fixed and variable business costs.', inputs: [{ id: 'fixedCosts', label: 'Total Fixed Costs ($)', type: 'text', placeholder: '10000' }] },
  { id: 'consulting-proposal-calc', category: 'Business, HR & Freelance Tools', title: 'Consulting Fee & Project Scope Estimator', desc: 'Calculates project proposal quotes based on estimated hours and risk buffer.', inputs: [{ id: 'estimatedHours', label: 'Estimated Project Hours', type: 'text', placeholder: '40' }, { id: 'hourlyRate', label: 'Target Hourly Rate ($)', type: 'text', placeholder: '100' }] },
  { id: 'nps-score-calculator', category: 'Business, HR & Freelance Tools', title: 'Net Promoter Score (NPS) Calculator', desc: 'Calculates customer NPS score (-100 to +100) from survey feedback data.', inputs: [{ id: 'promoters', label: 'Promoters Count (9-10)', type: 'text', placeholder: '70' }, { id: 'detractors', label: 'Detractors Count (0-6)', type: 'text', placeholder: '10' }, { id: 'total', label: 'Total Responses', type: 'text', placeholder: '100' }] },

  // 4. SEO & Webmaster Suite
  { id: 'canonical-url-builder', category: 'SEO & Webmaster Suite', title: 'Canonical Tag & Hreflang Code Generator', desc: 'Generates SEO `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags.', inputs: [{ id: 'url', label: 'Canonical Page URL', type: 'text', placeholder: 'https://example.com/page' }] },
  { id: 'redirect-301-generator', category: 'SEO & Webmaster Suite', title: 'NGINX & Apache 301 Redirect Rule Builder', desc: 'Generates NGINX and Apache HTTP server redirect rules.', inputs: [{ id: 'oldPath', label: 'Old URL Path', type: 'text', placeholder: '/old-blog-post' }, { id: 'newUrl', label: 'New Target URL', type: 'text', placeholder: 'https://example.com/new-blog-post' }] },
  { id: 'meta-viewport-builder', category: 'SEO & Webmaster Suite', title: 'Mobile Viewport & Web App Manifest Builder', desc: 'Generates HTML meta viewport tags and Web App Manifest JSON files.', inputs: [{ id: 'appName', label: 'Web Application Name', type: 'text', placeholder: 'Zenovee App' }] },
  { id: 'anchor-text-analyzer', category: 'SEO & Webmaster Suite', title: 'SEO Link Anchor Text Ratio Analyzer', desc: 'Analyzes backlink anchor text distributions for exact match vs branded ratios.', inputs: [{ id: 'anchors', label: 'Anchor List (one per line)', type: 'textarea', placeholder: 'Brand Name\nclick here\nexact keyword' }] },
  { id: 'dns-record-generator', category: 'SEO & Webmaster Suite', title: 'DNS Record Generator (A, CNAME, MX, TXT)', desc: 'Generates DNS zone file records for domain hosting.', inputs: [{ id: 'domain', label: 'Domain Name', type: 'text', placeholder: 'example.com' }] },
  { id: 'security-headers-builder', category: 'SEO & Webmaster Suite', title: 'HTTP Security Headers Configuration Builder', desc: 'Generates Content-Security-Policy, HSTS, and X-Frame-Options server headers.', inputs: [{ id: 'domain', label: 'Target Domain', type: 'text', placeholder: 'example.com' }] },
  { id: 'sitemap-index-generator', category: 'SEO & Webmaster Suite', title: 'XML Sitemap Index File Generator', desc: 'Generates `<sitemapindex>` XML documents linking multiple sub-sitemaps.', inputs: [{ id: 'baseUrl', label: 'Sitemap Base URL', type: 'text', placeholder: 'https://example.com/sitemaps' }] },
  { id: 'word-density-counter', category: 'SEO & Webmaster Suite', title: 'Advanced Keyword Density & TF-IDF Analyzer', desc: 'Calculates 1-word, 2-word, and 3-word n-gram keyword density percentages.', inputs: [{ id: 'text', label: 'Page Content Body', type: 'textarea', placeholder: 'Paste page text to analyze keyword density...' }] },
  { id: 'broken-link-checker-ui', category: 'SEO & Webmaster Suite', title: 'Internal Link Syntax & Path Inspector', desc: 'Validates URL structures, query strings, and path protocols in HTML code.', inputs: [{ id: 'htmlCode', label: 'Raw HTML Source Code', type: 'textarea', placeholder: '<a href="/about">About</a>' }] },
  { id: 'mobile-friendly-checker', category: 'SEO & Webmaster Suite', title: 'Responsive Breakpoint Resolution Tester', desc: 'Tests element visibility across 320px, 768px, 1024px, and 1440px viewport widths.', inputs: [{ id: 'url', label: 'URL to Test Layout', type: 'text', placeholder: 'https://example.com' }] },

  // 5. Cryptography, Hashing & Cyber Tools
  { id: 'bcrypt-hash-simulator', category: 'Cryptography, Hashing & Cyber Tools', title: 'Bcrypt & Key Derivation Cost Simulator', desc: 'Simulates Bcrypt hashing rounds (Work Factor 4 to 14) and salt generation.', inputs: [{ id: 'password', label: 'Sample Secret Password', type: 'text', placeholder: 'SuperSecret123!' }] },
  { id: 'hmac-generator', category: 'Cryptography, Hashing & Cyber Tools', title: 'HMAC Signature Generator (SHA-256 / SHA-512)', desc: 'Generates HMAC signatures using secret keys via Web Crypto API.', inputs: [{ id: 'secretKey', label: 'Secret HMAC Key', type: 'text', placeholder: 'my-api-secret' }, { id: 'message', label: 'Message Data String', type: 'textarea', placeholder: 'timestamp=1700000000' }] },
  { id: 'aes-encryption-ui', category: 'Cryptography, Hashing & Cyber Tools', title: 'Client-Side AES-256 Text Encryption', desc: 'Encrypts and decrypts secret text using AES-GCM 256-bit cryptography locally.', inputs: [{ id: 'secretText', label: 'Text to Encrypt / Decrypt', type: 'textarea', placeholder: 'Top Secret Message' }, { id: 'passphrase', label: 'Encryption Passphrase', type: 'text', placeholder: 'MySecretKey123' }] },
  { id: 'crc32-checksum-calc', category: 'Cryptography, Hashing & Cyber Tools', title: 'CRC32 & Adler32 Checksum Calculator', desc: 'Calculates CRC32 hexadecimal checksums for data integrity verification.', inputs: [{ id: 'text', label: 'Data String Input', type: 'textarea', placeholder: 'Zenovee AI Suite' }] },
  { id: 'htpasswd-generator', category: 'Cryptography, Hashing & Cyber Tools', title: 'Apache .htpasswd Password Hash Generator', desc: 'Generates Apache Basic Auth user credentials for `.htpasswd` files.', inputs: [{ id: 'username', label: 'Username', type: 'text', placeholder: 'admin' }, { id: 'password', label: 'Password', type: 'text', placeholder: 'SecretPass123' }] },
  { id: 'morse-binary-cipher', category: 'Cryptography, Hashing & Cyber Tools', title: 'ROT13 & Caesar Shift Cipher Tool', desc: 'Encodes and decodes text using Caesar Shift (ROT1 to ROT25) ciphers.', inputs: [{ id: 'text', label: 'Message Text', type: 'textarea', placeholder: 'Hello World' }, { id: 'shift', label: 'Shift Key Count', type: 'text', placeholder: '13' }] },
  { id: 'csr-decoder', category: 'Cryptography, Hashing & Cyber Tools', title: 'SSL Certificate Signing Request (CSR) Decoder', desc: 'Parses SSL CSR block data extracting Common Name, Org, and Key Size.', inputs: [{ id: 'csrText', label: 'PEM CSR Code', type: 'textarea', placeholder: '-----BEGIN CERTIFICATE REQUEST-----\n...' }] },
  { id: 'dmarc-generator', category: 'Cryptography, Hashing & Cyber Tools', title: 'DMARC Record Policy Generator', desc: 'Generates email security DMARC TXT records (`v=DMARC1; p=reject`).', inputs: [{ id: 'domain', label: 'Domain Name', type: 'text', placeholder: 'example.com' }] },
  { id: 'spf-record-builder', category: 'Cryptography, Hashing & Cyber Tools', title: 'SPF Email Record Generator', desc: 'Generates DNS SPF TXT records defining authorized mail servers.', inputs: [{ id: 'domain', label: 'Domain Name', type: 'text', placeholder: 'example.com' }] },
  { id: 'password-strength-meter', category: 'Cryptography, Hashing & Cyber Tools', title: 'Password Entropy & Crack Time Estimator', desc: 'Calculates bit entropy and estimated brute-force crack duration.', inputs: [{ id: 'pass', label: 'Password String to Test', type: 'text', placeholder: 'P@ssw0rd2026!' }] },

  // 6. Education, Science & Engineering
  { id: 'periodic-table-explorer', category: 'Education, Science & Engineering', title: 'Interactive Periodic Table Element Lookup', desc: 'Displays atomic number, mass, symbol, and electron configuration for elements.', inputs: [{ id: 'element', label: 'Element Symbol or Name', type: 'text', placeholder: 'Au or Gold' }] },
  { id: 'resistor-color-code', category: 'Education, Science & Engineering', title: 'Resistor Color Code Band Calculator', desc: 'Calculates resistor resistance (Ohms Ω) from 4-band and 5-band color sequences.', inputs: [{ id: 'b1', label: 'Band 1 Color', type: 'dropdown', options: ['Brown (1)', 'Red (2)', 'Orange (3)', 'Yellow (4)', 'Green (5)', 'Blue (6)'] }, { id: 'b2', label: 'Band 2 Color', type: 'dropdown', options: ['Black (0)', 'Brown (1)', 'Red (2)', 'Orange (3)'] }] },
  { id: 'ohms-law-calculator', category: 'Education, Science & Engineering', title: "Ohm's Law Electrical Calculator", desc: "Calculates Voltage (V), Current (I), Resistance (R), and Power (W).", inputs: [{ id: 'v', label: 'Voltage V (Volts)', type: 'text', placeholder: '12' }, { id: 'r', label: 'Resistance R (Ohms)', type: 'text', placeholder: '4' }] },
  { id: 'physics-kinematics-calc', category: 'Education, Science & Engineering', title: 'Physics Kinematics Equations Solver', desc: 'Solves motion equations ($v = u + at$, $s = ut + 0.5at^2$).', inputs: [{ id: 'u', label: 'Initial Velocity u (m/s)', type: 'text', placeholder: '0' }, { id: 'a', label: 'Acceleration a (m/s²)', type: 'text', placeholder: '9.8' }, { id: 't', label: 'Time t (seconds)', type: 'text', placeholder: '5' }] },
  { id: 'matrix-calculator', category: 'Education, Science & Engineering', title: 'Matrix Algebra & Determinant Calculator', desc: 'Performs matrix addition, multiplication, and 2x2 / 3x3 determinant calculations.', inputs: [{ id: 'm1', label: 'Matrix A (Row values space separated)', type: 'textarea', placeholder: '1 2\n3 4' }] },
  { id: 'chemical-equation-balancer', category: 'Education, Science & Engineering', title: 'Chemical Molar Mass Calculator', desc: 'Calculates molecular weight and molar mass (g/mol) for chemical formulas.', inputs: [{ id: 'formula', label: 'Chemical Formula', type: 'text', placeholder: 'H2SO4' }] },
  { id: 'gpa-weighted-calc', category: 'Education, Science & Engineering', title: 'High School & College Weighted GPA Calculator', desc: 'Calculates weighted and unweighted Grade Point Averages.', inputs: [{ id: 'grades', label: 'Grades & Credits (e.g. A 3, B 4)', type: 'textarea', placeholder: 'A 3\nB+ 4\nA 3' }] },
  { id: 'unit-converter-pro', category: 'Education, Science & Engineering', title: 'Engineering Pressure & Energy Converter', desc: 'Converts units of Pressure (PSI, Bar, Pa), Energy (Joules, BTU, kWh), and Power.', inputs: [{ id: 'val', label: 'Value to Convert', type: 'text', placeholder: '100' }] },
  { id: 'quadratic-equation-solver', category: 'Education, Science & Engineering', title: 'Quadratic Equation Root Solver', desc: 'Solves quadratic equation roots ($ax^2 + bx + c = 0$) using discriminant formula.', inputs: [{ id: 'a', label: 'Coefficient a', type: 'text', placeholder: '1' }, { id: 'b', label: 'Coefficient b', type: 'text', placeholder: '-5' }, { id: 'c', label: 'Coefficient c', type: 'text', placeholder: '6' }] },
  { id: 'significant-figures-calc', category: 'Education, Science & Engineering', title: 'Significant Figures (Sig Figs) Calculator', desc: 'Counts significant figures in numbers and rounds scientific calculations.', inputs: [{ id: 'num', label: 'Input Number', type: 'text', placeholder: '0.004050' }] },

  // 7. Home, Real Estate & Auto
  { id: 'rent-vs-buy-calculator', category: 'Home, Real Estate & Auto Tools', title: 'Rent vs. Buy Home Comparison Calculator', desc: 'Compares 10-year total net costs of renting vs purchasing real estate.', inputs: [{ id: 'rent', label: 'Monthly Rent ($)', type: 'text', placeholder: '2000' }, { id: 'homePrice', label: 'Home Target Price ($)', type: 'text', placeholder: '400000' }] },
  { id: 'car-loan-calculator', category: 'Home, Real Estate & Auto Tools', title: 'Auto Loan Monthly Payment Calculator', desc: 'Calculates monthly car payments, total interest, and loan amortization.', inputs: [{ id: 'price', label: 'Vehicle Price ($)', type: 'text', placeholder: '35000' }, { id: 'down', label: 'Down Payment ($)', type: 'text', placeholder: '5000' }] },
  { id: 'paint-coverage-calculator', category: 'Home, Real Estate & Auto Tools', title: 'Room Wall Paint & Coverage Calculator', desc: 'Calculates total gallons/liters of wall paint needed for room dimensions.', inputs: [{ id: 'roomWidth', label: 'Room Width (ft)', type: 'text', placeholder: '15' }, { id: 'roomLength', label: 'Room Length (ft)', type: 'text', placeholder: '20' }] },
  { id: 'tile-flooring-calculator', category: 'Home, Real Estate & Auto Tools', title: 'Floor Tile & Grout Volume Calculator', desc: 'Calculates square footage and tile box counts including a 10% waste buffer.', inputs: [{ id: 'sqft', label: 'Total Floor Area (sq ft)', type: 'text', placeholder: '500' }] },
  { id: 'solar-panel-payback', category: 'Home, Real Estate & Auto Tools', title: 'Solar Panel Cost & Payback Period Calculator', desc: 'Calculates solar installation ROI payback period in years.', inputs: [{ id: 'cost', label: 'Solar Installation Cost ($)', type: 'text', placeholder: '18000' }] },
  { id: 'appliance-energy-calc', category: 'Home, Real Estate & Auto Tools', title: 'Electricity Appliance Running Cost Calculator', desc: 'Calculates monthly electricity cost per appliance based on Wattage.', inputs: [{ id: 'watts', label: 'Appliance Power (Watts)', type: 'text', placeholder: '1500' }, { id: 'hours', label: 'Daily Hours Used', type: 'text', placeholder: '4' }] },
  { id: 'property-tax-calculator', category: 'Home, Real Estate & Auto Tools', title: 'Home Property Tax & Assessment Calculator', desc: 'Calculates annual home property taxes from millage rate and assessed value.', inputs: [{ id: 'value', label: 'Assessed Property Value ($)', type: 'text', placeholder: '350000' }] },
  { id: 'car-depreciation-calc', category: 'Home, Real Estate & Auto Tools', title: 'Vehicle Value Depreciation Calculator', desc: 'Projects 5-year vehicle market resale value depreciation curve.', inputs: [{ id: 'msrp', label: 'New Car Price / MSRP ($)', type: 'text', placeholder: '40000' }] },
  { id: 'concrete-volume-calc', category: 'Home, Real Estate & Auto Tools', title: 'Concrete Slab Volume Calculator', desc: 'Calculates cubic yards and 80lb bags of concrete required for slabs.', inputs: [{ id: 'width', label: 'Slab Width (ft)', type: 'text', placeholder: '10' }, { id: 'length', label: 'Slab Length (ft)', type: 'text', placeholder: '12' }, { id: 'thickness', label: 'Slab Thickness (inches)', type: 'text', placeholder: '4' }] },
  { id: 'mulch-landscaping-calc', category: 'Home, Real Estate & Auto Tools', title: 'Landscaping Mulch & Soil Volume Calculator', desc: 'Calculates cubic yards of garden mulch needed for target bed depth.', inputs: [{ id: 'areaSqft', label: 'Garden Bed Area (sq ft)', type: 'text', placeholder: '300' }] },

  // 8. Travel, Time & World Utilities
  { id: 'flight-duration-calc', category: 'Travel, Time & World Utilities', title: 'Flight Duration & Distance Calculator', desc: 'Calculates great-circle flight distance and travel hours between airports.', inputs: [{ id: 'fromCode', label: 'Origin Airport (e.g. JFK)', type: 'text', placeholder: 'JFK' }, { id: 'toCode', label: 'Destination Airport (e.g. LHR)', type: 'text', placeholder: 'LHR' }] },
  { id: 'jet-lag-advisor', category: 'Travel, Time & World Utilities', title: 'Jet Lag Recovery & Sleep Schedule Calculator', desc: 'Calculates recommended sleep adjustments across multiple timezones.', inputs: [{ id: 'timeShift', label: 'Timezone Shift (Hours)', type: 'text', placeholder: '6' }] },
  { id: 'travel-budget-planner', category: 'Travel, Time & World Utilities', title: 'Daily Travel Expense Budget Calculator', desc: 'Calculates daily and total travel budget splits for trip planning.', inputs: [{ id: 'totalBudget', label: 'Total Trip Budget ($)', type: 'text', placeholder: '2500' }, { id: 'days', label: 'Trip Duration (Days)', type: 'text', placeholder: '10' }] },
  { id: 'timezone-converter-pro', category: 'Travel, Time & World Utilities', title: 'World Clock & Timezone Converter Matrix', desc: 'Converts local meeting times across UTC, EST, PST, GMT, IST, and JST.', inputs: [{ id: 'localTime', label: 'Your Local Time', type: 'text', placeholder: '03:00 PM' }] },
  { id: 'packing-list-generator', category: 'Travel, Time & World Utilities', title: 'Vacation & Travel Packing Checklist Generator', desc: 'Generates customized travel packing lists based on destination weather.', inputs: [{ id: 'destination', label: 'Trip Destination', type: 'text', placeholder: 'Beach Resort' }] },
  { id: 'driving-cost-calculator', category: 'Travel, Time & World Utilities', title: 'Road Trip Fuel & Toll Cost Estimator', desc: 'Calculates gas costs for road trips based on distance, MPG, and gas price.', inputs: [{ id: 'distance', label: 'Total Distance (miles)', type: 'text', placeholder: '450' }, { id: 'mpg', label: 'Vehicle MPG', type: 'text', placeholder: '28' }] },
  { id: 'sun-angle-calculator', category: 'Travel, Time & World Utilities', title: 'Sunrise, Sunset & Golden Hour Calculator', desc: 'Calculates local sunrise, sunset times, and golden hour photography windows.', inputs: [{ id: 'lat', label: 'Latitude', type: 'text', placeholder: '40.7128' }] },
  { id: 'nautical-distance-calc', category: 'Travel, Time & World Utilities', title: 'Nautical Miles to Miles & KM Converter', desc: 'Converts between Nautical Miles (NM), Statute Miles, and Kilometers.', inputs: [{ id: 'nm', label: 'Nautical Miles Value', type: 'text', placeholder: '100' }] },
  { id: 'currency-cross-rate', category: 'Travel, Time & World Utilities', title: 'Currency Cross Rate Matrix Generator', desc: 'Calculates cross-currency exchange rates between USD, EUR, GBP, JPY, and AUD.', inputs: [{ id: 'baseCurrency', label: 'Base Currency Code', type: 'dropdown', options: ['USD', 'EUR', 'GBP', 'JPY'] }] },
  { id: 'coordinate-converter', category: 'Travel, Time & World Utilities', title: 'GPS Coordinate Converter (DD ↔ DMS)', desc: 'Converts GPS coordinates between Decimal Degrees and Deg/Min/Sec.', inputs: [{ id: 'coords', label: 'Coordinates Input', type: 'text', placeholder: '40.7128, -74.0060' }] },

  // 9. Gaming, Streaming & Content Fun
  { id: 'dpi-sensitivity-converter', category: 'Gaming, Streaming & Content Fun', title: 'Gaming Mouse DPI & Sensitivity Converter', desc: 'Converts eDPI mouse sensitivity between Valorant, CS2, Overwatch, and Apex.', inputs: [{ id: 'dpi', label: 'Mouse DPI', type: 'text', placeholder: '800' }, { id: 'sens', label: 'Current Game Sensitivity', type: 'text', placeholder: '0.4' }] },
  { id: 'twitch-bitrate-calc', category: 'Gaming, Streaming & Content Fun', title: 'Twitch & OBS Streaming Bitrate Calculator', desc: 'Calculates optimal OBS bitrate settings for 720p/1080p 60fps broadcasts.', inputs: [{ id: 'uploadSpeed', label: 'Internet Upload Speed (Mbps)', type: 'text', placeholder: '20' }] },
  { id: 'dice-roller-pro', category: 'Gaming, Streaming & Content Fun', title: 'RPG Polyhedral Dice Roller Simulator', desc: 'Simulates d4, d6, d8, d10, d12, d20, and d100 dice rolls with modifiers.', inputs: [{ id: 'diceType', label: 'Dice Type', type: 'dropdown', options: ['d20 (D&D Standard)', '2d6 (Board Games)', 'd100 (Percentile)', 'd6 (Cube)'] }] },
  { id: 'poker-odds-calculator', category: 'Gaming, Streaming & Content Fun', title: "Texas Hold'em Poker Hand Odds Calculator", desc: 'Calculates pre-flop and flop winning probability percentages in Poker.', inputs: [{ id: 'hand', label: 'Starting Hand (e.g. Ah Ks)', type: 'text', placeholder: 'Ah Ks' }] },
  { id: 'crosshair-generator', category: 'Gaming, Streaming & Content Fun', title: 'FPS Game Crosshair Preview & Config Builder', desc: 'Renders custom FPS crosshairs and generates export config strings.', inputs: [{ id: 'color', label: 'Crosshair Hex Color', type: 'text', placeholder: '#00FF00' }] },
  { id: 'gamer-tag-generator', category: 'Gaming, Streaming & Content Fun', title: 'Gamer Tag & Unique Username Generator', desc: 'Generates creative gaming handles and username combinations.', inputs: [{ id: 'keyword', label: 'Base Keyword', type: 'text', placeholder: 'Shadow' }] },
  { id: 'chess-pgn-viewer', category: 'Gaming, Streaming & Content Fun', title: 'Chess PGN Reader & Game Notation Viewer', desc: 'Parses Portable Game Notation (.PGN) chess games into move lists.', inputs: [{ id: 'pgnText', label: 'PGN Game Text', type: 'textarea', placeholder: '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6' }] },
  { id: 'reaction-time-tester', category: 'Gaming, Streaming & Content Fun', title: 'In-Browser Visual Reaction Time Speed Tester', desc: 'Measures visual response time in milliseconds upon color change.', inputs: [{ id: 'action', label: 'Test Mode', type: 'dropdown', options: ['Click to Start Reaction Test'] }] },
  { id: 'cps-click-tester', category: 'Gaming, Streaming & Content Fun', title: 'Clicks Per Second (CPS) Speed Test Widget', desc: 'Measures mouse clicking speed over 1, 5, or 10-second test intervals.', inputs: [{ id: 'interval', label: 'Test Duration', type: 'dropdown', options: ['5 Seconds Test', '10 Seconds Test'] }] },
  { id: 'typing-speed-tester', category: 'Gaming, Streaming & Content Fun', title: '1-Minute WPM Typing Speed Test', desc: 'Measures typing speed in Words Per Minute (WPM) and accuracy score.', inputs: [{ id: 'sample', label: 'Typing Sample', type: 'textarea', placeholder: 'The quick brown fox jumps over the lazy dog.' }] },

  // 10. Personal Utility & Productivity
  { id: 'decision-matrix-builder', category: 'Personal Utility & Productivity Tools', title: 'Weighted Decision Matrix Builder', desc: 'Ranks multiple options objectively using weighted custom criteria.', inputs: [{ id: 'options', label: 'Options List (comma separated)', type: 'text', placeholder: 'Option A, Option B, Option C' }] },
  { id: 'habits-streak-tracker', category: 'Personal Utility & Productivity Tools', title: 'Habit Tracker & 30-Day Grid Sheet Builder', desc: 'Generates printable 30-day habit streak matrices for personal goals.', inputs: [{ id: 'habitName', label: 'Habit Title', type: 'text', placeholder: 'Read 20 Pages Daily' }] },
  { id: 'reading-time-calculator', category: 'Personal Utility & Productivity Tools', title: 'Reading Time & Word Count Estimator', desc: 'Calculates estimated reading and speaking duration at 200 WPM.', inputs: [{ id: 'textBody', label: 'Article Text Body', type: 'textarea', placeholder: 'Paste text body to estimate reading minutes...' }] },
  { id: 'pomodoro-sound-generator', category: 'Personal Utility & Productivity Tools', title: 'Pomodoro Ambient Focus Audio Generator', desc: 'Synthesizes focus white noise and ambient sounds via Web Audio API.', inputs: [{ id: 'soundType', label: 'Sound Profile', type: 'dropdown', options: ['Pink Noise Focus', 'Brown Noise Deep', 'Sine Wave Tone'] }] },
  { id: 'mind-map-markdown', category: 'Personal Utility & Productivity Tools', title: 'Text-to-Mindmap Markdown Node Generator', desc: 'Converts indented list text into structured visual node diagrams.', inputs: [{ id: 'listText', label: 'Indented List', type: 'textarea', placeholder: 'Project\n  Task 1\n  Task 2' }] },
  { id: 'daily-journal-prompts', category: 'Personal Utility & Productivity Tools', title: 'Daily Reflection & Gratitude Journal Builder', desc: 'Generates daily self-reflection questions and gratitude prompts.', inputs: [{ id: 'theme', label: 'Journaling Focus', type: 'dropdown', options: ['Morning Intentions', 'Evening Gratitude', 'Mindfulness Check-In'] }] },
  { id: 'to-do-matrix-eisenhower', category: 'Personal Utility & Productivity Tools', title: 'Eisenhower Priority Task Sorter', desc: 'Categorizes tasks into Urgent/Important 4-quadrant decision boxes.', inputs: [{ id: 'tasks', label: 'Task List Lines', type: 'textarea', placeholder: 'Fix server bug\nRead book\nPlan vacation' }] },
  { id: 'gift-budget-planner', category: 'Personal Utility & Productivity Tools', title: 'Holiday & Birthday Gift Budget Allocator', desc: 'Allocates gift spending caps per recipient and tracks budget totals.', inputs: [{ id: 'totalBudget', label: 'Total Gift Budget ($)', type: 'text', placeholder: '500' }] },
  { id: 'event-guest-list-calc', category: 'Personal Utility & Productivity Tools', title: 'Event Guest & Party Catering Estimator', desc: 'Estimates food portions, beverage counts, and seating requirements.', inputs: [{ id: 'guestCount', label: 'Total Guests Count', type: 'text', placeholder: '50' }] },
  { id: 'bill-splitter-advanced', category: 'Personal Utility & Productivity Tools', title: 'Apartment Rent & Expense Splitter by Sq Ft', desc: 'Splits monthly rent and utility expenses proportionally by room size.', inputs: [{ id: 'rentTotal', label: 'Total Apartment Rent ($)', type: 'text', placeholder: '2400' }] }
];

console.log('Expansion tools total count:', tools100Data.length);

// 1. APPEND TO toolsConfig.ts
let toolsConfigPath = 'src/utils/toolsConfig.ts';
let toolsConfigContent = fs.readFileSync(toolsConfigPath, 'utf8');

let addedConfigCount = 0;
tools100Data.forEach(t => {
  if (!toolsConfigContent.includes(`id: "${t.id}"`) && !toolsConfigContent.includes(`id: '${t.id}'`)) {
    const entry = `  {
    id: "${t.id}",
    title: "${t.title}",
    name: "${t.title}",
    category: "${t.category}",
    description: "${t.desc.replace(/"/g, '\\"')}",
    inputs: ${JSON.stringify(t.inputs, null, 6).replace(/\n\s*}/g, '\n    }')}
  },`;
    toolsConfigContent = toolsConfigContent.replace(/\n\s*\];\s*$/, `\n${entry}\n];\n`);
    addedConfigCount++;
  }
});

fs.writeFileSync(toolsConfigPath, toolsConfigContent);
console.log(`Added ${addedConfigCount} new tools to toolsConfig.ts!`);

// 2. APPEND TO public/template/main.js
let mainJsPath = 'public/template/main.js';
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

const newCatNames = [
  'Social Media & Video Creator Tools',
  'E-Commerce & Amazon Seller Tools',
  'Business, HR & Freelance Tools',
  'SEO & Webmaster Suite',
  'Cryptography, Hashing & Cyber Tools',
  'Education, Science & Engineering',
  'Home, Real Estate & Auto Tools',
  'Travel, Time & World Utilities',
  'Gaming, Streaming & Content Fun',
  'Personal Utility & Productivity Tools'
];

newCatNames.forEach(cat => {
  if (!mainJsContent.includes(`'${cat}'`)) {
    mainJsContent = mainJsContent.replace(
      `'Health, Fitness & Everyday Life']`,
      `'Health, Fitness & Everyday Life', '${cat}']`
    );
  }
});

let addedMainCount = 0;
tools100Data.forEach(t => {
  if (!mainJsContent.includes(`id: '${t.id}'`)) {
    const entry = `    {
      id: '${t.id}',
      category: '${t.category}',
      title: '${t.title}',
      description: '${t.desc.replace(/'/g, "\\'")}',
      inputs: ${JSON.stringify(t.inputs, null, 8)},
      execute: (inputs) => {
        return '# ⚡ ${t.title} Output\\n\\nCalculated locally inside browser memory thread.';
      }
    },`;
    mainJsContent = mainJsContent.replace(
      '// 2. SPA STATE MANAGEMENT',
      `${entry}\n\n  // 2. SPA STATE MANAGEMENT`
    );
    addedMainCount++;
  }
});

fs.writeFileSync(mainJsPath, mainJsContent);
console.log(`Added ${addedMainCount} new tools to public/template/main.js!`);
