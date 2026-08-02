export interface ToolInput {
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

export const toolsConfig: ToolConfig[] = [
  // ==========================================
  // 1. CONTENT CREATION
  // ==========================================
  {
    id: "image-compressor",
    title: "Client-Side Image Compressor & Converter",
    name: "Client-Side Image Compressor & Converter",
    category: "Content Creation",
    description: "Compresses JPEG/PNG/WebP and converts formats locally using OffscreenCanvas and Browser Squoosh/WASM.",
    inputs: [
      { id: "imageFile", label: "Select Image File", type: "file" },
      { id: "format", label: "Target Format", type: "dropdown", options: ["WebP", "JPEG", "PNG"] },
      { id: "quality", label: "Compression Quality", type: "dropdown", options: ["90% (High Quality)", "80% (Balanced)", "60% (High Compression)", "40% (Max Compression)"] },
      { id: "maxWidth", label: "Max Width (Pixels, optional)", type: "text", placeholder: "e.g. 1920" }
    ]
  },
  {
    id: "meme-designer",
    title: "Offline Meme & Infographic Designer",
    name: "Offline Meme & Infographic Designer",
    category: "Content Creation",
    description: "Canvas-based drag-and-drop generator with text layers, custom fonts, and PNG/SVG export.",
    inputs: [
      { id: "template", label: "Upload Custom Template Image", type: "file" },
      { id: "topText", label: "Top Caption Text", type: "text", placeholder: "Enter top caption..." },
      { id: "bottomText", label: "Bottom Caption Text", type: "text", placeholder: "Enter bottom caption..." },
      { id: "fontSize", label: "Font Size", type: "dropdown", options: ["24px", "32px", "40px", "48px", "64px"] },
      { id: "fontColor", label: "Font Fill Color", type: "text", placeholder: "e.g. #FFFFFF" }
    ]
  },
  {
    id: "markdown-studio",
    title: "Markdown to PDF & HTML Studio",
    name: "Markdown to PDF & HTML Studio",
    category: "Content Creation",
    description: "Real-time side-by-side editor with syntax highlighting using marked.js and local PDF export via jsPDF.",
    inputs: [
      { id: "markdownText", label: "Markdown Document Body", type: "textarea", placeholder: "# Document Title\n\nWrite your markdown text here..." },
      { id: "theme", label: "Preview Style CSS Theme", type: "dropdown", options: ["Github Light", "Dracula Dark", "Modern Slate", "Minimalist Clean"] }
    ]
  },
  {
    id: "svg-editor",
    title: "SVG Vector Editor & Color Swapper",
    name: "SVG Vector Editor & Color Swapper",
    category: "Content Creation",
    description: "Parses SVG XML directly in browser DOM to tweak colors, resize dimensions, and output clean code or PNGs.",
    inputs: [
      { id: "svgCode", label: "Raw SVG Code / XML Source", type: "textarea", placeholder: "<svg>...</svg>" },
      { id: "oldColor", label: "Old Hex Color to Replace", type: "text", placeholder: "e.g. #FF0000" },
      { id: "newColor", label: "New Hex Color", type: "text", placeholder: "e.g. #6366F1" }
    ]
  },
  {
    id: "og-generator",
    title: "Dynamic Open Graph (OG) Card Generator",
    name: "Dynamic Open Graph (OG) Card Generator",
    category: "Content Creation",
    description: "Generates social media preview images (1200x630) using Canvas with customizable templates and text wrapping.",
    inputs: [
      { id: "title", label: "Card Headline Title", type: "text", placeholder: "Enter target page headline..." },
      { id: "subtitle", label: "Subheading / Brand Text", type: "text", placeholder: "e.g. Zenovee AI Suite" },
      { id: "theme", label: "Visual Color Gradient Palette", type: "dropdown", options: ["Indigo Glow", "Sunset Orange", "Forest Emerald", "Cyberpunk Violet"] },
      { id: "authorName", label: "Author/Source Tagline", type: "text", placeholder: "e.g. By Admin" }
    ]
  },
  {
    id: "tts-audio",
    title: "Text-to-Speech & Audio File Generator",
    name: "Text-to-Speech & Audio File Generator",
    category: "Content Creation",
    description: "Converts plain text into customizable speech synthesized via the SpeechSynthesis API, downloadable as WebM audio.",
    inputs: [
      { id: "text", label: "Speech Transcription text", type: "textarea", placeholder: "Type what you want the synthesized voice to read..." },
      { id: "voice", label: "Selected Synthesizer Voice", type: "dropdown", options: ["Google US English (Male)", "Google UK English (Female)", "Microsoft David (Male)", "System Voice Default"] },
      { id: "pitch", label: "Speech Tone Pitch", type: "dropdown", options: ["0.8 (Deep)", "1.0 (Normal)", "1.2 (Higher Pitch)", "1.5 (High Voice)"] },
      { id: "speed", label: "Playback Reading Speed", type: "dropdown", options: ["0.75x (Slow)", "1.0x (Normal)", "1.25x (Flipped)", "1.5x (Fast)"] }
    ]
  },
  {
    id: "code-beautifier",
    title: "Code Snippet Image Beautifier",
    name: "Code Snippet Image Beautifier",
    category: "Content Creation",
    description: "Creates code-card images (like Carbon) using client-side syntax highlighting and custom gradient backgrounds.",
    inputs: [
      { id: "code", label: "Raw Code Snippet Block", type: "textarea", placeholder: "Paste your raw script here..." },
      { id: "language", label: "Highlighting Syntax Language", type: "dropdown", options: ["TypeScript / JavaScript", "Python", "HTML / CSS", "JSON / YAML", "Rust / Go"] },
      { id: "theme", label: "Editor Theme Scheme", type: "dropdown", options: ["Monokai Dark", "VSCode Default", "Synthwave 84", "One Light"] },
      { id: "padding", label: "Background Frame Padding", type: "dropdown", options: ["16px Minimal", "32px Balanced", "64px Maximum Container"] }
    ]
  },
  {
    id: "batch-watermarker",
    title: "Privacy-First Batch Image Watermarker",
    name: "Privacy-First Batch Image Watermarker",
    category: "Content Creation",
    description: "Stamps logos or text onto photos simultaneously using local web workers without uploading files.",
    inputs: [
      { id: "watermarkText", label: "Text Watermark Label", type: "text", placeholder: "e.g. Confidential" },
      { id: "position", label: "Watermark Stamp Position", type: "dropdown", options: ["Center Grid", "Bottom Right Corner", "Bottom Left Corner", "Top Right Corner"] },
      { id: "opacity", label: "Transparency Opacity Level", type: "dropdown", options: ["15% (Watermark Soft)", "30% (Standard)", "50% (Clear Grid)", "80% (Hard Solid)"] }
    ]
  },
  {
    id: "subtitle-editor",
    title: "Subtitle (SRT/VTT) Editor & Sync Tool",
    name: "Subtitle (SRT/VTT) Editor & Sync Tool",
    category: "Content Creation",
    description: "Audio waveform viewer using Web Audio API to trim, re-time, and clean subtitle files locally.",
    inputs: [
      { id: "subtitleContent", label: "Raw Subtitle Lines (.SRT / .VTT)", type: "textarea", placeholder: "1\n00:00:01,000 --> 00:00:04,000\nHello, World!" },
      { id: "timeOffsetMs", label: "Time Shift Offset (Milliseconds)", type: "text", placeholder: "e.g. +500 or -1000" },
      { id: "format", label: "Target Output Format", type: "dropdown", options: ["SRT Format", "WebVTT Format"] }
    ]
  },
  {
    id: "lottie-gif-extractor",
    title: "Lottie Animation & GIF Frame Extractor",
    name: "Lottie Animation & GIF Frame Extractor",
    category: "Content Creation",
    description: "Unpacks Lottie JSON or animated GIFs frame-by-frame and allows individual SVG/PNG downloads.",
    inputs: [
      { id: "extractFormat", label: "Extraction Image Format", type: "dropdown", options: ["PNG Grid Sequence", "SVG Vector Nodes"] },
      { id: "frameRate", label: "Frames Extraction Speed", type: "dropdown", options: ["Export All Frames", "Skip Every Second Frame (Lighter Grid)", "Export First & Last Only"] }
    ]
  },

  // ==========================================
  // 2. GROWTH MARKETING
  // ==========================================
  {
    id: "schema-builder",
    title: "Dynamic JSON-LD Schema Markup Builder",
    name: "Dynamic JSON-LD Schema Markup Builder",
    category: "Growth Marketing",
    description: "Interactive form generating Google-compliant schema (FAQ, HowTo, Product, Article, Local Business) with copy-paste readiness.",
    inputs: [
      { id: "schemaType", label: "Schema Type Definition", type: "dropdown", options: ["FAQ Page Schema", "HowTo Schema Builder", "Product Detail Schema", "Article/Blog Schema", "Local Business Info"] },
      { id: "name", label: "Primary Entity Name / Title", type: "text", placeholder: "e.g. Zenovee Suite" },
      { id: "url", label: "Target Entity Canonical URL", type: "text", placeholder: "https://zenovee.ai" },
      { id: "description", label: "Schema Entity Brief Description", type: "textarea", placeholder: "Add key product highlights or schema summary details..." }
    ]
  },
  {
    id: "utm-builder",
    title: "UTM Campaign Builder & Link History Manager",
    name: "UTM Campaign Builder & Link History Manager",
    category: "Growth Marketing",
    description: "Generates tagged URLs and stores past links in LocalStorage with one-click CSV export.",
    inputs: [
      { id: "url", label: "Campaign Target Destination URL", type: "text", placeholder: "https://example.com/landing" },
      { id: "source", label: "Campaign Source (utm_source)", type: "text", placeholder: "e.g. google, facebook, newsletter" },
      { id: "medium", label: "Campaign Medium (utm_medium)", type: "text", placeholder: "e.g. cpc, email, social" },
      { id: "campaign", label: "Campaign Name (utm_campaign)", type: "text", placeholder: "e.g. promo_2026" },
      { id: "term", label: "Campaign Term (utm_term, optional)", type: "text", placeholder: "e.g. custom_keywords" },
      { id: "content", label: "Campaign Content (utm_content, optional)", type: "text", placeholder: "e.g. post_button" }
    ]
  },
  {
    id: "serp-simulator",
    title: "Google & Social SERP Snippet Simulator",
    name: "Google & Social SERP Snippet Simulator",
    category: "Growth Marketing",
    description: "Real-time previewer showing how titles, descriptions, and thumbnails render on desktop, mobile, Google, and LinkedIn.",
    inputs: [
      { id: "title", label: "SEO Meta Title (Title Tag)", type: "text", placeholder: "Max 60 characters recommended..." },
      { id: "description", label: "SEO Meta Description Tag", type: "textarea", placeholder: "Max 160 characters recommended for description snippet..." },
      { id: "url", label: "Display Destination URL Link", type: "text", placeholder: "https://example.com/blog-post" }
    ]
  },
  {
    id: "robots-sitemap-builder",
    title: "Robots.txt & XML Sitemap Builder/Validator",
    name: "Robots.txt & XML Sitemap Builder/Validator",
    category: "Growth Marketing",
    description: "Generates clean sitemaps and tests robots.txt rules against custom URL paths using pure JS logic.",
    inputs: [
      { id: "domainUrl", label: "Target Domain Canonical URL", type: "text", placeholder: "https://zenovee.ai" },
      { id: "disallowRules", label: "Disallowed Paths (One per line)", type: "textarea", placeholder: "/api/\n/admin/\n/private/" },
      { id: "allowRules", label: "Explicitly Allowed Paths (One per line)", type: "textarea", placeholder: "/static/\n/assets/" },
      { id: "sitemapUrls", label: "Sitemap URLs to include (One per line)", type: "textarea", placeholder: "/features\n/about\n/dashboard" }
    ]
  },
  {
    id: "og-tag-generator",
    title: "Open Graph & Twitter Card Meta Tag Generator",
    name: "Open Graph & Twitter Card Meta Tag Generator",
    category: "Growth Marketing",
    description: "Interactive generator that previews and outputs header tags for HTML insertion.",
    inputs: [
      { id: "title", label: "Social Card Title Label", type: "text", placeholder: "e.g. Zenovee Suite - Web Utility Platform" },
      { id: "description", label: "Social Card Description Tag", type: "textarea", placeholder: "Short summary for Facebook/Twitter index..." },
      { id: "siteName", label: "Global Brand Site Name", type: "text", placeholder: "e.g. Zenovee AI" },
      { id: "siteUrl", label: "Canonical URL Link", type: "text", placeholder: "https://zenovee.ai" },
      { id: "image", label: "OG Card Image URL Path", type: "text", placeholder: "https://zenovee.ai/og-card.png" }
    ]
  },
  
  {
    id: "email-signature",
    title: "Client-Side HTML Email Signature Generator",
    name: "Client-Side HTML Email Signature Generator",
    category: "Growth Marketing",
    description: "Form builder creating responsive, inline-styled HTML signatures with live preview and past signature persistence.",
    inputs: [
      { id: "fullName", label: "Sender Full Name", type: "text", placeholder: "e.g. Jane Doe" },
      { id: "jobTitle", label: "Sender Professional Role", type: "text", placeholder: "e.g. VP Marketing" },
      { id: "company", label: "Company / Workspace Name", type: "text", placeholder: "e.g. Zenovee Softwares" },
      { id: "phone", label: "Office Contact Number", type: "text", placeholder: "e.g. +1 555 123 4567" },
      { id: "email", label: "Sender Professional Email", type: "text", placeholder: "jane@company.com" },
      { id: "logoUrl", label: "Profile Picture / Logo URL", type: "text", placeholder: "https://example.com/logo.png" }
    ]
  },
  {
    id: "qr-studio",
    title: "Custom QR Code Studio",
    name: "Custom QR Code Studio",
    category: "Growth Marketing",
    description: "Generates vector/raster QR codes with embedded logos, custom gradients, and error-correction control (qrcode.js).",
    inputs: [
      { id: "text", label: "Target URL / Raw Data Payload", type: "text", placeholder: "https://zenovee.ai" },
      { id: "fgColor", label: "QR Block Hex Color", type: "text", placeholder: "e.g. #000000" },
      { id: "errorCorrection", label: "Error Correction Capability Level", type: "dropdown", options: ["High (30% Restorable)", "Quartile (25%)", "Medium (15% Normal)", "Low (7% Compact)"] }
    ]
  },
  {
    id: "keyword-density",
    title: "On-Page Keyword Density & Frequency Analyzer",
    name: "On-Page Keyword Density & Frequency Analyzer",
    category: "Growth Marketing",
    description: "Parses raw HTML/text to calculate 1/2/3-word phrase density and stop-word filtering locally.",
    inputs: [
      { id: "htmlText", label: "Document Source HTML / Text Block", type: "textarea", placeholder: "Paste raw article html or copy text here..." },
      { id: "stopWords", label: "Stop-Words Language Dictionary", type: "dropdown", options: ["English Dictionary Filters", "Spanish Filters", "Disable Filters (Extract All Words)"] }
    ]
  },
  {
    id: "social-formatter",
    title: "Social Media Formatting & Character Matrix",
    name: "Social Media Formatting & Character Matrix",
    category: "Growth Marketing",
    description: "Auto-formats text with custom unicode fonts (bold, italic, script) while checking character limits for X, LinkedIn, and Instagram.",
    inputs: [
      { id: "text", label: "Social Copywriting Draft", type: "textarea", placeholder: "Write draft text here..." },
      { id: "style", label: "Unicode Transformation Style", type: "dropdown", options: ["Bold Sans", "Bold Serif", "Italic Serif", "Monospace Coding", "Underlined Bold"] }
    ]
  },

  // ==========================================
  // 3. PRODUCTIVITY SOLVERS
  // ==========================================
  {
    id: "pdf-merger",
    title: "Offline PDF Merger, Splitter & Reorder",
    name: "Offline PDF Merger, Splitter & Reorder",
    category: "Productivity Solvers",
    description: "Re-arranges, merges, and extracts PDF pages locally using pdf-lib.",
    inputs: [
      { id: "operation", label: "PDF Operation Mode", type: "dropdown", options: ["Merge PDFs", "Split PDF Pages", "Reorder Individual Pages"] },
      { id: "pagesRange", label: "Pages range to split/reorder", type: "text", placeholder: "e.g. 1-3, 5, 7-10" }
    ]
  },
  {
    id: "ocr-extractor",
    title: "Browser OCR / Image Text Extractor",
    name: "Browser OCR / Image Text Extractor",
    category: "Productivity Solvers",
    description: "Converts scanned documents and photos into selectable text using Tesseract.js (WebAssembly OCR).",
    inputs: [
      { id: "language", label: "OCR Character Recognition Language", type: "dropdown", options: ["English", "Spanish", "French", "German", "Japanese"] }
    ]
  },
  {
    id: "media-trimmer",
    title: "Audio/Video Trimmer & Format Converter",
    name: "Audio/Video Trimmer & Format Converter",
    category: "Productivity Solvers",
    description: "Trims and converts media formats locally via FFmpeg.wasm (pure client-side media processing).",
    inputs: [
      { id: "startTime", label: "Trim Start Time Code (HH:MM:SS)", type: "text", placeholder: "e.g. 00:00:10" },
      { id: "endTime", label: "Trim End Time Code (HH:MM:SS)", type: "text", placeholder: "e.g. 00:00:45" },
      { id: "targetFormat", label: "Target Output Media Format", type: "dropdown", options: ["MP4 (Video)", "WebM (Video)", "MP3 (Audio)", "WAV (Audio)"] }
    ]
  },
  {
    id: "pomodoro-tracker",
    title: "Pomodoro & Habit Analytics Dashboard",
    name: "Pomodoro & Habit Analytics Dashboard",
    category: "Productivity Solvers",
    description: "Full productivity suite with native browser notifications, customizable timers, and local data persistence via IndexedDB.",
    inputs: [
      { id: "workDuration", label: "Focus Work Session Duration", type: "dropdown", options: ["25 Minutes", "50 Minutes", "90 Minutes Max"] },
      { id: "breakDuration", label: "Short Break Interval", type: "dropdown", options: ["5 Minutes", "10 Minutes", "15 Minutes"] },
      { id: "taskLabel", label: "Associated Session Task Tag", type: "text", placeholder: "e.g. coding features" }
    ]
  },
  {
    id: "file-hash",
    title: "Universal File Hash Generator",
    name: "Universal File Hash Generator",
    category: "Productivity Solvers",
    description: "Calculates SHA-256, SHA-512, MD5, and CRC32 checksums for massive files locally via the browser's Web Crypto API.",
    inputs: [
      { id: "algorithm", label: "Cryptographic Hash Algorithm", type: "dropdown", options: ["SHA-256 (Secure)", "SHA-512 (Extended)", "MD5 (Legacy Compatibility)", "CRC32 (Speed Check)"] }
    ]
  },
  {
    id: "screen-recorder",
    title: "Browser Screen & Webcam Recorder",
    name: "Browser Screen & Webcam Recorder",
    category: "Productivity Solvers",
    description: "Records desktop, tab, or webcam with audio using MediaRecorder API and exports WebM/MP4 directly to disk.",
    inputs: [
      { id: "source", label: "Capture Frame Input Source", type: "dropdown", options: ["Screen Share Capture", "Webcam Device Capture", "Screen + Webcam Overlay"] },
      { id: "audio", label: "Audio Capture Input Options", type: "dropdown", options: ["Include Microphone Audio Only", "Include System Audio + Microphone", "Mute Audio Channels"] }
    ]
  },
  {
    id: "timezone-scheduler",
    title: "Multi-Timezone Interactive Meeting Scheduler",
    name: "Multi-Timezone Interactive Meeting Scheduler",
    category: "Productivity Solvers",
    description: "Visual overlap planner converting working hours across world cities using native browser Intl APIs.",
    inputs: [
      { id: "meetingDate", label: "Meeting Calendar Date", type: "text", placeholder: "e.g. 2026-08-15" },
      { id: "hostTimezone", label: "Host Location Timezone", type: "dropdown", options: ["UTC", "America/New_York (EST)", "Europe/London (GMT)", "Asia/Kolkata (IST)", "Asia/Tokyo (JST)", "Australia/Sydney"] },
      { id: "guestTimezones", label: "Guest Target Location Timezones (Comma separated)", type: "text", placeholder: "e.g. America/New_York, Europe/London" }
    ]
  },
  {
    id: "markdown-kanban",
    title: "Client-Side Markdown Kanban Board",
    name: "Client-Side Markdown Kanban Board",
    category: "Productivity Solvers",
    description: "Trello-like board storing columns and cards in IndexedDB with full JSON backup/restore capabilities.",
    inputs: [
      { id: "boardJson", label: "Restore Kanban Board JSON Schema", type: "textarea", placeholder: '{"columns": [{"title": "To Do", "cards": []}]}' },
      { id: "boardAction", label: "Active Modification Operation", type: "dropdown", options: ["Load Board from JSON", "Export Board JSON Backup", "Reset Board Layout to Default"] }
    ]
  },
  {
    id: "voice-transcriber",
    title: "Voice Note Transcriber & Audio Dictation",
    name: "Voice Note Transcriber & Audio Dictation",
    category: "Productivity Solvers",
    description: "Real-time continuous speech-to-text transcriber leveraging the native browser SpeechRecognition API.",
    inputs: [
      { id: "language", label: "Dictation Dictation Language", type: "dropdown", options: ["English (US)", "Spanish (ES)", "French (FR)", "German (DE)"] },
      { id: "recordingMode", label: "Continuous Audio Streaming Mode", type: "dropdown", options: ["Continuous Dictation", "Quick Note Sentences (Stops on silence)"] }
    ]
  },
  {
    id: "mime-inspector",
    title: "File Header & MIME Type Inspector",
    name: "File Header & MIME Type Inspector",
    category: "Productivity Solvers",
    description: "Reads binary byte signatures (Magic Numbers) of any file via FileReader to reveal true file extensions and hex dumps.",
    inputs: [
      { id: "inspectFile", label: "Target File to Inspect", type: "file" },
      { id: "dumpBytes", label: "Hexadecimal Output Length", type: "dropdown", options: ["First 128 Bytes", "First 512 Bytes", "First 1024 Bytes Entire Header"] }
    ]
  },

  // ==========================================
  // 4. FINANCIAL CALCULATORS
  // ==========================================
  {
    id: "fire-calculator",
    title: "FIRE (Financial Independence) Retirement Calculator",
    name: "FIRE (Financial Independence) Retirement Calculator",
    category: "Financial Calculators",
    description: "Simulates inflation-adjusted retirement timelines with dynamic interactive charts using Chart.js.",
    inputs: [
      { id: "currentAge", label: "Current Age", type: "text", placeholder: "e.g. 25" },
      { id: "targetAge", label: "Desired Retirement Target Age", type: "text", placeholder: "e.g. 45" },
      { id: "annualExpenses", label: "Expected Annual Expenses in Retirement ($)", type: "text", placeholder: "e.g. 60000" },
      { id: "currentSavings", label: "Current Invested Savings ($)", type: "text", placeholder: "e.g. 100000" },
      { id: "annualSavings", label: "Annual Regular New Investment ($)", type: "text", placeholder: "e.g. 24000" },
      { id: "returnRate", label: "Assumed Investment Annual Growth Rate (%)", type: "text", placeholder: "e.g. 8.0" }
    ]
  },
  {
    id: "mortgage-amortization",
    title: "Loan & Mortgage Amortization Schedule Engine",
    name: "Loan & Mortgage Amortization Schedule Engine",
    category: "Financial Calculators",
    description: "Computes monthly breakdown tables, extra principal payments, and total interest graphs in real time.",
    inputs: [
      { id: "loanAmount", label: "Loan Amount ($)", type: "text", placeholder: "e.g. 400000" },
      { id: "loanTermYears", label: "Mortgage Loan Duration (Years)", type: "text", placeholder: "e.g. 30" },
      { id: "interestRate", label: "Annual Loan Interest Rate (%)", type: "text", placeholder: "e.g. 6.5" },
      { id: "extraMonthlyPayment", label: "Optional Extra Monthly Principal Payoff ($)", type: "text", placeholder: "e.g. 200" }
    ]
  },
  {
    id: "compound-interest",
    title: "Compound Interest & DRIP Investment Simulator",
    name: "Compound Interest & DRIP Investment Simulator",
    category: "Financial Calculators",
    description: "Calculates compounding daily/monthly/yearly growth with recurring deposit schedules and breakdown matrices.",
    inputs: [
      { id: "principal", label: "Initial Investment Capital ($)", type: "text", placeholder: "e.g. 10000" },
      { id: "monthlyContribution", label: "Additional Monthly Deposit ($)", type: "text", placeholder: "e.g. 500" },
      { id: "annualRate", label: "Estimated Annual Percentage Yield (%)", type: "text", placeholder: "e.g. 7.5" },
      { id: "compoundFrequency", label: "Compound Frequency Interval", type: "dropdown", options: ["Monthly Compound", "Annual Compound", "Daily Compound"] },
      { id: "periodYears", label: "Total Length of Growth Time (Years)", type: "text", placeholder: "e.g. 20" }
    ]
  },
  {
    id: "freelance-rate",
    title: "Freelance Rate & Value-Based Pricing Calculator",
    name: "Freelance Rate & Value-Based Pricing Calculator",
    category: "Financial Calculators",
    description: "Factors overhead expenses, desired income, billable hours, and tax estimates to derive minimum hourly/project rates.",
    inputs: [
      { id: "targetIncome", label: "Target Annual Net Take-Home Salary ($)", type: "text", placeholder: "e.g. 80000" },
      { id: "overhead", label: "Annual Business Overhead Expenses ($)", type: "text", placeholder: "e.g. 12000" },
      { id: "billableHoursPerWeek", label: "Target Productive Billable Hours per Week", type: "text", placeholder: "e.g. 25" },
      { id: "vacationWeeks", label: "Unpaid Vacation / Sick Time Weeks per Year", type: "text", placeholder: "e.g. 4" }
    ]
  },
  {
    id: "saas-forecaster",
    title: "SaaS LTV, CAC & Churn Modeling Dashboard",
    name: "SaaS LTV, CAC & Churn Modeling Dashboard",
    category: "Financial Calculators",
    description: "Interactive unit economics simulator projecting MRR, customer lifetime value, and pay-back periods.",
    inputs: [
      { id: "mrr", label: "Current Monthly Recurring Revenue ($)", type: "text", placeholder: "e.g. 50000" },
      { id: "churnRate", label: "Monthly Customer Churn Rate (%)", type: "text", placeholder: "e.g. 3.5" },
      { id: "cac", label: "Customer Acquisition Cost ($)", type: "text", placeholder: "e.g. 150" },
      { id: "arpu", label: "Average Revenue Per User/Account ($)", type: "text", placeholder: "e.g. 49" }
    ]
  },
  {
    id: "debt-planner",
    title: "Debt Snowball vs. Avalanche Payoff Planner",
    name: "Debt Snowball vs. Avalanche Payoff Planner",
    category: "Financial Calculators",
    description: "Visual payoff timeline comparing total interest saved using Snowball vs. Avalanche strategies.",
    inputs: [
      { id: "debtsList", label: "List of Outstanding Debts (Label: Balance, Rate, Min Payment)", type: "textarea", placeholder: "Credit Card: 5000, 18%, 150\nStudent Loan: 15000, 4.5%, 200" },
      { id: "extraPayment", label: "Additional Monthly Snowball Allocation ($)", type: "text", placeholder: "e.g. 300" }
    ]
  },
  {
    id: "portfolio-rebalance",
    title: "Crypto / Stock Portfolio Rebalancing Matrix",
    name: "Crypto / Stock Portfolio Rebalancing Matrix",
    category: "Financial Calculators",
    description: "Calculates target asset allocation adjustments and trade execution quantities based on target percentages.",
    inputs: [
      { id: "assetsJson", label: "Current Assets Allocation Array JSON", type: "textarea", placeholder: '[\n  {"name": "BTC", "value": 8000, "target": 50},\n  {"name": "ETH", "value": 2000, "target": 50}\n]' }
    ]
  },
  {
    id: "salary-tax",
    title: "Net Salary Take-Home Tax Calculator",
    name: "Net Salary Take-Home Tax Calculator",
    category: "Financial Calculators",
    description: "Configurable regional tax bracket sliders calculating net income, marginal rates, and deduction breakdowns.",
    inputs: [
      { id: "annualGross", label: "Annual Gross Basic Salary ($)", type: "text", placeholder: "e.g. 90000" },
      { id: "region", label: "Tax Jurisdiction Region", type: "dropdown", options: ["US Federal Brackets", "United Kingdom (PAYE)", "Canada Provincial Average"] },
      { id: "deductions", label: "Pre-Tax Retirement Deductions ($)", type: "text", placeholder: "e.g. 6000" }
    ]
  },
  {
    id: "inflation-calculator",
    title: "Inflation & Purchasing Power Time Machine",
    name: "Inflation & Purchasing Power Time Machine",
    category: "Financial Calculators",
    description: "Historical purchasing power calculator evaluating currency depreciation over customizable timeframes.",
    inputs: [
      { id: "startAmount", label: "Initial Cash Amount ($)", type: "text", placeholder: "e.g. 1000" },
      { id: "startYear", label: "Historical Start Year", type: "text", placeholder: "e.g. 1990" },
      { id: "endYear", label: "Comparison Target Year", type: "text", placeholder: "e.g. 2026" }
    ]
  },
  {
    id: "real-estate-analyzer",
    title: "Real Estate Cap Rate & Cash Flow Analyzer",
    name: "Real Estate Cap Rate & Cash Flow Analyzer",
    category: "Financial Calculators",
    description: "Commercial/residential rental property analyzer computing Cash-on-Cash return, NOI, and Cap Rate.",
    inputs: [
      { id: "purchasePrice", label: "Property Purchase Price ($)", type: "text", placeholder: "e.g. 350000" },
      { id: "downPaymentPercent", label: "Down Payment percentage (%)", type: "text", placeholder: "e.g. 20" },
      { id: "monthlyRent", label: "Projected Gross Monthly Rent Income ($)", type: "text", placeholder: "e.g. 2500" },
      { id: "annualExpenses", label: "Assumed Annual Maintenance, Tax & Insurance ($)", type: "text", placeholder: "e.g. 8000" }
    ]
  },

  // ==========================================
  // 5. DATA & TECH UTILITIES
  // ==========================================
  {
    id: "json-formatter",
    title: "JSON Formatter, Validator, Diff & Tree Visualizer",
    name: "JSON Formatter, Validator, Diff & Tree Visualizer",
    category: "Data & Tech Utilities",
    description: "Prettifies, validates, diffs two JSON files, and renders interactive collapsible DOM trees.",
    inputs: [
      { id: "jsonText1", label: "Primary JSON Document", type: "textarea", placeholder: '{"status": "ok", "items": [1, 2]}' },
      { id: "jsonText2", label: "Secondary JSON (For Diff Comparisons)", type: "textarea", placeholder: '{"status": "ok", "items": [1, 2, 3]}' },
      { id: "mode", label: "Processing Mode", type: "dropdown", options: ["Format & Validate Main JSON", "Compare Diffs Side-By-Side"] }
    ]
  },
  {
    id: "jwt-decoder",
    title: "JWT (JSON Web Token) & Base64 Encoder/Decoder",
    name: "JWT (JSON Web Token) & Base64 Encoder/Decoder",
    category: "Data & Tech Utilities",
    description: "Inspects JWT headers, payloads, and signatures locally using Web Crypto without sending tokens over the wire.",
    inputs: [
      { id: "jwt", label: "Raw JSON Web Token (JWT) string", type: "textarea", placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ..." }
    ]
  },
  {
    id: "regex-tester",
    title: "Regex Tester & Syntax Debugger",
    name: "Regex Tester & Syntax Debugger",
    category: "Data & Tech Utilities",
    description: "Real-time regular expression tester with syntax highlighting, flag toggles, and match group breakdowns.",
    inputs: [
      { id: "regexPattern", label: "Regex Expression Pattern", type: "text", placeholder: "e.g. ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$" },
      { id: "testString", label: "Test Subject String String", type: "textarea", placeholder: "Enter strings here to check regular expression matches..." },
      { id: "flags", label: "Global Regex Match Flags", type: "text", placeholder: "e.g. g, i, m" }
    ]
  },
  {
    id: "css-playground",
    title: "CSS Flexbox & CSS Grid Playground",
    name: "CSS Flexbox & CSS Grid Playground",
    category: "Data & Tech Utilities",
    description: "Visual layout generator that lets developers drag/resize containers and outputs clean CSS code.",
    inputs: [
      { id: "layoutType", label: "Target Layout Model", type: "dropdown", options: ["Flexbox Row", "Flexbox Column", "Grid 3x3 layout", "Grid Custom"] },
      { id: "gap", label: "Padding Items Gap (Pixels)", type: "text", placeholder: "e.g. 16px" },
      { id: "itemsCount", label: "Number of Child Item Blocks", type: "text", placeholder: "e.g. 6" }
    ]
  },
  {
    id: "sqlite-studio",
    title: "In-Browser SQLite Database Studio",
    name: "In-Browser SQLite Database Studio",
    category: "Data & Tech Utilities",
    description: "Runs full SQL queries against uploadable .sqlite files inside the browser via sql.js (WebAssembly).",
    inputs: [
      { id: "sqliteFile", label: "SQLite Database File (.db/.sqlite)", type: "file" },
      { id: "sqlQuery", label: "SQL Execution Query Command", type: "textarea", placeholder: "SELECT * FROM sqlite_master;" }
    ]
  },
  {
    id: "color-contrast",
    title: "Color Palette & WCAG 2.1 Contrast Checker",
    name: "Color Palette & WCAG 2.1 Contrast Checker",
    category: "Data & Tech Utilities",
    description: "Hex/RGB/HSL picker checking contrast accessibility ratios against Web Content Accessibility Guidelines.",
    inputs: [
      { id: "bgColor", label: "Background Hex Color", type: "text", placeholder: "e.g. #FFFFFF" },
      { id: "fgColor", label: "Foreground Text Hex Color", type: "text", placeholder: "e.g. #4F46E5" }
    ]
  },
  {
    id: "cron-humanizer",
    title: "Cron Expression Parser & Humanizer",
    name: "Cron Expression Parser & Humanizer",
    category: "Data & Tech Utilities",
    description: "Translates Cron syntax into plain language (e.g., \"At 05:00 on every Sunday\") and predicts the next 10 execution dates.",
    inputs: [
      { id: "cron", label: "Cron Expression string", type: "text", placeholder: "e.g. */5 * * * *" }
    ]
  },
  {
    id: "csv-converter",
    title: "CSV / TSV to JSON / XML / YAML Converter",
    name: "CSV / TSV to JSON / XML / YAML Converter",
    category: "Data & Tech Utilities",
    description: "Parses massive CSV files locally using streaming parsers (PapaParse) and exports structured formats.",
    inputs: [
      { id: "csvText", label: "Raw CSV File Content", type: "textarea", placeholder: "name,role,email\nJane,VP,jane@example.com" },
      { id: "outputFormat", label: "Target Output Structure Format", type: "dropdown", options: ["JSON Array Struct", "XML Document Nodes", "YAML Block Document"] }
    ]
  },
  {
    id: "password-generator",
    title: "Cryptographically Secure Password & Passphrase Generator",
    name: "Cryptographically Secure Password & Passphrase Generator",
    category: "Data & Tech Utilities",
    description: "Generates high-entropy passwords using window.crypto.getRandomValues() with customizable complexity.",
    inputs: [
      { id: "length", label: "Target Password Length (Characters)", type: "text", placeholder: "e.g. 16" },
      { id: "includeNumbers", label: "Include Number Blocks (0-9)", type: "dropdown", options: ["Yes, Include numbers", "No numbers"] },
      { id: "includeSpecial", label: "Include Special Symbols (!@#$)", type: "dropdown", options: ["Yes, Include special characters", "No symbols"] }
    ]
  },
  {
    id: "uuid-generator",
    title: "UUID, ULID & NanoID Batch Generator",
    name: "UUID, ULID & NanoID Batch Generator",
    category: "Data & Tech Utilities",
    description: "Generates hundreds of unique identifiers (v4, v5, ULIDs) instantly in browser memory.",
    inputs: [
      { id: "count", label: "Total Identifiers Generation Count", type: "text", placeholder: "e.g. 100" },
      { id: "idType", label: "Identifier Protocol Standard", type: "dropdown", options: ["UUID v4 (Standard Cryptographic)", "ULID (Time-sortable)", "NanoID (Compact Web Unique)"] },
      { id: "uppercase", label: "Letter Case Output Style", type: "dropdown", options: ["lowercase format", "UPPERCASE FORMAT"] }
    ]
  },
  {
    id: "ip-lookup",
    title: "My IP Address & Network Geolocation Lookup",
    name: "My IP Address & Network Geolocation Lookup",
    category: "Network & IP Utilities",
    description: "Fetches public IP address, ISP, ASN, country, city, and connection parameters using client-side APIs.",
    inputs: [
      { id: "targetIp", label: "Target IP Address (leave blank for your IP)", type: "text", placeholder: "e.g. 8.8.8.8" }
    ]
  },
  {
    id: "dns-propagation",
    title: "DNS Propagation Checker",
    name: "DNS Propagation Checker",
    category: "Network & IP Utilities",
    description: "Queries DNS record propagation (A, AAAA, CNAME, MX, TXT) across global resolvers.",
    inputs: [
      { id: "domain", label: "Target Domain Name", type: "text", placeholder: "e.g. example.com" },
      { id: "type", label: "DNS Record Type", type: "dropdown", options: ["A", "AAAA", "CNAME", "MX", "TXT", "NS"] }
    ]
  },
  {
    id: "ping-tester",
    title: "Client-Side Ping & Latency Tester",
    name: "Client-Side Ping & Latency Tester",
    category: "Network & IP Utilities",
    description: "Measures round-trip response latency, HTTP timing, and packet jitter to target Web endpoints.",
    inputs: [
      { id: "endpoint", label: "Target Host URL", type: "text", placeholder: "e.g. https://cloudflare.com" },
      { id: "count", label: "Ping Packets Count", type: "dropdown", options: ["5 Packets", "10 Packets", "20 Packets"] }
    ]
  },
  {
    id: "port-scanner",
    title: "Port Scanner Tool UI",
    name: "Port Scanner Tool UI",
    category: "Network & IP Utilities",
    description: "Checks common Web, WebSocket, and service ports on target hosts.",
    inputs: [
      { id: "host", label: "Target Host / IP", type: "text", placeholder: "e.g. 127.0.0.1 or example.com" },
      { id: "ports", label: "Target Ports to Scan", type: "text", placeholder: "e.g. 80, 443, 8080, 22, 3306" }
    ]
  },
  {
    id: "ssl-checker",
    title: "SSL Certificate Expiry Checker UI",
    name: "SSL Certificate Expiry Checker UI",
    category: "Network & IP Utilities",
    description: "Inspects SSL/TLS certificate health, expiration countdown, issuer, and SAN domains.",
    inputs: [
      { id: "domain", label: "Target Domain Name", type: "text", placeholder: "e.g. example.com" }
    ]
  },
  {
    id: "mac-vendor",
    title: "MAC Address Lookup Vendor Tool",
    name: "MAC Address Lookup Vendor Tool",
    category: "Network & IP Utilities",
    description: "Parses 6-digit OUI prefixes against IEEE registered hardware vendors.",
    inputs: [
      { id: "mac", label: "Hardware MAC Address", type: "text", placeholder: "e.g. 00:1A:2B:3C:4D:5E" }
    ]
  },
  {
    id: "cidr-calculator",
    title: "Subnet / CIDR Calculator",
    name: "Subnet / CIDR Calculator",
    category: "Network & IP Utilities",
    description: "Calculates IP ranges, netmask, wildcard mask, broadcast address, and host capacities.",
    inputs: [
      { id: "ip", label: "IP Address", type: "text", placeholder: "e.g. 192.168.1.1" },
      { id: "cidr", label: "Subnet Prefix / CIDR", type: "dropdown", options: ["/24 (255.255.255.0)", "/16 (255.255.0.0)", "/28 (255.255.255.240)", "/30 (255.255.255.252)"] }
    ]
  },
  {
    id: "header-inspector",
    title: "HTTP Header Inspector",
    name: "HTTP Header Inspector",
    category: "Network & IP Utilities",
    description: "Inspects HTTP response headers, CORS policies, security flags, and client navigator parameters.",
    inputs: [
      { id: "url", label: "Target Request URL", type: "text", placeholder: "e.g. https://httpbin.org/headers" }
    ]
  },
  {
    id: "speed-test",
    title: "Client-Side Network Speed Test Widget",
    name: "Client-Side Network Speed Test Widget",
    category: "Network & IP Utilities",
    description: "Downloads payload chunks in browser memory to measure download throughput and latency.",
    inputs: [
      { id: "chunkSize", label: "Download Test Payload Size", type: "dropdown", options: ["5 MB Payload", "10 MB Payload", "25 MB Payload"] }
    ]
  },
  {
    id: "whois-lookup",
    title: "Whois Domain Lookup UI",
    name: "Whois Domain Lookup UI",
    category: "Network & IP Utilities",
    description: "Queries domain registration metadata, expiration dates, registrar, and nameservers via RDAP.",
    inputs: [
      { id: "domain", label: "Target Domain Name", type: "text", placeholder: "e.g. example.com" }
    ]
  },
  
  {
    id: "url-encoder-decoder",
    title: "URL Encoder / Decoder",
    name: "URL Encoder / Decoder",
    category: "Converters & Encoders",
    description: "Converts special characters to URL-safe percent-encoding or decodes URL strings.",
    inputs: [
      { id: "urlText", label: "URL String / Parameter Text", type: "textarea", placeholder: "https://example.com/search?q=hello world & test=100%" },
      { id: "mode", label: "Action Mode", type: "dropdown", options: ["URL Encode (encodeURIComponent)", "URL Decode (decodeURIComponent)"] }
    ]
  },
  
  {
    id: "xml-to-json",
    title: "XML to JSON Converter",
    name: "XML to JSON Converter",
    category: "Converters & Encoders",
    description: "Parses XML documents using browser DOMParser and converts XML trees into JSON objects.",
    inputs: [
      { id: "xmlInput", label: "XML Code Payload", type: "textarea", placeholder: "<user>\n  <name>Jane Doe</name>\n  <role>Engineer</role>\n</user>" }
    ]
  },
  
  {
    id: "color-code-converter",
    title: "Color Code Converter (HEX, RGB, HSL, CMYK)",
    name: "Color Code Converter (HEX, RGB, HSL, CMYK)",
    category: "Converters & Encoders",
    description: "Converts Hex color codes to RGB, HSL, and CMYK with instant validation.",
    inputs: [
      { id: "hex", label: "Hex Color Code", type: "text", placeholder: "e.g. #4F46E5 or #FFF" }
    ]
  },
  {
    id: "unix-timestamp-converter",
    title: "Unix Timestamp to Human Date Converter",
    name: "Unix Timestamp to Human Date Converter",
    category: "Converters & Encoders",
    description: "Converts epoch timestamps (seconds/ms) to UTC, Local Time, and ISO 8601.",
    inputs: [
      { id: "timestamp", label: "Unix Timestamp (seconds or ms)", type: "text", placeholder: "e.g. 1772275200" }
    ]
  },
  {
    id: "yaml-to-json",
    title: "YAML to JSON Converter",
    name: "YAML to JSON Converter",
    category: "Converters & Encoders",
    description: "Parses YAML key-value structures into indented JSON objects.",
    inputs: [
      { id: "yamlInput", label: "YAML Syntax Code", type: "textarea", placeholder: "title: 50+ Tools\nversion: 1.0" }
    ]
  },
  {
    id: "multi-unit-converter",
    title: "Multi-Unit Converter (Mass, Length, Temp, Volume)",
    name: "Multi-Unit Converter (Mass, Length, Temp, Volume)",
    category: "Converters & Encoders",
    description: "Converts values across Metric and Imperial measurement systems.",
    inputs: [
      { id: "val", label: "Numeric Value", type: "text", placeholder: "e.g. 100" },
      { id: "category", label: "Unit Category", type: "dropdown", options: ["Length (Meters/Feet)", "Mass (Kg/Pounds)", "Temperature (C/F)"] }
    ]
  },
  {
    id: "live-currency-calculator",
    title: "Live Currency Calculator",
    name: "Live Currency Calculator",
    category: "Converters & Encoders",
    description: "Calculates currency exchange rates across USD, EUR, GBP, INR, JPY, and CAD.",
    inputs: [
      { id: "amount", label: "Currency Amount", type: "text", placeholder: "e.g. 100" },
      { id: "from", label: "From Currency", type: "dropdown", options: ["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)", "JPY (¥)"] },
      { id: "to", label: "To Currency", type: "dropdown", options: ["EUR (€)", "USD ($)", "GBP (£)", "INR (₹)", "JPY (¥)"] }
    ]
  },
  {
    id: "json-minifier-beautifier",
    title: "JSON Minifier & Beautifier",
    name: "JSON Minifier & Beautifier",
    category: "Text & Code Formatters",
    description: "Formats JSON documents with 2 or 4 space indentation or minifies into a single compact line.",
    inputs: [
      { id: "jsonCode", label: "JSON Code Input", type: "textarea", placeholder: '{"name":"Zenovee","tools":50,"status":"active"}' },
      { id: "formatMode", label: "Format Mode", type: "dropdown", options: ["Beautify (2 Spaces)", "Beautify (4 Spaces)", "Minify (Compact One-Line)"] }
    ]
  },
  {
    id: "sql-formatter",
    title: "SQL Query Formatter / Beautifier",
    name: "SQL Query Formatter / Beautifier",
    category: "Text & Code Formatters",
    description: "Formats raw SQL queries with proper line breaks and capitalized SQL keywords.",
    inputs: [
      { id: "sqlText", label: "Raw SQL Query", type: "textarea", placeholder: "select id,name,email from users where status='active' group by id order by id desc limit 10;" }
    ]
  },
  {
    id: "html-minifier",
    title: "HTML Minifier & Whitespace Stripper",
    name: "HTML Minifier & Whitespace Stripper",
    category: "Text & Code Formatters",
    description: "Strips HTML comments, redundant whitespace, and newlines for optimized page loading.",
    inputs: [
      { id: "htmlCode", label: "HTML Source Code", type: "textarea", placeholder: '<!-- Comment -->\n<div class="card">\n   <h1>  Title  </h1>\n</div>' }
    ]
  },
  {
    id: "css-js-compressor",
    title: "CSS / JS Code Compressor",
    name: "CSS / JS Code Compressor",
    category: "Text & Code Formatters",
    description: "Compresses CSS rules and JavaScript code by stripping comments and whitespace.",
    inputs: [
      { id: "code", label: "Source Code Snippet", type: "textarea", placeholder: "/* Primary Card Style */\n.card {\n  color: #333;\n  padding: 16px;\n}" },
      { id: "lang", label: "Code Language", type: "dropdown", options: ["CSS Stylesheet", "JavaScript Code"] }
    ]
  },
  {
    id: "regex-tester-live",
    title: "Regex Pattern Matcher & Tester",
    name: "Regex Pattern Matcher & Tester",
    category: "Text & Code Formatters",
    description: "Tests regular expressions against sample text strings with match counts and capture groups.",
    inputs: [
      { id: "pattern", label: "Regex Pattern (without slashes)", type: "text", placeholder: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
      { id: "flags", label: "Regex Flags", type: "dropdown", options: ["g (Global)", "gi (Global + Case-Insensitive)", "gim (Global + Multiline)"] },
      { id: "testText", label: "Test String Text", type: "textarea", placeholder: "Contact us at support@example.com or sales@test.org for info." }
    ]
  },
  {
    id: "text-diff-checker",
    title: "Text Diff Checker & Visual Comparison",
    name: "Text Diff Checker & Visual Comparison",
    category: "Text & Code Formatters",
    description: "Compares two text versions line-by-line and highlights added or removed text.",
    inputs: [
      { id: "textA", label: "Original Text (Version A)", type: "textarea", placeholder: "Line 1: Hello World\nLine 2: Fast client side tools" },
      { id: "textB", label: "Modified Text (Version B)", type: "textarea", placeholder: "Line 1: Hello World!\nLine 2: 50+ Fast client side tools\nLine 3: Added new line" }
    ]
  },
  
  
  {
    id: "text-stats-counter",
    title: "Word, Character, and Paragraph Counter",
    name: "Word, Character, and Paragraph Counter",
    category: "Text & Code Formatters",
    description: "Calculates real-time word count, character count, sentence count, and reading time metrics.",
    inputs: [
      { id: "text", label: "Document Content", type: "textarea", placeholder: "Type or paste document text here..." }
    ]
  },
  {
    id: "url-slug-generator",
    title: "URL Slug Generator",
    name: "URL Slug Generator",
    category: "Text & Code Formatters",
    description: "Converts article headlines and titles into clean, SEO-friendly URL slugs.",
    inputs: [
      { id: "title", label: "Headline / Article Title", type: "text", placeholder: "How to Build 50+ Fast Client-Side Tools in 2026!" },
      { id: "separator", label: "Word Separator", type: "dropdown", options: ["Hyphen (-)", "Underscore (_)"] }
    ]
  },
  {
    id: "percentage-calculator",
    title: "Advanced Percentage Calculator",
    name: "Advanced Percentage Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates X% of Y, percentage ratios, and percentage increase or decrease between numbers.",
    inputs: [
      { id: "mode", label: "Calculation Mode", type: "dropdown", options: ["What is X% of Y?", "What percentage is X of Y?", "% Increase / Decrease from X to Y"] },
      { id: "valX", label: "Value X", type: "text", placeholder: "15" },
      { id: "valY", label: "Value Y", type: "text", placeholder: "250" }
    ]
  },
  {
    id: "compound-interest-calculator",
    title: "Compound Interest Growth Calculator",
    name: "Compound Interest Growth Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates investment growth over time with recurring deposits and compound interest tables.",
    inputs: [
      { id: "initial", label: "Initial Principal ($)", type: "text", placeholder: "10000" },
      { id: "monthly", label: "Monthly Contribution ($)", type: "text", placeholder: "500" },
      { id: "rate", label: "Annual Return Rate (%)", type: "text", placeholder: "8.0" },
      { id: "years", label: "Investment Duration (Years)", type: "text", placeholder: "10" }
    ]
  },
  {
    id: "bmi-body-fat",
    title: "BMI & Body Fat Metric Calculator",
    name: "BMI & Body Fat Metric Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates Body Mass Index (BMI), WHO weight category, and estimated body fat percentage.",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "text", placeholder: "70" },
      { id: "height", label: "Height (cm)", type: "text", placeholder: "175" },
      { id: "age", label: "Age (years)", type: "text", placeholder: "28" },
      { id: "gender", label: "Biological Gender", type: "dropdown", options: ["Male", "Female"] }
    ]
  },
  {
    id: "age-date-difference",
    title: "Age & Exact Date Difference Calculator",
    name: "Age & Exact Date Difference Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates exact age in years, months, days, total weeks, and total days between two dates.",
    inputs: [
      { id: "startDate", label: "Start Date / Birthdate (YYYY-MM-DD)", type: "text", placeholder: "1995-06-15" },
      { id: "endDate", label: "End Date / Target Date (leave blank for today)", type: "text", placeholder: "2026-07-30" }
    ]
  },
  {
    id: "gpa-calculator",
    title: "GPA / Grade Point Average Calculator",
    name: "GPA / Grade Point Average Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates cumulative weighted Grade Point Average (GPA) on a 4.0 grading scale.",
    inputs: [
      { id: "courses", label: "Course Grades & Credits (e.g., A 3, B+ 4, A- 3, B 3)", type: "textarea", placeholder: "A 3\nB+ 4\nA- 3\nB 3" }
    ]
  },
  {
    id: "salary-to-hourly",
    title: "Salary to Hourly Pay Wage Converter",
    name: "Salary to Hourly Pay Wage Converter",
    category: "Calculators & Mathematics",
    description: "Converts annual salary into hourly, weekly, bi-weekly, and monthly wage breakdowns.",
    inputs: [
      { id: "salary", label: "Annual Base Salary ($)", type: "text", placeholder: "75000" },
      { id: "hoursPerWeek", label: "Work Hours per Week", type: "text", placeholder: "40" }
    ]
  },
  {
    id: "tip-bill-splitter",
    title: "Restaurant Tip & Bill Split Calculator",
    name: "Restaurant Tip & Bill Split Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates gratuity amount, total bill, and split cost per person in dining groups.",
    inputs: [
      { id: "bill", label: "Subtotal Bill Amount ($)", type: "text", placeholder: "120.00" },
      { id: "tipPct", label: "Tip Percentage", type: "dropdown", options: ["18% (Standard)", "20% (Great Service)", "15% (Fair)", "25% (Exceptional)"] },
      { id: "people", label: "Number of People Splitting", type: "text", placeholder: "4" }
    ]
  },
  {
    id: "discount-sales-tax",
    title: "Retail Discount & Sales Tax Calculator",
    name: "Retail Discount & Sales Tax Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates promotional discount savings, sales tax, and final checkout prices.",
    inputs: [
      { id: "price", label: "Original Retail Price ($)", type: "text", placeholder: "199.99" },
      { id: "discount", label: "Discount Percentage (%)", type: "text", placeholder: "20" },
      { id: "tax", label: "Sales Tax Rate (%)", type: "text", placeholder: "8.5" }
    ]
  },
  {
    id: "fuel-cost-calculator",
    title: "Vehicle Fuel Cost & Trip Distance Calculator",
    name: "Vehicle Fuel Cost & Trip Distance Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates required fuel volume and total trip cost based on fuel efficiency and gas prices.",
    inputs: [
      { id: "distance", label: "Total Trip Distance (Miles)", type: "text", placeholder: "350" },
      { id: "efficiency", label: "Fuel Efficiency (MPG)", type: "text", placeholder: "28" },
      { id: "gasPrice", label: "Gas Price per Gallon ($)", type: "text", placeholder: "3.65" }
    ]
  },
  {
    id: "password-generator-sec",
    title: "Strong Password Generator",
    name: "Strong Password Generator",
    category: "Security & Generators",
    description: "Generates cryptographically secure passwords using window.crypto.getRandomValues() locally.",
    inputs: [
      { id: "length", label: "Password Length (Characters)", type: "text", placeholder: "16" },
      { id: "incUpper", label: "Include Uppercase (A-Z)", type: "dropdown", options: ["Yes, Include Uppercase", "No Uppercase"] },
      { id: "incNumbers", label: "Include Numbers (0-9)", type: "dropdown", options: ["Yes, Include Numbers", "No Numbers"] },
      { id: "incSymbols", label: "Include Special Symbols (!@#$%)", type: "dropdown", options: ["Yes, Include Symbols", "No Symbols"] }
    ]
  },
  {
    id: "crypto-hash-generator",
    title: "MD5, SHA-1, and SHA-256 Hash Generator",
    name: "MD5, SHA-1, and SHA-256 Hash Generator",
    category: "Security & Generators",
    description: "Computes cryptographic hashes using Web Crypto API directly inside your browser.",
    inputs: [
      { id: "text", label: "Plaintext String Input", type: "textarea", placeholder: "Enter text payload to hash..." }
    ]
  },
  {
    id: "uuid-guid-v4",
    title: "UUID / GUID v4 Identifier Generator",
    name: "UUID / GUID v4 Identifier Generator",
    category: "Security & Generators",
    description: "Generates RFC 4122 compliant version 4 UUIDs using window.crypto.randomUUID().",
    inputs: [
      { id: "count", label: "Batch Count to Generate", type: "dropdown", options: ["5 Identifiers", "1 Identifier", "10 Identifiers", "25 Identifiers"] }
    ]
  },
  {
    id: "qr-code-generator",
    title: "QR Code Generator",
    name: "QR Code Generator",
    category: "Security & Generators",
    description: "Generates instant 2D QR codes for URLs, WiFi credentials, or plain text.",
    inputs: [
      { id: "qrData", label: "URL / Text to Encode into QR", type: "text", placeholder: "https://zenovee.ai" },
      { id: "size", label: "QR Image Dimensions", type: "dropdown", options: ["250 x 250 px", "350 x 350 px", "500 x 500 px"] }
    ]
  },
  {
    id: "dummy-test-data",
    title: "Dummy Test Data Framework Generator",
    name: "Dummy Test Data Framework Generator",
    category: "Security & Generators",
    description: "Generates mock user dataset profiles with names, emails, phone numbers, and addresses.",
    inputs: [
      { id: "count", label: "Record Count", type: "dropdown", options: ["5 Records", "10 Records", "20 Records"] },
      { id: "format", label: "Export Format", type: "dropdown", options: ["JSON Array", "CSV Spreadsheet"] }
    ]
  },
  {
    id: "random-number-gen",
    title: "Random Number Generator",
    name: "Random Number Generator",
    category: "Security & Generators",
    description: "Generates random integers within custom Min and Max boundary limits.",
    inputs: [
      { id: "min", label: "Minimum Bound (Min)", type: "text", placeholder: "1" },
      { id: "max", label: "Maximum Bound (Max)", type: "text", placeholder: "100" },
      { id: "count", label: "Generation Count", type: "dropdown", options: ["5 Numbers", "1 Number", "10 Numbers", "20 Numbers"] }
    ]
  },
  
  {
    id: "robots-txt-builder",
    title: "Robots.txt File Generator",
    name: "Robots.txt File Generator",
    category: "Security & Generators",
    description: "Builds search engine crawler instructions and sitemap directives for robots.txt.",
    inputs: [
      { id: "userAgent", label: "Target User Agent", type: "dropdown", options: ["* (All Crawlers)", "Googlebot", "Bingbot"] },
      { id: "disallow", label: "Disallowed Paths (comma separated)", type: "text", placeholder: "/admin/, /private/, /api/" },
      { id: "sitemap", label: "Sitemap XML URL", type: "text", placeholder: "https://zenovee.ai/sitemap.xml" }
    ]
  },
  {
    id: "htaccess-rule-builder",
    title: ".htaccess Redirect Rule Builder",
    name: ".htaccess Redirect Rule Builder",
    category: "Security & Generators",
    description: "Generates Apache server rewrite rules for HTTPS enforcement, WWW redirects, and security headers.",
    inputs: [
      { id: "forceHttps", label: "Force HTTPS Directives", type: "dropdown", options: ["Yes, Enable HTTPS Rewrite", "No HTTPS Force"] },
      { id: "secHeaders", label: "Include Security Headers", type: "dropdown", options: ["Yes, Include Security Headers", "No Headers"] }
    ]
  },
  {
    id: "favicon-generator-ui",
    title: "Favicon Generator UI",
    name: "Favicon Generator UI",
    category: "Security & Generators",
    description: "Generates HTML icon tags, Apple Touch icons, and Web App Manifest icon sizes.",
    inputs: [
      { id: "brand", label: "Brand Initials / Icon Symbol", type: "text", placeholder: "ZA" },
      { id: "bgColor", label: "Background Hex Color", type: "text", placeholder: "#4F46E5" }
    ]
  },
  {
    id: "html-entity-encoder",
    title: "HTML Entity Encoder / Decoder",
    name: "HTML Entity Encoder / Decoder",
    category: "Developer & Web Tools",
    description: "Converts special characters to HTML entities (&lt;, &gt;, &amp;, &quot;) and decodes entity strings.",
    inputs: [
      {
            "id": "text",
            "label": "Input HTML / Code Text",
            "type": "textarea",
            "placeholder": "<h1>Hello \"World\" & \"Developers\"</h1>"
    },
      {
            "id": "mode",
            "label": "Action Mode",
            "type": "dropdown",
            "options": [
                  "Encode to HTML Entities",
                  "Decode HTML Entities"
            ]
    }
]
  },
  {
    id: "js-minifier",
    title: "JavaScript Code Minifier & Formatter",
    name: "JavaScript Code Minifier & Formatter",
    category: "Developer & Web Tools",
    description: "Compresses JavaScript code by removing comments, redundant spaces, and line breaks.",
    inputs: [
      {
            "id": "code",
            "label": "JavaScript Source Code",
            "type": "textarea",
            "placeholder": "// Calculate sum\nfunction add(a, b) {\n  return a + b;\n}"
    }
]
  },
  {
    id: "css-minifier",
    title: "CSS Stylesheet Minifier & Beautifier",
    name: "CSS Stylesheet Minifier & Beautifier",
    category: "Developer & Web Tools",
    description: "Minifies CSS stylesheets for production or beautifies compressed CSS into readable format.",
    inputs: [
      {
            "id": "cssCode",
            "label": "CSS Source Code",
            "type": "textarea",
            "placeholder": "/* Header Styles */\n.header {\n  color: #4F46E5;\n  font-size: 16px;\n}"
    },
      {
            "id": "mode",
            "label": "Format Mode",
            "type": "dropdown",
            "options": [
                  "Minify CSS",
                  "Beautify CSS (2 Spaces)"
            ]
    }
]
  },
  {
    id: "xml-formatter",
    title: "XML Code Formatter & Validator",
    name: "XML Code Formatter & Validator",
    category: "Developer & Web Tools",
    description: "Pretty-prints XML documents with customizable indent spacing and validates XML tag closure.",
    inputs: [
      {
            "id": "xmlCode",
            "label": "Raw XML Code",
            "type": "textarea",
            "placeholder": "<root><user id=\"1\"><name>Alice</name></user></root>"
    }
]
  },
  {
    id: "json-validator",
    title: "JSON Validator & Syntax Fixer",
    name: "JSON Validator & Syntax Fixer",
    category: "Developer & Web Tools",
    description: "Validates JSON strings, locates syntax errors with line numbers, and fixes common JSON mistakes.",
    inputs: [
      {
            "id": "jsonText",
            "label": "JSON Code to Validate",
            "type": "textarea",
            "placeholder": "{\n  \"name\": \"Zenovee\",\n  \"tools\": 100\n}"
    }
]
  },
  {
    id: "htaccess-tester",
    title: ".htaccess Redirect & Rewrite Tester",
    name: ".htaccess Redirect & Rewrite Tester",
    category: "Developer & Web Tools",
    description: "Tests Apache .htaccess RewriteRule patterns against incoming test URLs.",
    inputs: [
      {
            "id": "rule",
            "label": "RewriteRule Pattern",
            "type": "text",
            "placeholder": "^old-page/(.*)$ https://example.com/new-page/$1 [R=301,L]"
    },
      {
            "id": "testUrl",
            "label": "Test Request URL",
            "type": "text",
            "placeholder": "https://example.com/old-page/article-123"
    }
]
  },
  
  {
    id: "user-agent-parser",
    title: "User-Agent String Parser",
    name: "User-Agent String Parser",
    category: "Developer & Web Tools",
    description: "Parses User-Agent strings to identify Browser Name, OS Version, Engine, and Device Type.",
    inputs: [
      {
            "id": "uaString",
            "label": "User-Agent String (leave blank for your browser)",
            "type": "textarea",
            "placeholder": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..."
    }
]
  },
  {
    id: "markdown-table-generator",
    title: "Markdown Table Builder",
    name: "Markdown Table Builder",
    category: "Developer & Web Tools",
    description: "Generates clean Markdown data tables with customizable columns, alignment, and CSV import.",
    inputs: [
      {
            "id": "cols",
            "label": "Columns Count",
            "type": "text",
            "placeholder": "3"
    },
      {
            "id": "rows",
            "label": "Rows Count",
            "type": "text",
            "placeholder": "3"
    },
      {
            "id": "headers",
            "label": "Header Titles (comma separated)",
            "type": "text",
            "placeholder": "ID, Product Name, Price"
    }
]
  },
  {
    id: "chmod-calculator",
    title: "Linux Chmod Permissions Calculator",
    name: "Linux Chmod Permissions Calculator",
    category: "Developer & Web Tools",
    description: "Calculates octal numerical permissions (755, 644) and symbolic notations (rwxr-xr-x).",
    inputs: [
      {
            "id": "owner",
            "label": "Owner Permissions",
            "type": "dropdown",
            "options": [
                  "Read + Write + Execute (7)",
                  "Read + Write (6)",
                  "Read + Execute (5)",
                  "Read Only (4)"
            ]
    },
      {
            "id": "group",
            "label": "Group Permissions",
            "type": "dropdown",
            "options": [
                  "Read + Execute (5)",
                  "Read Only (4)",
                  "Read + Write (6)",
                  "No Access (0)"
            ]
    },
      {
            "id": "publicAcc",
            "label": "Public/Others Permissions",
            "type": "dropdown",
            "options": [
                  "Read + Execute (5)",
                  "Read Only (4)",
                  "No Access (0)",
                  "Read + Write + Execute (7)"
            ]
    }
]
  },
  {
    id: "color-picker-palette",
    title: "Interactive Color Picker & Palette Generator",
    name: "Interactive Color Picker & Palette Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates complementary, triadic, and monochromatic color palettes from any base Hex color.",
    inputs: [
      {
            "id": "baseHex",
            "label": "Base Hex Color Code",
            "type": "text",
            "placeholder": "#4F46E5"
    },
      {
            "id": "paletteType",
            "label": "Palette Harmony Type",
            "type": "dropdown",
            "options": [
                  "Monochromatic",
                  "Complementary",
                  "Triadic",
                  "Analogous"
            ]
    }
]
  },
  {
    id: "aspect-ratio-calc",
    title: "Aspect Ratio Calculator",
    name: "Aspect Ratio Calculator",
    category: "Design, Image & Color Utilities",
    description: "Calculates missing dimensions for 16:9, 4:3, 1:1, 21:9, and custom image aspect ratios.",
    inputs: [
      {
            "id": "ratio",
            "label": "Aspect Ratio Preset",
            "type": "dropdown",
            "options": [
                  "16:9 (Widescreen)",
                  "4:3 (Standard)",
                  "1:1 (Square / Instagram)",
                  "21:9 (Ultrawide)"
            ]
    },
      {
            "id": "knownDim",
            "label": "Known Dimension (Width or Height in px)",
            "type": "text",
            "placeholder": "1920"
    },
      {
            "id": "dimType",
            "label": "Known Dimension Type",
            "type": "dropdown",
            "options": [
                  "Width",
                  "Height"
            ]
    }
]
  },
  {
    id: "px-to-rem-converter",
    title: "Pixels to REM / EM / VW Converter",
    name: "Pixels to REM / EM / VW Converter",
    category: "Design, Image & Color Utilities",
    description: "Converts pixel values to CSS rem, em, and vw units based on a configurable root font size.",
    inputs: [
      {
            "id": "pxVal",
            "label": "Pixel Value (px)",
            "type": "text",
            "placeholder": "16"
    },
      {
            "id": "rootSize",
            "label": "Root Font Size (default 16px)",
            "type": "text",
            "placeholder": "16"
    }
]
  },
  {
    id: "box-shadow-generator",
    title: "CSS Box Shadow & Drop Shadow Generator",
    name: "CSS Box Shadow & Drop Shadow Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates custom CSS box-shadow code with blur, spread, offset, opacity, and inset options.",
    inputs: [
      {
            "id": "offsetX",
            "label": "Horizontal Offset (px)",
            "type": "text",
            "placeholder": "0"
    },
      {
            "id": "offsetY",
            "label": "Vertical Offset (px)",
            "type": "text",
            "placeholder": "10"
    },
      {
            "id": "blur",
            "label": "Blur Radius (px)",
            "type": "text",
            "placeholder": "25"
    },
      {
            "id": "spread",
            "label": "Spread Radius (px)",
            "type": "text",
            "placeholder": "-5"
    },
      {
            "id": "shadowColor",
            "label": "Shadow Color Hex",
            "type": "text",
            "placeholder": "#000000"
    }
]
  },
  {
    id: "gradient-generator",
    title: "CSS Linear & Radial Gradient Generator",
    name: "CSS Linear & Radial Gradient Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates CSS linear and radial background gradient codes with customizable angle and color stops.",
    inputs: [
      {
            "id": "color1",
            "label": "First Color Hex",
            "type": "text",
            "placeholder": "#4F46E5"
    },
      {
            "id": "color2",
            "label": "Second Color Hex",
            "type": "text",
            "placeholder": "#9333EA"
    },
      {
            "id": "angle",
            "label": "Gradient Angle (Degrees)",
            "type": "dropdown",
            "options": [
                  "90deg (Left to Right)",
                  "135deg (Diagonal)",
                  "180deg (Top to Bottom)",
                  "45deg (Bottom-Left to Top-Right)"
            ]
    }
]
  },
  {
    id: "image-resizer",
    title: "Quick Client-Side Image Resizer & Scaler",
    name: "Quick Client-Side Image Resizer & Scaler",
    category: "Design, Image & Color Utilities",
    description: "Resizes images by specific pixel dimensions or percentage scale directly in browser memory.",
    inputs: [
      {
            "id": "imageFile",
            "label": "Select Image File",
            "type": "file"
    },
      {
            "id": "targetWidth",
            "label": "Target Width (px)",
            "type": "text",
            "placeholder": "800"
    },
      {
            "id": "targetHeight",
            "label": "Target Height (px, optional)",
            "type": "text",
            "placeholder": "600"
    }
]
  },
  {
    id: "png-to-jpg",
    title: "PNG to JPG / WEBP Converter",
    name: "PNG to JPG / WEBP Converter",
    category: "Design, Image & Color Utilities",
    description: "Converts transparent PNG images to JPG or WebP format with custom background fill.",
    inputs: [
      {
            "id": "imageFile",
            "label": "Select PNG File",
            "type": "file"
    },
      {
            "id": "outputFormat",
            "label": "Target Format",
            "type": "dropdown",
            "options": [
                  "JPEG (.jpg)",
                  "WebP (.webp)"
            ]
    },
      {
            "id": "bgFill",
            "label": "Background Fill Color for Transparency",
            "type": "text",
            "placeholder": "#FFFFFF"
    }
]
  },
  {
    id: "palette-from-image",
    title: "Image Color Palette Extractor",
    name: "Image Color Palette Extractor",
    category: "Design, Image & Color Utilities",
    description: "Extracts dominant hex color palettes from uploaded photos using HTML5 Canvas pixel analysis.",
    inputs: [
      {
            "id": "imageFile",
            "label": "Select Photo to Extract Colors",
            "type": "file"
    },
      {
            "id": "colorCount",
            "label": "Palette Color Count",
            "type": "dropdown",
            "options": [
                  "5 Dominant Colors",
                  "8 Color Palette",
                  "10 Color Palette"
            ]
    }
]
  },
  {
    id: "border-radius-generator",
    title: "CSS Border Radius & Blob Generator",
    name: "CSS Border Radius & Blob Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates CSS border-radius and organic blob shapes for web components.",
    inputs: [
      {
            "id": "topLeft",
            "label": "Top-Left Radius (px)",
            "type": "text",
            "placeholder": "16"
    },
      {
            "id": "topRight",
            "label": "Top-Right Radius (px)",
            "type": "text",
            "placeholder": "16"
    },
      {
            "id": "bottomRight",
            "label": "Bottom-Right Radius (px)",
            "type": "text",
            "placeholder": "0"
    },
      {
            "id": "bottomLeft",
            "label": "Bottom-Left Radius (px)",
            "type": "text",
            "placeholder": "0"
    }
]
  },
  {
    id: "svg-to-png-converter",
    title: "SVG Vector to High-Res PNG Renderer",
    name: "SVG Vector to High-Res PNG Renderer",
    category: "Design, Image & Color Utilities",
    description: "Renders vector SVG code or files into high-resolution PNG images at 1x, 2x, or 4x scale.",
    inputs: [
      {
            "id": "svgInput",
            "label": "SVG Code / XML Markup",
            "type": "textarea",
            "placeholder": "<svg width=\"100\" height=\"100\">...</svg>"
    },
      {
            "id": "scale",
            "label": "Export Resolution Scale",
            "type": "dropdown",
            "options": [
                  "2x High-DPI (Retina)",
                  "1x Standard",
                  "4x Ultra High-Res"
            ]
    }
]
  },
  
  
  
  {
    id: "text-to-binary",
    title: "Text to Binary & Binary to Text Converter",
    name: "Text to Binary & Binary to Text Converter",
    category: "Text Processing & Writing Utilities",
    description: "Converts ASCII text to binary 8-bit byte strings (01001000...) and vice-versa.",
    inputs: [
      {
            "id": "text",
            "label": "Text or Binary Input",
            "type": "textarea",
            "placeholder": "Hello"
    },
      {
            "id": "mode",
            "label": "Conversion Mode",
            "type": "dropdown",
            "options": [
                  "Text to Binary",
                  "Binary to Text"
            ]
    }
]
  },
  {
    id: "hex-to-text-converter",
    title: "Hex to Text & Text to Hex Converter",
    name: "Hex to Text & Text to Hex Converter",
    category: "Text Processing & Writing Utilities",
    description: "Translates hexadecimal byte sequences into plain readable text strings.",
    inputs: [
      {
            "id": "inputStr",
            "label": "Text or Hex String",
            "type": "textarea",
            "placeholder": "48 65 6c 6c 6f"
    },
      {
            "id": "mode",
            "label": "Conversion Mode",
            "type": "dropdown",
            "options": [
                  "Hex to Text",
                  "Text to Hex"
            ]
    }
]
  },
  {
    id: "morse-code-translator",
    title: "Morse Code Translator & Audio Player",
    name: "Morse Code Translator & Audio Player",
    category: "Text Processing & Writing Utilities",
    description: "Translates text into Morse code (. and -) and plays audio beeps via Web Audio API.",
    inputs: [
      {
            "id": "text",
            "label": "Plain Text or Morse Code",
            "type": "textarea",
            "placeholder": "SOS"
    },
      {
            "id": "mode",
            "label": "Translation Mode",
            "type": "dropdown",
            "options": [
                  "Text to Morse Code",
                  "Morse Code to Text"
            ]
    }
]
  },
  {
    id: "binary-to-decimal",
    title: "Binary to Decimal / Hex / Octal Converter",
    name: "Binary to Decimal / Hex / Octal Converter",
    category: "Text Processing & Writing Utilities",
    description: "Converts numbers between Binary (Base-2), Octal (Base-8), Decimal (Base-10), and Hex (Base-16).",
    inputs: [
      {
            "id": "numStr",
            "label": "Number Input String",
            "type": "text",
            "placeholder": "101010"
    },
      {
            "id": "fromBase",
            "label": "From Number Base",
            "type": "dropdown",
            "options": [
                  "Binary (Base 2)",
                  "Decimal (Base 10)",
                  "Hexadecimal (Base 16)",
                  "Octal (Base 8)"
            ]
    }
]
  },
  {
    id: "whitespace-remover",
    title: "Extra Whitespace & Newline Stripper",
    name: "Extra Whitespace & Newline Stripper",
    category: "Text Processing & Writing Utilities",
    description: "Removes consecutive space characters, leading/trailing whitespace, and empty lines.",
    inputs: [
      {
            "id": "text",
            "label": "Raw Unformatted Text",
            "type": "textarea",
            "placeholder": "  Hello     World!   \n\n  This is   a test.  "
    }
]
  },
  
  
  {
    id: "simple-calculator",
    title: "Basic Standard & Scientific Calculator",
    name: "Basic Standard & Scientific Calculator",
    category: "Daily Math & Student Tools",
    description: "Performs standard arithmetic (+, -, *, /) and scientific operations (sqrt, square, pow, sin, cos).",
    inputs: [
      {
            "id": "expression",
            "label": "Mathematical Expression",
            "type": "text",
            "placeholder": "25 * (4 + 6) / 2"
    }
]
  },
  {
    id: "fraction-calculator",
    title: "Fraction Calculator & Simplifier",
    name: "Fraction Calculator & Simplifier",
    category: "Daily Math & Student Tools",
    description: "Adds, subtracts, multiplies, and divides fractions and reduces answers to simplest form.",
    inputs: [
      {
            "id": "f1Num",
            "label": "Fraction 1 Numerator",
            "type": "text",
            "placeholder": "1"
    },
      {
            "id": "f1Den",
            "label": "Fraction 1 Denominator",
            "type": "text",
            "placeholder": "2"
    },
      {
            "id": "op",
            "label": "Operator",
            "type": "dropdown",
            "options": [
                  "+ (Add)",
                  "- (Subtract)",
                  "* (Multiply)",
                  "/ (Divide)"
            ]
    },
      {
            "id": "f2Num",
            "label": "Fraction 2 Numerator",
            "type": "text",
            "placeholder": "3"
    },
      {
            "id": "f2Den",
            "label": "Fraction 2 Denominator",
            "type": "text",
            "placeholder": "4"
    }
]
  },
  {
    id: "roman-numeral-converter",
    title: "Roman Numeral Converter",
    name: "Roman Numeral Converter",
    category: "Daily Math & Student Tools",
    description: "Converts integer numbers to Roman Numerals (2026 -> MMXXVI) and vice-versa.",
    inputs: [
      {
            "id": "val",
            "label": "Number or Roman Numeral Input",
            "type": "text",
            "placeholder": "2026 or MMXXVI"
    },
      {
            "id": "mode",
            "label": "Conversion Direction",
            "type": "dropdown",
            "options": [
                  "Number to Roman Numeral",
                  "Roman Numeral to Number"
            ]
    }
]
  },
  {
    id: "binary-calculator",
    title: "Binary Arithmetic Calculator",
    name: "Binary Arithmetic Calculator",
    category: "Daily Math & Student Tools",
    description: "Performs binary addition, subtraction, AND, OR, XOR operations on binary numbers.",
    inputs: [
      {
            "id": "b1",
            "label": "First Binary Number",
            "type": "text",
            "placeholder": "1010"
    },
      {
            "id": "op",
            "label": "Binary Operation",
            "type": "dropdown",
            "options": [
                  "+ (Addition)",
                  "- (Subtraction)",
                  "AND Bitwise",
                  "OR Bitwise",
                  "XOR Bitwise"
            ]
    },
      {
            "id": "b2",
            "label": "Second Binary Number",
            "type": "text",
            "placeholder": "1100"
    }
]
  },
  {
    id: "average-mean-calculator",
    title: "Mean, Median, Mode & Range Calculator",
    name: "Mean, Median, Mode & Range Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates Mean (average), Median, Mode, and Range for a set of numerical data points.",
    inputs: [
      {
            "id": "numbers",
            "label": "Numbers List (comma or space separated)",
            "type": "textarea",
            "placeholder": "12, 15, 18, 22, 15, 30, 25"
    }
]
  },
  {
    id: "standard-deviation-calc",
    title: "Standard Deviation & Variance Calculator",
    name: "Standard Deviation & Variance Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates Sample and Population Standard Deviation, Variance, and Sum of Squares.",
    inputs: [
      {
            "id": "dataPoints",
            "label": "Dataset Values (comma separated)",
            "type": "textarea",
            "placeholder": "10, 12, 23, 23, 16, 23, 21, 16"
    }
]
  },
  {
    id: "random-choice-picker",
    title: "Random Choice & Name Picker",
    name: "Random Choice & Name Picker",
    category: "Daily Math & Student Tools",
    description: "Picks one or more random items/winners from a custom list of choices.",
    inputs: [
      {
            "id": "choices",
            "label": "List of Options / Names (One per line)",
            "type": "textarea",
            "placeholder": "Option A\nOption B\nOption C\nOption D"
    },
      {
            "id": "winnerCount",
            "label": "Number of Choices to Pick",
            "type": "dropdown",
            "options": [
                  "Pick 1 Winner",
                  "Pick 2 Winners",
                  "Pick 3 Winners"
            ]
    }
]
  },
  {
    id: "time-duration-calc",
    title: "Time Duration & Hours Between Calculator",
    name: "Time Duration & Hours Between Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates total hours and minutes between two time entries (e.g. 09:15 AM to 05:45 PM).",
    inputs: [
      {
            "id": "startTime",
            "label": "Start Time",
            "type": "text",
            "placeholder": "09:15 AM"
    },
      {
            "id": "endTime",
            "label": "End Time",
            "type": "text",
            "placeholder": "05:45 PM"
    }
]
  },
  {
    id: "speed-distance-time",
    title: "Speed, Distance & Time Calculator",
    name: "Speed, Distance & Time Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates missing speed (mph/kph), distance (miles/km), or travel duration.",
    inputs: [
      {
            "id": "calcTarget",
            "label": "Calculate Target",
            "type": "dropdown",
            "options": [
                  "Speed (Distance / Time)",
                  "Distance (Speed * Time)",
                  "Time (Distance / Speed)"
            ]
    },
      {
            "id": "val1",
            "label": "First Parameter Value",
            "type": "text",
            "placeholder": "60 (mph or miles)"
    },
      {
            "id": "val2",
            "label": "Second Parameter Value",
            "type": "text",
            "placeholder": "2 (hours or mph)"
    }
]
  },
  {
    id: "triangle-solver",
    title: "Right Triangle & Pythagorean Calculator",
    name: "Right Triangle & Pythagorean Calculator",
    category: "Daily Math & Student Tools",
    description: "Solves right triangles calculating Hypotenuse (c = √(a² + b²)), area, and perimeter.",
    inputs: [
      {
            "id": "sideA",
            "label": "Side A Length",
            "type": "text",
            "placeholder": "3"
    },
      {
            "id": "sideB",
            "label": "Side B Length",
            "type": "text",
            "placeholder": "4"
    }
]
  },
  {
    id: "water-intake-calculator",
    title: "Daily Water Intake Calculator",
    name: "Daily Water Intake Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates daily hydration fluid requirements in liters and cups based on body weight and activity.",
    inputs: [
      {
            "id": "weightLbs",
            "label": "Body Weight (lbs or kg)",
            "type": "text",
            "placeholder": "160"
    },
      {
            "id": "weightUnit",
            "label": "Weight Unit",
            "type": "dropdown",
            "options": [
                  "Pounds (lbs)",
                  "Kilograms (kg)"
            ]
    },
      {
            "id": "activityMin",
            "label": "Daily Exercise Activity (Minutes)",
            "type": "text",
            "placeholder": "30"
    }
]
  },
  {
    id: "calorie-tdee-calculator",
    title: "TDEE & BMR Daily Calorie Calculator",
    name: "TDEE & BMR Daily Calorie Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) for weight goals.",
    inputs: [
      {
            "id": "weight",
            "label": "Weight (kg)",
            "type": "text",
            "placeholder": "70"
    },
      {
            "id": "height",
            "label": "Height (cm)",
            "type": "text",
            "placeholder": "175"
    },
      {
            "id": "age",
            "label": "Age (Years)",
            "type": "text",
            "placeholder": "28"
    },
      {
            "id": "gender",
            "label": "Gender",
            "type": "dropdown",
            "options": [
                  "Male",
                  "Female"
            ]
    },
      {
            "id": "activity",
            "label": "Activity Level",
            "type": "dropdown",
            "options": [
                  "Sedentary (Office Job)",
                  "Lightly Active (1-3 days/wk)",
                  "Moderately Active (3-5 days/wk)",
                  "Very Active (6-7 days/wk)"
            ]
    }
]
  },
  {
    id: "macro-calculator",
    title: "Macronutrient Ratio Calculator",
    name: "Macronutrient Ratio Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates target daily grams of Protein, Carbohydrates, and Fats based on calorie intake.",
    inputs: [
      {
            "id": "calories",
            "label": "Daily Target Calories",
            "type": "text",
            "placeholder": "2000"
    },
      {
            "id": "fitnessGoal",
            "label": "Fitness Goal",
            "type": "dropdown",
            "options": [
                  "Maintenance (40% C / 30% P / 30% F)",
                  "Fat Loss (30% C / 40% P / 30% F)",
                  "Muscle Gain (50% C / 30% P / 20% F)"
            ]
    }
]
  },
  {
    id: "sleep-cycle-calculator",
    title: "Sleep Cycle & Bedtime Alarm Calculator",
    name: "Sleep Cycle & Bedtime Alarm Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates optimal bedtime schedules based on 90-minute REM sleep cycles.",
    inputs: [
      {
            "id": "wakeTime",
            "label": "Desired Wake-Up Time",
            "type": "text",
            "placeholder": "07:00 AM"
    }
]
  },
  {
    id: "ideal-weight-calculator",
    title: "Ideal Body Weight (IBW) Calculator",
    name: "Ideal Body Weight (IBW) Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates healthy ideal weight ranges using Devine, Robinson, and Miller medical formulas.",
    inputs: [
      {
            "id": "heightCm",
            "label": "Height (cm)",
            "type": "text",
            "placeholder": "175"
    },
      {
            "id": "gender",
            "label": "Gender",
            "type": "dropdown",
            "options": [
                  "Male",
                  "Female"
            ]
    }
]
  },
  {
    id: "step-to-distance-calc",
    title: "Steps to Distance & Calories Burned Converter",
    name: "Steps to Distance & Calories Burned Converter",
    category: "Health, Fitness & Everyday Life",
    description: "Converts daily step count (e.g. 10,000 steps) into miles, kilometers, and estimated calories burned.",
    inputs: [
      {
            "id": "steps",
            "label": "Daily Steps Count",
            "type": "text",
            "placeholder": "10000"
    },
      {
            "id": "strideLength",
            "label": "Average Stride Length",
            "type": "dropdown",
            "options": [
                  "Average (2.2 ft / 0.67m)",
                  "Tall Stride (2.5 ft)",
                  "Short Stride (2.0 ft)"
            ]
    }
]
  },
  {
    id: "bac-calculator",
    title: "Blood Alcohol Concentration (BAC) Calculator",
    name: "Blood Alcohol Concentration (BAC) Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Estimates Blood Alcohol Content percentage over time using Widmark's formula.",
    inputs: [
      {
            "id": "drinks",
            "label": "Standard Drinks Consumed",
            "type": "text",
            "placeholder": "3"
    },
      {
            "id": "weightLbs",
            "label": "Body Weight (lbs)",
            "type": "text",
            "placeholder": "160"
    },
      {
            "id": "hours",
            "label": "Hours Since First Drink",
            "type": "text",
            "placeholder": "2"
    },
      {
            "id": "gender",
            "label": "Gender",
            "type": "dropdown",
            "options": [
                  "Male",
                  "Female"
            ]
    }
]
  },
  {
    id: "unit-price-comparator",
    title: "Grocery Unit Price Comparator",
    name: "Grocery Unit Price Comparator",
    category: "Health, Fitness & Everyday Life",
    description: "Compares cost per ounce, gram, or unit between two competing grocery package deals.",
    inputs: [
      {
            "id": "p1Price",
            "label": "Item 1 Total Price ($)",
            "type": "text",
            "placeholder": "4.99"
    },
      {
            "id": "p1Size",
            "label": "Item 1 Size/Quantity (oz/g)",
            "type": "text",
            "placeholder": "16"
    },
      {
            "id": "p2Price",
            "label": "Item 2 Total Price ($)",
            "type": "text",
            "placeholder": "7.49"
    },
      {
            "id": "p2Size",
            "label": "Item 2 Size/Quantity (oz/g)",
            "type": "text",
            "placeholder": "28"
    }
]
  },
  {
    id: "countdown-timer-builder",
    title: "Online Event Countdown Timer Builder",
    name: "Online Event Countdown Timer Builder",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates remaining days, hours, minutes, and seconds until any upcoming target date.",
    inputs: [
      {
            "id": "eventName",
            "label": "Event Name / Celebration",
            "type": "text",
            "placeholder": "New Year 2027"
    },
      {
            "id": "targetDate",
            "label": "Target Date & Time (YYYY-MM-DD)",
            "type": "text",
            "placeholder": "2027-01-01"
    }
]
  },
  {
    id: "stopwatch-lap-timer",
    title: "Digital Stopwatch & Lap Split Timer",
    name: "Digital Stopwatch & Lap Split Timer",
    category: "Health, Fitness & Everyday Life",
    description: "Precision digital stopwatch with lap split time logging and lap pace analysis.",
    inputs: [
      {
            "id": "action",
            "label": "Stopwatch Action",
            "type": "dropdown",
            "options": [
                  "Start / Record Split",
                  "Reset Timer"
            ]
    }
]
  },
  {
    id: "youtube-tag-extractor",
    title: "YouTube Tag & Keyword Extractor",
    name: "YouTube Tag & Keyword Extractor",
    category: "Social Media & Video Creator Tools",
    description: "Generates SEO tags, hashtags, and keywords for YouTube video titles.",
    inputs: [
      {
            "id": "title",
            "label": "Video Title / Topic",
            "type": "text",
            "placeholder": "How to Learn Next.js in 2026"
    }
]
  },
  
  
  {
    id: "video-duration-calculator",
    title: "Video File Size & Bitrate Estimator",
    name: "Video File Size & Bitrate Estimator",
    category: "Social Media & Video Creator Tools",
    description: "Calculates estimated video MB size based on bitrate, resolution, and duration.",
    inputs: [
      {
            "id": "minutes",
            "label": "Video Length (Minutes)",
            "type": "text",
            "placeholder": "10"
    }
]
  },
  {
    id: "tweet-character-counter",
    title: "Tweet & Thread Formatting Checker",
    name: "Tweet & Thread Formatting Checker",
    category: "Social Media & Video Creator Tools",
    description: "Checks 280-character Twitter/X limits and splits long text into numbered threads.",
    inputs: [
      {
            "id": "postText",
            "label": "Thread Post Text",
            "type": "textarea",
            "placeholder": "Paste long text to split into tweet threads..."
    }
]
  },
  
  {
    id: "youtube-thumbnail-previewer",
    title: "YouTube Thumbnail & Title CTR Previewer",
    name: "YouTube Thumbnail & Title CTR Previewer",
    category: "Social Media & Video Creator Tools",
    description: "Previews video thumbnail and title mockups on Youtube desktop and mobile feeds.",
    inputs: [
      {
            "id": "videoTitle",
            "label": "YouTube Title",
            "type": "text",
            "placeholder": "Building a SaaS in 24 Hours"
    }
]
  },
  {
    id: "podcast-rss-builder",
    title: "Podcast RSS XML Feed Generator",
    name: "Podcast RSS XML Feed Generator",
    category: "Social Media & Video Creator Tools",
    description: "Generates Apple Podcasts & Spotify compliant RSS XML feed code.",
    inputs: [
      {
            "id": "showName",
            "label": "Podcast Show Title",
            "type": "text",
            "placeholder": "The Tech Founder Podcast"
    }
]
  },
  {
    id: "video-frame-rate-calc",
    title: "Video Frame Rate & Timecode Calculator",
    name: "Video Frame Rate & Timecode Calculator",
    category: "Social Media & Video Creator Tools",
    description: "Calculates total frames and SMPTE timecodes (24fps, 30fps, 60fps).",
    inputs: [
      {
            "id": "durationSec",
            "label": "Duration (Seconds)",
            "type": "text",
            "placeholder": "120"
    }
]
  },
  {
    id: "subtitle-vtt-converter",
    title: "SRT to WebVTT Subtitle Transcoder",
    name: "SRT to WebVTT Subtitle Transcoder",
    category: "Social Media & Video Creator Tools",
    description: "Transcodes SubRip (.SRT) subtitle files into WebVTT (.VTT) format locally.",
    inputs: [
      {
            "id": "srtContent",
            "label": "SRT Subtitle Code",
            "type": "textarea",
            "placeholder": "1\n00:00:01,000 --> 00:00:04,000\nHello World"
    }
]
  },
  {
    id: "amazon-fee-calculator",
    title: "Amazon FBA & Referral Fee Calculator",
    name: "Amazon FBA & Referral Fee Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates Amazon referral fees, FBA fulfillment fees, and net profit margin.",
    inputs: [
      {
            "id": "sellPrice",
            "label": "Item Selling Price ($)",
            "type": "text",
            "placeholder": "29.99"
    },
      {
            "id": "cogs",
            "label": "Item Cost / COGS ($)",
            "type": "text",
            "placeholder": "8.50"
    }
]
  },
  {
    id: "profit-margin-calculator",
    title: "Gross Profit & Markup Percentage Calculator",
    name: "Gross Profit & Markup Percentage Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates Gross Margin %, Markup %, and Dollar Profit.",
    inputs: [
      {
            "id": "costPrice",
            "label": "Cost Price ($)",
            "type": "text",
            "placeholder": "50"
    },
      {
            "id": "salePrice",
            "label": "Selling Price ($)",
            "type": "text",
            "placeholder": "100"
    }
]
  },
  {
    id: "etsy-fee-calculator",
    title: "Etsy Seller Profit & Fee Calculator",
    name: "Etsy Seller Profit & Fee Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates Etsy listing fees, transaction fees, and payment processing cuts.",
    inputs: [
      {
            "id": "itemPrice",
            "label": "Etsy Listing Price ($)",
            "type": "text",
            "placeholder": "25.00"
    }
]
  },
  {
    id: "shopify-pricing-calc",
    title: "Shopify Product Pricing & Break-Even Calculator",
    name: "Shopify Product Pricing & Break-Even Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates break-even price and target retail prices for e-commerce products.",
    inputs: [
      {
            "id": "unitCost",
            "label": "Unit Cost ($)",
            "type": "text",
            "placeholder": "12.00"
    }
]
  },
  {
    id: "bar-code-generator",
    title: "Universal Barcode Canvas Generator",
    name: "Universal Barcode Canvas Generator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Renders Code 128, EAN-13, and UPC-A barcode images directly on canvas.",
    inputs: [
      {
            "id": "codeStr",
            "label": "Barcode Numerical Code",
            "type": "text",
            "placeholder": "123456789012"
    }
]
  },
  {
    id: "sku-generator",
    title: "Product SKU Code Batch Builder",
    name: "Product SKU Code Batch Builder",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Generates clean structured SKU product identifiers by category, size, and color.",
    inputs: [
      {
            "id": "categoryCode",
            "label": "Category Prefix",
            "type": "text",
            "placeholder": "TSHIRT"
    }
]
  },
  {
    id: "shipping-weight-calc",
    title: "Dimensional Weight & Freight Volume Calculator",
    name: "Dimensional Weight & Freight Volume Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates Volumetric Shipping Weight (L x W x H / 139).",
    inputs: [
      {
            "id": "length",
            "label": "Length (inches)",
            "type": "text",
            "placeholder": "12"
    },
      {
            "id": "width",
            "label": "Width (inches)",
            "type": "text",
            "placeholder": "10"
    },
      {
            "id": "height",
            "label": "Height (inches)",
            "type": "text",
            "placeholder": "8"
    }
]
  },
  {
    id: "sales-tax-by-state",
    title: "US Sales Tax & International VAT Calculator",
    name: "US Sales Tax & International VAT Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates US state sales tax and international VAT totals on invoices.",
    inputs: [
      {
            "id": "amount",
            "label": "Order Subtotal ($)",
            "type": "text",
            "placeholder": "150.00"
    }
]
  },
  {
    id: "inventory-reorder-calc",
    title: "Economic Order Quantity (EOQ) Calculator",
    name: "Economic Order Quantity (EOQ) Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates optimal inventory reorder points and order quantities.",
    inputs: [
      {
            "id": "demand",
            "label": "Annual Demand Units",
            "type": "text",
            "placeholder": "5000"
    }
]
  },
  {
    id: "price-discount-matrix",
    title: "Bulk Tiered Wholesale Pricing Calculator",
    name: "Bulk Tiered Wholesale Pricing Calculator",
    category: "E-Commerce & Amazon Seller Tools",
    description: "Calculates quantity tier discount percentages for bulk customer quotes.",
    inputs: [
      {
            "id": "basePrice",
            "label": "Base Unit Price ($)",
            "type": "text",
            "placeholder": "20.00"
    }
]
  },
  {
    id: "invoice-generator-ui",
    title: "Instant HTML & Printable Invoice Generator",
    name: "Instant HTML & Printable Invoice Generator",
    category: "Business, HR & Freelance Tools",
    description: "Generates clean printable business invoices with line items and total tax.",
    inputs: [
      {
            "id": "clientName",
            "label": "Client / Company Name",
            "type": "text",
            "placeholder": "Acme Corp"
    },
      {
            "id": "amount",
            "label": "Total Billed Amount ($)",
            "type": "text",
            "placeholder": "1250.00"
    }
]
  },
  {
    id: "payroll-tax-calc",
    title: "Employee Payroll & Paycheck Calculator",
    name: "Employee Payroll & Paycheck Calculator",
    category: "Business, HR & Freelance Tools",
    description: "Estimates gross paycheck, federal/state tax withholdings, and net pay.",
    inputs: [
      {
            "id": "salary",
            "label": "Annual Gross Salary ($)",
            "type": "text",
            "placeholder": "75000"
    }
]
  },
  {
    id: "meeting-cost-calculator",
    title: "Real-Time Meeting Cost Ticker",
    name: "Real-Time Meeting Cost Ticker",
    category: "Business, HR & Freelance Tools",
    description: "Calculates the real dollar cost of company meetings based on attendee count and rates.",
    inputs: [
      {
            "id": "attendees",
            "label": "Number of Attendees",
            "type": "text",
            "placeholder": "6"
    },
      {
            "id": "hourlyRate",
            "label": "Avg Hourly Salary ($)",
            "type": "text",
            "placeholder": "50"
    }
]
  },
  {
    id: "working-days-calculator",
    title: "Business Working Days & Holiday Calculator",
    name: "Business Working Days & Holiday Calculator",
    category: "Business, HR & Freelance Tools",
    description: "Calculates net business days excluding weekends and custom holidays.",
    inputs: [
      {
            "id": "startDate",
            "label": "Start Date (YYYY-MM-DD)",
            "type": "text",
            "placeholder": "2026-08-01"
    },
      {
            "id": "endDate",
            "label": "End Date (YYYY-MM-DD)",
            "type": "text",
            "placeholder": "2026-08-31"
    }
]
  },
  {
    id: "burn-rate-calculator",
    title: "Startup Runway & Cash Burn Rate Calculator",
    name: "Startup Runway & Cash Burn Rate Calculator",
    category: "Business, HR & Freelance Tools",
    description: "Calculates monthly gross/net burn rate and cash runway months.",
    inputs: [
      {
            "id": "cashBalance",
            "label": "Current Cash Balance ($)",
            "type": "text",
            "placeholder": "250000"
    },
      {
            "id": "monthlyBurn",
            "label": "Monthly Expenses ($)",
            "type": "text",
            "placeholder": "20000"
    }
]
  },
  {
    id: "job-offer-comparator",
    title: "Job Offer Salary & Compensation Comparator",
    name: "Job Offer Salary & Compensation Comparator",
    category: "Business, HR & Freelance Tools",
    description: "Compares total compensation between two job offers (Base, Bonus, Equity, 401k).",
    inputs: [
      {
            "id": "offer1",
            "label": "Offer 1 Total Package ($)",
            "type": "text",
            "placeholder": "120000"
    },
      {
            "id": "offer2",
            "label": "Offer 2 Total Package ($)",
            "type": "text",
            "placeholder": "135000"
    }
]
  },
  {
    id: "overtime-pay-calc",
    title: "Overtime (1.5x / 2.0x) Pay Wage Calculator",
    name: "Overtime (1.5x / 2.0x) Pay Wage Calculator",
    category: "Business, HR & Freelance Tools",
    description: "Calculates weekly pay with regular and overtime (time-and-a-half) hours.",
    inputs: [
      {
            "id": "rate",
            "label": "Hourly Rate ($)",
            "type": "text",
            "placeholder": "25.00"
    },
      {
            "id": "hours",
            "label": "Total Weekly Hours Worked",
            "type": "text",
            "placeholder": "48"
    }
]
  },
  {
    id: "break-even-calculator",
    title: "Business Break-Even Point Calculator",
    name: "Business Break-Even Point Calculator",
    category: "Business, HR & Freelance Tools",
    description: "Calculates required unit sales volume to cover fixed and variable business costs.",
    inputs: [
      {
            "id": "fixedCosts",
            "label": "Total Fixed Costs ($)",
            "type": "text",
            "placeholder": "10000"
    }
]
  },
  {
    id: "consulting-proposal-calc",
    title: "Consulting Fee & Project Scope Estimator",
    name: "Consulting Fee & Project Scope Estimator",
    category: "Business, HR & Freelance Tools",
    description: "Calculates project proposal quotes based on estimated hours and risk buffer.",
    inputs: [
      {
            "id": "estimatedHours",
            "label": "Estimated Project Hours",
            "type": "text",
            "placeholder": "40"
    },
      {
            "id": "hourlyRate",
            "label": "Target Hourly Rate ($)",
            "type": "text",
            "placeholder": "100"
    }
]
  },
  {
    id: "nps-score-calculator",
    title: "Net Promoter Score (NPS) Calculator",
    name: "Net Promoter Score (NPS) Calculator",
    category: "Business, HR & Freelance Tools",
    description: "Calculates customer NPS score (-100 to +100) from survey feedback data.",
    inputs: [
      {
            "id": "promoters",
            "label": "Promoters Count (9-10)",
            "type": "text",
            "placeholder": "70"
    },
      {
            "id": "detractors",
            "label": "Detractors Count (0-6)",
            "type": "text",
            "placeholder": "10"
    },
      {
            "id": "total",
            "label": "Total Responses",
            "type": "text",
            "placeholder": "100"
    }
]
  },
  {
    id: "canonical-url-builder",
    title: "Canonical Tag & Hreflang Code Generator",
    name: "Canonical Tag & Hreflang Code Generator",
    category: "SEO & Webmaster Suite",
    description: "Generates SEO `<link rel=\"canonical\">` and `<link rel=\"alternate\" hreflang=\"...\">` tags.",
    inputs: [
      {
            "id": "url",
            "label": "Canonical Page URL",
            "type": "text",
            "placeholder": "https://example.com/page"
    }
]
  },
  {
    id: "redirect-301-generator",
    title: "NGINX & Apache 301 Redirect Rule Builder",
    name: "NGINX & Apache 301 Redirect Rule Builder",
    category: "SEO & Webmaster Suite",
    description: "Generates NGINX and Apache HTTP server redirect rules.",
    inputs: [
      {
            "id": "oldPath",
            "label": "Old URL Path",
            "type": "text",
            "placeholder": "/old-blog-post"
    },
      {
            "id": "newUrl",
            "label": "New Target URL",
            "type": "text",
            "placeholder": "https://example.com/new-blog-post"
    }
]
  },
  {
    id: "meta-viewport-builder",
    title: "Mobile Viewport & Web App Manifest Builder",
    name: "Mobile Viewport & Web App Manifest Builder",
    category: "SEO & Webmaster Suite",
    description: "Generates HTML meta viewport tags and Web App Manifest JSON files.",
    inputs: [
      {
            "id": "appName",
            "label": "Web Application Name",
            "type": "text",
            "placeholder": "Zenovee App"
    }
]
  },
  {
    id: "anchor-text-analyzer",
    title: "SEO Link Anchor Text Ratio Analyzer",
    name: "SEO Link Anchor Text Ratio Analyzer",
    category: "SEO & Webmaster Suite",
    description: "Analyzes backlink anchor text distributions for exact match vs branded ratios.",
    inputs: [
      {
            "id": "anchors",
            "label": "Anchor List (one per line)",
            "type": "textarea",
            "placeholder": "Brand Name\nclick here\nexact keyword"
    }
]
  },
  {
    id: "dns-record-generator",
    title: "DNS Record Generator (A, CNAME, MX, TXT)",
    name: "DNS Record Generator (A, CNAME, MX, TXT)",
    category: "SEO & Webmaster Suite",
    description: "Generates DNS zone file records for domain hosting.",
    inputs: [
      {
            "id": "domain",
            "label": "Domain Name",
            "type": "text",
            "placeholder": "example.com"
    }
]
  },
  {
    id: "security-headers-builder",
    title: "HTTP Security Headers Configuration Builder",
    name: "HTTP Security Headers Configuration Builder",
    category: "SEO & Webmaster Suite",
    description: "Generates Content-Security-Policy, HSTS, and X-Frame-Options server headers.",
    inputs: [
      {
            "id": "domain",
            "label": "Target Domain",
            "type": "text",
            "placeholder": "example.com"
    }
]
  },
  {
    id: "sitemap-index-generator",
    title: "XML Sitemap Index File Generator",
    name: "XML Sitemap Index File Generator",
    category: "SEO & Webmaster Suite",
    description: "Generates `<sitemapindex>` XML documents linking multiple sub-sitemaps.",
    inputs: [
      {
            "id": "baseUrl",
            "label": "Sitemap Base URL",
            "type": "text",
            "placeholder": "https://example.com/sitemaps"
    }
]
  },
  {
    id: "word-density-counter",
    title: "Advanced Keyword Density & TF-IDF Analyzer",
    name: "Advanced Keyword Density & TF-IDF Analyzer",
    category: "SEO & Webmaster Suite",
    description: "Calculates 1-word, 2-word, and 3-word n-gram keyword density percentages.",
    inputs: [
      {
            "id": "text",
            "label": "Page Content Body",
            "type": "textarea",
            "placeholder": "Paste page text to analyze keyword density..."
    }
]
  },
  {
    id: "broken-link-checker-ui",
    title: "Internal Link Syntax & Path Inspector",
    name: "Internal Link Syntax & Path Inspector",
    category: "SEO & Webmaster Suite",
    description: "Validates URL structures, query strings, and path protocols in HTML code.",
    inputs: [
      {
            "id": "htmlCode",
            "label": "Raw HTML Source Code",
            "type": "textarea",
            "placeholder": "<a href=\"/about\">About</a>"
    }
]
  },
  {
    id: "mobile-friendly-checker",
    title: "Responsive Breakpoint Resolution Tester",
    name: "Responsive Breakpoint Resolution Tester",
    category: "SEO & Webmaster Suite",
    description: "Tests element visibility across 320px, 768px, 1024px, and 1440px viewport widths.",
    inputs: [
      {
            "id": "url",
            "label": "URL to Test Layout",
            "type": "text",
            "placeholder": "https://example.com"
    }
]
  },
  {
    id: "bcrypt-hash-simulator",
    title: "Bcrypt & Key Derivation Cost Simulator",
    name: "Bcrypt & Key Derivation Cost Simulator",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Simulates Bcrypt hashing rounds (Work Factor 4 to 14) and salt generation.",
    inputs: [
      {
            "id": "password",
            "label": "Sample Secret Password",
            "type": "text",
            "placeholder": "SuperSecret123!"
    }
]
  },
  {
    id: "hmac-generator",
    title: "HMAC Signature Generator (SHA-256 / SHA-512)",
    name: "HMAC Signature Generator (SHA-256 / SHA-512)",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Generates HMAC signatures using secret keys via Web Crypto API.",
    inputs: [
      {
            "id": "secretKey",
            "label": "Secret HMAC Key",
            "type": "text",
            "placeholder": "my-api-secret"
    },
      {
            "id": "message",
            "label": "Message Data String",
            "type": "textarea",
            "placeholder": "timestamp=1700000000"
    }
]
  },
  {
    id: "aes-encryption-ui",
    title: "Client-Side AES-256 Text Encryption",
    name: "Client-Side AES-256 Text Encryption",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Encrypts and decrypts secret text using AES-GCM 256-bit cryptography locally.",
    inputs: [
      {
            "id": "secretText",
            "label": "Text to Encrypt / Decrypt",
            "type": "textarea",
            "placeholder": "Top Secret Message"
    },
      {
            "id": "passphrase",
            "label": "Encryption Passphrase",
            "type": "text",
            "placeholder": "MySecretKey123"
    }
]
  },
  {
    id: "crc32-checksum-calc",
    title: "CRC32 & Adler32 Checksum Calculator",
    name: "CRC32 & Adler32 Checksum Calculator",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Calculates CRC32 hexadecimal checksums for data integrity verification.",
    inputs: [
      {
            "id": "text",
            "label": "Data String Input",
            "type": "textarea",
            "placeholder": "Zenovee AI Suite"
    }
]
  },
  {
    id: "htpasswd-generator",
    title: "Apache .htpasswd Password Hash Generator",
    name: "Apache .htpasswd Password Hash Generator",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Generates Apache Basic Auth user credentials for `.htpasswd` files.",
    inputs: [
      {
            "id": "username",
            "label": "Username",
            "type": "text",
            "placeholder": "admin"
    },
      {
            "id": "password",
            "label": "Password",
            "type": "text",
            "placeholder": "SecretPass123"
    }
]
  },
  {
    id: "morse-binary-cipher",
    title: "ROT13 & Caesar Shift Cipher Tool",
    name: "ROT13 & Caesar Shift Cipher Tool",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Encodes and decodes text using Caesar Shift (ROT1 to ROT25) ciphers.",
    inputs: [
      {
            "id": "text",
            "label": "Message Text",
            "type": "textarea",
            "placeholder": "Hello World"
    },
      {
            "id": "shift",
            "label": "Shift Key Count",
            "type": "text",
            "placeholder": "13"
    }
]
  },
  {
    id: "csr-decoder",
    title: "SSL Certificate Signing Request (CSR) Decoder",
    name: "SSL Certificate Signing Request (CSR) Decoder",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Parses SSL CSR block data extracting Common Name, Org, and Key Size.",
    inputs: [
      {
            "id": "csrText",
            "label": "PEM CSR Code",
            "type": "textarea",
            "placeholder": "-----BEGIN CERTIFICATE REQUEST-----\n..."
    }
]
  },
  {
    id: "dmarc-generator",
    title: "DMARC Record Policy Generator",
    name: "DMARC Record Policy Generator",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Generates email security DMARC TXT records (`v=DMARC1; p=reject`).",
    inputs: [
      {
            "id": "domain",
            "label": "Domain Name",
            "type": "text",
            "placeholder": "example.com"
    }
]
  },
  {
    id: "spf-record-builder",
    title: "SPF Email Record Generator",
    name: "SPF Email Record Generator",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Generates DNS SPF TXT records defining authorized mail servers.",
    inputs: [
      {
            "id": "domain",
            "label": "Domain Name",
            "type": "text",
            "placeholder": "example.com"
    }
]
  },
  {
    id: "password-strength-meter",
    title: "Password Entropy & Crack Time Estimator",
    name: "Password Entropy & Crack Time Estimator",
    category: "Cryptography, Hashing & Cyber Tools",
    description: "Calculates bit entropy and estimated brute-force crack duration.",
    inputs: [
      {
            "id": "pass",
            "label": "Password String to Test",
            "type": "text",
            "placeholder": "P@ssw0rd2026!"
    }
]
  },
  {
    id: "periodic-table-explorer",
    title: "Interactive Periodic Table Element Lookup",
    name: "Interactive Periodic Table Element Lookup",
    category: "Education, Science & Engineering",
    description: "Displays atomic number, mass, symbol, and electron configuration for elements.",
    inputs: [
      {
            "id": "element",
            "label": "Element Symbol or Name",
            "type": "text",
            "placeholder": "Au or Gold"
    }
]
  },
  {
    id: "resistor-color-code",
    title: "Resistor Color Code Band Calculator",
    name: "Resistor Color Code Band Calculator",
    category: "Education, Science & Engineering",
    description: "Calculates resistor resistance (Ohms Ω) from 4-band and 5-band color sequences.",
    inputs: [
      {
            "id": "b1",
            "label": "Band 1 Color",
            "type": "dropdown",
            "options": [
                  "Brown (1)",
                  "Red (2)",
                  "Orange (3)",
                  "Yellow (4)",
                  "Green (5)",
                  "Blue (6)"
            ]
    },
      {
            "id": "b2",
            "label": "Band 2 Color",
            "type": "dropdown",
            "options": [
                  "Black (0)",
                  "Brown (1)",
                  "Red (2)",
                  "Orange (3)"
            ]
    }
]
  },
  {
    id: "ohms-law-calculator",
    title: "Ohm's Law Electrical Calculator",
    name: "Ohm's Law Electrical Calculator",
    category: "Education, Science & Engineering",
    description: "Calculates Voltage (V), Current (I), Resistance (R), and Power (W).",
    inputs: [
      {
            "id": "v",
            "label": "Voltage V (Volts)",
            "type": "text",
            "placeholder": "12"
    },
      {
            "id": "r",
            "label": "Resistance R (Ohms)",
            "type": "text",
            "placeholder": "4"
    }
]
  },
  {
    id: "physics-kinematics-calc",
    title: "Physics Kinematics Equations Solver",
    name: "Physics Kinematics Equations Solver",
    category: "Education, Science & Engineering",
    description: "Solves motion equations ($v = u + at$, $s = ut + 0.5at^2$).",
    inputs: [
      {
            "id": "u",
            "label": "Initial Velocity u (m/s)",
            "type": "text",
            "placeholder": "0"
    },
      {
            "id": "a",
            "label": "Acceleration a (m/s²)",
            "type": "text",
            "placeholder": "9.8"
    },
      {
            "id": "t",
            "label": "Time t (seconds)",
            "type": "text",
            "placeholder": "5"
    }
]
  },
  {
    id: "matrix-calculator",
    title: "Matrix Algebra & Determinant Calculator",
    name: "Matrix Algebra & Determinant Calculator",
    category: "Education, Science & Engineering",
    description: "Performs matrix addition, multiplication, and 2x2 / 3x3 determinant calculations.",
    inputs: [
      {
            "id": "m1",
            "label": "Matrix A (Row values space separated)",
            "type": "textarea",
            "placeholder": "1 2\n3 4"
    }
]
  },
  {
    id: "chemical-equation-balancer",
    title: "Chemical Molar Mass Calculator",
    name: "Chemical Molar Mass Calculator",
    category: "Education, Science & Engineering",
    description: "Calculates molecular weight and molar mass (g/mol) for chemical formulas.",
    inputs: [
      {
            "id": "formula",
            "label": "Chemical Formula",
            "type": "text",
            "placeholder": "H2SO4"
    }
]
  },
  {
    id: "gpa-weighted-calc",
    title: "High School & College Weighted GPA Calculator",
    name: "High School & College Weighted GPA Calculator",
    category: "Education, Science & Engineering",
    description: "Calculates weighted and unweighted Grade Point Averages.",
    inputs: [
      {
            "id": "grades",
            "label": "Grades & Credits (e.g. A 3, B 4)",
            "type": "textarea",
            "placeholder": "A 3\nB+ 4\nA 3"
    }
]
  },
  {
    id: "unit-converter-pro",
    title: "Engineering Pressure & Energy Converter",
    name: "Engineering Pressure & Energy Converter",
    category: "Education, Science & Engineering",
    description: "Converts units of Pressure (PSI, Bar, Pa), Energy (Joules, BTU, kWh), and Power.",
    inputs: [
      {
            "id": "val",
            "label": "Value to Convert",
            "type": "text",
            "placeholder": "100"
    }
]
  },
  {
    id: "quadratic-equation-solver",
    title: "Quadratic Equation Root Solver",
    name: "Quadratic Equation Root Solver",
    category: "Education, Science & Engineering",
    description: "Solves quadratic equation roots ($ax^2 + bx + c = 0$) using discriminant formula.",
    inputs: [
      {
            "id": "a",
            "label": "Coefficient a",
            "type": "text",
            "placeholder": "1"
    },
      {
            "id": "b",
            "label": "Coefficient b",
            "type": "text",
            "placeholder": "-5"
    },
      {
            "id": "c",
            "label": "Coefficient c",
            "type": "text",
            "placeholder": "6"
    }
]
  },
  {
    id: "significant-figures-calc",
    title: "Significant Figures (Sig Figs) Calculator",
    name: "Significant Figures (Sig Figs) Calculator",
    category: "Education, Science & Engineering",
    description: "Counts significant figures in numbers and rounds scientific calculations.",
    inputs: [
      {
            "id": "num",
            "label": "Input Number",
            "type": "text",
            "placeholder": "0.004050"
    }
]
  },
  {
    id: "rent-vs-buy-calculator",
    title: "Rent vs. Buy Home Comparison Calculator",
    name: "Rent vs. Buy Home Comparison Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Compares 10-year total net costs of renting vs purchasing real estate.",
    inputs: [
      {
            "id": "rent",
            "label": "Monthly Rent ($)",
            "type": "text",
            "placeholder": "2000"
    },
      {
            "id": "homePrice",
            "label": "Home Target Price ($)",
            "type": "text",
            "placeholder": "400000"
    }
]
  },
  {
    id: "car-loan-calculator",
    title: "Auto Loan Monthly Payment Calculator",
    name: "Auto Loan Monthly Payment Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates monthly car payments, total interest, and loan amortization.",
    inputs: [
      {
            "id": "price",
            "label": "Vehicle Price ($)",
            "type": "text",
            "placeholder": "35000"
    },
      {
            "id": "down",
            "label": "Down Payment ($)",
            "type": "text",
            "placeholder": "5000"
    }
]
  },
  {
    id: "paint-coverage-calculator",
    title: "Room Wall Paint & Coverage Calculator",
    name: "Room Wall Paint & Coverage Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates total gallons/liters of wall paint needed for room dimensions.",
    inputs: [
      {
            "id": "roomWidth",
            "label": "Room Width (ft)",
            "type": "text",
            "placeholder": "15"
    },
      {
            "id": "roomLength",
            "label": "Room Length (ft)",
            "type": "text",
            "placeholder": "20"
    }
]
  },
  {
    id: "tile-flooring-calculator",
    title: "Floor Tile & Grout Volume Calculator",
    name: "Floor Tile & Grout Volume Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates square footage and tile box counts including a 10% waste buffer.",
    inputs: [
      {
            "id": "sqft",
            "label": "Total Floor Area (sq ft)",
            "type": "text",
            "placeholder": "500"
    }
]
  },
  {
    id: "solar-panel-payback",
    title: "Solar Panel Cost & Payback Period Calculator",
    name: "Solar Panel Cost & Payback Period Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates solar installation ROI payback period in years.",
    inputs: [
      {
            "id": "cost",
            "label": "Solar Installation Cost ($)",
            "type": "text",
            "placeholder": "18000"
    }
]
  },
  {
    id: "appliance-energy-calc",
    title: "Electricity Appliance Running Cost Calculator",
    name: "Electricity Appliance Running Cost Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates monthly electricity cost per appliance based on Wattage.",
    inputs: [
      {
            "id": "watts",
            "label": "Appliance Power (Watts)",
            "type": "text",
            "placeholder": "1500"
    },
      {
            "id": "hours",
            "label": "Daily Hours Used",
            "type": "text",
            "placeholder": "4"
    }
]
  },
  {
    id: "property-tax-calculator",
    title: "Home Property Tax & Assessment Calculator",
    name: "Home Property Tax & Assessment Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates annual home property taxes from millage rate and assessed value.",
    inputs: [
      {
            "id": "value",
            "label": "Assessed Property Value ($)",
            "type": "text",
            "placeholder": "350000"
    }
]
  },
  {
    id: "car-depreciation-calc",
    title: "Vehicle Value Depreciation Calculator",
    name: "Vehicle Value Depreciation Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Projects 5-year vehicle market resale value depreciation curve.",
    inputs: [
      {
            "id": "msrp",
            "label": "New Car Price / MSRP ($)",
            "type": "text",
            "placeholder": "40000"
    }
]
  },
  {
    id: "concrete-volume-calc",
    title: "Concrete Slab Volume Calculator",
    name: "Concrete Slab Volume Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates cubic yards and 80lb bags of concrete required for slabs.",
    inputs: [
      {
            "id": "width",
            "label": "Slab Width (ft)",
            "type": "text",
            "placeholder": "10"
    },
      {
            "id": "length",
            "label": "Slab Length (ft)",
            "type": "text",
            "placeholder": "12"
    },
      {
            "id": "thickness",
            "label": "Slab Thickness (inches)",
            "type": "text",
            "placeholder": "4"
    }
]
  },
  {
    id: "mulch-landscaping-calc",
    title: "Landscaping Mulch & Soil Volume Calculator",
    name: "Landscaping Mulch & Soil Volume Calculator",
    category: "Home, Real Estate & Auto Tools",
    description: "Calculates cubic yards of garden mulch needed for target bed depth.",
    inputs: [
      {
            "id": "areaSqft",
            "label": "Garden Bed Area (sq ft)",
            "type": "text",
            "placeholder": "300"
    }
]
  },
  {
    id: "flight-duration-calc",
    title: "Flight Duration & Distance Calculator",
    name: "Flight Duration & Distance Calculator",
    category: "Travel, Time & World Utilities",
    description: "Calculates great-circle flight distance and travel hours between airports.",
    inputs: [
      {
            "id": "fromCode",
            "label": "Origin Airport (e.g. JFK)",
            "type": "text",
            "placeholder": "JFK"
    },
      {
            "id": "toCode",
            "label": "Destination Airport (e.g. LHR)",
            "type": "text",
            "placeholder": "LHR"
    }
]
  },
  {
    id: "jet-lag-advisor",
    title: "Jet Lag Recovery & Sleep Schedule Calculator",
    name: "Jet Lag Recovery & Sleep Schedule Calculator",
    category: "Travel, Time & World Utilities",
    description: "Calculates recommended sleep adjustments across multiple timezones.",
    inputs: [
      {
            "id": "timeShift",
            "label": "Timezone Shift (Hours)",
            "type": "text",
            "placeholder": "6"
    }
]
  },
  {
    id: "travel-budget-planner",
    title: "Daily Travel Expense Budget Calculator",
    name: "Daily Travel Expense Budget Calculator",
    category: "Travel, Time & World Utilities",
    description: "Calculates daily and total travel budget splits for trip planning.",
    inputs: [
      {
            "id": "totalBudget",
            "label": "Total Trip Budget ($)",
            "type": "text",
            "placeholder": "2500"
    },
      {
            "id": "days",
            "label": "Trip Duration (Days)",
            "type": "text",
            "placeholder": "10"
    }
]
  },
  {
    id: "timezone-converter-pro",
    title: "World Clock & Timezone Converter Matrix",
    name: "World Clock & Timezone Converter Matrix",
    category: "Travel, Time & World Utilities",
    description: "Converts local meeting times across UTC, EST, PST, GMT, IST, and JST.",
    inputs: [
      {
            "id": "localTime",
            "label": "Your Local Time",
            "type": "text",
            "placeholder": "03:00 PM"
    }
]
  },
  {
    id: "packing-list-generator",
    title: "Vacation & Travel Packing Checklist Generator",
    name: "Vacation & Travel Packing Checklist Generator",
    category: "Travel, Time & World Utilities",
    description: "Generates customized travel packing lists based on destination weather.",
    inputs: [
      {
            "id": "destination",
            "label": "Trip Destination",
            "type": "text",
            "placeholder": "Beach Resort"
    }
]
  },
  {
    id: "driving-cost-calculator",
    title: "Road Trip Fuel & Toll Cost Estimator",
    name: "Road Trip Fuel & Toll Cost Estimator",
    category: "Travel, Time & World Utilities",
    description: "Calculates gas costs for road trips based on distance, MPG, and gas price.",
    inputs: [
      {
            "id": "distance",
            "label": "Total Distance (miles)",
            "type": "text",
            "placeholder": "450"
    },
      {
            "id": "mpg",
            "label": "Vehicle MPG",
            "type": "text",
            "placeholder": "28"
    }
]
  },
  {
    id: "sun-angle-calculator",
    title: "Sunrise, Sunset & Golden Hour Calculator",
    name: "Sunrise, Sunset & Golden Hour Calculator",
    category: "Travel, Time & World Utilities",
    description: "Calculates local sunrise, sunset times, and golden hour photography windows.",
    inputs: [
      {
            "id": "lat",
            "label": "Latitude",
            "type": "text",
            "placeholder": "40.7128"
    }
]
  },
  {
    id: "nautical-distance-calc",
    title: "Nautical Miles to Miles & KM Converter",
    name: "Nautical Miles to Miles & KM Converter",
    category: "Travel, Time & World Utilities",
    description: "Converts between Nautical Miles (NM), Statute Miles, and Kilometers.",
    inputs: [
      {
            "id": "nm",
            "label": "Nautical Miles Value",
            "type": "text",
            "placeholder": "100"
    }
]
  },
  {
    id: "currency-cross-rate",
    title: "Currency Cross Rate Matrix Generator",
    name: "Currency Cross Rate Matrix Generator",
    category: "Travel, Time & World Utilities",
    description: "Calculates cross-currency exchange rates between USD, EUR, GBP, JPY, and AUD.",
    inputs: [
      {
            "id": "baseCurrency",
            "label": "Base Currency Code",
            "type": "dropdown",
            "options": [
                  "USD",
                  "EUR",
                  "GBP",
                  "JPY"
            ]
    }
]
  },
  {
    id: "coordinate-converter",
    title: "GPS Coordinate Converter (DD ↔ DMS)",
    name: "GPS Coordinate Converter (DD ↔ DMS)",
    category: "Travel, Time & World Utilities",
    description: "Converts GPS coordinates between Decimal Degrees and Deg/Min/Sec.",
    inputs: [
      {
            "id": "coords",
            "label": "Coordinates Input",
            "type": "text",
            "placeholder": "40.7128, -74.0060"
    }
]
  },
  {
    id: "dpi-sensitivity-converter",
    title: "Gaming Mouse DPI & Sensitivity Converter",
    name: "Gaming Mouse DPI & Sensitivity Converter",
    category: "Gaming, Streaming & Content Fun",
    description: "Converts eDPI mouse sensitivity between Valorant, CS2, Overwatch, and Apex.",
    inputs: [
      {
            "id": "dpi",
            "label": "Mouse DPI",
            "type": "text",
            "placeholder": "800"
    },
      {
            "id": "sens",
            "label": "Current Game Sensitivity",
            "type": "text",
            "placeholder": "0.4"
    }
]
  },
  {
    id: "twitch-bitrate-calc",
    title: "Twitch & OBS Streaming Bitrate Calculator",
    name: "Twitch & OBS Streaming Bitrate Calculator",
    category: "Gaming, Streaming & Content Fun",
    description: "Calculates optimal OBS bitrate settings for 720p/1080p 60fps broadcasts.",
    inputs: [
      {
            "id": "uploadSpeed",
            "label": "Internet Upload Speed (Mbps)",
            "type": "text",
            "placeholder": "20"
    }
]
  },
  {
    id: "dice-roller-pro",
    title: "RPG Polyhedral Dice Roller Simulator",
    name: "RPG Polyhedral Dice Roller Simulator",
    category: "Gaming, Streaming & Content Fun",
    description: "Simulates d4, d6, d8, d10, d12, d20, and d100 dice rolls with modifiers.",
    inputs: [
      {
            "id": "diceType",
            "label": "Dice Type",
            "type": "dropdown",
            "options": [
                  "d20 (D&D Standard)",
                  "2d6 (Board Games)",
                  "d100 (Percentile)",
                  "d6 (Cube)"
            ]
    }
]
  },
  {
    id: "poker-odds-calculator",
    title: "Texas Hold'em Poker Hand Odds Calculator",
    name: "Texas Hold'em Poker Hand Odds Calculator",
    category: "Gaming, Streaming & Content Fun",
    description: "Calculates pre-flop and flop winning probability percentages in Poker.",
    inputs: [
      {
            "id": "hand",
            "label": "Starting Hand (e.g. Ah Ks)",
            "type": "text",
            "placeholder": "Ah Ks"
    }
]
  },
  {
    id: "crosshair-generator",
    title: "FPS Game Crosshair Preview & Config Builder",
    name: "FPS Game Crosshair Preview & Config Builder",
    category: "Gaming, Streaming & Content Fun",
    description: "Renders custom FPS crosshairs and generates export config strings.",
    inputs: [
      {
            "id": "color",
            "label": "Crosshair Hex Color",
            "type": "text",
            "placeholder": "#00FF00"
    }
]
  },
  {
    id: "gamer-tag-generator",
    title: "Gamer Tag & Unique Username Generator",
    name: "Gamer Tag & Unique Username Generator",
    category: "Gaming, Streaming & Content Fun",
    description: "Generates creative gaming handles and username combinations.",
    inputs: [
      {
            "id": "keyword",
            "label": "Base Keyword",
            "type": "text",
            "placeholder": "Shadow"
    }
]
  },
  {
    id: "chess-pgn-viewer",
    title: "Chess PGN Reader & Game Notation Viewer",
    name: "Chess PGN Reader & Game Notation Viewer",
    category: "Gaming, Streaming & Content Fun",
    description: "Parses Portable Game Notation (.PGN) chess games into move lists.",
    inputs: [
      {
            "id": "pgnText",
            "label": "PGN Game Text",
            "type": "textarea",
            "placeholder": "1. e4 e5 2. Nf3 Nc6 3. Bb5 a6"
    }
]
  },
  {
    id: "reaction-time-tester",
    title: "In-Browser Visual Reaction Time Speed Tester",
    name: "In-Browser Visual Reaction Time Speed Tester",
    category: "Gaming, Streaming & Content Fun",
    description: "Measures visual response time in milliseconds upon color change.",
    inputs: [
      {
            "id": "action",
            "label": "Test Mode",
            "type": "dropdown",
            "options": [
                  "Click to Start Reaction Test"
            ]
    }
]
  },
  {
    id: "cps-click-tester",
    title: "Clicks Per Second (CPS) Speed Test Widget",
    name: "Clicks Per Second (CPS) Speed Test Widget",
    category: "Gaming, Streaming & Content Fun",
    description: "Measures mouse clicking speed over 1, 5, or 10-second test intervals.",
    inputs: [
      {
            "id": "interval",
            "label": "Test Duration",
            "type": "dropdown",
            "options": [
                  "5 Seconds Test",
                  "10 Seconds Test"
            ]
    }
]
  },
  {
    id: "typing-speed-tester",
    title: "1-Minute WPM Typing Speed Test",
    name: "1-Minute WPM Typing Speed Test",
    category: "Gaming, Streaming & Content Fun",
    description: "Measures typing speed in Words Per Minute (WPM) and accuracy score.",
    inputs: [
      {
            "id": "sample",
            "label": "Typing Sample",
            "type": "textarea",
            "placeholder": "The quick brown fox jumps over the lazy dog."
    }
]
  },
  {
    id: "decision-matrix-builder",
    title: "Weighted Decision Matrix Builder",
    name: "Weighted Decision Matrix Builder",
    category: "Personal Utility & Productivity Tools",
    description: "Ranks multiple options objectively using weighted custom criteria.",
    inputs: [
      {
            "id": "options",
            "label": "Options List (comma separated)",
            "type": "text",
            "placeholder": "Option A, Option B, Option C"
    }
]
  },
  {
    id: "habits-streak-tracker",
    title: "Habit Tracker & 30-Day Grid Sheet Builder",
    name: "Habit Tracker & 30-Day Grid Sheet Builder",
    category: "Personal Utility & Productivity Tools",
    description: "Generates printable 30-day habit streak matrices for personal goals.",
    inputs: [
      {
            "id": "habitName",
            "label": "Habit Title",
            "type": "text",
            "placeholder": "Read 20 Pages Daily"
    }
]
  },
  
  {
    id: "pomodoro-sound-generator",
    title: "Pomodoro Ambient Focus Audio Generator",
    name: "Pomodoro Ambient Focus Audio Generator",
    category: "Personal Utility & Productivity Tools",
    description: "Synthesizes focus white noise and ambient sounds via Web Audio API.",
    inputs: [
      {
            "id": "soundType",
            "label": "Sound Profile",
            "type": "dropdown",
            "options": [
                  "Pink Noise Focus",
                  "Brown Noise Deep",
                  "Sine Wave Tone"
            ]
    }
]
  },
  {
    id: "mind-map-markdown",
    title: "Text-to-Mindmap Markdown Node Generator",
    name: "Text-to-Mindmap Markdown Node Generator",
    category: "Personal Utility & Productivity Tools",
    description: "Converts indented list text into structured visual node diagrams.",
    inputs: [
      {
            "id": "listText",
            "label": "Indented List",
            "type": "textarea",
            "placeholder": "Project\n  Task 1\n  Task 2"
    }
]
  },
  {
    id: "daily-journal-prompts",
    title: "Daily Reflection & Gratitude Journal Builder",
    name: "Daily Reflection & Gratitude Journal Builder",
    category: "Personal Utility & Productivity Tools",
    description: "Generates daily self-reflection questions and gratitude prompts.",
    inputs: [
      {
            "id": "theme",
            "label": "Journaling Focus",
            "type": "dropdown",
            "options": [
                  "Morning Intentions",
                  "Evening Gratitude",
                  "Mindfulness Check-In"
            ]
    }
]
  },
  {
    id: "to-do-matrix-eisenhower",
    title: "Eisenhower Priority Task Sorter",
    name: "Eisenhower Priority Task Sorter",
    category: "Personal Utility & Productivity Tools",
    description: "Categorizes tasks into Urgent/Important 4-quadrant decision boxes.",
    inputs: [
      {
            "id": "tasks",
            "label": "Task List Lines",
            "type": "textarea",
            "placeholder": "Fix server bug\nRead book\nPlan vacation"
    }
]
  },
  {
    id: "gift-budget-planner",
    title: "Holiday & Birthday Gift Budget Allocator",
    name: "Holiday & Birthday Gift Budget Allocator",
    category: "Personal Utility & Productivity Tools",
    description: "Allocates gift spending caps per recipient and tracks budget totals.",
    inputs: [
      {
            "id": "totalBudget",
            "label": "Total Gift Budget ($)",
            "type": "text",
            "placeholder": "500"
    }
]
  },
  {
    id: "event-guest-list-calc",
    title: "Event Guest & Party Catering Estimator",
    name: "Event Guest & Party Catering Estimator",
    category: "Personal Utility & Productivity Tools",
    description: "Estimates food portions, beverage counts, and seating requirements.",
    inputs: [
      {
            "id": "guestCount",
            "label": "Total Guests Count",
            "type": "text",
            "placeholder": "50"
    }
]
  },
  {
    id: "bill-splitter-advanced",
    title: "Apartment Rent & Expense Splitter by Sq Ft",
    name: "Apartment Rent & Expense Splitter by Sq Ft",
    category: "Personal Utility & Productivity Tools",
    description: "Splits monthly rent and utility expenses proportionally by room size.",
    inputs: [
      {
            "id": "rentTotal",
            "label": "Total Apartment Rent ($)",
            "type": "text",
            "placeholder": "2400"
    }
]
  },
];
