export type SiteSettings = {
  brandName: string;
  tagline: string;
  city: string;
  email: string;
  phone: string;
  telegram: string;
  whatsapp?: string;
  instagram?: string;
  legalName: string;
  address: string;
  foundedYear: number;
};

export type Stat = {
  value: string;
  label: string;
  hint?: string;
};

export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  bullets: string[];
};

export type ProjectOutcome = {
  metric: string;
  label: string;
};

export type ProjectSolutionBlock = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: string;
  role: string;
  summary: string;
  teaser: string;
  url?: string;
  tags: string[];
  problem: string;
  solution: ProjectSolutionBlock[];
  outcomes: ProjectOutcome[];
  stack: {
    backend: string[];
    frontend: string[];
    infra: string[];
  };
  duration?: string;
  accent?: string;
};

export type TeamMember = {
  initials: string;
  role: string;
  yearsWithTeam: number;
  stack: string[];
  lead?: boolean;
};

export type Testimonial = {
  quote: string;
  attribution: string;
  project?: string;
};

export type FAQItem = {
  q: string;
  a: string;
};

export type ProcessStep = {
  num: string;
  title: string;
  body: string;
  artifacts: string[];
  duration: string;
};
