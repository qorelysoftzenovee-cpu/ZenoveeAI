import json

with open('scratch/matched_tools.json', 'r', encoding='utf-8') as f:
    matched = json.load(f)

with open('scratch/missing_tools.json', 'r', encoding='utf-8') as f:
    missing = json.load(f)

print("--- ALREADY IN WEBSITE (MATCHED: %d) ---" % len(matched))
for m in matched:
    print(f"  Existing: [{m['id']}] {m['matched_existing']} <== User: '{m['user_tool']}'")

print("\n--- NEW TOOLS TO ADD (MISSING: %d) ---" % len(missing))
for i, m in enumerate(missing, 1):
    print(f"  {i}. [{m['category']}] {m['title']} - {m['description']}")
