"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartProvider";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export function AddToCartButton({
  slug,
  disabled,
  compact,
}: {
  slug: string;
  disabled?: boolean;
  compact?: boolean;
}) {
  const { add } = useCart();
  if (disabled) {
    return (
      <span className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-muted">
        Tijdelijk uitverkocht
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => add(slug)}
      className={`rounded-full bg-amber font-semibold text-night hover:bg-amber-soft active:scale-[0.98] ${
        compact ? "px-4 py-2 text-sm" : "px-6 py-3"
      }`}
    >
      In winkelwagen
    </button>
  );
}

export function AddToCartWithQty({ slug, disabled }: { slug: string; disabled?: boolean }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (disabled) {
    return (
      <div className="rounded-xl border border-line bg-bone-2 p-4 text-sm">
        Dit artikel is tijdelijk uitverkocht. Mail ons en we laten weten wanneer het weer op voorraad is.
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <QtyStepper value={qty} onChange={setQty} />
      <button
        type="button"
        onClick={() => add(slug, qty)}
        className="flex-1 rounded-full bg-amber px-8 py-3.5 font-semibold text-night hover:bg-amber-soft active:scale-[0.99] sm:flex-none"
      >
        In winkelwagen
      </button>
    </div>
  );
}

export function QtyStepper({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex h-12 items-center rounded-full border border-line bg-white">
      <button
        type="button"
        className="grid h-12 w-11 place-items-center text-lg disabled:opacity-30"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Minder"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{value}</span>
      <button
        type="button"
        className="grid h-12 w-11 place-items-center text-lg disabled:opacity-30"
        onClick={() => onChange(value + 1)}
        disabled={value >= 20}
        aria-label="Meer"
      >
        +
      </button>
    </div>
  );
}

/** Melding rechtsonder na toevoegen aan de winkelwagen. */
export function AddedToast() {
  const { lastAdded, dismissAdded, totals } = useCart();
  const product = lastAdded ? getProduct(lastAdded) : null;

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(dismissAdded, 4500);
    return () => clearTimeout(t);
  }, [lastAdded, dismissAdded]);

  if (!product) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-2xl border border-line bg-white p-4 shadow-2xl sm:left-auto sm:right-6"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate">✓ Toegevoegd aan winkelwagen</p>
          <p className="mt-1 font-display font-bold">{product.name}</p>
          <p className="text-sm text-muted">Subtotaal {formatPrice(totals.subtotalCents)}</p>
        </div>
        <button type="button" onClick={dismissAdded} aria-label="Sluiten" className="text-muted hover:text-night">
          ✕
        </button>
      </div>
      <div className="mt-3 flex gap-2">
        <Link
          href="/winkelwagen"
          onClick={dismissAdded}
          className="flex-1 rounded-full bg-slate py-2.5 text-center text-sm font-semibold text-bone hover:bg-slate-2"
        >
          Bekijk winkelwagen
        </Link>
        <button type="button" onClick={dismissAdded} className="rounded-full border border-line px-4 text-sm font-semibold">
          Verder winkelen
        </button>
      </div>
    </div>
  );
}
