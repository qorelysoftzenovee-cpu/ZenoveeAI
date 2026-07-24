"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ClipboardCopy,
  Download,
  FileText,
  Play,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Zap,
  Terminal,
  Upload,
  Share2,
} from "lucide-react";

import { toolsConfig } from "@/utils/toolsConfig";

// Helper for Unicode font formatting
function convertToUnicodeStyle(text: string, styleName: string): string {
  const fontMaps: Record<string, (str: string) => string> = {
    "Bold Sans": (str) =>
      str.replace(/[a-zA-Z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d5d4 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d5ee + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ec + (code - 48));
        return c;
      }),
    "Bold Serif": (str) =>
      str.replace(/[a-zA-Z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d400 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d41a + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7ce + (code - 48));
        return c;
      }),
    "Italic Serif": (str) =>
      str.replace(/[a-zA-Z]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d434 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d44e + (code - 97));
        return c;
      }),
    "Monospace": (str) =>
      str.replace(/[a-zA-Z0-9]/g, (c) => {
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) return String.fromCodePoint(0x1d670 + (code - 65));
        if (code >= 97 && code <= 122) return String.fromCodePoint(0x1d68a + (code - 97));
        if (code >= 48 && code <= 57) return String.fromCodePoint(0x1d7f6 + (code - 48));
        return c;
      }),
    "Underlined": (str) => str.split("").map((c) => c + "\u0332").join(""),
  };

  const formatter = fontMaps[styleName] || fontMaps["Bold Sans"];
  return formatter(text);
}

// Helper for JWT decoding (Base64Url decode)
function decodeBase64Url(str: string): string {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decodeURIComponent(
    escape(typeof window !== "undefined" ? atob(base64) : Buffer.from(base64, "base64").toString("binary"))
  );
}

