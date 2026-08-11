content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Fix 1: email-subject-line-tester - the problematic ternary with emoji in template literal
old1 = """        return { markdownOutput: `# 📧 Email Subject Line Tester\\n\\n**Subject:** \"${subject}\"\\n\\n## Score: **${score}/100** ${score>=70?'✅ Strong':'score>=50?'⚠️ Average':'❌ Weak'}\\n\\n| Metric | Value |\\n|---|---|\\n| Character Count | ${subject.length} ${subject.length<=60?'✅':'⚠️ Trim to 60'} |\\n| Power Words Found | ${found.length > 0 ? found.join(', ') : 'None'} |\\n| Spam Trigger Words | ${spam.length > 0 ? '⚠️ '+spam.join(', ') : '✅ None'} |\\n| Has Question? | ${subject.includes('?')?'✅ Yes (boosts open rate)':'No'} |\\n| All Caps? | ${subject===subject.toUpperCase()?'⚠️ Avoid all caps':'✅ Good'} |\\n\\n## Recommendations\\n${score < 70 ? '- Add a power word like \"you\", \"free\", or \"exclusive\"\\n- Keep subject under 60 characters\\n- Consider adding a question mark' : '- ✅ Good subject line! A/B test with a shorter variation.'}` };"""

new1 = """        const scoreLabel = score>=70 ? 'Strong' : score>=50 ? 'Average' : 'Weak';
        const lengthOk = subject.length<=60 ? 'Good length' : 'Trim to 60 chars';
        const recommendations = score < 70 ? '- Add a power word like "you", "free", or "exclusive"\\n- Keep subject under 60 characters\\n- Consider adding a question mark' : '- Good subject line! A/B test with a shorter variation.';
        return { markdownOutput: `# Email Subject Line Tester\\n\\n**Subject:** "${subject}"\\n\\n## Score: **${score}/100** (${scoreLabel})\\n\\n| Metric | Value |\\n|---|---|\\n| Character Count | ${subject.length} (${lengthOk}) |\\n| Power Words Found | ${found.length > 0 ? found.join(', ') : 'None'} |\\n| Spam Trigger Words | ${spam.length > 0 ? 'Found: '+spam.join(', ') : 'None detected'} |\\n| Has Question? | ${subject.includes('?') ? 'Yes - boosts open rate' : 'No'} |\\n| All Caps? | ${subject===subject.toUpperCase() ? 'Avoid all caps' : 'Good'} |\\n\\n## Recommendations\\n${recommendations}` };"""

if old1 in content:
    content = content.replace(old1, new1)
    print("Fixed email-subject-line-tester")
else:
    print("Could not find email-subject-line-tester old pattern, searching...")
    idx = content.find("score>=70?'✅ Strong'")
    if idx >= 0:
        # Find the entire return statement
        start = content.rfind("        return {", 0, idx)
        end = content.find("};", idx) + 2
        print(f"Found at {start}-{end}")
        print(repr(content[start:end][:200]))
        bad_return = content[start:end]
        good_return = """        const scoreLabel = score>=70 ? 'Strong' : score>=50 ? 'Average' : 'Weak';
        const lengthOk = subject.length<=60 ? 'Good length' : 'Trim to 60 chars';
        const recommendations = score < 70 ? '- Add a power word like "you", "free", or "exclusive"\\\\n- Keep subject under 60 characters\\\\n- Consider adding a question mark' : '- Good subject line! A/B test with a shorter variation.';
        return { markdownOutput: `# Email Subject Line Tester\\\\n\\\\n**Subject:** "${subject}"\\\\n\\\\n## Score: **${score}/100** (${scoreLabel})\\\\n\\\\n| Metric | Value |\\\\n|---|---|\\\\n| Character Count | ${subject.length} (${lengthOk}) |\\\\n| Power Words Found | ${found.length > 0 ? found.join(', ') : 'None'} |\\\\n| Spam Trigger Words | ${spam.length > 0 ? 'Found: '+spam.join(', ') : 'None detected'} |\\\\n| Has Question? | ${subject.includes('?') ? 'Yes' : 'No'} |\\\\n\\\\n## Recommendations\\\\n${recommendations}` };"""
        content = content[:start] + good_return + content[end:]
        print("Fixed via index search!")
    else:
        print("Could not find the pattern")

open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
print("Done")
