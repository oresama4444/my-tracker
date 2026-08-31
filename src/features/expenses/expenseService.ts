import { api } from "../../lib/api";
import type { FormData, GetExpensesResponse } from "./types";

export function getExpenses(): Promise<GetExpensesResponse> {
  return api<GetExpensesResponse>("/expenses");
}

export async function updateExpense(
  id: string,
  data: FormData,
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
