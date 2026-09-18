import { api } from "../../lib/api";
import type { FormData, GetLogsResponse } from "./types";

export async function createMoneyLog(data: FormData): Promise<boolean> {
  const { created } = await api<{ created: boolean }>("/balance", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return created;
}

export async function getLogs(): Promise<GetLogsResponse> {
  return api<GetLogsResponse>("/balance");
}
