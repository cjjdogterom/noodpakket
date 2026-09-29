"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./cart/CartProvider";
import { SITE } from "@/lib/site";
import { Icon } from "./Icons";

const NAV = [
  { href: "/pakketten", label: "Pakketten" },
  { href: "/#waarom", label: "Waarom 72 uur" },
  { href: "/#vragen", label: "Vragen" },
  { href: "/contact", label: "Contact" },
];

/** Zwevende glazen balk. Op de homepage over de donkere hero; elders over licht. */
export function Header() {
  const { count, ready } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Op de homepage ligt de balk over de donkere hero; daaronder schakelt hij naar licht glas.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onDark = pathname === "/" && !scrolled;
  const glass = onDark ? "glass-dark text-bone" : "glass text-night";

  return (
    <div className={`pointer-events-none sticky top-0 z-40 px-3 pt-3 sm:px-4 ${pathname === "/" ? "-mb-[76px]" : ""}`}>
      <header className={`pointer-events-auto mx-auto max-w-6xl rounded-[1.6rem] transition-colors duration-300 ${glass}`}>
        <div className="flex h-14 items-center justify-between gap-4 pl-4 pr-2">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Logo />
            <span className="font-display text-lg font-bold tracking-tight">{SITE.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Hoofdmenu">
            {NAV.map((n) => {
              const active = pathname === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-full px-3.5 py-2 text-[15px] font-medium transition ${
                    active
                      ? onDark ? "bg-white/12 text-bone" : "bg-night/8 text-night"
                      : onDark ? "text-bone/80 hover:bg-white/8 hover:text-bone" : "text-night/75 hover:bg-night/5 hover:text-night"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/winkelwagen"
              className="glass-btn flex h-10 items-center gap-2 rounded-full bg-amber pl-3.5 pr-4 text-sm font-semibold text-night hover:bg-amber-soft"
              aria-label={`Winkelwagen, ${count} artikelen`}
            >
              <Icon.Cart />
              <span className="hidden sm:inline">Winkelwagen</span>
              {ready && count > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-night px-1 font-mono text-xs text-bone">
                  {count}
                </span>
              )}
            </Link>
            <button
              type="button"
              className={`grid h-10 w-10 cursor-pointer place-items-center rounded-full md:hidden ${onDark ? "hover:bg-white/10" : "hover:bg-night/5"}`}
              aria-expanded={open}
              aria-label={open ? "Menu sluiten" : "Menu openen"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Icon.Close /> : <Icon.Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className={`border-t px-3 py-2 md:hidden ${onDark ? "border-white/10" : "border-night/10"}`} aria-label="Mobiel menu">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-3 font-display text-lg font-semibold">
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
    </div>
  );
}

export function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" aria-hidden>
      <circle cx="14" cy="14" r="13" fill="var(--amber)" />
      <path d="M14 7v14M7 14h14" stroke="var(--night)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
