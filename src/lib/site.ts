const WHATSAPP_NUMBER = "201028585760";

export const DEFAULT_WHATSAPP_MESSAGE = "Hi Nada, I found your portfolio and would like to discuss a data project.";

export const site = {
  name: "Nada Mohamed",
  fullName: "Nada Mohamed Abd ElRasoul",
  role: "Data Analyst",
  location: "Alexandria, Egypt",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://nada-mohamed-data.vercel.app").replace(/\/$/, ""),
  description:
    "Nada Mohamed is a Data Analyst in Alexandria, Egypt, building Power BI reports, SQL data models and DAX measures for loyalty, retail and operations teams. Product Analyst at Loynova and freelance analyst with 95+ dashboards delivered.",
  email: "nadamghrabia@gmail.com",
  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: "+20 102 858 5760",
    url: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  links: {
    linkedin: "https://www.linkedin.com/in/nada-mohamed-40569826a",
    upwork: "https://www.upwork.com/freelancers/~01f76f70eeb717e034",
    khamsat: "https://khamsat.com/user/itsnada_mo_21",
    resume: "https://drive.google.com/file/d/1yv5I_FvFKmcK1RikVWnKKXCrEzg7ewzn/view",
    certificates: "https://drive.google.com/drive/folders/1pWSKRUvidUkOB2Av3Wu9ygssvB_9CMfk",
    instagram: "https://www.instagram.com/nada.mghrabia",
    tiktok: "https://www.tiktok.com/@nada.mghrabia",
  },
} as const;

/** Builds a wa.me link, optionally with a pre-filled message. */
export function whatsappUrl(message?: string) {
  return message ? `${site.whatsapp.url}?text=${encodeURIComponent(message)}` : site.whatsapp.url;
}

export const nav = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "power-bi", label: "Power BI" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
