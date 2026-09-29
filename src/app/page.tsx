import Link from "next/link";
import { PAKKETTEN, LOSSE_ARTIKELEN, getProduct, type ContentItem } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { PackArt } from "@/components/PackArt";
import { Faq } from "@/components/Faq";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";

const SCENARIOS = ["Langdurige stroomstoring", "Overstroming", "Uitval drinkwater", "Cyberaanval", "Extreme kou", "Evacuatie"];

const GROUP_ICONS: Record<ContentItem["group"], string> = {
  "Water & voeding": "💧",
  "Licht & communicatie": "📻",
  "EHBO & hygiëne": "✚",
  "Warmte & gereedschap": "🔥",
};

export default function Home() {
  const hero = getProduct("gezinspakket-72-uur")!;
  const groups = Object.keys(GROUP_ICONS) as ContentItem["group"][];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-12 md:grid-cols-[1.1fr_1fr] md:pt-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white/60 px-3 py-1 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-signal" aria-hidden />
              Volgt het 72-uursadvies van de overheid
            </p>
            <h1 className="mt-6 font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Als alles uitvalt,
              <br />
              <span className="text-signal">heb jij het geregeld.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-soft">
              Complete noodpakketten met water, voeding, licht, een noodradio en EHBO. Eén keer in huis halen, jarenlang
              voorbereid.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pakketten"
                className="rounded-full bg-signal px-7 py-3.5 font-semibold text-white hover:bg-signal-dark"
              >
                Bekijk de pakketten
              </Link>
              <Link href="#inhoud" className="rounded-full border border-ink px-7 py-3.5 font-semibold hover:bg-ink hover:text-paper">
                Wat zit erin?
              </Link>
            </div>
            <ul className="mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm">
              {[
                ["5 jaar", "houdbaar"],
                ["Morgen", "in huis"],
                ["30 dagen", "bedenktijd"],
              ].map(([a, b]) => (
                <li key={a} className="border-l-2 border-signal pl-3">
                  <div className="font-display text-xl font-extrabold">{a}</div>
                  <div className="text-ink-soft">{b}</div>
                </li>
              ))}
            </ul>
          </div>

          <Link href={`/pakketten/${hero.slug}`} className="group relative block">
            <div className="absolute -inset-3 -z-10 rotate-2 rounded-[2rem] bg-forest" aria-hidden />
            <div className="overflow-hidden rounded-[1.6rem] border border-line bg-paper-2">
              <PackArt art={hero.art} className="aspect-[5/4] w-full transition group-hover:scale-[1.02]" />
              <div className="flex items-center justify-between gap-4 border-t border-line bg-white px-5 py-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-signal-dark">{hero.badge}</div>
                  <div className="font-display text-lg font-bold">{hero.name}</div>
                  <div className="text-sm text-ink-soft">4 personen · 72 uur · {hero.contents.length} onderdelen</div>
                </div>
                <div className="text-right">
                  {hero.compareAtCents && (
                    <div className="text-sm text-ink-soft line-through">{formatPrice(hero.compareAtCents)}</div>
                  )}
                  <div className="font-display text-2xl font-black">{formatPrice(hero.priceCents)}</div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Scenario's */}
      <section className="border-y border-line bg-paper-2">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-5 text-sm font-semibold uppercase tracking-wider text-ink-soft">
          <span className="text-ink">Voorbereid op:</span>
          {SCENARIOS.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>

      {/* Waarom */}
      <section id="waarom" className="scroll-mt-24 bg-forest text-paper">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-signal">Waarom 72 uur?</p>
            <h2 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl">
              De eerste drie dagen sta je er alleen voor.
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              ["01", "Hulp komt niet direct", "Bij een grote ramp hebben hulpdiensten eerst hun handen vol aan de meest kwetsbaren. Daarom adviseert de overheid 72 uur zelfredzaamheid."],
              ["02", "Zonder stroom werkt bijna niets", "Geen pinautomaat, geen internet, geen verwarming en soms geen water uit de kraan. Een radio op slinger houdt je op de hoogte."],
              ["03", "Water is het belangrijkst", "Reken op 3 liter drinkwater per persoon per dag. Onze waterzakjes zijn 5 jaar houdbaar en nemen weinig ruimte in."],
              ["04", "Rust in je hoofd", "Wie voorbereid is, kan helder denken en ook buren helpen. Eén pakket in de kast maakt dat verschil."],
            ].map(([n, t, d]) => (
              <div key={n}>
                <div className="font-display text-sm font-bold text-signal">{n}</div>
                <h3 className="mt-2 font-display text-xl font-bold">{t}</h3>
                <p className="mt-2 text-paper/75">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pakketten */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-display text-sm font-bold uppercase tracking-widest text-signal-dark">Onze pakketten</p>
            <h2 className="mt-2 font-display text-4xl font-black">Kies wat bij jouw huishouden past</h2>
          </div>
          <Link href="/pakketten" className="font-semibold underline decoration-signal decoration-2 underline-offset-4">
            Alle producten →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PAKKETTEN.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Inhoud */}
      <section id="inhoud" className="scroll-mt-24 border-y border-line bg-white/50">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="max-w-2xl">
            <p className="font-display text-sm font-bold uppercase tracking-widest text-signal-dark">In het Gezinspakket</p>
            <h2 className="mt-2 font-display text-4xl font-black">{hero.contents.length} onderdelen, zorgvuldig samengesteld</h2>
            <p className="mt-4 text-ink-soft">
              Alles in één stevige, stapelbare box. Met een checklist voor wat je zelf toevoegt, zoals medicijnen en
              kopieën van belangrijke documenten.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((g) => (
              <div key={g} className="rounded-2xl border border-line bg-paper p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-forest text-lg text-paper" aria-hidden>
                  {GROUP_ICONS[g]}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{g}</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {hero.contents
                    .filter((c) => c.group === g)
                    .map((c) => (
                      <li key={c.name} className="flex justify-between gap-3 border-b border-dashed border-line pb-2">
                        <span>{c.name}</span>
                        <span className="shrink-0 font-semibold tabular-nums text-ink-soft">{c.qty}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="font-display text-4xl font-black">Zo werkt het</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["Kies je pakket", "Op basis van het aantal personen in je huishouden. Twijfel je? Het Gezinspakket is voor de meeste gezinnen de beste keuze."],
            ["Betaal veilig", "Met iDEAL, Bancontact, creditcard of PayPal via Mollie. " + SITE.shipping.deliveryText + "."],
            ["Opbergen en klaar", "Zet je pakket op een vaste plek. We sturen je een herinnering voordat de inhoud verloopt."],
          ].map(([t, d], i) => (
            <li key={t} className="relative rounded-2xl border border-line p-6 pt-10">
              <span className="absolute -top-5 left-6 grid h-10 w-10 place-items-center rounded-full bg-signal font-display text-lg font-black text-white">
                {i + 1}
              </span>
              <h3 className="font-display text-xl font-bold">{t}</h3>
              <p className="mt-2 text-ink-soft">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Losse artikelen */}
      <section className="bg-paper-2">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 className="font-display text-3xl font-black">Aanvullen of uitbreiden</h2>
          <p className="mt-2 text-ink-soft">Losse artikelen om je pakket compleet te maken.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LOSSE_ARTIKELEN.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="vragen" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20">
        <h2 className="font-display text-4xl font-black">Veelgestelde vragen</h2>
        <div className="mt-8">
          <Faq />
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-3xl bg-ink px-8 py-12 text-paper md:flex-row md:items-center md:px-12">
          <div>
            <h2 className="font-display text-3xl font-black sm:text-4xl">Regel het vandaag, niet tijdens de storing.</h2>
            <p className="mt-2 text-paper/70">Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)}.</p>
          </div>
          <Link href="/pakketten" className="shrink-0 rounded-full bg-signal px-7 py-3.5 font-semibold text-white hover:bg-signal-dark">
            Bestel je noodpakket
          </Link>
        </div>
      </section>
    </>
  );
}
