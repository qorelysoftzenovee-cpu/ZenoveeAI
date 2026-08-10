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
  name?: string; // Optional alias for backward compatibility
  category: string;
  description: string;
  inputs: ToolInput[];
  cost?: number;
}

export const toolsConfig: ToolConfig[] = [
  {
    id: "image-compressor",
    title: "Client-Side Image Compressor & Converter",
    name: "Client-Side Image Compressor & Converter",
    category: "Media, Design & Productivity",
    description: "Compresses JPEG/PNG/WebP and converts formats locally using OffscreenCanvas.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side Image Compressor & Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side Image Compressor & Converter..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "svg-editor",
    title: "SVG Vector Editor & Color Swapper",
    name: "SVG Vector Editor & Color Swapper",
    category: "Media, Design & Productivity",
    description: "Parses SVG XML directly in browser DOM to tweak colors and resize dimensions.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SVG Vector Editor & Color Swapper",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SVG Vector Editor & Color Swapper..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "og-generator",
    title: "Dynamic Open Graph Card Visual Designer",
    name: "Dynamic Open Graph Card Visual Designer",
    category: "Growth Marketing & SEO Suite",
    description: "Generates social media preview images (1200x630) using HTML5 Canvas.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Dynamic Open Graph Card Visual Designer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Dynamic Open Graph Card Visual Designer..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "code-beautifier",
    title: "Code Snippet Image Beautifier",
    name: "Code Snippet Image Beautifier",
    category: "Growth Marketing & SEO Suite",
    description: "Creates code-card images using client-side syntax highlighting and gradients.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Code Snippet Image Beautifier",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Code Snippet Image Beautifier..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "batch-watermarker",
    title: "Privacy-First Batch Image Watermarker",
    name: "Privacy-First Batch Image Watermarker",
    category: "Media, Design & Productivity",
    description: "Stamps logos or text onto photos simultaneously using local web workers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Privacy-First Batch Image Watermarker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Privacy-First Batch Image Watermarker..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "lottie-gif-extractor",
    title: "Lottie Animation Frame Extractor",
    name: "Lottie Animation Frame Extractor",
    category: "Media, Design & Productivity",
    description: "Unpacks Lottie JSON or animated GIFs frame-by-frame for SVG/PNG export.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Lottie Animation Frame Extractor",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Lottie Animation Frame Extractor..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "schema-builder",
    title: "Dynamic JSON-LD Schema Markup Builder",
    name: "Dynamic JSON-LD Schema Markup Builder",
    category: "Growth Marketing & SEO Suite",
    description: "Generates Google-compliant JSON-LD schema (FAQ, HowTo, Product, Article).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Dynamic JSON-LD Schema Markup Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Dynamic JSON-LD Schema Markup Builder..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "utm-builder",
    title: "UTM Campaign Builder & History Tracker",
    name: "UTM Campaign Builder & History Tracker",
    category: "Growth Marketing & SEO Suite",
    description: "Generates tagged campaign URLs and tracks historical links in LocalStorage.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for UTM Campaign Builder & History Tracker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for UTM Campaign Builder & History Tracker..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "serp-simulator",
    title: "SERP Snippet Visual Simulator",
    name: "SERP Snippet Visual Simulator",
    category: "Growth Marketing & SEO Suite",
    description: "Previews how titles, descriptions, and URLs render on Google desktop and mobile.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SERP Snippet Visual Simulator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SERP Snippet Visual Simulator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "robots-sitemap-builder",
    title: "Robots.txt & XML Sitemap Validator",
    name: "Robots.txt & XML Sitemap Validator",
    category: "Growth Marketing & SEO Suite",
    description: "Generates clean sitemaps and tests robots.txt disallow rules against URL paths.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Robots.txt & XML Sitemap Validator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Robots.txt & XML Sitemap Validator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "email-signature",
    title: "Client-Side HTML Email Signature Builder",
    name: "Client-Side HTML Email Signature Builder",
    category: "Growth Marketing & SEO Suite",
    description: "Generates responsive HTML email signatures with clickable icons and avatars.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side HTML Email Signature Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side HTML Email Signature Builder..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "qr-studio",
    title: "Vector-Based Custom QR Code Generator",
    name: "Vector-Based Custom QR Code Generator",
    category: "Growth Marketing & SEO Suite",
    description: "Generates vector SVG & PNG QR codes with custom colors and logo embedding.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Vector-Based Custom QR Code Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Vector-Based Custom QR Code Generator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "keyword-density",
    title: "On-Page Keyword Frequency Matrix",
    name: "On-Page Keyword Frequency Matrix",
    category: "Growth Marketing & SEO Suite",
    description: "Extracts 1-word, 2-word, and 3-word n-gram keyword frequencies from text.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for On-Page Keyword Frequency Matrix",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for On-Page Keyword Frequency Matrix..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "pdf-merger",
    title: "Offline PDF Merger & Splitter (Client-Side)",
    name: "Offline PDF Merger & Splitter (Client-Side)",
    category: "Media, Design & Productivity",
    description: "Merges multiple PDF files or extracts pages 100% locally in browser memory.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Offline PDF Merger & Splitter (Client-Side)",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Offline PDF Merger & Splitter (Client-Side)..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "ocr-extractor",
    title: "In-Browser OCR Image Text Extractor",
    name: "In-Browser OCR Image Text Extractor",
    category: "Media, Design & Productivity",
    description: "Extracts printed text from images and screenshots using client Tesseract WASM.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for In-Browser OCR Image Text Extractor",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for In-Browser OCR Image Text Extractor..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "pomodoro-tracker",
    title: "Pomodoro Focus Engine",
    name: "Pomodoro Focus Engine",
    category: "Media, Design & Productivity",
    description: "Customizable 25/5 focus timer with session logs and Web Audio chimes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Pomodoro Focus Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Pomodoro Focus Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "file-hash",
    title: "Universal File Hash (SHA-256/MD5) Calculator",
    name: "Universal File Hash (SHA-256/MD5) Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates SHA-256, SHA-1, and MD5 checksums for uploaded files.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Universal File Hash (SHA-256/MD5) Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Universal File Hash (SHA-256/MD5) Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "screen-recorder",
    title: "In-Browser Screen & Webcam Recorder",
    name: "In-Browser Screen & Webcam Recorder",
    category: "Network & Server Utilities",
    description: "Captures screen recordings with audio and downloads WebM video files.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for In-Browser Screen & Webcam Recorder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for In-Browser Screen & Webcam Recorder..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "timezone-scheduler",
    title: "Multi-Timezone Visual Meeting Scheduler",
    name: "Multi-Timezone Visual Meeting Scheduler",
    category: "Media, Design & Productivity",
    description: "Finds optimal meeting overlap times across global timezones.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Multi-Timezone Visual Meeting Scheduler",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Multi-Timezone Visual Meeting Scheduler..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "markdown-kanban",
    title: "Client-Side Markdown Kanban Board",
    name: "Client-Side Markdown Kanban Board",
    category: "Media, Design & Productivity",
    description: "Interactive drag-and-drop task board persisting state in LocalStorage.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side Markdown Kanban Board",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side Markdown Kanban Board..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "voice-transcriber",
    title: "Voice Note Web Speech Dictation Tool",
    name: "Voice Note Web Speech Dictation Tool",
    category: "Media, Design & Productivity",
    description: "Transcribes spoken audio into text in real-time using Web Speech API.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Voice Note Web Speech Dictation Tool",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Voice Note Web Speech Dictation Tool..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "mime-inspector",
    title: "File Magic Byte & MIME Inspector",
    name: "File Magic Byte & MIME Inspector",
    category: "Developer & Tech Utilities",
    description: "Inspects file header magic bytes to verify true file extension integrity.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for File Magic Byte & MIME Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for File Magic Byte & MIME Inspector..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "fire-calculator",
    title: "FIRE Retirement Amortization Calculator",
    name: "FIRE Retirement Amortization Calculator",
    category: "Financial & Investment Engines",
    description: "Calculates Financial Independence target number and savings timeline.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for FIRE Retirement Amortization Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for FIRE Retirement Amortization Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "mortgage-amortization",
    title: "Loan & Mortgage Schedule Engine",
    name: "Loan & Mortgage Schedule Engine",
    category: "Financial & Investment Engines",
    description: "Generates full principal and interest monthly amortization tables.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Loan & Mortgage Schedule Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Loan & Mortgage Schedule Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "compound-interest",
    title: "Compound Interest & DRIP Simulator",
    name: "Compound Interest & DRIP Simulator",
    category: "Financial & Investment Engines",
    description: "Simulates compound growth with monthly deposits and dividend reinvestment.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Compound Interest & DRIP Simulator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Compound Interest & DRIP Simulator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "freelance-rate",
    title: "Value-Based Freelance Rate Calculator",
    name: "Value-Based Freelance Rate Calculator",
    category: "Financial & Investment Engines",
    description: "Calculates target hourly and project rates based on expenses and profit margin.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Value-Based Freelance Rate Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Value-Based Freelance Rate Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "saas-forecaster",
    title: "SaaS LTV, CAC & Churn Modeling Dashboard",
    name: "SaaS LTV, CAC & Churn Modeling Dashboard",
    category: "Financial & Investment Engines",
    description: "Models Customer Lifetime Value, Acquisition Cost ratio, and ARR churn.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SaaS LTV, CAC & Churn Modeling Dashboard",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SaaS LTV, CAC & Churn Modeling Dashboard..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "debt-planner",
    title: "Debt Snowball vs. Avalanche Planner",
    name: "Debt Snowball vs. Avalanche Planner",
    category: "Financial & Investment Engines",
    description: "Compares Debt Snowball (smallest balance) vs Avalanche (highest interest).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Debt Snowball vs. Avalanche Planner",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Debt Snowball vs. Avalanche Planner..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "portfolio-rebalance",
    title: "Portfolio Rebalancing Engine",
    name: "Portfolio Rebalancing Engine",
    category: "Financial & Investment Engines",
    description: "Calculates exact buy/sell asset rebalancing trades for stocks and crypto.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Portfolio Rebalancing Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Portfolio Rebalancing Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "salary-tax",
    title: "Net Take-Home Tax Calculator",
    name: "Net Take-Home Tax Calculator",
    category: "Financial & Investment Engines",
    description: "Estimates federal, state, and payroll tax deductions on annual gross income.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Net Take-Home Tax Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Net Take-Home Tax Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "inflation-calculator",
    title: "Inflation Purchasing Power Time Machine",
    name: "Inflation Purchasing Power Time Machine",
    category: "Financial & Investment Engines",
    description: "Calculates historical purchasing power changes between any two years.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Inflation Purchasing Power Time Machine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Inflation Purchasing Power Time Machine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "real-estate-analyzer",
    title: "Real Estate Cap Rate & Cash Flow Engine",
    name: "Real Estate Cap Rate & Cash Flow Engine",
    category: "Financial & Investment Engines",
    description: "Calculates Capitalization Rate, Cash-on-Cash ROI, and Net Operating Income.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Real Estate Cap Rate & Cash Flow Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Real Estate Cap Rate & Cash Flow Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "json-formatter",
    title: "Interactive JSON Tree Visualizer & Diff",
    name: "Interactive JSON Tree Visualizer & Diff",
    category: "Developer & Tech Utilities",
    description: "Formats, validates, beautifies, and compares JSON data structures.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Interactive JSON Tree Visualizer & Diff",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Interactive JSON Tree Visualizer & Diff..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "jwt-decoder",
    title: "JWT Decoder & Payload Inspector",
    name: "JWT Decoder & Payload Inspector",
    category: "Developer & Tech Utilities",
    description: "Decodes Base64Url JSON Web Tokens inspecting header and claim payloads.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for JWT Decoder & Payload Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for JWT Decoder & Payload Inspector..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "cron-humanizer",
    title: "Cron Expression Parser & Humanizer",
    name: "Cron Expression Parser & Humanizer",
    category: "Developer & Tech Utilities",
    description: "Translates 5-part cron syntax (e.g. `*/5 * * * *`) into plain English.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Cron Expression Parser & Humanizer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Cron Expression Parser & Humanizer..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "uuid-generator",
    title: "UUID, ULID & NanoID Batch Generator",
    name: "UUID, ULID & NanoID Batch Generator",
    category: "Developer & Tech Utilities",
    description: "Generates RFC 4122 v4 UUIDs, ULIDs, and NanoIDs in single or batch mode.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for UUID, ULID & NanoID Batch Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for UUID, ULID & NanoID Batch Generator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "ip-lookup",
    title: "My IP & Geolocation Inspector",
    name: "My IP & Geolocation Inspector",
    category: "Network & Server Utilities",
    description: "Fetches public IP address, ISP provider, ASN, and city geolocation.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for My IP & Geolocation Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for My IP & Geolocation Inspector..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "dns-propagation",
    title: "Multi-Server DNS Propagation Checker",
    name: "Multi-Server DNS Propagation Checker",
    category: "Network & Server Utilities",
    description: "Queries A, CNAME, MX, and TXT records across global DNS servers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Multi-Server DNS Propagation Checker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Multi-Server DNS Propagation Checker..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "ping-tester",
    title: "Client-Side Latency Tester",
    name: "Client-Side Latency Tester",
    category: "Network & Server Utilities",
    description: "Measures round-trip time (RTT) latency and jitter to public web servers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side Latency Tester",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side Latency Tester..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "cidr-calculator",
    title: "Subnet / CIDR Mask Calculator",
    name: "Subnet / CIDR Mask Calculator",
    category: "Network & Server Utilities",
    description: "Calculates network IP ranges, subnet masks, wildcard masks, and hosts.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Subnet / CIDR Mask Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Subnet / CIDR Mask Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "header-inspector",
    title: "HTTP Security Header Inspector",
    name: "HTTP Security Header Inspector",
    category: "Network & Server Utilities",
    description: "Inspects HTTP response headers for CSP, HSTS, and X-Frame-Options.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for HTTP Security Header Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for HTTP Security Header Inspector..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "ssl-checker",
    title: "SSL Certificate Expiry Checker",
    name: "SSL Certificate Expiry Checker",
    category: "Network & Server Utilities",
    description: "Inspects SSL/TLS certificate validity dates, issuer, and SAN domains.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SSL Certificate Expiry Checker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SSL Certificate Expiry Checker..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "mac-vendor",
    title: "MAC Address OUI Vendor Lookup",
    name: "MAC Address OUI Vendor Lookup",
    category: "Network & Server Utilities",
    description: "Looks up hardware manufacturer details from MAC address OUI prefixes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for MAC Address OUI Vendor Lookup",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for MAC Address OUI Vendor Lookup..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "speed-test",
    title: "Client-Side Bandwidth Speed Test",
    name: "Client-Side Bandwidth Speed Test",
    category: "Network & Server Utilities",
    description: "Measures download speed Mbps and latency directly in browser memory.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side Bandwidth Speed Test",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side Bandwidth Speed Test..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "whois-lookup",
    title: "Domain Whois Lookup Interface",
    name: "Domain Whois Lookup Interface",
    category: "Network & Server Utilities",
    description: "Queries domain registrar info, creation date, and nameservers via RDAP.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Domain Whois Lookup Interface",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Domain Whois Lookup Interface..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "url-encoder-decoder",
    title: "URL Encoder / Decoder",
    name: "URL Encoder / Decoder",
    category: "Developer & Tech Utilities",
    description: "Converts special characters to URL-safe percent-encoding and vice-versa.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for URL Encoder / Decoder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for URL Encoder / Decoder..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "color-code-converter",
    title: "Color Code Converter (HEX, RGB, HSL, CMYK)",
    name: "Color Code Converter (HEX, RGB, HSL, CMYK)",
    category: "Developer & Tech Utilities",
    description: "Converts color values between HEX, RGB, HSL, and CMYK formats.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Color Code Converter (HEX, RGB, HSL, CMYK)",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Color Code Converter (HEX, RGB, HSL, CMYK)..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "unix-timestamp-converter",
    title: "Unix Timestamp to Date Converter",
    name: "Unix Timestamp to Date Converter",
    category: "Developer & Tech Utilities",
    description: "Converts epoch timestamps (seconds/ms) to human ISO date strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Unix Timestamp to Date Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Unix Timestamp to Date Converter..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "multi-unit-converter",
    title: "Multi-Unit Metric/Imperial Converter",
    name: "Multi-Unit Metric/Imperial Converter",
    category: "Calculators & Mathematics",
    description: "Converts units of Length, Mass, Temperature, Volume, and Speed.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Multi-Unit Metric/Imperial Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Multi-Unit Metric/Imperial Converter..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "live-currency-calculator",
    title: "Live Currency Cross Rate Calculator",
    name: "Live Currency Cross Rate Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates real-time foreign exchange conversions across 30+ currencies.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Live Currency Cross Rate Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Live Currency Cross Rate Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "html-entity-encoder",
    title: "HTML Entity Encoder / Decoder",
    name: "HTML Entity Encoder / Decoder",
    category: "Developer & Tech Utilities",
    description: "Encodes special characters to HTML entities (`&lt;`, `&gt;`) and decodes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for HTML Entity Encoder / Decoder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for HTML Entity Encoder / Decoder..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "sql-formatter",
    title: "SQL Query Formatter & Beautifier",
    name: "SQL Query Formatter & Beautifier",
    category: "Developer & Tech Utilities",
    description: "Pretty-prints complex SQL queries with custom keyword capitalization.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SQL Query Formatter & Beautifier",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SQL Query Formatter & Beautifier..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "text-diff-checker",
    title: "Code Diff & Visual Comparison",
    name: "Code Diff & Visual Comparison",
    category: "Developer & Tech Utilities",
    description: "Side-by-side visual diff tool highlighting added and deleted text lines.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Code Diff & Visual Comparison",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Code Diff & Visual Comparison..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "text-stats-counter",
    title: "Text Character, Word & Byte Counter",
    name: "Text Character, Word & Byte Counter",
    category: "Developer & Tech Utilities",
    description: "Counts real-time characters, words, sentences, paragraphs, and bytes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Text Character, Word & Byte Counter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Text Character, Word & Byte Counter..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "url-slug-generator",
    title: "URL Slug Generator",
    name: "URL Slug Generator",
    category: "Developer & Tech Utilities",
    description: "Converts text titles into clean SEO-friendly URL slug strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for URL Slug Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for URL Slug Generator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "percentage-calculator",
    title: "Advanced Percentage Increase/Decrease Engine",
    name: "Advanced Percentage Increase/Decrease Engine",
    category: "Calculators & Mathematics",
    description: "Calculates X% of Y, percentage increase/decrease, and ratio splits.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Advanced Percentage Increase/Decrease Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Advanced Percentage Increase/Decrease Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "bmi-body-fat",
    title: "BMI & Body Composition Calculator",
    name: "BMI & Body Composition Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates Body Mass Index (BMI) and Navy Body Fat percentage.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for BMI & Body Composition Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for BMI & Body Composition Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "age-date-difference",
    title: "Exact Date Difference & Duration Engine",
    name: "Exact Date Difference & Duration Engine",
    category: "Calculators & Mathematics",
    description: "Calculates exact age and duration in years, months, days, and hours.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Exact Date Difference & Duration Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Exact Date Difference & Duration Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "gpa-calculator",
    title: "Weighted GPA Calculator",
    name: "Weighted GPA Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates high school and college unweighted (4.0) and weighted (5.0) GPA.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Weighted GPA Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Weighted GPA Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "salary-to-hourly",
    title: "Salary to Hourly Pay Converter",
    name: "Salary to Hourly Pay Converter",
    category: "Calculators & Mathematics",
    description: "Converts annual salary to hourly, weekly, bi-weekly, and monthly wage.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Salary to Hourly Pay Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Salary to Hourly Pay Converter..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "tip-bill-splitter",
    title: "Restaurant Tip & Split Calculator",
    name: "Restaurant Tip & Split Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates tip amounts and splits restaurant bills evenly per person.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Restaurant Tip & Split Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Restaurant Tip & Split Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "discount-sales-tax",
    title: "Sales Tax & Discount Calculator",
    name: "Sales Tax & Discount Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates final retail checkout price with sale discount and tax.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Sales Tax & Discount Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Sales Tax & Discount Calculator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "fuel-cost-calculator",
    title: "Vehicle Trip Fuel Cost Engine",
    name: "Vehicle Trip Fuel Cost Engine",
    category: "Calculators & Mathematics",
    description: "Calculates fuel cost for trips based on distance, MPG, and gas price.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Vehicle Trip Fuel Cost Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Vehicle Trip Fuel Cost Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "random-number-gen",
    title: "Random Number Generator",
    name: "Random Number Generator",
    category: "Calculators & Mathematics",
    description: "Generates cryptographically random integers bounded by Min and Max.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Random Number Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Random Number Generator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "htaccess-rule-builder",
    title: ".htaccess Rule Generator",
    name: ".htaccess Rule Generator",
    category: "Developer & Tech Utilities",
    description: "Generates Apache `.htaccess` rules for HTTPS enforcement and headers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for .htaccess Rule Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for .htaccess Rule Generator..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "favicon-generator-ui",
    title: "Favicon Multi-Resolution Builder",
    name: "Favicon Multi-Resolution Builder",
    category: "Developer & Tech Utilities",
    description: "Generates HTML favicon links, Apple touch icons, and Web App Manifest.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Favicon Multi-Resolution Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Favicon Multi-Resolution Builder..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "yaml-to-json",
    title: "YAML to JSON Engine",
    name: "YAML to JSON Engine",
    category: "Developer & Tech Utilities",
    description: "Converts YAML configuration files into JSON structures and vice-versa.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for YAML to JSON Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for YAML to JSON Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
  {
    id: "css-js-compressor",
    title: "Minify CSS / JS Engine",
    name: "Minify CSS / JS Engine",
    category: "Developer & Tech Utilities",
    description: "Compresses JavaScript and CSS code removing spaces and comments.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Minify CSS / JS Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Minify CSS / JS Engine..."
    },
      {
            "id": "mode",
            "label": "Operation / Execution Preset",
            "type": "dropdown",
            "options": [
                  "Standard Execution Mode",
                  "High-Precision Mode",
                  "Verbose Diagnostic Mode"
            ]
    }
]
  },
{
    id: "jsonyaml-linter-formatter",
    title: "JSON/YAML Linter & Formatter",
    category: "Developer & Tech Utilities",
    description: "Checks syntax errors and cleans up nested data structures instantly.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "regex-tester-visualizer",
    title: "Regex Tester & Visualizer",
    category: "Developer & Tech Utilities",
    description: "Tests regular expressions against sample text with real-time match highlighting.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "api-testing-client-restgraphql",
    title: "API Testing Client (REST/GraphQL)",
    category: "Developer & Tech Utilities",
    description: "Lightweight browser-based HTTP request sender with headers and body parameters.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "css-grid-flexbox-generator",
    title: "CSS Grid & Flexbox Generator",
    category: "Developer & Tech Utilities",
    description: "Visual layout builders that output clean, production-ready CSS code.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "svg-path-editor-optimizer",
    title: "SVG Path Editor & Optimizer",
    category: "Developer & Tech Utilities",
    description: "Minifies SVG code and allows direct node manipulation of vector graphics.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "markdown-live-preview-editor",
    title: "Markdown Live Preview Editor",
    category: "Developer & Tech Utilities",
    description: "Splits screen for raw text input and real-time HTML rendering.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "contrast-checker-for-accessibility-wcag",
    title: "Contrast Checker for Accessibility (WCAG)",
    category: "Media, Design & Productivity",
    description: "Tests text and background color pairs against official accessibility standards.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "css-glassmorphism-generator",
    title: "CSS Glassmorphism Generator",
    category: "Media, Design & Productivity",
    description: "Adjusts blur, transparency, and borders to create modern frosted glass UI effects.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "css-box-shadow-generator",
    title: "CSS Box Shadow Generator",
    category: "Media, Design & Productivity",
    description: "Sliders for depth, spread, and opacity with instant copy-paste code.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "gradient-mesh-creator",
    title: "Gradient Mesh Creator",
    category: "Media, Design & Productivity",
    description: "Generates smooth, multi-color gradient backgrounds for modern hero sections.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "svg-wave-blob-generator",
    title: "SVG Wave / Blob Generator",
    category: "Media, Design & Productivity",
    description: "Creates custom organic vector shapes and dividers for web design.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "fluid-typography-calculator",
    title: "Fluid Typography Calculator",
    category: "Media, Design & Productivity",
    description: "Computes CSS clamp() values for responsive font sizing across viewports.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "font-pairer-and-previewer",
    title: "Font Pairer and Previewer",
    category: "Media, Design & Productivity",
    description: "Displays Google Font combinations side-by-side with readability tests.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "ui-skeleton-screen-generator",
    title: "UI Skeleton Screen Generator",
    category: "Media, Design & Productivity",
    description: "Builds animated loading placeholders for custom dashboard layouts.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "password-strength-entropy-analyzer",
    title: "Password Strength & Entropy Analyzer",
    category: "Network & Server Utilities",
    description: "Calculates exact time-to-crack estimates for custom passphrases.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "cors-header-tester",
    title: "CORS Header Tester",
    category: "Network & Server Utilities",
    description: "Checks if a target endpoint permits cross-origin resource sharing.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "port-checker-tool",
    title: "Port Checker Tool",
    category: "Network & Server Utilities",
    description: "Verifies if specific common ports are open on a given host IP address.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "url-redirect-trace-checker",
    title: "URL Redirect Trace Checker",
    category: "Network & Server Utilities",
    description: "Follows HTTP status codes through multiple redirect hops to final destination.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "data-breach-email-checker",
    title: "Data Breach Email Checker",
    category: "Network & Server Utilities",
    description: "Queries public lookup databases to see if an email appears in known leaks.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "image-compressor-pngjpegwebp",
    title: "Image Compressor (PNG/JPEG/WebP)",
    category: "Media, Design & Productivity",
    description: "Reduces file sizes locally using HTML5 canvas without losing visual quality.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "heic-to-jpg-converter",
    title: "HEIC to JPG Converter",
    category: "Media, Design & Productivity",
    description: "Converts Apple image formats into standard web-compatible files.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "audio-format-transcoder",
    title: "Audio Format Transcoder",
    category: "Media, Design & Productivity",
    description: "Converts small audio clips between WAV, MP3, and OGG formats using Web Audio API.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "exif-data-remover",
    title: "EXIF Data Remover",
    category: "Media, Design & Productivity",
    description: "Strips hidden GPS and camera metadata from uploaded personal photos for privacy.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "sprite-sheet-generator",
    title: "Sprite Sheet Generator",
    category: "Media, Design & Productivity",
    description: "Combines multiple small icons into a single optimized PNG layout.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "video-to-gif-converter",
    title: "Video to GIF Converter",
    category: "Media, Design & Productivity",
    description: "Clips short video segments into looping animated graphics.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "crypto-unit-gas-fee-converter",
    title: "Crypto Unit & Gas Fee Converter",
    category: "Calculators & Mathematics",
    description: "Translates Wei to Gwei to ETH alongside live fiat conversions.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "bandwidth-download-time-estimator",
    title: "Bandwidth & Download Time Estimator",
    category: "Calculators & Mathematics",
    description: "Calculates transfer duration based on file sizes and connection speeds.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "aspect-ratio-calculator",
    title: "Aspect Ratio Calculator",
    category: "Calculators & Mathematics",
    description: "Scales video or image dimensions proportionally (e.g., 16:9 to custom pixels).",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "unit-converter-advanced-physicsengineering",
    title: "Unit Converter (Advanced Physics/Engineering)",
    category: "Calculators & Mathematics",
    description: "Converts niche metrics like Pascal to PSI or Joules to BTU.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "readability-score-calculator-flesch-kincaid",
    title: "Readability Score Calculator (Flesch-Kincaid)",
    category: "Growth Marketing & SEO Suite",
    description: "Measures text comprehension levels and grade requirements.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "broken-link-checker-script",
    title: "Broken Link Checker Script",
    category: "Growth Marketing & SEO Suite",
    description: "Scans internal anchor references for HTTP 404 error codes.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "string-case-converter",
    title: "String Case Converter",
    category: "Developer & Tech Utilities",
    description: "Switches text between camelCase, snake_case, PascalCase, and kebab-case.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "list-sorter-duplicate-remover",
    title: "List Sorter & Duplicate Remover",
    category: "Developer & Tech Utilities",
    description: "Cleans, alphabetizes, and strips duplicate rows from raw text arrays.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "lorem-ipsum-dummy-data-generator",
    title: "Lorem Ipsum & Dummy Data Generator",
    category: "Developer & Tech Utilities",
    description: "Creates structured placeholder text, names, and addresses for mockups.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "text-obfuscator-de-obfuscator",
    title: "Text Obfuscator / De-obfuscator",
    category: "Developer & Tech Utilities",
    description: "Masks sensitive strings or decodes encoded text blocks.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "csv-row-filter-query-tool",
    title: "CSV Row Filter & Query Tool",
    category: "Developer & Tech Utilities",
    description: "Applies basic filter logic to tabular data sets inside the browser.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "unicode-emoji-lookup-table",
    title: "Unicode & Emoji Lookup Table",
    category: "Developer & Tech Utilities",
    description: "Searches symbol codes, hex values, and HTML entity equivalents.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "markdown-table-generator",
    title: "Markdown Table Generator",
    category: "Developer & Tech Utilities",
    description: "Visual spreadsheet UI that outputs clean markdown tables.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "text-extractor-line-cleaner",
    title: "Text Extractor / Line Cleaner",
    category: "Developer & Tech Utilities",
    description: "Strips empty lines, trailing whitespaces, and unwanted special characters.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "markdown-sticky-notes",
    title: "Markdown Sticky Notes",
    category: "Media, Design & Productivity",
    description: "Quick scratchpad that auto-saves thoughts locally without login requirements.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "barcode-generator-upceancode128",
    title: "Barcode Generator (UPC/EAN/Code128)",
    category: "Media, Design & Productivity",
    description: "Renders retail and inventory tracking barcode graphics instantly.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "random-picker-wheel-spinner",
    title: "Random Picker / Wheel Spinner",
    category: "Media, Design & Productivity",
    description: "Interactive decision-making tool for raffles, teams, or random choices.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "habit-tracker-grid",
    title: "Habit Tracker Grid",
    category: "Media, Design & Productivity",
    description: "365-day heat map calendar for tracking daily personal milestones.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "meeting-cost-calculator",
    title: "Meeting Cost Calculator",
    category: "Media, Design & Productivity",
    description: "Real-time running financial meter based on participant hourly rates.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "in-browser-stopwatch-lap-splitter",
    title: "In-Browser Stopwatch & Lap Splitter",
    category: "Media, Design & Productivity",
    description: "High-precision time recorder with exportable log data.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "simple-markdown-resume-builder",
    title: "Simple Markdown Resume Builder",
    category: "Media, Design & Productivity",
    description: "Clean layout builder that prints straight to a formatted PDF.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "periodic-table-of-elements-inspector",
    title: "Periodic Table of Elements Inspector",
    category: "Calculators & Mathematics",
    description: "Interactive chemical database with atomic weights and electron configurations.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "resistor-color-code-calculator",
    title: "Resistor Color Code Calculator",
    category: "Calculators & Mathematics",
    description: "Decodes 4-band and 5-band electronic resistance values visually.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "ohms-law-calculator",
    title: "Ohm’s Law Calculator",
    category: "Calculators & Mathematics",
    description: "Computes voltage, current, resistance, and power when two values are provided.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "acoustic-frequency-tone-generator",
    title: "Acoustic Frequency Tone Generator",
    category: "Calculators & Mathematics",
    description: "Outputs pure sinusoidal audio frequencies via the Web Audio API.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "pixel-to-rem-em-scaler",
    title: "Pixel to REM / EM Scaler",
    category: "Calculators & Mathematics",
    description: "Converts legacy pixel units to scalable relative font units for web devs.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "data-storage-unit-converter",
    title: "Data Storage Unit Converter",
    category: "Calculators & Mathematics",
    description: "Converts seamlessly between Megabytes, Gigabytes, Terabytes, and Kibibytes.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "astronomical-date-julian-day-calculator",
    title: "Astronomical Date & Julian Day Calculator",
    category: "Calculators & Mathematics",
    description: "Computes time differences and orbital alignment metrics.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "wind-chill-heat-index-calculator",
    title: "Wind Chill & Heat Index Calculator",
    category: "Calculators & Mathematics",
    description: "Combines temperature and humidity metrics into perceived thermal scores.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "concrete-volume-estimator",
    title: "Concrete & Volume Estimator",
    category: "Calculators & Mathematics",
    description: "Standard construction math tool for cubic yardage calculations.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "gear-ratio-rpm-calculator",
    title: "Gear Ratio & RPM Calculator",
    category: "Calculators & Mathematics",
    description: "Mechanical calculation helper for rotational velocity and torque outputs.",
    inputs: [
      {
        id: "input_data",
        label: "Primary Input / Payload",
        type: "textarea",
        placeholder: "Enter text, data, or configuration parameters here..."
      },
      {
        id: "mode",
        label: "Operation / Execution Mode",
        type: "dropdown",
        options: ["Standard Mode", "High-Precision Mode", "Export / Copy Output"]
      }
    ]
  },
  {
    id: "json-to-csv-converter",
    title: "JSON to CSV Converter",
    category: "Developer & Tech Utilities",
    description: "Instantly converts JSON arrays and objects into clean downloadable CSV spreadsheets in-browser.",
        inputs: [
      { id: "input_data", label: "JSON Array (paste your JSON here)", type: "textarea", placeholder: '[\n  {"name":"Alice","age":30,"city":"London"},\n  {"name":"Bob","age":25,"city":"New York"}\n]' },
      { id: "mode", label: "Delimiter", type: "dropdown", options: ["Comma (,)", "Semicolon (;)", "Tab (\\t)", "Pipe (|)"] }
    ]
  },
  {
    id: "html-to-markdown",
    title: "HTML to Markdown Converter",
    category: "Developer & Tech Utilities",
    description: "Converts raw HTML markup into clean GitHub-flavored Markdown for documentation and blogs.",
        inputs: [
      { id: "input_data", label: "HTML Code to Convert", type: "textarea", placeholder: "<h1>Hello World</h1>\n<p>This is a <strong>test</strong> paragraph.</p>\n<ul><li>Item 1</li><li>Item 2</li></ul>" },
      { id: "mode", label: "Output Style", type: "dropdown", options: ["GitHub Flavored Markdown", "Standard Markdown", "Minimal (headings only)"] }
    ]
  },
  {
    id: "xml-to-json",
    title: "XML to JSON Converter",
    category: "Developer & Tech Utilities",
    description: "Parses complex XML documents into structured JSON objects for API and data workflows.",
        inputs: [
      { id: "input_data", label: "XML Input", type: "textarea", placeholder: '<root>\n  <user id="1">\n    <name>Alice</name>\n    <age>30</age>\n  </user>\n</root>' },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["Pretty (indented)", "Minified", "With attributes (@)"] }
    ]
  },
  {
    id: "javascript-minifier",
    title: "JavaScript Minifier & Beautifier",
    category: "Developer & Tech Utilities",
    description: "Minifies or beautifies JavaScript code client-side for production optimization and readability.",
        inputs: [
      { id: "input_data", label: "JavaScript Code", type: "textarea", placeholder: "function greet(name) {\n  const message = \"Hello, \" + name + \"!\";\n  console.log(message);\n  return message;\n}" },
      { id: "mode", label: "Operation", type: "dropdown", options: ["Minify (compress)", "Beautify (format)", "Remove Comments Only"] }
    ]
  },
  {
    id: "css-variable-extractor",
    title: "CSS Variable Extractor",
    category: "Developer & Tech Utilities",
    description: "Scans a CSS file and extracts all custom properties (--variables) into a clean design token list.",
    inputs: [
      {
        id: "input_data",
        label: "Input Data / Parameters",
        type: "textarea",
        placeholder: "Enter your data, URL, text, or configuration here..."
      },
      {
        id: "mode",
        label: "Mode / Options",
        type: "dropdown",
        options: ["Standard Mode", "Advanced Mode", "Export Output"]
      }
    ]
  },
  {
    id: "http-status-code-lookup",
    title: "HTTP Status Code Explorer",
    category: "Developer & Tech Utilities",
    description: "Interactive reference for all HTTP status codes with descriptions, use cases, and examples.",
        inputs: [
      { id: "input_data", label: "HTTP Status Code (e.g. 404, 200, 500)", type: "text", placeholder: "404" },
      { id: "mode", label: "Show Category", type: "dropdown", options: ["Show All Details", "2xx Success Only", "4xx Client Errors", "5xx Server Errors"] }
    ]
  },
  {
    id: "git-commit-message-gen",
    title: "Git Commit Message Generator",
    category: "Developer & Tech Utilities",
    description: "Generates professional, conventional commit messages from a brief description of your changes.",
        inputs: [
      { id: "input_data", label: "Describe what you changed", type: "textarea", placeholder: "fixed the login button not working on mobile browsers" },
      { id: "mode", label: "Commit Type Override", type: "dropdown", options: ["Auto-detect", "feat (new feature)", "fix (bug fix)", "docs (documentation)", "style (formatting)", "refactor", "test", "chore"] }
    ]
  },
  {
    id: "markdown-to-html",
    title: "Markdown to HTML Converter",
    category: "Developer & Tech Utilities",
    description: "Converts Markdown text to production-ready, semantic HTML output with syntax highlighting.",
        inputs: [
      { id: "input_data", label: "Markdown Input", type: "textarea", placeholder: "# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n\n[Link](https://example.com)" },
      { id: "mode", label: "Output Options", type: "dropdown", options: ["Full HTML with tags", "Fragment (no doctype)", "Include CSS styles"] }
    ]
  },
  {
    id: "env-file-parser",
    title: ".env File Parser & Formatter",
    category: "Developer & Tech Utilities",
    description: "Parses, validates, and formats .env files — detects duplicates, missing values, and syntax errors.",
        inputs: [
      { id: "input_data", label: "Paste your .env file contents", type: "textarea", placeholder: "DATABASE_URL=postgres://user:pass@localhost:5432/db\nAPI_KEY=sk-abc123\n# Comment line\nDEBUG=true\nEMPTY_VALUE=" },
      { id: "mode", label: "Check For", type: "dropdown", options: ["All Issues", "Duplicates Only", "Empty Values Only", "Security Risks"] }
    ]
  },
  {
    id: "api-mock-generator",
    title: "API Mock Data Generator",
    category: "Developer & Tech Utilities",
    description: "Generates realistic mock API JSON responses with user, product, and order schemas for testing.",
        inputs: [
      { id: "input_data", label: "Schema Type (user / product / order / custom)", type: "text", placeholder: "user" },
      { id: "mode", label: "Number of Records", type: "dropdown", options: ["3 records", "5 records", "10 records", "Custom JSON template"] }
    ]
  },
  {
    id: "typescript-type-checker",
    title: "TypeScript Interface Validator",
    category: "Developer & Tech Utilities",
    description: "Validates JavaScript objects against TypeScript interface definitions and shows type mismatches.",
    inputs: [
      {
        id: "input_data",
        label: "Input Data / Parameters",
        type: "textarea",
        placeholder: "Enter your data, URL, text, or configuration here..."
      },
      {
        id: "mode",
        label: "Mode / Options",
        type: "dropdown",
        options: ["Standard Mode", "Advanced Mode", "Export Output"]
      }
    ]
  },
  {
    id: "code-snippet-image",
    title: "Code Snippet to Image",
    category: "Developer & Tech Utilities",
    description: "Converts code blocks into beautiful, shareable PNG images with syntax highlighting themes.",
        inputs: [
      { id: "input_data", label: "Code to Snapshot", type: "textarea", placeholder: "const greet = (name) => `Hello, ${name}!`;\nconsole.log(greet(\"World\"));" },
      { id: "mode", label: "Language / Theme", type: "dropdown", options: ["JavaScript â€” Dracula", "TypeScript â€” GitHub Light", "Python â€” One Dark", "CSS â€” Solarized", "Go â€” Nord"] }
    ]
  },
  {
    id: "package-json-analyzer",
    title: "package.json Analyzer",
    category: "Developer & Tech Utilities",
    description: "Analyzes package.json to identify outdated, duplicate, or unused dependencies in your project.",
        inputs: [
      { id: "input_data", label: "Paste package.json contents", type: "textarea", placeholder: '{"name":"my-app","version":"1.0.0","dependencies":{"react":"^18.0.0","lodash":"^4.17.21","moment":"^2.29.0"},"devDependencies":{"typescript":"^5.0.0"}}' },
      { id: "mode", label: "Analysis Focus", type: "dropdown", options: ["All Dependencies", "Production Only", "Dev Dependencies Only", "Find Heavy Packages"] }
    ]
  },
  {
    id: "json-path-tester",
    title: "JSONPath & JQ Query Tester",
    category: "Developer & Tech Utilities",
    description: "Tests JSONPath expressions and jq-style queries against live JSON data with highlighted results.",
        inputs: [
      { id: "input_data", label: "JSON Data", type: "textarea", placeholder: '{"store":{"books":[{"title":"Moby Dick","price":9.99},{"title":"War and Peace","price":14.99}],"name":"Book Store"}}' },
      { id: "mode", label: "JSONPath Query", type: "text", placeholder: "$.store.books[0].title" }
    ]
  },
  {
    id: "sql-to-json",
    title: "SQL to JSON Schema Generator",
    category: "Developer & Tech Utilities",
    description: "Converts SQL CREATE TABLE statements into JSON Schema definitions for API documentation.",
        inputs: [
      { id: "input_data", label: "SQL CREATE TABLE Statement", type: "textarea", placeholder: "CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) UNIQUE,\n  age INT,\n  created_at TIMESTAMP\n);" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["JSON Schema (Draft-07)", "TypeScript Interface", "OpenAPI Properties", "GraphQL Type"] }
    ]
  },
  {
    id: "curl-to-code",
    title: "cURL Command to Code Converter",
    category: "Developer & Tech Utilities",
    description: "Converts cURL commands into equivalent Python, JavaScript, PHP, and Go HTTP request code.",
        inputs: [
      { id: "input_data", label: "cURL Command", type: "textarea", placeholder: "curl -X POST https://api.example.com/users -H Content-Type:application/json -d name=Alice" },
      { id: "mode", label: "Target Language", type: "dropdown", options: ["Python (requests)", "JavaScript (fetch)", "PHP (curl)", "Go (net/http)", "All Languages"] }
    ]
  },
  {
    id: "color-palette-generator",
    title: "AI Color Palette Generator",
    category: "Developer & Tech Utilities",
    description: "Generates harmonious 5-color palettes from a seed color using color theory and HSL math.",
        inputs: [
      { id: "input_data", label: "Seed Color (HEX)", type: "text", placeholder: "#3b82f6" },
      { id: "mode", label: "Palette Style", type: "dropdown", options: ["Complementary (2 colors)", "Analogous (3 colors)", "Triadic (3 colors)", "Full 5-color Palette", "Monochromatic shades"] }
    ]
  },
  {
    id: "npm-package-size-checker",
    title: "NPM Package Size Checker",
    category: "Developer & Tech Utilities",
    description: "Estimates the bundle size impact of any npm package before adding it to your project.",
        inputs: [
      { id: "input_data", label: "NPM Package Name", type: "text", placeholder: "lodash" },
      { id: "mode", label: "Compare With", type: "dropdown", options: ["Show size only", "Compare: lodash vs lodash-es", "Compare: moment vs dayjs", "Compare: axios vs fetch"] }
    ]
  },
  {
    id: "robots-txt-tester",
    title: "Robots.txt Rule Tester",
    category: "Developer & Tech Utilities",
    description: "Tests if a specific URL is allowed or blocked by robots.txt rules for common search engine bots.",
        inputs: [
      { id: "input_data", label: "robots.txt Content", type: "textarea", placeholder: "User-agent: *\nDisallow: /admin/\nDisallow: /private/\nAllow: /public/\nSitemap: https://example.com/sitemap.xml" },
      { id: "mode", label: "URL to Test", type: "text", placeholder: "/admin/dashboard" }
    ]
  },
  {
    id: "json-schema-validator",
    title: "JSON Schema Validator",
    category: "Developer & Tech Utilities",
    description: "Validates JSON data against a JSON Schema definition and reports all validation errors clearly.",
        inputs: [
      { id: "input_data", label: "JSON Data to Validate", type: "textarea", placeholder: '{"name": "Alice", "age": 30, "email": "alice@example.com"}' },
      { id: "mode", label: "Validation Mode", type: "dropdown", options: ["Structural Check", "Strict (no nulls/empty)", "Type Inference", "Generate Schema from JSON"] }
    ]
  },
  {
    id: "image-to-base64",
    title: "Image to Base64 Encoder",
    category: "Media, Design & Productivity",
    description: "Converts uploaded images to Base64 data URIs for embedding in HTML, CSS, and JSON payloads.",
        inputs: [
      { id: "input_data", label: "Or enter image URL to encode", type: "text", placeholder: "https://example.com/image.png (or upload a file above)" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["Data URI (base64)", "Base64 string only", "CSS background-image", "HTML <img> tag"] }
    ]
  },
  {
    id: "svg-to-png-converter",
    title: "SVG to PNG Converter",
    category: "Media, Design & Productivity",
    description: "Renders SVG vector files into high-resolution PNG images at any custom pixel size.",
        inputs: [
      { id: "input_data", label: "SVG Code", type: "textarea", placeholder: '<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">\n  <circle cx="100" cy="100" r="80" fill="#3b82f6"/>\n  <text x="100" y="110" text-anchor="middle" fill="white" font-size="40">Z</text>\n</svg>' },
      { id: "mode", label: "Output Resolution", type: "dropdown", options: ["512Ã—512 px", "256Ã—256 px", "1024Ã—1024 px", "1920Ã—1080 px", "Custom size"] }
    ]
  },
  {
    id: "image-metadata-viewer",
    title: "Image Metadata Viewer",
    category: "Media, Design & Productivity",
    description: "Extracts and displays all EXIF, IPTC, and XMP metadata embedded in JPEG, PNG, and TIFF files.",
        inputs: [
      { id: "input_data", label: "Image URL to inspect", type: "text", placeholder: "https://example.com/photo.jpg (or upload above)" },
      { id: "mode", label: "Metadata Type", type: "dropdown", options: ["All Metadata (EXIF + IPTC)", "EXIF only (camera data)", "GPS Location", "File info only", "Privacy check (strip guide)"] }
    ]
  },
  {
    id: "color-picker-eyedropper",
    title: "Color Picker & Eyedropper",
    category: "Media, Design & Productivity",
    description: "Upload any image and click to extract exact hex, RGB, and HSL color values from any pixel.",
        inputs: [
      { id: "input_data", label: "Color Value (HEX, RGB, or HSL)", type: "text", placeholder: "#3b82f6  OR  rgb(59,130,246)  OR  hsl(217,91%,60%)" },
      { id: "mode", label: "Output Formats", type: "dropdown", options: ["All Formats (HEX + RGB + HSL)", "HEX only", "RGB only", "HSL only", "CSS Variables snippet"] }
    ]
  },
  {
    id: "photo-filters-editor",
    title: "Photo Filter & Enhancement Editor",
    category: "Media, Design & Productivity",
    description: "Applies brightness, contrast, saturation, blur, and sepia filters to images entirely client-side.",
        inputs: [
      { id: "input_data", label: "Image URL (or upload above)", type: "text", placeholder: "https://example.com/photo.jpg" },
      { id: "mode", label: "Filter Preset", type: "dropdown", options: ["Vivid (bright & saturated)", "Vintage (warm sepia)", "B&W (grayscale)", "Cool (blue tone)", "Dramatic (high contrast)", "Soft (low contrast)", "Generate CSS code"] }
    ]
  },
  {
    id: "text-to-speech",
    title: "Text to Speech Converter",
    category: "Media, Design & Productivity",
    description: "Converts typed text to spoken audio using browser Web Speech API with voice and speed controls.",
        inputs: [
      { id: "input_data", label: "Text to Speak", type: "textarea", placeholder: "Hello! Welcome to Zenovee, your ultimate free tool suite." },
      { id: "mode", label: "Voice / Speed", type: "dropdown", options: ["English US â€” Normal", "English UK â€” Normal", "English US â€” Slow", "English US â€” Fast", "Generate Browser Code"] }
    ]
  },
  {
    id: "speech-to-text",
    title: "Speech to Text Transcriber",
    category: "Media, Design & Productivity",
    description: "Records microphone audio and transcribes it to text live using the Web Speech Recognition API.",
        inputs: [
      { id: "input_data", label: "Or paste audio transcript to clean up", type: "textarea", placeholder: "um so basically I wanted to talk about you know web development and like the tools that we use..." },
      { id: "mode", label: "Language / Mode", type: "dropdown", options: ["English US (en-US)", "English UK (en-GB)", "Hindi (hi-IN)", "Spanish (es-ES)", "French (fr-FR)", "Generate Browser Code"] }
    ]
  },
  {
    id: "pdf-to-text",
    title: "PDF Text Extractor",
    category: "Media, Design & Productivity",
    description: "Extracts all text content from uploaded PDF documents for editing or data processing locally.",
        inputs: [
      { id: "input_data", label: "Or paste PDF text content directly", type: "textarea", placeholder: "Paste extracted text here, or upload a PDF file above..." },
      { id: "mode", label: "Extraction Mode", type: "dropdown", options: ["Extract all text", "First page only", "Remove page numbers", "Clean whitespace"] }
    ]
  },
  {
    id: "resume-ats-scanner",
    title: "Resume ATS Score Checker",
    category: "Media, Design & Productivity",
    description: "Analyzes a resume for ATS compatibility, keyword density, and formatting issues with a score.",
        inputs: [
      { id: "input_data", label: "Paste Your Resume Text", type: "textarea", placeholder: "John Doe\nSoftware Engineer | john@email.com | +1-555-0100\n\nEXPERIENCE\n- 3 years React & Node.js development\n- Led team of 5 engineers\n\nSKILLS: JavaScript, Python, SQL, AWS\n\nEDUCATION\nB.Sc Computer Science, 2020" },
      { id: "mode", label: "Target Job Type", type: "dropdown", options: ["Software Engineer", "Product Manager", "Data Scientist", "UX Designer", "Marketing Manager", "General ATS Check"] }
    ]
  },
  {
    id: "social-image-resizer",
    title: "Social Media Image Resizer",
    category: "Media, Design & Productivity",
    description: "Resizes and crops images to exact dimensions for Instagram, Twitter, LinkedIn, and Facebook.",
        inputs: [
      { id: "input_data", label: "Image URL or description", type: "text", placeholder: "https://example.com/my-photo.jpg" },
      { id: "mode", label: "Target Platform", type: "dropdown", options: ["Instagram Post (1080Ã—1080)", "Instagram Story (1080Ã—1920)", "Twitter Post (1200Ã—675)", "LinkedIn Post (1200Ã—627)", "Facebook Post (1200Ã—630)", "YouTube Thumbnail (1280Ã—720)", "TikTok (1080Ã—1920)"] }
    ]
  },
  {
    id: "thumbnail-generator",
    title: "YouTube Thumbnail Generator",
    category: "Media, Design & Productivity",
    description: "Creates professional YouTube thumbnail layouts with text overlays and branded color schemes.",
        inputs: [
      { id: "input_data", label: "Video Title or Content Idea", type: "text", placeholder: "10 Web Dev Tricks You NEED to Know in 2025" },
      { id: "mode", label: "Platform & Style", type: "dropdown", options: ["YouTube â€” Tech", "YouTube â€” Tutorial", "YouTube â€” Vlog", "TikTok Cover", "Instagram Reel Cover"] }
    ]
  },
  {
    id: "word-cloud-generator",
    title: "Word Cloud Generator",
    category: "Media, Design & Productivity",
    description: "Generates a visual word cloud from pasted text with customizable colors, fonts, and layouts.",
        inputs: [
      { id: "input_data", label: "Paste Text to Analyze", type: "textarea", placeholder: "developer tools free online web design coding programming javascript react python cloud computing software technology digital innovation" },
      { id: "mode", label: "Display Options", type: "dropdown", options: ["Top 30 words", "Top 50 words", "Top 20 words", "Remove common words (stop words)", "Show frequency table only"] }
    ]
  },
  {
    id: "meme-generator",
    title: "Meme Generator",
    category: "Media, Design & Productivity",
    description: "Creates memes by adding top and bottom caption text over popular template images instantly.",
        inputs: [
      { id: "input_data", label: "Top Caption Text", type: "text", placeholder: "When the client says" },
      { id: "mode", label: "Bottom Caption / Template", type: "text", placeholder: '"just make it pop"' }
    ]
  },
  {
    id: "ascii-art-generator",
    title: "ASCII Art Generator",
    category: "Media, Design & Productivity",
    description: "Converts images or typed text into beautiful ASCII art patterns for terminal and text displays.",
        inputs: [
      { id: "input_data", label: "Text to Convert (max 8 characters)", type: "text", placeholder: "ZENOVEE" },
      { id: "mode", label: "Art Style", type: "dropdown", options: ["Block Capitals", "Simple ASCII", "Stars Pattern", "Box Border", "Banner Style"] }
    ]
  },
  {
    id: "timeline-maker",
    title: "Visual Timeline Maker",
    category: "Media, Design & Productivity",
    description: "Creates clean, shareable project or historical timelines exportable as PNG from browser.",
        inputs: [
      { id: "input_data", label: "Timeline Events (one per line, format: YEAR: Event)", type: "textarea", placeholder: "2020: Company Founded\n2021: First Product Launch\n2022: 10,000 Users Milestone\n2023: Series A Funding\n2024: International Expansion" },
      { id: "mode", label: "Timeline Style", type: "dropdown", options: ["Vertical Timeline", "Horizontal (table)", "Milestones only", "With descriptions"] }
    ]
  },
  {
    id: "invoice-generator",
    title: "Free Invoice Generator",
    category: "Media, Design & Productivity",
    description: "Creates professional, printable PDF invoices with custom branding, line items, and tax calculations.",
        inputs: [
      { id: "input_data", label: "Client / Company Name", type: "text", placeholder: "Acme Corp" },
      { id: "mode", label: "Currency & Tax", type: "dropdown", options: ["USD â€” 10% Tax", "USD â€” No Tax", "EUR â€” 20% VAT", "GBP â€” 20% VAT", "INR â€” 18% GST", "Custom (no tax)"] }
    ]
  },
  {
    id: "mind-map-builder",
    title: "Mind Map Builder",
    category: "Media, Design & Productivity",
    description: "Drag-and-drop mind mapping tool that saves to localStorage and exports as PNG or JSON.",
        inputs: [
      { id: "input_data", label: "Central Topic / Main Idea", type: "text", placeholder: "Product Launch Strategy" },
      { id: "mode", label: "Branch Template", type: "dropdown", options: ["Business Plan (Marketing, Sales, Dev, Ops, Finance)", "Study Notes (Introduction, Key Concepts, Examples, Summary)", "Project Plan (Goals, Tasks, Resources, Timeline, Risks)", "Custom (auto-generate branches)"] }
    ]
  },
  {
    id: "signature-generator",
    title: "Digital Signature Generator",
    category: "Media, Design & Productivity",
    description: "Draw or type a custom signature and download it as a transparent PNG for document signing.",
        inputs: [
      { id: "input_data", label: "Your Full Name", type: "text", placeholder: "John Doe" },
      { id: "mode", label: "Signature Style", type: "dropdown", options: ["Cursive (Unicode)", "Bold Print", "Minimal Initials", "All Three Styles"] }
    ]
  },
  {
    id: "scientific-calculator",
    title: "Scientific Calculator",
    category: "Calculators & Mathematics",
    description: "Full-featured scientific calculator with trigonometry, logarithms, and memory functions.",
        inputs: [
      { id: "input_data", label: "Mathematical Expression", type: "text", placeholder: "sin(30) * cos(45) + log(100)" },
      { id: "mode", label: "Angle Unit", type: "dropdown", options: ["Degrees (Â°)", "Radians (rad)", "Gradians (grad)"] }
    ]
  },
  {
    id: "fraction-calculator",
    title: "Fraction & Mixed Number Calculator",
    category: "Calculators & Mathematics",
    description: "Adds, subtracts, multiplies, and divides fractions with step-by-step working shown.",
        inputs: [
      { id: "input_data", label: "Fraction Expression", type: "text", placeholder: "3/4 + 1/3  (use +, -, *, /)" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["Simplified fraction + decimal", "Mixed number (e.g. 1 1/4)", "Decimal only", "Step-by-step working"] }
    ]
  },
  {
    id: "matrix-calculator",
    title: "Matrix Calculator",
    category: "Calculators & Mathematics",
    description: "Performs matrix addition, multiplication, transposition, and determinant calculations.",
        inputs: [
      { id: "input_data", label: "Matrix A (rows separated by newlines, values by commas)", type: "textarea", placeholder: "1, 2\n3, 4" },
      { id: "mode", label: "Operation", type: "dropdown", options: ["Multiply A Ã— B", "Add A + B", "Subtract A - B", "Transpose A", "Determinant of A", "Inverse of A (2Ã—2)"] }
    ]
  },
  {
    id: "prime-number-checker",
    title: "Prime Number Checker & Generator",
    category: "Calculators & Mathematics",
    description: "Checks if any number is prime and generates prime lists using the Sieve of Eratosthenes.",
        inputs: [
      { id: "input_data", label: "Number to Check", type: "text", placeholder: "97" },
      { id: "mode", label: "Additional Options", type: "dropdown", options: ["Is it prime?", "List primes up to N", "Find next prime", "Factorize the number", "List first 50 primes"] }
    ]
  },
  {
    id: "date-duration-calculator",
    title: "Date Duration & Working Days Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates exact calendar days, weeks, months, and business days between two dates.",
        inputs: [
      { id: "input_data", label: "Start Date (YYYY-MM-DD)", type: "text", placeholder: "2024-01-01" },
      { id: "mode", label: "End Date (YYYY-MM-DD)", type: "text", placeholder: "2024-12-31" }
    ]
  },
  {
    id: "calorie-macro-calculator",
    title: "Calorie & Macro Calculator",
    category: "Calculators & Mathematics",
    description: "Computes daily calorie needs (TDEE) and macro splits based on weight, height, age, and goal.",
        inputs: [
      { id: "input_data", label: "Body Weight (kg)", type: "text", placeholder: "70" },
      { id: "mode", label: "Fitness Goal", type: "dropdown", options: ["Maintenance (stay same weight)", "Fat Loss (cut calories)", "Muscle Gain (bulk)", "Aggressive Cut (-1000 kcal)", "Lean Bulk (+200 kcal)"] }
    ]
  },
  {
    id: "pace-calculator",
    title: "Running Pace & Race Time Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates running pace, finish time, and distance for races from 5K to marathons.",
        inputs: [
      { id: "input_data", label: "Your Running Pace (minutes per km)", type: "text", placeholder: "5.5  (e.g. 5.5 = 5 min 30 sec per km)" },
      { id: "mode", label: "Race Distance", type: "dropdown", options: ["All races (5K, 10K, Half, Marathon)", "5K only", "10K only", "Half Marathon only", "Full Marathon only"] }
    ]
  },
  {
    id: "blood-pressure-analyzer",
    title: "Blood Pressure Analyzer",
    category: "Calculators & Mathematics",
    description: "Categorizes blood pressure readings and provides health guidance based on WHO guidelines.",
        inputs: [
      { id: "input_data", label: "Blood Pressure Reading (Systolic/Diastolic)", type: "text", placeholder: "120/80" },
      { id: "mode", label: "Show Details", type: "dropdown", options: ["Full analysis + advice", "Classification only", "Compare to WHO ranges", "Track multiple readings"] }
    ]
  },
  {
    id: "alcohol-unit-calculator",
    title: "Alcohol Unit & BAC Calculator",
    category: "Calculators & Mathematics",
    description: "Estimates blood alcohol content (BAC) based on drinks consumed, body weight, and time.",
        inputs: [
      { id: "input_data", label: "Number of Drinks Consumed", type: "text", placeholder: "3" },
      { id: "mode", label: "Drink Type & Body Weight", type: "dropdown", options: ["Beer (330ml 5%) â€” 70kg", "Beer (500ml 5%) â€” 70kg", "Wine (175ml 13%) â€” 70kg", "Spirit (25ml 40%) â€” 70kg", "Beer â€” 60kg", "Beer â€” 80kg", "Beer â€” 90kg"] }
    ]
  },
  {
    id: "pregnancy-due-date",
    title: "Pregnancy Due Date Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates estimated due date, trimester milestones, and weekly progression from LMP date.",
        inputs: [
      { id: "input_data", label: "Last Menstrual Period (LMP) Date (YYYY-MM-DD)", type: "text", placeholder: "2024-03-15" },
      { id: "mode", label: "Calendar Style", type: "dropdown", options: ["All milestones (full report)", "Due date only", "Week-by-week tracker", "Trimester overview"] }
    ]
  },
  {
    id: "sleep-cycle-calculator",
    title: "Sleep Cycle Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates optimal wake-up times based on sleep cycles to minimize grogginess.",
        inputs: [
      { id: "input_data", label: "Bedtime (HH:MM, 24-hour format)", type: "text", placeholder: "23:00" },
      { id: "mode", label: "Sleep Goal", type: "dropdown", options: ["Find optimal wake times", "7-9 hours target", "6 hours (minimum)", "Nap optimizer (20-90 min)", "Night shift worker"] }
    ]
  },
  {
    id: "investment-return-calculator",
    title: "ROI & Investment Return Calculator",
    category: "Calculators & Mathematics",
    description: "Calculates ROI percentage, annualized return, and profit/loss for any investment period.",
        inputs: [
      { id: "input_data", label: "Initial Investment Amount ($)", type: "text", placeholder: "10000" },
      { id: "mode", label: "Final Value ($) or Return %", type: "text", placeholder: "15000  (or enter as: 50% return)" }
    ]
  },
  {
    id: "currency-converter",
    title: "Multi-Currency Converter",
    category: "Calculators & Mathematics",
    description: "Converts between 150+ world currencies using up-to-date exchange rate tables instantly.",
        inputs: [
      { id: "input_data", label: "Amount to Convert", type: "text", placeholder: "100" },
      { id: "mode", label: "From Currency", type: "dropdown", options: ["USD (US Dollar)", "EUR (Euro)", "GBP (British Pound)", "INR (Indian Rupee)", "JPY (Japanese Yen)", "AED (UAE Dirham)", "SAR (Saudi Riyal)", "CAD (Canadian Dollar)", "AUD (Australian Dollar)"] }
    ]
  },
  {
    id: "hashtag-generator",
    title: "Hashtag Generator for Instagram/TikTok",
    category: "Growth Marketing & SEO Suite",
    description: "Generates viral, niche-relevant hashtag sets for Instagram, TikTok, and Twitter posts.",
        inputs: [
      { id: "input_data", label: "Topic, Keywords or Caption", type: "textarea", placeholder: "web development tutorial javascript react coding tips for beginners" },
      { id: "mode", label: "Platform & Count", type: "dropdown", options: ["Instagram â€” 30 hashtags", "TikTok â€” 10 hashtags", "Twitter/X â€” 5 hashtags", "LinkedIn â€” 8 hashtags", "All Platforms"] }
    ]
  },
  {
    id: "social-bio-generator",
    title: "Social Media Bio Generator",
    category: "Growth Marketing & SEO Suite",
    description: "Creates punchy, optimized bios for Instagram, Twitter, TikTok, and LinkedIn profiles.",
        inputs: [
      { id: "input_data", label: "Your Role / Keywords / Niche", type: "textarea", placeholder: "Full-stack developer | JavaScript & React specialist | Building SaaS products | Open source contributor" },
      { id: "mode", label: "Target Platform", type: "dropdown", options: ["All Platforms", "Instagram Only", "Twitter/X Only", "LinkedIn Only", "TikTok Only"] }
    ]
  },
  {
    id: "blog-title-generator",
    title: "Blog Post Title Generator",
    category: "Growth Marketing & SEO Suite",
    description: "Generates SEO-optimized, click-worthy blog titles from a topic keyword using proven formulas.",
        inputs: [
      { id: "input_data", label: "Blog Topic or Main Keyword", type: "text", placeholder: "JavaScript performance optimization" },
      { id: "mode", label: "Content Format", type: "dropdown", options: ["Listicle (e.g. 10 tips...)", "How-to Guide", "Ultimate Guide", "Case Study", "Beginner Tutorial", "Expert Deep-Dive"] }
    ]
  },
  {
    id: "cta-copywriter",
    title: "Call-to-Action Copywriter",
    category: "Growth Marketing & SEO Suite",
    description: "Generates high-converting CTA button text and banner copy for landing pages and ads.",
        inputs: [
      { id: "input_data", label: "Product / Service Name", type: "text", placeholder: "free developer tool suite" },
      { id: "mode", label: "CTA Goal", type: "dropdown", options: ["Free Trial / Sign Up", "Buy Now / Purchase", "Learn More", "Download", "Book a Demo", "Get a Quote"] }
    ]
  },
  {
    id: "email-subject-line-tester",
    title: "Email Subject Line Tester",
    category: "Growth Marketing & SEO Suite",
    description: "Scores email subject lines for open rate potential using spam analysis and emotional triggers.",
        inputs: [
      { id: "input_data", label: "Email Subject Line to Test", type: "text", placeholder: "You need to see this deal before it expires tonight" },
      { id: "mode", label: "Email Type", type: "dropdown", options: ["Promotional / Sale", "Newsletter", "Cold Outreach", "Transactional", "Re-engagement"] }
    ]
  },
  {
    id: "ab-test-calculator",
    title: "A/B Test Significance Calculator",
    category: "Growth Marketing & SEO Suite",
    description: "Calculates statistical significance of A/B tests and declares a winner with confidence levels.",
        inputs: [
      { id: "input_data", label: "Control Conversion Rate (%)", type: "text", placeholder: "5" },
      { id: "mode", label: "Variant Conversion Rate (%)", type: "text", placeholder: "6.5" }
    ]
  },
  {
    id: "competitor-keyword-analyzer",
    title: "Competitor Keyword Analyzer",
    category: "Growth Marketing & SEO Suite",
    description: "Extracts and analyzes keyword density and meta tags from any competitor URL for SEO insights.",
        inputs: [
      { id: "input_data", label: "Competitor Website URL", type: "text", placeholder: "https://competitor.com" },
      { id: "mode", label: "Analysis Type", type: "dropdown", options: ["Top keywords estimate", "Content gaps", "Site structure analysis", "Meta tags inspection", "Free tool recommendations"] }
    ]
  },
  {
    id: "content-brief-generator",
    title: "SEO Content Brief Generator",
    category: "Growth Marketing & SEO Suite",
    description: "Creates detailed SEO content briefs with H2/H3 outlines, word count targets, and keyword usage.",
        inputs: [
      { id: "input_data", label: "Target Keyword / Topic", type: "text", placeholder: "best javascript frameworks 2025" },
      { id: "mode", label: "Content Type", type: "dropdown", options: ["Long-form Guide (2000+ words)", "Blog Post (1000 words)", "Product Review", "Landing Page Copy", "Social Media Caption"] }
    ]
  },
  {
    id: "schema-markup-generator",
    title: "Schema Markup Generator (JSON-LD)",
    category: "Growth Marketing & SEO Suite",
    description: "Generates Google-compliant JSON-LD schema markup for articles, products, FAQs, and events.",
        inputs: [
      { id: "input_data", label: "Schema Type (Article, FAQ, Product, Event, Recipe)", type: "text", placeholder: "Article" },
      { id: "mode", label: "Output Format", type: "dropdown", options: ["JSON-LD (recommended)", "Microdata", "RDFa", "Include in <head> tag example"] }
    ]
  },
  {
    id: "link-in-bio-builder",
    title: "Link-in-Bio Page Builder",
    category: "Growth Marketing & SEO Suite",
    description: "Creates a beautiful, mobile-first link-in-bio page with customizable buttons and themes.",
        inputs: [
      { id: "input_data", label: "Your Name / Brand Name", type: "text", placeholder: "Alex Johnson" },
      { id: "mode", label: "Profile Style", type: "dropdown", options: ["Developer / Tech", "Creator / Influencer", "Business / Agency", "Artist / Musician", "E-commerce / Shop"] }
    ]
  },
  {
    id: "affiliate-disclosure-generator",
    title: "Affiliate Disclosure Generator",
    category: "Growth Marketing & SEO Suite",
    description: "Generates FTC-compliant affiliate disclosure statements for blogs and review websites.",
        inputs: [
      { id: "input_data", label: "Your Website / Blog Name", type: "text", placeholder: "TechReviews.com" },
      { id: "mode", label: "Affiliate Programs", type: "dropdown", options: ["Amazon Associates", "Multiple Programs (generic)", "ShareASale / CJ", "ClickBank", "Custom Program Name"] }
    ]
  },
  {
    id: "newsletter-subject-analyzer",
    title: "Newsletter Open Rate Optimizer",
    category: "Growth Marketing & SEO Suite",
    description: "Analyzes newsletter subject lines for curiosity gaps, length, and power word density scores.",
        inputs: [
      { id: "input_data", label: "Newsletter Subject Line", type: "text", placeholder: "This week: 3 tools every developer needs" },
      { id: "mode", label: "Newsletter Type", type: "dropdown", options: ["Weekly newsletter", "Product update", "Content roundup", "Promotional offer", "Personal/story-based"] }
    ]
  },
  {
    id: "http-request-builder",
    title: "HTTP Request Builder & Sender",
    category: "Network & Server Utilities",
    description: "Constructs and sends GET, POST, PUT, DELETE requests with custom headers and JSON body.",
        inputs: [
      { id: "input_data", label: "API Endpoint URL", type: "text", placeholder: "https://api.example.com/users" },
      { id: "mode", label: "HTTP Method", type: "dropdown", options: ["GET", "POST (with JSON body)", "PUT (update)", "DELETE", "PATCH", "HEAD", "OPTIONS"] }
    ]
  },
  {
    id: "dns-record-checker",
    title: "DNS Record Checker (A, MX, TXT, CNAME)",
    category: "Network & Server Utilities",
    description: "Looks up all DNS record types for any domain and shows propagation status globally.",
        inputs: [
      { id: "input_data", label: "Domain Name", type: "text", placeholder: "zenovee.in" },
      { id: "mode", label: "Record Type to Check", type: "dropdown", options: ["All Records (A, MX, TXT, CNAME, NS)", "A Record (IPv4)", "MX Records (Email)", "TXT Records (SPF/DKIM)", "CNAME Records", "NS Records (Name Servers)"] }
    ]
  },
  {
    id: "web-page-speed-analyzer",
    title: "Web Page Load Speed Analyzer",
    category: "Network & Server Utilities",
    description: "Measures page load time, resource sizes, and identifies performance bottlenecks for any URL.",
        inputs: [
      { id: "input_data", label: "Website URL", type: "text", placeholder: "https://zenovee.in" },
      { id: "mode", label: "Test Type", type: "dropdown", options: ["Full performance audit", "Core Web Vitals only", "Mobile performance", "Desktop performance", "How to fix issues"] }
    ]
  },
  {
    id: "json-api-formatter",
    title: "JSON API Response Formatter",
    category: "Network & Server Utilities",
    description: "Fetches a JSON API endpoint and displays the response formatted, highlighted, and searchable.",
        inputs: [
      { id: "input_data", label: "JSON API Response (paste here)", type: "textarea", placeholder: '{"id":1,"user":{"name":"Alice","email":"alice@example.com"},"items":[{"product":"Widget","qty":3,"price":9.99}],"total":29.97}' },
      { id: "mode", label: "Format Style", type: "dropdown", options: ["Pretty (2-space indent)", "Pretty (4-space indent)", "Minified", "Sorted keys", "Search for key..."] }
    ]
  },
  {
    id: "csp-header-generator",
    title: "Content Security Policy Generator",
    category: "Network & Server Utilities",
    description: "Generates strict Content-Security-Policy headers with directives for scripts, styles, and media.",
        inputs: [
      { id: "input_data", label: "Your Website Domain", type: "text", placeholder: "https://zenovee.in" },
      { id: "mode", label: "Strictness Level", type: "dropdown", options: ["Strict (recommended)", "Moderate (allows inline scripts)", "Permissive (legacy apps)", "API Only (no browser UI)", "Custom builder"] }
    ]
  },
  {
    id: "cors-policy-checker",
    title: "CORS Policy Analyzer",
    category: "Network & Server Utilities",
    description: "Analyzes CORS headers from any URL and validates cross-origin resource sharing configuration.",
        inputs: [
      { id: "input_data", label: "API URL to Analyze", type: "text", placeholder: "https://api.example.com/data" },
      { id: "mode", label: "Allowed Origin", type: "text", placeholder: "https://yourdomain.com" }
    ]
  },
  {
    id: "firewall-rule-generator",
    title: "Firewall Rule Generator (iptables/UFW)",
    category: "Network & Server Utilities",
    description: "Generates ready-to-use iptables or UFW firewall rules from simple allow/deny configuration UI.",
        inputs: [
      { id: "input_data", label: "Port Number(s) to Allow (e.g. 443 or 80,443,8080)", type: "text", placeholder: "443" },
      { id: "mode", label: "Firewall Type", type: "dropdown", options: ["iptables (Linux)", "UFW (Ubuntu)", "Windows Firewall", "AWS Security Group rules", "Nginx deny rules"] }
    ]
  },
  {
    id: "break-even-calculator",
    title: "Break-Even Analysis Calculator",
    category: "Financial & Investment Engines",
    description: "Calculates units needed to break even based on fixed costs, variable costs, and selling price.",
        inputs: [
      { id: "input_data", label: "Total Fixed Costs ($)", type: "text", placeholder: "10000" },
      { id: "mode", label: "Selling Price & Variable Cost", type: "dropdown", options: ["Price $50, Cost $20/unit", "Price $100, Cost $40/unit", "Price $25, Cost $10/unit", "Price $200, Cost $80/unit", "Custom values"] }
    ]
  },
  {
    id: "stock-profit-calculator",
    title: "Stock Profit & Loss Calculator",
    category: "Financial & Investment Engines",
    description: "Computes profit, loss, percentage gain, and brokerage cost for stock trades in any currency.",
        inputs: [
      { id: "input_data", label: "Number of Shares", type: "text", placeholder: "100" },
      { id: "mode", label: "Buy Price â†’ Sell Price", type: "dropdown", options: ["$45.50 â†’ $68.25 (50% gain)", "$100 â†’ $150 (50% gain)", "$200 â†’ $180 (10% loss)", "$50 â†’ $75 (50% gain)", "Enter custom prices"] }
    ]
  },
  {
    id: "option-payoff-calculator",
    title: "Options Payoff Calculator",
    category: "Financial & Investment Engines",
    description: "Visualizes profit/loss payoff diagrams for call and put options at various expiry price points.",
        inputs: [
      { id: "input_data", label: "Strike Price ($)", type: "text", placeholder: "100" },
      { id: "mode", label: "Option Type & Premium", type: "dropdown", options: ["Call Option â€” $5 premium", "Put Option â€” $5 premium", "Call Option â€” $10 premium", "Put Option â€” $10 premium", "Covered Call"] }
    ]
  },
  {
    id: "savings-goal-planner",
    title: "Savings Goal Planner",
    category: "Financial & Investment Engines",
    description: "Calculates monthly savings required to reach a financial goal by a target date with interest.",
        inputs: [
      { id: "input_data", label: "Savings Goal Amount ($)", type: "text", placeholder: "50000" },
      { id: "mode", label: "Target Timeframe", type: "dropdown", options: ["12 months", "24 months", "36 months", "5 years", "10 years"] }
    ]
  },
  {
    id: "net-worth-calculator",
    title: "Net Worth Calculator",
    category: "Financial & Investment Engines",
    description: "Totals assets and liabilities to compute personal net worth with categorized breakdown charts.",
        inputs: [
      { id: "input_data", label: "Total Assets ($) â€” include savings, investments, property", type: "text", placeholder: "115000" },
      { id: "mode", label: "Total Liabilities ($) â€” include loans, credit cards, mortgage", type: "text", placeholder: "23500" }
    ]
  },
  {
    id: "crypto-profit-calculator",
    title: "Crypto Profit & Loss Calculator",
    category: "Financial & Investment Engines",
    description: "Calculates cryptocurrency investment gains, losses, and ROI from entry price to current price.",
        inputs: [
      { id: "input_data", label: "Buy Price per Coin ($)", type: "text", placeholder: "30000" },
      { id: "mode", label: "Sell Price & Amount", type: "dropdown", options: ["Sell at $45,000 â€” 0.5 BTC", "Sell at $60,000 â€” 1 BTC", "Sell at $100,000 â€” 0.1 BTC", "Sell at $20,000 â€” 1 ETH", "Sell at $1 â€” 10,000 USDT"] }
    ]
  },
  {
    id: "emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    category: "Financial & Investment Engines",
    description: "Calculates ideal emergency fund size based on monthly expenses and recommended buffer months.",
        inputs: [
      { id: "input_data", label: "Monthly Expenses ($)", type: "text", placeholder: "3000" },
      { id: "mode", label: "Buffer Period Target", type: "dropdown", options: ["3 months (minimum)", "6 months (recommended)", "9 months (conservative)", "12 months (maximum security)", "Custom months"] }
    ]
  }
];
