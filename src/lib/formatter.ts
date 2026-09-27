export function capitalizeWord(word: string): string {
  return word.replace(/^[a-zA-Z]/, (c) => c.toUpperCase());
}

export function formatCurrency(amount: number | undefined): string | undefined {
  if (amount === undefined) return;

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}

export function cleanCurrency(currency: string): number {
  return Number(currency.replace(/\D/g, "")) / 100;
}
