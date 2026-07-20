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
  // 1. CONTENT CREATOR & SOCIAL MEDIA ENGINES
  // ==========================================
  {
    id: "tiktok-duration",
    title: "TikTok/Reels Script Video Duration Estimator",
    name: "TikTok/Reels Script Video Duration Estimator",
    category: "Content Creation",
    description: "Calculates exact video duration, word count, speaking pace (150 WPM / 2.5 WPS), hook timing, and scene splits for viral short-form video scripts.",
    inputs: [
      { id: "script", label: "Script Text", type: "textarea", placeholder: "Paste your TikTok, Reels, or Shorts script here..." },
      { id: "pace", label: "Speaking Pace (WPM)", type: "dropdown", options: ["150 WPM (Standard Short-Form - 2.5 words/sec)", "160 WPM (Fast Hype Pace)", "130 WPM (Conversational)", "110 WPM (Slow Storytelling)"] }
    ]
  },
  {
    id: "tiktok-script-estimator",
    title: "TikTok Script Duration Estimator",
    name: "TikTok Script Duration Estimator",
    category: "Content Creation",
    description: "Calculates exact video duration, word count, speaking pace, hook timing, and scene splits for viral short-form video scripts.",
    inputs: [
      { id: "script", label: "Script Text", type: "textarea", placeholder: "Paste your TikTok, Reels, or Shorts script here..." },
      { id: "pace", label: "Speaking Pace", type: "dropdown", options: ["150 WPM (Standard Short-Form)", "160 WPM (Fast Pace)", "130 WPM (Conversational)"] }
    ]
  },
  {
    id: "social-formatter",
    title: "Social Media Unicode Text Formatter",
    name: "Social Media Unicode Text Formatter",
    category: "Content Creation",
    description: "Converts standard text into bold mathematical Unicode symbols, italics, script, and monospace fonts for LinkedIn and X.",
    inputs: [
      { id: "text", label: "Input Text to Format", type: "textarea", placeholder: "Type or paste the text you want to convert into bold/italic Unicode..." },
      { id: "style", label: "Primary Unicode Style", type: "dropdown", options: ["Bold Sans", "Bold Serif", "Italic Serif", "Monospace", "Underlined"] }
    ]
  },
  {
    id: "social-text-formatter",
    title: "Social Media Text Formatter",
    name: "Social Media Text Formatter",
    category: "Content Creation",
    description: "Transforms plain text into bold, italic, monospace, underlined, and stylized Unicode text for LinkedIn, X (Twitter), and Instagram.",
    inputs: [
      { id: "text", label: "Input Text", type: "textarea", placeholder: "Type or paste the text you want to format..." },
      { id: "style", label: "Primary Font Style", type: "dropdown", options: ["Bold Sans", "Bold Serif", "Italic Serif", "Monospace", "Underlined"] }
    ]
  },
  {
    id: "hashtag-generator",
    title: "Hashtag Generator & Multiplier",
    name: "Hashtag Generator & Multiplier",
    category: "Content Creation",
    description: "Generates targeted hashtag sets for Instagram, TikTok, LinkedIn, and X grouped by popularity, niche, and viral volume.",
    inputs: [
      { id: "topic", label: "Niche Topic / Main Keyword", type: "text", placeholder: "e.g., web development, SaaS, marketing" },
      { id: "platform", label: "Social Platform", type: "dropdown", options: ["Instagram", "TikTok", "LinkedIn", "X (Twitter)"] },
      { id: "volume", label: "Hashtag Output Quantity", type: "dropdown", options: ["10 Essential Hashtags", "20 Mixed Scale Hashtags", "30 Complete Hashtag Stack"] }
    ]
  },
  {
    id: "bio-bento",
    title: "Bio Link Bento Grid Builder",
    name: "Bio Link Bento Grid Builder",
    category: "Content Creation",
    description: "Generates HTML/CSS code and layout blueprints for a modern social media bio link bento grid.",
    inputs: [
      { id: "name", label: "Profile Name / Brand Title", type: "text", placeholder: "e.g., Zenovee AI Suite" },
      { id: "bio", label: "Short Profile Bio", type: "text", placeholder: "e.g., 50+ Free Client-Side Developer Utilities" },
      { id: "primaryLink", label: "Featured Link URL", type: "text", placeholder: "https://zenovee.ai/dashboard" },
      { id: "socialLinks", label: "Social Handles (Comma Separated)", type: "text", placeholder: "twitter:@zenovee, github:zenovee" }
    ]
  },
  {
    id: "caption-fixer",
    title: "Caption Line-Break Fixer",
    name: "Caption Line-Break Fixer",
    category: "Content Creation",
    description: "Cleans and preserves clean invisible line breaks for Instagram and LinkedIn captions without awkward periods or dots.",
    inputs: [
      { id: "caption", label: "Raw Caption Text", type: "textarea", placeholder: "Paste your social media caption with line breaks..." }
    ]
  },
  {
    id: "yt-preview",
    title: "YouTube Thumbnail & Title Preview Studio",
    name: "YouTube Thumbnail & Title Preview Studio",
    category: "Content Creation",
    description: "Previews how video thumbnails, titles, channel name, and view counts look across desktop and mobile YouTube search results.",
    inputs: [
      { id: "title", label: "Video Title", type: "text", placeholder: "How I Built a 100% Free Client Utility Hub in Next.js" },
      { id: "channel", label: "Channel Name", type: "text", placeholder: "Zenovee Engineering" },
      { id: "views", label: "Simulated Views & Age", type: "text", placeholder: "142K views · 3 days ago" },
      { id: "thumbnailUrl", label: "Thumbnail Image URL (Optional)", type: "text", placeholder: "https://example.com/thumbnail.jpg" }
    ]
  },
  {
    id: "sentiment-analyzer",
    title: "Title & Hook Sentiment Analyzer",
    name: "Title & Hook Sentiment Analyzer",
    category: "Content Creation",
    description: "Analyzes headlines and video hooks for emotional tone, urgency triggers, curiosity gap, and click-through score.",
    inputs: [
      { id: "hookText", label: "Hook / Title Text", type: "textarea", placeholder: "Why 90% of SaaS founders are switching to serverless utilities in 2026..." }
    ]
  },
  {
    id: "safe-zone",
    title: "Short-Form Video Safe-Zone Overlay Guide",
    name: "Short-Form Video Safe-Zone Overlay Guide",
    category: "Content Creation",
    description: "Displays safe margins for text, captions, and graphics to prevent UI overlap on TikTok, Reels, and YouTube Shorts.",
    inputs: [
      { id: "platform", label: "Target Short-Form Platform", type: "dropdown", options: ["TikTok (Includes Like/Comment/Share Buttons)", "Instagram Reels (Includes Audio & Caption Overlay)", "YouTube Shorts (Includes Subscribe & Channel Info)"] }
    ]
  },
  {
    id: "filler-word-counter",
    title: "Audio Script Filler Word Counter",
    name: "Audio Script Filler Word Counter",
    category: "Content Creation",
    description: "Scans podcast transcripts and video scripts to highlight and count filler words (um, like, basically, actually, honestly).",
    inputs: [
      { id: "script", label: "Podcast / Video Transcript", type: "textarea", placeholder: "Paste your spoken transcript or speech here..." }
    ]
  },
  {
    id: "timestamp-markdown",
    title: "Timestamp to Markdown Formatter",
    name: "Timestamp to Markdown Formatter",
    category: "Content Creation",
    description: "Converts raw video timestamps (`01:23 Intro`) into clickable YouTube descriptions and Markdown chapter lists.",
    inputs: [
      { id: "timestamps", label: "Raw Timestamps List (One per line)", type: "textarea", placeholder: "00:00 Introduction\n02:15 Setting up Next.js\n05:40 Client-side Execution\n10:12 Summary & Conclusion" }
    ]
  },

  // ==========================================
  // 2. GROWTH MARKETING & ADS UTILITIES
  // ==========================================
  {
    id: "utm-builder",
    title: "UTM Link Architecture Builder",
    name: "UTM Link Architecture Builder",
    category: "Growth Marketing",
    description: "Generates clean, tracking-ready URLs with standard Google Analytics UTM campaign parameters.",
    inputs: [
      { id: "url", label: "Target Landing Page URL", type: "text", placeholder: "https://zenovee.ai/dashboard" },
      { id: "source", label: "UTM Source (utm_source)", type: "text", placeholder: "google, newsletter, linkedin" },
      { id: "medium", label: "UTM Medium (utm_medium)", type: "text", placeholder: "cpc, email, social" },
      { id: "campaign", label: "UTM Campaign (utm_campaign)", type: "text", placeholder: "summer_launch_2026" },
      { id: "term", label: "UTM Term / Keyword (Optional)", type: "text", placeholder: "free_productivity_tools" },
      { id: "content", label: "UTM Content / Banner (Optional)", type: "text", placeholder: "sidebar_banner_v1" }
    ]
  },
  {
    id: "text-ratio",
    title: "Ad Image Text Ratio Checker",
    name: "Ad Image Text Ratio Checker",
    category: "Growth Marketing",
    description: "Evaluates ad creative text coverage against Meta & Google 20% grid rule guidelines.",
    inputs: [
      { id: "headlineText", label: "On-Image Overlay Text", type: "textarea", placeholder: "Type the text appearing directly on your ad image graphic..." },
      { id: "textSize", label: "Text Font Size / Area Scale", type: "dropdown", options: ["Small Subtitle (<15% Area - Pass)", "Medium Headline (15-20% Area - Pass)", "Large Overlay (>20% Area - Warning)"] }
    ]
  },
  {
    id: "roas-matrix",
    title: "Return on Ad Spend (RoAS) Calculator",
    name: "Return on Ad Spend (RoAS) Calculator",
    category: "Growth Marketing",
    description: "Calculates Return on Ad Spend (ROAS), break-even ROAS %, net ad profit, and cost-per-acquisition (CPA).",
    inputs: [
      { id: "adSpend", label: "Total Ad Spend ($)", type: "text", placeholder: "5000" },
      { id: "revenue", label: "Total Revenue Generated ($)", type: "text", placeholder: "18500" },
      { id: "profitMargin", label: "Product Profit Margin %", type: "text", placeholder: "75" }
    ]
  },
  {
    id: "lookalike-reach",
    title: "Lookalike Audience Size Estimator",
    name: "Lookalike Audience Size Estimator",
    category: "Growth Marketing",
    description: "Estimates target audience pool sizes across Meta, LinkedIn, and Google based on seed list size and geographic percentage.",
    inputs: [
      { id: "seedSize", label: "Seed Customer List Count", type: "text", placeholder: "2500" },
      { id: "country", label: "Target Country / Region", type: "dropdown", options: ["United States", "United Kingdom", "Canada", "Global / Multi-Region"] },
      { id: "percentage", label: "Lookalike Percentage Tier", type: "dropdown", options: ["1% (Highest Intent & Similarity)", "2% (Balanced Scale)", "5% (Broad Reach)", "10% (Maximum Volume)"] }
    ]
  },
  {
    id: "headline-permutator",
    title: "Headline Variation Permutation Generator",
    name: "Headline Variation Permutation Generator",
    category: "Growth Marketing",
    description: "Combines hooks, value propositions, and calls-to-action into matrix variations for A/B ad testing.",
    inputs: [
      { id: "hooks", label: "Hooks / Triggers (Comma Separated)", type: "text", placeholder: "Get 50+ Free Tools, Stop Paying for SaaS, Fast Web Utilities" },
      { id: "features", label: "Core Features (Comma Separated)", type: "text", placeholder: "100% Client-Side, Zero Server Latency, Instant WebP Conversion" },
      { id: "ctas", label: "Calls to Action (Comma Separated)", type: "text", placeholder: "Try Free Now, Open Suite, Get Started" }
    ]
  },
  {
    id: "emoji-copy",
    title: "Emoji Inserter for Copywriters",
    name: "Emoji Inserter for Copywriters",
    category: "Growth Marketing",
    description: "Enriches ad text and marketing copy with contextual emojis for higher click-through rates.",
    inputs: [
      { id: "copy", label: "Marketing Copy Text", type: "textarea", placeholder: "Paste your ad or social copy here..." },
      { id: "density", label: "Emoji Density", type: "dropdown", options: ["Subtle (Bullet Points & Headings)", "Moderate (High Engagement)", "Aggressive (Social Hype)"] }
    ]
  },
  {
    id: "coupon-sanitizer",
    title: "Promo Code Format Sanitizer",
    name: "Promo Code Format Sanitizer",
    category: "Growth Marketing",
    description: "Cleans, formats, and sanitizes promo codes into standardized uppercase alphanumeric strings.",
    inputs: [
      { id: "rawCodes", label: "Raw Code List (One per line or comma separated)", type: "textarea", placeholder: "summer sale 2026\n50 OFF free\nwelcome_deal_10" }
    ]
  },
  {
    id: "cro-checklist",
    title: "Conversion Rate Optimization Checklist Tracker",
    name: "Conversion Rate Optimization Checklist Tracker",
    category: "Growth Marketing",
    description: "Evaluates landing pages against 20 essential CRO friction points (page speed, clear H1, social proof, single CTA).",
    inputs: [
      { id: "pageUrl", label: "Landing Page URL", type: "text", placeholder: "https://zenovee.ai/dashboard" },
      { id: "pageType", label: "Landing Page Archetype", type: "dropdown", options: ["SaaS Product Page", "Lead Generation Form", "E-Commerce Product Detail", "Free Utility Hub"] }
    ]
  },
  {
    id: "lead-incentive",
    title: "Lead Magnet Value Estimator",
    name: "Lead Magnet Value Estimator",
    category: "Growth Marketing",
    description: "Estimates conversion rate and subscriber growth potential of ebooks, templates, and free utilities.",
    inputs: [
      { id: "offerType", label: "Lead Magnet Format", type: "dropdown", options: ["Free Utility / Calculator Tool", "PDF Checklist / Cheat Sheet", "Video Masterclass / Mini-Course", "Template Pack"] },
      { id: "monthlyTraffic", label: "Estimated Monthly Page Visitors", type: "text", placeholder: "5000" }
    ]
  },
  {
    id: "ad-framework-scanner",
    title: "Competitor Ad Format Scanner Simulator",
    name: "Competitor Ad Format Scanner Simulator",
    category: "Growth Marketing",
    description: "Simulates competitor ad creative breakdown identifying primary hooks, visual angles, and offer structures.",
    inputs: [
      { id: "adCopy", label: "Competitor Ad Text / Script", type: "textarea", placeholder: "Paste competitor ad copy to dissect..." }
    ]
  },

  // ==========================================
  // 3. PRODUCTIVITY SOLVERS
  // ==========================================
  {
    id: "privacy-gen",
    title: "Privacy Policy / Terms Generator",
    name: "Privacy Policy / Terms Generator",
    category: "Productivity Solvers",
    description: "Generates standard client-side Privacy Policy and Terms of Service documents compliant with GDPR & CCPA disclosures.",
    inputs: [
      { id: "companyName", label: "Company / App Name", type: "text", placeholder: "Zenovee Free Suite" },
      { id: "websiteUrl", label: "Website URL", type: "text", placeholder: "https://zenovee.ai" },
      { id: "contactEmail", label: "Support Contact Email", type: "text", placeholder: "support@zenovee.ai" },
      { id: "dataPolicy", label: "Data Processing Level", type: "dropdown", options: ["No Personal Data Collected (100% Local)", "Basic Analytics & Cookies", "User Accounts & Profiles"] }
    ]
  },
  {
    id: "privacy-policy-generator",
    title: "Privacy Policy Framework Generator",
    name: "Privacy Policy Framework Generator",
    category: "Productivity Solvers",
    description: "Generates a customized, client-side Privacy Policy document outline compliant with GDPR and CCPA standard disclosures.",
    inputs: [
      { id: "companyName", label: "Company / App Name", type: "text", placeholder: "Zenovee Free Suite" },
      { id: "websiteUrl", label: "Website URL", type: "text", placeholder: "https://zenovee.ai" },
      { id: "contactEmail", label: "Support / Contact Email", type: "text", placeholder: "support@zenovee.ai" }
    ]
  },
  {
    id: "json-csv",
    title: "JSON to CSV Visual Table Transformer",
    name: "JSON to CSV Visual Table Transformer",
    category: "Productivity Solvers",
    description: "Converts JSON arrays of objects into structured CSV tabular data downloadable as `.csv`.",
    inputs: [
      { id: "json", label: "JSON Array Input", type: "textarea", placeholder: '[{"id":1,"name":"Alice","role":"Developer"},{"id":2,"name":"Bob","role":"Designer"}]' }
    ]
  },
  {
    id: "svg-optimizer",
    title: "SVG Vector Code Previewer & Optimizer",
    name: "SVG Vector Code Previewer & Optimizer",
    category: "Productivity Solvers",
    description: "Previews raw SVG code live, cleans unused attributes, and formats SVG for inline HTML usage.",
    inputs: [
      { id: "svgCode", label: "Raw SVG Markup Code", type: "textarea", placeholder: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="..."/></svg>' }
    ]
  },
  {
    id: "markdown-canvas",
    title: "Markdown Workspace Canvas",
    name: "Markdown Workspace Canvas",
    category: "Productivity Solvers",
    description: "Interactive real-time split-screen Markdown editor with live preview, word count, and copy/export controls.",
    inputs: [
      { id: "markdown", label: "Markdown Document Input", type: "textarea", placeholder: "# Welcome to Markdown Canvas\n\n- Write notes\n- Format docs\n- Export `.md` files" }
    ]
  },
  {
    id: "webp-converter",
    title: "Bulk Image WebP Converter",
    name: "Bulk Image WebP Converter",
    category: "Productivity Solvers",
    description: "Converts images (PNG, JPEG, GIF) to WebP format using a hidden HTML canvas context in browser memory.",
    inputs: [
      { id: "file", label: "Select Image File", type: "file" },
      { id: "quality", label: "WebP Quality (1-100)", type: "text", placeholder: "80" },
      { id: "maxWidth", label: "Maximum Image Width (Pixels)", type: "text", placeholder: "1920" }
    ]
  },
  {
    id: "bulk-image-webp",
    title: "Bulk Image WebP & Compression Configurator",
    name: "Bulk Image WebP & Compression Configurator",
    category: "Productivity Solvers",
    description: "Configures client-side image compression parameters, WebP format conversion rules, and target dimensions.",
    inputs: [
      { id: "file", label: "Select Image File", type: "file" },
      { id: "quality", label: "WebP Quality (1-100)", type: "text", placeholder: "80" },
      { id: "maxWidth", label: "Max Image Width", type: "text", placeholder: "1920" }
    ]
  },
  {
    id: "base64-codec",
    title: "Base64 String Encoder / Decoder",
    name: "Base64 String Encoder / Decoder",
    category: "Productivity Solvers",
    description: "Encodes raw strings into Base64 format or decodes Base64 data instantly in browser memory.",
    inputs: [
      { id: "text", label: "Input Data", type: "textarea", placeholder: "Paste plain text or base64 string..." },
      { id: "mode", label: "Action Mode", type: "dropdown", options: ["Encode to Base64", "Decode from Base64"] }
    ]
  },
  {
    id: "base64-encoder",
    title: "Base64 Encoder & Decoder",
    name: "Base64 Encoder & Decoder",
    category: "Productivity Solvers",
    description: "Encodes raw strings into Base64 format or decodes Base64 data instantly in browser memory.",
    inputs: [
      { id: "text", label: "Input Data", type: "textarea", placeholder: "Paste plain text or base64 string..." },
      { id: "mode", label: "Action Mode", type: "dropdown", options: ["Encode to Base64", "Decode from Base64"] }
    ]
  },
  {
    id: "regex-sandbox",
    title: "Regex Pattern Interactive Sandbox",
    name: "Regex Pattern Interactive Sandbox",
    category: "Productivity Solvers",
    description: "Tests regular expressions against test text, extracting matched groups and match counts.",
    inputs: [
      { id: "pattern", label: "Regular Expression Pattern", type: "text", placeholder: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}" },
      { id: "flags", label: "RegEx Flags", type: "text", placeholder: "gim" },
      { id: "testText", label: "Test Input String", type: "textarea", placeholder: "Contact us at hello@zenovee.ai or sales@example.com" }
    ]
  },
  {
    id: "csv-dedup",
    title: "CSV De-duplicator & Cleaner",
    name: "CSV De-duplicator & Cleaner",
    category: "Productivity Solvers",
    description: "Removes duplicate rows from CSV spreadsheets based on a selected primary column key.",
    inputs: [
      { id: "csvData", label: "CSV Data Text", type: "textarea", placeholder: "email,name\nalice@example.com,Alice\nbob@example.com,Bob\nalice@example.com,Alice" },
      { id: "keyColumn", label: "Deduplication Key Column (1-indexed)", type: "text", placeholder: "1" }
    ]
  },
  {
    id: "text-diff",
    title: "Text Diff Comparator",
    name: "Text Diff Comparator",
    category: "Productivity Solvers",
    description: "Compares two blocks of text line by line to highlight additions, deletions, and modifications.",
    inputs: [
      { id: "original", label: "Original Text Block", type: "textarea", placeholder: "Paste original version..." },
      { id: "modified", label: "Modified Text Block", type: "textarea", placeholder: "Paste new version..." }
    ]
  },
  {
    id: "sql-prettifier",
    title: "SQL Prettifier & Script Formatter",
    name: "SQL Prettifier & Script Formatter",
    category: "Productivity Solvers",
    description: "Cleans up unformatted SQL queries with proper line breaks, uppercase keywords, and consistent indents.",
    inputs: [
      { id: "query", label: "Raw SQL Query", type: "textarea", placeholder: "select id, name, email from users where active = 1 order by id desc" }
    ]
  },

  // ==========================================
  // 4. FINANCIAL & SALES OPERATIONS CALCULATORS
  // ==========================================
  {
    id: "freelance-rate",
    title: "Freelancer Dynamic Hourly Rate Calculator",
    name: "Freelancer Dynamic Hourly Rate Calculator",
    category: "Financial Calculators",
    description: "Calculates required hourly billing rate based on annual target income, business overhead, and billable hours.",
    inputs: [
      { id: "targetIncome", label: "Desired Annual Net Income ($)", type: "text", placeholder: "90000" },
      { id: "overhead", label: "Annual Expenses & Taxes ($)", type: "text", placeholder: "20000" },
      { id: "billableHoursPerWeek", label: "Billable Hours per Week", type: "text", placeholder: "25" },
      { id: "vacationWeeks", label: "Vacation Weeks per Year", type: "text", placeholder: "4" }
    ]
  },
  {
    id: "saas-forecaster",
    title: "SaaS Churn & MRR Forecast Modeler",
    name: "SaaS Churn & MRR Forecast Modeler",
    category: "Financial Calculators",
    description: "Models 12-month MRR projections, customer churn impacts, and net new revenue trajectories.",
    inputs: [
      { id: "startingMrr", label: "Starting MRR ($)", type: "text", placeholder: "25000" },
      { id: "newMrrPerMonth", label: "New MRR Added per Month ($)", type: "text", placeholder: "3000" },
      { id: "monthlyChurnRate", label: "Monthly Churn Rate %", type: "text", placeholder: "3.5" }
    ]
  },
  {
    id: "stripe-fee",
    title: "Stripe & PayPal Net Fee Deductor",
    name: "Stripe & PayPal Net Fee Deductor",
    category: "Financial Calculators",
    description: "Calculates payment processing fees (2.9% + $0.30) and tells you exact gross amount to charge to receive desired net payout.",
    inputs: [
      { id: "targetNet", label: "Desired Net Payout Amount ($)", type: "text", placeholder: "100" },
      { id: "feePercentage", label: "Processing Fee %", type: "text", placeholder: "2.9" },
      { id: "fixedFee", label: "Fixed Fee per Transaction ($)", type: "text", placeholder: "0.30" }
    ]
  },
  {
    id: "contract-splitter",
    title: "Contract Value Splitter",
    name: "Contract Value Splitter",
    category: "Financial Calculators",
    description: "Splits multi-party retainer contracts or agency revenue into percentage payouts for team members and partners.",
    inputs: [
      { id: "totalContract", label: "Total Contract Amount ($)", type: "text", placeholder: "12000" },
      { id: "splits", label: "Partner Splits % (Comma Separated)", type: "text", placeholder: "50, 30, 20" }
    ]
  },
  {
    id: "discount-matrix",
    title: "Discounts & Margins Matrix",
    name: "Discounts & Margins Matrix",
    category: "Financial Calculators",
    description: "Calculates gross profit margin percentage, markup percentage, and profit dollars from item cost and selling price.",
    inputs: [
      { id: "cost", label: "Cost Price ($)", type: "text", placeholder: "40" },
      { id: "price", label: "Selling Price ($)", type: "text", placeholder: "100" },
      { id: "discountPercent", label: "Discount Offered %", type: "text", placeholder: "15" }
    ]
  },
  {
    id: "package-pricing",
    title: "Consulting Package Pricing Engine",
    name: "Consulting Package Pricing Engine",
    category: "Financial Calculators",
    description: "Structures tiered service packages (Starter, Growth, Enterprise) with recommended pricing multipliers.",
    inputs: [
      { id: "baseCost", label: "Base Deliverable Cost ($)", type: "text", placeholder: "1500" },
      { id: "valueMultiplier", label: "Value Pricing Multiplier", type: "dropdown", options: ["1.5x (Standard Agency)", "2.0x (High Value Growth)", "3.0x (Enterprise Specialist)"] }
    ]
  },
  {
    id: "currency-compiler",
    title: "Currency Conversion Spreadsheet Compiler",
    name: "Currency Conversion Spreadsheet Compiler",
    category: "Financial Calculators",
    description: "Formats and converts multi-currency revenue figures into standardized target currency reports.",
    inputs: [
      { id: "amount", label: "Base Revenue Amount", type: "text", placeholder: "5000" },
      { id: "fromCurrency", label: "From Currency", type: "dropdown", options: ["USD ($)", "EUR (€)", "GBP (£)", "CAD ($)", "INR (₹)"] },
      { id: "toCurrency", label: "To Currency", type: "dropdown", options: ["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)"] }
    ]
  },
  {
    id: "expense-mock",
    title: "Tax Deductible Expense Log Mockup",
    name: "Tax Deductible Expense Log Mockup",
    category: "Financial Calculators",
    description: "Logs and categorizes business expenses (Software, Home Office, Travel) to estimate total tax deductions.",
    inputs: [
      { id: "expenses", label: "Expense Line Items (Category, Amount - One per line)", type: "textarea", placeholder: "Software Subscriptions, 240\nHome Office Internet, 100\nTravel & Client Meals, 180" }
    ]
  },
  {
    id: "salary-contractor",
    title: "Salary to Contractor Rate Equivalent",
    name: "Salary to Contractor Rate Equivalent",
    category: "Financial Calculators",
    description: "Converts annual full-time employee salary into equivalent 1099 contractor hourly rates factoring health, taxes & 401k.",
    inputs: [
      { id: "salary", label: "Annual Full-Time Salary ($)", type: "text", placeholder: "120000" },
      { id: "benefitsFactor", label: "Benefits & Overhead Multiplier", type: "dropdown", options: ["1.3x (Standard Benefits + Taxes)", "1.5x (Comprehensive Health & Tech Stipend)", "1.2x (Lean Remote Contract)"] }
    ]
  },
  {
    id: "runway-sim",
    title: "Burn Rate & Runway Simulator",
    name: "Burn Rate & Runway Simulator",
    category: "Financial Calculators",
    description: "Calculates startup cash runway in months based on total cash balance, monthly revenue, and monthly operating expenses.",
    inputs: [
      { id: "cashBalance", label: "Current Cash in Bank ($)", type: "text", placeholder: "150000" },
      { id: "monthlyExpenses", label: "Total Monthly Expenses ($)", type: "text", placeholder: "18000" },
      { id: "monthlyRevenue", label: "Total Monthly Revenue ($)", type: "text", placeholder: "6000" }
    ]
  },

  // ==========================================
  // 5. DATA & TECHNICAL UTILITIES
  // ==========================================
  {
    id: "jwt-decoder",
    title: "JWT Inspecting Sandbox",
    name: "JWT Inspecting Sandbox",
    category: "Data/Tech Utilities",
    description: "Decodes JSON Web Token (JWT) headers, claims, and expiration timestamps locally without sending data to servers.",
    inputs: [
      { id: "jwt", label: "Raw JWT Token String", type: "textarea", placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ..." }
    ]
  },
  {
    id: "html-stripper",
    title: "HTML Entity Encoder / Stripper",
    name: "HTML Entity Encoder / Stripper",
    category: "Data/Tech Utilities",
    description: "Strips HTML tags from raw code or encodes special characters into safe HTML entities.",
    inputs: [
      { id: "code", label: "Raw HTML Code / Text", type: "textarea", placeholder: "<div class='content'><h1>Title</h1><p>Paragraph text...</p></div>" },
      { id: "mode", label: "Operation Mode", type: "dropdown", options: ["Strip All HTML Tags (Plain Text)", "Encode HTML Special Entities", "Decode HTML Entities"] }
    ]
  },
  {
    id: "cron-humanizer",
    title: "Cron Job Schedule Humanizer",
    name: "Cron Job Schedule Humanizer",
    category: "Data/Tech Utilities",
    description: "Translates cryptic cron expressions (`*/15 * * * *`) into plain English schedule descriptions and next execution times.",
    inputs: [
      { id: "cron", label: "Cron Expression (5 Fields)", type: "text", placeholder: "0 9 * * 1-5" }
    ]
  },
  {
    id: "tailwind-bento",
    title: "CSS Bento Grid Layout Boilerplate Maker",
    name: "CSS Bento Grid Layout Boilerplate Maker",
    category: "Data/Tech Utilities",
    description: "Generates clean Tailwind CSS responsive bento grid HTML layouts for dashboard and landing page cards.",
    inputs: [
      { id: "columns", label: "Grid Columns Count", type: "dropdown", options: ["3 Columns (Standard Bento)", "4 Columns (Wide Dashboard)", "2 Columns (Compact)"] },
      { id: "cardCount", label: "Total Cards", type: "text", placeholder: "5" }
    ]
  },
  {
    id: "url-slugger",
    title: "URL Slug Clean Engine",
    name: "URL Slug Clean Engine",
    category: "Data/Tech Utilities",
    description: "Converts strings into clean, SEO-friendly URL slugs by stripping special characters and normalizing hyphens.",
    inputs: [
      { id: "text", label: "Input Title or Heading", type: "text", placeholder: "10 Free Client-Side Developer Utilities for 2026!" }
    ]
  },
  {
    id: "uuid-generator",
    title: "UUID v4 Bulk Key Generator",
    name: "UUID v4 Bulk Key Generator",
    category: "Data/Tech Utilities",
    description: "Generates cryptographically random UUID v4 identifiers client-side.",
    inputs: [
      { id: "count", label: "Quantity of UUIDs to Generate", type: "text", placeholder: "5" },
      { id: "uppercase", label: "Output Format", type: "dropdown", options: ["Lowercase (Standard)", "UPPERCASE"] }
    ]
  },
  {
    id: "ua-parser",
    title: "User-Agent Header Parser",
    name: "User-Agent Header Parser",
    category: "Data/Tech Utilities",
    description: "Parses browser User-Agent strings to identify browser engine, OS version, device type, and CPU architecture.",
    inputs: [
      { id: "ua", label: "User-Agent String", type: "textarea", placeholder: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..." }
    ]
  },
  {
    id: "yaml-json",
    title: "YAML to JSON Structural Schema Converter",
    name: "YAML to JSON Structural Schema Converter",
    category: "Data/Tech Utilities",
    description: "Converts YAML structural configurations into formatted JSON schemas in browser memory.",
    inputs: [
      { id: "yaml", label: "Raw YAML Input", type: "textarea", placeholder: "name: Zenovee AI\nversion: 1.0\nfeatures:\n  - client_side\n  - zero_server" }
    ]
  },
  {
    id: "xml-tree",
    title: "XML Tree Visualizer & Cleaner",
    name: "XML Tree Visualizer & Cleaner",
    category: "Data/Tech Utilities",
    description: "Formats and cleans raw XML markup into indented hierarchical trees.",
    inputs: [
      { id: "xml", label: "Raw XML Input", type: "textarea", placeholder: "<root><item id='1'><name>Test</name></item></root>" }
    ]
  },
  {
    id: "lorem-suite",
    title: "Lorem Ipsum Placeholder Suite",
    name: "Lorem Ipsum Placeholder Suite",
    category: "Data/Tech Utilities",
    description: "Generates customizable placeholder text, dummy JSON objects, and sample data arrays for frontend prototyping.",
    inputs: [
      { id: "type", label: "Placeholder Format", type: "dropdown", options: ["Dummy JSON User Array", "Lorem Ipsum Text Paragraphs", "Sample Product Catalog JSON"] }
    ]
  }
];
