import re

content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Find the entire git-commit-message-gen case using regex and replace it
pattern = r'(      case "git-commit-message-gen": \{.*?\n      \})'
replacement = '''      case "git-commit-message-gen": {
        const desc = inputs.input_data || 'fixed the login button not working on mobile browsers';
        const types = ['feat','fix','docs','style','refactor','test','chore'];
        const lower = desc.toLowerCase();
        const type = lower.includes('fix')||lower.includes('bug')||lower.includes('error') ? 'fix' : lower.includes('add')||lower.includes('new')||lower.includes('implement') ? 'feat' : lower.includes('doc')||lower.includes('readme') ? 'docs' : lower.includes('test') ? 'test' : lower.includes('refactor') ? 'refactor' : lower.includes('style')||lower.includes('css')||lower.includes('design') ? 'style' : 'chore';
        const short = desc.slice(0,72).replace(/^./, c => c.toLowerCase()).replace(/\\.$/, '');
        const typesStr = types.join(', ');
        return { markdownOutput: `# ✅ Git Commit Message Generated\\n\\n**Recommended:**\\n\\`\\`\\`\\n${type}: ${short}\\n\\`\\`\\`\\n\\n**With scope:**\\n\\`\\`\\`\\n${type}(core): ${short}\\n\\`\\`\\`\\n\\n**Detailed body:**\\n\\`\\`\\`\\n${type}: ${short}\\n\\n- ${desc}\\n- Updated related tests\\n- Follows contribution guidelines\\n\\nCloses #123\\n\\`\\`\\`\\n\\n| Format | Examples |\\n|---|---|\\n| Types | ${typesStr} |\\n| Scope | auth, ui, api, db |` };
      }'''

match = re.search(r'      case "git-commit-message-gen": \{.+?      \}\n', content, re.DOTALL)
if match:
    content = content[:match.start()] + replacement + '\n' + content[match.end():]
    open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
    print("Successfully fixed git-commit-message-gen case")
else:
    print("Could not find the case block via regex")
