import { api } from "../../lib/api";
import type {
  ExpenseUpdateFormData,
  GetExpenseCategoriesResponse,
  GetExpensesResponse,
  NewExpenseFormData,
} from "./types";

export function getExpenses(): Promise<GetExpensesResponse> {
  return api<GetExpensesResponse>("/expenses");
}

export function getExpenseCategories(): Promise<GetExpenseCategoriesResponse> {
  return api<GetExpenseCategoriesResponse>("/expenses/categories");
}

export async function updateExpense(
  id: string,
  data: ExpenseUpdateFormData,
): Promise<boolean> {
  const { updated } = await api<{ updated: boolean }>(`/expenses/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return updated;
}

export async function deleteExpense(id: string): Promise<boolean> {
  const { deleted } = await api<{ deleted: boolean }>(`/expenses/${id}`, {
    method: "DELETE",
  });

  return deleted;
}

export async function createExpense(
  data: NewExpenseFormData,
): Promise<boolean> {
  const { created } = await api<{ created: boolean }>("/expenses", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return created;
}
