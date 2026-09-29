import Link from "next/link";
import { PAKKETTEN, LOSSE_ARTIKELEN, getProduct } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PackArt } from "@/components/PackArt";
import { PackList, GROUP_ORDER } from "@/components/PackList";
import { Faq } from "@/components/Faq";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";

const SCENARIOS = ["Stroomstoring", "Overstroming", "Uitval drinkwater", "Cyberaanval", "Extreme kou", "Evacuatie"];

export default function Home() {
  const hero = getProduct("gezinspakket-72-uur")!;

  return (
    <>
      {/* Hero: donkere kamer, één lichtbron */}
      <section className="relative overflow-hidden bg-night text-bone">
        <div
          className="glow pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-[10%] -translate-y-1/2 rounded-full md:left-[62%] md:-translate-x-1/2"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 md:grid-cols-[1.15fr_1fr] md:pb-28 md:pt-24">
          <div className="rise">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">
              72-uurspakket · volgens het advies van de Rijksoverheid
            </p>
            <h1 className="mt-6 font-display text-[3.4rem] font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-[5.6rem]">
              Het licht gaat uit.
              <br />
              <span className="text-amber">Jij niet.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-bone/75">
              Water, eten, licht en informatie voor drie dagen zonder hulp. Eén doos, vijf jaar houdbaar, morgen in huis.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/pakketten"
                className="rounded-full bg-amber px-7 py-3.5 font-semibold text-night transition hover:bg-amber-soft"
              >
                Bekijk de pakketten
              </Link>
              <Link
                href="#inhoud"
                className="rounded-full border border-bone/25 px-7 py-3.5 font-semibold transition hover:border-bone"
              >
                Wat zit erin?
              </Link>
            </div>
          </div>

          <Link href={`/pakketten/${hero.slug}`} className="rise group relative block [animation-delay:150ms]">
            <PackArt art={hero.art} tone="dark" className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)] transition duration-500 group-hover:-translate-y-1" />
            <div className="mx-auto -mt-6 max-w-sm rounded-2xl border border-bone/10 bg-slate/80 p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">{hero.badge}</p>
                  <p className="mt-1 font-display text-xl font-semibold">{hero.name}</p>
                  <p className="mt-0.5 font-mono text-xs text-mist">
                    {hero.persons} pers. · {hero.hours} uur · {hero.contents.length} onderdelen
                  </p>
                </div>
                <div className="text-right">
                  {hero.compareAtCents && (
                    <p className="text-sm text-mist line-through">{formatPrice(hero.compareAtCents)}</p>
                  )}
                  <p className="font-display text-2xl font-bold">{formatPrice(hero.priceCents)}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="relative border-t border-bone/10">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-8 gap-y-2 px-4 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
            <span className="text-bone">Voorbereid op</span>
            {SCENARIOS.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Waarom 72 uur: het getal draagt de boodschap */}
      <section id="waarom" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 md:grid-cols-[auto_1fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="font-display text-[9rem] font-bold leading-none tracking-tighter text-night md:text-[12rem]">72</div>
            <p className="-mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-amber-2">uur op jezelf</p>
          </div>
          <div>
            <h2 className="max-w-xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              De eerste drie dagen van een ramp komt de hulp niet naar jou toe.
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">
              Hulpdiensten hebben dan hun handen vol aan de meest kwetsbaren. Daarom vraagt de overheid elk huishouden
              om 72 uur voor zichzelf te kunnen zorgen.
            </p>
            <dl className="mt-12 grid gap-8 sm:grid-cols-2">
              {[
                ["Zonder stroom", "Geen pinautomaat, geen internet, geen verwarming en soms geen water uit de kraan. Een radio op slinger houdt je op de hoogte."],
                ["Drie liter per dag", "Zoveel drinkwater heeft een mens per dag nodig. Onze waterzakjes zijn vijf jaar houdbaar en nemen weinig ruimte in."],
                ["Licht en warmte", "Een hoofdlamp, kaarsen en nooddekens. Klein, maar precies wat een koude nacht draaglijk maakt."],
                ["Rust in je hoofd", "Wie voorbereid is, kan helder denken en de buren helpen. Eén doos in de kast maakt dat verschil."],
              ].map(([t, d]) => (
                <div key={t} className="border-t-2 border-night pt-4">
                  <dt className="font-display text-xl font-semibold">{t}</dt>
                  <dd className="mt-2 text-muted">{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-2">Pakketten</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Kies op grootte van je huishouden</h2>
          </div>
          <Link href="/pakketten" className="font-semibold underline decoration-amber decoration-2 underline-offset-4 hover:text-amber-2">
            Alle producten
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAKKETTEN.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Paklijst */}
      <section id="inhoud" className="scroll-mt-20 bg-night text-bone">
        <div className="mx-auto grid max-w-6xl gap-14 px-4 py-24 md:grid-cols-[1fr_1.5fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber">Paklijst · {hero.name}</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {hero.contents.length} onderdelen. Niets wat je niet nodig hebt.
            </h2>
            <p className="mt-5 text-bone/70">
              Alles in één stevige, stapelbare box. Met een checklist voor wat je zelf toevoegt: medicijnen, kopieën
              van documenten, wat contant geld.
            </p>
            <Link
              href={`/pakketten/${hero.slug}`}
              className="mt-8 inline-block rounded-full bg-amber px-6 py-3 font-semibold text-night hover:bg-amber-soft"
            >
              Bekijk het Gezinspakket
            </Link>
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {GROUP_ORDER.map((g) => (
              <PackList key={g} items={hero.contents} group={g} dark />
            ))}
          </div>
        </div>
      </section>

      {/* Zo werkt het: een echte volgorde, dus genummerd */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Zo werkt het</h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3">
          {[
            ["Kies je pakket", "Op basis van het aantal mensen in je huishouden. Twijfel je? Het Gezinspakket past bij de meeste gezinnen."],
            ["Betaal veilig", `Met iDEAL, Bancontact, creditcard of PayPal via Mollie. ${SITE.shipping.deliveryText}.`],
            ["Zet het weg", "Op een vaste plek die iedereen in huis kent. We mailen je voordat de inhoud verloopt."],
          ].map(([t, d], i) => (
            <li key={t} className="border-t-2 border-night pt-5">
              <span className="font-mono text-sm text-amber-2">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-semibold">{t}</h3>
              <p className="mt-2 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Losse artikelen */}
      <section className="border-y border-line bg-bone-2/60">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber-2">Aanvullen</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Losse artikelen</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LOSSE_ARTIKELEN.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="vragen" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 md:grid md:grid-cols-[1fr_2fr] md:gap-16">
        <h2 className="font-display text-4xl font-semibold tracking-tight">Veelgestelde vragen</h2>
        <div className="mt-8 md:mt-0">
          <Faq />
        </div>
      </section>

      {/* Afsluiting */}
      <section className="px-4 pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-night px-8 py-14 text-bone md:px-14">
          <div className="glow pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Regel het vandaag, niet tijdens de storing.</h2>
              <p className="mt-2 text-bone/70">Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)}.</p>
            </div>
            <Link href="/pakketten" className="shrink-0 rounded-full bg-amber px-7 py-3.5 font-semibold text-night hover:bg-amber-soft">
              Bestel je noodpakket
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
