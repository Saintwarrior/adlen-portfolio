import { Hero } from "@/components/landing/Hero";
import { Telemetry } from "@/components/landing/Telemetry";
import { Stats } from "@/components/landing/Stats";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Cases } from "@/components/landing/Cases";
import { Team } from "@/components/landing/Team";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQWrapper } from "@/components/landing/FAQWrapper";
import { CTA } from "@/components/landing/CTA";

export default function Page() {
  return (
    <>
      <Hero />
      <Telemetry />
      <Stats />
      <Services />
      <Process />
      <Cases />
      <Team />
      <Testimonials />
      <FAQWrapper />
      <CTA />
    </>
  );
}
