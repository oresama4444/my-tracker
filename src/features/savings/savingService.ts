import { api } from "../../lib/api";
import type {
  CreateSavingEntryResponse,
  DeleteSavingResponse,
  GetSavingsResponse,
  NewSavingFormData,
  UpdateSavingEntryResponse,
  UpdateSavingFormData,
} from "./types";

export function getSavings() {
  return api<GetSavingsResponse>("/savings");
}

export async function createSavingEntry(
  data: NewSavingFormData,
): Promise<boolean> {
  const { created } = await api<CreateSavingEntryResponse>("/savings", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return created;
}

export async function deleteSaving(id: string): Promise<boolean> {
  const { deleted } = await api<DeleteSavingResponse>(`/savings/${id}`, {
    method: "DELETE",
  });

  return deleted;
}

export async function updateSaving(
  id: string,
  data: UpdateSavingFormData,
): Promise<boolean> {
  const { updated } = await api<UpdateSavingEntryResponse>(`/savings/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return updated;
}
