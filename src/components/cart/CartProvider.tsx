"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { calcTotals, type CartLine } from "@/lib/orders";
import { getProduct } from "@/lib/products";

const STORAGE_KEY = "noodpakket.cart.v1";
const MAX_QTY = 20;

type CartContextValue = {
  lines: CartLine[];
  ready: boolean;
  count: number;
  totals: ReturnType<typeof calcTotals>;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  lastAdded: string | null;
  dismissAdded: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStorage(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed.filter((l) => getProduct(l.slug) && l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- eenmalige hydratie uit localStorage
    setLines(readStorage());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* opslag niet beschikbaar: winkelwagen blijft alleen in geheugen */
    }
  }, [lines, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === slug);
      if (existing) {
        return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l));
      }
      return [...prev, { slug, qty: Math.min(MAX_QTY, qty) }];
    });
    setLastAdded(slug);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(MAX_QTY, qty) } : l)),
    );
  }, []);

  const remove = useCallback((slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);
  const dismissAdded = useCallback(() => setLastAdded(null), []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      ready,
      count: lines.reduce((s, l) => s + l.qty, 0),
      totals: calcTotals(lines),
      add,
      setQty,
      remove,
      clear,
      lastAdded,
      dismissAdded,
    }),
    [lines, ready, add, setQty, remove, clear, lastAdded, dismissAdded],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart moet binnen <CartProvider> gebruikt worden");
  return ctx;
}
