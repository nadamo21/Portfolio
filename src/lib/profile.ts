/** Career content, sourced from Nada's résumé and the original portfolio. Nothing here is invented. */

export type Role = {
  title: string;
  org: string;
  /** Month precision, "YYYY-MM". `start` is null when the résumé gives no start date. */
  start: string | null;
  end: string | null;
  period: string;
  kind: "analytics" | "teaching";
  points: string[];
  tags: string[];
};

export const roles: Role[] = [
  {
    title: "Product Analyst",
    org: "Loynova",
    start: "2025-08",
    end: null,
    period: "Aug 2025 — Present",
    kind: "analytics",
    points: [
      "Design and develop interactive Power BI dashboards to monitor and optimise customer loyalty programmes — points earning, redemption behaviour, merchant performance and campaign results.",
      "Translate stakeholder requirements into data models, DAX measures and multi-page reports used for day-to-day product decisions.",
    ],
    tags: ["Power BI", "DAX", "Data modeling", "Loyalty analytics"],
  },
  {
    title: "Freelance Data Analyst",
    org: "Khamsat & Upwork",
    start: "2024-09",
    end: null,
    period: "Sep 2024 — Present",
    kind: "analytics",
    points: [
      "Delivered dashboards and data-analysis projects for clients across multiple industries, handling the full cycle from raw data to polished interactive reports.",
      "Built a reputation with repeat clients for speed, accuracy and responsiveness to revisions.",
    ],
    tags: ["Power BI", "SQL", "Power Query", "Excel"],
  },
  {
    title: "Coding Instructor",
    org: "iSchool",
    start: "2025-03",
    end: "2025-08",
    period: "Mar 2025 — Aug 2025",
    kind: "teaching",
    points: ["Taught coding concepts and programming fundamentals; earned Top Tutor recognition two months in a row."],
    tags: ["Teaching", "Programming"],
  },
  {
    title: "Freelancer Coach — Data Analysis Track",
    org: "EYouth & Ministry of Communications and IT",
    start: "2025-02",
    end: "2025-05",
    period: "Feb 2025 — May 2025",
    kind: "teaching",
    points: ["Coached aspiring data analysts on freelancing strategy, portfolio building and technical skills."],
    tags: ["Coaching", "Data analysis"],
  },
  {
    title: "Robotics & Programming Instructor",
    org: "Techno Future",
    start: null,
    end: "2025-03",
    period: "Until Mar 2025",
    kind: "teaching",
    points: [
      "Taught robotics, programming and hands-on embedded applications.",
      "Judge at the Artificial Intelligence Olympiad (AIO) for embedded-systems projects, and coach at FIRST LEGO League (FLL).",
    ],
    tags: ["Robotics", "Embedded", "AI Olympiad judge"],
  },
  {
    title: "Data Science Intern",
    org: "Prodigy InfoTech",
    start: "2024-01",
    end: "2024-12",
    period: "2024",
    kind: "analytics",
    points: ["Cleaned and prepared real-world datasets for analysis; received a recommendation letter for exceptional contributions."],
    tags: ["Python", "Data cleaning"],
  },
];

export const education = {
  degree: "B.Sc. Computer Science & Statistics",
  school: "Alexandria University, Faculty of Science",
  period: "2020 — 2024",
  project:
    "Graduation project (Grade A): a tourism mobile app built with Flutter and Firebase, with a machine-learning recommendation system.",
};

export type Credential = { name: string; issuer: string; note?: string; highlight?: boolean };

export const credentials: Credential[] = [
  {
    name: "Kaggle Expert",
    issuer: "Kaggle",
    note: "Awarded for published data-science and machine-learning analysis notebooks.",
    highlight: true,
  },
  {
    name: "Microsoft Power BI Engineer",
    issuer: "DEPI · Ministry of Communications and IT",
    note: "2024 — advanced report building and data visualisation.",
    highlight: true,
  },
  { name: "Data Science Internship + recommendation letter", issuer: "Prodigy InfoTech" },
  { name: "Q Bronze Diploma — Quantum Computing Fundamentals", issuer: "QWorld & QEgypt" },
  { name: "Business English Track", issuer: "DEPI · OTO Courses" },
  { name: "English — Level 3 Advanced", issuer: "Ministry of Defense Language Institution" },
  { name: "Career in IT", issuer: "SRTA-City" },
  { name: "Embedded Systems summer training", issuer: "Faculty of Science, Alexandria University" },
];

export const recognition = [
  "Top Tutor at iSchool — two consecutive months",
  "Judge, Artificial Intelligence Olympiad (embedded systems)",
  "Coach, FIRST LEGO League",
];

export const languages = [
  { name: "Arabic", level: "Native" },
  { name: "English", level: "Advanced" },
  { name: "French", level: "Basic" },
];

