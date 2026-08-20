import { api } from "../../lib/api";
import type { GetExpensesResponse } from "./types";

export function getExpenses(): Promise<GetExpensesResponse> {
  return api<GetExpensesResponse>("/expenses");
}
