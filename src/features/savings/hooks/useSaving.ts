import { useEffect, useState } from "react";
import { createSavingEntry, getSavings } from "../savingService";
import type { NewSavingFormData, Saving, SavingCategory } from "../types";
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

  async function add(data: NewSavingFormData): Promise<boolean> {
    try {
      setLoading(true);

      const created = await createSavingEntry(data);
      if (created) loadSavings();

      return created;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("No se pudo crear el gasto"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    add,
    savings,
    savingsByCategory,
    loading,
    error,
  };
}
