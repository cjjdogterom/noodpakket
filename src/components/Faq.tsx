export const FAQ: { q: string; a: string }[] = [
  {
    q: "Waarom een noodpakket voor 72 uur?",
    a: "De Nederlandse overheid adviseert elk huishouden om zich voor te bereiden op 72 uur zonder hulp van buitenaf. Bij een grote stroomstoring, overstroming of cyberaanval kan het zo lang duren voordat hulpdiensten iedereen bereiken.",
  },
  {
    q: "Hoe lang is de inhoud houdbaar?",
    a: "Het drinkwater en de noodrantsoenen zijn 5 jaar houdbaar. Op elk pakket staat de vervaldatum. We sturen je een herinnering zodra je pakket bijna verloopt, zodat je alleen de verlopen onderdelen hoeft te vervangen.",
  },
  {
    q: "Wat moet ik zelf nog toevoegen?",
    a: "Persoonlijke zaken: medicijnen, een kopie van je identiteitsbewijs en verzekeringspapieren, wat contant geld, een oplader en eventueel babyvoeding of dierenvoer. Bij elk pakket zit een checklist.",
  },
  {
    q: "Hoe snel wordt mijn bestelling geleverd?",
    a: "Op werkdagen voor 16:00 besteld is de volgende werkdag in huis in Nederland. Naar België rekenen we 1–2 werkdagen. Boven de €100 is verzending gratis.",
  },
  {
    q: "Hoe kan ik betalen?",
    a: "Je betaalt veilig via Mollie met iDEAL, Bancontact, creditcard of PayPal.",
  },
  {
    q: "Kan ik mijn pakket retourneren?",
    a: "Ja, je hebt 30 dagen bedenktijd. Stuur het pakket ongeopend terug en je krijgt het volledige aankoopbedrag terug.",
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQ.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 font-display text-lg font-semibold hover:text-amber-2">
            {item.q}
            <span className="faq-icon grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line font-mono text-lg transition-transform">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
