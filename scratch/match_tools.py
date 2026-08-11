import re
import json

# Read toolsConfig
content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()

# Extract existing tools: id, title, category, description
existing_tools = []
tool_blocks = re.findall(r'\{\s*id:\s*"([^"]+)".*?title:\s*"([^"]+)".*?category:\s*"([^"]+)".*?description:\s*"([^"]+)"', content, re.DOTALL)

for tid, title, cat, desc in tool_blocks:
    existing_tools.append({
        "id": tid,
        "title": title,
        "category": cat,
        "description": desc
    })

with open('scratch/user_parsed_tools.json', 'r', encoding='utf-8') as f:
    user_tools = json.load(f)

matched = []
unmatched = []

for ut in user_tools:
    ut_title_lower = ut["title"].lower()
    
    found_match = None
    for et in existing_tools:
        et_title_lower = et["title"].lower()
        et_id_lower = et["id"].lower()
        
        # Check title overlap or key terms
        if (ut_title_lower in et_title_lower or et_title_lower in ut_title_lower or
            ut_title_lower.replace(" & ", " ").replace(" / ", " ") in et_title_lower.replace(" & ", " ").replace(" / ", " ")):
            found_match = et
            break
        
        # Check specific key phrase matches
        ut_words = set(re.findall(r'\w+', ut_title_lower)) - {"and", "or", "for", "the", "tool", "generator", "calculator", "checker", "converter", "builder", "inspector", "suite"}
        et_words = set(re.findall(r'\w+', et_title_lower + " " + et_id_lower)) - {"and", "or", "for", "the", "tool", "generator", "calculator", "checker", "converter", "builder", "inspector", "suite"}
        
        common = ut_words.intersection(et_words)
        if len(common) >= 2 or (len(common) == 1 and list(common)[0] in ["json", "jwt", "cron", "pdf", "svg", "utm", "serp", "qr", "gpa", "fire", "bmi", "whois", "cidr", "htaccess", "yaml", "lottie", "ocr"]):
            found_match = et
            break

    if found_match:
        matched.append({"user_tool": ut["title"], "matched_existing": found_match["title"], "id": found_match["id"]})
    else:
        unmatched.append(ut)

print(f"Existing count: {len(existing_tools)}")
print(f"User total count: {len(user_tools)}")
print(f"Matched tools count: {len(matched)}")
print(f"Unmatched (New) tools count: {len(unmatched)}")

with open('scratch/missing_tools.json', 'w', encoding='utf-8') as f:
    json.dump(unmatched, f, indent=2)

with open('scratch/matched_tools.json', 'w', encoding='utf-8') as f:
    json.dump(matched, f, indent=2)
