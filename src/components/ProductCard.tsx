import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { PackArt } from "./PackArt";
import { AddToCartButton } from "./AddToCart";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white/60 transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(22,33,29,0.25)]">
      <Link href={`/pakketten/${product.slug}`} className="relative block">
        <PackArt art={product.art} className="aspect-[5/4] w-full" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-signal px-3 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        )}
        {product.persons && (
          <span className="absolute right-3 top-3 rounded-full bg-paper px-3 py-1 text-xs font-semibold">
            {product.persons} {product.persons === 1 ? "persoon" : "personen"}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-bold leading-tight">
          <Link href={`/pakketten/${product.slug}`} className="hover:text-signal-dark">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm text-ink-soft">{product.short}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            {product.compareAtCents && (
              <div className="text-sm text-ink-soft line-through">{formatPrice(product.compareAtCents)}</div>
            )}
            <div className="font-display text-xl font-extrabold">{formatPrice(product.priceCents)}</div>
          </div>
          <AddToCartButton slug={product.slug} disabled={!product.inStock} compact />
        </div>
      </div>
    </article>
  );
}
