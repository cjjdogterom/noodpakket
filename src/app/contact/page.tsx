import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14">
      <h1 className="font-display text-5xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-3 max-w-xl text-lg text-muted">
        Vragen over een pakket, een bestelling of een zakelijke offerte? We helpen je graag. Op werkdagen reageren we
        binnen 24 uur.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <a href={`mailto:${SITE.email}`} className="rounded-2xl border border-line bg-white/60 p-6 hover:border-slate">
          <div className="text-sm font-bold uppercase tracking-widest text-amber-2">E-mail</div>
          <div className="mt-2 font-display text-xl font-bold">{SITE.email}</div>
        </a>
        <div className="rounded-2xl border border-line bg-white/60 p-6">
          <div className="text-sm font-bold uppercase tracking-widest text-amber-2">Telefoon</div>
          <div className="mt-2 font-display text-xl font-bold">{SITE.phone}</div>
          <div className="mt-1 text-sm text-muted">Ma–vr 9:00–17:00</div>
        </div>
      </div>
      <div className="mt-6 rounded-2xl bg-slate p-6 text-bone">
        <div className="font-display text-xl font-bold">Zakelijk bestellen?</div>
        <p className="mt-1 text-bone/75">
          Voor bedrijven, scholen en gemeenten stellen we pakketten op maat samen, met staffelkorting vanaf 10 stuks.
        </p>
      </div>
    </div>
  );
}
