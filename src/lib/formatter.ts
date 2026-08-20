export function capitalizeWord(word: string): string {
  return word.replace(/^[a-zA-Z]/, (c) => c.toUpperCase());
}
