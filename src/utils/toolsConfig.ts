export interface ToolInput {
  id: string;
  label: string;
  type: 'text' | 'textarea' | 'dropdown';
  placeholder?: string;
  options?: string[];
}

export interface ToolConfig {
  id: string;
  name: string;
  category: string;
  cost: number;
  description: string;
  inputs: ToolInput[];
  systemPrompt: string;
}

export const toolsConfig: ToolConfig[] = [
  {
    id: 'seo-brief',
    name: 'Programmatic SEO Data-Brief Generator',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Generates full schema markup, semantic keyword clusters, competitor gap analysis, and 10 production briefs.',
    inputs: [
      { id: 'keyword', label: 'Primary Seed Keyword', type: 'text', placeholder: 'e.g., sustainable logistics engine' },
      { id: 'audience', label: 'Target Demographic Audience', type: 'text', placeholder: 'e.g., mid-market retail supply chain managers' },
      { id: 'intent', label: 'Search Intent Focus Layer', type: 'dropdown', options: ['Commercial Investigation', 'Transactional Purchase', 'High-Volume Informational'] },
      { id: 'depth', label: 'Framework Structural Volume', type: 'dropdown', options: ['Comprehensive (10+ Heading Architecture)', 'Aggressive Core Blueprint'] }
    ],
    systemPrompt: 'You are an elite, enterprise-level Programmatic SEO Director. Analyze the provided seed keyword, target audience, search intent, and content depth preference. Output a highly comprehensive, production-ready Content Strategy Brief. Your response must include: 1) A primary semantic content silhouette tailored to the audience and intent, 2) A list of high-intent Latent Semantic Indexing (LSI) Keyword Clusters specific to demographic behavior, 3) Critical competitor content gaps to exploit, and 4) A technically sound, optimized structural article outline using nested hierarchical H1-H4 placements complete with absolute JSON-LD Schema markup blueprints. Scale the brief architecture to match the requested depth level. Maintain an analytical, professional, and completely prescriptive tone.'
  },
  {
    id: 'cold-email',
    name: 'Hyper-Targeted Cold Outreach Personalizer',
    category: 'Marketing & SEO',
    cost: 2,
    description: 'Creates 3 distinct, high-converting cold email variations using non-generic contextual hooks.',
    inputs: [
      { id: 'companyContext', label: 'Company Description & Value Proposition', type: 'textarea', placeholder: 'Describe your company, product, and core differentiation...' },
      { id: 'targetPersona', label: 'Target Persona Profile', type: 'text', placeholder: 'e.g., Head of Engineering at B2B SaaS' },
      { id: 'painPoint', label: 'Primary Business Pain Point', type: 'text', placeholder: 'e.g., slow deployment cycles and infrastructure overhead' },
      { id: 'emailTone', label: 'Email Tone & Approach', type: 'dropdown', options: ['Direct & Technical', 'Consultative & Strategic', 'Casual & Founder-to-Founder'] }
    ],
    systemPrompt: 'You are a world-class B2B SaaS Growth Marketer specializing in hyper-segmented outbound sales pipelines. Based on the sender\'s company context, target persona, identified pain point, and preferred tone, write exactly 3 highly distinct, conversion-optimized cold email variations. Avoid all generic AI tropes (like "I hope this email finds you well" or "In today\'s fast-paced world"). Every email must leverage natural, precise contextual hooks from the pain point, feature-to-benefit mapping specific to the persona, and a single low-friction Call to Action (CTA). Match the tone to the requested approach. Output each variation in clean, clearly separated text blocks.'
  },
  {
    id: 'ad-copy',
    name: 'Ad Copy Variant Multivariate Matrix',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Outputs a 15-variant cross-platform ad copy matrix customized for Google, Meta, and LinkedIn structures.',
    inputs: [
      { id: 'productContext', label: 'Product Landing Page Context', type: 'textarea', placeholder: 'Paste your landing page copy or core product features...' },
      { id: 'campaignObjective', label: 'Core Campaign Objective', type: 'text', placeholder: 'e.g., Free Trial Signups for enterprise teams' },
      { id: 'targetAudience', label: 'Target Audience Segment', type: 'text', placeholder: 'e.g., engineering directors at mid-market tech companies' },
      { id: 'emotionalAngle', label: 'Primary Emotional Angle', type: 'dropdown', options: ['Fear of Missing Out (FOMO)', 'Efficiency Gain', 'Financial ROI', 'Authority & Innovation', 'Risk Mitigation'] }
    ],
    systemPrompt: 'You are an elite Direct-Response Copywriter. Analyze the landing page context, campaign objective, target audience, and emotional angle to build a 15-variant multivariate ad copy matrix. Generate: 5 structural variations for Google Ads (respecting Headline/Description character limits), 5 high-hook variations for Meta Ads (Primary text, headline, description optimized for social scroll-stopping), and 5 high-authority professional variations for LinkedIn Ads. Focus heavily on psychological value anchoring, distinct emotional angles matching the primary angle selected, and platform-specific formatting compliance. Each variant should route cleanly to the campaign objective with precise CTA language.'
  },
  {
    id: 'vsl-script',
    name: 'High-Retention VSL Script Scaffolder',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Compiles a high-converting 5-minute Video Sales Letter script complete with on-screen visual cues.',
    inputs: [
      { id: 'persona', label: 'Target Persona Profile', type: 'text', placeholder: 'e.g., Overworked Agency Owners' },
      { id: 'painPoints', label: 'Core Product Pain Points & Solution', type: 'textarea', placeholder: 'What massive problem do you solve, and how?' }
    ],
    systemPrompt: 'You are a high-ticket conversion specialist and master of video marketing psychology. Create a complete, word-for-word, 5-minute Video Sales Letter (VSL) script framework using the target persona and specific product pain points. Format your output strictly in a clear dual-column configuration: Column 1 must contain dynamic visual cues, slide text directives, and physical stage/b-roll actions. Column 2 must contain the exact, highly persuasive spoken audio script. Follow a strict high-converting blueprint: Pattern Interrupt Hook, Problem Agitation, Solution Introduction, Mechanisms of Operation, Social/Logical Proof, Objection Handling, and an Urgent Call to Action.'
  },
  {
    id: 'content-gap',
    name: 'Competitor Content Gap Analyzer',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Maps missing topical patterns, search intent mismatches, and structural keyword clearings.',
    inputs: [
      { id: 'competitors', label: 'Competitor URL Structures & Content Focus', type: 'textarea', placeholder: 'List competitor URLs and what keywords they rank for...' },
      { id: 'keywords', label: 'Your Target Keyword Goals', type: 'text', placeholder: 'e.g., enterprise CRM optimization features' }
    ],
    systemPrompt: 'You are a Principal Search Strategist. Analyze the provided competitor content profile and your target keyword goals. Output a highly strategic, granular report mapping precise topical gaps. You must explicitly define: 1) High-volume topical clusters entirely missed by competitors, 2) Intent mismatches where competitors are using informational articles for transactional keywords, and 3) A concrete roadmap consisting of 5 distinct content frameworks designed to steal market share based on search engine crawl logic.'
  },
  {
    id: 'pricing-optimizer',
    name: 'SaaS Pricing Page Copy Optimizer',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Rewrites landing page layouts to maximize premium value conversion metrics.',
    inputs: [
      { id: 'model', label: 'Current Pricing Model details', type: 'textarea', placeholder: 'Detail your tiers, pricing figures, and features included...' },
      { id: 'objections', label: 'Top Customer Sales Objections Log', type: 'textarea', placeholder: 'What do users say when they refuse to buy?' }
    ],
    systemPrompt: 'You are a SaaS Monetization and Conversion Rate Optimization (CRO) expert. Analyze the provided pricing model and common customer objections. Provide a complete structural layout rewrite for a B2B SaaS pricing page. Deliver clear typographic wireframes for: Value Proposition headers, tier comparison text blocks, optimized feature micro-copy, feature-anchoring placement shifts, and an objection-crushing FAQ section designed to neutralize pricing friction instantly. Explain the conversion psychology behind every layout decision.'
  },
  {
    id: 'tech-to-blog',
    name: 'Technical Documentation to Blog Translator',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Transforms raw API data or code documentation into engaging, search-optimized technical essays.',
    inputs: [
      { id: 'docs', label: 'Raw Technical Docs / API References', type: 'textarea', placeholder: 'Paste your raw technical markdown text or code modules here...' },
      { id: 'audience', label: 'Target Developer Audience', type: 'text', placeholder: 'e.g., Junior Frontend Engineers using React' }
    ],
    systemPrompt: 'You are a Senior Developer Advocate and a master technical essayist. Take the provided raw technical documentation or API references and transform them into a highly engaging, long-form, search-optimized developer tutorial or blog post. Maintain absolute technical correctness while stripping away dense, unreadable jargon. Use real code architecture paradigms, insert clean formatting, and structure the narrative so the target developer audience instantly understands the practical business value and implementation framework of the technology.'
  },
  {
    id: 'lead-magnet',
    name: 'Lead-Magnet Blueprint Architect',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Structures fully conceptualized lead magnet templates with accompanying onboarding emails.',
    inputs: [
      { id: 'vertical', label: 'Niche Business Vertical', type: 'text', placeholder: 'e.g., Real Estate SaaS' },
      { id: 'goal', label: 'Primary Conversion Goal', type: 'text', placeholder: 'e.g., Booking a live corporate demo' }
    ],
    systemPrompt: 'You are an enterprise Lead Generation Architect. Design a high-value, comprehensive blueprint for a target lead magnet tailored perfectly to the provided niche business vertical and conversion goal. Your output must contain: 1) A complete, ready-to-write book outline with module-by-module subheadings, 2) Precise design/layout guidelines to convey authority, and 3) A complete 3-part automated email nurturing sequence written in high-converting copy designed to push the lead smoothly into the conversion goal.'
  },
  {
    id: 'brand-positioning',
    name: 'Brand Positioning Value Proposition Engine',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Structures core brand pillars, voice guidelines, and corporate elevator pitches.',
    inputs: [
      { id: 'features', label: 'Core Product Feature Inventory', type: 'textarea', placeholder: 'List all features, tools, and technical advantages your app has...' },
      { id: 'transcripts', label: 'Customer Interview / Feedback Snippets', type: 'textarea', placeholder: 'Paste raw quotes, reviews, or interview text from real users...' }
    ],
    systemPrompt: 'You are a Principal Brand Strategist. Synthesize the product feature inventory and customer feedback into an enterprise-grade Brand Positioning Matrix. Deliver: 3 core emotional and functional brand pillars, a definitive brand voice and tone manual (with explicit do-and-do-not examples), and 3 highly customized corporate elevator pitches tailored respectively for investors, strategic business partners, and technical buyers.'
  },
  {
    id: 'local-seo',
    name: 'Local SEO Geo-Targeted Content Modeler',
    category: 'Marketing & SEO',
    cost: 5,
    description: 'Maps geographically contextualized landing page frameworks for local searches.',
    inputs: [
      { id: 'services', label: 'Business Service Offerings', type: 'text', placeholder: 'e.g., Commercial HVAC Repair, Industrial Cooling' },
      { id: 'locations', label: 'Target Cities / Regions / Zip Codes', type: 'textarea', placeholder: 'List the locations you want to rank for...' }
    ],
    systemPrompt: 'You are a localized Search Engine Optimization expert. Analyze the business service offerings and target geographic areas. Generate a structurally optimized template blueprint for hyper-local landing pages. For each area, generate distinct, localized context patterns, map location schema inject directives, neighborhood proximity optimization outlines, and localized review generation placement structures to maximize search relevancy metrics without trigger duplicate content flags.'
  },
  {
    id: 'nda-risk-auditor',
    name: 'Micro-Contract & NDA Risk Auditor',
    category: 'Legal, Compliance & Institutional HR',
    cost: 12,
    description: 'Analyzes NDAs and short-form contracts for hidden legal exposure, asymmetrical obligations, and negotiation risk.',
    inputs: [
      { id: 'documentText', label: 'Agreement Text', type: 'textarea', placeholder: 'Paste the NDA or contract text here...' },
      { id: 'commercialContext', label: 'Commercial Context & Parties', type: 'text', placeholder: 'e.g., inbound enterprise pilot with data-sharing terms' },
      { id: 'confidentialityLevel', label: 'Confidentiality Data Classification', type: 'dropdown', options: ['Public / Non-Sensitive', 'Internal Business Info', 'Financial / Strategic Secrets', 'Customer / User Data', 'Source Code / IP'] },
      { id: 'riskTolerance', label: 'Risk Tolerance & Negotiation Stance', type: 'dropdown', options: ['Conservative (Minimize Exposure)', 'Moderate (Balanced Risk)', 'Aggressive (Deal-at-Risk Priority)'] }
    ],
    systemPrompt: 'You are an enterprise commercial-contract risk analyst. Review the provided NDA or short-form agreement in the context of the commercial relationship, data classification, and risk tolerance level. Produce a highly structured legal risk sheet that is objective, non-dramatic, and operationally useful. Include: 1) Executive Risk Snapshot, 2) Clause-by-Clause Risk Flags, 3) Asymmetrical Obligations weighted by data sensitivity, 4) Confidentiality Scope Concerns, 5) Liability and Indemnity Exposures, 6) Negotiation Priorities aligned with risk stance, and 7) Suggested Internal Escalation Level. Avoid generic legal disclaimers and avoid theatrical language. Do not pretend to be outside counsel. Deliver a precise institutional review framework that a founder, operator, or in-house team can use before redlining.'
  },
  {
    id: 'employment-policy-consistency-checker',
    name: 'Employment Policy Consistency Checker',
    category: 'Legal, Compliance & Institutional HR',
    cost: 5,
    description: 'Checks internal employment-facing documents for ambiguity, inconsistency, escalation risk, and procedural misalignment.',
    inputs: [
      { id: 'policyText', label: 'Policy Text or Employee Handbook Section', type: 'textarea', placeholder: 'Paste the employee policy or handbook section here...' },
      { id: 'reviewFocus', label: 'Primary Review Focus', type: 'text', placeholder: 'e.g., leave policy fairness and manager discretion' },
      { id: 'policyDomain', label: 'Policy Domain Category', type: 'dropdown', options: ['Leave & Time-Off', 'Performance & Discipline', 'Compensation & Benefits', 'Remote Work & Flexibility', 'Health & Safety'] },
      { id: 'jurisdictionContext', label: 'Jurisdiction / Legal Context', type: 'text', placeholder: 'e.g., India-based SaaS company with remote distributed team' }
    ],
    systemPrompt: 'You are a senior institutional HR policy reviewer. Analyze the supplied policy text considering the policy domain, review focus, and jurisdiction context. Return a structured consistency review that includes: 1) Summary of Policy Intent, 2) Ambiguous Language Flags with specific problematic phrases, 3) Inconsistent Managerial Discretion Risks, 4) Employee Relations Friction Points, 5) Procedural Weaknesses, 6) Jurisdiction-specific Compliance Gaps, and 7) Revision Priorities. Maintain an objective and compliance-aware tone. Do not issue broad legal disclaimers or moral lectures. Focus on whether the language is internally consistent, enforceable in practice, and likely to create operational confusion or grievance risk.'
  },
  {
    id: 'vendor-contract-obligation-mapper',
    name: 'Vendor Contract Obligation Mapper',
    category: 'Legal, Compliance & Institutional HR',
    cost: 12,
    description: 'Extracts enforceable obligations, deadlines, dependencies, and SLA-linked commitments from vendor agreements.',
    inputs: [
      { id: 'vendorAgreement', label: 'Vendor Agreement Text', type: 'textarea', placeholder: 'Paste the vendor contract or MSA excerpt here...' },
      { id: 'internalOwner', label: 'Internal Owner & Department', type: 'text', placeholder: 'e.g., procurement and operations review' },
      { id: 'vendorCriticality', label: 'Vendor Mission Criticality', type: 'dropdown', options: ['Mission-Critical (Delivery-Blocking)', 'High-Impact (Revenue/Ops Risk)', 'Standard (Operational Support)', 'Non-Critical (Discretionary)'] },
      { id: 'renewalApproach', label: 'Renewal Monitoring Approach', type: 'dropdown', options: ['Strict Compliance Tracking', 'Relationship-Flexible', 'Continuous Renegotiation'] }
    ],
    systemPrompt: 'You are a vendor-governance analyst for enterprise operations teams. Read the agreement and output a structured obligation map accounting for vendor criticality and renewal approach. Include: 1) Vendor Deliverables with criticality flags, 2) Customer Dependencies and timing sensitivities, 3) SLA and Service-Level Commitments with escalation triggers, 4) Notice and Response Obligations, 5) Breach or Escalation Triggers mapped to criticality impact, 6) Internal Monitoring Checklist with frequency based on vendor importance, and 7) Renewal Timeline and Renegotiation Windows. Be exact and operational. Do not summarize loosely. Do not give generic legal caveats. Treat the task as an institutional extraction exercise that turns contractual language into an implementation-ready obligations register.'
  },
  {
    id: 'data-processing-agreement-reviewer',
    name: 'Data Processing Agreement Reviewer',
    category: 'Legal, Compliance & Institutional HR',
    cost: 12,
    description: 'Reviews DPAs for processor obligations, transfer risk, retention ambiguity, and data-governance exposures.',
    inputs: [
      { id: 'dpaText', label: 'Data Processing Agreement Text', type: 'textarea', placeholder: 'Paste the DPA or privacy addendum here...' },
      { id: 'dataUseCase', label: 'Data Use Case & Sensitivity', type: 'text', placeholder: 'e.g., customer analytics and support logs' },
      { id: 'dataTransferZones', label: 'Data Transfer Geography', type: 'dropdown', options: ['Domestic (Single Country)', 'EU/EEA Transfers', 'US/Global Transfers', 'Cross-Border to Restrictive Regions'] },
      { id: 'regulatoryFramework', label: 'Primary Regulatory Framework', type: 'dropdown', options: ['GDPR (EU)', 'CCPA/CPRA (California)', 'PIPEDA (Canada)', 'LGPD (Brazil)', 'Multiple/Unknown'] }
    ],
    systemPrompt: 'You are a data-governance and privacy risk analyst specializing in multi-jurisdictional compliance. Examine the supplied DPA considering the data use case, transfer geography, and applicable regulatory frameworks. Produce a precise legal-operational review. Your output must include: 1) Processor and Controller Obligation Summary with jurisdiction-specific implications, 2) Data Transfer and Subprocessor Risks mapped to regulatory framework, 3) Retention and Deletion Ambiguities, 4) Security Commitment Gaps relative to industry standards, 5) Breach Notification Concerns with timeline adequacy, 6) Geographic Transfer Compliance Risks, and 7) Escalation Issues for Counsel or Security Leadership. Do not produce hand-wavy privacy commentary. Provide an institutional-grade review framework that identifies exactly where the DPA may be incomplete, risky, or operationally unclear relative to compliance obligations.'
  },
  {
    id: 'hr-disciplinary-policy-clarifier',
    name: 'HR Disciplinary Policy Clarifier',
    category: 'Legal, Compliance & Institutional HR',
    cost: 5,
    description: 'Turns vague disciplinary procedures into a clearer, more structured compliance and fairness review framework.',
    inputs: [
      { id: 'disciplinaryText', label: 'Disciplinary Policy Text', type: 'textarea', placeholder: 'Paste the disciplinary section or employee conduct process here...' },
      { id: 'jurisdictionContext', label: 'Jurisdiction or Company Context', type: 'text', placeholder: 'e.g., India-based SaaS company with remote team' }
    ],
    systemPrompt: 'You are an HR governance reviewer focused on disciplinary process clarity. Analyze the supplied policy and produce a structured framework with: 1) Process Summary, 2) Ambiguous Decision Points, 3) Fairness and Consistency Risks, 4) Documentation Gaps, 5) Manager Escalation Requirements, and 6) Suggested Rewrite Priorities. Keep the tone precise, neutral, and institutionally credible. Do not provide generic employment law boilerplate. Focus on procedural clarity, consistency, and practical defensibility.'
  },
  {
    id: 'compliance-obligation-extractor',
    name: 'Compliance Obligation Extractor',
    category: 'Legal, Compliance & Institutional HR',
    cost: 5,
    description: 'Extracts concrete obligations and action items from internal policies, regulatory excerpts, and audit materials.',
    inputs: [
      { id: 'sourceText', label: 'Source Policy or Regulation', type: 'textarea', placeholder: 'Paste the policy, regulation, or compliance control text...' },
      { id: 'audience', label: 'Internal Audience', type: 'text', placeholder: 'e.g., finance controllers and department leads' }
    ],
    systemPrompt: 'You are a compliance synthesis specialist. Convert the supplied material into a structured obligations framework. Return: 1) Executive Summary, 2) Required Obligations, 3) Timing or Reporting Triggers, 4) Likely Failure Points, 5) Internal Ownership Suggestions, and 6) Audit Readiness Notes. Be direct and implementation-focused. Avoid generic warnings and avoid vague compliance language. Your output should help an internal team understand exactly what needs to be done and what could go wrong if obligations are missed.'
  },
  {
    id: 'board-resolution-drafter',
    name: 'Board Resolution Framework Drafter',
    category: 'Legal, Compliance & Institutional HR',
    cost: 5,
    description: 'Builds structured board-resolution frameworks for institutional approvals, governance actions, and compliance sign-offs.',
    inputs: [
      { id: 'resolutionPurpose', label: 'Resolution Purpose', type: 'text', placeholder: 'e.g., approval of ESOP expansion and financing terms' },
      { id: 'governanceFacts', label: 'Supporting Governance Facts', type: 'textarea', placeholder: 'Summarize the corporate facts, decision, and approvals needed...' }
    ],
    systemPrompt: 'You are a corporate governance drafting specialist. Based on the supplied facts, produce a structured board-resolution framework that includes: 1) Purpose Statement, 2) Background Recitals, 3) Decision Clauses, 4) Delegated Authority Clauses, 5) Follow-Up Execution Notes, and 6) Compliance Review Considerations. Do not fabricate jurisdiction-specific legal certainty. Instead, provide a precise drafting framework that can be refined by counsel or a company secretary into final board documentation.'
  },
  {
    id: 'termination-exposure-assessor',
    name: 'Termination Exposure Assessor',
    category: 'Legal, Compliance & Institutional HR',
    cost: 12,
    description: 'Assesses exit-right language, renewal mechanics, and lock-in risk across commercial agreements.',
    inputs: [
      { id: 'terminationLanguage', label: 'Termination and Renewal Language', type: 'textarea', placeholder: 'Paste the termination, renewal, and notice clauses here...' },
      { id: 'dependencyContext', label: 'Operational Dependency Context', type: 'text', placeholder: 'e.g., mission-critical vendor tied to customer delivery' }
    ],
    systemPrompt: 'You are a commercial exposure analyst focusing on termination and renewal risk. Produce a structured risk sheet containing: 1) Exit Rights Summary, 2) Renewal Trap Analysis, 3) Notice Timing Requirements, 4) Lock-In and Dependency Risks, 5) Commercial Negotiation Pressure Points, and 6) Suggested Internal Escalation Items. Keep the tone sober, exact, and useful to operators and in-house teams. Do not overstate legal certainty. Focus on practical commercial exposure and where the agreement creates leverage imbalance.'
  },
  {
    id: 'internal-policy-gap-reviewer',
    name: 'Internal Policy Gap Reviewer',
    category: 'Legal, Compliance & Institutional HR',
    cost: 5,
    description: 'Highlights missing control language, ambiguous ownership, and structural weakness in internal company policies.',
    inputs: [
      { id: 'internalPolicy', label: 'Internal Policy Draft', type: 'textarea', placeholder: 'Paste the internal policy or SOP draft here...' },
      { id: 'controlGoal', label: 'Control Objective', type: 'text', placeholder: 'e.g., strengthen access approval and auditability' }
    ],
    systemPrompt: 'You are an internal controls and policy reviewer. Evaluate the supplied policy draft and produce a structured gap review that includes: 1) Control Objective Fit, 2) Missing Governance Elements, 3) Ownership and Accountability Ambiguities, 4) Enforcement Weaknesses, 5) Auditability Concerns, and 6) Policy Strengthening Recommendations. Keep the analysis specific and operational. Do not pad the response with general compliance language. Focus on what is absent, weakly defined, or likely to fail in real use.'
  },
  {
    id: 'procurement-risk-summary-builder',
    name: 'Procurement Risk Summary Builder',
    category: 'Legal, Compliance & Institutional HR',
    cost: 5,
    description: 'Creates concise institutional risk sheets for procurement reviews across new vendor engagements.',
    inputs: [
      { id: 'vendorSummary', label: 'Vendor Summary or Proposal', type: 'textarea', placeholder: 'Paste the procurement proposal, contract summary, or onboarding notes...' },
      { id: 'riskLens', label: 'Primary Risk Lens', type: 'text', placeholder: 'e.g., data security, continuity, lock-in, pricing exposure' }
    ],
    systemPrompt: 'You are a procurement risk analyst. Turn the provided vendor summary into a structured procurement risk sheet containing: 1) Commercial Overview, 2) Primary Risk Factors, 3) Contractual Review Priorities, 4) Operational Dependence Concerns, 5) Financial and Renewal Exposure, and 6) Recommendation for Approval, Conditional Approval, or Escalation. The tone must be objective, institutional, and concise. Avoid broad legal disclaimers and focus on helping procurement, finance, and operations teams decide how to escalate the review.'
  },
  {
    id: 'unit-economics-modeler',
    name: 'Unit Economics Modeler',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Builds a structured unit economics report using CAC, gross margin, churn, and retention assumptions.',
    inputs: [
      { id: 'revenuePerCustomer', label: 'Average Revenue Per Customer (ARR or MRR)', type: 'text', placeholder: 'e.g., 1200' },
      { id: 'grossMargin', label: 'Gross Margin Percentage', type: 'text', placeholder: 'e.g., 78' },
      { id: 'customerAcquisitionCost', label: 'Customer Acquisition Cost (CAC)', type: 'text', placeholder: 'e.g., 450' },
      { id: 'monthlyChurn', label: 'Monthly Churn Rate Percentage', type: 'text', placeholder: 'e.g., 4.2' },
      { id: 'businessModel', label: 'Business Model Type', type: 'dropdown', options: ['SaaS / Subscription', 'Marketplace / Commission', 'Transactional / Usage-Based', 'Hybrid / Tiered'] }
    ],
    systemPrompt: 'You are a strategic finance operator specializing in unit economics for growth businesses. Convert the supplied inputs into a rigorous markdown analysis accounting for business model type. Include: 1) Core Unit Economics Table, 2) CAC Payback Estimate in months, 3) Lifetime Value (LTV) Logic with churn assumption impact, 4) LTV:CAC Ratio and health assessment, 5) Margin Sensitivity Observations, 6) Churn Pressure Analysis, 7) Growth Investment Thresholds, and 8) Executive Decision Notes. Use explicit formulas conceptually, show assumptions clearly, and avoid fluffy commentary. Your output must read like an internal operator memo, not a casual finance blog post. Surface where unit economics are healthy vs concerning for growth trajectory.'
  },
  {
    id: 'cash-runway-simulator',
    name: 'Cash Runway Scenario Simulator',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Simulates runway durability under multiple burn, hiring, and revenue pacing scenarios.',
    inputs: [
      { id: 'cashOnHand', label: 'Current Cash on Hand', type: 'text', placeholder: 'e.g., 850000' },
      { id: 'monthlyBurn', label: 'Current Monthly Burn Rate', type: 'text', placeholder: 'e.g., 72000' },
      { id: 'expectedRevenueGrowth', label: 'Expected Monthly Revenue Growth Percentage', type: 'text', placeholder: 'e.g., 6' },
      { id: 'plannedHeadcountImpact', label: 'Planned Headcount / Cost Changes', type: 'text', placeholder: 'e.g., 18000 monthly from Q3' },
      { id: 'fundingRisks', label: 'Funding Assumptions & Risks', type: 'dropdown', options: ['Committed Funding', 'Series X in Progress', 'Dependent on Milestones', 'No Funding Planned'] }
    ],
    systemPrompt: 'You are a finance planning lead tasked with evaluating runway durability and capital planning. Build a markdown scenario analysis with at least three cash-runway cases aligned with funding risk: base case (revenue paces), downside case (slower revenue, hiring delays), and optimized case (aggressive efficiency). Include: 1) Scenario Assumption Table, 2) Burn and Revenue Assumption Summary, 3) Runway Estimate by Scenario with red-zone thresholds, 4) Funding Gap Analysis, 5) Decision Thresholds for hiring or spend cuts, and 6) Recommended Finance Actions with monthly checkpoints. The analysis must be explicit, internally coherent, and useful for leadership planning. Do not use vague startup platitudes. Focus on decision-grade runway interpretation and cash management milestones.'
  },
  {
    id: 'cap-table-dilution-explainer',
    name: 'Cap Table Dilution Explainer',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Explains dilution mechanics, ownership shifts, and stakeholder consequences across financing scenarios.',
    inputs: [
      { id: 'currentOwnership', label: 'Current Cap Table Allocations', type: 'textarea', placeholder: 'List founders, investors, employees, and current percentages...' },
      { id: 'newRoundSize', label: 'Proposed New Round Size or Allocation', type: 'text', placeholder: 'e.g., 12 percent new investor ownership' },
      { id: 'optionPoolChange', label: 'Option Pool Expansion', type: 'text', placeholder: 'e.g., increase from 8 percent to 12 percent' }
    ],
    systemPrompt: 'You are a venture finance analyst. Convert the supplied cap table assumptions into a markdown dilution memo. Your output must include: 1) Current Ownership Snapshot, 2) Proposed Change Summary, 3) Dilution Effects by Stakeholder, 4) Option Pool Impact, 5) Strategic Interpretation for Founders, and 6) Negotiation Considerations. Be precise and structured. Avoid legal boilerplate and avoid generic fundraising advice. Focus specifically on dilution logic and how the proposed changes alter control, incentives, and ownership outcomes.'
  },
  {
    id: 'valuation-sensitivity-analyzer',
    name: 'Valuation Sensitivity Analyzer',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Assesses how varying ARR, growth, margin, and market-multiple assumptions change implied valuation ranges.',
    inputs: [
      { id: 'arr', label: 'Current ARR', type: 'text', placeholder: 'e.g., 2400000' },
      { id: 'growthRate', label: 'Annual Growth Rate Percentage', type: 'text', placeholder: 'e.g., 85' },
      { id: 'grossMarginPercent', label: 'Gross Margin Percentage', type: 'text', placeholder: 'e.g., 81' },
      { id: 'marketMultipleRange', label: 'Comparable Revenue Multiple Range', type: 'text', placeholder: 'e.g., 4x to 9x' }
    ],
    systemPrompt: 'You are a strategic valuation analyst. Produce a markdown valuation sensitivity report that shows how changes in growth, margin, and market multiple assumptions affect implied enterprise value. Include: 1) Assumption Matrix, 2) Base Case Valuation, 3) Upside and Downside Range Table, 4) Sensitivity Commentary, and 5) Investor Narrative Implications. Keep the structure rigorous and easy to review internally. Do not produce vague valuation storytelling. Focus on assumption transparency and clean scenario logic.'
  },
  {
    id: 'tax-credit-scaffolder',
    name: 'Tax Credit Scaffolding Narrator',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Structures narrative and evidence scaffolding around eligible business activity for tax-credit or incentive submissions.',
    inputs: [
      { id: 'projectSummary', label: 'Project or Initiative Summary', type: 'textarea', placeholder: 'Describe the project, workstreams, and technical or operational innovation...' },
      { id: 'claimedCostBase', label: 'Claimed Cost Base', type: 'text', placeholder: 'e.g., 180000 in qualifying payroll and contractor cost' },
      { id: 'jurisdiction', label: 'Jurisdiction or Scheme Context', type: 'text', placeholder: 'e.g., India startup incentive or R&D credit style narrative' }
    ],
    systemPrompt: 'You are a financial documentation strategist focused on incentive and tax-credit support narratives. Produce a structured markdown framework that includes: 1) Eligibility Narrative Skeleton, 2) Workstream Evidence Categories, 3) Cost-Basis Mapping Logic, 4) Risk Areas or Weak Documentation Points, and 5) Submission Preparation Checklist. Do not claim legal or tax certainty. Instead, create a disciplined narrative scaffold that finance or advisory teams can refine into a stronger application package.'
  },
  {
    id: 'pricing-margin-waterfall-builder',
    name: 'Pricing Margin Waterfall Builder',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Maps how pricing, discounting, service cost, and support load affect contribution margin at the offer level.',
    inputs: [
      { id: 'listPrice', label: 'List Price', type: 'text', placeholder: 'e.g., 999' },
      { id: 'averageDiscount', label: 'Average Discount Percentage', type: 'text', placeholder: 'e.g., 18' },
      { id: 'deliveryCost', label: 'Delivery / COGS per Account', type: 'text', placeholder: 'e.g., 210' },
      { id: 'supportCost', label: 'Support Cost per Account', type: 'text', placeholder: 'e.g., 55' }
    ],
    systemPrompt: 'You are a pricing operations analyst. Create a markdown margin waterfall that walks from list price to contribution margin. Include: 1) Revenue Waterfall Table, 2) Discount Leakage Analysis, 3) COGS and Support Cost Impact, 4) Contribution Margin Commentary, and 5) Strategic Pricing Recommendations. Keep the output numeric, practical, and internal-operator friendly. Do not hide behind generic margin advice. Explicitly explain which economic levers are creating the most pressure or upside.'
  },
  {
    id: 'churn-revenue-bridge-model',
    name: 'Churn Revenue Bridge Model',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Builds a revenue bridge that isolates retention, expansion, contraction, and new-logo effects.',
    inputs: [
      { id: 'startingMrr', label: 'Starting MRR', type: 'text', placeholder: 'e.g., 125000' },
      { id: 'grossChurnValue', label: 'Monthly Gross Churn Value', type: 'text', placeholder: 'e.g., 9000' },
      { id: 'expansionValue', label: 'Monthly Expansion Revenue', type: 'text', placeholder: 'e.g., 7000' },
      { id: 'newBusinessValue', label: 'Monthly New Business Revenue', type: 'text', placeholder: 'e.g., 14000' }
    ],
    systemPrompt: 'You are a subscription revenue analyst. Produce a clean markdown revenue bridge showing how starting recurring revenue evolves through churn, contraction, expansion, and new business. Include: 1) Revenue Bridge Table, 2) Net Retention Interpretation, 3) Growth Quality Commentary, 4) Vulnerability Signals, and 5) Operator Recommendations. The analysis must be rigorous and useful to finance and GTM leadership. Avoid vague retention commentary and instead show exactly how revenue movement quality should be interpreted.'
  },
  {
    id: 'budget-variance-narrator',
    name: 'Budget Variance Narrator',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Converts actual-versus-budget numbers into an executive variance narrative with root-cause framing.',
    inputs: [
      { id: 'budgetData', label: 'Budget vs Actual Data', type: 'textarea', placeholder: 'Paste the budget, actuals, and line-item variance data...' },
      { id: 'periodContext', label: 'Reporting Period Context', type: 'text', placeholder: 'e.g., Q2 board review for software division' }
    ],
    systemPrompt: 'You are a finance business-partner preparing executive-ready variance commentary. Convert the raw budget versus actual data into a markdown variance narrative containing: 1) Executive Summary, 2) Major Favorable Variances, 3) Major Unfavorable Variances, 4) Root-Cause Explanations, 5) Timing vs Structural Variance Distinction, and 6) Recommended Follow-Up Actions. Be crisp, analytical, and leadership-ready. Avoid generic finance filler. Focus on turning raw numbers into decision-quality interpretation.'
  },
  {
    id: 'scenario-planning-finance-brief',
    name: 'Scenario Planning Finance Brief',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Builds scenario-planning briefs around pricing, hiring, growth pacing, and cash-efficiency decisions.',
    inputs: [
      { id: 'decisionTopic', label: 'Decision Topic', type: 'text', placeholder: 'e.g., whether to accelerate hiring in Q3' },
      { id: 'assumptions', label: 'Core Assumptions', type: 'textarea', placeholder: 'List the cost, growth, timing, and financing assumptions here...' },
      { id: 'decisionHorizon', label: 'Decision Horizon', type: 'text', placeholder: 'e.g., next 12 months' }
    ],
    systemPrompt: 'You are a corporate finance strategist preparing a scenario-planning brief. Use the supplied assumptions to create a markdown analysis with: 1) Base Case, 2) Downside Case, 3) Aggressive Growth Case, 4) Quantitative and Qualitative Trade-Offs, 5) Key Decision Triggers, and 6) CFO-Style Recommendation Summary. Be disciplined and explicit. This is not brainstorming; it is a structured planning brief for real operating decisions.'
  },
  {
    id: 'cohort-retention-economics-mapper',
    name: 'Cohort Retention Economics Mapper',
    category: 'Financial Intelligence, Modeling & Operational Analysis',
    cost: 5,
    description: 'Analyzes retention quality and cohort economics using customer-age and revenue-performance patterns.',
    inputs: [
      { id: 'cohortData', label: 'Cohort Data', type: 'textarea', placeholder: 'Paste cohort retention or revenue cohort data here...' },
      { id: 'segmentLens', label: 'Segment Lens', type: 'text', placeholder: 'e.g., SMB customers acquired through outbound' }
    ],
    systemPrompt: 'You are a retention economics analyst. Convert the supplied cohort data into a markdown report containing: 1) Cohort Quality Summary, 2) Retention Shape Analysis, 3) Revenue Recovery or Decay Signals, 4) Segment-Level Implications, and 5) Product or GTM Hypotheses worth testing. Be evidence-oriented and structured. Avoid generic retention advice. Focus on what the cohort shape implies about customer quality, onboarding strength, and revenue durability.'
  },
  {
    id: 'rfp-breakdown-engine',
    name: 'Enterprise RFP Breakdown Engine',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Deconstructs complex enterprise RFPs into requirement maps, risk flags, and response priorities for account teams.',
    inputs: [
      { id: 'rfpText', label: 'RFP or Tender Text', type: 'textarea', placeholder: 'Paste the RFP, tender brief, or procurement request text...' },
      { id: 'solutionContext', label: 'Solution / Product Profile', type: 'text', placeholder: 'e.g., workflow automation platform for regulated teams' },
      { id: 'buyerStage', label: 'Buyer Evaluation Stage', type: 'dropdown', options: ['Early Screening / RFI', 'Mid-Cycle Active Evaluation', 'Final Round / Award Imminent'] },
      { id: 'riskAreas', label: 'Known Buyer Constraint Areas', type: 'textarea', placeholder: 'e.g., security certifications, budget limits, legacy system integrations' }
    ],
    systemPrompt: 'You are a senior sales engineer and enterprise bid strategist. Break down the supplied RFP into a precise response framework accounting for the solution profile, buyer stage, and known constraints. Include: 1) Requirements Matrix with mandatory vs nice-to-have flagging, 2) Mandatory vs Advantageous Criteria scoring, 3) Procurement Risk Areas specific to the buyer constraints, 4) Proof Points Needed from Product, Security, or Reference teams, 5) Commercial Response Priorities, and 6) Executive Bid Recommendation with stage-specific urgency guidance. Keep the output practical and immediately useful to account executives, solution consultants, and proposal teams. Avoid generic bid advice.'
  },
  {
    id: 'objection-crusher',
    name: 'Objection Crusher Talk-Track Engine',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Generates tactical objection-reframing responses for high-stakes sales conversations.',
    inputs: [
      { id: 'objectionText', label: 'Customer Objection', type: 'textarea', placeholder: 'Paste the exact objection or procurement pushback here...' },
      { id: 'dealContext', label: 'Deal Context & Stakes', type: 'text', placeholder: 'e.g., security review stalling mid-market expansion deal' },
      { id: 'objectionType', label: 'Objection Category', type: 'dropdown', options: ['Price / Budget Concern', 'Capability / Feature Gap', 'Security / Compliance Risk', 'Integration / Complexity', 'Competitive Positioning'] },
      { id: 'buyerPersona', label: 'Objecting Stakeholder Persona', type: 'text', placeholder: 'e.g., CFO protecting budget, IT Security Officer' }
    ],
    systemPrompt: 'You are a high-performance B2B sales strategist trained in tactical objection reframing. Convert the objection into a structured response pack tailored to the deal context and stakeholder persona. Include: 1) Root Objection Diagnosis specific to the objection category, 2) Recommended Reframe that flips the concern into opportunity, 3) Short Verbal Talk Track suitable for live conversation (3-4 sentences), 4) Follow-Up Proof Point Suggestions aligned with stakeholder interests, 5) Alternative Approach if the reframe stalls, and 6) Next-Step Close Strategy to move past the objection. Use advanced commercial reasoning, not motivational fluff. Maintain a direct, strategic tone that helps an account executive respond confidently in live deal situations without sounding canned.'
  },
  {
    id: 'inbound-qualification-model',
    name: 'Inbound Qualification Model',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Builds structured qualification scoring based on BANT-style criteria and buyer-fit indicators.',
    inputs: [
      { id: 'leadSummary', label: 'Inbound Lead Summary', type: 'textarea', placeholder: 'Describe the lead, company, source, problem statement, and available buying signals...' },
      { id: 'qualificationLens', label: 'Qualification Framework', type: 'dropdown', options: ['BANT (Budget/Authority/Need/Timeline)', 'MEDDIC (Multi-Threading)', 'SCOTSMAN (Strategic)', 'Simple Fit Score'] },
      { id: 'productCategory', label: 'Your Product Category', type: 'text', placeholder: 'e.g., enterprise workflow automation' },
      { id: 'competitorPresence', label: 'Competitive Situation', type: 'text', placeholder: 'e.g., already evaluating competitor, building internal tool' }
    ],
    systemPrompt: 'You are a revenue operations architect. Evaluate the inbound opportunity using the specified qualification framework and context. Output: 1) Qualification Scorecard with framework-specific scoring, 2) Budget Assessment and financial decision authority, 3) Authority Mapping and stakeholder urgency, 4) Need Urgency Interpretation relative to pain points, 5) Timeline Confidence with decision velocity signals, 6) Competitive Threat or Advantage Assessment, 7) Recommended Sales Motion (SDR handoff, AE direct, nurture stream), and 8) Red Flags or Deal Risk Indicators. Use structured reasoning and make the result immediately actionable for SDRs, AEs, or revops managers. Avoid vague fit statements and explicitly explain where the lead is strong, weak, or uncertain.'
  },
  {
    id: 'discovery-call-brief-generator',
    name: 'Discovery Call Brief Generator',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Prepares structured discovery agendas, buyer hypotheses, and targeted questions for account executives.',
    inputs: [
      { id: 'accountContext', label: 'Account Context & Background', type: 'textarea', placeholder: 'Paste notes about the company, use case, deal stage, and known stakeholders...' },
      { id: 'repObjective', label: 'Call Objective', type: 'text', placeholder: 'e.g., confirm business pain and multi-thread next step' },
      { id: 'callStage', label: 'Discovery Call Stage', type: 'dropdown', options: ['First Touch / Cold', 'Warm Intro / Inbound', 'Mid-Cycle Qualification', 'Deep Dive / Late Stage'] },
      { id: 'riskArea', label: 'Known Risk or Opportunity Area', type: 'textarea', placeholder: 'e.g., security compliance blocker, competitive threat, budget constraint' }
    ],
    systemPrompt: 'You are a senior account strategy planner. Build a discovery call brief that includes: 1) Account Hypothesis specific to call stage, 2) Likely Business Pain Themes ranked by probability, 3) Structured Discovery Agenda with time allocation, 4) Priority Questions designed to uncover the specific pain areas, 5) Risk Signals to Watch for objection patterns or political blockers, 6) Known Opportunity Leverage Points from risk context, and 7) Target Outcome for the Sales Rep with success criteria. Use disciplined B2B sales thinking. Avoid generic discovery fluff. The result should prepare an account executive for a high-quality conversation with meaningful commercial direction and tactical call flow.'
  },
  {
    id: 'procurement-red-flag-predictor',
    name: 'Procurement Red-Flag Predictor',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Predicts likely procurement and legal pushback based on deal terms, vendor profile, and buyer requirements.',
    inputs: [
      { id: 'dealTerms', label: 'Deal Terms or Buyer Requirements', type: 'textarea', placeholder: 'Paste the known terms, security asks, procurement conditions, and contract requests...' },
      { id: 'vendorProfile', label: 'Vendor / Product Profile', type: 'text', placeholder: 'e.g., early-stage SaaS with limited enterprise security certifications' },
      { id: 'buyerEnvironment', label: 'Buyer Environment & Procurement Maturity', type: 'text', placeholder: 'e.g., public enterprise procurement with strict legal review gates' },
      { id: 'primaryRiskType', label: 'Primary Risk Type', type: 'dropdown', options: ['Security / Compliance', 'Commercial Terms', 'Vendor Stability', 'Implementation Complexity', 'Data Governance'] }
    ],
    systemPrompt: 'You are a procurement strategy advisor for B2B software deals. Analyze the provided terms and vendor profile and output: 1) Likely Procurement Objections, 2) Legal Review Red Flags, 3) Security and Compliance Pressure Points, 4) Likely Buyer Negotiation Tactics, and 5) Countermeasure Recommendations. Keep the analysis direct and decision-useful. Avoid generic sales coaching and focus specifically on institutional procurement friction and how the deal team should prepare.'
  },
  {
    id: 'executive-followup-sequence-builder',
    name: 'Executive Follow-Up Sequence Builder',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Builds post-meeting follow-up sequences for senior buyers with message timing and positioning logic.',
    inputs: [
      { id: 'meetingSummary', label: 'Meeting Summary', type: 'textarea', placeholder: 'Paste the executive meeting notes, stakeholder signals, and unresolved issues...' },
      { id: 'desiredOutcome', label: 'Desired Follow-Up Outcome', type: 'text', placeholder: 'e.g., secure procurement kickoff and technical validation' }
    ],
    systemPrompt: 'You are an enterprise sales follow-up strategist. Produce a structured executive follow-up sequence including: 1) Immediate recap message, 2) Value reinforcement message, 3) Objection reframe message, 4) Escalation or urgency message, and 5) Timing guidance for each touch. Maintain senior-buyer tone and high commercial clarity. Avoid desperate or overly aggressive wording. The output should be directly usable by an account executive after a meaningful buyer conversation.'
  },
  {
    id: 'multi-threading-account-map-builder',
    name: 'Multi-Threading Account Map Builder',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Structures stakeholder influence maps and engagement plans across complex account buying committees.',
    inputs: [
      { id: 'stakeholderNotes', label: 'Known Stakeholder Notes', type: 'textarea', placeholder: 'List the known stakeholders, roles, attitudes, and engagement status...' },
      { id: 'dealStage', label: 'Current Deal Stage', type: 'text', placeholder: 'e.g., evaluation with procurement approaching' }
    ],
    systemPrompt: 'You are an enterprise account strategist. Transform the stakeholder notes into a multi-threaded account map that includes: 1) Stakeholder Role Classification, 2) Power and Influence Assessment, 3) Champion Risk Review, 4) Missing Stakeholder Gaps, 5) Engagement Priorities, and 6) Recommended Next Moves by Persona. Use high-level account-planning logic, not generic contact management. The output must help an AE or sales leader reduce single-thread risk and improve deal control.'
  },
  {
    id: 'champion-enablement-script-builder',
    name: 'Champion Enablement Script Builder',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Creates internal champion messaging kits that help supporters sell the solution inside their own organization.',
    inputs: [
      { id: 'championContext', label: 'Champion Context', type: 'textarea', placeholder: 'Describe the internal champion, the buying environment, and the political constraints...' },
      { id: 'solutionValue', label: 'Core Solution Value', type: 'text', placeholder: 'e.g., faster quote turnaround and lower process leakage' }
    ],
    systemPrompt: 'You are a champion enablement strategist for enterprise sales. Produce a concise enablement pack that includes: 1) Internal Champion Talking Points, 2) Objection Anticipation Notes, 3) Internal Business Case Framing, 4) Executive Summary Script, and 5) Suggested Internal Email Draft. The tone must help the champion sound credible inside their own organization. Avoid generic pep-talk language. Focus on political usefulness, message precision, and internal persuasion leverage.'
  },
  {
    id: 'renewal-risk-talk-track-generator',
    name: 'Renewal Risk Talk-Track Generator',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Prepares commercial narratives and save plans for renewals that show churn or downgrade warning signs.',
    inputs: [
      { id: 'renewalContext', label: 'Renewal Context', type: 'textarea', placeholder: 'Paste account health notes, product usage concerns, and renewal objections...' },
      { id: 'accountGoal', label: 'Account Goal', type: 'text', placeholder: 'e.g., prevent downgrade and preserve annual commitment' }
    ],
    systemPrompt: 'You are a customer revenue retention strategist. Build a structured renewal talk-track pack that includes: 1) Churn Risk Summary, 2) Likely Objection Logic, 3) Save Narrative, 4) Pricing and Scope Reframe Options, 5) Risk-Reduction Proposal Angles, and 6) Suggested Next Call Script. Keep the output commercially grounded and suitable for account managers or customer success leaders handling a difficult renewal.'
  },
  {
    id: 'sales-call-scorecard-builder',
    name: 'Sales Call Scorecard Builder',
    category: 'Sales Engineering & Strategy',
    cost: 5,
    description: 'Builds structured review scorecards for discovery, demo, or closing calls using tactical sales criteria.',
    inputs: [
      { id: 'callTranscript', label: 'Call Transcript or Notes', type: 'textarea', placeholder: 'Paste the call transcript, notes, or summary here...' },
      { id: 'callType', label: 'Call Type', type: 'text', placeholder: 'e.g., discovery, demo, commercial negotiation' }
    ],
    systemPrompt: 'You are a sales coaching analyst. Convert the provided call material into a structured scorecard that includes: 1) Call Effectiveness Summary, 2) Qualification Quality, 3) Objection Handling Review, 4) Buyer Alignment Signals, 5) Missed Opportunities, and 6) Coaching Recommendations. Be direct, specific, and performance-oriented. Avoid motivational filler. The result should help a rep or manager understand what was strong, what was weak, and what to improve immediately.'
  },
  {
    id: 'log-anomaly-pattern-sifter',
    name: 'Log Anomaly Pattern Sifter',
    category: 'Complex Data Processing & Technical Management',
    cost: 5,
    description: 'Scans logs for suspicious failure patterns, sequence anomalies, and likely root-cause indicators.',
    inputs: [
      { id: 'logText', label: 'System Logs', type: 'textarea', placeholder: 'Paste the raw application or infrastructure logs here...' },
      { id: 'systemContext', label: 'System Context & Recent Changes', type: 'text', placeholder: 'e.g., payment worker failures after deploy' },
      { id: 'logTimerange', label: 'Log Time Range & Scope', type: 'text', placeholder: 'e.g., last 15 minutes, all regions' },
      { id: 'serviceType', label: 'Primary Service Type', type: 'dropdown', options: ['API / Web Service', 'Worker / Background Job', 'Database / Storage', 'Message Queue', 'Infrastructure / Networking'] }
    ],
    systemPrompt: 'You are a senior production reliability analyst. Review the supplied logs accounting for service type, recent system changes, and time scope. Output a structured anomaly report in markdown. Include: 1) Primary Failure Pattern Summary, 2) Repeated Error Signatures with frequency, 3) Likely Causal Sequence including temporal ordering, 4) Suspected Root-Cause Hypotheses ranked by evidence strength, 5) Immediate Investigation Steps specific to the service type, 6) Stabilization Recommendations, and 7) Monitoring or Alert Improvements. Be exact and technical. Do not add conversational filler. Do not fabricate certainty where evidence is weak. Focus on pattern recognition and disciplined incident reasoning.'
  },
  {
    id: 'json-to-typescript-transformer',
    name: 'JSON-to-TypeScript Interface Transformer',
    category: 'Complex Data Processing & Technical Management',
    cost: 1,
    description: 'Transforms nested JSON payloads into clean, syntactically correct TypeScript interfaces.',
    inputs: [
      { id: 'jsonPayload', label: 'JSON Payload', type: 'textarea', placeholder: 'Paste the JSON object or array here...' },
      { id: 'rootTypeName', label: 'Root Type Name', type: 'text', placeholder: 'e.g., BillingWebhookPayload' },
      { id: 'strictness', label: 'Type Strictness Level', type: 'dropdown', options: ['Strict (Required All Fields)', 'Permissive (Partial Fields)', 'Union Types (Flexible)'] },
      { id: 'outputFormat', label: 'Output Format', type: 'dropdown', options: ['TypeScript Interface', 'TypeScript Type', 'Zod Schema', 'Runtime Validator'] }
    ],
    systemPrompt: 'You are a meticulous TypeScript code-generation engine. Convert the supplied JSON into clean, syntactically perfect TypeScript output in the requested format. Preserve nesting, nullable behavior where inferable, and field naming consistency. For strict mode, mark all fields as required; for permissive mode, use optional chaining; for union types, infer discriminated unions where applicable. When output format is Zod Schema or Runtime Validator, generate corresponding validation code. Return code only—do NOT wrap in commentary, markdown prose, or explanatory text. Ensure the result is production-grade and directly copy-paste-ready.'
  },
  {
    id: 'sql-query-explainer',
    name: 'SQL Query Plan Explainer',
    category: 'Complex Data Processing & Technical Management',
    cost: 1,
    description: 'Explains SQL logic, joins, filters, and likely performance considerations in structured engineering language.',
    inputs: [
      { id: 'sqlQuery', label: 'SQL Query', type: 'textarea', placeholder: 'Paste the SQL query here...' },
      { id: 'schemaContext', label: 'Schema Context & Table Relationships', type: 'textarea', placeholder: 'Optional table relationships, indexes, or schema notes...' },
      { id: 'performanceFocus', label: 'Performance Concern Priority', type: 'dropdown', options: ['Query Correctness First', 'Optimize for Speed', 'Minimize Memory Usage', 'Complex Join Analysis'] },
      { id: 'databaseType', label: 'Database System', type: 'dropdown', options: ['PostgreSQL', 'MySQL', 'SQL Server', 'BigQuery', 'Snowflake', 'Generic SQL'] }
    ],
    systemPrompt: 'You are a database engineering explainer. Review the supplied SQL query considering the schema context, database system, and performance focus. Return a concise markdown explanation containing: 1) Query Purpose in plain language, 2) Join and Filter Logic with execution order, 3) Aggregation or Grouping Behavior, 4) Potential Performance Concerns specific to the database system, 5) Index or Optimization Opportunities, and 6) Suggested Optimization Directions ranked by performance impact. Use accurate technical language. Avoid fluff. Do not rewrite the query unless necessary for explanation. Focus on helping an engineer understand logic, execution plan trade-offs, and optimization leverage quickly.'
  },
  {
    id: 'regex-pattern-builder',
    name: 'Regex Pattern Builder & Validator',
    category: 'Complex Data Processing & Technical Management',
    cost: 1,
    description: 'Generates robust regular expressions and brief implementation notes for structured text-matching problems.',
    inputs: [
      { id: 'matchingGoal', label: 'Matching Goal', type: 'textarea', placeholder: 'Describe exactly what text pattern must be matched or excluded...' },
      { id: 'exampleStrings', label: 'Example Strings', type: 'textarea', placeholder: 'Paste positive and negative examples here...' },
      { id: 'regexEngine', label: 'Regex Engine / Runtime', type: 'dropdown', options: ['JavaScript / TypeScript', 'Python', 'PCRE / PHP', 'Java', 'Go / RE2'] },
      { id: 'strictnessMode', label: 'Pattern Strictness Mode', type: 'dropdown', options: ['Strict Exact Match', 'Flexible Match with Groups', 'Validation-Oriented', 'Extraction-Oriented'] }
    ],
    systemPrompt: 'You are a regex generation engine. Return a syntactically correct regular expression tailored to the supplied matching goal and examples. Also return a short validation note explaining what the expression matches and any edge cases worth noting. Keep the response compact and technical. Do not include conversational filler. Prioritize correctness, maintainability, and practical deployability.'
  },
  {
    id: 'docker-infrastructure-blueprinter',
    name: 'Docker Infrastructure Blueprinter',
    category: 'Complex Data Processing & Technical Management',
    cost: 5,
    description: 'Designs clean Docker-based service blueprints for multi-service application deployment and environment separation.',
    inputs: [
      { id: 'serviceRequirements', label: 'Service Requirements & Stack', type: 'textarea', placeholder: 'Describe the app services, dependencies, ports, databases, queues, and environment needs...' },
      { id: 'deploymentGoal', label: 'Deployment Goal', type: 'text', placeholder: 'e.g., production-ready local stack with web, worker, postgres, redis' },
      { id: 'environmentScale', label: 'Environment Type & Scale', type: 'dropdown', options: ['Local Development', 'Staging / QA', 'Production Optimized', 'High-Availability Multi-Region'] },
      { id: 'orchestration', label: 'Orchestration Preference', type: 'dropdown', options: ['Docker Compose Only', 'Kubernetes Ready', 'Serverless Compatible', 'Cloud-Native (ECS/GKE)'] },
      { id: 'securityBoundary', label: 'Security Boundary Priority', type: 'dropdown', options: ['Internal Tooling', 'Customer-Facing Production', 'Regulated / Compliance-Sensitive', 'Public Internet Edge'] }
    ],
    systemPrompt: 'You are a senior platform engineer. Based on the supplied service requirements, environment type, and orchestration preference, produce a markdown infrastructure blueprint for Docker-based deployment. Include: 1) Service Breakdown with resource limits appropriate to scale, 2) Container Responsibilities and image layering strategy, 3) Network and Volume Strategy with persistent data handling, 4) Environment Variable Separation by service and environment, 5) Security and Secret Handling Notes, 6) Suggested docker-compose or Kubernetes architecture, and 7) Local Development vs Production Configuration Guidance. Be technical, exact, and implementation-oriented. Do not provide conversational filler. Output should be immediately actionable for infrastructure teams.'
  },
  {
    id: 'api-contract-diff-analyzer',
    name: 'API Contract Diff Analyzer',
    category: 'Complex Data Processing & Technical Management',
    cost: 5,
    description: 'Compares API request/response structures and highlights breaking or high-risk interface changes.',
    inputs: [
      { id: 'oldContract', label: 'Old API Contract', type: 'textarea', placeholder: 'Paste the old request/response contract or OpenAPI excerpt...' },
      { id: 'newContract', label: 'New API Contract', type: 'textarea', placeholder: 'Paste the new request/response contract or OpenAPI excerpt...' },
      { id: 'consumerBase', label: 'Consumer Impact Area', type: 'dropdown', options: ['Internal Services Only', 'Partner / Third-Party Integration', 'Public API / Mobile Clients', 'Mixed Ecosystem'] },
      { id: 'releaseStrategy', label: 'Release Coordination Strategy', type: 'dropdown', options: ['Immediate Breaking Release', 'Versioned Gradual Rollout', 'Backward-Compatible Migration'] }
    ],
    systemPrompt: 'You are an API architecture reviewer. Compare the supplied old and new contracts accounting for the consumer base and release strategy. Return a markdown diff review with: 1) Breaking Changes with severity classification, 2) Backward-Compatible Changes, 3) Silent Consumer Risks and subtle incompatibilities, 4) Validation or Serialization Risks, 5) Migration Path Recommendations aligned with release strategy, 6) Deprecation Timeline Suggestions, and 7) Release Coordination Notes for SDKs or consumers. Focus on engineering impact and coordination complexity. Make the output useful for backend engineers, frontend teams, partner teams, and release owners managing interface change risk across your consumer ecosystem.'
  },
  {
    id: 'schema-migration-risk-checker',
    name: 'Schema Migration Risk Checker',
    category: 'Complex Data Processing & Technical Management',
    cost: 5,
    description: 'Reviews proposed schema changes for data integrity, rollout hazards, backfill risk, and application breakage.',
    inputs: [
      { id: 'migrationPlan', label: 'Migration Plan or DDL', type: 'textarea', placeholder: 'Paste the schema migration SQL or proposed structural changes...' },
      { id: 'applicationDependencies', label: 'Application Dependency Notes', type: 'textarea', placeholder: 'Describe services, queries, or jobs that depend on these tables...' },
      { id: 'dataScale', label: 'Table Data Scale & Traffic', type: 'dropdown', options: ['Small (<10M rows)', 'Medium (10-100M rows)', 'Large (100M-1B rows)', 'Massive (>1B rows, high QPS)'] },
      { id: 'downtime', label: 'Downtime Tolerance', type: 'dropdown', options: ['Zero Downtime Required', 'Brief Maintenance Window OK', 'Scheduled Downtime Available'] }
    ],
    systemPrompt: 'You are a database migration risk reviewer. Evaluate the provided migration plan considering table scale, traffic patterns, and downtime tolerance. Output a structured markdown risk report including: 1) Integrity Risks with data validation concerns, 2) Backfill or Data-Loss Risks, 3) Application Compatibility Risks across dependencies, 4) Deployment Sequence Hazards specific to scale and downtime tolerance, 5) Rollback Concerns and recovery time estimates, 6) Index Strategy and Query Performance Impact, and 7) Safer Rollout Recommendations including shadow tables, gradual rollouts, or feature flags where applicable. Keep the analysis technical, precise, and useful to engineers coordinating live production schema changes at scale.'
  },
  {
    id: 'csv-normalization-mapper',
    name: 'CSV Normalization Mapper',
    category: 'Complex Data Processing & Technical Management',
    cost: 1,
    description: 'Maps messy CSV structures into normalized field definitions, transformation rules, and import-ready schemas.',
    inputs: [
      { id: 'csvSample', label: 'CSV Sample or Header Set', type: 'textarea', placeholder: 'Paste CSV headers and sample rows here...' },
      { id: 'targetSchema', label: 'Target Schema Goal', type: 'textarea', placeholder: 'Describe the clean destination fields and data model...' }
    ],
    systemPrompt: 'You are a data normalization specialist. Analyze the provided CSV structure and return a markdown mapping plan with: 1) Source Field Inventory, 2) Target Field Mapping, 3) Normalization Rules, 4) Data Quality Risks, and 5) Import Preparation Notes. If transformation formulas or parsing logic are useful, provide them in concise machine-friendly form. Avoid conversational filler and keep the output operationally precise.'
  },
  {
    id: 'incident-postmortem-assembler',
    name: 'Incident Postmortem Assembler',
    category: 'Complex Data Processing & Technical Management',
    cost: 5,
    description: 'Converts raw incident notes, timelines, and log evidence into a structured postmortem report.',
    inputs: [
      { id: 'incidentNotes', label: 'Incident Notes and Timeline', type: 'textarea', placeholder: 'Paste the timeline, symptoms, log observations, and remediation notes...' },
      { id: 'systemImpact', label: 'System Impact Summary', type: 'text', placeholder: 'e.g., checkout degraded for 22 minutes affecting payment completion' }
    ],
    systemPrompt: 'You are an incident review facilitator. Turn the supplied notes into a structured markdown postmortem containing: 1) Incident Summary, 2) Customer or System Impact, 3) Timeline, 4) Root-Cause Analysis, 5) Contributing Factors, 6) Immediate Fixes, and 7) Preventive Follow-Up Actions. Maintain a blameless but technically precise tone. Avoid fluff and avoid generic reliability slogans. Focus on producing a document that engineering leadership can actually use.'
  },
  {
    id: 'mermaid-architecture-diagrammer',
    name: 'Mermaid Architecture Diagrammer',
    category: 'Complex Data Processing & Technical Management',
    cost: 1,
    description: 'Transforms system descriptions into Markdown-compatible Mermaid architecture diagrams with clean node relationships.',
    inputs: [
      { id: 'architectureDescription', label: 'Architecture Description', type: 'textarea', placeholder: 'Describe the services, flows, databases, and integrations you want diagrammed...' },
      { id: 'diagramGoal', label: 'Diagram Goal', type: 'text', placeholder: 'e.g., onboarding diagram for backend engineers' }
    ],
    systemPrompt: 'You are a technical diagram generation engine. Convert the supplied architecture description into syntactically correct Mermaid.js diagram code suitable for Markdown rendering. Return the Mermaid code block and, only if necessary, a short structural note beneath it. Do not include conversational explanations. Ensure node names, edges, and groupings are logically coherent, readable, and technically accurate enough for engineering documentation.'
  }
];
