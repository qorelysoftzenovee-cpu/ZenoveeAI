content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Find and replace the net-worth return statement that references undefined assets/liabilities
import re
pattern = r"(      case \"net-worth-calculator\": \{.*?const finalNetWorth = netWorth;\s*)\s*return \{ markdownOutput: .*?\};\s*\}"
match = re.search(pattern, content, re.DOTALL)
if match:
    old_block = content[match.start():match.end()]
    new_block = '''      case "net-worth-calculator": {
        const totalAssets = parseFloat(inputs.input_data?.replace(/[^0-9.]/g,'') || '115000');
        const totalLiab = parseFloat(inputs.mode?.replace(/[^0-9.]/g,'') || '23500');
        const netWorth = totalAssets - totalLiab;
        const dtar = totalAssets > 0 ? ((totalLiab/totalAssets)*100).toFixed(1) : '0.0';
        const health = totalAssets > 0 ? (totalLiab/totalAssets < 0.3 ? 'Excellent (under 30%)' : totalLiab/totalAssets < 0.5 ? 'Good (30-50%)' : totalLiab/totalAssets < 0.75 ? 'Fair (50-75%)' : 'High Debt (over 75%)') : 'N/A';
        return { markdownOutput: `# Net Worth Calculator\\n\\n**Total Assets:** $${totalAssets.toLocaleString()}\\n**Total Liabilities:** $${totalLiab.toLocaleString()}\\n\\n## Net Worth: **$${netWorth.toLocaleString()}**\\n\\n| Metric | Value |\\n|---|---|\\n| Net Worth | ${netWorth >= 0 ? 'Positive' : 'Negative'} |\\n| Debt-to-Asset Ratio | ${dtar}% |\\n| Financial Health | ${health} |\\n\\n## Age Benchmarks (Median Net Worth)\\n| Age Group | Median |\\n|---|---|\\n| Under 35 | $39,000 |\\n| 35-44 | $135,000 |\\n| 45-54 | $247,000 |\\n| 55-64 | $364,000 |\\n\\n> Tip: Focus on reducing high-interest debt first to grow net worth faster.` };
      }'''
    content = content[:match.start()] + new_block + content[match.end():]
    open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
    print("Fixed net-worth-calculator completely")
else:
    print("Pattern not found, searching...")
    idx = content.find('net-worth-calculator')
    if idx > 0:
        print(repr(content[idx:idx+600]))
