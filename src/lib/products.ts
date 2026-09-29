export type ProductCategory = "pakket" | "los";

export type ContentItem = {
  name: string;
  qty: string;
  group: "Water & voeding" | "Licht & communicatie" | "EHBO & hygiëne" | "Warmte & gereedschap";
};

export type Product = {
  slug: string;
  sku: string;
  name: string;
  category: ProductCategory;
  /** Prijs in centen, incl. btw. Centen houden het straks makkelijk voor Mollie. */
  priceCents: number;
  compareAtCents?: number;
  persons?: number;
  hours?: number;
  weightKg: number;
  short: string;
  description: string;
  highlights: string[];
  contents: ContentItem[];
  badge?: string;
  art: "box" | "family" | "backpack" | "bolt" | "radio" | "drop" | "cross";
  inStock: boolean;
};

const basisInhoud: ContentItem[] = [
  { name: "Drinkwater in zakjes (500 ml, 5 jaar houdbaar)", qty: "6 st.", group: "Water & voeding" },
  { name: "Noodrantsoen repen (2400 kcal)", qty: "3 st.", group: "Water & voeding" },
  { name: "Waterzuiveringstabletten", qty: "30 st.", group: "Water & voeding" },
  { name: "Noodradio met slinger, zonnepaneel & zaklamp", qty: "1 st.", group: "Licht & communicatie" },
  { name: "LED-hoofdlamp incl. batterijen", qty: "1 st.", group: "Licht & communicatie" },
  { name: "Signaalfluit", qty: "1 st.", group: "Licht & communicatie" },
  { name: "EHBO-set (43-delig)", qty: "1 st.", group: "EHBO & hygiëne" },
  { name: "Vochtige doekjes & handgel", qty: "1 set", group: "EHBO & hygiëne" },
  { name: "Mondkapjes FFP2", qty: "2 st.", group: "EHBO & hygiëne" },
  { name: "Nooddeken (goud/zilver)", qty: "2 st.", group: "Warmte & gereedschap" },
  { name: "Stormaansteker & waterdichte lucifers", qty: "1 set", group: "Warmte & gereedschap" },
  { name: "Multitool 12-in-1", qty: "1 st.", group: "Warmte & gereedschap" },
  { name: "Ducttape (10 m)", qty: "1 rol", group: "Warmte & gereedschap" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "basis-72-uur",
    sku: "NP-BASIS-1",
    name: "Basispakket 72 uur",
    category: "pakket",
    priceCents: 7995,
    persons: 1,
    hours: 72,
    weightKg: 4.2,
    short: "Alles wat één persoon nodig heeft om drie dagen zelfredzaam te zijn.",
    description:
      "Het Basispakket volgt het advies van de overheid: zorg dat je 72 uur zonder hulp kunt. Water, voeding, licht, informatie en eerste hulp in één stevige opbergbox die in elke kast past.",
    highlights: ["Volgt het 72-uursadvies van de overheid", "Voeding 5 jaar houdbaar", "Past onder bed of in de meterkast"],
    contents: basisInhoud,
    art: "box",
    inStock: true,
  },
  {
    slug: "gezinspakket-72-uur",
    sku: "NP-GEZIN-4",
    name: "Gezinspakket 72 uur",
    category: "pakket",
    priceCents: 21995,
    compareAtCents: 25995,
    persons: 4,
    hours: 72,
    weightKg: 14.8,
    short: "Voor een huishouden van vier: drie dagen water, eten, licht en warmte.",
    description:
      "Ons meest gekozen pakket. Voldoende voor twee volwassenen en twee kinderen, met extra aandacht voor warmte en hygiëne. Inclusief checklist voor de persoonlijke spullen die je zelf toevoegt, zoals medicijnen en kopieën van documenten.",
    highlights: ["Voor 4 personen, 72 uur", "Inclusief kookset met brandstof", "Checklist voor persoonlijke aanvulling"],
    contents: [
      { name: "Drinkwater in zakjes (500 ml, 5 jaar houdbaar)", qty: "24 st.", group: "Water & voeding" },
      { name: "Noodrantsoen repen (2400 kcal)", qty: "12 st.", group: "Water & voeding" },
      { name: "Gevriesdroogde maaltijden", qty: "8 st.", group: "Water & voeding" },
      { name: "Compacte kookset met brandstofblokjes", qty: "1 set", group: "Water & voeding" },
      { name: "Waterzuiveringstabletten", qty: "60 st.", group: "Water & voeding" },
      { name: "Noodradio met slinger, zonnepaneel & powerbank", qty: "1 st.", group: "Licht & communicatie" },
      { name: "LED-hoofdlamp incl. batterijen", qty: "2 st.", group: "Licht & communicatie" },
      { name: "Kampeerlantaarn (oplaadbaar)", qty: "1 st.", group: "Licht & communicatie" },
      { name: "Signaalfluit", qty: "4 st.", group: "Licht & communicatie" },
      { name: "EHBO-set (100-delig)", qty: "1 st.", group: "EHBO & hygiëne" },
      { name: "Hygiëneset (toiletpapier, zeep, vuilniszakken)", qty: "1 set", group: "EHBO & hygiëne" },
      { name: "Mondkapjes FFP2", qty: "8 st.", group: "EHBO & hygiëne" },
      { name: "Nooddeken (goud/zilver)", qty: "4 st.", group: "Warmte & gereedschap" },
      { name: "Handwarmers (12 uur)", qty: "8 st.", group: "Warmte & gereedschap" },
      { name: "Stormaansteker & waterdichte lucifers", qty: "1 set", group: "Warmte & gereedschap" },
      { name: "Multitool 12-in-1", qty: "1 st.", group: "Warmte & gereedschap" },
      { name: "Ducttape (10 m)", qty: "1 rol", group: "Warmte & gereedschap" },
    ],
    badge: "Meest gekozen",
    art: "family",
    inStock: true,
  },
  {
    slug: "evacuatierugzak",
    sku: "NP-EVAC-2",
    name: "Evacuatierugzak",
    category: "pakket",
    priceCents: 14995,
    persons: 2,
    hours: 72,
    weightKg: 7.1,
    short: "Een gepakte rugzak bij de deur, voor als je snel weg moet.",
    description:
      "Bij een overstroming, brand of gaslek heb je geen tijd om te zoeken. De Evacuatierugzak (35 liter, waterafstotend) staat klaar voor twee personen en laat ruimte vrij voor je eigen documenten, medicijnen en oplader.",
    highlights: ["35 liter, waterafstotend", "Ruimte voor eigen spullen", "Reflecterende banden"],
    contents: [
      // Water, voeding, mondkapjes en dekens verdubbeld voor twee personen
      ...basisInhoud.map((i) =>
        (i.group === "Water & voeding" || /deken|Mondkapjes/.test(i.name)) && i.qty.endsWith("st.")
          ? { ...i, qty: `${parseInt(i.qty) * 2} st.` }
          : i,
      ),
      { name: "Poncho met capuchon", qty: "2 st.", group: "Warmte & gereedschap" },
      { name: "Waterdichte documentenhoes", qty: "1 st.", group: "Warmte & gereedschap" },
    ],
    art: "backpack",
    inStock: true,
  },
  {
    slug: "stroomuitval-kit",
    sku: "NP-STROOM",
    name: "Stroomuitval-kit",
    category: "pakket",
    priceCents: 4995,
    weightKg: 1.6,
    short: "Licht, warmte en een opgeladen telefoon als het stroomnet uitvalt.",
    description:
      "Een compacte aanvulling voor elk huishouden. Bij een stroomstoring werkt je telefoon, verwarming en koelkast niet meer. Met deze kit houd je licht, informatie en contact met de buitenwereld.",
    highlights: ["Powerbank 20.000 mAh", "Radio werkt zonder stroom", "Ideaal als aanvulling"],
    contents: [
      { name: "Powerbank 20.000 mAh met zonnepaneel", qty: "1 st.", group: "Licht & communicatie" },
      { name: "Noodradio met slinger", qty: "1 st.", group: "Licht & communicatie" },
      { name: "Kampeerlantaarn (oplaadbaar)", qty: "1 st.", group: "Licht & communicatie" },
      { name: "Waxinelichtjes & kaarsen", qty: "1 set", group: "Warmte & gereedschap" },
      { name: "Nooddeken (goud/zilver)", qty: "2 st.", group: "Warmte & gereedschap" },
    ],
    art: "bolt",
    inStock: true,
  },
  {
    slug: "noodradio",
    sku: "NP-RADIO",
    name: "Noodradio met slinger",
    category: "los",
    priceCents: 3495,
    weightKg: 0.4,
    short: "FM/AM-radio, zaklamp en powerbank. Werkt op slinger, zon of USB.",
    description:
      "Bij een grote storing is de radio vaak de enige bron van officiële informatie. Deze noodradio werkt zonder stroomnet dankzij de slinger en het zonnepaneel.",
    highlights: ["Slinger, zonnepaneel en USB-C", "Ingebouwde zaklamp", "SOS-alarm"],
    contents: [{ name: "Noodradio met slinger, zonnepaneel & zaklamp", qty: "1 st.", group: "Licht & communicatie" }],
    art: "radio",
    inStock: true,
  },
  {
    slug: "waterfilter",
    sku: "NP-FILTER",
    name: "Waterfilter",
    category: "los",
    priceCents: 2995,
    weightKg: 0.1,
    short: "Maak tot 4.000 liter water drinkbaar. Filtert 99,99% van de bacteriën.",
    description:
      "Een lichtgewicht filter om direct uit te drinken of op een fles te schroeven. Een waardevolle aanvulling op elk pakket.",
    highlights: ["Tot 4.000 liter", "0,1 micron filtering", "Weegt slechts 60 gram"],
    contents: [{ name: "Waterfilter met drinkzak", qty: "1 set", group: "Water & voeding" }],
    art: "drop",
    inStock: true,
  },
  {
    slug: "ehbo-set",
    sku: "NP-EHBO",
    name: "EHBO-set 100-delig",
    category: "los",
    priceCents: 2495,
    weightKg: 0.6,
    short: "Complete verbandtrommel in een compacte, waterafstotende tas.",
    description:
      "Van pleisters tot drukverband en tekentang. Samengesteld volgens de richtlijnen voor een huishoud-EHBO-set.",
    highlights: ["100 onderdelen", "Inclusief EHBO-instructiekaart", "Waterafstotende tas"],
    contents: [{ name: "EHBO-set (100-delig)", qty: "1 st.", group: "EHBO & hygiëne" }],
    art: "cross",
    inStock: false,
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const PAKKETTEN = PRODUCTS.filter((p) => p.category === "pakket");
export const LOSSE_ARTIKELEN = PRODUCTS.filter((p) => p.category === "los");
