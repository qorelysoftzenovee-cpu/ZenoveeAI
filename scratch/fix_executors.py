import re

content = open('src/app/dashboard/tools/[toolId]/page.tsx', 'r', encoding='utf-8').read()

# Fix date-duration-calculator: mode is now end date text field
old = "        const d2 = inputs.mode?.includes('Mode') ? new Date(Date.now()+90*86400000).toISOString().split('T')[0] : inputs.mode || new Date(Date.now()+90*86400000).toISOString().split('T')[0];"
new = "        const d2 = inputs.mode && !inputs.mode.includes('Mode') ? inputs.mode : new Date(Date.now()+90*86400000).toISOString().split('T')[0];"
if old in content:
    content = content.replace(old, new)
    print("Fixed date-duration-calculator")
else:
    print("MISS: date-duration-calculator")

# Fix ab-test-calculator: mode is now text field with variant conversion rate
old = "        const variantConv = parseFloat(inputs.mode?.replace(/\\D./g,'') || '6.5');"
new = "        const variantConv = parseFloat(inputs.mode?.replace(/[^0-9.]/g,'') || '6.5');"
if old in content:
    content = content.replace(old, new)
    print("Fixed ab-test-calculator")
else:
    print("MISS: ab-test-calculator (trying alternative)")
    old2 = "        const variantConv = parseFloat(inputs.mode?.replace(/\\D./g,'') || '6.5');"
    if old2 in content:
        content = content.replace(old2, new)
        print("Fixed ab-test-calculator (alt)")

# Fix investment-return-calculator: mode is now text field with final value
old = "        const finalVal = parseFloat(inputs.mode?.replace(/\\D./g,'') || '15000');"
new = "        const finalVal = parseFloat(inputs.mode?.replace(/[^0-9.]/g,'') || '15000');"
if old in content:
    content = content.replace(old, new)
    print("Fixed investment-return-calculator")
else:
    print("MISS: investment-return-calculator")

# Fix net-worth-calculator: inputs.mode is now liabilities text
# Find the net-worth-calculator case and update it
old_nw = """      case "net-worth-calculator": {
        const assets = { 'Cash & Savings':25000,'Investments':45000,'Real Estate':0,'Retirement':30000,'Vehicle':15000 };
        const liabilities = { 'Mortgage':0,'Car Loan':8000,'Credit Cards':3500,'Student Loans':12000 };
        const totalAssets = Object.values(assets).reduce((a,b)=>a+b,0);
        const totalLiab = Object.values(liabilities).reduce((a,b)=>a+b,0);
        const netWorth = totalAssets - totalLiab;
        const customAssets = parseFloat(inputs.input_data || '0');
        const finalNetWorth = netWorth + (isNaN(customAssets)?0:customAssets);"""

new_nw = """      case "net-worth-calculator": {
        const totalAssets = parseFloat(inputs.input_data?.replace(/[^0-9.]/g,'') || '115000');
        const totalLiab = parseFloat(inputs.mode?.replace(/[^0-9.]/g,'') || '23500');
        const netWorth = totalAssets - totalLiab;
        const finalNetWorth = netWorth;"""

if old_nw in content:
    content = content.replace(old_nw, new_nw)
    print("Fixed net-worth-calculator")
else:
    print("MISS: net-worth-calculator (checking snippet...)")
    idx = content.find('net-worth-calculator')
    if idx > 0:
        print(repr(content[idx:idx+400]))

# Fix savings-goal-planner: mode is now timeframe dropdown (months)
old_sg = "        const months = 24, rate = 0.05/12;"
new_sg = """        const monthsMap: Record<string,number> = {'12 months':12,'24 months':24,'36 months':36,'5 years':60,'10 years':120};
        const months = monthsMap[inputs.mode || ''] || 24, rate = 0.05/12;"""
if old_sg in content:
    content = content.replace(old_sg, new_sg)
    print("Fixed savings-goal-planner")
else:
    print("MISS: savings-goal-planner")

# Fix calorie-macro-calculator: mode is now goal dropdown text
old_cal = "        const goal = mode.includes('Advanced') ? 'muscle gain' : mode.includes('Export') ? 'fat loss' : 'maintenance';"
new_cal = "        const goal = mode.includes('Muscle') || mode.includes('bulk') ? 'muscle gain' : mode.includes('Fat') || mode.includes('cut') || mode.includes('Cut') ? 'fat loss' : mode.includes('Aggressive') ? 'fat loss' : 'maintenance';"
if old_cal in content:
    content = content.replace(old_cal, new_cal)
    print("Fixed calorie-macro-calculator goal detection")
