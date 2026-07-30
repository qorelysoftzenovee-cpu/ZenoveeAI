const fs = require('fs');
const path = require('path');

// ==========================================
// 50 NEW TOOLS DEFINITIONS
// ==========================================
const newToolsConfig = [
  // -----------------------------------------
  // Category: Developer & Web Tools
  // -----------------------------------------
  {
    id: "html-entity-encoder",
    title: "HTML Entity Encoder / Decoder",
    name: "HTML Entity Encoder / Decoder",
    category: "Developer & Web Tools",
    description: "Converts special characters to HTML entities (&lt;, &gt;, &amp;, &quot;) and decodes entity strings.",
    inputs: [
      { id: "text", label: "Input HTML / Code Text", type: "textarea", placeholder: '<h1>Hello "World" & "Developers"</h1>' },
      { id: "mode", label: "Action Mode", type: "dropdown", options: ["Encode to HTML Entities", "Decode HTML Entities"] }
    ]
  },
  {
    id: "js-minifier",
    title: "JavaScript Code Minifier & Formatter",
    name: "JavaScript Code Minifier & Formatter",
    category: "Developer & Web Tools",
    description: "Compresses JavaScript code by removing comments, redundant spaces, and line breaks.",
    inputs: [
      { id: "code", label: "JavaScript Source Code", type: "textarea", placeholder: "// Calculate sum\nfunction add(a, b) {\n  return a + b;\n}" }
    ]
  },
  {
    id: "css-minifier",
    title: "CSS Stylesheet Minifier & Beautifier",
    name: "CSS Stylesheet Minifier & Beautifier",
    category: "Developer & Web Tools",
    description: "Minifies CSS stylesheets for production or beautifies compressed CSS into readable format.",
    inputs: [
      { id: "cssCode", label: "CSS Source Code", type: "textarea", placeholder: "/* Header Styles */\n.header {\n  color: #4F46E5;\n  font-size: 16px;\n}" },
      { id: "mode", label: "Format Mode", type: "dropdown", options: ["Minify CSS", "Beautify CSS (2 Spaces)"] }
    ]
  },
  {
    id: "xml-formatter",
    title: "XML Code Formatter & Validator",
    name: "XML Code Formatter & Validator",
    category: "Developer & Web Tools",
    description: "Pretty-prints XML documents with customizable indent spacing and validates XML tag closure.",
    inputs: [
      { id: "xmlCode", label: "Raw XML Code", type: "textarea", placeholder: '<root><user id="1"><name>Alice</name></user></root>' }
    ]
  },
  {
    id: "json-validator",
    title: "JSON Validator & Syntax Fixer",
    name: "JSON Validator & Syntax Fixer",
    category: "Developer & Web Tools",
    description: "Validates JSON strings, locates syntax errors with line numbers, and fixes common JSON mistakes.",
    inputs: [
      { id: "jsonText", label: "JSON Code to Validate", type: "textarea", placeholder: '{\n  "name": "Zenovee",\n  "tools": 100\n}' }
    ]
  },
  {
    id: "htaccess-tester",
    title: ".htaccess Redirect & Rewrite Tester",
    name: ".htaccess Redirect & Rewrite Tester",
    category: "Developer & Web Tools",
    description: "Tests Apache .htaccess RewriteRule patterns against incoming test URLs.",
    inputs: [
      { id: "rule", label: "RewriteRule Pattern", type: "text", placeholder: "^old-page/(.*)$ https://example.com/new-page/$1 [R=301,L]" },
      { id: "testUrl", label: "Test Request URL", type: "text", placeholder: "https://example.com/old-page/article-123" }
    ]
  },
  {
    id: "curl-to-fetch",
    title: "cURL to JavaScript fetch() Converter",
    name: "cURL to JavaScript fetch() Converter",
    category: "Developer & Web Tools",
    description: "Converts command-line cURL requests into clean JavaScript fetch() or Async/Await snippets.",
    inputs: [
      { id: "curlCmd", label: "cURL Command String", type: "textarea", placeholder: 'curl -X POST https://api.example.com/data -H "Content-Type: application/json" -d \'{"key":"value"}\'' }
    ]
  },
  {
    id: "user-agent-parser",
    title: "User-Agent String Parser",
    name: "User-Agent String Parser",
    category: "Developer & Web Tools",
    description: "Parses User-Agent strings to identify Browser Name, OS Version, Engine, and Device Type.",
    inputs: [
      { id: "uaString", label: "User-Agent String (leave blank for your browser)", type: "textarea", placeholder: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36..." }
    ]
  },
  {
    id: "markdown-table-generator",
    title: "Markdown Table Builder",
    name: "Markdown Table Builder",
    category: "Developer & Web Tools",
    description: "Generates clean Markdown data tables with customizable columns, alignment, and CSV import.",
    inputs: [
      { id: "cols", label: "Columns Count", type: "text", placeholder: "3" },
      { id: "rows", label: "Rows Count", type: "text", placeholder: "3" },
      { id: "headers", label: "Header Titles (comma separated)", type: "text", placeholder: "ID, Product Name, Price" }
    ]
  },
  {
    id: "chmod-calculator",
    title: "Linux Chmod Permissions Calculator",
    name: "Linux Chmod Permissions Calculator",
    category: "Developer & Web Tools",
    description: "Calculates octal numerical permissions (755, 644) and symbolic notations (rwxr-xr-x).",
    inputs: [
      { id: "owner", label: "Owner Permissions", type: "dropdown", options: ["Read + Write + Execute (7)", "Read + Write (6)", "Read + Execute (5)", "Read Only (4)"] },
      { id: "group", label: "Group Permissions", type: "dropdown", options: ["Read + Execute (5)", "Read Only (4)", "Read + Write (6)", "No Access (0)"] },
      { id: "publicAcc", label: "Public/Others Permissions", type: "dropdown", options: ["Read + Execute (5)", "Read Only (4)", "No Access (0)", "Read + Write + Execute (7)"] }
    ]
  },

  // -----------------------------------------
  // Category: Design, Image & Color Utilities
  // -----------------------------------------
  {
    id: "color-picker-palette",
    title: "Interactive Color Picker & Palette Generator",
    name: "Interactive Color Picker & Palette Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates complementary, triadic, and monochromatic color palettes from any base Hex color.",
    inputs: [
      { id: "baseHex", label: "Base Hex Color Code", type: "text", placeholder: "#4F46E5" },
      { id: "paletteType", label: "Palette Harmony Type", type: "dropdown", options: ["Monochromatic", "Complementary", "Triadic", "Analogous"] }
    ]
  },
  {
    id: "aspect-ratio-calc",
    title: "Aspect Ratio Calculator",
    name: "Aspect Ratio Calculator",
    category: "Design, Image & Color Utilities",
    description: "Calculates missing dimensions for 16:9, 4:3, 1:1, 21:9, and custom image aspect ratios.",
    inputs: [
      { id: "ratio", label: "Aspect Ratio Preset", type: "dropdown", options: ["16:9 (Widescreen)", "4:3 (Standard)", "1:1 (Square / Instagram)", "21:9 (Ultrawide)"] },
      { id: "knownDim", label: "Known Dimension (Width or Height in px)", type: "text", placeholder: "1920" },
      { id: "dimType", label: "Known Dimension Type", type: "dropdown", options: ["Width", "Height"] }
    ]
  },
  {
    id: "px-to-rem-converter",
    title: "Pixels to REM / EM / VW Converter",
    name: "Pixels to REM / EM / VW Converter",
    category: "Design, Image & Color Utilities",
    description: "Converts pixel values to CSS rem, em, and vw units based on a configurable root font size.",
    inputs: [
      { id: "pxVal", label: "Pixel Value (px)", type: "text", placeholder: "16" },
      { id: "rootSize", label: "Root Font Size (default 16px)", type: "text", placeholder: "16" }
    ]
  },
  {
    id: "box-shadow-generator",
    title: "CSS Box Shadow & Drop Shadow Generator",
    name: "CSS Box Shadow & Drop Shadow Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates custom CSS box-shadow code with blur, spread, offset, opacity, and inset options.",
    inputs: [
      { id: "offsetX", label: "Horizontal Offset (px)", type: "text", placeholder: "0" },
      { id: "offsetY", label: "Vertical Offset (px)", type: "text", placeholder: "10" },
      { id: "blur", label: "Blur Radius (px)", type: "text", placeholder: "25" },
      { id: "spread", label: "Spread Radius (px)", type: "text", placeholder: "-5" },
      { id: "shadowColor", label: "Shadow Color Hex", type: "text", placeholder: "#000000" }
    ]
  },
  {
    id: "gradient-generator",
    title: "CSS Linear & Radial Gradient Generator",
    name: "CSS Linear & Radial Gradient Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates CSS linear and radial background gradient codes with customizable angle and color stops.",
    inputs: [
      { id: "color1", label: "First Color Hex", type: "text", placeholder: "#4F46E5" },
      { id: "color2", label: "Second Color Hex", type: "text", placeholder: "#9333EA" },
      { id: "angle", label: "Gradient Angle (Degrees)", type: "dropdown", options: ["90deg (Left to Right)", "135deg (Diagonal)", "180deg (Top to Bottom)", "45deg (Bottom-Left to Top-Right)"] }
    ]
  },
  {
    id: "image-resizer",
    title: "Quick Client-Side Image Resizer & Scaler",
    name: "Quick Client-Side Image Resizer & Scaler",
    category: "Design, Image & Color Utilities",
    description: "Resizes images by specific pixel dimensions or percentage scale directly in browser memory.",
    inputs: [
      { id: "imageFile", label: "Select Image File", type: "file" },
      { id: "targetWidth", label: "Target Width (px)", type: "text", placeholder: "800" },
      { id: "targetHeight", label: "Target Height (px, optional)", type: "text", placeholder: "600" }
    ]
  },
  {
    id: "png-to-jpg",
    title: "PNG to JPG / WEBP Converter",
    name: "PNG to JPG / WEBP Converter",
    category: "Design, Image & Color Utilities",
    description: "Converts transparent PNG images to JPG or WebP format with custom background fill.",
    inputs: [
      { id: "imageFile", label: "Select PNG File", type: "file" },
      { id: "outputFormat", label: "Target Format", type: "dropdown", options: ["JPEG (.jpg)", "WebP (.webp)"] },
      { id: "bgFill", label: "Background Fill Color for Transparency", type: "text", placeholder: "#FFFFFF" }
    ]
  },
  {
    id: "palette-from-image",
    title: "Image Color Palette Extractor",
    name: "Image Color Palette Extractor",
    category: "Design, Image & Color Utilities",
    description: "Extracts dominant hex color palettes from uploaded photos using HTML5 Canvas pixel analysis.",
    inputs: [
      { id: "imageFile", label: "Select Photo to Extract Colors", type: "file" },
      { id: "colorCount", label: "Palette Color Count", type: "dropdown", options: ["5 Dominant Colors", "8 Color Palette", "10 Color Palette"] }
    ]
  },
  {
    id: "border-radius-generator",
    title: "CSS Border Radius & Blob Generator",
    name: "CSS Border Radius & Blob Generator",
    category: "Design, Image & Color Utilities",
    description: "Generates CSS border-radius and organic blob shapes for web components.",
    inputs: [
      { id: "topLeft", label: "Top-Left Radius (px)", type: "text", placeholder: "16" },
      { id: "topRight", label: "Top-Right Radius (px)", type: "text", placeholder: "16" },
      { id: "bottomRight", label: "Bottom-Right Radius (px)", type: "text", placeholder: "0" },
      { id: "bottomLeft", label: "Bottom-Left Radius (px)", type: "text", placeholder: "0" }
    ]
  },
  {
    id: "svg-to-png-converter",
    title: "SVG Vector to High-Res PNG Renderer",
    name: "SVG Vector to High-Res PNG Renderer",
    category: "Design, Image & Color Utilities",
    description: "Renders vector SVG code or files into high-resolution PNG images at 1x, 2x, or 4x scale.",
    inputs: [
      { id: "svgInput", label: "SVG Code / XML Markup", type: "textarea", placeholder: '<svg width="100" height="100">...</svg>' },
      { id: "scale", label: "Export Resolution Scale", type: "dropdown", options: ["2x High-DPI (Retina)", "1x Standard", "4x Ultra High-Res"] }
    ]
  },

  // -----------------------------------------
  // Category: Text Processing & Writing Utilities
  // -----------------------------------------
  {
    id: "text-repeater",
    title: "Text & String Repeater",
    name: "Text & String Repeater",
    category: "Text Processing & Writing Utilities",
    description: "Repeats a text string N times with optional newlines, spaces, or custom delimiters.",
    inputs: [
      { id: "text", label: "Text to Repeat", type: "text", placeholder: "Hello World!" },
      { id: "repeatCount", label: "Repeat Count", type: "text", placeholder: "10" },
      { id: "delimiter", label: "Separator Style", type: "dropdown", options: ["Newline", "Space", "Comma (,)", "Hyphen (-)"] }
    ]
  },
  {
    id: "reverse-text-generator",
    title: "Reverse Text & Backwards String Generator",
    name: "Reverse Text & Backwards String Generator",
    category: "Text Processing & Writing Utilities",
    description: "Flips text characters backwards, reverses word order, or reverses line order.",
    inputs: [
      { id: "text", label: "Input Text to Reverse", type: "textarea", placeholder: "Zenovee AI Tools" },
      { id: "mode", label: "Reverse Mode", type: "dropdown", options: ["Reverse Characters (slooT IA eevoneZ)", "Reverse Words (Tools AI Zenovee)", "Reverse Lines"] }
    ]
  },
  {
    id: "duplicate-line-remover",
    title: "Duplicate Line & Word Remover",
    name: "Duplicate Line & Word Remover",
    category: "Text Processing & Writing Utilities",
    description: "Strips duplicate lines or words from list data and sorts the output alphabetically.",
    inputs: [
      { id: "listText", label: "Raw List Data", type: "textarea", placeholder: "apple\nbanana\napple\norange\nbanana" },
      { id: "caseSensitive", label: "Case Sensitivity", type: "dropdown", options: ["Ignore Case (A=a)", "Case Sensitive (A!=a)"] }
    ]
  },
  {
    id: "text-to-binary",
    title: "Text to Binary & Binary to Text Converter",
    name: "Text to Binary & Binary to Text Converter",
    category: "Text Processing & Writing Utilities",
    description: "Converts ASCII text to binary 8-bit byte strings (01001000...) and vice-versa.",
    inputs: [
      { id: "text", label: "Text or Binary Input", type: "textarea", placeholder: "Hello" },
      { id: "mode", label: "Conversion Mode", type: "dropdown", options: ["Text to Binary", "Binary to Text"] }
    ]
  },
  {
    id: "hex-to-text-converter",
    title: "Hex to Text & Text to Hex Converter",
    name: "Hex to Text & Text to Hex Converter",
    category: "Text Processing & Writing Utilities",
    description: "Translates hexadecimal byte sequences into plain readable text strings.",
    inputs: [
      { id: "inputStr", label: "Text or Hex String", type: "textarea", placeholder: "48 65 6c 6c 6f" },
      { id: "mode", label: "Conversion Mode", type: "dropdown", options: ["Hex to Text", "Text to Hex"] }
    ]
  },
  {
    id: "morse-code-translator",
    title: "Morse Code Translator & Audio Player",
    name: "Morse Code Translator & Audio Player",
    category: "Text Processing & Writing Utilities",
    description: "Translates text into Morse code (. and -) and plays audio beeps via Web Audio API.",
    inputs: [
      { id: "text", label: "Plain Text or Morse Code", type: "textarea", placeholder: "SOS" },
      { id: "mode", label: "Translation Mode", type: "dropdown", options: ["Text to Morse Code", "Morse Code to Text"] }
    ]
  },
  {
    id: "binary-to-decimal",
    title: "Binary to Decimal / Hex / Octal Converter",
    name: "Binary to Decimal / Hex / Octal Converter",
    category: "Text Processing & Writing Utilities",
    description: "Converts numbers between Binary (Base-2), Octal (Base-8), Decimal (Base-10), and Hex (Base-16).",
    inputs: [
      { id: "numStr", label: "Number Input String", type: "text", placeholder: "101010" },
      { id: "fromBase", label: "From Number Base", type: "dropdown", options: ["Binary (Base 2)", "Decimal (Base 10)", "Hexadecimal (Base 16)", "Octal (Base 8)"] }
    ]
  },
  {
    id: "whitespace-remover",
    title: "Extra Whitespace & Newline Stripper",
    name: "Extra Whitespace & Newline Stripper",
    category: "Text Processing & Writing Utilities",
    description: "Removes consecutive space characters, leading/trailing whitespace, and empty lines.",
    inputs: [
      { id: "text", label: "Raw Unformatted Text", type: "textarea", placeholder: "  Hello     World!   \n\n  This is   a test.  " }
    ]
  },
  {
    id: "word-scrambler",
    title: "Anagram & Word Scrambler",
    name: "Anagram & Word Scrambler",
    category: "Text Processing & Writing Utilities",
    description: "Randomly scrambles letters in words or generates anagram combinations for puzzles.",
    inputs: [
      { id: "word", label: "Input Word / Phrase", type: "text", placeholder: "LISTEN" }
    ]
  },
  {
    id: "text-sorter",
    title: "Alphabetical Text & List Sorter",
    name: "Alphabetical Text & List Sorter",
    category: "Text Processing & Writing Utilities",
    description: "Sorts lists alphabetically (A-Z, Z-A), numerically, or by line character length.",
    inputs: [
      { id: "lines", label: "Raw List Lines", type: "textarea", placeholder: "Zebra\nApple\nMonkey\nCat" },
      { id: "sortOrder", label: "Sort Ordering", type: "dropdown", options: ["Alphabetical A-Z", "Alphabetical Z-A", "By Line Length (Short to Long)", "Numeric Sort"] }
    ]
  },

  // -----------------------------------------
  // Category: Daily Math & Student Tools
  // -----------------------------------------
  {
    id: "simple-calculator",
    title: "Basic Standard & Scientific Calculator",
    name: "Basic Standard & Scientific Calculator",
    category: "Daily Math & Student Tools",
    description: "Performs standard arithmetic (+, -, *, /) and scientific operations (sqrt, square, pow, sin, cos).",
    inputs: [
      { id: "expression", label: "Mathematical Expression", type: "text", placeholder: "25 * (4 + 6) / 2" }
    ]
  },
  {
    id: "fraction-calculator",
    title: "Fraction Calculator & Simplifier",
    name: "Fraction Calculator & Simplifier",
    category: "Daily Math & Student Tools",
    description: "Adds, subtracts, multiplies, and divides fractions and reduces answers to simplest form.",
    inputs: [
      { id: "f1Num", label: "Fraction 1 Numerator", type: "text", placeholder: "1" },
      { id: "f1Den", label: "Fraction 1 Denominator", type: "text", placeholder: "2" },
      { id: "op", label: "Operator", type: "dropdown", options: ["+ (Add)", "- (Subtract)", "* (Multiply)", "/ (Divide)"] },
      { id: "f2Num", label: "Fraction 2 Numerator", type: "text", placeholder: "3" },
      { id: "f2Den", label: "Fraction 2 Denominator", type: "text", placeholder: "4" }
    ]
  },
  {
    id: "roman-numeral-converter",
    title: "Roman Numeral Converter",
    name: "Roman Numeral Converter",
    category: "Daily Math & Student Tools",
    description: "Converts integer numbers to Roman Numerals (2026 -> MMXXVI) and vice-versa.",
    inputs: [
      { id: "val", label: "Number or Roman Numeral Input", type: "text", placeholder: "2026 or MMXXVI" },
      { id: "mode", label: "Conversion Direction", type: "dropdown", options: ["Number to Roman Numeral", "Roman Numeral to Number"] }
    ]
  },
  {
    id: "binary-calculator",
    title: "Binary Arithmetic Calculator",
    name: "Binary Arithmetic Calculator",
    category: "Daily Math & Student Tools",
    description: "Performs binary addition, subtraction, AND, OR, XOR operations on binary numbers.",
    inputs: [
      { id: "b1", label: "First Binary Number", type: "text", placeholder: "1010" },
      { id: "op", label: "Binary Operation", type: "dropdown", options: ["+ (Addition)", "- (Subtraction)", "AND Bitwise", "OR Bitwise", "XOR Bitwise"] },
      { id: "b2", label: "Second Binary Number", type: "text", placeholder: "1100" }
    ]
  },
  {
    id: "average-mean-calculator",
    title: "Mean, Median, Mode & Range Calculator",
    name: "Mean, Median, Mode & Range Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates Mean (average), Median, Mode, and Range for a set of numerical data points.",
    inputs: [
      { id: "numbers", label: "Numbers List (comma or space separated)", type: "textarea", placeholder: "12, 15, 18, 22, 15, 30, 25" }
    ]
  },
  {
    id: "standard-deviation-calc",
    title: "Standard Deviation & Variance Calculator",
    name: "Standard Deviation & Variance Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates Sample and Population Standard Deviation, Variance, and Sum of Squares.",
    inputs: [
      { id: "dataPoints", label: "Dataset Values (comma separated)", type: "textarea", placeholder: "10, 12, 23, 23, 16, 23, 21, 16" }
    ]
  },
  {
    id: "random-choice-picker",
    title: "Random Choice & Name Picker",
    name: "Random Choice & Name Picker",
    category: "Daily Math & Student Tools",
    description: "Picks one or more random items/winners from a custom list of choices.",
    inputs: [
      { id: "choices", label: "List of Options / Names (One per line)", type: "textarea", placeholder: "Option A\nOption B\nOption C\nOption D" },
      { id: "winnerCount", label: "Number of Choices to Pick", type: "dropdown", options: ["Pick 1 Winner", "Pick 2 Winners", "Pick 3 Winners"] }
    ]
  },
  {
    id: "time-duration-calc",
    title: "Time Duration & Hours Between Calculator",
    name: "Time Duration & Hours Between Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates total hours and minutes between two time entries (e.g. 09:15 AM to 05:45 PM).",
    inputs: [
      { id: "startTime", label: "Start Time", type: "text", placeholder: "09:15 AM" },
      { id: "endTime", label: "End Time", type: "text", placeholder: "05:45 PM" }
    ]
  },
  {
    id: "speed-distance-time",
    title: "Speed, Distance & Time Calculator",
    name: "Speed, Distance & Time Calculator",
    category: "Daily Math & Student Tools",
    description: "Calculates missing speed (mph/kph), distance (miles/km), or travel duration.",
    inputs: [
      { id: "calcTarget", label: "Calculate Target", type: "dropdown", options: ["Speed (Distance / Time)", "Distance (Speed * Time)", "Time (Distance / Speed)"] },
      { id: "val1", label: "First Parameter Value", type: "text", placeholder: "60 (mph or miles)" },
      { id: "val2", label: "Second Parameter Value", type: "text", placeholder: "2 (hours or mph)" }
    ]
  },
  {
    id: "triangle-solver",
    title: "Right Triangle & Pythagorean Calculator",
    name: "Right Triangle & Pythagorean Calculator",
    category: "Daily Math & Student Tools",
    description: "Solves right triangles calculating Hypotenuse (c = √(a² + b²)), area, and perimeter.",
    inputs: [
      { id: "sideA", label: "Side A Length", type: "text", placeholder: "3" },
      { id: "sideB", label: "Side B Length", type: "text", placeholder: "4" }
    ]
  },

  // -----------------------------------------
  // Category: Health, Fitness & Everyday Life
  // -----------------------------------------
  {
    id: "water-intake-calculator",
    title: "Daily Water Intake Calculator",
    name: "Daily Water Intake Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates daily hydration fluid requirements in liters and cups based on body weight and activity.",
    inputs: [
      { id: "weightLbs", label: "Body Weight (lbs or kg)", type: "text", placeholder: "160" },
      { id: "weightUnit", label: "Weight Unit", type: "dropdown", options: ["Pounds (lbs)", "Kilograms (kg)"] },
      { id: "activityMin", label: "Daily Exercise Activity (Minutes)", type: "text", placeholder: "30" }
    ]
  },
  {
    id: "calorie-tdee-calculator",
    title: "TDEE & BMR Daily Calorie Calculator",
    name: "TDEE & BMR Daily Calorie Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) for weight goals.",
    inputs: [
      { id: "weight", label: "Weight (kg)", type: "text", placeholder: "70" },
      { id: "height", label: "Height (cm)", type: "text", placeholder: "175" },
      { id: "age", label: "Age (Years)", type: "text", placeholder: "28" },
      { id: "gender", label: "Gender", type: "dropdown", options: ["Male", "Female"] },
      { id: "activity", label: "Activity Level", type: "dropdown", options: ["Sedentary (Office Job)", "Lightly Active (1-3 days/wk)", "Moderately Active (3-5 days/wk)", "Very Active (6-7 days/wk)"] }
    ]
  },
  {
    id: "macro-calculator",
    title: "Macronutrient Ratio Calculator",
    name: "Macronutrient Ratio Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates target daily grams of Protein, Carbohydrates, and Fats based on calorie intake.",
    inputs: [
      { id: "calories", label: "Daily Target Calories", type: "text", placeholder: "2000" },
      { id: "fitnessGoal", label: "Fitness Goal", type: "dropdown", options: ["Maintenance (40% C / 30% P / 30% F)", "Fat Loss (30% C / 40% P / 30% F)", "Muscle Gain (50% C / 30% P / 20% F)"] }
    ]
  },
  {
    id: "sleep-cycle-calculator",
    title: "Sleep Cycle & Bedtime Alarm Calculator",
    name: "Sleep Cycle & Bedtime Alarm Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates optimal bedtime schedules based on 90-minute REM sleep cycles.",
    inputs: [
      { id: "wakeTime", label: "Desired Wake-Up Time", type: "text", placeholder: "07:00 AM" }
    ]
  },
  {
    id: "ideal-weight-calculator",
    title: "Ideal Body Weight (IBW) Calculator",
    name: "Ideal Body Weight (IBW) Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates healthy ideal weight ranges using Devine, Robinson, and Miller medical formulas.",
    inputs: [
      { id: "heightCm", label: "Height (cm)", type: "text", placeholder: "175" },
      { id: "gender", label: "Gender", type: "dropdown", options: ["Male", "Female"] }
    ]
  },
  {
    id: "step-to-distance-calc",
    title: "Steps to Distance & Calories Burned Converter",
    name: "Steps to Distance & Calories Burned Converter",
    category: "Health, Fitness & Everyday Life",
    description: "Converts daily step count (e.g. 10,000 steps) into miles, kilometers, and estimated calories burned.",
    inputs: [
      { id: "steps", label: "Daily Steps Count", type: "text", placeholder: "10000" },
      { id: "strideLength", label: "Average Stride Length", type: "dropdown", options: ["Average (2.2 ft / 0.67m)", "Tall Stride (2.5 ft)", "Short Stride (2.0 ft)"] }
    ]
  },
  {
    id: "bac-calculator",
    title: "Blood Alcohol Concentration (BAC) Calculator",
    name: "Blood Alcohol Concentration (BAC) Calculator",
    category: "Health, Fitness & Everyday Life",
    description: "Estimates Blood Alcohol Content percentage over time using Widmark's formula.",
    inputs: [
      { id: "drinks", label: "Standard Drinks Consumed", type: "text", placeholder: "3" },
      { id: "weightLbs", label: "Body Weight (lbs)", type: "text", placeholder: "160" },
      { id: "hours", label: "Hours Since First Drink", type: "text", placeholder: "2" },
      { id: "gender", label: "Gender", type: "dropdown", options: ["Male", "Female"] }
    ]
  },
  {
    id: "unit-price-comparator",
    title: "Grocery Unit Price Comparator",
    name: "Grocery Unit Price Comparator",
    category: "Health, Fitness & Everyday Life",
    description: "Compares cost per ounce, gram, or unit between two competing grocery package deals.",
    inputs: [
      { id: "p1Price", label: "Item 1 Total Price ($)", type: "text", placeholder: "4.99" },
      { id: "p1Size", label: "Item 1 Size/Quantity (oz/g)", type: "text", placeholder: "16" },
      { id: "p2Price", label: "Item 2 Total Price ($)", type: "text", placeholder: "7.49" },
      { id: "p2Size", label: "Item 2 Size/Quantity (oz/g)", type: "text", placeholder: "28" }
    ]
  },
  {
    id: "countdown-timer-builder",
    title: "Online Event Countdown Timer Builder",
    name: "Online Event Countdown Timer Builder",
    category: "Health, Fitness & Everyday Life",
    description: "Calculates remaining days, hours, minutes, and seconds until any upcoming target date.",
    inputs: [
      { id: "eventName", label: "Event Name / Celebration", type: "text", placeholder: "New Year 2027" },
      { id: "targetDate", label: "Target Date & Time (YYYY-MM-DD)", type: "text", placeholder: "2027-01-01" }
    ]
  },
  {
    id: "stopwatch-lap-timer",
    title: "Digital Stopwatch & Lap Split Timer",
    name: "Digital Stopwatch & Lap Split Timer",
    category: "Health, Fitness & Everyday Life",
    description: "Precision digital stopwatch with lap split time logging and lap pace analysis.",
    inputs: [
      { id: "action", label: "Stopwatch Action", type: "dropdown", options: ["Start / Record Split", "Reset Timer"] }
    ]
  }
];

// Append tools to toolsConfig.ts if not present
let toolsConfigContent = fs.readFileSync('src/utils/toolsConfig.ts', 'utf8');

let addedCount = 0;
newToolsConfig.forEach(t => {
  if (!toolsConfigContent.includes(`id: "${t.id}"`) && !toolsConfigContent.includes(`id: '${t.id}'`)) {
    const entry = `  {
    id: "${t.id}",
    title: "${t.title}",
    name: "${t.name}",
    category: "${t.category}",
    description: "${t.description.replace(/"/g, '\\"')}",
    inputs: ${JSON.stringify(t.inputs, null, 6).replace(/\n\s*}/g, '\n    }')}
  },`;
    toolsConfigContent = toolsConfigContent.replace(/\n\s*\];\s*$/, `\n${entry}\n];\n`);
    addedCount++;
  }
});

fs.writeFileSync('src/utils/toolsConfig.ts', toolsConfigContent);
console.log(`Added ${addedCount} new tools to toolsConfig.ts!`);
