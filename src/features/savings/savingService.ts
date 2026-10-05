import { api } from "../../lib/api";
import type { GetSavingsResponse } from "./types";

export function getSavings() {
  return api<GetSavingsResponse>("/savings");
}
