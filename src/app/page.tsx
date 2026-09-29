import Link from "next/link";
import { PAKKETTEN, LOSSE_ARTIKELEN, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PackArt } from "@/components/PackArt";
import { PackList, GROUP_ORDER } from "@/components/PackList";
import { Faq } from "@/components/Faq";
import { Atmosphere } from "@/components/Atmosphere";
import { Icon } from "@/components/Icons";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";

const SCENARIOS: [string, keyof typeof Icon][] = [
  ["Stroomstoring", "Zap"],
  ["Overstroming", "Waves"],
  ["Uitval drinkwater", "Droplet"],
  ["Cyberaanval", "Shield"],
  ["Extreme kou", "Snow"],
  ["Evacuatie", "Exit"],
];

const REASONS: [keyof typeof Icon, string, string][] = [
  ["Radio", "Zonder stroom", "Geen pinautomaat, geen internet, geen verwarming en soms geen water uit de kraan. Een radio op slinger houdt je op de hoogte."],
  ["Droplet", "Drie liter per dag", "Zoveel drinkwater heeft een mens per dag nodig. Onze waterzakjes zijn vijf jaar houdbaar en nemen weinig ruimte in."],
  ["Flame", "Licht en warmte", "Een hoofdlamp, kaarsen en nooddekens. Klein, maar precies wat een koude nacht draaglijk maakt."],
  ["Shield", "Rust in je hoofd", "Wie voorbereid is, kan helder denken en de buren helpen. Eén doos in de kast maakt dat verschil."],
];

