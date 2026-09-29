import type { Product } from "@/lib/products";

type Tone = "light" | "dark";

/** Productillustratie in SVG, zolang er nog geen productfoto's zijn. */
export function PackArt({
  art,
  className = "",
  tone = "light",
}: {
  art: Product["art"];
  className?: string;
  tone?: Tone;
}) {
  const body = tone === "dark" ? "var(--slate-2)" : "var(--slate)";
  const lid = tone === "dark" ? "#3a5064" : "var(--slate-2)";
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden="true">
      {tone === "light" && <rect width="200" height="160" fill="var(--bone-2)" />}
      <g stroke="var(--night)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {art === "box" && <Box x={52} y={50} w={96} h={70} body={body} lid={lid} />}
        {art === "family" && (
          <>
            <Box x={28} y={62} w={80} h={60} body={body} lid={lid} />
            <Box x={96} y={40} w={80} h={82} body={body} lid={lid} />
          </>
        )}
        {art === "backpack" && (
          <>
            <path d="M78 46 Q78 26 100 26 Q122 26 122 46" fill="none" />
            <rect x="62" y="44" width="76" height="92" rx="16" fill={body} />
            <rect x="74" y="88" width="52" height="34" rx="6" fill={lid} />
            <path d="M62 70 H138" stroke="var(--amber)" strokeWidth="5" />
            <path d="M84 104 H116" stroke="var(--bone)" />
          </>
        )}
        {art === "bolt" && (
          <>
            <rect x="56" y="36" width="88" height="96" rx="10" fill={body} />
            <path d="M106 50 L84 88 H100 L92 118 L118 76 H102 Z" fill="var(--amber)" />
          </>
        )}
        {art === "radio" && (
          <>
            <path d="M70 52 L126 34" />
            <rect x="46" y="52" width="108" height="72" rx="10" fill={body} />
            <circle cx="82" cy="88" r="20" fill={lid} />
            <rect x="112" y="72" width="28" height="8" rx="2" fill="var(--amber)" />
            <path d="M112 92 H140 M112 104 H134" stroke="var(--bone)" />
          </>
        )}
        {art === "drop" && (
          <>
            <path d="M100 30 C100 30 64 76 64 98 A36 36 0 0 0 136 98 C136 76 100 30 100 30 Z" fill={body} />
            <path d="M84 100 A16 16 0 0 0 100 116" stroke="var(--amber)" strokeWidth="5" fill="none" />
          </>
        )}
        {art === "cross" && (
          <>
            <rect x="50" y="44" width="100" height="80" rx="10" fill={body} />
            <path d="M88 38 V30 H112 V38" fill="none" />
            <path d="M92 64 H108 V76 H120 V92 H108 V104 H92 V92 H80 V76 H92 Z" fill="var(--bone)" />
          </>
        )}
      </g>
    </svg>
  );
}

function Box({ x, y, w, h, body, lid }: { x: number; y: number; w: number; h: number; body: string; lid: string }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={body} />
      <rect x={x - 4} y={y - 12} width={w + 8} height="16" rx="3" fill={lid} />
      <rect x={x + 10} y={y + 14} width={w - 20} height="22" rx="2" fill="var(--amber)" />
      <path d={`M${x + 18} ${y + 25} H${x + w - 18}`} stroke="var(--night)" strokeWidth="2" strokeDasharray="3 4" />
    </>
  );
}
