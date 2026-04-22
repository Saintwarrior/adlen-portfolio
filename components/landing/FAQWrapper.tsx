import { getFAQ } from "@/lib/strapi";
import { FAQ } from "./FAQ";

export async function FAQWrapper() {
  const items = await getFAQ();
  return <FAQ items={items} />;
}
