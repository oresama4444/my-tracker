import { api } from "../../lib/api";
import type {
  CreateIncomeResponse,
  DeleteIncomeResponse,
  GetIncomesResponse,
  NewIncomeFormData,
  UpdateIncomeFormData,
} from "./types";

export function getIncomes(): Promise<GetIncomesResponse> {
  return api<GetIncomesResponse>("/incomes");
}

export async function createIncome(data: NewIncomeFormData): Promise<boolean> {
  const { created } = await api<CreateIncomeResponse>("/incomes", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return created;
}

export async function deleteIncome(id: string): Promise<boolean> {
  const { deleted } = await api<DeleteIncomeResponse>(`/incomes/${id}`, {
    method: "DELETE",
  });

  return deleted;
}

export async function updateIncome(
  id: string,
  data: UpdateIncomeFormData,
): Promise<boolean> {
  const { updated } = await api<{ updated: boolean }>(`/incomes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return updated;
}
