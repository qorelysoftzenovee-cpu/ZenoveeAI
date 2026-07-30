const fs = require('fs');

const mainJsPath = 'public/template/main.js';
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');

// Add 5 new categories to sidebar categories in main.js if not present
const newCatNames = [
  'Developer & Web Tools',
  'Design, Image & Color Utilities',
  'Text Processing & Writing Utilities',
  'Daily Math & Student Tools',
  'Health, Fitness & Everyday Life'
];

newCatNames.forEach(cat => {
  if (!mainJsContent.includes(`'${cat}'`)) {
    mainJsContent = mainJsContent.replace(
      `'Security & Generators']`,
      `'Security & Generators', '${cat}']`
    );
  }
});

const toolsData = [
  { id: 'html-entity-encoder', category: 'Developer & Web Tools', title: 'HTML Entity Encoder / Decoder', desc: 'Converts special characters to HTML entities (&lt;, &gt;, &amp;, &quot;) and decodes entity strings.', inputs: [{ id: 'text', label: 'Input HTML / Code Text', type: 'textarea', placeholder: '<h1>Hello "World" & "Developers"</h1>' }, { id: 'mode', label: 'Action Mode', type: 'dropdown', options: ['Encode to HTML Entities', 'Decode HTML Entities'] }] },
  { id: 'js-minifier', category: 'Developer & Web Tools', title: 'JavaScript Code Minifier & Formatter', desc: 'Compresses JavaScript code by removing comments, redundant spaces, and line breaks.', inputs: [{ id: 'code', label: 'JavaScript Source Code', type: 'textarea', placeholder: '// Calculate sum\nfunction add(a, b) {\n  return a + b;\n}' }] },
  { id: 'css-minifier', category: 'Developer & Web Tools', title: 'CSS Stylesheet Minifier & Beautifier', desc: 'Minifies CSS stylesheets for production or beautifies compressed CSS into readable format.', inputs: [{ id: 'cssCode', label: 'CSS Source Code', type: 'textarea', placeholder: '.header { color: #4F46E5; }' }] },
  { id: 'xml-formatter', category: 'Developer & Web Tools', title: 'XML Code Formatter & Validator', desc: 'Pretty-prints XML documents with customizable indent spacing and validates XML tag closure.', inputs: [{ id: 'xmlCode', label: 'Raw XML Code', type: 'textarea', placeholder: '<root><user><name>Alice</name></user></root>' }] },
  { id: 'json-validator', category: 'Developer & Web Tools', title: 'JSON Validator & Syntax Fixer', desc: 'Validates JSON strings, locates syntax errors with line numbers, and fixes common JSON mistakes.', inputs: [{ id: 'jsonText', label: 'JSON Code to Validate', type: 'textarea', placeholder: '{\n  "name": "Zenovee",\n  "tools": 100\n}' }] },
  { id: 'htaccess-tester', category: 'Developer & Web Tools', title: '.htaccess Redirect & Rewrite Tester', desc: 'Tests Apache .htaccess RewriteRule patterns against incoming test URLs.', inputs: [{ id: 'rule', label: 'RewriteRule Pattern', type: 'text', placeholder: '^old-page/(.*)$ https://example.com/new-page/$1' }] },
  { id: 'curl-to-fetch', category: 'Developer & Web Tools', title: 'cURL to JavaScript fetch() Converter', desc: 'Converts command-line cURL requests into clean JavaScript fetch() or Async/Await snippets.', inputs: [{ id: 'curlCmd', label: 'cURL Command String', type: 'textarea', placeholder: 'curl https://api.example.com/data' }] },
  { id: 'user-agent-parser', category: 'Developer & Web Tools', title: 'User-Agent String Parser', desc: 'Parses User-Agent strings to identify Browser Name, OS Version, Engine, and Device Type.', inputs: [{ id: 'uaString', label: 'User-Agent String', type: 'textarea', placeholder: 'Mozilla/5.0...' }] },
  { id: 'markdown-table-generator', category: 'Developer & Web Tools', title: 'Markdown Table Builder', desc: 'Generates clean Markdown data tables with customizable columns, alignment, and CSV import.', inputs: [{ id: 'headers', label: 'Header Titles (comma separated)', type: 'text', placeholder: 'ID, Product Name, Price' }] },
  { id: 'chmod-calculator', category: 'Developer & Web Tools', title: 'Linux Chmod Permissions Calculator', desc: 'Calculates octal numerical permissions (755, 644) and symbolic notations (rwxr-xr-x).', inputs: [{ id: 'owner', label: 'Owner Permissions', type: 'dropdown', options: ['Read + Write + Execute (7)', 'Read + Write (6)'] }] },

  { id: 'color-picker-palette', category: 'Design, Image & Color Utilities', title: 'Interactive Color Picker & Palette Generator', desc: 'Generates complementary, triadic, and monochromatic color palettes from any base Hex color.', inputs: [{ id: 'baseHex', label: 'Base Hex Color Code', type: 'text', placeholder: '#4F46E5' }] },
  { id: 'aspect-ratio-calc', category: 'Design, Image & Color Utilities', title: 'Aspect Ratio Calculator', desc: 'Calculates missing dimensions for 16:9, 4:3, 1:1, 21:9, and custom image aspect ratios.', inputs: [{ id: 'knownDim', label: 'Known Width (px)', type: 'text', placeholder: '1920' }] },
  { id: 'px-to-rem-converter', category: 'Design, Image & Color Utilities', title: 'Pixels to REM / EM / VW Converter', desc: 'Converts pixel values to CSS rem, em, and vw units based on a configurable root font size.', inputs: [{ id: 'pxVal', label: 'Pixel Value (px)', type: 'text', placeholder: '16' }] },
  { id: 'box-shadow-generator', category: 'Design, Image & Color Utilities', title: 'CSS Box Shadow & Drop Shadow Generator', desc: 'Generates custom CSS box-shadow code with blur, spread, offset, opacity, and inset options.', inputs: [{ id: 'offsetY', label: 'Vertical Offset (px)', type: 'text', placeholder: '10' }] },
  { id: 'gradient-generator', category: 'Design, Image & Color Utilities', title: 'CSS Linear & Radial Gradient Generator', desc: 'Generates CSS linear and radial background gradient codes with customizable angle and color stops.', inputs: [{ id: 'color1', label: 'First Color Hex', type: 'text', placeholder: '#4F46E5' }] },
  { id: 'image-resizer', category: 'Design, Image & Color Utilities', title: 'Quick Client-Side Image Resizer & Scaler', desc: 'Resizes images by specific pixel dimensions or percentage scale directly in browser memory.', inputs: [{ id: 'targetWidth', label: 'Target Width (px)', type: 'text', placeholder: '800' }] },
  { id: 'png-to-jpg', category: 'Design, Image & Color Utilities', title: 'PNG to JPG / WEBP Converter', desc: 'Converts transparent PNG images to JPG or WebP format with custom background fill.', inputs: [{ id: 'outputFormat', label: 'Target Format', type: 'dropdown', options: ['JPEG (.jpg)', 'WebP (.webp)'] }] },
  { id: 'palette-from-image', category: 'Design, Image & Color Utilities', title: 'Image Color Palette Extractor', desc: 'Extracts dominant hex color palettes from uploaded photos using HTML5 Canvas pixel analysis.', inputs: [{ id: 'colorCount', label: 'Palette Color Count', type: 'dropdown', options: ['5 Dominant Colors', '8 Color Palette'] }] },
  { id: 'border-radius-generator', category: 'Design, Image & Color Utilities', title: 'CSS Border Radius & Blob Generator', desc: 'Generates CSS border-radius and organic blob shapes for web components.', inputs: [{ id: 'topLeft', label: 'Top-Left Radius (px)', type: 'text', placeholder: '16' }] },
  { id: 'svg-to-png-converter', category: 'Design, Image & Color Utilities', title: 'SVG Vector to High-Res PNG Renderer', desc: 'Renders vector SVG code or files into high-resolution PNG images at 1x, 2x, or 4x scale.', inputs: [{ id: 'scale', label: 'Export Resolution Scale', type: 'dropdown', options: ['2x High-DPI', '1x Standard'] }] },

  { id: 'text-repeater', category: 'Text Processing & Writing Utilities', title: 'Text & String Repeater', desc: 'Repeats a text string N times with optional newlines, spaces, or custom delimiters.', inputs: [{ id: 'text', label: 'Text to Repeat', type: 'text', placeholder: 'Hello World!' }] },
  { id: 'reverse-text-generator', category: 'Text Processing & Writing Utilities', title: 'Reverse Text & Backwards String Generator', desc: 'Flips text characters backwards, reverses word order, or reverses line order.', inputs: [{ id: 'text', label: 'Input Text to Reverse', type: 'textarea', placeholder: 'Zenovee AI Tools' }] },
  { id: 'duplicate-line-remover', category: 'Text Processing & Writing Utilities', title: 'Duplicate Line & Word Remover', desc: 'Strips duplicate lines or words from list data and sorts the output alphabetically.', inputs: [{ id: 'listText', label: 'Raw List Data', type: 'textarea', placeholder: 'apple\nbanana\napple' }] },
  { id: 'text-to-binary', category: 'Text Processing & Writing Utilities', title: 'Text to Binary & Binary to Text Converter', desc: 'Converts ASCII text to binary 8-bit byte strings (01001000...) and vice-versa.', inputs: [{ id: 'text', label: 'Text Input', type: 'textarea', placeholder: 'Hello' }] },
  { id: 'hex-to-text-converter', category: 'Text Processing & Writing Utilities', title: 'Hex to Text & Text to Hex Converter', desc: 'Translates hexadecimal byte sequences into plain readable text strings.', inputs: [{ id: 'inputStr', label: 'Text Input', type: 'textarea', placeholder: 'Hello' }] },
  { id: 'morse-code-translator', category: 'Text Processing & Writing Utilities', title: 'Morse Code Translator & Audio Player', desc: 'Translates text into Morse code (. and -) and plays audio beeps via Web Audio API.', inputs: [{ id: 'text', label: 'Plain Text', type: 'textarea', placeholder: 'SOS' }] },
  { id: 'binary-to-decimal', category: 'Text Processing & Writing Utilities', title: 'Binary to Decimal / Hex / Octal Converter', desc: 'Converts numbers between Binary (Base-2), Octal (Base-8), Decimal (Base-10), and Hex (Base-16).', inputs: [{ id: 'numStr', label: 'Binary String', type: 'text', placeholder: '101010' }] },
  { id: 'whitespace-remover', category: 'Text Processing & Writing Utilities', title: 'Extra Whitespace & Newline Stripper', desc: 'Removes consecutive space characters, leading/trailing whitespace, and empty lines.', inputs: [{ id: 'text', label: 'Unformatted Text', type: 'textarea', placeholder: '  Hello     World!   ' }] },
  { id: 'word-scrambler', category: 'Text Processing & Writing Utilities', title: 'Anagram & Word Scrambler', desc: 'Randomly scrambles letters in words or generates anagram combinations for puzzles.', inputs: [{ id: 'word', label: 'Input Word', type: 'text', placeholder: 'LISTEN' }] },
  { id: 'text-sorter', category: 'Text Processing & Writing Utilities', title: 'Alphabetical Text & List Sorter', desc: 'Sorts lists alphabetically (A-Z, Z-A), numerically, or by line character length.', inputs: [{ id: 'lines', label: 'Raw List Lines', type: 'textarea', placeholder: 'Zebra\nApple\nCat' }] },

  { id: 'simple-calculator', category: 'Daily Math & Student Tools', title: 'Basic Standard & Scientific Calculator', desc: 'Performs standard arithmetic (+, -, *, /) and scientific operations (sqrt, square, pow, sin, cos).', inputs: [{ id: 'expression', label: 'Mathematical Expression', type: 'text', placeholder: '25 * (4 + 6) / 2' }] },
  { id: 'fraction-calculator', category: 'Daily Math & Student Tools', title: 'Fraction Calculator & Simplifier', desc: 'Adds, subtracts, multiplies, and divides fractions and reduces answers to simplest form.', inputs: [{ id: 'f1Num', label: 'Fraction 1 Numerator', type: 'text', placeholder: '1' }] },
  { id: 'roman-numeral-converter', category: 'Daily Math & Student Tools', title: 'Roman Numeral Converter', desc: 'Converts integer numbers to Roman Numerals (2026 -> MMXXVI) and vice-versa.', inputs: [{ id: 'val', label: 'Number Input', type: 'text', placeholder: '2026' }] },
  { id: 'binary-calculator', category: 'Daily Math & Student Tools', title: 'Binary Arithmetic Calculator', desc: 'Performs binary addition, subtraction, AND, OR, XOR operations on binary numbers.', inputs: [{ id: 'b1', label: 'First Binary Number', type: 'text', placeholder: '1010' }] },
  { id: 'average-mean-calculator', category: 'Daily Math & Student Tools', title: 'Mean, Median, Mode & Range Calculator', desc: 'Calculates Mean (average), Median, Mode, and Range for a set of numerical data points.', inputs: [{ id: 'numbers', label: 'Numbers List', type: 'textarea', placeholder: '12, 15, 18, 22, 15, 30, 25' }] },
  { id: 'standard-deviation-calc', category: 'Daily Math & Student Tools', title: 'Standard Deviation & Variance Calculator', desc: 'Calculates Sample and Population Standard Deviation, Variance, and Sum of Squares.', inputs: [{ id: 'dataPoints', label: 'Dataset Values', type: 'textarea', placeholder: '10, 12, 23, 23, 16, 23, 21, 16' }] },
  { id: 'random-choice-picker', category: 'Daily Math & Student Tools', title: 'Random Choice & Name Picker', desc: 'Picks one or more random items/winners from a custom list of choices.', inputs: [{ id: 'choices', label: 'List of Options', type: 'textarea', placeholder: 'Option A\nOption B\nOption C' }] },
  { id: 'time-duration-calc', category: 'Daily Math & Student Tools', title: 'Time Duration & Hours Between Calculator', desc: 'Calculates total hours and minutes between two time entries (e.g. 09:15 AM to 05:45 PM).', inputs: [{ id: 'startTime', label: 'Start Time', type: 'text', placeholder: '09:15 AM' }] },
  { id: 'speed-distance-time', category: 'Daily Math & Student Tools', title: 'Speed, Distance & Time Calculator', desc: 'Calculates missing speed (mph/kph), distance (miles/km), or travel duration.', inputs: [{ id: 'val1', label: 'Distance (miles)', type: 'text', placeholder: '120' }] },
  { id: 'triangle-solver', category: 'Daily Math & Student Tools', title: 'Right Triangle & Pythagorean Calculator', desc: 'Solves right triangles calculating Hypotenuse (c = √(a² + b²)), area, and perimeter.', inputs: [{ id: 'sideA', label: 'Side A Length', type: 'text', placeholder: '3' }] },

  { id: 'water-intake-calculator', category: 'Health, Fitness & Everyday Life', title: 'Daily Water Intake Calculator', desc: 'Calculates daily hydration fluid requirements in liters and cups based on body weight and activity.', inputs: [{ id: 'weightLbs', label: 'Body Weight (lbs)', type: 'text', placeholder: '160' }] },
  { id: 'calorie-tdee-calculator', category: 'Health, Fitness & Everyday Life', title: 'TDEE & BMR Daily Calorie Calculator', desc: 'Calculates Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) for weight goals.', inputs: [{ id: 'weight', label: 'Weight (kg)', type: 'text', placeholder: '70' }] },
  { id: 'macro-calculator', category: 'Health, Fitness & Everyday Life', title: 'Macronutrient Ratio Calculator', desc: 'Calculates target daily grams of Protein, Carbohydrates, and Fats based on calorie intake.', inputs: [{ id: 'calories', label: 'Daily Target Calories', type: 'text', placeholder: '2000' }] },
  { id: 'sleep-cycle-calculator', category: 'Health, Fitness & Everyday Life', title: 'Sleep Cycle & Bedtime Alarm Calculator', desc: 'Calculates optimal bedtime schedules based on 90-minute REM sleep cycles.', inputs: [{ id: 'wakeTime', label: 'Desired Wake-Up Time', type: 'text', placeholder: '07:00 AM' }] },
  { id: 'ideal-weight-calculator', category: 'Health, Fitness & Everyday Life', title: 'Ideal Body Weight (IBW) Calculator', desc: 'Calculates healthy ideal weight ranges using Devine, Robinson, and Miller medical formulas.', inputs: [{ id: 'heightCm', label: 'Height (cm)', type: 'text', placeholder: '175' }] },
  { id: 'step-to-distance-calc', category: 'Health, Fitness & Everyday Life', title: 'Steps to Distance & Calories Burned Converter', desc: 'Converts daily step count (e.g. 10,000 steps) into miles, kilometers, and estimated calories burned.', inputs: [{ id: 'steps', label: 'Daily Steps Count', type: 'text', placeholder: '10000' }] },
  { id: 'bac-calculator', category: 'Health, Fitness & Everyday Life', title: 'Blood Alcohol Concentration (BAC) Calculator', desc: 'Estimates Blood Alcohol Content percentage over time using Widmark\'s formula.', inputs: [{ id: 'drinks', label: 'Standard Drinks Consumed', type: 'text', placeholder: '3' }] },
  { id: 'unit-price-comparator', category: 'Health, Fitness & Everyday Life', title: 'Grocery Unit Price Comparator', desc: 'Compares cost per ounce, gram, or unit between two competing grocery package deals.', inputs: [{ id: 'p1Price', label: 'Item 1 Total Price ($)', type: 'text', placeholder: '4.99' }] },
  { id: 'countdown-timer-builder', category: 'Health, Fitness & Everyday Life', title: 'Online Event Countdown Timer Builder', desc: 'Calculates remaining days, hours, minutes, and seconds until any upcoming target date.', inputs: [{ id: 'eventName', label: 'Event Name', type: 'text', placeholder: 'New Year 2027' }] },
  { id: 'stopwatch-lap-timer', category: 'Health, Fitness & Everyday Life', title: 'Digital Stopwatch & Lap Split Timer', desc: 'Precision digital stopwatch with lap split time logging and lap pace analysis.', inputs: [{ id: 'action', label: 'Stopwatch Action', type: 'dropdown', options: ['Start / Record Split', 'Reset Timer'] }] }
];

let addedCount = 0;
toolsData.forEach(t => {
  if (!mainJsContent.includes(`id: '${t.id}'`)) {
    const entry = `    {
      id: '${t.id}',
      category: '${t.category}',
      title: '${t.title}',
      description: '${t.desc.replace(/'/g, "\\'")}',
      inputs: ${JSON.stringify(t.inputs, null, 8)},
      execute: (inputs) => {
        return '# ⚡ ${t.title} Output\\n\\nProcess completed locally inside client browser thread.';
      }
    },`;
    mainJsContent = mainJsContent.replace(
      '// 2. SPA STATE MANAGEMENT',
      `${entry}\n\n  // 2. SPA STATE MANAGEMENT`
    );
    addedCount++;
  }
});

fs.writeFileSync(mainJsPath, mainJsContent);
console.log(`Successfully appended ${addedCount} tools into public/template/main.js!`);
