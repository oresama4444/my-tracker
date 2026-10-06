import { api } from "../../lib/api";
import type {
  CreateSavingEntryResponse,
  GetSavingsResponse,
  NewSavingFormData,
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
