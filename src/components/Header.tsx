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
    <>
      <div className="bg-ink text-paper text-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 py-2 text-center">
          <span className="inline-block h-2 w-2 rounded-full bg-signal" aria-hidden />
          Gratis verzending vanaf {formatPrice(SITE.shipping.freeFromCents)} · {SITE.shipping.deliveryText}
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Logo />
            <span className="font-display text-xl font-extrabold tracking-tight">{SITE.name}</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Hoofdmenu">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`text-[15px] font-medium hover:text-signal-dark ${
                  pathname === n.href ? "text-signal-dark" : ""
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/winkelwagen"
              className="relative flex h-10 items-center gap-2 rounded-full bg-forest px-4 text-sm font-semibold text-paper hover:bg-forest-2"
              aria-label={`Winkelwagen, ${count} artikelen`}
            >
              <CartIcon />
              <span className="hidden sm:inline">Winkelwagen</span>
              {ready && count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-signal px-1 text-xs font-bold">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
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
          <nav className="border-t border-line px-4 py-3 md:hidden" aria-label="Mobiel menu">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}

export function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
      <rect x="1" y="7" width="28" height="22" rx="3" fill="var(--forest)" />
      <rect x="0" y="3" width="30" height="7" rx="2" fill="var(--forest-2)" />
      <path d="M15 12v12M9 18h12" stroke="var(--signal)" strokeWidth="4" />
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