export default function Home() {
  const hero = getProduct("gezinspakket-72-uur")!;

  return (
    <>
      {/* Hero: donkere kamer, één lichtbron, glazen productkaart */}
      <section className="relative overflow-hidden bg-night pt-[76px] text-bone">
        <div
          className="glow pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-[10%] -translate-y-1/2 rounded-full md:left-[64%] md:-translate-x-1/2"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-14 md:grid-cols-[1.15fr_1fr] md:pb-24 md:pt-20">
          <div className="rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-amber">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />
              72-uursadvies Rijksoverheid
            </p>
            <h1 className="mt-6 font-display text-[3.4rem] font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-[5.4rem]">
              Het licht gaat uit.
              <br />
              <span className="text-amber">Jij niet.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-bone/75">
              Water, eten, licht en informatie voor drie dagen zonder hulp. Eén doos, vijf jaar houdbaar, morgen in huis.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/pakketten" className="glass-btn rounded-full bg-amber px-7 py-3.5 font-semibold text-night hover:bg-amber-soft">
                Bekijk de pakketten
              </Link>
              <Link href="#inhoud" className="glass-dark rounded-full px-7 py-3.5 font-semibold transition hover:bg-white/12">
                Wat zit erin?
              </Link>
            </div>
          </div>

          <Link href={`/pakketten/${hero.slug}`} className="rise group relative block [animation-delay:150ms]">
            <PackArt art={hero.art} tone="dark" className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.55)] transition duration-500 group-hover:-translate-y-1" />
            <div className="glass-dark mx-auto -mt-6 max-w-sm rounded-[1.4rem] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-amber">{hero.badge}</p>
                  <p className="mt-1 font-display text-xl font-bold tracking-tight">{hero.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-mist">
                    {hero.persons} pers. · {hero.hours} uur · {hero.contents.length} onderdelen
                  </p>
                </div>
                <div className="text-right">
                  {hero.compareAtCents && <p className="text-sm text-mist line-through">{formatPrice(hero.compareAtCents)}</p>}
                  <p className="font-display text-2xl font-bold tracking-tight">{formatPrice(hero.priceCents)}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative border-t border-white/10">
          <ul className="mx-auto flex max-w-6xl flex-wrap gap-x-7 gap-y-2 px-4 py-4 text-sm text-mist">
            <li className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone">Voorbereid op</li>
            {SCENARIOS.map(([label, icon]) => {
              const I = Icon[icon];
              return (
                <li key={label} className="flex items-center gap-1.5">
                  <I size={15} /> {label}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Lichte zone met atmosfeer: alles hierin staat op glas */}
      <div className="relative">
        <Atmosphere />

        <section id="waarom" className="relative scroll-mt-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-[auto_1fr] md:gap-20">
            <div className="md:sticky md:top-28 md:self-start">
              <div className="font-display text-[9rem] font-bold leading-none tracking-[-0.06em] md:text-[12rem]">72</div>
              <p className="-mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-2">uur op jezelf</p>
            </div>
            <div>
              <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                De eerste drie dagen van een ramp komt de hulp niet naar jou toe.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Hulpdiensten hebben dan hun handen vol aan de meest kwetsbaren. Daarom vraagt de overheid elk huishouden
                om 72 uur voor zichzelf te kunnen zorgen.
              </p>
              <dl className="mt-12 grid gap-4 sm:grid-cols-2">
                {REASONS.map(([icon, t, d]) => {
                  const I = Icon[icon];
                  return (
                    <div key={t} className="glass rounded-[1.4rem] p-6">
                      <div className="grid h-10 w-10 place-items-center rounded-full bg-night text-amber">
                        <I size={18} />
                      </div>
                      <dt className="mt-4 font-display text-xl font-bold tracking-tight">{t}</dt>
                      <dd className="mt-2 text-[15px] leading-relaxed text-muted">{d}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-6xl px-4 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-2">Pakketten</p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">Kies op grootte van je huishouden</h2>
            </div>
            <Link href="/pakketten" className="inline-flex items-center gap-1.5 font-semibold hover:text-amber-2">
              Alle producten <Icon.ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PAKKETTEN.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </div>

      {/* Paklijst */}
      <section id="inhoud" className="relative scroll-mt-24 overflow-hidden bg-night text-bone">
        <div className="glow pointer-events-none absolute -left-60 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full opacity-60" aria-hidden />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-24 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Paklijst · {hero.name}</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              {hero.contents.length} onderdelen. Niets wat je niet nodig hebt.
            </h2>
            <p className="mt-5 leading-relaxed text-bone/70">
              Alles in één stevige, stapelbare box. Met een checklist voor wat je zelf toevoegt: medicijnen, kopieën
              van documenten, wat contant geld.
            </p>
            <Link href={`/pakketten/${hero.slug}`} className="glass-btn mt-8 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-night hover:bg-amber-soft">
              Bekijk het Gezinspakket
            </Link>
          </div>
          <div className="glass-dark grid gap-10 rounded-[1.6rem] p-7 sm:grid-cols-2 sm:p-9">
            {GROUP_ORDER.map((g) => (
              <PackList key={g} items={hero.contents} group={g} dark />
            ))}
          </div>
        </div>
      </section>

      <div className="relative">
        <Atmosphere />

        {/* Zo werkt het: een echte volgorde, dus genummerd */}
        <section className="relative mx-auto max-w-6xl px-4 py-24">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Zo werkt het</h2>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["Kies je pakket", "Op basis van het aantal mensen in je huishouden. Twijfel je? Het Gezinspakket past bij de meeste gezinnen."],
              ["Betaal veilig", `Met iDEAL, Bancontact, creditcard of PayPal via Mollie. ${SITE.shipping.deliveryText}.`],
              ["Zet het weg", "Op een vaste plek die iedereen in huis kent. We mailen je voordat de inhoud verloopt."],
            ].map(([t, d], i) => (
              <li key={t} className="glass rounded-[1.4rem] p-6">
                <span className="font-mono text-sm text-amber-2">0{i + 1}</span>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="relative mx-auto max-w-6xl px-4 pb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-2">Aanvullen</p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight">Losse artikelen</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LOSSE_ARTIKELEN.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        <section id="vragen" className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-24 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
          <h2 className="font-display text-4xl font-bold tracking-tight">Veelgestelde vragen</h2>
          <div className="mt-8 md:mt-0">
            <Faq />
          </div>
        </section>

        <section className="relative px-4 pb-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-night px-8 py-14 text-bone md:px-14">
            <div className="glow pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full" aria-hidden />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Regel het vandaag, niet tijdens de storing.</h2>
                <p className="mt-2 text-bone/70">Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)}.</p>
              </div>
              <Link href="/pakketten" className="glass-btn shrink-0 rounded-full bg-amber px-7 py-3.5 font-semibold text-night hover:bg-amber-soft">
                Bestel je noodpakket
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
