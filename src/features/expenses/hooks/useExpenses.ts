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
  getExpenseCategories,
  getExpenses,
  updateExpense,
} from "../expenseService";
import { defaultExpenseCategory } from "../../../lib/defaultCategories";
import type { NewCategoryFormData } from "../../categories/types";
import { useCategories } from "../../categories/useCategories";
import type { Category } from "../../../types/common";

export function useExpenses() {
  const { addCategory } = useCategories();
  const [expenseCategories, setExpenseCategories] = useState<Category[]>();
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
      const expensesByCategory = Object.values(expenses.groupedByCategory).map(
        (group): ExpenseCategory => ({
          ...group,
          category: group.category ?? defaultExpenseCategory,
        }),
      );

      setExpenses(expenses.raw);
      setExpensesByDay(expenses.groupedByDay);
      setExpensesByCategory(expensesByCategory);
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

  async function loadExpenseCategories() {
    try {
      setLoading(true);

      const { expenseCategories } = await getExpenseCategories();

      setExpenseCategories(expenseCategories);
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
    loadExpenseCategories();
  }, []);

  async function update(
    expenseId: string,
    data: ExpenseUpdateFormData,
    expense: Expense,
  ): Promise<boolean> {
    const newExpense: ExpenseUpdateFormData = {};

    if (Number(data.date) !== Number(expense.date))
      newExpense.date = Number(data.date);
    if (Number(data.amount) !== Number(expense.amount))
      newExpense.amount = Number(data.amount);
    if (data.description !== expense.description)
      newExpense.description = data.description;
    if (data.location !== expense.location) newExpense.location = data.location;
    if (data.category_id !== expense.category_id)
      newExpense.category_id = data.category_id;
    // if (data.subcategory !== expense.subcategory)
    //   newExpense.subcategory = data.subcategory;
    // if (data.account !== expense.account) newExpense.account = data.account;

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

  async function addExpensesCategory(data: NewCategoryFormData) {
    const createdCategory = await addCategory(data);
    if (typeof createdCategory === "boolean") return createdCategory;

    loadExpenses();
    return createdCategory.created;
  }

  function getCategoryName(categoryId: string): string | undefined {
    const foundCategory = expenseCategories?.find(
      (category) => category.id === categoryId,
    );

    return foundCategory?.name;
  }

  return {
    expenses,
    expensesByDay,
    expensesByCategory,
    expenseCategories,
    update,
    remove,
    add,
    addExpensesCategory,
    getCategoryName,
    loading,
    error,
  };
}
