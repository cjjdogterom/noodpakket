import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct } from "@/lib/products";
import { PackArt } from "@/components/PackArt";
import { AddToCartWithQty } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { PackList, GROUP_ORDER } from "@/components/PackList";
import { formatPrice } from "@/lib/format";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/pakketten/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p ? { title: p.name, description: p.short } : {};
}

export default async function ProductPage({ params }: PageProps<"/pakketten/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.inStock).slice(0, 3);
  const facts: [string, string][] = [
    ["Artikel", product.sku],
    ["Gewicht", `${product.weightKg.toLocaleString("nl-NL")} kg`],
  ];
  if (product.persons) facts.unshift(["Voor", `${product.persons} ${product.persons === 1 ? "persoon" : "personen"}`]);
  if (product.hours) facts.splice(1, 0, ["Duur", `${product.hours} uur`]);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="font-mono text-[11px] uppercase tracking-wider text-muted" aria-label="Kruimelpad">
          <Link href="/" className="hover:text-night">Home</Link> / <Link href="/pakketten" className="hover:text-night">Pakketten</Link> /{" "}
          <span className="text-night">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="relative overflow-hidden rounded-3xl bg-bone-2">
              <PackArt art={product.art} className="aspect-[5/4] w-full" />
              {product.badge && (
                <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-night">
                  {product.badge}
                </span>
              )}
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4">
              {facts.map(([k, v]) => (
                <div key={k} className="bg-bone p-4">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">{k}</dt>
                  <dd className="mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-tight sm:text-5xl">{product.name}</h1>
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl font-bold tracking-tight">{formatPrice(product.priceCents)}</span>
              {product.compareAtCents && (
                <span className="text-lg text-muted line-through">{formatPrice(product.compareAtCents)}</span>
              )}
              <span className="font-mono text-xs uppercase tracking-wider text-muted">incl. btw</span>
            </div>

            <p className="mt-6 text-lg leading-relaxed text-muted">{product.description}</p>

            <ul className="mt-6 space-y-2.5">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <AddToCartWithQty slug={product.slug} disabled={!product.inStock} />
            </div>

            <ul className="mt-6 grid gap-x-6 gap-y-1.5 border-y border-line py-4 text-sm text-muted sm:grid-cols-2">
              <li>{SITE.shipping.deliveryText}</li>
              <li>Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)}</li>
              <li>30 dagen bedenktijd</li>
              <li>Veilig betalen via Mollie</li>
            </ul>

            <section className="mt-12">
              <h2 className="font-display text-2xl font-semibold">Paklijst</h2>
              <div className="mt-6 space-y-8">
                {GROUP_ORDER.map((g) => (
                  <PackList key={g} items={product.contents} group={g} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-bone-2/60">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Ook interessant</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
