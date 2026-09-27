import { useEffect, useState } from "react";
import {
  createIncome,
  deleteIncome,
  getIncomes,
  updateIncome,
} from "../incomeService";
import type {
  DailyIncome,
  Income,
  NewIncomeFormData,
  UpdateIncomeFormData,
} from "../types";

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

  async function removeIncome(incomeId: string): Promise<boolean> {
    try {
      setLoading(true);

      const deleted = await deleteIncome(incomeId);
      if (deleted) loadIncomes();

      return deleted;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("No se encontró el gasto"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function editIncome(
    incomeId: string,
    data: UpdateIncomeFormData,
    income: Income,
  ): Promise<boolean> {
    const newIncome: UpdateIncomeFormData = {};

    if (Number(data.date) !== Number(income.date))
      newIncome.date = Number(data.date);
    if (Number(data.amount) !== Number(income.amount))
      newIncome.amount = Number(data.amount);
    if (data.description !== income.description)
      newIncome.description = data.description;
    if (data.category !== income.category) newIncome.category = data.category;

    try {
      setLoading(true);

      const updated = await updateIncome(incomeId, newIncome);
      if (updated) loadIncomes();

      return updated;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("No se pudo actualizar el ingreso"),
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
    removeIncome,
    editIncome,
    loading,
    error,
  };
}