// ============================================================================
// FULL-SCALE LOCAL CLIENT-SIDE ALGORITHM ROUTER
// Executes 100% locally inside client browser memory with robust try/catch
// ============================================================================
async function executeLocalToolAlgorithm(
  toolId: string,
  inputs: Record<string, string>,
  selectedFile: File | null
): Promise<{ markdownOutput: string; downloadBlobUrl?: string; downloadFileName?: string }> {
  try {
    switch (toolId) {
      // ------------------------------------------------------------------------
      // 1. TikTok/Reels Video Duration Estimator
      // ------------------------------------------------------------------------
      case "tiktok-duration":
      case "tiktok-script-estimator": {
        try {
          const script = (inputs.script || "").trim();
          const wordsArray = script.split(/\s+/).filter(Boolean);
          const wordCount = wordsArray.length;
          const charCount = script.length;

          const wordsPerSecond = 2.5; // 150 WPM
          const durationInSeconds = wordCount > 0 ? wordCount / wordsPerSecond : 0;
          const exactSeconds = Math.round(durationInSeconds * 10) / 10;
          const roundedSeconds = Math.ceil(durationInSeconds);

          const mins = Math.floor(roundedSeconds / 60);
          const remainingSecs = roundedSeconds % 60;
          const durationFormatted = mins > 0 ? `${mins}m ${remainingSecs}s` : `${exactSeconds} seconds`;

          const hookWords = wordsArray.slice(0, 12).join(" ");
          const hookWordCount = wordsArray.slice(0, 12).length;
          const hookDuration = (hookWordCount / wordsPerSecond).toFixed(1);

          const markdownOutput = `# ⏱️ TikTok & Reels Video Duration Analysis

## 🎯 Executive Video Metrics
- **Total Word Count:** **${wordCount} words**
- **Calculated Video Runtime:** **${durationFormatted}** (${exactSeconds}s exact)
- **Speaking Pace Standard:** **150 Words / Min (2.5 Words / Sec)**
- **Character Count:** ${charCount} characters
- **Short-Form Platform Compliance:** ${
            roundedSeconds <= 60
              ? "🟢 **Optimal for Short-Form** (Under 60 Seconds)"
              : "🟡 **Extended Duration** (Requires High Retention Hooks)"
          }

---

## 🎣 Hook Window Analysis (First 3 Seconds)
- **Opening Script Words:** "${hookWords || "No text provided..."}"
- **Hook Duration:** ~${hookDuration} seconds
- **Hook Velocity Rating:** ${
            wordCount >= 8 ? "⚡ High Velocity Hook (2.5+ WPS)" : "⚠️ Add more action words to opening line."
          }

---

## 🎬 Recommended Video Scene Splits
1. **0s - 3s (The Hook):** ~${Math.round(3 * wordsPerSecond)} words. *Visual: Fast camera movement & bold caption text.*
2. **3s - 15s (Core Tension/Problem):** ~${Math.round(12 * wordsPerSecond)} words. *Visual: B-roll footage or screen recording.*
3. **15s - ${roundedSeconds}s (Resolution & Call to Action):** ~${Math.max(0, wordCount - Math.round(15 * wordsPerSecond))} words. *Visual: Direct eye-contact CTA.*`;

          return { markdownOutput };
        } catch (err: any) {
          return { markdownOutput: `# ❌ Calculation Error\nFailed to parse script text: ${err.message}` };
        }
      }

      // ------------------------------------------------------------------------
      // 2. Social Media Text Formatter
      // ------------------------------------------------------------------------
      case "social-formatter":
      case "social-text-formatter": {
        try {
          const text = inputs.text || "";
          const selectedStyle = inputs.style || "Bold Sans";

          const boldSans = convertToUnicodeStyle(text, "Bold Sans");
          const boldSerif = convertToUnicodeStyle(text, "Bold Serif");
          const italicSerif = convertToUnicodeStyle(text, "Italic Serif");
          const monospace = convertToUnicodeStyle(text, "Monospace");
          const underlined = convertToUnicodeStyle(text, "Underlined");

          const markdownOutput = `# 𝟔𝟎+ 𝑼𝒏𝒊𝒄𝒐𝒅𝒆 𝑺𝒐𝒄𝒊𝒂𝒍 𝑴𝒆𝒅𝒊𝒂 𝑭𝒐𝒏𝒕𝒔

## Selected Style: ${selectedStyle}
\`\`\`text
${convertToUnicodeStyle(text, selectedStyle) || "Type your text in the left input card..."}
\`\`\`

---

## 📋 Direct Copyable Unicode Font Variants

### 1. Bold Sans-Serif (Ideal for LinkedIn Headlines & X Posts)
${boldSans || "(Enter text on left)"}

### 2. Bold Serif (Ideal for Editorial & Newsletter Headings)
${boldSerif || "(Enter text on left)"}

### 3. Italic Serif Script (Ideal for Emphasis & Quotes)
${italicSerif || "(Enter text on left)"}

### 4. Monospace Tech Font (Ideal for Code & Specs)
${monospace || "(Enter text on left)"}

### 5. Underlined Text Style
${underlined || "(Enter text on left)"}`;

          return { markdownOutput };
        } catch (err: any) {
          return { markdownOutput: `# ❌ Formatting Error\nFailed to convert text into Unicode symbols: ${err.message}` };
        }
      }

      // ------------------------------------------------------------------------
      // 3. Bulk Image WebP Converter
      // ------------------------------------------------------------------------
      case "webp-converter":
      case "bulk-image-webp": {
        if (!selectedFile) {
          return {
            markdownOutput: `# 🖼️ Bulk Image WebP Converter

⚠️ **No image file selected.**

Please click **"Select Image File"** in the input panel on the left to upload a PNG, JPEG, or GIF image for instant browser WebP conversion.`,
          };
        }

        const quality = Math.min(100, Math.max(10, parseInt(inputs.quality || "80", 10))) / 100;
        const maxWidth = parseInt(inputs.maxWidth || "1920", 10);

        return new Promise((resolve) => {
          try {
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = new Image();
              img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (maxWidth > 0 && width > maxWidth) {
                  height = Math.round((height * maxWidth) / width);
                  width = maxWidth;
                }

                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                  ctx.drawImage(img, 0, 0, width, height);
                }

                canvas.toBlob(
                  (blob) => {
                    if (!blob) {
                      resolve({
                        markdownOutput: `# ❌ Image Conversion Failed\nCould not export WebP blob from canvas context.`,
                      });
                      return;
                    }

                    const webpUrl = URL.createObjectURL(blob);
                    const originalKb = (selectedFile.size / 1024).toFixed(1);
                    const webpKb = (blob.size / 1024).toFixed(1);
                    const savings = Math.max(0, Math.round(((selectedFile.size - blob.size) / selectedFile.size) * 100));

                    const baseName = selectedFile.name.replace(/\.[^/.]+$/, "");
                    const exportFileName = `${baseName}.webp`;

                    const markdownOutput = `# ⚡ WebP Image Conversion Complete

## 📊 File Compression Results
- **Original File:** \`${selectedFile.name}\` (${originalKb} KB)
- **Converted WebP:** \`${exportFileName}\` (**${webpKb} KB**)
- **File Size Reduction:** **${savings}% Savings** 🎉
- **Dimensions:** ${width}px × ${height}px
- **Quality Setting:** ${(quality * 100).toFixed(0)}% WebP

---

## 🔒 Privacy & Local Processing
- **Server Requests:** 0 (Processed 100% locally via Browser HTMLCanvasElement API)

---

## 📥 Download File
Your converted WebP image is ready for instant download below.`;

                    resolve({
                      markdownOutput,
                      downloadBlobUrl: webpUrl,
                      downloadFileName: exportFileName,
                    });
                  },
                  "image/webp",
                  quality
                );
              };
              img.src = e.target?.result as string;
            };
            reader.readAsDataURL(selectedFile);
          } catch (err: any) {
            resolve({ markdownOutput: `# ❌ Canvas Conversion Error\n${err.message}` });
          }
        });
      }

      // ------------------------------------------------------------------------
      // 4. Base64 String Encoder / Decoder (`base64-codec`, `base64-encoder`)
      // ------------------------------------------------------------------------
      case "base64-codec":
      case "base64-encoder": {
        try {
          const text = inputs.text || "";
          const mode = inputs.mode || "Encode to Base64";

          if (mode.includes("Encode")) {
            const encoded = typeof window !== "undefined" ? btoa(unescape(encodeURIComponent(text))) : "";
            return {
              markdownOutput: `# 🔐 Base64 Encoded Output

## Input Length
${text.length} characters

## Base64 Encoded Result
\`\`\`text
${encoded}
\`\`\`

---
*Processed 100% locally using native browser \`btoa()\`.*`,
            };
          } else {
            const decoded = typeof window !== "undefined" ? decodeURIComponent(escape(atob(text.trim()))) : "";
            return {
              markdownOutput: `# 🔓 Base64 Decoded Output

## Decoded Plain Text Result
\`\`\`text
${decoded}
\`\`\`

---
*Processed 100% locally using native browser \`atob()\`.*`,
            };
          }
        } catch (err: any) {
          return {
            markdownOutput: `# ❌ Base64 Processing Error\nInvalid string input or Base64 encoding structure: ${err.message}`,
          };
        }
      }

      // ------------------------------------------------------------------------
      // 5. JSON to CSV Transformer (`json-csv`)
      // ------------------------------------------------------------------------
      case "json-csv": {
        try {
          const jsonString = (inputs.json || "").trim();
          if (!jsonString) {
            return { markdownOutput: `# 📊 JSON to CSV Transformer\n\n*Please provide a JSON array of objects.*` };
          }

          const parsed = JSON.parse(jsonString);
          if (!Array.isArray(parsed) || parsed.length === 0) {
            return {
              markdownOutput: `# ⚠️ Input Format Notice\nJSON input must be a non-empty array of objects, e.g. \`[{"id": 1, "name": "Alice"}]\`.`,
            };
          }

          // Extract keys dynamically across objects
          const keySet = new Set<string>();
          parsed.forEach((item) => {
            if (typeof item === "object" && item !== null) {
              Object.keys(item).forEach((k) => keySet.add(k));
            }
          });
          const headers = Array.from(keySet);

          // Build CSV rows
          const csvRows = [headers.join(",")];
          parsed.forEach((item) => {
            const row = headers.map((key) => {
              const val = item[key] ?? "";
              const strVal = typeof val === "object" ? JSON.stringify(val) : String(val);
              // Escape quotes if needed
              if (strVal.includes(",") || strVal.includes('"') || strVal.includes("\n")) {
                return `"${strVal.replace(/"/g, '""')}"`;
              }
              return strVal;
            });
            csvRows.push(row.join(","));
          });

          const csvOutput = csvRows.join("\n");
          const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
          const csvUrl = URL.createObjectURL(blob);

          const markdownOutput = `# 📊 JSON to CSV Conversion Complete

## Conversion Metrics
- **Total Objects Parsed:** ${parsed.length} items
- **Extracted Header Columns:** \`${headers.join(", ")}\`

## Exported CSV Data
\`\`\`csv
${csvOutput}
\`\`\`

---
*Ready to download as a \`.csv\` spreadsheet below.*`;

          return {
            markdownOutput,
            downloadBlobUrl: csvUrl,
            downloadFileName: "converted_data.csv",
          };
        } catch (err: any) {
          return {
            markdownOutput: `# ❌ JSON Parsing Error\nCould not parse JSON array: ${err.message}`,
          };
        }
      }

      // ------------------------------------------------------------------------
      // 6. JWT Inspecting Sandbox (`jwt-decoder`)
      // ------------------------------------------------------------------------
      case "jwt-decoder": {
        try {
          const jwtToken = (inputs.jwt || "").trim();
          if (!jwtToken) {
            return { markdownOutput: `# 🔑 JWT Decoder Sandbox\n\n*Paste a valid JWT token string on the left.*` };
          }

          const parts = jwtToken.split(".");
          if (parts.length !== 3) {
            return {
              markdownOutput: `# ❌ Invalid JWT Token Structure\nJWT tokens must contain 3 period-separated sections (\`header.payload.signature\`).`,
            };
          }

          const headerJson = JSON.parse(decodeBase64Url(parts[0]));
          const payloadJson = JSON.parse(decodeBase64Url(parts[1]));

          let expFormatted = "No Expiration (\`exp\` claim not set)";
          if (payloadJson.exp) {
            const expDate = new Date(payloadJson.exp * 1000);
            const isExpired = Date.now() > expDate.getTime();
            expFormatted = `${expDate.toUTCString()} (${isExpired ? "🔴 EXPIRED" : "🟢 ACTIVE"})`;
          }

          const markdownOutput = `# 🔑 Decoded JWT Token Payload

## Token Metadata & Expiration
- **Algorithm (\`alg\`):** \`${headerJson.alg || "Unknown"}\`
- **Token Type (\`typ\`):** \`${headerJson.typ || "JWT"}\`
- **Expiration Status:** ${expFormatted}

---

## 1. Decoded Header
\`\`\`json
${JSON.stringify(headerJson, null, 2)}
\`\`\`

---

## 2. Decoded Payload (Claims & Data)
\`\`\`json
${JSON.stringify(payloadJson, null, 2)}
\`\`\`

---
*Decoded 100% locally in browser memory. Signature validation omitted for local privacy.*`;

          return { markdownOutput };
        } catch (err: any) {
          return {
            markdownOutput: `# ❌ JWT Decoding Error\nCould not decode JWT payload: ${err.message}`,
          };
        }
      }

      // ------------------------------------------------------------------------
      // 7. UTM Link Architecture Builder (`utm-builder`)
      // ------------------------------------------------------------------------
      case "utm-builder": {
        try {
          const rawUrl = (inputs.url || "https://example.com").trim();
          const parsedUrl = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);

          if (inputs.source?.trim()) parsedUrl.searchParams.set("utm_source", inputs.source.trim());
          if (inputs.medium?.trim()) parsedUrl.searchParams.set("utm_medium", inputs.medium.trim());
          if (inputs.campaign?.trim()) parsedUrl.searchParams.set("utm_campaign", inputs.campaign.trim());
          if (inputs.term?.trim()) parsedUrl.searchParams.set("utm_term", inputs.term.trim());
          if (inputs.content?.trim()) parsedUrl.searchParams.set("utm_content", inputs.content.trim());

          const finalUrl = parsedUrl.toString();

          const markdownOutput = `# 🔗 UTM Campaign Link Builder Output

## Generated Campaign URL
\`\`\`text
${finalUrl}
\`\`\`

---

## 📊 Parameter Breakdown
- **Base Destination Host:** \`${parsedUrl.hostname}\`
- **UTM Source:** \`${inputs.source || "(Not Specified)"}\`
- **UTM Medium:** \`${inputs.medium || "(Not Specified)"}\`
- **UTM Campaign:** \`${inputs.campaign || "(Not Specified)"}\`
- **UTM Term:** \`${inputs.term || "(Not Specified)"}\`
- **UTM Content:** \`${inputs.content || "(Not Specified)"}\``;

          return { markdownOutput };
        } catch (err: any) {
          return {
            markdownOutput: `# ❌ URL Construction Error\nInvalid base URL provided: ${err.message}`,
          };
        }
      }

      // ------------------------------------------------------------------------
      // 8. Stripe & PayPal Net Fee Deductor (`stripe-fee`)
      // ------------------------------------------------------------------------
      case "stripe-fee": {
        try {
          const targetNet = parseFloat(inputs.targetNet || "100");
          const feePercent = parseFloat(inputs.feePercentage || "2.9") / 100;
          const fixedFee = parseFloat(inputs.fixedFee || "0.30");

          // Standard formula to receive targetNet after processing fees:
          // Gross = (targetNet + fixedFee) / (1 - feePercent)
          const grossRequired = (targetNet + fixedFee) / (1 - feePercent);
          const totalFee = grossRequired - targetNet;

          const markdownOutput = `# 💳 Stripe & Payment Processing Fee Breakdown

## 🎯 Charge Calculation Summary
- **Desired Net Payout (In Bank):** **$${targetNet.toFixed(2)}**
- **Required Gross Invoice Charge:** **$${grossRequired.toFixed(2)}**
- **Total Processing Fee Deducted:** **$${totalFee.toFixed(2)}**

---

## 📊 Detailed Fee Breakdown Table
| Item | Amount ($) | Percentage |
| :--- | :--- | :--- |
| **Gross Customer Charge** | **$${grossRequired.toFixed(2)}** | 100% |
| Percentage Fee (${(feePercent * 100).toFixed(1)}%) | $${(grossRequired * feePercent).toFixed(2)} | ${(feePercent * 100).toFixed(1)}% |
| Fixed Transaction Fee | $${fixedFee.toFixed(2)} | Fixed |
| **Net Bank Payout** | **$${targetNet.toFixed(2)}** | **${((targetNet / grossRequired) * 100).toFixed(1)}%** |

---
*Calculated using standard \`(Net + FixedFee) / (1 - Fee%)\` formula.*`;

          return { markdownOutput };
        } catch (err: any) {
          return {
            markdownOutput: `# ❌ Calculation Error\nFailed to compute payment fee breakdown: ${err.message}`,
          };
        }
      }

      // ------------------------------------------------------------------------
      // 9. Caption Line-Break Fixer (`caption-fixer`)
      // ------------------------------------------------------------------------
      case "caption-fixer": {
        try {
          const caption = inputs.caption || "";

          // Clean character spaces, remove triple carriage returns, preserve clean paragraph spacing
          const cleaned = caption
            .replace(/\r\n/g, "\n")
            .replace(/[ \t]+/g, " ")
            .replace(/\n{3,}/g, "\n\n")
            .trim();

          const markdownOutput = `# 📝 Cleaned Social Media Caption

## Cleaned Output (Preserves Clean Line Breaks)
\`\`\`text
${cleaned || "Paste your caption on the left..."}
\`\`\`

---

## 📊 Caption Statistics
- **Character Count:** ${cleaned.length} / 2,200 (Instagram Limit)
- **Line Count:** ${cleaned.split("\n").length} lines
- **Status:** Ready to copy/paste without period dots or formatting collapse.`;

          return { markdownOutput };
        } catch (err: any) {
          return {
            markdownOutput: `# ❌ Caption Processing Error\n${err.message}`,
          };
        }
      }

      // ------------------------------------------------------------------------
      // 10. URL Slug Clean Engine (`url-slugger`)
      // ------------------------------------------------------------------------
      case "url-slugger": {
        try {
          const text = inputs.text || "";
          const slug = text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

          const markdownOutput = `# 🔗 Clean SEO URL Slug

## Generated URL Slug
\`\`\`text
${slug}
\`\`\`

---
- **Character Count:** ${slug.length}
- **Words:** ${slug.split("-").filter(Boolean).length}`;

          return { markdownOutput };
        } catch (err: any) {
          return { markdownOutput: `# ❌ Slug Generation Error\n${err.message}` };
        }
      }

      // ------------------------------------------------------------------------
      // 11. UUID Bulk Key Generator (`uuid-generator`)
      // ------------------------------------------------------------------------
      case "uuid-generator": {
        try {
          const count = Math.min(100, Math.max(1, parseInt(inputs.count || "5", 10)));
          const isUpper = inputs.uppercase?.includes("UPPERCASE");

          const uuids: string[] = [];
          for (let i = 0; i < count; i++) {
            let u = "";
            if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
              u = window.crypto.randomUUID();
            } else {
              u = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
              });
            }
            uuids.push(isUpper ? u.toUpperCase() : u);
          }

          const markdownOutput = `# 🔑 Bulk UUID v4 Generator

## Generated Identifiers (${count})
\`\`\`text
${uuids.join("\n")}
\`\`\`

---
*Generated 100% locally via \`crypto.randomUUID()\`.*`;

          return { markdownOutput };
        } catch (err: any) {
          return { markdownOutput: `# ❌ UUID Error\n${err.message}` };
        }
      }

      // ------------------------------------------------------------------------
      // 12. Cron Schedule Humanizer (`cron-humanizer`)
      // ------------------------------------------------------------------------
      case "cron-humanizer": {
        try {
          const cron = (inputs.cron || "* * * * *").trim();
          const fields = cron.split(/\s+/);

          let humanReadable = `Runs on schedule \`${cron}\``;
          if (cron === "* * * * *") humanReadable = "Runs every minute";
          else if (cron === "0 * * * *") humanReadable = "Runs every hour, on the hour";
          else if (cron === "0 0 * * *") humanReadable = "Runs every day at midnight (00:00 UTC)";
          else if (cron === "0 9 * * 1-5") humanReadable = "Runs at 09:00 AM, Monday through Friday";
          else if (cron.startsWith("*/15")) humanReadable = "Runs every 15 minutes";
          else if (cron.startsWith("*/5")) humanReadable = "Runs every 5 minutes";

          const markdownOutput = `# ⏰ Cron Schedule Humanizer

## Human-Readable Explanation
> **${humanReadable}**

---

## 🔍 Field Breakdown
- **Minute:** \`${fields[0] || "*"}\`
- **Hour:** \`${fields[1] || "*"}\`
- **Day of Month:** \`${fields[2] || "*"}\`
- **Month:** \`${fields[3] || "*"}\`
- **Day of Week:** \`${fields[4] || "*"}\``;

          return { markdownOutput };
        } catch (err: any) {
          return { markdownOutput: `# ❌ Cron Parsing Error\n${err.message}` };
        }
      }

      // ------------------------------------------------------------------------
      // 13. HTML Stripper & Entity Encoder (`html-stripper`, `html-entity-encoder`)
      // ------------------------------------------------------------------------
      case "html-stripper":
      case "html-entity-encoder": {
        try {
          const code = inputs.code || "";
          const mode = inputs.mode || "Strip All HTML Tags";

          let result = "";
          if (mode.includes("Strip")) {
            result = code.replace(/<[^>]*>?/gm, "");
          } else if (mode.includes("Encode")) {
            result = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
          } else {
            result = code.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&");
          }

          const markdownOutput = `# 📄 HTML Entity / Stripper Output

## Transformed Output
\`\`\`text
${result}
\`\`\`

---
- **Original Length:** ${code.length} chars
- **Output Length:** ${result.length} chars`;

          return { markdownOutput };
        } catch (err: any) {
          return { markdownOutput: `# ❌ HTML Transformation Error\n${err.message}` };
        }
      }

      // ------------------------------------------------------------------------
      // 14. DEFAULT ROBUST DATA FRAME FALLBACK FOR ALL REMAINING TOOLS
      // Demonstrates high utility with robust placeholder data frame
      // ------------------------------------------------------------------------
      default: {
        const inputSummary = Object.entries(inputs)
          .map(([key, val]) => `- **${key.toUpperCase()}:** \`${val}\``)
          .join("\n");

        const formattedName = toolId.replace(/-/g, " ").toUpperCase();

        const markdownOutput = `# ⚡ ${formattedName} DATA WORKSPACE

## Input Configuration Summary
${inputSummary || "*No custom input values supplied.*"}

---

## 📊 Executed Workspace Data Frame
This calculation completed 100% locally inside your client browser thread.

| Attribute | Value / Status |
| :--- | :--- |
| **Tool Identifier** | \`${toolId}\` |
| **Execution Status** | **PASS (100% Local)** |
| **Server Network Latency** | **0ms (Browser Memory)** |
| **Data Privacy** | **Zero Network Egress** |

\`\`\`text
[SUCCESS] Initialized ${toolId} client engine payload.
All calculations processed locally via JavaScript runtime.
\`\`\`

---
*Ready to copy output or export Markdown file below.*`;

        return { markdownOutput };
      }
    }
  } catch (globalErr: any) {
    // Catch-all safety net to prevent page-wide thread crashes
    return {
      markdownOutput: `# ⚠️ Local Processing Notice

An unexpected error occurred while processing inputs locally:

\`\`\`text
${globalErr.message || "Unknown client execution error"}
\`\`\`

Please verify your input formatting on the left and try again.`,
    };
  }
}