else:
    print("MISS: calorie-macro-calculator")

# Fix pace-calculator: mode is now distance dropdown
old_pace = "        const distance = 42.195; // marathon km"
new_pace = "        const distMap: Record<string,number> = {'All races (5K, 10K, Half, Marathon)':42.195,'5K only':5,'10K only':10,'Half Marathon only':21.0975,'Full Marathon only':42.195}; const distance = distMap[inputs.mode||''] || 42.195;"
if old_pace in content:
    content = content.replace(old_pace, new_pace)
    print("Fixed pace-calculator")
else:
    print("MISS: pace-calculator")

# Fix currency-converter: mode is now "from currency" dropdown
old_curr = "        const base = 'USD';"
new_curr = "        const fromCurr = inputs.mode?.split(' ')[0] || 'USD'; const base = fromCurr;"
if old_curr in content:
    content = content.replace(old_curr, new_curr, 1)
    print("Fixed currency-converter")
else:
    print("MISS: currency-converter")

# Fix break-even-calculator: mode is now price/cost selection
old_be = "        const sellPrice = 50, variableCost = 20;"
new_be = """        const priceMap: Record<string,number[]> = {'Price $50, Cost $20/unit':[50,20],'Price $100, Cost $40/unit':[100,40],'Price $25, Cost $10/unit':[25,10],'Price $200, Cost $80/unit':[200,80]};
        const [sellPrice, variableCost] = priceMap[inputs.mode||''] || [50, 20];"""
if old_be in content:
    content = content.replace(old_be, new_be)
    print("Fixed break-even-calculator")
else:
    print("MISS: break-even-calculator")

# Fix stock-profit-calculator: mode is now buy/sell price selection
old_stock = "        const shares = parseInt(inputs.input_data || '100');\n        const buyPrice = 45.50, sellPrice = 68.25, brokerage = 9.99;"
new_stock = """        const shares = parseInt(inputs.input_data?.replace(/[^0-9]/g,'') || '100');
        const priceMap2: Record<string,number[]> = {'$45.50 -> $68.25 (50% gain)':[45.50,68.25],'$100 -> $150 (50% gain)':[100,150],'$200 -> $180 (10% loss)':[200,180],'$50 -> $75 (50% gain)':[50,75]};
        const [buyPrice, sellPrice] = priceMap2[inputs.mode?.replace(/[→]/g,'->')||''] || [45.50, 68.25]; const brokerage = 9.99;"""
if old_stock in content:
    content = content.replace(old_stock, new_stock)
    print("Fixed stock-profit-calculator")
else:
    print("MISS: stock-profit-calculator (checking...)")
    idx = content.find("const buyPrice = 45.50")
    if idx > 0:
        print(repr(content[idx-200:idx+50]))

# Fix crypto-profit-calculator: mode is now sell price/amount selection  
old_crypto = "        const sellPrice = 45000, amount = 0.5;"
new_crypto = """        const cryptoMap: Record<string,number[]> = {'Sell at $45,000 — 0.5 BTC':[45000,0.5],'Sell at $60,000 — 1 BTC':[60000,1],'Sell at $100,000 — 0.1 BTC':[100000,0.1],'Sell at $20,000 — 1 ETH':[20000,1],'Sell at $1 — 10,000 USDT':[1,10000]};
        const modeKey = Object.keys(cryptoMap).find(k => inputs.mode?.includes(k.split(' ')[2]?.replace(',',''))) || 'Sell at $45,000 — 0.5 BTC';
        const [sellPrice, amount] = cryptoMap[modeKey] || [45000, 0.5];"""
if old_crypto in content:
    content = content.replace(old_crypto, new_crypto)
    print("Fixed crypto-profit-calculator")
else:
    print("MISS: crypto-profit-calculator")

# Fix emergency-fund-calculator: mode is now months dropdown
old_ef = "        const months = [3,6,9,12];"
new_ef = """        const efMonths = inputs.mode?.includes('3 months') ? 3 : inputs.mode?.includes('9 months') ? 9 : inputs.mode?.includes('12 months') ? 12 : 6;
        const months = [3,6,9,12];"""
if old_ef in content:
    content = content.replace(old_ef, new_ef)
    print("Fixed emergency-fund-calculator")
else:
    print("MISS: emergency-fund-calculator")

open('src/app/dashboard/tools/[toolId]/page.tsx', 'w', encoding='utf-8').write(content)
print("\nAll executor fixes applied.")
