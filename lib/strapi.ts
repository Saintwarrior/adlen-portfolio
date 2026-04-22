import {
  faq as mockFaq,
  processSteps as mockProcess,
  projects as mockProjects,
  services as mockServices,
  settings as mockSettings,
  stats as mockStats,
  team as mockTeam,
  testimonials as mockTestimonials,
  capabilitiesMarquee as mockMarquee,
} from "./mock";
import type {
  FAQItem,
  ProcessStep,
  Project,
  Service,
  SiteSettings,
  Stat,
  TeamMember,
  Testimonial,
} from "./types";

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;
const REVALIDATE = Number(process.env.STRAPI_REVALIDATE ?? 60);

type StrapiCollection<T> = {
  data: Array<{ id: number; attributes: T } | T>;
};

async function strapiFetch<T>(path: string): Promise<T | null> {
  if (!STRAPI_URL) return null;
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, {
      headers: STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {},
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/**
 * Each getter returns Strapi data when STRAPI_URL is set and the fetch succeeds,
 * otherwise falls back to local mock data. Shape-matching between Strapi and
 * our domain types is handled in `mapStrapi*` helpers (add when wiring CMS).
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await strapiFetch<{ data: { attributes: SiteSettings } }>(
    "/api/site-setting?populate=*"
  );
  return remote?.data?.attributes ?? mockSettings;
}

export async function getStats(): Promise<Stat[]> {
  const remote = await strapiFetch<StrapiCollection<Stat>>("/api/stats?sort=order");
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) => ("attributes" in d ? d.attributes : (d as Stat)));
  }
  return mockStats;
}

export async function getServices(): Promise<Service[]> {
  const remote = await strapiFetch<StrapiCollection<Service>>(
    "/api/services?sort=order&populate=*"
  );
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) => ("attributes" in d ? d.attributes : (d as Service)));
  }
  return mockServices;
}

export async function getProcess(): Promise<ProcessStep[]> {
  const remote = await strapiFetch<StrapiCollection<ProcessStep>>(
    "/api/process-steps?sort=num"
  );
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) =>
      "attributes" in d ? d.attributes : (d as ProcessStep)
    );
  }
  return mockProcess;
}

export async function getTeam(): Promise<TeamMember[]> {
  const remote = await strapiFetch<StrapiCollection<TeamMember>>(
    "/api/team-members?sort=order"
  );
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) =>
      "attributes" in d ? d.attributes : (d as TeamMember)
    );
  }
  return mockTeam;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const remote = await strapiFetch<StrapiCollection<Testimonial>>(
    "/api/testimonials?sort=order"
  );
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) =>
      "attributes" in d ? d.attributes : (d as Testimonial)
    );
  }
  return mockTestimonials;
}

export async function getFAQ(): Promise<FAQItem[]> {
  const remote = await strapiFetch<StrapiCollection<FAQItem>>(
    "/api/faq-items?sort=order"
  );
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) =>
      "attributes" in d ? d.attributes : (d as FAQItem)
    );
  }
  return mockFaq;
}

export async function getProjects(): Promise<Project[]> {
  const remote = await strapiFetch<StrapiCollection<Project>>(
    "/api/projects?sort=order&populate=deep"
  );
  if (remote?.data && Array.isArray(remote.data) && remote.data.length) {
    return remote.data.map((d) => ("attributes" in d ? d.attributes : (d as Project)));
  }
  return mockProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getMarquee(): Promise<string[]> {
  const remote = await strapiFetch<{ data: { attributes: { items: string[] } } }>(
    "/api/capabilities-marquee?populate=*"
  );
  return remote?.data?.attributes?.items ?? mockMarquee;
}
