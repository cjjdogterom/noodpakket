import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { PackArt } from "./PackArt";
import { AddToCartButton } from "./AddToCart";

export function ProductCard({ product }: { product: Product }) {
  const meta = [
    product.persons ? `${product.persons} pers.` : null,
    product.hours ? `${product.hours} uur` : null,
    `${product.contents.length} onderdelen`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className="glass group flex flex-col rounded-[1.6rem] p-2 transition duration-300 hover:-translate-y-1">
      <Link href={`/pakketten/${product.slug}`} className="relative block overflow-hidden rounded-[1.2rem]">
        <PackArt art={product.art} className="aspect-[5/4] w-full transition duration-500 group-hover:scale-[1.04]" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-night/85 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-amber">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
        <p className="font-mono text-[11px] uppercase tracking-wider text-muted">{meta}</p>
        <h3 className="mt-1.5 font-display text-xl font-bold leading-tight tracking-tight">
          <Link href={`/pakketten/${product.slug}`} className="hover:text-amber-2">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{product.short}</p>
        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            {product.compareAtCents && (
              <div className="text-sm text-muted line-through">{formatPrice(product.compareAtCents)}</div>
            )}
            <div className="font-display text-2xl font-bold tracking-tight">{formatPrice(product.priceCents)}</div>
          </div>
          <AddToCartButton slug={product.slug} disabled={!product.inStock} compact />
        </div>
      </div>
    </article>
  );
}
