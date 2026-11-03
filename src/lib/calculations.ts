import { formatCurrency } from "./formatter";

export const calculatePercentage = (
  total: number | undefined,
  progress: number | undefined,
): number =>
  total !== undefined && progress !== undefined
    ? Math.min((progress / total) * 100, 100)
    : 0;

export const calculateToGo = (
  total: number | undefined,
  progress: number | undefined,
): string =>
  total !== undefined && progress !== undefined
    ? formatCurrency(Math.max(total - progress, 0))
    : formatCurrency(0);
