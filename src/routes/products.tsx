import { createFileRoute } from "@tanstack/react-router";
import { Baby, HeartPulse, PackageCheck, Pill, Stethoscope, Syringe } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import productsHero from "@/assets/hero-img/ChatGPT Image Aug 17, 2026, 10_32_03 AM.png";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products - Favored PLC" },
      {
        name: "description",
        content:
          "Favored PLC's focused product offer for maternal care, child care, and critical care.",
      },
      { property: "og:title", content: "Products - Favored PLC" },
      {
        property: "og:description",
        content: "A focused healthcare supply offer, confirmed through direct inquiry.",
      },
      { property: "og:url", content: "/products" },
    ],
    links: [{ rel: "canonical", href: "/products" }],
  }),
  component: Products,
});

const areas = [
  {
    id: "maternal-care",
    number: "01",
    title: "Maternal care",
    body: "Selected products that support pregnancy, safe childbirth, and postnatal care in institutional settings.",
    icon: HeartPulse,
    needs: ["Obstetric pharmaceuticals", "Delivery-room supplies", "Maternal monitoring equipment"],
  },
  {
    id: "child-care",
    number: "02",
    title: "Child care",
    body: "Selected products for newborn, infant, and paediatric care across hospitals, clinics, and pharmacies.",
    icon: Baby,
    needs: ["Paediatric formulations", "Newborn-care supplies", "Child-health equipment"],
  },
  {
    id: "critical-care",
    number: "03",
    title: "Critical care",
    body: "Priority products for emergency rooms, intensive-care units, operating rooms, and urgent clinical needs.",
    icon: Stethoscope,
    needs: [
      "Critical-care pharmaceuticals",
      "Airway and access supplies",
      "Monitoring and support equipment",
    ],
  },
];

const core = [
  {
    title: "Pharmaceuticals",
    body: "A broad range of registered prescription and non-prescription products.",
    icon: Pill,
  },
  {
    title: "Medical supplies",
    body: "Institutional consumables and procedure-related supplies selected against customer requirements.",
    icon: Syringe,
  },
  {
    title: "Medical equipment",
    body: "Selected equipment supported by relevant manufacturer, device, and quality documentation.",
    icon: PackageCheck,
  },
];

function Products() {
  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section className="flex flex-col items-center bg-white px-6 pb-16 pt-28 text-center sm:px-8 sm:pb-24 sm:pt-40 lg:px-12">
        <div className="mx-auto mb-12 max-w-4xl sm:mb-16">
          <h1
            className="mb-6 font-display text-[1.75rem] font-medium leading-[1.05] text-[#26221f] sm:text-[2.75rem] lg:text-[3.75rem]"
            style={{ letterSpacing: "-0.04em" }}
          >
            Selected products. <span className="text-[var(--brand)]">Clear priorities.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-[var(--ink)]/70 sm:text-lg">
            Favored focuses on three therapeutic areas and three core product types. Current
            availability is confirmed directly with our sales team.
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] overflow-hidden rounded-[2rem] bg-[#E6F6ED] sm:rounded-[3.5rem]">
          <img
            src={productsHero}
            alt="Products"
            className="h-[30vh] w-full object-contain sm:h-[70vh] lg:h-[80vh]"
          />
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <SectionLabel>Therapeutic areas</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              A focused offer for the care settings that matter most.
            </h2>
          </Reveal>
          <div className="mt-14 space-y-5">
            {areas.map(({ id, number, title, body, icon: Icon, needs }) => (
              <Reveal key={id}>
                <article
                  id={id}
                  className="scroll-mt-28 rounded-[2rem] border border-black/5 bg-[var(--mist)] p-7 sm:p-10"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div className="flex items-center gap-4 lg:col-span-4">
                      <span className="font-mono text-xs text-[var(--brand)]">{number}</span>
                      <Icon className="h-6 w-6 text-[var(--brand)]" strokeWidth={1.5} />
                      <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
                    </div>
                    <p className="text-lg leading-relaxed text-[var(--ink)]/65 lg:col-span-4">
                      {body}
                    </p>
                    <ul className="space-y-3 lg:col-span-4">
                      {needs.map((need) => (
                        <li key={need} className="flex items-center gap-3 text-sm font-medium">
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                          {need}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="core-offer" className="scroll-mt-28 bg-[#082923] py-24 text-white sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <SectionLabel>Core offer</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Three product types at the centre of the business.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {core.map(({ title, body, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="h-full rounded-[2rem] border border-white/10 bg-white/[.055] p-8">
                  <Icon className="h-7 w-7 text-[var(--brand)]" strokeWidth={1.5} />
                  <h3 className="mt-14 font-display text-3xl">{title}</h3>
                  <p className="mt-4 leading-relaxed text-white/60">{body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
