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
    id: "wasm-video-trimmer",
    title: "WebAssembly Video Trimmer",
    name: "WebAssembly Video Trimmer",
    category: "Content Creation & Media",
    description: "Trims and cuts video clips locally in-browser using WebAssembly ffmpeg core.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for WebAssembly Video Trimmer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for WebAssembly Video Trimmer..."
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
    id: "audio-pitch-changer",
    title: "Audio Pitch & Speed Changer",
    name: "Audio Pitch & Speed Changer",
    category: "Content Creation & Media",
    description: "Modifies playback pitch and speed without distortion using Web Audio API.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Audio Pitch & Speed Changer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Audio Pitch & Speed Changer..."
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
    id: "gif-converter",
    title: "GIF to MP4 / WebP Converter",
    name: "GIF to MP4 / WebP Converter",
    category: "Content Creation & Media",
    description: "Transcodes animated GIFs into lightweight MP4 videos or WebP images.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for GIF to MP4 / WebP Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for GIF to MP4 / WebP Converter..."
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
    id: "image-aspect-resizer",
    title: "Image Aspect Ratio Resizer",
    name: "Image Aspect Ratio Resizer",
    category: "Content Creation & Media",
    description: "Resizes images to exact aspect ratios (16:9, 4:3, 1:1) with canvas cropping.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Image Aspect Ratio Resizer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Image Aspect Ratio Resizer..."
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
    id: "headline-pixel-inspector",
    title: "Headline Character & Pixel Width Inspector",
    name: "Headline Character & Pixel Width Inspector",
    category: "Growth Marketing & Analytics",
    description: "Measures Google SERP title pixel widths (max 600px) and character limits.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Headline Character & Pixel Width Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Headline Character & Pixel Width Inspector..."
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
    id: "social-image-cropper",
    title: "Social Media Image Dimension Cropper",
    name: "Social Media Image Dimension Cropper",
    category: "Growth Marketing & Analytics",
    description: "Crops photos to exact specs for Twitter, LinkedIn, Instagram, and Facebook.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Social Media Image Dimension Cropper",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Social Media Image Dimension Cropper..."
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
    id: "audio-converter-wasm",
    title: "Client-Side Audio Converter (FFmpeg WASM)",
    name: "Client-Side Audio Converter (FFmpeg WASM)",
    category: "Productivity & File Utilities",
    description: "Converts MP3, WAV, AAC, and OGG audio files without server uploads.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side Audio Converter (FFmpeg WASM)",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side Audio Converter (FFmpeg WASM)..."
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
    id: "regex-tester",
    title: "Visual Regex Pattern Tester",
    name: "Visual Regex Pattern Tester",
    category: "Data & Tech Utilities",
    description: "Tests JavaScript regular expressions with live highlight matches and flags.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Visual Regex Pattern Tester",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Visual Regex Pattern Tester..."
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
    id: "sqlite-studio",
    title: "In-Browser SQLite Database Workbench",
    name: "In-Browser SQLite Database Workbench",
    category: "Data & Tech Utilities",
    description: "Runs SQL queries on local SQLite databases using sql.js WebAssembly.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for In-Browser SQLite Database Workbench",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for In-Browser SQLite Database Workbench..."
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
    id: "color-contrast",
    title: "WCAG 2.1 Color Contrast Checker",
    name: "WCAG 2.1 Color Contrast Checker",
    category: "Data & Tech Utilities",
    description: "Calculates WCAG AA/AAA contrast ratios between text and background colors.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for WCAG 2.1 Color Contrast Checker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for WCAG 2.1 Color Contrast Checker..."
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
    id: "csv-converter",
    title: "CSV / TSV to JSON / YAML Engine",
    name: "CSV / TSV to JSON / YAML Engine",
    category: "Data & Tech Utilities",
    description: "Converts spreadsheet CSV data into formatted JSON, XML, or YAML.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSV / TSV to JSON / YAML Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSV / TSV to JSON / YAML Engine..."
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
    id: "password-generator",
    title: "Secure Password & Entropy Generator",
    name: "Secure Password & Entropy Generator",
    category: "Data & Tech Utilities",
    description: "Generates cryptographically secure passwords using Web Crypto API.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Secure Password & Entropy Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Secure Password & Entropy Generator..."
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
    id: "base64-image-data-uri",
    title: "Base64 Image to Data URI Converter",
    name: "Base64 Image to Data URI Converter",
    category: "Data & Tech Utilities",
    description: "Converts PNG/JPEG images into inline `data:image/png;base64,...` strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Base64 Image to Data URI Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Base64 Image to Data URI Converter..."
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
    id: "user-agent-parser",
    title: "User-Agent String Parser",
    name: "User-Agent String Parser",
    category: "Network & IP Utilities",
    description: "Parses User-Agent strings extracting Browser, OS, Engine, and Device.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for User-Agent String Parser",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for User-Agent String Parser..."
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
    id: "binary-to-decimal",
    title: "Binary to Decimal / Hex / Octal Converter",
    name: "Binary to Decimal / Hex / Octal Converter",
    category: "Encoders, Decoders & Converters",
    description: "Converts numbers between Binary (Base-2), Octal, Decimal, and Hex.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Binary to Decimal / Hex / Octal Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Binary to Decimal / Hex / Octal Converter..."
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
    id: "hex-to-text-converter",
    title: "Hex to Text / Text to Hex Tool",
    name: "Hex to Text / Text to Hex Tool",
    category: "Encoders, Decoders & Converters",
    description: "Translates hexadecimal byte sequences into plain readable text strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Hex to Text / Text to Hex Tool",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Hex to Text / Text to Hex Tool..."
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
    id: "markdown-to-html-engine",
    title: "Markdown to HTML Live Engine",
    name: "Markdown to HTML Live Engine",
    category: "Encoders, Decoders & Converters",
    description: "Converts GitHub-flavored Markdown text into sanitized HTML code.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Markdown to HTML Live Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Markdown to HTML Live Engine..."
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
    id: "svg-to-png-converter",
    title: "SVG to PNG High-Res Rasterizer",
    name: "SVG to PNG High-Res Rasterizer",
    category: "Encoders, Decoders & Converters",
    description: "Renders vector SVG code into high-resolution PNG images at 1x, 2x, 4x.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SVG to PNG High-Res Rasterizer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SVG to PNG High-Res Rasterizer..."
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
    id: "whitespace-remover",
    title: "Extra Whitespace & Line Stripper",
    name: "Extra Whitespace & Line Stripper",
    category: "Text Processing & Manipulation",
    description: "Removes double spaces, leading/trailing whitespace, and empty lines.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Extra Whitespace & Line Stripper",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Extra Whitespace & Line Stripper..."
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
    id: "duplicate-line-filter",
    title: "Duplicate Line Filter Engine",
    name: "Duplicate Line Filter Engine",
    category: "Text Processing & Manipulation",
    description: "Strips duplicate lines or words from text lists preserving order.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Duplicate Line Filter Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Duplicate Line Filter Engine..."
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
    id: "text-to-binary",
    title: "Text to Binary Converter",
    name: "Text to Binary Converter",
    category: "Text Processing & Manipulation",
    description: "Converts text characters into 8-bit binary byte strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Text to Binary Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Text to Binary Converter..."
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
    id: "text-sorter-alphabetizer",
    title: "List Alphabetizer & Numerical Sorter",
    name: "List Alphabetizer & Numerical Sorter",
    category: "Text Processing & Manipulation",
    description: "Sorts text lines alphabetically A-Z/Z-A, numerically, or by length.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for List Alphabetizer & Numerical Sorter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for List Alphabetizer & Numerical Sorter..."
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
    id: "markdown-table-generator",
    title: "Markdown Table Builder",
    name: "Markdown Table Builder",
    category: "Text Processing & Manipulation",
    description: "Generates Markdown data tables with customizable columns and rows.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Markdown Table Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Markdown Table Builder..."
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
    id: "string-escape-tool",
    title: "String Escape / Unescape Tool",
    name: "String Escape / Unescape Tool",
    category: "Text Processing & Manipulation",
    description: "Escapes text for JavaScript, JSON, Java, C#, and SQL string literals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for String Escape / Unescape Tool",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for String Escape / Unescape Tool..."
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
    id: "matrix-determinant-tool",
    title: "Matrix Determinant & Linear Algebra Tool",
    name: "Matrix Determinant & Linear Algebra Tool",
    category: "Calculators & Mathematics",
    description: "Calculates 2x2 and 3x3 matrix determinants, addition, and multiplication.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Matrix Determinant & Linear Algebra Tool",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Matrix Determinant & Linear Algebra Tool..."
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
    id: "canonical-url-builder",
    title: "SEO Canonical & Hreflang Generator",
    name: "SEO Canonical & Hreflang Generator",
    category: "Web Security & Server Config",
    description: "Generates HTML canonical link tags and multi-language hreflang tags.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SEO Canonical & Hreflang Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SEO Canonical & Hreflang Generator..."
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
    id: "redirect-301-generator",
    title: "NGINX & Apache 301 Redirect Builder",
    name: "NGINX & Apache 301 Redirect Builder",
    category: "Web Security & Server Config",
    description: "Generates NGINX and Apache RewriteRule syntax for permanent 301 redirects.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for NGINX & Apache 301 Redirect Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for NGINX & Apache 301 Redirect Builder..."
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
    id: "csp-header-generator",
    title: "Security Policy (CSP) Generator",
    name: "Security Policy (CSP) Generator",
    category: "Web Security & Server Config",
    description: "Builds Content-Security-Policy HTTP response headers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Security Policy (CSP) Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Security Policy (CSP) Generator..."
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
    id: "bcrypt-hash-simulator",
    title: "Bcrypt Hash Cost Simulator",
    name: "Bcrypt Hash Cost Simulator",
    category: "Web Security & Server Config",
    description: "Simulates Bcrypt password hashing rounds and salt generation.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Bcrypt Hash Cost Simulator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Bcrypt Hash Cost Simulator..."
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
    id: "hmac-generator",
    title: "HMAC Signature Generator",
    name: "HMAC Signature Generator",
    category: "Web Security & Server Config",
    description: "Generates HMAC signatures using SHA-256 or SHA-512 with secret keys.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for HMAC Signature Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for HMAC Signature Generator..."
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
    id: "aes-encryption-ui",
    title: "AES-256 Client-Side Text Encrypter",
    name: "AES-256 Client-Side Text Encrypter",
    category: "Web Security & Server Config",
    description: "Encrypts and decrypts text locally using AES-GCM 256-bit cryptography.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for AES-256 Client-Side Text Encrypter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for AES-256 Client-Side Text Encrypter..."
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
    id: "csr-decoder",
    title: "CSR (Certificate Signing Request) Decoder",
    name: "CSR (Certificate Signing Request) Decoder",
    category: "Web Security & Server Config",
    description: "Parses SSL CSR PEM blocks extracting Common Name, Org, and Key Size.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSR (Certificate Signing Request) Decoder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSR (Certificate Signing Request) Decoder..."
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
    id: "dmarc-spf-builder",
    title: "DMARC & SPF Email Record Builder",
    name: "DMARC & SPF Email Record Builder",
    category: "Web Security & Server Config",
    description: "Generates DNS TXT records for DMARC policy and SPF mail validation.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for DMARC & SPF Email Record Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for DMARC & SPF Email Record Builder..."
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
    id: "password-crack-time-estimator",
    title: "Password Crack Time Estimator",
    name: "Password Crack Time Estimator",
    category: "Web Security & Server Config",
    description: "Calculates password bit entropy and brute-force crack time estimates.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Password Crack Time Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Password Crack Time Estimator..."
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
    id: "css-flexbox-playground",
    title: "CSS Flexbox Layout Playground",
    name: "CSS Flexbox Layout Playground",
    category: "Developer UI & Design Playgrounds",
    description: "Visual interactive sandbox generating CSS flexbox layout rules.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSS Flexbox Layout Playground",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSS Flexbox Layout Playground..."
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
    id: "css-grid-generator",
    title: "CSS Grid Generator",
    name: "CSS Grid Generator",
    category: "Developer UI & Design Playgrounds",
    description: "Generates CSS Grid template columns, rows, gaps, and area codes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSS Grid Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSS Grid Generator..."
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
    id: "box-shadow-generator",
    title: "CSS Box Shadow & Glassmorphism Builder",
    name: "CSS Box Shadow & Glassmorphism Builder",
    category: "Developer UI & Design Playgrounds",
    description: "Generates CSS `box-shadow` and glassmorphism backdrop-filter codes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSS Box Shadow & Glassmorphism Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSS Box Shadow & Glassmorphism Builder..."
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
    id: "gradient-generator",
    title: "CSS Linear & Radial Gradient Engine",
    name: "CSS Linear & Radial Gradient Engine",
    category: "Developer UI & Design Playgrounds",
    description: "Generates CSS linear and radial background gradient codes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSS Linear & Radial Gradient Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSS Linear & Radial Gradient Engine..."
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
    id: "border-radius-generator",
    title: "CSS Border Radius Blob Generator",
    name: "CSS Border Radius Blob Generator",
    category: "Developer UI & Design Playgrounds",
    description: "Generates custom CSS border-radius and organic blob shapes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CSS Border Radius Blob Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CSS Border Radius Blob Generator..."
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
    id: "px-to-rem-converter",
    title: "Pixels to REM / EM / VW Converter",
    name: "Pixels to REM / EM / VW Converter",
    category: "Developer UI & Design Playgrounds",
    description: "Converts pixel values to CSS `rem`, `em`, and `vw` units.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Pixels to REM / EM / VW Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Pixels to REM / EM / VW Converter..."
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
    id: "palette-from-image",
    title: "Image Palette Extractor",
    name: "Image Palette Extractor",
    category: "Developer UI & Design Playgrounds",
    description: "Extracts dominant hex color palettes from photos using Canvas.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Image Palette Extractor",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Image Palette Extractor..."
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
    id: "aspect-ratio-calc",
    title: "Aspect Ratio Calculator",
    name: "Aspect Ratio Calculator",
    category: "Developer UI & Design Playgrounds",
    description: "Calculates missing width/height dimensions for 16:9, 4:3, 1:1, 21:9.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Aspect Ratio Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Aspect Ratio Calculator..."
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
    id: "chmod-calculator",
    title: "Linux Chmod Permissions Calculator",
    name: "Linux Chmod Permissions Calculator",
    category: "Developer UI & Design Playgrounds",
    description: "Calculates octal numerical permissions (755, 644) and symbolic notation.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Linux Chmod Permissions Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Linux Chmod Permissions Calculator..."
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
    id: "water-intake-calculator",
    title: "Daily Water Intake Calculator",
    name: "Daily Water Intake Calculator",
    category: "Health, Fitness & Nutrition",
    description: "Calculates daily fluid requirements in liters and cups based on body weight.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Daily Water Intake Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Daily Water Intake Calculator..."
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
    id: "calorie-tdee-calculator",
    title: "TDEE & BMR Calorie Engine",
    name: "TDEE & BMR Calorie Engine",
    category: "Health, Fitness & Nutrition",
    description: "Calculates Basal Metabolic Rate and Total Daily Energy Expenditure.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for TDEE & BMR Calorie Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for TDEE & BMR Calorie Engine..."
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
    id: "macro-calculator",
    title: "Macronutrient Ratio Calculator",
    name: "Macronutrient Ratio Calculator",
    category: "Health, Fitness & Nutrition",
    description: "Calculates target daily grams of Protein, Carbs, and Fats.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Macronutrient Ratio Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Macronutrient Ratio Calculator..."
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
    id: "sleep-cycle-calculator",
    title: "Sleep Cycle & Bedtime Calculator",
    name: "Sleep Cycle & Bedtime Calculator",
    category: "Health, Fitness & Nutrition",
    description: "Calculates optimal bedtime schedules based on 90-minute REM sleep cycles.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Sleep Cycle & Bedtime Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Sleep Cycle & Bedtime Calculator..."
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
    id: "ideal-weight-calculator",
    title: "Ideal Body Weight (IBW) Calculator",
    name: "Ideal Body Weight (IBW) Calculator",
    category: "Health, Fitness & Nutrition",
    description: "Calculates healthy weight ranges using Devine, Robinson, and Miller formulas.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Ideal Body Weight (IBW) Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Ideal Body Weight (IBW) Calculator..."
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
    id: "step-to-distance-calc",
    title: "Steps to Distance & Energy Converter",
    name: "Steps to Distance & Energy Converter",
    category: "Health, Fitness & Nutrition",
    description: "Converts daily step count into miles, km, and estimated calories burned.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Steps to Distance & Energy Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Steps to Distance & Energy Converter..."
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
    id: "bac-calculator",
    title: "Blood Alcohol Concentration (BAC) Engine",
    name: "Blood Alcohol Concentration (BAC) Engine",
    category: "Health, Fitness & Nutrition",
    description: "Estimates Blood Alcohol Content percentage over time using Widmark formula.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Blood Alcohol Concentration (BAC) Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Blood Alcohol Concentration (BAC) Engine..."
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
    id: "unit-price-comparator",
    title: "Grocery Unit Price Comparator",
    name: "Grocery Unit Price Comparator",
    category: "Health, Fitness & Nutrition",
    description: "Compares cost per ounce/gram between competing grocery deals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Grocery Unit Price Comparator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Grocery Unit Price Comparator..."
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
    id: "countdown-timer-builder",
    title: "Event Countdown Timer",
    name: "Event Countdown Timer",
    category: "Health, Fitness & Nutrition",
    description: "Calculates remaining days, hours, and minutes until target dates.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Event Countdown Timer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Event Countdown Timer..."
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
    id: "stopwatch-lap-timer",
    title: "Digital Stopwatch & Split Timer",
    name: "Digital Stopwatch & Split Timer",
    category: "Health, Fitness & Nutrition",
    description: "Precision digital stopwatch with lap split time logging.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Digital Stopwatch & Split Timer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Digital Stopwatch & Split Timer..."
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
    id: "amazon-fee-calculator",
    title: "Amazon FBA & Referral Fee Calculator",
    name: "Amazon FBA & Referral Fee Calculator",
    category: "E-Commerce & Business Operations",
    description: "Calculates Amazon referral fees, FBA fulfillment fees, and net margin.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Amazon FBA & Referral Fee Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Amazon FBA & Referral Fee Calculator..."
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
    id: "profit-margin-calculator",
    title: "Gross Profit Margin & Markup Engine",
    name: "Gross Profit Margin & Markup Engine",
    category: "E-Commerce & Business Operations",
    description: "Calculates Gross Profit Margin %, Markup %, and Dollar Profit.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Gross Profit Margin & Markup Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Gross Profit Margin & Markup Engine..."
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
    id: "etsy-fee-calculator",
    title: "Etsy Seller Fee & Profit Calculator",
    name: "Etsy Seller Fee & Profit Calculator",
    category: "E-Commerce & Business Operations",
    description: "Calculates Etsy listing fees, transaction fees, and payment processing.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Etsy Seller Fee & Profit Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Etsy Seller Fee & Profit Calculator..."
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
    id: "shopify-pricing-calc",
    title: "Shopify Break-Even Pricing Engine",
    name: "Shopify Break-Even Pricing Engine",
    category: "E-Commerce & Business Operations",
    description: "Calculates break-even price and target retail prices for e-commerce.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Shopify Break-Even Pricing Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Shopify Break-Even Pricing Engine..."
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
    id: "bar-code-generator",
    title: "Vector Barcode Generator",
    name: "Vector Barcode Generator",
    category: "E-Commerce & Business Operations",
    description: "Renders Code 128, EAN-13, and UPC-A barcodes on HTML5 canvas.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Vector Barcode Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Vector Barcode Generator..."
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
    id: "sku-generator",
    title: "Product SKU Batch Builder",
    name: "Product SKU Batch Builder",
    category: "E-Commerce & Business Operations",
    description: "Generates structured SKU identifiers by category, size, and color.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Product SKU Batch Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Product SKU Batch Builder..."
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
    id: "shipping-weight-calc",
    title: "Dimensional Weight Shipping Engine",
    name: "Dimensional Weight Shipping Engine",
    category: "E-Commerce & Business Operations",
    description: "Calculates Volumetric Dimensional Shipping Weight (L x W x H / 139).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Dimensional Weight Shipping Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Dimensional Weight Shipping Engine..."
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
    id: "sales-tax-by-state",
    title: "US State Sales Tax & VAT Calculator",
    name: "US State Sales Tax & VAT Calculator",
    category: "E-Commerce & Business Operations",
    description: "Calculates US state sales tax and international VAT totals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for US State Sales Tax & VAT Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for US State Sales Tax & VAT Calculator..."
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
    id: "inventory-reorder-calc",
    title: "Economic Order Quantity (EOQ) Engine",
    name: "Economic Order Quantity (EOQ) Engine",
    category: "E-Commerce & Business Operations",
    description: "Calculates optimal inventory reorder points and order quantities.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Economic Order Quantity (EOQ) Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Economic Order Quantity (EOQ) Engine..."
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
    id: "price-discount-matrix",
    title: "Tiered Wholesale Pricing Matrix",
    name: "Tiered Wholesale Pricing Matrix",
    category: "E-Commerce & Business Operations",
    description: "Calculates bulk quantity tier discount percentages for quotes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Tiered Wholesale Pricing Matrix",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Tiered Wholesale Pricing Matrix..."
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
    id: "invoice-generator-ui",
    title: "Client-Side Invoice Generator",
    name: "Client-Side Invoice Generator",
    category: "Business, HR & Freelancing",
    description: "Generates clean printable business invoices with line items and tax.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Client-Side Invoice Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Client-Side Invoice Generator..."
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
    id: "payroll-tax-calc",
    title: "Employee Payroll Tax Calculator",
    name: "Employee Payroll Tax Calculator",
    category: "Business, HR & Freelancing",
    description: "Estimates gross paycheck, federal/state withholdings, and net pay.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Employee Payroll Tax Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Employee Payroll Tax Calculator..."
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
    id: "meeting-cost-calculator",
    title: "Meeting Cost Real-Time Ticker",
    name: "Meeting Cost Real-Time Ticker",
    category: "Business, HR & Freelancing",
    description: "Calculates real dollar cost of meetings based on attendee count and rates.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Meeting Cost Real-Time Ticker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Meeting Cost Real-Time Ticker..."
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
    id: "working-days-calculator",
    title: "Business Working Days Calculator",
    name: "Business Working Days Calculator",
    category: "Business, HR & Freelancing",
    description: "Calculates net working days excluding weekends and custom holidays.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Business Working Days Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Business Working Days Calculator..."
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
    id: "burn-rate-calculator",
    title: "Startup Runway & Burn Rate Engine",
    name: "Startup Runway & Burn Rate Engine",
    category: "Business, HR & Freelancing",
    description: "Calculates monthly burn rate and cash runway months.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Startup Runway & Burn Rate Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Startup Runway & Burn Rate Engine..."
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
    id: "job-offer-comparator",
    title: "Job Offer Compensation Comparator",
    name: "Job Offer Compensation Comparator",
    category: "Business, HR & Freelancing",
    description: "Compares total compensation packages between competing job offers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Job Offer Compensation Comparator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Job Offer Compensation Comparator..."
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
    id: "overtime-pay-calc",
    title: "Overtime Pay Wage Engine",
    name: "Overtime Pay Wage Engine",
    category: "Business, HR & Freelancing",
    description: "Calculates weekly pay with regular and 1.5x/2.0x overtime hours.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Overtime Pay Wage Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Overtime Pay Wage Engine..."
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
    id: "break-even-calculator",
    title: "Business Break-Even Point Engine",
    name: "Business Break-Even Point Engine",
    category: "Business, HR & Freelancing",
    description: "Calculates unit sales volume needed to cover fixed and variable costs.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Business Break-Even Point Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Business Break-Even Point Engine..."
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
    id: "consulting-proposal-calc",
    title: "Consulting Project Scope Estimator",
    name: "Consulting Project Scope Estimator",
    category: "Business, HR & Freelancing",
    description: "Calculates project proposal quotes based on hours and risk buffer.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Consulting Project Scope Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Consulting Project Scope Estimator..."
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
    id: "nps-score-calculator",
    title: "Net Promoter Score (NPS) Calculator",
    name: "Net Promoter Score (NPS) Calculator",
    category: "Business, HR & Freelancing",
    description: "Calculates NPS score (-100 to +100) from customer survey feedback.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Net Promoter Score (NPS) Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Net Promoter Score (NPS) Calculator..."
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
    id: "crc32-checksum-calc",
    title: "CRC32 Checksum Calculator",
    name: "CRC32 Checksum Calculator",
    category: "Cryptography & Cyber Security",
    description: "Calculates CRC32 hexadecimal checksums for data integrity verification.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for CRC32 Checksum Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for CRC32 Checksum Calculator..."
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
    id: "htpasswd-generator",
    title: "Apache .htpasswd Hash Builder",
    name: "Apache .htpasswd Hash Builder",
    category: "Cryptography & Cyber Security",
    description: "Generates Apache Basic Auth user credentials for `.htpasswd` files.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Apache .htpasswd Hash Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Apache .htpasswd Hash Builder..."
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
    id: "morse-binary-cipher",
    title: "ROT13 & Caesar Shift Cipher Tool",
    name: "ROT13 & Caesar Shift Cipher Tool",
    category: "Cryptography & Cyber Security",
    description: "Encodes and decodes text using Caesar Shift ciphers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for ROT13 & Caesar Shift Cipher Tool",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for ROT13 & Caesar Shift Cipher Tool..."
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
    id: "ssl-chain-inspector",
    title: "SSL Certificate Chain Inspector",
    name: "SSL Certificate Chain Inspector",
    category: "Cryptography & Cyber Security",
    description: "Inspects intermediate and root SSL certificate chain validity.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SSL Certificate Chain Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SSL Certificate Chain Inspector..."
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
    id: "password-entropy-calc",
    title: "Password Entropy Calculator",
    name: "Password Entropy Calculator",
    category: "Cryptography & Cyber Security",
    description: "Calculates bit entropy and brute-force crack time estimates.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Password Entropy Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Password Entropy Calculator..."
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
    id: "sha512-hash-engine",
    title: "SHA-512 Hash Engine",
    name: "SHA-512 Hash Engine",
    category: "Cryptography & Cyber Security",
    description: "Generates SHA-512 cryptographic hashes using browser Web Crypto API.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SHA-512 Hash Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SHA-512 Hash Engine..."
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
    id: "rsa-public-key-parser",
    title: "RSA Public Key Parser",
    name: "RSA Public Key Parser",
    category: "Cryptography & Cyber Security",
    description: "Parses PEM RSA public keys extracting modulus and exponent.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for RSA Public Key Parser",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for RSA Public Key Parser..."
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
    id: "base32-encoder-decoder",
    title: "Base32 Encoder / Decoder",
    name: "Base32 Encoder / Decoder",
    category: "Cryptography & Cyber Security",
    description: "Encodes and decodes RFC 4648 Base32 strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Base32 Encoder / Decoder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Base32 Encoder / Decoder..."
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
    id: "seed-phrase-validator",
    title: "Seed Phrase Validator",
    name: "Seed Phrase Validator",
    category: "Cryptography & Cyber Security",
    description: "Validates BIP-39 12/24 word mnemonic seed phrases locally.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Seed Phrase Validator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Seed Phrase Validator..."
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
    id: "wireguard-keypair-gen",
    title: "WireGuard Keypair Generator",
    name: "WireGuard Keypair Generator",
    category: "Cryptography & Cyber Security",
    description: "Generates Curve25519 WireGuard private and public keypairs.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for WireGuard Keypair Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for WireGuard Keypair Generator..."
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
    id: "periodic-table-explorer",
    title: "Interactive Periodic Table Lookup",
    name: "Interactive Periodic Table Lookup",
    category: "Education, Science & Physics",
    description: "Displays atomic number, mass, symbol, and electron config for elements.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Interactive Periodic Table Lookup",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Interactive Periodic Table Lookup..."
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
    id: "resistor-color-code",
    title: "Resistor Color Code Band Calculator",
    name: "Resistor Color Code Band Calculator",
    category: "Education, Science & Physics",
    description: "Calculates resistor resistance (Ohms Ω) from 4-band and 5-band colors.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Resistor Color Code Band Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Resistor Color Code Band Calculator..."
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
    id: "ohms-law-calculator",
    title: "Ohm's Law Electrical Engine",
    name: "Ohm's Law Electrical Engine",
    category: "Education, Science & Physics",
    description: "Calculates Voltage (V), Current (I), Resistance (R), and Power (W).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Ohm's Law Electrical Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Ohm's Law Electrical Engine..."
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
    id: "physics-kinematics-calc",
    title: "Physics Kinematics Solver",
    name: "Physics Kinematics Solver",
    category: "Education, Science & Physics",
    description: "Solves motion equations ($v = u + at$, $s = ut + 0.5at^2$).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Physics Kinematics Solver",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Physics Kinematics Solver..."
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
    id: "chemical-equation-balancer",
    title: "Chemical Molar Mass Calculator",
    name: "Chemical Molar Mass Calculator",
    category: "Education, Science & Physics",
    description: "Calculates molecular weight and molar mass (g/mol) for chemical formulas.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Chemical Molar Mass Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Chemical Molar Mass Calculator..."
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
    id: "quadratic-equation-solver",
    title: "Quadratic Equation Root Solver",
    name: "Quadratic Equation Root Solver",
    category: "Education, Science & Physics",
    description: "Solves quadratic equation roots ($ax^2 + bx + c = 0$).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Quadratic Equation Root Solver",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Quadratic Equation Root Solver..."
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
    id: "significant-figures-calc",
    title: "Significant Figures Calculator",
    name: "Significant Figures Calculator",
    category: "Education, Science & Physics",
    description: "Counts significant figures in numbers and rounds calculations.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Significant Figures Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Significant Figures Calculator..."
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
    id: "unit-converter-pro",
    title: "Unit Pressure & Energy Converter",
    name: "Unit Pressure & Energy Converter",
    category: "Education, Science & Physics",
    description: "Converts units of Pressure (PSI, Bar), Energy (Joules, BTU), and Power.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Unit Pressure & Energy Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Unit Pressure & Energy Converter..."
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
    id: "dna-sequence-complement",
    title: "DNA Sequence Complement Generator",
    name: "DNA Sequence Complement Generator",
    category: "Education, Science & Physics",
    description: "Generates complementary DNA and transcribed RNA sequences.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for DNA Sequence Complement Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for DNA Sequence Complement Generator..."
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
    id: "vector-dot-product-engine",
    title: "Vector Addition & Dot Product Engine",
    name: "Vector Addition & Dot Product Engine",
    category: "Education, Science & Physics",
    description: "Calculates 2D/3D vector addition, magnitude, and dot product.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Vector Addition & Dot Product Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Vector Addition & Dot Product Engine..."
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
    id: "rent-vs-buy-calculator",
    title: "Rent vs. Buy Home Comparison Engine",
    name: "Rent vs. Buy Home Comparison Engine",
    category: "Real Estate, Construction & Home",
    description: "Compares 10-year total net costs of renting vs purchasing real estate.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Rent vs. Buy Home Comparison Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Rent vs. Buy Home Comparison Engine..."
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
    id: "car-loan-calculator",
    title: "Auto Loan Payment Calculator",
    name: "Auto Loan Payment Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates monthly car payments, total interest, and amortization.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Auto Loan Payment Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Auto Loan Payment Calculator..."
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
    id: "paint-coverage-calculator",
    title: "Room Paint Coverage Calculator",
    name: "Room Paint Coverage Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates total gallons/liters of wall paint needed for room dimensions.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Room Paint Coverage Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Room Paint Coverage Calculator..."
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
    id: "tile-flooring-calculator",
    title: "Tile & Grout Volume Calculator",
    name: "Tile & Grout Volume Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates square footage and tile box counts including 10% waste.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Tile & Grout Volume Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Tile & Grout Volume Calculator..."
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
    id: "solar-panel-payback",
    title: "Solar Panel Payback Engine",
    name: "Solar Panel Payback Engine",
    category: "Real Estate, Construction & Home",
    description: "Calculates solar installation ROI payback period in years.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Solar Panel Payback Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Solar Panel Payback Engine..."
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
    id: "appliance-energy-calc",
    title: "Appliance Electricity Cost Calculator",
    name: "Appliance Electricity Cost Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates monthly electricity cost per appliance based on Wattage.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Appliance Electricity Cost Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Appliance Electricity Cost Calculator..."
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
    id: "property-tax-calculator",
    title: "Property Tax Assessment Calculator",
    name: "Property Tax Assessment Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates annual property taxes from millage rate and assessed value.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Property Tax Assessment Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Property Tax Assessment Calculator..."
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
    id: "car-depreciation-calc",
    title: "Vehicle Depreciation Engine",
    name: "Vehicle Depreciation Engine",
    category: "Real Estate, Construction & Home",
    description: "Projects 5-year vehicle market resale value depreciation curve.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Vehicle Depreciation Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Vehicle Depreciation Engine..."
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
    id: "concrete-volume-calc",
    title: "Concrete Slab Volume Calculator",
    name: "Concrete Slab Volume Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates cubic yards and 80lb bags of concrete required for slabs.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Concrete Slab Volume Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Concrete Slab Volume Calculator..."
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
    id: "mulch-landscaping-calc",
    title: "Mulch & Soil Volume Calculator",
    name: "Mulch & Soil Volume Calculator",
    category: "Real Estate, Construction & Home",
    description: "Calculates cubic yards of garden mulch needed for target depth.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Mulch & Soil Volume Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Mulch & Soil Volume Calculator..."
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
    id: "flight-duration-calc",
    title: "Flight Duration & Distance Calculator",
    name: "Flight Duration & Distance Calculator",
    category: "Travel, Time & Mapping",
    description: "Calculates great-circle flight distance and travel hours between airports.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Flight Duration & Distance Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Flight Duration & Distance Calculator..."
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
    id: "jet-lag-advisor",
    title: "Jet Lag Recovery Schedule Calculator",
    name: "Jet Lag Recovery Schedule Calculator",
    category: "Travel, Time & Mapping",
    description: "Calculates recommended sleep adjustments across multiple timezones.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Jet Lag Recovery Schedule Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Jet Lag Recovery Schedule Calculator..."
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
    id: "travel-budget-planner",
    title: "Daily Travel Budget Engine",
    name: "Daily Travel Budget Engine",
    category: "Travel, Time & Mapping",
    description: "Calculates daily and total travel budget splits for trip planning.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Daily Travel Budget Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Daily Travel Budget Engine..."
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
    id: "timezone-converter-pro",
    title: "World Clock Time Zone Matrix",
    name: "World Clock Time Zone Matrix",
    category: "Travel, Time & Mapping",
    description: "Converts local meeting times across UTC, EST, PST, GMT, IST, and JST.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for World Clock Time Zone Matrix",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for World Clock Time Zone Matrix..."
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
    id: "packing-list-generator",
    title: "Packing List Builder",
    name: "Packing List Builder",
    category: "Travel, Time & Mapping",
    description: "Generates customized travel packing lists based on destination weather.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Packing List Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Packing List Builder..."
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
    id: "driving-cost-calculator",
    title: "Driving Distance & Toll Estimator",
    name: "Driving Distance & Toll Estimator",
    category: "Travel, Time & Mapping",
    description: "Calculates gas costs for road trips based on distance, MPG, and gas price.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Driving Distance & Toll Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Driving Distance & Toll Estimator..."
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
    id: "sun-angle-calculator",
    title: "Sunrise, Sunset & Golden Hour Engine",
    name: "Sunrise, Sunset & Golden Hour Engine",
    category: "Travel, Time & Mapping",
    description: "Calculates local sunrise, sunset times, and golden hour windows.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Sunrise, Sunset & Golden Hour Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Sunrise, Sunset & Golden Hour Engine..."
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
    id: "nautical-distance-calc",
    title: "Nautical Miles Distance Converter",
    name: "Nautical Miles Distance Converter",
    category: "Travel, Time & Mapping",
    description: "Converts between Nautical Miles (NM), Statute Miles, and Kilometers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Nautical Miles Distance Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Nautical Miles Distance Converter..."
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
    id: "coordinate-converter",
    title: "GPS Coordinate Converter (DD / DMS)",
    name: "GPS Coordinate Converter (DD / DMS)",
    category: "Travel, Time & Mapping",
    description: "Converts GPS coordinates between Decimal Degrees and Deg/Min/Sec.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for GPS Coordinate Converter (DD / DMS)",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for GPS Coordinate Converter (DD / DMS)..."
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
    id: "time-duration-calc",
    title: "Time Duration Calculator",
    name: "Time Duration Calculator",
    category: "Travel, Time & Mapping",
    description: "Calculates total hours and minutes between two time entries.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Time Duration Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Time Duration Calculator..."
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
    id: "dpi-sensitivity-converter",
    title: "Mouse DPI & Sensitivity Converter",
    name: "Mouse DPI & Sensitivity Converter",
    category: "Gaming, Media & Streaming",
    description: "Converts eDPI mouse sensitivity between Valorant, CS2, and Apex.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Mouse DPI & Sensitivity Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Mouse DPI & Sensitivity Converter..."
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
    id: "twitch-bitrate-calc",
    title: "Twitch/OBS Streaming Bitrate Engine",
    name: "Twitch/OBS Streaming Bitrate Engine",
    category: "Gaming, Media & Streaming",
    description: "Calculates optimal OBS bitrate settings for 720p/1080p 60fps broadcasts.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Twitch/OBS Streaming Bitrate Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Twitch/OBS Streaming Bitrate Engine..."
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
    id: "dice-roller-pro",
    title: "RPG Dice Roller Simulator",
    name: "RPG Dice Roller Simulator",
    category: "Gaming, Media & Streaming",
    description: "Simulates d4, d6, d8, d10, d12, d20, and d100 dice rolls with modifiers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for RPG Dice Roller Simulator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for RPG Dice Roller Simulator..."
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
    id: "poker-odds-calculator",
    title: "Poker Hand Equity Calculator",
    name: "Poker Hand Equity Calculator",
    category: "Gaming, Media & Streaming",
    description: "Calculates pre-flop and flop winning probabilities in Texas Hold'em.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Poker Hand Equity Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Poker Hand Equity Calculator..."
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
    id: "crosshair-generator",
    title: "FPS Game Crosshair Configurator",
    name: "FPS Game Crosshair Configurator",
    category: "Gaming, Media & Streaming",
    description: "Renders custom FPS crosshairs and generates export config strings.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for FPS Game Crosshair Configurator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for FPS Game Crosshair Configurator..."
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
    id: "chess-pgn-viewer",
    title: "Chess PGN Notation Viewer",
    name: "Chess PGN Notation Viewer",
    category: "Gaming, Media & Streaming",
    description: "Parses Portable Game Notation (.PGN) chess games into move lists.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Chess PGN Notation Viewer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Chess PGN Notation Viewer..."
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
    id: "reaction-time-tester",
    title: "Visual Reaction Time Tester",
    name: "Visual Reaction Time Tester",
    category: "Gaming, Media & Streaming",
    description: "Measures visual response time in milliseconds upon color change.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Visual Reaction Time Tester",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Visual Reaction Time Tester..."
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
    id: "cps-click-tester",
    title: "Clicks Per Second (CPS) Test",
    name: "Clicks Per Second (CPS) Test",
    category: "Gaming, Media & Streaming",
    description: "Measures mouse clicking speed over 1, 5, or 10-second test intervals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Clicks Per Second (CPS) Test",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Clicks Per Second (CPS) Test..."
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
    id: "typing-speed-tester",
    title: "WPM Typing Speed Test",
    name: "WPM Typing Speed Test",
    category: "Gaming, Media & Streaming",
    description: "Measures typing speed in Words Per Minute (WPM) and accuracy.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for WPM Typing Speed Test",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for WPM Typing Speed Test..."
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
    id: "video-frame-rate-calc",
    title: "Video Timecode & Frame Rate Engine",
    name: "Video Timecode & Frame Rate Engine",
    category: "Gaming, Media & Streaming",
    description: "Calculates total frames and SMPTE timecodes (24fps, 30fps, 60fps).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Video Timecode & Frame Rate Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Video Timecode & Frame Rate Engine..."
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
    id: "decision-matrix-builder",
    title: "Weighted Decision Matrix Builder",
    name: "Weighted Decision Matrix Builder",
    category: "Personal Organization & Strategy",
    description: "Ranks multiple options objectively using weighted custom criteria.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Weighted Decision Matrix Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Weighted Decision Matrix Builder..."
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
    id: "habits-streak-tracker",
    title: "30-Day Habit Grid Builder",
    name: "30-Day Habit Grid Builder",
    category: "Personal Organization & Strategy",
    description: "Generates printable 30-day habit streak matrices for personal goals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for 30-Day Habit Grid Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for 30-Day Habit Grid Builder..."
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
    id: "reading-time-estimator-tool",
    title: "Reading Time Estimator",
    name: "Reading Time Estimator",
    category: "Personal Organization & Strategy",
    description: "Calculates estimated reading and speaking duration at 200 WPM.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Reading Time Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Reading Time Estimator..."
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
    id: "markdown-mindmap-tree",
    title: "Markdown Mindmap Tree Builder",
    name: "Markdown Mindmap Tree Builder",
    category: "Personal Organization & Strategy",
    description: "Converts indented list text into structured visual node diagrams.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Markdown Mindmap Tree Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Markdown Mindmap Tree Builder..."
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
    id: "to-do-matrix-eisenhower",
    title: "Eisenhower Matrix Task Sorter",
    name: "Eisenhower Matrix Task Sorter",
    category: "Personal Organization & Strategy",
    description: "Categorizes tasks into Urgent/Important 4-quadrant decision boxes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Eisenhower Matrix Task Sorter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Eisenhower Matrix Task Sorter..."
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
    id: "gift-budget-planner",
    title: "Holiday Gift Budget Allocator",
    name: "Holiday Gift Budget Allocator",
    category: "Personal Organization & Strategy",
    description: "Allocates gift spending caps per recipient and tracks budget totals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Holiday Gift Budget Allocator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Holiday Gift Budget Allocator..."
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
    id: "event-guest-list-calc",
    title: "Event Party Catering Estimator",
    name: "Event Party Catering Estimator",
    category: "Personal Organization & Strategy",
    description: "Estimates food portions, beverage counts, and seating requirements.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Event Party Catering Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Event Party Catering Estimator..."
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
    id: "bill-splitter-advanced",
    title: "Rent Splitter by Square Footage",
    name: "Rent Splitter by Square Footage",
    category: "Personal Organization & Strategy",
    description: "Splits monthly rent and utility expenses proportionally by room size.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Rent Splitter by Square Footage",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Rent Splitter by Square Footage..."
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
    id: "recipe-scale-factor-calc",
    title: "Recipe Scale Factor Calculator",
    name: "Recipe Scale Factor Calculator",
    category: "Personal Organization & Strategy",
    description: "Scales ingredient quantities up or down for target serving sizes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Recipe Scale Factor Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Recipe Scale Factor Calculator..."
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
    id: "daily-journal-prompts",
    title: "Daily Gratitude Journal Template",
    name: "Daily Gratitude Journal Template",
    category: "Personal Organization & Strategy",
    description: "Generates daily self-reflection questions and gratitude prompts.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Daily Gratitude Journal Template",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Daily Gratitude Journal Template..."
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
    id: "youtube-tag-extractor",
    title: "YouTube Tag Extractor",
    name: "YouTube Tag Extractor",
    category: "Social Media Infrastructure",
    description: "Generates SEO tags, hashtags, and keywords for YouTube video titles.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for YouTube Tag Extractor",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for YouTube Tag Extractor..."
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
    id: "video-bitrate-file-estimator",
    title: "Video Bitrate & File Size Estimator",
    name: "Video Bitrate & File Size Estimator",
    category: "Social Media Infrastructure",
    description: "Calculates estimated video MB size based on bitrate and duration.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Video Bitrate & File Size Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Video Bitrate & File Size Estimator..."
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
    id: "tweet-character-counter",
    title: "Tweet Character Matrix Tester",
    name: "Tweet Character Matrix Tester",
    category: "Social Media Infrastructure",
    description: "Checks 280-character Twitter/X limits and splits long text into threads.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Tweet Character Matrix Tester",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Tweet Character Matrix Tester..."
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
    id: "youtube-thumbnail-previewer",
    title: "YouTube Thumbnail Previewer",
    name: "YouTube Thumbnail Previewer",
    category: "Social Media Infrastructure",
    description: "Previews video thumbnail and title mockups on Youtube feeds.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for YouTube Thumbnail Previewer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for YouTube Thumbnail Previewer..."
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
    id: "podcast-rss-builder",
    title: "Podcast RSS XML Feed Builder",
    name: "Podcast RSS XML Feed Builder",
    category: "Social Media Infrastructure",
    description: "Generates Apple Podcasts & Spotify compliant RSS XML feed code.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Podcast RSS XML Feed Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Podcast RSS XML Feed Builder..."
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
    id: "subtitle-vtt-converter",
    title: "SRT to WebVTT Subtitle Converter",
    name: "SRT to WebVTT Subtitle Converter",
    category: "Social Media Infrastructure",
    description: "Transcodes SubRip (.SRT) subtitle files into WebVTT (.VTT) format.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for SRT to WebVTT Subtitle Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for SRT to WebVTT Subtitle Converter..."
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
    id: "social-image-canvas-resizer",
    title: "Social Media Image Canvas Resizer",
    name: "Social Media Image Canvas Resizer",
    category: "Social Media Infrastructure",
    description: "Resizes images for Instagram, Twitter, LinkedIn, and Facebook banners.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Social Media Image Canvas Resizer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Social Media Image Canvas Resizer..."
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
    id: "twitch-panel-layout-gen",
    title: "Twitch Panel Layout Generator",
    name: "Twitch Panel Layout Generator",
    category: "Social Media Infrastructure",
    description: "Generates graphic panel dimensions and HTML layout links for Twitch.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Twitch Panel Layout Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Twitch Panel Layout Generator..."
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
    id: "discord-embed-creator",
    title: "Discord Embed Creator",
    name: "Discord Embed Creator",
    category: "Social Media Infrastructure",
    description: "Builds Discord webhook embed JSON objects with fields and colors.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Discord Embed Creator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Discord Embed Creator..."
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
    id: "tiktok-video-duration-estimator",
    title: "TikTok Video Duration Estimator",
    name: "TikTok Video Duration Estimator",
    category: "Social Media Infrastructure",
    description: "Estimates speech reading duration for 15s, 60s, and 3m TikTok clips.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for TikTok Video Duration Estimator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for TikTok Video Duration Estimator..."
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
    id: "meta-viewport-builder",
    title: "Web App Manifest Builder",
    name: "Web App Manifest Builder",
    category: "SEO & Webmaster Suite",
    description: "Generates HTML meta viewport tags and Web App Manifest JSON files.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Web App Manifest Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Web App Manifest Builder..."
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
    id: "anchor-text-analyzer",
    title: "Anchor Text Ratio Analyzer",
    name: "Anchor Text Ratio Analyzer",
    category: "SEO & Webmaster Suite",
    description: "Analyzes backlink anchor text distributions for exact match ratios.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Anchor Text Ratio Analyzer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Anchor Text Ratio Analyzer..."
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
    id: "dns-record-generator",
    title: "DNS Record Generator (A/MX/TXT)",
    name: "DNS Record Generator (A/MX/TXT)",
    category: "SEO & Webmaster Suite",
    description: "Generates DNS zone file records for domain hosting.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for DNS Record Generator (A/MX/TXT)",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for DNS Record Generator (A/MX/TXT)..."
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
    id: "sitemap-index-generator",
    title: "XML Sitemap Index Generator",
    name: "XML Sitemap Index Generator",
    category: "SEO & Webmaster Suite",
    description: "Generates `<sitemapindex>` XML documents linking sub-sitemaps.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for XML Sitemap Index Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for XML Sitemap Index Generator..."
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
    id: "word-density-counter",
    title: "TF-IDF Keyword Density Analyzer",
    name: "TF-IDF Keyword Density Analyzer",
    category: "SEO & Webmaster Suite",
    description: "Calculates 1-word, 2-word, and 3-word n-gram keyword densities.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for TF-IDF Keyword Density Analyzer",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for TF-IDF Keyword Density Analyzer..."
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
    id: "broken-link-checker-ui",
    title: "Broken Link Checker UI",
    name: "Broken Link Checker UI",
    category: "SEO & Webmaster Suite",
    description: "Validates URL structures, query strings, and path protocols in HTML.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Broken Link Checker UI",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Broken Link Checker UI..."
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
    id: "mobile-friendly-checker",
    title: "Responsive Viewport Breakpoint Tester",
    name: "Responsive Viewport Breakpoint Tester",
    category: "SEO & Webmaster Suite",
    description: "Tests layout visibility across 320px, 768px, 1024px, and 1440px.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Responsive Viewport Breakpoint Tester",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Responsive Viewport Breakpoint Tester..."
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
    id: "http-redirect-chain-inspector",
    title: "HTTP Redirect Chain Inspector",
    name: "HTTP Redirect Chain Inspector",
    category: "SEO & Webmaster Suite",
    description: "Simulates 301/302 HTTP redirect chains and canonical loops.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for HTTP Redirect Chain Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for HTTP Redirect Chain Inspector..."
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
    id: "domain-tld-checker",
    title: "Domain TLD Checker",
    name: "Domain TLD Checker",
    category: "SEO & Webmaster Suite",
    description: "Inspects top-level domain extensions (.com, .io, .ai, .dev) specs.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Domain TLD Checker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Domain TLD Checker..."
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
    id: "curl-to-fetch-converter-tool",
    title: "cURL to JavaScript fetch() Converter",
    name: "cURL to JavaScript fetch() Converter",
    category: "Developer Build Utilities",
    description: "Converts command-line cURL commands into clean `fetch()` snippets.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for cURL to JavaScript fetch() Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for cURL to JavaScript fetch() Converter..."
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
    id: "json-to-ts-interface",
    title: "JSON to TypeScript Interface Generator",
    name: "JSON to TypeScript Interface Generator",
    category: "Developer Build Utilities",
    description: "Converts JSON sample objects into strongly typed TypeScript interfaces.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for JSON to TypeScript Interface Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for JSON to TypeScript Interface Generator..."
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
  },
  {
    id: "xml-formatter",
    title: "XML Formatter & Validator",
    name: "XML Formatter & Validator",
    category: "Developer Build Utilities",
    description: "Pretty-prints XML documents with node indentation and validates tags.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for XML Formatter & Validator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for XML Formatter & Validator..."
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
    id: "dockerfile-generator",
    title: "Dockerfile Generator",
    name: "Dockerfile Generator",
    category: "Developer Build Utilities",
    description: "Generates optimized multi-stage Dockerfiles for Node, Python, and Go.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Dockerfile Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Dockerfile Generator..."
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
    id: "git-command-cheat-sheet",
    title: "Git Command Cheat Sheet Builder",
    name: "Git Command Cheat Sheet Builder",
    category: "Developer Build Utilities",
    description: "Interactive generator for common git rebase, cherry-pick, and reset commands.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Git Command Cheat Sheet Builder",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Git Command Cheat Sheet Builder..."
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
    id: "regex-cheatsheet-ui",
    title: "Regular Expression Cheatsheet UI",
    name: "Regular Expression Cheatsheet UI",
    category: "Developer Build Utilities",
    description: "Reference guide and pattern builder for regex tokens and lookaheads.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Regular Expression Cheatsheet UI",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Regular Expression Cheatsheet UI..."
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
    id: "package-json-tree-inspector",
    title: "Package.json Dependency Tree Inspector",
    name: "Package.json Dependency Tree Inspector",
    category: "Developer Build Utilities",
    description: "Parses `package.json` files listing dependencies and devDependencies.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Package.json Dependency Tree Inspector",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Package.json Dependency Tree Inspector..."
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
    id: "markdown-badges-generator",
    title: "Markdown Badges Generator",
    name: "Markdown Badges Generator",
    category: "Developer Build Utilities",
    description: "Generates Shields.io status badges for GitHub README files.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Markdown Badges Generator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Markdown Badges Generator..."
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
    id: "fraction-calculator",
    title: "Fraction Simplifier Engine",
    name: "Fraction Simplifier Engine",
    category: "Math & Statistics",
    description: "Adds, subtracts, multiplies, and divides fractions reducing to lowest terms.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Fraction Simplifier Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Fraction Simplifier Engine..."
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
    id: "roman-numeral-converter",
    title: "Roman Numeral Converter",
    name: "Roman Numeral Converter",
    category: "Math & Statistics",
    description: "Converts integer numbers to Roman Numerals (`2026` ↔ `MMXXVI`).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Roman Numeral Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Roman Numeral Converter..."
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
    id: "binary-calculator",
    title: "Binary Arithmetic Engine",
    name: "Binary Arithmetic Engine",
    category: "Math & Statistics",
    description: "Performs binary addition, subtraction, AND, OR, XOR operations.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Binary Arithmetic Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Binary Arithmetic Engine..."
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
    id: "average-mean-calculator",
    title: "Mean, Median, Mode Engine",
    name: "Mean, Median, Mode Engine",
    category: "Math & Statistics",
    description: "Calculates Mean, Median, Mode, and Range for dataset numbers.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Mean, Median, Mode Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Mean, Median, Mode Engine..."
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
    id: "standard-deviation-calc",
    title: "Standard Deviation Calculator",
    name: "Standard Deviation Calculator",
    category: "Math & Statistics",
    description: "Calculates Sample/Population Standard Deviation, Variance, and Sum of Squares.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Standard Deviation Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Standard Deviation Calculator..."
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
    id: "random-choice-picker",
    title: "Random Name / Item Picker",
    name: "Random Name / Item Picker",
    category: "Math & Statistics",
    description: "Picks one or more random items/winners from a custom list.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Random Name / Item Picker",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Random Name / Item Picker..."
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
    id: "speed-distance-time",
    title: "Speed, Distance & Time Solver",
    name: "Speed, Distance & Time Solver",
    category: "Math & Statistics",
    description: "Calculates missing speed (mph/kph), distance (miles/km), or travel time.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Speed, Distance & Time Solver",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Speed, Distance & Time Solver..."
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
    id: "triangle-solver",
    title: "Pythagorean Right Triangle Solver",
    name: "Pythagorean Right Triangle Solver",
    category: "Math & Statistics",
    description: "Solves right triangles calculating Hypotenuse ($c = \sqrt{a^2+b^2}$), area, and perimeter.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Pythagorean Right Triangle Solver",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Pythagorean Right Triangle Solver..."
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
    id: "combination-permutation-calc",
    title: "Combination & Permutation Engine",
    name: "Combination & Permutation Engine",
    category: "Math & Statistics",
    description: "Calculates $nCr$ combinations and $nPr$ permutations.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Combination & Permutation Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Combination & Permutation Engine..."
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
    id: "logarithm-exponent-calc",
    title: "Logarithm & Exponent Calculator",
    name: "Logarithm & Exponent Calculator",
    category: "Math & Statistics",
    description: "Calculates natural log $\ln(x)$, $\log_{10}(x)$, and arbitrary base exponents.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Logarithm & Exponent Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Logarithm & Exponent Calculator..."
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
    id: "grocery-unit-price-matrix",
    title: "Unit Price Comparison Matrix",
    name: "Unit Price Comparison Matrix",
    category: "Daily Life Utilities",
    description: "Compares cost per ounce/gram between competing grocery package deals.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Unit Price Comparison Matrix",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Unit Price Comparison Matrix..."
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
    id: "time-between-dates-engine",
    title: "Time Between Dates Engine",
    name: "Time Between Dates Engine",
    category: "Daily Life Utilities",
    description: "Calculates exact days, weeks, and months between two calendar dates.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Time Between Dates Engine",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Time Between Dates Engine..."
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
    id: "fuel-consumption-converter",
    title: "Fuel Consumption Converter",
    name: "Fuel Consumption Converter",
    category: "Daily Life Utilities",
    description: "Converts fuel economy between MPG (US/UK) and L/100km.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Fuel Consumption Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Fuel Consumption Converter..."
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
    id: "age-calculator-exact",
    title: "Age Calculator (Exact Days/Hours)",
    name: "Age Calculator (Exact Days/Hours)",
    category: "Daily Life Utilities",
    description: "Calculates exact age in years, months, days, hours, and minutes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Age Calculator (Exact Days/Hours)",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Age Calculator (Exact Days/Hours)..."
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
    id: "shoe-size-converter",
    title: "Shoe Size International Converter",
    name: "Shoe Size International Converter",
    category: "Daily Life Utilities",
    description: "Converts shoe sizes across US, UK, EU, and CM measurement scales.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Shoe Size International Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Shoe Size International Converter..."
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
    id: "kitchen-measurement-converter",
    title: "Kitchen Measurement Converter",
    name: "Kitchen Measurement Converter",
    category: "Daily Life Utilities",
    description: "Converts cooking volumes (cups, tablespoons, teaspoons, ml, fl oz).",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Kitchen Measurement Converter",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Kitchen Measurement Converter..."
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
    id: "ring-size-calculator",
    title: "Ring Size Calculator",
    name: "Ring Size Calculator",
    category: "Daily Life Utilities",
    description: "Converts finger circumference in mm to US, UK, and EU ring sizes.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Ring Size Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Ring Size Calculator..."
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
    id: "tire-size-comparison",
    title: "Tire Size Comparison Calculator",
    name: "Tire Size Comparison Calculator",
    category: "Daily Life Utilities",
    description: "Compares tire diameter, sidewall height, and speedometer offset %.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Tire Size Comparison Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Tire Size Comparison Calculator..."
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
    id: "simple-interest-calculator",
    title: "Simple Interest Calculator",
    name: "Simple Interest Calculator",
    category: "Daily Life Utilities",
    description: "Calculates simple interest ($I = P \times r \times t$) and final balance.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Simple Interest Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Simple Interest Calculator..."
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
    id: "percentage-discount-calculator",
    title: "Percentage Discount Calculator",
    name: "Percentage Discount Calculator",
    category: "Daily Life Utilities",
    description: "Calculates discount savings amount and final price at retail checkout.",
    inputs: [
      {
            "id": "inputData",
            "label": "Input Parameter / Data String for Percentage Discount Calculator",
            "type": "textarea",
            "placeholder": "Enter parameters or paste target payload for Percentage Discount Calculator..."
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
