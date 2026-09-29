import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="stripe h-2" aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-xl font-extrabold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-paper/70">{SITE.tagline}</p>
        </div>
        <FooterCol
          title="Winkel"
          links={[
            ["/pakketten", "Alle pakketten"],
            ["/pakketten/gezinspakket-72-uur", "Gezinspakket"],
            ["/pakketten/evacuatierugzak", "Evacuatierugzak"],
            ["/winkelwagen", "Winkelwagen"],
          ]}
        />
        <FooterCol
          title="Service"
          links={[
            ["/#vragen", "Veelgestelde vragen"],
            ["/contact", "Contact"],
            ["/voorwaarden", "Algemene voorwaarden"],
            ["/privacy", "Privacy"],
          ]}
        />
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-paper/50">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-signal">{SITE.email}</a>
            </li>
            <li>{SITE.phone}</li>
            <li className="text-paper/60">KvK {SITE.kvk}</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
            {["iDEAL", "Bancontact", "Creditcard", "PayPal"].map((m) => (
              <span key={m} className="rounded border border-paper/25 px-2 py-1 text-paper/80">{m}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-5 text-xs text-paper/50 sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name}. Alle prijzen incl. btw.</span>
          <span>Veilig betalen via Mollie</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-bold uppercase tracking-widest text-paper/50">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="hover:text-signal">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
