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
  {
    id: "image-compressor",
    title: "Client-Side Image Compressor & Converter",
    name: "Client-Side Image Compressor & Converter",
    category: "Content Creation & Media",
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
    category: "Content Creation & Media",
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
    category: "Content Creation & Media",
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
    category: "Content Creation & Media",
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
    category: "Content Creation & Media",
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
    category: "Content Creation & Media",
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
    category: "Growth Marketing & Analytics",
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
    category: "Growth Marketing & Analytics",
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
    category: "Growth Marketing & Analytics",
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
    category: "Growth Marketing & Analytics",
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
    category: "Growth Marketing & Analytics",
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
    category: "Growth Marketing & Analytics",
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
    category: "Growth Marketing & Analytics",
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
    id: "og-tag-generator",
    title: "Open Graph Meta Tag Visualizer",
    name: "Open Graph Meta Tag Visualizer",
    category: "Growth Marketing & Analytics",
    description: "Generates `<meta property=\"og:title\">` and Twitter Card tags with preview.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Open Graph Meta Tag Visualizer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Open Graph Meta Tag Visualizer..."
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Productivity & File Utilities",
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
    category: "Data & Tech Utilities",
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
    category: "Data & Tech Utilities",
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
    category: "Data & Tech Utilities",
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
    category: "Data & Tech Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Network & IP Utilities",
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
    category: "Encoders, Decoders & Converters",
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
    category: "Encoders, Decoders & Converters",
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
    category: "Encoders, Decoders & Converters",
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
    category: "Encoders, Decoders & Converters",
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
    category: "Encoders, Decoders & Converters",
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
    category: "Encoders, Decoders & Converters",
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
    category: "Text Processing & Manipulation",
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
    category: "Text Processing & Manipulation",
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
    category: "Text Processing & Manipulation",
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
    category: "Text Processing & Manipulation",
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
    category: "Web Security & Server Config",
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
    category: "Developer UI & Design Playgrounds",
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
    id: "robots-txt-builder",
    title: "Robots.txt File Builder",
    name: "Robots.txt File Builder",
    category: "SEO & Webmaster Suite",
    description: "Generates clean robots.txt disallow rules and sitemap directives.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Robots.txt File Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Robots.txt File Builder..."
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
    category: "Developer Build Utilities",
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
    category: "Developer Build Utilities",
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
  }
];