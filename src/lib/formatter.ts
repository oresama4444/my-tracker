export function capitalizeWord(word: string | undefined): string {
  if (word === undefined) return "";

  return word.replace(/^[a-zA-Z]/, (c) => c.toUpperCase());
}

export function formatCurrency(amount: number | undefined): string {
  if (amount === undefined) return formatCurrency(0);

  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}

export function cleanCurrency(currency: string): number {
  return Number(currency.replace(/\D/g, "")) / 100;
}
