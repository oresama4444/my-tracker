import { useEffect, useState } from "react";
import type {
  DailyExpense,
  Expense,
  ExpenseCategory,
  ExpenseUpdateFormData,
  NewExpenseFormData,
} from "../types";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../expenseService";

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesByDay, setExpensesByDay] = useState<DailyExpense[]>([]);
  const [expensesByCategory, setExpensesByCategory] = useState<
    ExpenseCategory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function loadExpenses() {
    try {
      setLoading(true);

      const { expenses } = await getExpenses();

      setExpenses(expenses.raw);
      setExpensesByDay(expenses.groupedByDay);
      setExpensesByCategory(expenses.groupedByCategory);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Error al cargar los gastos"),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function update(
    expenseId: string,
    data: ExpenseUpdateFormData,
    expense: Expense,
  ): Promise<boolean> {
    const newExpense: ExpenseUpdateFormData = {};

    if (Number(data.amount) !== Number(expense.amount))
      newExpense.amount = Number(data.amount);
    if (data.description !== expense.description)
      newExpense.description = data.description;
    if (data.location !== expense.location) newExpense.location = data.location;
    if (data.category !== expense.category) newExpense.category = data.category;
    if (data.subcategory !== expense.subcategory)
      newExpense.subcategory = data.subcategory;
    if (data.account !== expense.account) newExpense.account = data.account;

    try {
      setLoading(true);

      const updated = await updateExpense(expenseId, newExpense);
      if (updated) loadExpenses();

      return updated;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("No se pudo actualizar el gasto"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function remove(expenseId: string): Promise<boolean> {
    try {
      setLoading(true);

      const deleted = await deleteExpense(expenseId);
      if (deleted) loadExpenses();

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

  async function add(data: NewExpenseFormData): Promise<boolean> {
    try {
      setLoading(true);

      const created = await createExpense(data);
      if (created) loadExpenses();

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
    expenses,
    expensesByDay,
    expensesByCategory,
    update,
    remove,
    add,
    loading,
    error,
  };
}