export type SkillGroup = { title: string; blurb: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "BI & Visualisation",
    blurb: "Where most of the delivered work lives.",
    skills: ["Power BI", "Tableau", "Looker Studio", "Excel", "Google Sheets"],
  },
  {
    title: "Modelling & Measures",
    blurb: "The layer that makes a report trustworthy.",
    skills: ["DAX", "Power Query (M)", "Star-schema modelling", "KPI design"],
  },
  {
    title: "Data & Databases",
    blurb: "Getting the right rows out, cleanly.",
    skills: ["SQL", "PostgreSQL", "Data cleaning", "Data transformation"],
  },
  {
    title: "Python for Analysis",
    blurb: "For work that outgrows a spreadsheet.",
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter"],
  },
  {
    title: "Automation & ETL",
    blurb: "Doing it once, then never by hand again.",
    skills: ["Power Automate", "Power Query", "Python data pipelines"],
  },
  {
    title: "Engineering & Design",
    blurb: "A CS degree's worth of range.",
    skills: ["JavaScript", "HTML/CSS", "Java", "PHP", "Flutter/Dart", "Figma", "Adobe XD"],
  },
];

export type Review = { name: string; note?: string; ar: string; en: string; color: string };

/** Verbatim Khamsat reviews from the original portfolio, with English translations. */
export const reviews: Review[] = [
  {
    name: "Basheer A.",
    color: "#1f6e4a",
    ar: "إذا أردت التعامل مع الأفضل في مجال تحليل البيانات، فلا تبحث بعيدًا عن المهندسة ندى. إنها مثال حقيقي للإبداع والاحترافية، تمتلك رؤية تحليلية عميقة وقدرة مذهلة على تحويل البيانات إلى قرارات استراتيجية. تعاملها الراقي، دقتها الفائقة، وسرعتها في الإنجاز تجعلها أحد أفضل المختصين الذين تعاملت معهم على الإطلاق.",
    en: "If you want the best in data analysis, look no further than Eng. Nada — deep analytical vision and a remarkable ability to turn data into strategic decisions. Her precision and speed make her one of the best specialists I have ever worked with.",
  },
  {
    name: "Sanaa A.",
    color: "#a8506e",
    ar: "تعاملت معها وكانت التجربة أكثر من رائعة! شخصية في غاية اللطف والذوق، متعاونة جدًا، وتتقبل الملاحظات والتعديلات بكل رحابة صدر واهتمام بالتفاصيل. سريعة في الإنجاز، دقيقة في العمل، وتجاوبها مستمر ويعكس احترافية عالية. بصراحة من أفضل التجارب، وأنصح بالتعامل معها بكل ثقة.",
    en: "More than wonderful. Very cooperative, takes feedback and revisions openly and with attention to detail. Fast, accurate and consistently responsive — honestly one of the best experiences; I recommend her with full confidence.",
  },
  {
    name: "Amr A.",
    color: "#2b6e8a",
    ar: "عن تجربة، انصح وبقوة بالتعامل مع الاستاذة ندى، سريعة في الرد، شغل متقن واكثر من رائع، عملت المطلوب واكثر. شكرا وبارك الله فيك، واكيد راح اتعامل مرة ثالثة ان شاء الله.",
    en: "From experience, I strongly recommend Ms. Nada: quick to respond, meticulous work, did what was asked and more. I'll definitely be working with her a third time.",
  },
  {
    name: "Basheer A.",
    note: "Repeat client",
    color: "#1f6e4a",
    ar: "للمرة الثانية على التوالي: \"المهندسة ندى محترفة للغاية في تحليل البيانات، واهتمامها بالتفاصيل ودقتها في العمل جعلت التعاون معها تجربة رائعة. أنصح بشدة بالتعامل معها لأي شخص يحتاج إلى خدمة عالية الجودة.\"",
    en: "For the second time in a row: highly professional in data analysis — her attention to detail and precision made the collaboration a great experience.",
  },
  {
    name: "Mgeed S.",
    color: "#7b2fa8",
    ar: "ندى حقيقي مميزة ومتجاوبة بشكل سريع ومتجاوبة لأي تعديل احتاجه. شكرا ندى واكيد مش حتكون آخر مرة اتعامل معاك بإذن الله.",
    en: "Nada is genuinely outstanding and responds quickly to any change I need. It definitely won't be the last time I work with her.",
  },
  {
    name: "Mohammed T.",
    color: "#8a5a2b",
    ar: "شكرا جزيلا بشمهندسة ندى، الله يكثر من امثالك، انجاز في وقت قياسي والعمل اكثر من رائع، اتمنى لك كل التوفيق.",
    en: "Thank you, Eng. Nada — delivered in record time and the work is beyond excellent.",
  },
];
