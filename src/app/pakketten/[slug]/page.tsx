import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, type ContentItem } from "@/lib/products";
import { PackArt } from "@/components/PackArt";
import { AddToCartWithQty } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
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

  const groups = [...new Set(product.contents.map((c) => c.group))] as ContentItem["group"][];
  const related = PRODUCTS.filter((p) => p.slug !== product.slug && p.inStock).slice(0, 3);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-10">
        <nav className="text-sm text-ink-soft" aria-label="Kruimelpad">
          <Link href="/" className="hover:text-ink">Home</Link> <span aria-hidden>/</span>{" "}
          <Link href="/pakketten" className="hover:text-ink">Pakketten</Link> <span aria-hidden>/</span>{" "}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="relative overflow-hidden rounded-3xl border border-line md:sticky md:top-24 md:self-start">
            <PackArt art={product.art} className="aspect-[5/4] w-full" />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-signal px-3 py-1 text-sm font-bold text-white">
                {product.badge}
              </span>
            )}
          </div>

          <div>
            <h1 className="font-display text-4xl font-black leading-tight sm:text-5xl">{product.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {product.persons && <Chip>{product.persons} {product.persons === 1 ? "persoon" : "personen"}</Chip>}
              {product.hours && <Chip>{product.hours} uur</Chip>}
              <Chip>{product.weightKg.toLocaleString("nl-NL")} kg</Chip>
              <Chip>Art. {product.sku}</Chip>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-4xl font-black">{formatPrice(product.priceCents)}</span>
              {product.compareAtCents && (
                <span className="text-lg text-ink-soft line-through">{formatPrice(product.compareAtCents)}</span>
              )}
              <span className="text-sm text-ink-soft">incl. btw</span>
            </div>

            <p className="mt-5 text-lg text-ink-soft">{product.description}</p>

            <ul className="mt-6 space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-forest text-xs text-paper">✓</span>
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <AddToCartWithQty slug={product.slug} disabled={!product.inStock} />
            </div>

            <ul className="mt-6 grid gap-2 rounded-2xl bg-paper-2 p-5 text-sm sm:grid-cols-2">
              <li>🚚 {SITE.shipping.deliveryText}</li>
              <li>📦 Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)}</li>
              <li>↩︎ 30 dagen bedenktijd</li>
              <li>🔒 Veilig betalen via Mollie</li>
            </ul>

            <section className="mt-10">
              <h2 className="font-display text-2xl font-bold">Inhoud van het pakket</h2>
              {groups.map((g) => (
                <div key={g} className="mt-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-signal-dark">{g}</h3>
                  <ul className="mt-2 divide-y divide-line border-y border-line">
                    {product.contents
                      .filter((c) => c.group === g)
                      .map((c) => (
                        <li key={c.name} className="flex justify-between gap-4 py-2.5">
                          <span>{c.name}</span>
                          <span className="shrink-0 font-semibold tabular-nums text-ink-soft">{c.qty}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper-2">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="font-display text-3xl font-black">Ook interessant</h2>
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

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-line bg-white/60 px-3 py-1 font-medium">{children}</span>;
}
