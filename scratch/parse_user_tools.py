import re
import json

config_content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()
existing_ids = set(re.findall(r'id:\s*"([^"]+)"', config_content))
existing_titles = set(re.findall(r'title:\s*"([^"]+)"', config_content))

print(f"Total existing tools in toolsConfig.ts: {len(existing_ids)}")

user_raw = """
Development & Code Tools
JSON/YAML Linter & Formatter - Checks syntax errors and cleans up nested data structures instantly.
Regex Tester & Visualizer - Tests regular expressions against sample text with real-time match highlighting.
SQL Query Formatter & Optimizer - Cleans messy SQL code and suggests structural improvements.
JWT Decoder & Inspector - Decodes JSON Web Tokens to inspect payload data and expiration times.
Cron Expression Generator - Builds complex cron schedules through an intuitive UI calendar picker.
API Testing Client (REST/GraphQL) - Lightweight browser-based HTTP request sender with headers and body parameters.
CSS Grid & Flexbox Generator - Visual layout builders that output clean, production-ready CSS code.
SVG Path Editor & Optimizer - Minifies SVG code and allows direct node manipulation of vector graphics.
Markdown Live Preview Editor - Splits screen for raw text input and real-time HTML rendering.
Base64 / URL / HTML Encoder - Converts string data securely back and forth without server requests.

Design & Color Utilities
Color Palette Extractor from Image - Uploads an image and pulls a matching hex code color scheme.
Contrast Checker for Accessibility (WCAG) - Tests text and background color pairs against official accessibility standards.
CSS Glassmorphism Generator - Adjusts blur, transparency, and borders to create modern frosted glass UI effects.
CSS Box Shadow Generator - Sliders for depth, spread, and opacity with instant copy-paste code.
Gradient Mesh Creator - Generates smooth, multi-color gradient backgrounds for modern hero sections.
SVG Wave / Blob Generator - Creates custom organic vector shapes and dividers for web design.
Fluid Typography Calculator - Computes CSS clamp() values for responsive font sizing across viewports.
Favicon Generator - Converts a single PNG into multi-resolution icons and manifest files.
Font Pairer and Previewer - Displays Google Font combinations side-by-side with readability tests.
UI Skeleton Screen Generator - Builds animated loading placeholders for custom dashboard layouts.

Security & Network Utilities
SSL Certificate Checker - Inspects a domain’s SSL expiration date, issuer chain, and security protocols.
IP Address & DNS Lookup - Fetches public IP details, geolocation data, and current DNS propagation records.
Password Strength & Entropy Analyzer - Calculates exact time-to-crack estimates for custom passphrases.
Hash Generator (MD5, SHA-256) - Computes cryptographic checksums for text strings and uploaded files locally.
CORS Header Tester - Checks if a target endpoint permits cross-origin resource sharing.
HTTP Headers Inspector - Dumps all response headers returned by a specified web server URL.
Port Checker Tool - Verifies if specific common ports are open on a given host IP address.
URL Redirect Trace Checker - Follows HTTP status codes through multiple redirect hops to final destination.
Subnet Calculator - Computes IPv4 network ranges, broadcast addresses, and usable host counts.
Data Breach Email Checker - Queries public lookup databases to see if an email appears in known leaks.

Document & File Conversion
PDF to Image Converter (Client-Side) - Renders PDF pages into high-res PNG or JPG files directly in-browser.
Image Compressor (PNG/JPEG/WebP) - Reduces file sizes locally using HTML5 canvas without losing visual quality.
HEIC to JPG Converter - Converts Apple image formats into standard web-compatible files.
CSV to JSON / XML Converter - Parses spreadsheet text data into structured hierarchical formats.
Audio Format Transcoder - Converts small audio clips between WAV, MP3, and OGG formats using Web Audio API.
Markdown to PDF Exporter - Compiles formatted text files into downloadable professional document layouts.
EXIF Data Remover - Strips hidden GPS and camera metadata from uploaded personal photos for privacy.
Sprite Sheet Generator - Combines multiple small icons into a single optimized PNG layout.
PDF Page Merger / Splitter - Reorders and extracts specific pages from multi-page document files.
Video to GIF Converter - Clips short video segments into looping animated graphics.

Math, Finance & Utility Calculators
Compound Interest & Retirement Planner - Visualizes long-term asset growth with adjustable annual contributions.
Loan & Mortgage Amortization Schedule - Computes monthly payments, principal breakdowns, and total interest paid.
Crypto Unit & Gas Fee Converter - Translates Wei to Gwei to ETH alongside live fiat conversions.
IP subnet & CIDR Math Tool - Converts binary network notations into standard decimal configurations.
Bandwidth & Download Time Estimator - Calculates transfer duration based on file sizes and connection speeds.
Aspect Ratio Calculator - Scales video or image dimensions proportionally (e.g., 16:9 to custom pixels).
Unit Converter (Advanced Physics/Engineering) - Converts niche metrics like Pascal to PSI or Joules to BTU.
Percentage & Margin Calculator - Computes markup, gross margins, and VAT adjustments instantly.
Timezone Meeting Planner - Aligns business hours across multiple global cities on a visual timeline.
BMI & Body Fat Estimator - Standard biometric tracker with localized metric and imperial toggle options.

SEO & Marketing Helpers
Meta Tag & OpenGraph Inspector - Crawls a URL to preview how a page looks when shared on social media.
Keyword Density Analyzer - Scans pasted text content to highlight overused terms and word counts.
Robots.txt & Sitemap Validator - Checks crawler directives and file structural integrity.
UTM Campaign Link Builder - Generates standardized tracking parameters for clean digital marketing analytics.
SERP Snippet Preview Tool - Tests Google title lengths and meta descriptions against truncation limits.
Readability Score Calculator (Flesch-Kincaid) - Measures text comprehension levels and grade requirements.
Broken Link Checker Script - Scans internal anchor references for HTTP 404 error codes.
H1-H6 Heading Hierarchy Tree - Extracts structural outlines from any public web page URL.
Slug Generator - Converts messy article titles into clean, URL-friendly lowercase strings.
Character & Word Counter with Analytics - Estimates reading time, speaking duration, and syllable counts.

Text & Data Processing
String Case Converter - Switches text between camelCase, snake_case, PascalCase, and kebab-case.
Diff Checker (Text Comparison) - Highlights line-by-line insertions and deletions between two text blocks.
List Sorter & Duplicate Remover - Cleans, alphabetizes, and strips duplicate rows from raw text arrays.
Lorem Ipsum & Dummy Data Generator - Creates structured placeholder text, names, and addresses for mockups.
JSON to TypeScript Interface Generator - Converts raw API payloads into strongly typed frontend definitions.
Text Obfuscator / De-obfuscator - Masks sensitive strings or decodes encoded text blocks.
CSV Row Filter & Query Tool - Applies basic filter logic to tabular data sets inside the browser.
Unicode & Emoji Lookup Table - Searches symbol codes, hex values, and HTML entity equivalents.
Markdown Table Generator - Visual spreadsheet UI that outputs clean markdown tables.
Text Extractor / Line Cleaner - Strips empty lines, trailing whitespaces, and unwanted special characters.

Productivity & Organization
Pomodoro Focus Timer - Customizable countdown timer with break intervals and desktop notification alarms.
Kanban Task Board (LocalStorage) - Drag-and-drop personal project board saved directly to user browser cache.
Markdown Sticky Notes - Quick scratchpad that auto-saves thoughts locally without login requirements.
QR Code Generator with Custom Styling - Encodes text or URLs into downloadable high-res vector QR codes.
Barcode Generator (UPC/EAN/Code128) - Renders retail and inventory tracking barcode graphics instantly.
Random Picker / Wheel Spinner - Interactive decision-making tool for raffles, teams, or random choices.
Habit Tracker Grid - 365-day heat map calendar for tracking daily personal milestones.
Meeting Cost Calculator - Real-time running financial meter based on participant hourly rates.
In-Browser Stopwatch & Lap Splitter - High-precision time recorder with exportable log data.
Simple Markdown Resume Builder - Clean layout builder that prints straight to a formatted PDF.

Science, Engineering & Conversion Helpers
Periodic Table of Elements Inspector - Interactive chemical database with atomic weights and electron configurations.
Resistor Color Code Calculator - Decodes 4-band and 5-band electronic resistance values visually.
Ohm’s Law Calculator - Computes voltage, current, resistance, and power when two values are provided.
Acoustic Frequency Tone Generator - Outputs pure sinusoidal audio frequencies via the Web Audio API.
Pixel to REM / EM Scaler - Converts legacy pixel units to scalable relative font units for web devs.
Data Storage Unit Converter - Converts seamlessly between Megabytes, Gigabytes, Terabytes, and Kibibytes.
Astronomical Date & Julian Day Calculator - Computes time differences and orbital alignment metrics.
Wind Chill & Heat Index Calculator - Combines temperature and humidity metrics into perceived thermal scores.
Concrete & Volume Estimator - Standard construction math tool for cubic yardage calculations.
Gear Ratio & RPM Calculator - Mechanical calculation helper for rotational velocity and torque outputs.
"""

# Parse lines
lines = [l.strip() for l in user_raw.split('\n') if l.strip()]

current_cat = "General"
parsed_tools = []

for line in lines:
    if " - " not in line:
        current_cat = line
    else:
        title, desc = line.split(" - ", 1)
        parsed_tools.append({
            "category": current_cat,
            "title": title.strip(),
            "description": desc.strip()
        })

print(f"Total parsed tools from user prompt: {len(parsed_tools)}")
with open('scratch/user_parsed_tools.json', 'w', encoding='utf-8') as f:
    json.dump(parsed_tools, f, indent=2)
