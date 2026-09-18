import { useEffect, useState } from "react";
import type { FormData, MoneyLog } from "../types";
import { createMoneyLog, getLogs } from "../balanceService";

export function useBalance() {
  const [moneyLogs, setMoneyLogs] = useState<MoneyLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  async function loadLogs() {
    try {
      setLoading(true);

      const { moneyLogs } = await getLogs();

      setMoneyLogs(moneyLogs);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("Error al cargar los gastos"),
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLogs();
  }, []);

  async function logMoney(data: FormData): Promise<boolean> {
    try {
      setLoading(true);

      const created = await createMoneyLog(data);
      loadLogs();

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
    moneyLogs,
    loading,
    error,
  };
}
