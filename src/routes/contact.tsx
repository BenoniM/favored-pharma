import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { ArrowRight, Building2, CheckCircle2, MapPin, Phone, UserRound } from "lucide-react";
import { Reveal, SectionLabel } from "@/components/site";
import logoCroppedSvgUrl from "@/assets/logo/Logo-Cropped.svg?url";
import { company } from "@/lib/company";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Favored PLC" },
      {
        name: "description",
        content:
          "Contact Favored PLC sales, finance, or the CEO office, send an inquiry, and find our Addis Ababa office.",
      },
      { property: "og:title", content: "Contact Favored PLC" },
      {
        property: "og:description",
        content: "Product, procurement, finance, and partnership inquiries.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const contacts = [
  {
    title: "Sales",
    subtitle: "Products, quotations & availability",
    phone: company.contacts.sales.phone,
    icon: Building2,
  },
  {
    title: "Finance",
    subtitle: "Invoices, payments & accounts",
    phone: company.contacts.finance.phone,
    icon: Phone,
  },
  {
    title: "CEO Office",
    subtitle: company.contacts.ceo.name,
    phone: company.contacts.ceo.phone,
    icon: UserRound,
  },
];

type Inquiry = {
  name: string;
  organization: string;
  phone: string;
  type: string;
  message: string;
};

function Contact() {
  const [form, setForm] = useState<Inquiry>({
    name: "",
    organization: "",
    phone: "",
    type: "Product availability",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: keyof Inquiry, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden bg-white text-[var(--ink)]">
      <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[var(--ink)] text-white">
        <img
          src="https://images.pexels.com/photos/51953/mother-daughter-love-sunset-51953.jpeg"
          alt="Contact"
          className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-black/20 backdrop-blur-lg" />
        <div className="absolute inset-x-0 top-[35%] z-10 -translate-y-1/2 text-center sm:inset-x-auto sm:left-12 sm:top-1/2 sm:text-left md:left-24">
          <span className="font-display text-[2rem] tracking-wide text-white/90 sm:text-lg md:text-xl lg:text-2xl">
            Tell us what you need
          </span>
        </div>
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <img
            src={logoCroppedSvgUrl}
            alt="Favored PLC"
            className="h-24 w-auto brightness-0 invert sm:h-32 md:h-40"
          />
        </div>
        <div className="absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 sm:block sm:right-12 md:right-24">
          <span className="font-display text-lg tracking-wide text-white/90 md:text-xl lg:text-2xl">
            Contact Favored
          </span>
        </div>
        <div className="absolute bottom-6 left-1/2 z-10 w-full max-w-4xl -translate-x-1/2 px-6 text-center">
          <p className="text-lg font-medium leading-relaxed text-white/80 sm:text-xl md:text-2xl">
            For product availability, quotations, institutional procurement, finance, or partnership
            discussions, contact the relevant Favored team.
          </p>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
          <Reveal className="max-w-3xl">
            <SectionLabel>Direct contacts</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Reach the right desk.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {contacts.map(({ title, subtitle, phone, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="h-full rounded-[2rem] border border-black/5 bg-[var(--mist)] p-8 flex flex-col justify-between">
                  <div>
                    <Icon className="h-7 w-7 text-[var(--brand)]" strokeWidth={1.5} />
                    <h3 className="mt-12 font-display text-3xl">{title}</h3>
                    <p className="mt-2 text-sm text-[var(--ink)]/55">{subtitle}</p>
                  </div>
                  <div className="mt-8">
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-3 text-base font-semibold text-[var(--ink)] hover:text-[var(--brand)] transition-colors"
                    >
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--brand)]/10 text-[var(--brand)]">
                        <Phone className="h-4 w-4" />
                      </div>
                      {phone}
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--mist)] py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:px-12">
          <Reveal>
            <SectionLabel>Inquiry form</SectionLabel>
            <h2 className="mt-4 font-display text-3xl leading-[1.08] sm:text-4xl">
              Send us an inquiry.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--ink)]/65">
              Submit your inquiry below and our team will get in touch with you directly by phone to discuss your procurement, product, or partnership requirements.
            </p>

            {submitted ? (
              <div className="mt-10 rounded-[2rem] border border-[var(--brand)]/20 bg-white p-8 sm:p-10 shadow-sm">
                <div className="flex items-center gap-3 text-[var(--brand)]">
                  <CheckCircle2 className="h-8 w-8" />
                  <h3 className="font-display text-2xl font-semibold">Inquiry Received</h3>
                </div>
                <p className="mt-4 leading-relaxed text-[var(--ink)]/70">
                  Thank you, <strong className="text-[var(--ink)]">{form.name || "valued partner"}</strong>. We have received your inquiry for{" "}
                  <strong className="text-[var(--ink)]">{form.organization || "your institution"}</strong>. Our team will contact you at{" "}
                  <strong className="text-[var(--brand)]">{form.phone}</strong> promptly.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="tel:+251991315630"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--ink)] transition-colors"
                  >
                    <Phone className="h-4 w-4" /> Call Sales Directly
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        organization: "",
                        phone: "",
                        type: "Product availability",
                        message: "",
                      });
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-transparent px-6 py-3 text-sm font-semibold text-[var(--ink)] hover:bg-black/5 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" required>
                    <input
                      required
                      value={form.name}
                      onChange={(event) => update("name", event.target.value)}
                      className="input"
                      placeholder="Your full name"
                    />
                  </Field>
                  <Field label="Organization" required>
                    <input
                      required
                      value={form.organization}
                      onChange={(event) => update("organization", event.target.value)}
                      className="input"
                      placeholder="Hospital, clinic, pharmacy..."
                    />
                  </Field>
                </div>
                <Field label="Phone Number" required>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="input"
                    placeholder="+251 9..."
                  />
                </Field>
                <Field label="Inquiry type" required>
                  <select
                    value={form.type}
                    onChange={(event) => update("type", event.target.value)}
                    className="input"
                  >
                    <option>Product availability</option>
                    <option>Quotation</option>
                    <option>Institutional procurement</option>
                    <option>Manufacturer partnership</option>
                    <option>Finance</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field label="Message" required>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    className="input resize-y"
                    placeholder="Include product, quantity, organization, destination, and timing where possible."
                  />
                </Field>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[var(--ink)] transition-colors"
                >
                  Submit Inquiry <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </Reveal>

          <Reveal>
            <div className="overflow-hidden rounded-[2.5rem] border border-black/5 bg-white shadow-[var(--shadow-card)]">
              <iframe
                title="Favored PLC office location"
                src="https://www.google.com/maps?q=Addis%20Ketema%20Subcity%20Woreda%2005%20House%20422%20423%20Addis%20Ababa%20Ethiopia&output=embed"
                className="h-[430px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-6 w-6 shrink-0 text-[var(--brand)]" strokeWidth={1.5} />
                  <div>
                    <p className="font-display text-2xl">Favored PLC office</p>
                    <p className="mt-3 leading-relaxed text-[var(--ink)]/65">{company.address}</p>
                    <div className="mt-6 space-y-2">
                      {company.phones.map((phone) => (
                        <a
                          key={phone}
                          href={`tel:${phone.replace(/\s/g, "")}`}
                          className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand)] transition-colors"
                        >
                          <Phone className="h-4 w-4 text-[var(--brand)]" />
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold">
        {label}
        {required && <span className="ml-1 text-[var(--brand)]">*</span>}
      </span>
      {children}
    </label>
  );
}
