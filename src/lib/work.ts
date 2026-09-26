/**
 * Portfolio content: every dashboard recreation from the original site, grouped into case studies.
 *
 * All figures inside the dashboards are dummy values — the layouts mirror real client deliverables,
 * the data does not. Case-study copy therefore describes what each report was built to answer,
 * never business results that were not documented.
 */

export type Domain = "loyalty" | "commercial" | "operations" | "people";

export const domains: Record<Domain, string> = {
  loyalty: "Loyalty & Rewards",
  commercial: "Retail & Commercial",
  operations: "Operations",
  people: "People Analytics",
};

export type Dashboard = {
  /** Matches the file name in src/content/dashboards. */
  id: string;
  title: string;
  summary: string;
  tools: string[];
  domain: Domain;
  /** Accent colour of the report theme, used for card chrome. */
  color: string;
  rtl?: boolean;
};

export const dashboards: Dashboard[] = [
  {
    id: "02",
    title: "Rewards Platform — Daily Operations",
    summary:
      "“Prior day” snapshot for a scan-to-earn rewards platform: new enrollments, active scanners, earning and spending value, transaction logs, scanner-type breakdown, product-class performance and partner-location metrics.",
    tools: ["Power BI", "DAX", "SQL"],
    domain: "loyalty",
    color: "#b81f24",
  },
  {
    id: "03",
    title: "Scan-to-Earn — Earning Analytics",
    summary:
      "Value earned from scanned products, welcome points, active earners, generated vs scanned codes and per-user averages — with scan geography by district and city and product-level scanner insights.",
    tools: ["Power BI", "Azure Maps", "DAX", "SQL"],
    domain: "loyalty",
    color: "#6d28d9",
  },
  {
    id: "04",
    title: "Points Spending Analytics",
    summary:
      "Spent value, spender counts and per-user averages, a monthly spending-rate trend, a spending-rate gauge, and partner/branch league tables with combined bar-line visuals.",
    tools: ["Power BI", "DAX", "SQL"],
    domain: "loyalty",
    color: "#be185d",
  },
  {
    id: "05",
    title: "Members & Registrations",
    summary:
      "Total registrations, live points balance and value liability, a per-member status table, monthly registration trend, earner/spender segmentation and city-wise distribution.",
    tools: ["Power BI", "DAX", "SQL"],
    domain: "loyalty",
    color: "#4338ca",
  },
  {
    id: "06",
    title: "Restaurant Group — Tiers, Channels & Breakage",
    summary:
      "Executive one-pager for a multi-brand restaurant group: member universe and balances, earning and spending KPIs since inception vs post-relaunch, tier distribution, dine-in / delivery / app channel analysis, and spending-rate and breakage-rate gauges.",
    tools: ["Power BI", "DAX", "SQL"],
    domain: "loyalty",
    color: "#2c8c7d",
  },
  {
    id: "07",
    title: "Precious-Metals Retailer — Points & Products",
    summary:
      "Earning analytics for a gold & bullion retailer: earned amount and points, earner counts and per-customer averages, merchant and branch value splits, a monthly amount trend, product mix across ingots and coins, and a member ledger.",
    tools: ["Power BI", "DAX", "Excel"],
    domain: "loyalty",
    color: "#a8801f",
  },
  {
    id: "16",
    title: "Building-Materials Producer — Contractor Rewards",
    summary:
      "B2B rewards tracking with a block-card design: spent amount, customer and reward-user counts, balances and top-ups, average spend and transaction frequency, a two-year monthly spend comparison and tier segmentation — switchable between project and campaign views.",
    tools: ["Power BI", "DAX", "Excel"],
    domain: "loyalty",
    color: "#1f5c32",
  },
  {
    id: "08",
    title: "World Cup Raffle — Live Campaign Health",
    summary:
      "Real-time view of a flags & vouchers raffle: codes used, winners, flags awarded and vouchers received, weekly and daily activity trends, a flag-country leaderboard and city-wise winner distribution.",
    tools: ["Power BI", "DAX", "Power Query"],
    domain: "loyalty",
    color: "#1e3a8a",
  },
  {
    id: "13",
    title: "Raffle Campaign — Winners Deep-Dive",
    summary:
      "Second page of the raffle report: flags and vouchers won by source, flags-vs-vouchers split, gender and city distribution of winners, a country leaderboard and an anonymised winners table.",
    tools: ["Power BI", "DAX", "Power Query"],
    domain: "loyalty",
    color: "#b08a3e",
  },
  {
    id: "01",
    title: "Sales & Marketing — Campaigns & Reps",
    summary:
      "Commercial overview: revenue, visits, time-on-page and conversion KPIs with trend deltas, engagement vs order value, sales-rep contribution, a top-campaigns table and keyword performance.",
    tools: ["Power BI", "DAX", "Excel"],
    domain: "commercial",
    color: "#1d3f8f",
  },
  {
    id: "11",
    title: "Supermarket Chain — Sales & Categories",
    summary:
      "Net sales, basket count and average basket value, promo contribution and shrinkage, monthly seasonality, a category league table and payment-method mix — filterable by store and period.",
    tools: ["Power BI", "DAX", "Power Query"],
    domain: "commercial",
    color: "#15803d",
  },
  {
    id: "15",
    title: "Cosmetics Brand — Makeup Sales Performance",
    summary:
      "Quantity, sales, cost and profit KPIs, a sold-vs-available conversion donut, a drillable inventory matrix with quantity and sales shares, a top-10 category dual-axis chart and a branch sales league.",
    tools: ["Power BI", "DAX", "Excel"],
    domain: "commercial",
    color: "#b76e79",
  },
  {
    id: "14",
    title: "Call Center — Year-over-Year Comparison",
    summary:
      "Call volume by direction, daily call trends across three lines, complaint-type breakdown and daily complaint and order volumes — with slicers for queue, direction, complaint type, city and period.",
    tools: ["Power BI", "DAX", "Power Query"],
    domain: "operations",
    color: "#7a1f2b",
  },
  {
    id: "10",
    title: "Fleet & Delivery Operations",
    summary:
      "Active vehicles, on-time rate, distance covered, daily delivery trend, top routes by volume, vehicle status split and a per-driver performance log.",
    tools: ["Power BI", "DAX", "SQL"],
    domain: "operations",
    color: "#c2410c",
  },
  {
    id: "09",
    title: "Truck Sales Analysis — Arabic RTL",
    summary:
      "Fully right-to-left Arabic report for a mobile truck-sales operation: cashier sales, network vs cash collections, deficit tracking, per-worker sales contribution and expense breakdown across five branches.",
    tools: ["Power BI", "DAX", "RTL design"],
    domain: "operations",
    color: "#b3161b",
    rtl: true,
  },
  {
    id: "12",
    title: "People Analytics — HR & Attendance",
    summary:
      "Headcount, attendance and turnover rates, open positions, overtime load, a present-vs-absent trend, department headcount league, a satisfaction gauge and an employee directory.",
    tools: ["Power BI", "DAX", "Excel"],
    domain: "people",
    color: "#0f5e5e",
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  kicker: string;
  domain: Domain;
  /** One-line hook for cards. */
  teaser: string;
  dashboards: string[];
  tools: string[];
  problem: string;
  approach: string[];
  analysis: string[];
  /** The business questions the finished report answers. */
  questions: string[];
  outcome: string;
  featured?: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "loyalty-rewards-analytics",
    title: "Loyalty & Rewards Analytics Suite",
    kicker: "Four-page Power BI report · scan-to-earn platform",
    domain: "loyalty",
    teaser:
      "One model, four audiences: daily operations, earning, spending and members — so the whole points economy is readable from a single report.",
    dashboards: ["02", "03", "04", "05"],
    tools: ["Power BI", "DAX", "SQL", "Power Query", "Azure Maps"],
    problem:
      "A scan-to-earn rewards platform generates a constant stream of transactions — codes generated and scanned, points earned, points spent at partner branches, new members joining. Raw logs can't tell an operations team what happened yesterday, or tell a product team whether members are actually coming back to spend.",
    approach: [
      "Modelled earning transactions, spending transactions, members, products, partners and branches as one connected model instead of separate extracts, so every page filters consistently.",
      "Split the report by audience: a “prior day” operations page, an earning page, a spending page and a members page, sharing the same navigation bar.",
      "Wrote DAX measures for per-user and per-transaction averages (scans per user, value per scan, value per spender) and the spending rate that ties earning and spending together.",
      "Kept transaction and member tables drill-able while anonymising identifying fields.",
    ],
    analysis: [
      "Daily operational monitoring against the previous day",
      "Earn-vs-burn tracking via a monthly spending-rate trend and gauge",
      "Geographic analysis of scans by district and city (Azure Maps)",
      "Partner and branch league tables with combined bar-line visuals",
      "Member segmentation: earners vs spenders vs total registered",
      "Points balance and value liability outstanding",
    ],
    questions: [
      "How many members enrolled, scanned and spent yesterday — and through which scanner type?",
      "Which products drive earning, and where geographically are codes being scanned?",
      "What share of earned value is actually being spent, and is that rate moving month to month?",
      "Which partners and branches attract the most spenders and spent value?",
      "How large is the outstanding points balance the programme carries?",
    ],
    outcome:
      "A single reporting layer covering the whole points lifecycle — enrollment, earning, spending and balance — giving operations a daily check and product teams a view of member behaviour, from the same trusted model.",
    featured: true,
  },
  {
    slug: "raffle-campaign-monitoring",
    title: "Live Raffle Campaign Monitoring",
    kicker: "Real-time campaign report · flags & vouchers raffle",
    domain: "loyalty",
    teaser:
      "A campaign that runs for weeks needs a live pulse — codes used, winners, prizes and where the winners are.",
    dashboards: ["08", "13"],
    tools: ["Power BI", "DAX", "Power Query"],
    problem:
      "A World Cup–themed raffle rewarded customers with flags and vouchers. While it was running, the campaign team needed to know whether participation was on track, how prizes were being distributed, and who was winning — without waiting for an end-of-campaign export.",
    approach: [
      "Built a live campaign-health overview and a dedicated winners deep-dive, plus pages for customers, raffles and merchant performance.",
      "Used Power Query to shape code-usage and award data from different sources (code use vs manual award) into one consistent table.",
      "Added a source slicer so organic and manually awarded wins can be separated.",
      "Anonymised the winners detail table while keeping gender and city attributes for analysis.",
    ],
    analysis: [
      "Weekly and daily participation trends",
      "Prize-mix analysis: flags won vs voucher requests",
      "Leaderboard of most-awarded flag countries",
      "Demographic and geographic distribution of winners",
    ],
    questions: [
      "Is code usage rising or falling across the week, and on which days does the campaign peak?",
      "How are prizes splitting between flags and vouchers?",
      "Which cities and customer groups are the winners coming from?",
      "How many wins came from code use vs manual awards?",
    ],
    outcome:
      "The campaign team could follow participation and prize distribution while the raffle was live, and drill from headline totals down to individual winners.",
    featured: true,
  },
  {
    slug: "restaurant-group-loyalty",
    title: "Restaurant Group — Tiers, Channels & Breakage",
    kicker: "Executive one-pager · multi-brand restaurant loyalty",
    domain: "loyalty",
    teaser:
      "An executive page that compares the programme since inception with its performance after relaunch — by tier, channel and brand.",
    dashboards: ["06"],
    tools: ["Power BI", "DAX", "SQL"],
    problem:
      "A multi-brand restaurant group's loyalty programme had been relaunched. Leadership needed to see the whole member universe and balance, but also judge the programme on its post-relaunch behaviour rather than a lifetime total that blends old and new.",
    approach: [
      "Designed two KPI bands: lifetime metrics (universe, balance, earning, spend) and a post-relaunch band for spending behaviour.",
      "Wrote DAX for purchase and spend frequency, average spend per customer, spending rate and breakage rate.",
      "Added brand, tier and channel slicers so each brand can be read on its own.",
    ],
    analysis: [
      "Before/after comparison around the relaunch date",
      "Channel analysis across dine-in, delivery and app",
      "Tier distribution of cardholders",
      "Spending-rate and breakage-rate gauges",
    ],
    questions: [
      "How many members are active out of the total universe?",
      "Since relaunch, what share of members spend points, and how often?",
      "Which channels produce earners and which produce spenders?",
      "How much issued value is likely never to be redeemed (breakage)?",
    ],
    outcome:
      "A one-page executive read of programme health that separates lifetime totals from post-relaunch behaviour, with the liability view (balance, breakage) alongside engagement.",
    featured: true,
  },
  {
    slug: "call-center-yoy",
    title: "Call Center — Year-over-Year Performance",
    kicker: "Operational comparison report",
    domain: "operations",
    teaser:
      "Two years of calls, complaints and orders on one timeline, sliced by queue, direction, complaint type and city.",
    dashboards: ["14"],
    tools: ["Power BI", "DAX", "Power Query"],
    problem:
      "A call center needed to understand whether this year's workload looked different from last year's — not just in total calls, but in the mix of inbound vs outbound traffic, complaint types and order volume.",
    approach: [
      "Aligned both years on a shared daily axis so trends can be compared day for day.",
      "Built slicers for queue, direction, complaint type, city and period.",
      "Separated three volume series — calls, complaints and orders — so service load and commercial activity are visible side by side.",
    ],
    analysis: [
      "Year-over-year comparison on a common calendar",
      "Call-direction mix",
      "Complaint-type breakdown",
      "Daily trend analysis across three lines",
    ],
    questions: [
      "Is total call volume higher or lower than the same period last year?",
      "Which complaint types are growing?",
      "Do complaint spikes line up with order volume?",
    ],
    outcome:
      "A like-for-like comparison view that lets managers explain changes in workload by direction, complaint type and city instead of a single headline number.",
  },
  {
    slug: "arabic-truck-sales",
    title: "Truck Sales Analysis — Arabic RTL",
    kicker: "Fully right-to-left Arabic report",
    domain: "operations",
    teaser:
      "A report designed natively in Arabic: collections, deficits and per-worker contribution across five branches.",
    dashboards: ["09"],
    tools: ["Power BI", "DAX", "RTL design"],
    problem:
      "A mobile truck-sales operation needed to reconcile what cashiers sold against what was collected by card network and in cash, spot deficits, and see each worker's contribution — for a team that works in Arabic.",
    approach: [
      "Designed the entire layout right-to-left: navigation, KPI order, chart axes and tables all read naturally in Arabic.",
      "Built collection measures that separate network and cash, and a deficit measure that reconciles them against cashier sales.",
      "Added worker, branch and month slicers.",
    ],
    analysis: [
      "Sales vs collections reconciliation",
      "Deficit tracking",
      "Per-worker share of sales and transactions",
      "Expense breakdown by type across branches",
    ],
    questions: [
      "Does collected money (network + cash) match cashier sales, and where is the gap?",
      "Which workers carry the largest share of sales?",
      "How do expenses break down per branch?",
    ],
    outcome:
      "A reconciliation-focused report the operations team can read in its own language, with deficits visible at worker and branch level.",
  },
  {
    slug: "retail-commercial-performance",
    title: "Retail & Commercial Performance",
    kicker: "Three reports · marketing, grocery and beauty retail",
    domain: "commercial",
    teaser:
      "Sales, baskets, categories, campaigns and profit — the commercial questions retailers ask every week.",
    dashboards: ["11", "15", "01"],
    tools: ["Power BI", "DAX", "Power Query", "Excel"],
    problem:
      "Retail teams — a supermarket chain, a cosmetics brand and a sales & marketing team — each needed a weekly view of what is selling, where, and at what margin, beyond flat sales exports.",
    approach: [
      "Grocery: basket-level KPIs (baskets, average basket value) alongside promo share and shrinkage rate.",
      "Cosmetics: a drillable inventory matrix and a sold-vs-available conversion view, with cost and profit.",
      "Sales & marketing: campaign and rep contribution with trend deltas on each KPI.",
    ],
    analysis: [
      "Monthly seasonality",
      "Category and branch league tables",
      "Sell-through (sold vs available)",
      "Promo contribution and shrinkage",
      "Sales-rep and campaign contribution",
    ],
    questions: [
      "Which categories and branches drive sales volume and profit?",
      "How dependent are sales on promotions, and how much is lost to shrinkage?",
      "How much available stock is actually selling?",
      "Which campaigns and reps contribute most to revenue?",
    ],
    outcome:
      "Commercial reports that put margin, sell-through and promotion dependency next to the sales total, so trading decisions aren't made on revenue alone.",
  },
  {
    slug: "b2b-and-retail-rewards",
    title: "B2B & Retail Rewards Programmes",
    kicker: "Two programmes · contractors and bullion retail",
    domain: "loyalty",
    teaser:
      "Rewards reporting outside the coffee-shop stereotype: contractors topping up balances and customers earning on gold.",
    dashboards: ["16", "07"],
    tools: ["Power BI", "DAX", "Excel"],
    problem:
      "A building-materials producer rewards contractors, and a gold & bullion retailer rewards customers on purchases. Both needed to see who uses the programme, how balances move, and which merchants, branches or tiers matter most.",
    approach: [
      "Contractor programme: balance and top-up tracking with a switch between project and campaign views, and a two-year monthly spend comparison.",
      "Bullion retailer: earning analytics by merchant, branch and product (ingots vs coins), with a member ledger.",
      "Tier segmentation and per-customer averages in both.",
    ],
    analysis: [
      "Users vs non-users of the programme",
      "Two-year monthly comparison",
      "Merchant, branch and product mix",
      "Tier segmentation",
    ],
    questions: [
      "What share of customers actually use their rewards?",
      "Is spend this year tracking ahead of last year, month by month?",
      "Which products, merchants and branches generate earned value?",
    ],
    outcome:
      "Programme-level visibility for two very different reward models, built on the same KPI thinking: participation, frequency, value and balance.",
  },
  {
    slug: "operations-and-people",
    title: "Fleet Operations & People Analytics",
    kicker: "Two operational reports",
    domain: "people",
    teaser: "Deliveries, routes and drivers — and headcount, attendance and turnover.",
    dashboards: ["10", "12"],
    tools: ["Power BI", "DAX", "SQL", "Excel"],
    problem:
      "Operations and HR teams run on daily numbers too: a delivery fleet needs to know if it is on time and where volume concentrates; an HR team needs attendance, turnover and overtime in one place.",
    approach: [
      "Fleet: on-time rate, distance and deliveries per day, top routes and a per-driver log.",
      "HR: attendance and turnover rates, open positions, overtime load and a satisfaction gauge, with an employee directory.",
    ],
    analysis: [
      "Daily trend monitoring",
      "Route and department league tables",
      "Status splits (vehicles, present vs absent)",
      "Rate KPIs: on-time, attendance, turnover",
    ],
    questions: [
      "Are deliveries on time, and which routes carry the most volume?",
      "Which departments have attendance or overtime pressure?",
      "How is turnover trending over the last 12 months?",
    ],
    outcome:
      "Rate-based operational views that make exceptions — late routes, absent teams, overtime load — easy to spot.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}

export function getDashboard(id: string) {
  return dashboards.find((d) => d.id === id);
}

export function caseStudyForDashboard(id: string) {
  return caseStudies.find((c) => c.dashboards.includes(id));
}

export const stats = {
  industries: 9,
};
