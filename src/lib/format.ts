const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

export function formatPrice(cents: number) {
  return euro.format(cents / 100);
}

/** Mollie verwacht bedragen als string met twee decimalen, bv. "79.95". */
export function toMollieAmount(cents: number) {
  return (cents / 100).toFixed(2);
}
