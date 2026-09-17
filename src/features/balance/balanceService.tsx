import { api } from "../../lib/api";
import type { FormData } from "./types";

export async function createMoneyLog(data: FormData): Promise<boolean> {
  const { created } = await api<{ created: boolean }>("/balance", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return created;
}
