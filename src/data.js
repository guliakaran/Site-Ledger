export const USER = {
    name: 'Karan Gulia',
    initials: 'KG',
    role: 'Admin partner · Owner',
    email: 'karan@siteledger.app',
    phone: '+91 98xxxxxx12',
    gstin: '29ABCDE1234F1Z5',
};
export const SUMMARY = {
    capital: 18450000,
    revenue: 14620000,
    profit: 2240600,
    expenses: 12379400,
    activeProjects: 4,
    clientPayments: 12960000,
    deposits: 1660000,
};
export const INVESTMENT_BARS = [
    { name: 'Ravi Shankar', pct: 38 },
    { name: 'Meera Kapoor', pct: 27 },
    { name: 'Arjun Nair', pct: 21 },
    { name: 'Sunita Desai', pct: 14 },
];
export const REVENUE_BARS = [
    { name: 'Whitefield Residency', amount: 9000000, width: 62 },
    { name: 'Koramangala Retail Block', amount: 650000, width: 5 },
    { name: 'Other projects', amount: 4970000, width: 33 },
];
export const GST = {
    liability: 486220,
    due: '20 Oct',
    output: 912400,
    itc: 426180,
    rows: [
        { name: 'Ravi Shankar', gstin: '29ABCDE1234F1Z5', status: 'filed', liability: 184760, itc: 161950 },
        { name: 'Meera Kapoor', gstin: '29PQRSX5678K1Z2', status: 'pending', liability: 131280, itc: 115090 },
        { name: 'Arjun Nair', gstin: '29LMNOP9012Q1Z8', status: 'filed', liability: 102110, itc: 89470 },
    ],
};
export const seedProjects = [
    {
        id: 'whitefield',
        title: 'Whitefield Residency',
        location: 'Bengaluru · Phase 2',
        locDetail: 'Bengaluru · Phase 2 · started FY 2024–25',
        status: 'ongoing',
        invested: 7200000,
        revenue: 22140000,
        expenses: 12360000,
        profit: 9780000,
        partners: [
            { name: 'Ravi Shankar', initials: 'RS', color: '#e8ab3f', pct: 45, invested: 3240000, pl: 441000 },
            { name: 'Meera Kapoor', initials: 'MK', color: '#57b98a', pct: 30, invested: 2160000, pl: 294000 },
            { name: 'Arjun Nair', initials: 'AN', color: '#e0765a', pct: 25, invested: 1800000, pl: 245000 },
        ],
        years: [
            { fy: 'FY 2024–25', rev: 4200000, exp: 3960000, profit: 240000 },
            { fy: 'FY 2025–26', rev: 8940000, exp: 5310000, profit: 3630000 },
            { fy: 'FY 2026–27', rev: 9000000, exp: 3090000, profit: 5910000 },
        ],
    },
    {
        id: 'koramangala',
        title: 'Koramangala Retail Block',
        location: 'Bengaluru',
        locDetail: 'Bengaluru · started FY 2026–27',
        status: 'hold',
        invested: 4120000,
        revenue: 3005000,
        expenses: 4120000,
        profit: -115000,
        partners: [
            { name: 'Ravi Shankar', initials: 'RS', color: '#e8ab3f', pct: 35, invested: 1442000, pl: -40250 },
            { name: 'Meera Kapoor', initials: 'MK', color: '#57b98a', pct: 20, invested: 824000, pl: -23000 },
            { name: 'Sunita Desai', initials: 'SD', color: '#8f97a1', pct: 45, invested: 1854000, pl: -51750 },
        ],
        years: [{ fy: 'FY 2026–27', rev: 3005000, exp: 4120000, profit: -115000 }],
    },
];
export const seedPartners = [
    { id: 'ravi', name: 'Ravi Shankar', initials: 'RS', color: '#e8ab3f', role: 'Admin partner', projectCount: 2, invested: 7011000, pl: 851428 },
    { id: 'meera', name: 'Meera Kapoor', initials: 'MK', color: '#57b98a', role: 'Partner', projectCount: 2, invested: 4981500, pl: 604962 },
    { id: 'arjun', name: 'Arjun Nair', initials: 'AN', color: '#e0765a', role: 'Partner', projectCount: 1, invested: 3874500, pl: -42300 },
    { id: 'sunita', name: 'Sunita Desai', initials: 'SD', color: '#8f97a1', role: 'Partner', projectCount: 1, invested: 2583000, pl: 313684 },
    { id: 'dev', name: 'Dev Malhotra', initials: 'DM', color: '#3c4a6b', role: 'Partner', projectCount: 1, invested: 824000, pl: -23000 },
];
export const seedTransactions = [
    { id: 't1', description: 'Capital contribution — Ravi Shankar', detail: 'Bank transfer', amount: 500000, type: 'investment', project: 'Whitefield Residency', date: '2026-09-23' },
    { id: 't2', description: 'Cement & steel — L&T Supplies', detail: 'Invoice #INV-2291 · GST 18%', amount: -342000, type: 'expense', project: 'Whitefield Residency', date: '2026-09-23' },
    { id: 't3', description: 'Labour contractor payout', detail: 'Weekly wages', amount: -118500, type: 'expense', project: 'Whitefield Residency', date: '2026-09-18' },
    { id: 't4', description: 'Milestone payment received', detail: 'Client invoice #CL-114', amount: 860000, type: 'income', project: 'Whitefield Residency', date: '2026-09-18' },
    { id: 't5', description: 'Electrical fittings — Havells dist.', detail: 'Invoice #INV-2244 · GST 18%', amount: -76900, type: 'expense', project: 'Whitefield Residency', date: '2026-09-12' },
    { id: 't6', description: 'Lease deposit received', detail: 'Tenant agreement', amount: 650000, type: 'income', project: 'Koramangala Retail Block', date: '2026-09-05' },
    { id: 't7', description: 'Retail fit-out materials', detail: 'Invoice #INV-1987 · GST 18%', amount: -184200, type: 'expense', project: 'Koramangala Retail Block', date: '2026-09-05' },
];
export const FY_REPORTS = {
    '2024': {
        label: 'FY 2024–25',
        revenue: 9840000,
        expenses: 8215000,
        profit: 1625000,
        partners: [
            { name: 'Ravi Shankar', invested: '₹58,20,000', share: '38%', pl: '+₹6,17,500', positive: true },
            { name: 'Meera Kapoor', invested: '₹41,35,000', share: '27%', pl: '+₹4,38,750', positive: true },
            { name: 'Arjun Nair', invested: '₹32,15,000', share: '21%', pl: '+₹3,41,250', positive: true },
            { name: 'Sunita Desai', invested: '₹21,43,000', share: '14%', pl: '+₹2,27,500', positive: true },
        ],
    },
    '2025': {
        label: 'FY 2025–26',
        revenue: 11260000,
        expenses: 10980000,
        profit: 280000,
        partners: [
            { name: 'Ravi Shankar', invested: '₹64,50,000', share: '38%', pl: '+₹1,06,400', positive: true },
            { name: 'Meera Kapoor', invested: '₹45,80,000', share: '27%', pl: '+₹75,600', positive: true },
            { name: 'Arjun Nair', invested: '₹35,60,000', share: '21%', pl: '−₹18,200', positive: false },
            { name: 'Sunita Desai', invested: '₹23,70,000', share: '14%', pl: '+₹39,200', positive: true },
        ],
    },
    '2026': {
        label: 'FY 2026–27',
        revenue: 14620000,
        expenses: 12379400,
        profit: 2240600,
        partners: [
            { name: 'Ravi Shankar', invested: '₹70,11,000', share: '38%', pl: '+₹8,51,428', positive: true },
            { name: 'Meera Kapoor', invested: '₹49,81,500', share: '27%', pl: '+₹6,04,962', positive: true },
            { name: 'Arjun Nair', invested: '₹38,74,500', share: '21%', pl: '−₹42,300', positive: false },
            { name: 'Sunita Desai', invested: '₹25,83,000', share: '14%', pl: '+₹3,13,684', positive: true },
        ],
    },
};
export const seedSessions = [
    { id: 's1', icon: 'cellphone', device: 'iPhone 15 · Bengaluru', meta: 'Active now', current: true },
    { id: 's2', icon: 'laptop', device: 'Chrome · Windows', meta: 'Bengaluru · 2 days ago' },
    { id: 's3', icon: 'tablet', device: 'Safari · iPad', meta: 'Mumbai · 12 Sep' },
];
export const AVATAR_COLORS = ['#e8ab3f', '#57b98a', '#e0765a', '#8b7ef0', '#4aa8c9', '#c9862a'];
export const FAQS = [
    {
        q: "How is each partner's profit share calculated?",
        a: "Profit is split by each partner's investment percentage for the project, prorated from their joining date within the financial year.",
    },
    {
        q: 'What happens when a partner joins mid-year?',
        a: "Their share only applies from their joining date onward — earlier transactions and GST periods aren't counted against them.",
    },
    {
        q: 'Can I export GST reports for filing?',
        a: 'Yes — open Reports, pick the financial year, and use Export to download a partner-wise statement.',
    },
];
