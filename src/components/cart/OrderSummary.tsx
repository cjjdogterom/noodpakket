"use client";

import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";

export function OrderSummary({ showLines = false, children }: { showLines?: boolean; children?: React.ReactNode }) {
  const { totals } = useCart();
  const remaining = SITE.shipping.freeFromCents - totals.subtotalCents;

  return (
    <aside className="rounded-2xl border border-line bg-white/70 p-6">
      <h2 className="font-display text-xl font-bold">Overzicht</h2>

      {showLines && (
        <ul className="mt-4 space-y-2 border-b border-line pb-4 text-sm">
          {totals.resolved.map(({ product, qty, totalCents }) => (
            <li key={product.slug} className="flex justify-between gap-3">
              <span>
                {qty}× {product.name}
              </span>
              <span className="tabular-nums">{formatPrice(totalCents)}</span>
            </li>
          ))}
        </ul>
      )}

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Subtotaal</dt>
          <dd className="tabular-nums">{formatPrice(totals.subtotalCents)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Verzending</dt>
          <dd className="tabular-nums">{totals.shippingCents === 0 ? "Gratis" : formatPrice(totals.shippingCents)}</dd>
        </div>
        <div className="flex justify-between border-t border-line pt-3 font-display text-lg font-semibold">
          <dt>Totaal</dt>
          <dd className="tabular-nums">{formatPrice(totals.totalCents)}</dd>
        </div>
        <p className="text-xs text-muted">Inclusief 21% btw</p>
      </dl>

      {remaining > 0 && totals.subtotalCents > 0 && (
        <div className="mt-4">
          <p className="text-sm">
            Nog <strong>{formatPrice(remaining)}</strong> tot gratis verzending
          </p>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-bone-2">
            <div
              className="h-full rounded-full bg-amber"
              style={{ width: `${Math.min(100, (totals.subtotalCents / SITE.shipping.freeFromCents) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {children}
    </aside>
  );
}
