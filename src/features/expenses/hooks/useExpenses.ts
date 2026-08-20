import { useEffect, useState } from "react";
import type { DailyExpense, Expense } from "../types";
import { getExpenses } from "../expenseService";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesByDay, setExpensesByDay] = useState<DailyExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadExpenses() {
      try {
        setLoading(true);

        const { expenses } = await getExpenses();

        setExpenses(expenses.raw);
        setExpensesByDay(expenses.groupedByDay);
      } catch (error) {
        setError(
          error instanceof Error ? error : new Error("Failed to load expenses"),
        );
      } finally {
        setLoading(false);
      }
    }

    loadExpenses();
  }, []);

  return {
    expenses,
    expensesByDay,
    loading,
    error,
  };
}
