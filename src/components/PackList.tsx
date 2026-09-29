import type { ContentItem } from "@/lib/products";

export const GROUP_ORDER: ContentItem["group"][] = [
  "Water & voeding",
  "Licht & communicatie",
  "EHBO & hygiëne",
  "Warmte & gereedschap",
];

/** Inhoud als paklijst: naam, stippellijn, aantal in mono. */
export function PackList({ items, group, dark = false }: { items: ContentItem[]; group: ContentItem["group"]; dark?: boolean }) {
  const rows = items.filter((c) => c.group === group);
  if (rows.length === 0) return null;
  return (
    <div>
      <h3 className={`font-mono text-[11px] uppercase tracking-[0.18em] ${dark ? "text-amber" : "text-amber-2"}`}>{group}</h3>
      <ul className="mt-3 space-y-2 text-[15px]">
        {rows.map((c) => (
          <li key={c.name} className="leader">
            <span>{c.name}</span>
            <span className={`shrink-0 whitespace-nowrap font-mono text-sm tabular-nums ${dark ? "text-mist" : "text-muted"}`}>{c.qty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
