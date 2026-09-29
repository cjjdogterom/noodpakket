"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { QtyStepper } from "@/components/AddToCart";
import { PackArt } from "@/components/PackArt";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { totals, ready, setQty, remove } = useCart();

  if (!ready) return <div className="mx-auto min-h-[50vh] max-w-6xl px-4 py-14" />;

  if (totals.resolved.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-black">Je winkelwagen is leeg</h1>
        <p className="mt-3 text-ink-soft">Bekijk onze pakketten en wees voorbereid op 72 uur zonder hulp.</p>
        <Link href="/pakketten" className="mt-8 inline-block rounded-full bg-signal px-7 py-3.5 font-semibold text-white hover:bg-signal-dark">
          Naar de pakketten
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-black sm:text-5xl">Winkelwagen</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y divide-line border-y border-line">
          {totals.resolved.map(({ product, qty, totalCents }) => (
            <li key={product.slug} className="flex gap-4 py-5 sm:gap-6">
              <Link href={`/pakketten/${product.slug}`} className="w-24 shrink-0 overflow-hidden rounded-xl border border-line sm:w-32">
                <PackArt art={product.art} className="aspect-[5/4] w-full" />
              </Link>
              <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Link href={`/pakketten/${product.slug}`} className="font-display text-lg font-bold hover:text-signal-dark">
                    {product.name}
                  </Link>
                  <p className="text-sm text-ink-soft">{formatPrice(product.priceCents)} per stuk</p>
                  <button
                    type="button"
                    onClick={() => remove(product.slug)}
                    className="mt-1 text-sm text-ink-soft underline underline-offset-2 hover:text-signal-dark"
                  >
                    Verwijderen
                  </button>
                </div>
                <div className="flex items-center justify-between gap-6">
                  <QtyStepper value={qty} onChange={(n) => setQty(product.slug, n)} />
                  <span className="w-24 text-right font-display text-lg font-bold tabular-nums">{formatPrice(totalCents)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary>
            <Link
              href="/afrekenen"
              className="mt-6 block rounded-full bg-signal py-3.5 text-center font-semibold text-white hover:bg-signal-dark"
            >
              Verder naar afrekenen
            </Link>
            <Link href="/pakketten" className="mt-3 block text-center text-sm underline underline-offset-2">
              Verder winkelen
            </Link>
          </OrderSummary>
        </div>
      </div>
    </div>
  );
}
