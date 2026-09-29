import type { Product } from "@/lib/products";

/** Productillustratie in SVG, zolang er nog geen productfoto's zijn. */
export function PackArt({ art, className = "" }: { art: Product["art"]; className?: string }) {
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden="true">
      <rect width="200" height="160" fill="var(--paper-2)" />
      <g stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {art === "box" && <Box x={52} y={50} w={96} h={70} />}
        {art === "family" && (
          <>
            <Box x={28} y={62} w={80} h={60} />
            <Box x={96} y={40} w={80} h={82} />
          </>
        )}
        {art === "backpack" && (
          <>
            <path d="M78 46 Q78 26 100 26 Q122 26 122 46" fill="none" />
            <rect x="62" y="44" width="76" height="92" rx="16" fill="var(--forest)" />
            <rect x="74" y="88" width="52" height="34" rx="6" fill="var(--forest-2)" />
            <path d="M62 70 H138" stroke="var(--signal)" strokeWidth="5" />
            <path d="M84 104 H116" />
          </>
        )}
        {art === "bolt" && (
          <>
            <rect x="56" y="36" width="88" height="96" rx="10" fill="var(--forest)" />
            <path d="M106 50 L84 88 H100 L92 118 L118 76 H102 Z" fill="var(--signal)" />
          </>
        )}
        {art === "radio" && (
          <>
            <path d="M70 52 L126 34" />
            <rect x="46" y="52" width="108" height="72" rx="10" fill="var(--forest)" />
            <circle cx="82" cy="88" r="20" fill="var(--forest-2)" />
            <rect x="112" y="72" width="28" height="8" rx="2" fill="var(--signal)" />
            <path d="M112 92 H140 M112 104 H134" stroke="var(--paper)" />
          </>
        )}
        {art === "drop" && (
          <>
            <path d="M100 30 C100 30 64 76 64 98 A36 36 0 0 0 136 98 C136 76 100 30 100 30 Z" fill="var(--forest)" />
            <path d="M84 100 A16 16 0 0 0 100 116" stroke="var(--signal)" strokeWidth="5" fill="none" />
          </>
        )}
        {art === "cross" && (
          <>
            <rect x="50" y="44" width="100" height="80" rx="10" fill="var(--forest)" />
            <path d="M88 38 V30 H112 V38" fill="none" />
            <path d="M92 64 H108 V76 H120 V92 H108 V104 H92 V92 H80 V76 H92 Z" fill="var(--paper)" />
          </>
        )}
      </g>
    </svg>
  );
}

function Box({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="4" fill="var(--forest)" />
      <rect x={x - 4} y={y - 12} width={w + 8} height="16" rx="3" fill="var(--forest-2)" />
      <rect x={x + w / 2 - 14} y={y + 16} width="28" height="18" rx="2" fill="var(--signal)" />
      <path d={`M${x + w / 2 - 6} ${y + 25} H${x + w / 2 + 6} M${x + w / 2} ${y + 19} V${y + 31}`} stroke="var(--paper)" />
    </>
  );
}
