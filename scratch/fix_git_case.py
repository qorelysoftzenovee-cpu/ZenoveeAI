content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Find the problematic git-commit case and fix it
old = r"""      case "git-commit-message-gen": {
        const desc = inputs.input_data || 'fixed the login button not working on mobile browsers';
        const types = ['feat','fix','docs','style','refactor','test','chore'];
        const lower = desc.toLowerCase();
        const type = lower.includes('fix')||lower.includes('bug')||lower.includes('error') ? 'fix' : lower.includes('add')||lower.includes('new')||lower.includes('implement') ? 'feat' : lower.includes('doc')||lower.includes('readme') ? 'docs' : lower.includes('test') ? 'test' : lower.includes('refactor') ? 'refactor' : lower.includes('style')||lower.includes('css')||lower.includes('design') ? 'style' : 'chore';
        const short = desc.slice(0,72).replace(/^./, c => c.toLowerCase()).replace(/\.$/, '');
        return { markdownOutput: `# ✅ Git Commit Messages Generated\\n\\n**Recommended (Conventional Commits):**\\n\\`\\`\\`\\n${type}: ${short}\\n\\`\\`\\`\\n\\n**With scope:**\\n\\`\\`\\`\\n${type}(core): ${short}\\n\\`\\`\\`\\n\\n**Detailed commit body:**\\n\\`\\`\\`\\n${type}: ${short}\\n\\n- ${desc}\\n- Updated related tests and documentation\\n- Follows project contribution guidelines\\n\\nCloses #123\\n\\`\\`\\`\\n\\n| Format | Examples |\\n|---|---|\\n| Types | ${types.map(t=>\`\\\\\`${t}\\\\\`\`).join(', ')} |\\n| Scope | \\`auth\\`, \\`ui\\`, \\`api\\`, \\`db\\` |` };
      }"""

new = r"""      case "git-commit-message-gen": {
        const desc = inputs.input_data || 'fixed the login button not working on mobile browsers';
        const types = ['feat','fix','docs','style','refactor','test','chore'];
        const lower = desc.toLowerCase();
        const type = lower.includes('fix')||lower.includes('bug')||lower.includes('error') ? 'fix' : lower.includes('add')||lower.includes('new')||lower.includes('implement') ? 'feat' : lower.includes('doc')||lower.includes('readme') ? 'docs' : lower.includes('test') ? 'test' : lower.includes('refactor') ? 'refactor' : lower.includes('style')||lower.includes('css')||lower.includes('design') ? 'style' : 'chore';
        const short = desc.slice(0,72).replace(/^./, c => c.toLowerCase()).replace(/\.$/, '');
        const typesStr = types.join(', ');
        return { markdownOutput: `# ✅ Git Commit Messages Generated\n\n**Recommended:**\n\`\`\`\n${type}: ${short}\n\`\`\`\n\n**With scope:**\n\`\`\`\n${type}(core): ${short}\n\`\`\`\n\n**Detailed commit body:**\n\`\`\`\n${type}: ${short}\n\n- ${desc}\n- Updated related tests\n- Follows contribution guidelines\n\nCloses #123\n\`\`\`\n\n| Format | Examples |\n|---|---|\n| Types | ${typesStr} |\n| Scope | auth, ui, api, db |` };
      }"""

if old in content:
    content = content.replace(old, new)
    open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
    print("Fixed git-commit case!")
else:
    # Try to find it by searching for key line
    idx = content.find("types.map(t=>")
    if idx >= 0:
        print(f"Found types.map at index {idx}")
        print(repr(content[idx-50:idx+200]))
    else:
        print("Could not find old pattern, checking line content...")
        lines = content.split('\n')
        for i, line in enumerate(lines, 1):
            if 'types.map' in line:
                print(f"Line {i}: {repr(line[:200])}")
