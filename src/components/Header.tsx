"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart/CartProvider";
import { SITE } from "@/lib/site";
import { formatPrice } from "@/lib/format";

const NAV = [
  { href: "/pakketten", label: "Pakketten" },
  { href: "/#waarom", label: "Waarom 72 uur" },
  { href: "/#vragen", label: "Vragen" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-night text-bone">
      <div className="border-b border-bone/10 font-mono text-[11px] uppercase tracking-[0.18em] text-mist">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <span>{SITE.shipping.deliveryText}</span>
          <span className="hidden sm:inline">Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)}</span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="font-display text-xl font-bold tracking-tight">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hoofdmenu">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-[15px] hover:text-amber ${pathname === n.href ? "text-amber" : "text-bone/85"}`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/winkelwagen"
            className="flex h-10 items-center gap-2 rounded-full border border-bone/20 px-4 text-sm font-semibold hover:border-amber hover:text-amber"
            aria-label={`Winkelwagen, ${count} artikelen`}
          >
            <CartIcon />
            <span className="hidden sm:inline">Winkelwagen</span>
            {ready && count > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-amber px-1 font-mono text-xs font-semibold text-night">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 md:hidden"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="2" fill="none">
              {open ? <path d="M3 3l12 12M15 3L3 15" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
            </svg>
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-bone/10 px-4 py-3 md:hidden" aria-label="Mobiel menu">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 font-display text-xl">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="13" fill="var(--amber)" />
      <path d="M14 7v14M7 14h14" stroke="var(--night)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.9a2 2 0 002-1.5L21 8H6.2" />
      <circle cx="9.5" cy="20" r="1.3" />
      <circle cx="17.5" cy="20" r="1.3" />
    </svg>
  );
}