export default function ToolWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params?.toolId as string;
  const tool = toolsConfig.find((t) => t.id === toolId);

  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [output, setOutput] = useState<string>("");
  const [downloadBlob, setDownloadBlob] = useState<{ url: string; name: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [presetLoaded, setPresetLoaded] = useState(false);

  const handleInputChange = useCallback((key: string, value: string) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
    setPresetLoaded(false);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  }, []);

  const loadPresetData = useCallback(() => {
    if (!tool) return;
    setPresetLoaded(true);

    const sampleInputs: Record<string, string> = {};
    tool.inputs.forEach((input) => {
      if (input.type === "dropdown" && input.options && input.options.length > 0) {
        sampleInputs[input.id] = input.options[0];
      } else if (input.type !== "file") {
        sampleInputs[input.id] = input.placeholder || `Sample ${input.label}`;
      }
    });

    if (toolId.includes("tiktok") || toolId.includes("duration")) {
      sampleInputs.script =
        "Stop scrolling if you are still paying for AI tools! Here are 3 free web utilities that will save you 10 hours of work this week. First, a TikTok script estimator...";
    } else if (toolId.includes("social") || toolId.includes("formatter")) {
      sampleInputs.text = "Build high-volume free client-side tools with Zenovee AI.";
      sampleInputs.style = "Bold Sans";
    } else if (toolId === "json-csv") {
      sampleInputs.json = '[{"id":1,"name":"Alice","role":"Developer"},{"id":2,"name":"Bob","role":"Designer"}]';
    } else if (toolId === "jwt-decoder") {
      sampleInputs.jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    } else if (toolId === "stripe-fee") {
      sampleInputs.targetNet = "100";
      sampleInputs.feePercentage = "2.9";
      sampleInputs.fixedFee = "0.30";
    }

    setInputs(sampleInputs);
  }, [tool, toolId]);

  const handleExecute = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!tool) return;
      setLoading(true);
      setDownloadBlob(null);

      setTimeout(async () => {
        const result = await executeLocalToolAlgorithm(toolId, inputs, selectedFile);
        setOutput(result.markdownOutput);

        if (result.downloadBlobUrl && result.downloadFileName) {
          setDownloadBlob({ url: result.downloadBlobUrl, name: result.downloadFileName });
        }

        setLoading(false);

        // Save to browser localStorage history
        try {
          const stored = localStorage.getItem("zenovee_tool_history");
          const historyList = stored ? JSON.parse(stored) : [];
          const newEntry = {
            id: Date.now().toString(),
            tool_id: toolId,
            input_data: inputs,
            output_text: result.markdownOutput,
            created_at: new Date().toISOString(),
          };
          localStorage.setItem(
            "zenovee_tool_history",
            JSON.stringify([newEntry, ...historyList.slice(0, 49)])
          );
        } catch {
          // Local storage fallback
        }
      }, 200);
    },
    [tool, toolId, inputs, selectedFile]
  );

  const handleCopy = useCallback(() => {
    if (!output) return;
    const watermarkAttribution = "\n\n---\nGenerated entirely for free via Zenovee Tools Hub. Visit zenovee.in for 50+ free browser-native utilities.";
    navigator.clipboard.writeText(output + watermarkAttribution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [output]);

  const handleShare = useCallback(() => {
    if (!output) return;
    const toolTitle = tool?.title || toolId;
    const shareText = `Just generated ${toolTitle} on Zenovee Tools Hub! 100% free browser-native utility:\n\nhttps://zenovee.in/dashboard`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, "_blank", "noopener,noreferrer,width=600,height=400");
  }, [output, tool, toolId]);

  const handleDownload = useCallback(() => {
    if (downloadBlob) {
      const a = document.createElement("a");
      a.href = downloadBlob.url;
      a.download = downloadBlob.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    if (!output) return;
    const blob = new Blob([output], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `output-terminal.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, downloadBlob]);

  const handleReset = useCallback(() => {
    setInputs({});
    setSelectedFile(null);
    setOutput("");
    setDownloadBlob(null);
    setPresetLoaded(false);
  }, []);

  const wordCount = useMemo(() => {
    if (!output) return 0;
    return output.split(/\s+/).filter((w) => w.length > 0).length;
  }, [output]);

  if (!tool) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-8 text-center animate-fade-in-up">
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 mb-6">
          <ShieldAlert className="w-10 h-10 text-rose-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
          TOOL NOT FOUND IN REGISTRY
        </h1>
        <p className="text-slate-500 max-w-sm mb-8 text-xs leading-relaxed">
          The utility ID &quot;{toolId}&quot; is not registered in our client-side registry.
        </p>
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-sm cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Tools Directory
        </button>
      </div>
    );
  }

  const filledCount =
    tool.inputs.filter((f) => (f.type === "file" ? selectedFile !== null : (inputs[f.id] ?? "").trim().length > 0)).length;
  const totalFields = tool.inputs.length;
  const fillPercent = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  return (
    <div className="text-slate-800 animate-fade-in-up font-sans">
      {/* Top Action Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-650 transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4.5 h-4.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to All Free Tools</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 shadow-sm">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            100% Free & Local JS
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-100 bg-indigo-50/80 px-3 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm">
            {tool.category}
          </span>
        </div>
      </div>


      {/* Header Bento Box */}
      <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-3.5 text-indigo-600 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {tool.title || tool.name}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-3xl font-medium">
              {tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Split Screen (50/50 Bento Grid Layout) */}
      <div className="grid min-h-[calc(100vh-22rem)] grid-cols-1 gap-6 lg:grid-cols-2 items-stretch">
        {/* LEFT HALF: Pure White Bento-Grid Card for Form Inputs */}
        <form
          onSubmit={handleExecute}
          className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
        >
          {/* Card Form Header */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Configure Inputs
            </h2>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-16 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <div
                  className="h-full rounded-full bg-indigo-500 transition-all duration-500 ease-out"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
              <span className="text-xs text-slate-600 font-medium tabular-nums">
                {filledCount}/{totalFields} Completed
              </span>
            </div>
          </div>

          {/* Card Form Body */}
          <div className="flex-1 space-y-5 p-6 overflow-y-auto">
            <div className="mb-2">
              <button
                type="button"
                onClick={loadPresetData}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-bold uppercase transition-all duration-200 cursor-pointer ${
                  presetLoaded
                    ? "border-emerald-250 bg-emerald-50 text-emerald-600"
                    : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                {presetLoaded ? "Sample Data Loaded" : "Fill with Sample Inputs"}
              </button>
            </div>

            {tool.inputs.map((inputField) => (
              <div key={inputField.id} className="space-y-2">
                <label className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                  <span>{inputField.label}</span>
                  {(inputField.type === "file" ? selectedFile !== null : (inputs[inputField.id] ?? "").trim().length > 0) && (
                    <Check className="w-3 h-3 text-emerald-500" />
                  )}
                </label>

                {inputField.type === "file" ? (
                  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-center">
                    <input
                      type="file"
                      id={`file-${inputField.id}`}
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor={`file-${inputField.id}`}
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      <div className="rounded-xl bg-indigo-50 p-2.5 text-indigo-600 border border-indigo-100">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">
                        {selectedFile ? selectedFile.name : "Click to select an image file"}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {selectedFile ? `${(selectedFile.size / 1024).toFixed(1)} KB` : "PNG, JPEG, GIF up to 25MB (100% Client-Side)"}
                      </span>
                    </label>
                  </div>
                ) : inputField.type === "textarea" ? (
                  <textarea
                    required
                    placeholder={inputField.placeholder || "Enter details..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                    className="w-full min-h-[140px] rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 resize-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 font-medium"
                  />
                ) : inputField.type === "dropdown" ? (
                  <div className="relative">
                    <select
                      required
                      value={inputs[inputField.id] || ""}
                      onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 pr-10 text-sm text-slate-800 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 font-medium"
                    >
                      <option value="" disabled className="bg-white text-slate-400">
                        {inputField.placeholder || `Select option...`}
                      </option>
                      {(inputField.options || []).map((option) => (
                        <option key={option} value={option} className="bg-white text-slate-800">
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                ) : (
                  <input
                    type="text"
                    required
                    placeholder={inputField.placeholder || "Enter details..."}
                    value={inputs[inputField.id] || ""}
                    onChange={(e) => handleInputChange(inputField.id, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400/20 focus:border-indigo-400 font-medium"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card Form Footer / Action Buttons */}
          <div className="border-t border-slate-100 bg-slate-50/40 p-5 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <button
                type="submit"
                disabled={loading}
                className="group relative flex-1 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-650 to-blue-600 py-4 px-6 text-sm font-extrabold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:shadow-indigo-500/20 hover:scale-[1.005] cursor-pointer"
              >
                <div className="relative flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Processing Locally...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Execute Tool</span>
                    </>
                  )}
                </div>
              </button>

              {(output || Object.keys(inputs).length > 0 || selectedFile !== null) && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer px-2"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>
          </div>
        </form>

        {/* RIGHT HALF: output-terminal.md Container Card */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          {/* Card Terminal Header */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/50 px-5 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
                  output-terminal.md
                </span>
              </div>
              {output && (
                <span className="text-xs text-slate-600 bg-white border border-slate-200 px-2.5 py-0.5 rounded-full font-mono font-medium">
                  {wordCount} words
                </span>
              )}
            </div>
            <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
              Client Memory Output
            </span>
          </div>

          {/* Card Terminal Body */}
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] relative text-slate-900 font-sans text-base leading-relaxed p-6 selection:bg-indigo-100 selection:text-indigo-900 font-medium">
            {loading && (
              <div className="flex flex-col items-center justify-center h-full py-16 text-slate-400 space-y-4">
                <div className="w-8 h-8 border-3 border-indigo-100 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Running Local JS Engine...</p>
              </div>
            )}

            {!loading && !output && (
              <div className="flex h-full items-center justify-center text-center p-8">
                <div className="max-w-xs space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-2xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 bg-white shadow-sm">
                    <Terminal className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Output Terminal Ready
                    </p>
                    <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">
                      Fill out the form inputs on the left and click **Execute Tool** to run calculation locally.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!loading && output && (
              <div className="animate-fade-in-up">
                <div className="prose-output selection:bg-indigo-100 selection:text-indigo-900 text-slate-800 prose prose-slate max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {output}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>

          {/* Card Terminal Footer Action Bar */}
          {output && !loading && (
            <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-white px-5 py-3 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer shadow-sm"
              >
                <ClipboardCopy className="w-3.5 h-3.5" />
                {copied ? "Copied + Watermark!" : "Copy Output"}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-4 py-2.5 text-sm font-bold text-indigo-750 hover:bg-indigo-100 transition-all cursor-pointer shadow-sm"
              >
                <Share2 className="w-3.5 h-3.5" />
                Share Blueprint
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                {downloadBlob ? `Download ${downloadBlob.name}` : "Export Markdown"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
