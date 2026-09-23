import { useEffect, useState } from "react";
import { createIncome, getIncomes } from "../incomeService";
import type { DailyIncome, Income, NewIncomeFormData } from "../types";

export function useIncome() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [incomesByDay, setIncomesByDay] = useState<DailyIncome[]>([]);

  async function loadIncomes() {
    try {
      setLoading(true);

      const { incomes } = await getIncomes();

      setIncomes(incomes.raw);
      setIncomesByDay(incomes.groupedByDay);
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
    loadIncomes();
  }, []);

  async function addIncome(data: NewIncomeFormData): Promise<boolean> {
    try {
      setLoading(true);

      const created = await createIncome(data);
      if (created) loadIncomes();

      return created;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("No se encontró el gasto"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    incomes,
    incomesByDay,
    addIncome,
    loading,
    error,
  };
}
