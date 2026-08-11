import re

content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

def remove_case_block(content, case_name, occurrence_index=0):
    """Remove the Nth occurrence of a case block"""
    # Find all occurrences
    pattern = f'      case "{case_name}": {{'
    positions = []
    start = 0
    while True:
        idx = content.find(pattern, start)
        if idx == -1:
            break
        positions.append(idx)
        start = idx + 1
    
    if len(positions) <= occurrence_index:
        print(f"Only {len(positions)} occurrences of '{case_name}' found")
        return content
    
    # Remove the specified occurrence
    case_start = positions[occurrence_index]
    
    # Find the matching closing brace by counting braces
    depth = 0
    i = case_start
    in_string = False
    string_char = None
    
    while i < len(content):
        c = content[i]
        if not in_string:
            if c in ('"', "'", '`'):
                in_string = True
                string_char = c
            elif c == '{':
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    # Found end of case block
                    case_end = i + 1
                    # Skip trailing newline
                    while case_end < len(content) and content[case_end] in ('\r', '\n'):
                        case_end += 1
                    # Remove the entire block
                    removed = content[case_start:case_end]
                    print(f"Removing occurrence {occurrence_index} of '{case_name}' ({len(removed)} chars)")
                    print(f"  First 100 chars: {repr(removed[:100])}")
                    return content[:case_start] + content[case_end:]
        else:
            if c == string_char and (i == 0 or content[i-1] != '\\'):
                in_string = False
        i += 1
    
    print(f"Could not find end of case block for '{case_name}'")
    return content

# Remove the OLD (first) occurrences which had different input key names (mdText, xmlInput)
# and keep the NEW ones (second occurrences) which use input_data
# But wait - the OLD ones came first positionally - the OLD code uses mdText/xmlInput
# The NEW ones use input_data. We want to keep the newer ones.
# First occurrence = old code (remove it), second = new code (keep it)

content = remove_case_block(content, 'xml-to-json', 0)  # Remove old xml-to-json
content = remove_case_block(content, 'markdown-to-html', 0)  # Remove old markdown-to-html

open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
print("\nDone! Duplicates removed.")

# Verify
cases = list(re.finditer(r'      case "([^"]+)":', content))
seen = {}
dups = []
for m in cases:
    name = m.group(1)
    if name in seen:
        dups.append(name)
    else:
        seen[name] = m.start()
print(f"After fix: {len(cases)} cases, {len(dups)} duplicates remaining")
if dups:
    print(f"  Remaining duplicates: {dups}")
