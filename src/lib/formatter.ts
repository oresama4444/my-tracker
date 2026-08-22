export function capitalizeWord(word: string): string {
  return word.replace(/^[a-zA-Z]/, (c) => c.toUpperCase());
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  }).format(amount);
}
