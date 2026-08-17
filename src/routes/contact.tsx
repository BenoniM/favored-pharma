import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { ArrowRight, Building2, Mail, MapPin, Phone, UserRound } from "lucide-react";
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
          "Contact Favored PLC sales, finance, or the CEO office, send an inquiry, and find the Addis Ababa office.",
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
    email: company.contacts.sales.email,
    phone: company.contacts.sales.phone,
    icon: Building2,
  },
  {
    title: "Finance",
    subtitle: "Invoices, payments & account questions",
    email: company.contacts.finance.email,
    icon: Mail,
  },
  {
    title: "CEO Office",
    subtitle: company.contacts.ceo.name,
    email: company.contacts.ceo.email,
    phone: company.contacts.ceo.phone,
    icon: UserRound,
  },
];

type Inquiry = {
  name: string;
  organization: string;
  email: string;
  phone: string;
  type: string;
  message: string;
};

function Contact() {
  const [form, setForm] = useState<Inquiry>({
    name: "",
    organization: "",
    email: "",
    phone: "",
    type: "Product availability",
    message: "",
  });

  const update = (key: keyof Inquiry, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Favored inquiry: ${form.type} - ${form.organization}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Organization: ${form.organization}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Inquiry type: ${form.type}`,
        "",
        form.message,
      ].join("\n"),
    );
    window.location.href = `mailto:${company.contacts.sales.email}?subject=${subject}&body=${body}`;
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
            {contacts.map(({ title, subtitle, email, phone, icon: Icon }, index) => (
              <Reveal key={title} delay={index * 0.05}>
                <article className="h-full rounded-[2rem] border border-black/5 bg-[var(--mist)] p-8">
                  <Icon className="h-7 w-7 text-[var(--brand)]" strokeWidth={1.5} />
                  <h3 className="mt-12 font-display text-3xl">{title}</h3>
                  <p className="mt-2 text-sm text-[var(--ink)]/55">{subtitle}</p>
                  <div className="mt-8 space-y-3">
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-3 text-sm font-semibold hover:text-[var(--brand)]"
                    >
                      <Mail className="h-4 w-4 text-[var(--brand)]" /> {email}
                    </a>
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-sm font-semibold hover:text-[var(--brand)]"
                      >
                        <Phone className="h-4 w-4 text-[var(--brand)]" /> {phone}
                      </a>
                    )}
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
              Prepare an email to sales.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--ink)]/65">
              Submitting this form opens your email application with the inquiry prefilled, so you
              retain a copy and can attach product lists or procurement documents.
            </p>
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
                <Field label="Email" required>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    className="input"
                    placeholder="name@organization.com"
                  />
                </Field>
                <Field label="Phone">
                  <input
                    value={form.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    className="input"
                    placeholder="+251 ..."
                  />
                </Field>
              </div>
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
                  rows={6}
                  value={form.message}
                  onChange={(event) => update("message", event.target.value)}
                  className="input resize-y"
                  placeholder="Include product, quantity, organization, destination, and timing where possible."
                />
              </Field>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)] px-7 py-3.5 text-sm font-semibold text-white"
              >
                Open email inquiry <ArrowRight className="h-4 w-4" />
              </button>
            </form>
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
                          className="block text-sm font-semibold hover:text-[var(--brand)]"
                        >
                          {phone}
                        </a>
                      ))}
                      <a
                        href={`mailto:${company.email}`}
                        className="block text-sm font-semibold hover:text-[var(--brand)]"
                      >
                        {company.email}
                      </a>
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
