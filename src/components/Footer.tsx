import Link from "next/link";
import { SITE } from "@/lib/site";
import { Logo } from "./Header";

export function Footer() {
  return (
    <footer className="mt-auto bg-night text-bone">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-xl font-bold">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-mist">{SITE.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
            {["iDEAL", "Bancontact", "Creditcard", "PayPal"].map((m) => (
              <span key={m} className="rounded border border-bone/15 px-2 py-1 text-bone/70">{m}</span>
            ))}
          </div>
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
          <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-amber">{SITE.email}</a>
            </li>
            <li>{SITE.phone}</li>
            <li className="text-mist">KvK {SITE.kvk}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-5 font-mono text-[11px] uppercase tracking-wider text-mist sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name} · Prijzen incl. btw</span>
          <span>Veilig betalen via Mollie</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="hover:text-amber">{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
