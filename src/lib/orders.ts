import { getProduct } from "./products";
import { SITE } from "./site";

export type CartLine = { slug: string; qty: number };

export type Customer = {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: "NL" | "BE";
  note?: string;
};

export type OrderDraft = {
  lines: { sku: string; slug: string; name: string; qty: number; unitCents: number; totalCents: number }[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  customer: Customer;
};

export function calcTotals(lines: CartLine[]) {
  const resolved = lines.flatMap((l) => {
    const p = getProduct(l.slug);
    if (!p) return [];
    return [{ product: p, qty: l.qty, totalCents: p.priceCents * l.qty }];
  });
  const subtotalCents = resolved.reduce((s, l) => s + l.totalCents, 0);
  const shippingCents =
    subtotalCents === 0 || subtotalCents >= SITE.shipping.freeFromCents ? 0 : SITE.shipping.costCents;
  return { resolved, subtotalCents, shippingCents, totalCents: subtotalCents + shippingCents };
}

export function buildOrderDraft(lines: CartLine[], customer: Customer): OrderDraft {
  const t = calcTotals(lines);
  return {
    lines: t.resolved.map(({ product, qty, totalCents }) => ({
      sku: product.sku,
      slug: product.slug,
      name: product.name,
      qty,
      unitCents: product.priceCents,
      totalCents,
    })),
    subtotalCents: t.subtotalCents,
    shippingCents: t.shippingCents,
    totalCents: t.totalCents,
    customer,
  };
}

/**
 * Tijdelijke stub. Later: POST naar het eigen ordersysteem, dat de order opslaat,
 * een Mollie-betaling aanmaakt en de checkout-URL teruggeeft. Prijzen worden dan
 * server-side opnieuw berekend; de client-bedragen zijn alleen ter weergave.
 */
export async function submitOrder(draft: OrderDraft): Promise<{ orderId: string; checkoutUrl: string }> {
  await new Promise((r) => setTimeout(r, 700));
  const orderId = `NP-${Date.now().toString().slice(-6)}`;
  return { orderId, checkoutUrl: `/bestelling/bedankt?order=${orderId}&totaal=${draft.totalCents}` };
}
