import type { Metadata } from "next";
import Link from "next/link";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Bedankt voor je bestelling", robots: { index: false } };

export default async function ThanksPage({ searchParams }: PageProps<"/bestelling/bedankt">) {
  const sp = await searchParams;
  const order = typeof sp.order === "string" ? sp.order : null;
  const totaal = typeof sp.totaal === "string" ? Number(sp.totaal) : NaN;

  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-slate text-3xl text-bone">✓</div>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight">Bedankt voor je bestelling!</h1>
      {order && (
        <p className="mt-3 text-lg">
          Bestelnummer <strong>{order}</strong>
          {!Number.isNaN(totaal) && <> · {formatPrice(totaal)}</>}
        </p>
      )}
      <p className="mt-4 text-muted">
        Je ontvangt binnen enkele minuten een bevestiging per e-mail. Zodra je pakket onderweg is, sturen we je een
        track &amp; trace-code.
      </p>
      <p className="mt-6 rounded-xl border border-dashed border-amber bg-white/60 p-4 text-sm">
        Demo-modus: er is nog geen echte betaling of order aangemaakt. Straks komt hier de terugkeer vanuit Mollie.
      </p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-amber px-7 py-3.5 font-semibold text-night hover:bg-amber-soft">
        Terug naar home
      </Link>
    </div>
  );
}
