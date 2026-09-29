import type { Metadata } from "next";
import { PAKKETTEN, LOSSE_ARTIKELEN } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Pakketten",
  description: "Noodpakketten voor 1 tot 4 personen, evacuatierugzakken en losse aanvullingen.",
};

export default function PakkettenPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-5xl font-semibold tracking-tight">Pakketten</h1>
      <p className="mt-3 max-w-2xl text-lg text-muted">
        Elk pakket is samengesteld volgens het advies om 72 uur zelfredzaam te zijn. Alle prijzen zijn inclusief btw.
      </p>

      <h2 className="mt-12 font-display text-2xl font-bold">Complete pakketten</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PAKKETTEN.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <h2 className="mt-16 font-display text-2xl font-bold">Losse artikelen</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LOSSE_ARTIKELEN.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
