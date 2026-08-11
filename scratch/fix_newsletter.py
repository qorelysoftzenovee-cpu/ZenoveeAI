import re

content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Fix newsletter-subject-analyzer case
# Find and replace the problematic ternary
old = r"""        return { markdownOutput: `# 📨 Newsletter Subject Analyzer\\n\\n**Subject:** \"${subject}\"\\n\\n## Open Rate Estimate: **${Math.min(40,15+score/5).toFixed(1)}%** (Industry avg: 21.3%)\\n\\n## Score: **${score}/100**\\n\\n| Signal | Status |\\n|---|---|\\n| Number Hook | ${hasNumber?'✅ Yes — boosts opens by 26%':'❌ Add a number'} |\\n| Curiosity Gap | ${hasCuriosity?'✅ Yes':'⚠️ Add \"this\", a question, or ellipsis'} |\\n| Subject Length | ${len} chars ${len<=50?'✅ Optimal':'len<=70?'⚠️ Slightly long':'❌ Too long'} |\\n| Preview Text Set? | ⚠️ Don't forget preview text (40-90 chars) |\\n\\n## Better Alternatives\\n- \"3 developer tools that saved me 10 hours\"\\n- \"You're probably missing these tools 🤔\"\\n- \"Week ${Math.ceil(new Date().getDate()/7)}: Tools, tips & what worked\"` };"""

if old in content:
    new = r"""        const lenLabel = len<=50 ? 'Optimal length' : len<=70 ? 'Slightly long' : 'Too long';
        const numStatus = hasNumber ? 'Yes - boosts opens by 26%' : 'Add a number';
        const curStatus = hasCuriosity ? 'Yes' : 'Add "this", a question, or ellipsis';
        const weekNum = Math.ceil(new Date().getDate()/7);
        return { markdownOutput: `# Newsletter Subject Analyzer\\n\\n**Subject:** "${subject}"\\n\\n## Open Rate Estimate: **${Math.min(40,15+score/5).toFixed(1)}%** (Industry avg: 21.3%)\\n\\n## Score: **${score}/100**\\n\\n| Signal | Status |\\n|---|---|\\n| Number Hook | ${numStatus} |\\n| Curiosity Gap | ${curStatus} |\\n| Subject Length | ${len} chars (${lenLabel}) |\\n| Preview Text Set? | Remember preview text (40-90 chars) |\\n\\n## Better Alternatives\\n- "3 developer tools that saved me 10 hours"\\n- "You're probably missing these tools"\\n- "Week ${weekNum}: Tools, tips and what worked"` };"""
    content = content.replace(old, new)
    print("Fixed newsletter-subject-analyzer")
else:
    # search for it differently
    idx = content.find("len<=50?'✅ Optimal'")
    if idx >= 0:
        # Replace just the problematic ternary in the string
        start = content.rfind('        return {', 0, idx)
        end = content.find('};', idx) + 2
        block = content[start:end]
        print(f"Found block at lines, length={len(block)}")
        # Build replacement
        fixed_block = """        const lenLabel = len<=50 ? 'Optimal length' : len<=70 ? 'Slightly long' : 'Too long';
        const numStatus = hasNumber ? 'Yes — boosts opens by 26%' : 'Add a number';
        const curStatus = hasCuriosity ? 'Yes' : 'Add "this", a question, or ellipsis';
        return { markdownOutput: `# Newsletter Subject Analyzer\\\\n\\\\n**Subject:** "${subject}"\\\\n\\\\n## Open Rate Estimate: **${Math.min(40,15+score/5).toFixed(1)}%** (Industry avg: 21.3%)\\\\n\\\\n## Score: **${score}/100**\\\\n\\\\n| Signal | Status |\\\\n|---|---|\\\\n| Number Hook | ${numStatus} |\\\\n| Curiosity Gap | ${curStatus} |\\\\n| Subject Length | ${len} chars (${lenLabel}) |\\\\n\\\\n## Better Alternatives\\\\n- "3 developer tools that saved me 10 hours"\\\\n- "You're probably missing these tools"` };"""
        content = content[:start] + fixed_block + content[end:]
        print("Fixed via index!")
    else:
        print("Could not find newsletter case")

open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
print("Done - check build now")
