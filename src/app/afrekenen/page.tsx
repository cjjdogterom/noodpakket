"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { buildOrderDraft, submitOrder, type Customer } from "@/lib/orders";

const PAYMENT_METHODS = ["iDEAL", "Bancontact", "Creditcard", "PayPal"] as const;

export default function CheckoutPage() {
  const { lines, ready, totals, clear } = useCart();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!ready) return <div className="mx-auto min-h-[50vh] max-w-6xl px-4 py-14" />;

  if (totals.resolved.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Niets om af te rekenen</h1>
        <Link href="/pakketten" className="mt-8 inline-block rounded-full bg-amber px-7 py-3.5 font-semibold text-night">
          Naar de pakketten
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const customer: Customer = {
      email: get("email"),
      phone: get("phone") || undefined,
      firstName: get("firstName"),
      lastName: get("lastName"),
      street: get("street"),
      houseNumber: get("houseNumber"),
      postalCode: get("postalCode").toUpperCase(),
      city: get("city"),
      country: get("country") === "BE" ? "BE" : "NL",
      note: get("note") || undefined,
    };

    setSubmitting(true);
    try {
      const { checkoutUrl } = await submitOrder(buildOrderDraft(lines, customer));
      clear();
      router.push(checkoutUrl);
    } catch {
      setError("Er ging iets mis bij het plaatsen van je bestelling. Probeer het opnieuw.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">Afrekenen</h1>
      <form onSubmit={onSubmit} className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <Fieldset title="1. Contactgegevens">
            <Field name="email" label="E-mailadres" type="email" autoComplete="email" required className="sm:col-span-2" />
            <Field name="phone" label="Telefoonnummer (optioneel)" type="tel" autoComplete="tel" className="sm:col-span-2" />
          </Fieldset>

          <Fieldset title="2. Bezorgadres">
            <Field name="firstName" label="Voornaam" autoComplete="given-name" required />
            <Field name="lastName" label="Achternaam" autoComplete="family-name" required />
            <Field name="postalCode" label="Postcode" autoComplete="postal-code" required pattern="[0-9]{4}\s?[A-Za-z]{0,2}" />
            <Field name="houseNumber" label="Huisnummer + toevoeging" required />
            <Field name="street" label="Straat" autoComplete="address-line1" required />
            <Field name="city" label="Plaats" autoComplete="address-level2" required />
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Land</span>
              <select name="country" defaultValue="NL" className={inputCls}>
                <option value="NL">Nederland</option>
                <option value="BE">België</option>
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="text-sm font-semibold">Opmerking (optioneel)</span>
              <textarea name="note" rows={3} className={inputCls} />
            </label>
          </Fieldset>

          <Fieldset title="3. Betaalmethode">
            <p className="text-sm text-muted sm:col-span-2">
              Na het plaatsen van je bestelling word je doorgestuurd naar de beveiligde betaalomgeving van Mollie.
            </p>
            <div className="grid grid-cols-2 gap-3 sm:col-span-2 sm:grid-cols-4">
              {PAYMENT_METHODS.map((m, i) => (
                <label
                  key={m}
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-line bg-white p-3 text-sm font-semibold has-[:checked]:border-amber-2 has-[:checked]:ring-2 has-[:checked]:ring-amber"
                >
                  <input type="radio" name="method" value={m} defaultChecked={i === 0} className="accent-amber-2" />
                  {m}
                </label>
              ))}
            </div>
          </Fieldset>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <OrderSummary showLines>
            <label className="mt-6 flex items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1 accent-amber-2" />
              <span>
                Ik ga akkoord met de{" "}
                <Link href="/voorwaarden" className="underline" target="_blank">algemene voorwaarden</Link>
              </span>
            </label>
            {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="mt-5 w-full rounded-full bg-amber py-3.5 font-semibold text-night hover:bg-amber-soft disabled:opacity-60"
            >
              {submitting ? "Bestelling plaatsen…" : "Bestellen en betalen"}
            </button>
            <p className="mt-3 text-center text-xs text-muted">🔒 Veilig betalen via Mollie</p>
          </OrderSummary>
        </div>
      </form>
    </div>
  );
}

const inputCls =
  "mt-1.5 block w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-amber-2 focus:ring-2 focus:ring-amber/40";

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="font-display text-xl font-bold">{title}</legend>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  className = "",
  ...props
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-semibold">{label}</span>
      <input {...props} className={inputCls} />
    </label>
  );
}
