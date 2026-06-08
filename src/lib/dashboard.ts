export const dashboardNavigationSections = [
  {
    heading: "Workspace",
    items: [
      { label: "Overview", href: "/dashboard" },
      { label: "Credit balance", href: "/dashboard" },
      { label: "Recent activity", href: "/dashboard" },
    ],
  },
  {
    heading: "Outbound tools",
    items: [
      { label: "Cold Email Personalizer", href: "/dashboard/tools/cold-email" },
      { label: "Lead research", href: "/dashboard" },
      { label: "Follow-up systems", href: "/dashboard" },
    ],
  },
  {
    heading: "SEO tools",
    items: [
      { label: "Programmatic SEO Brief", href: "/dashboard/tools/seo-brief" },
      { label: "Content briefs", href: "/dashboard/tools/seo-brief" },
      { label: "Keyword mapping", href: "/dashboard" },
    ],
  },
  {
    heading: "Operations",
    items: [
      { label: "Team automations", href: "/dashboard" },
      { label: "Client delivery", href: "/dashboard" },
      { label: "Usage logs", href: "/dashboard" },
    ],
  },
];

export const dashboardToolCards = [
  {
    name: "Hyper-Targeted Cold Outreach Personalizer",
    description:
      "Generate sharper, more relevant opening lines and personalization angles for outbound campaigns.",
    cost: 2,
    category: "Outbound",
    href: "/dashboard/tools/cold-email",
    live: true,
  },
  {
    name: "Programmatic SEO Brief Generator",
    description:
      "Create structured content briefs for scalable landing pages, clusters, and keyword-driven campaigns.",
    cost: 5,
    category: "SEO",
    href: "/dashboard/tools/seo-brief",
    live: true,
  },
  {
    name: "Lead Enrichment Snapshot",
    description:
      "Prepare a clean summary of target companies, offers, positioning, and decision-maker context.",
    cost: 4,
    category: "Research",
    href: "#",
    live: false,
  },
  {
    name: "Proposal Angle Builder",
    description:
      "Turn a client brief into persuasive proposal angles, benefits, and premium service framing.",
    cost: 6,
    category: "Sales",
    href: "#",
    live: false,
  },
  {
    name: "Meeting Notes to Action Plan",
    description:
      "Transform raw call notes into priorities, owners, deadlines, and clear next steps for your team.",
    cost: 3,
    category: "Operations",
    href: "#",
    live: false,
  },
  {
    name: "Offer Positioning Generator",
    description:
      "Draft sharper offer positioning for your B2B services, products, or campaign packages.",
    cost: 5,
    category: "Strategy",
    href: "#",
    live: false,
  },
];
