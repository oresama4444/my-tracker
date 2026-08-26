import { useEffect, useState } from "react";
import type { DailyExpense, Expense, FormData } from "../types";
import { getExpenses, updateExpense } from "../expenseService";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesByDay, setExpensesByDay] = useState<DailyExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

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

  useEffect(() => {
    loadExpenses();
  }, []);

  async function update(expenseId: string, data: FormData, expense: Expense) {
    const newExpense: FormData = {};

    if (Number(data.amount) !== Number(expense.amount))
      newExpense.amount = Number(data.amount);
    if (data.description !== expense.description)
      newExpense.description = data.description;
    if (data.location !== expense.location) newExpense.location = data.location;
    if (data.category !== expense.category) newExpense.category = data.category;
    if (data.subcategory !== expense.subcategory)
      newExpense.subcategory = data.subcategory;
    if (data.account !== expense.account) newExpense.account = data.account;

    const updated = await updateExpense(expenseId, newExpense);
    if (updated) loadExpenses();

    return updated;
  }

  return {
    expenses,
    expensesByDay,
    update,
    loading,
    error,
  };
}
