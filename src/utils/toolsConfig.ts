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
    id: "headline-analyzer",
    title: "Headline Analyzer & Readability Scorer",
    name: "Headline Analyzer & Readability Scorer",
    category: "Growth Marketing",
    description: "Evaluates title power words, emotional score, character length, and Flesch-Kincaid readability instantly.",
    inputs: [
      { id: "headline", label: "Target Article/Email Headline Title", type: "text", placeholder: "Type your headline (e.g. 'How to Free Up Server Space in 5 Minutes')" }
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
    id: "base64-encoder-decoder",
    title: "Base64 Encoder / Decoder",
    name: "Base64 Encoder / Decoder",
    category: "Converters & Encoders",
    description: "Encodes plain text into Base64 or decodes Base64 strings safely with UTF-8 support.",
    inputs: [
      { id: "text", label: "Input Text / Base64 Payload", type: "textarea", placeholder: "Enter text to encode or Base64 string to decode..." },
      { id: "mode", label: "Processing Mode", type: "dropdown", options: ["Encode to Base64", "Decode from Base64"] }
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
    id: "json-to-csv",
    title: "JSON to CSV Converter",
    name: "JSON to CSV Converter",
    category: "Converters & Encoders",
    description: "Transforms JSON arrays of objects into structured CSV tabular spreadsheets with validation.",
    inputs: [
      { id: "jsonInput", label: "JSON Array Payload", type: "textarea", placeholder: '[\n  {"id": 1, "name": "Alice", "role": "Developer"},\n  {"id": 2, "name": "Bob", "role": "Designer"}\n]' }
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
    id: "markdown-to-html",
    title: "Markdown to HTML Live Previewer",
    name: "Markdown to HTML Live Previewer",
    category: "Converters & Encoders",
    description: "Converts raw Markdown syntax into formatted HTML tags locally.",
    inputs: [
      { id: "mdText", label: "Markdown Syntax Text", type: "textarea", placeholder: "# Headline 1\n\nThis is **bold** text." }
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
    id: "lorem-generator",
    title: "Lorem Ipsum Placeholder Text Generator",
    name: "Lorem Ipsum Placeholder Text Generator",
    category: "Text & Code Formatters",
    description: "Generates classical Lorem Ipsum placeholder text by paragraphs, sentences, or word count.",
    inputs: [
      { id: "count", label: "Output Count", type: "text", placeholder: "3" },
      { id: "unit", label: "Generation Unit", type: "dropdown", options: ["Paragraphs", "Sentences", "Words"] }
    ]
  },
  {
    id: "case-converter",
    title: "Text Case Converter",
    name: "Text Case Converter",
    category: "Text & Code Formatters",
    description: "Transforms text into UPPERCASE, lowercase, Title Case, camelCase, snake_case, and kebab-case.",
    inputs: [
      { id: "text", label: "Raw Input Text", type: "textarea", placeholder: "Hello world! Build fast client side tools." },
      { id: "casing", label: "Target Case Style", type: "dropdown", options: ["UPPERCASE", "lowercase", "Title Case", "camelCase", "snake_case", "kebab-case"] }
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
  }
];
