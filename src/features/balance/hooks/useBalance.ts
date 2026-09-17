import { useState } from "react";
import type { FormData } from "../types";
import { createMoneyLog } from "../balanceService";

export function useBalance() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function logMoney(data: FormData): Promise<boolean> {
    try {
      setLoading(true);

      const created = await createMoneyLog(data);

      return created;
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("No se encontró el gasto"),
      );
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    logMoney,
    loading,
    error,
  };
}
