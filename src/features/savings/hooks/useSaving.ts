import { useEffect, useState } from "react";
import { getSavings } from "../savingService";
import type { Saving, SavingCategory } from "../types";
import { defaultSavingCategory } from "../../../lib/defaultCategories";

export function useSaving() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [savings, setSavings] = useState<Saving[]>([]);
  const [savingsByCategory, setSavingsByCategory] = useState<SavingCategory[]>(
    [],
  );

  async function loadSavings() {
    try {
      setLoading(true);

      const { savings } = await getSavings();
      const byCategory = Object.values(savings.groupedByCategory).map(
        (group): SavingCategory => ({
          ...group,
          category: group.category ?? defaultSavingCategory,
        }),
      );

      setSavings(savings.raw);
      setSavingsByCategory(byCategory);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Error al cargar los ingresos"),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSavings();
  }, []);

  return {
    savings,
    savingsByCategory,
    loading,
    error,
  };
}
