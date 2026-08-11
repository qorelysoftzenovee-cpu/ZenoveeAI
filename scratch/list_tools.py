import re

content = open('src/utils/toolsConfig.ts', 'r', encoding='utf-8').read()
tools = re.findall(r'id:\s*"([^"]+)".*?title:\s*"([^"]+)".*?category:\s*"([^"]+)"', content, re.DOTALL)

for i, (tool_id, title, cat) in enumerate(tools, 1):
    print(f"{i}. [{cat}] {tool_id} -> {title}")
