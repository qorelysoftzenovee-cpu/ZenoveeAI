import re

content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

fixes = 0

# Fix 1: Remove the /s flag from regex in markdown-to-html case
# .replace(/(<li>.*<\/li>)/s,'<ul>$1</ul>')  →  just remove the wrapping (it won't be perfect but compiles)
if "(<li>.*<\\/li>)/s,'<ul>$1</ul>')" in content:
    content = content.replace(
        "(<li>.*<\\/li>)/s,'<ul>$1</ul>')",
        "(<li>[\\s\\S]*?<\\/li>),'<ul>$1<\\/ul>')"
    )
    fixes += 1
    print("Fixed /s regex flag in markdown-to-html")

# Fix 2: Also catch the raw version (with actual angle brackets unescaped)
if "(<li>.*</li>)/s,'<ul>$1</ul>')" in content:
    content = content.replace(
        "(<li>.*</li>)/s,'<ul>$1</ul>')",
        "(<li>[\\s\\S]*?</li>),'<ul>$1</ul>')"
    )
    fixes += 1
    print("Fixed /s regex flag (raw) in markdown-to-html")

# Also check for any /s flag regex that TypeScript might flag
import re as re_module
pattern = re_module.compile(r'/[^/]+/s[gim]*,')
matches = list(pattern.finditer(content))
if matches:
    print(f"Found {len(matches)} /s flag regex(es):")
    for m in matches:
        print(f"  At {m.start()}: {repr(m.group()[:80])}")

open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
print(f"Applied {fixes} fix(es). Done.")
