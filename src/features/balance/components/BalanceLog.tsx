import { Trash } from "lucide-react";
import { getShortDate } from "../../../lib/dates";
import { formatCurrency } from "../../../lib/formatter";
import toast from "react-hot-toast";
import type { MoneyLog } from "../types";

export function BalanceLog({
  moneyLogs,
  removeLog,
}: {
  moneyLogs: MoneyLog[];
  removeLog: (id: string) => Promise<boolean>;
}) {
  const calculateBalance = (cash: number, account: number): number =>
    cash + account;

  const calculateAvailable = (
    cash: number,
    account: number,
    payments: number,
  ): number => calculateBalance(cash, account) - payments;

  const handleDelete = async (id: string) => {
    const deleted = await removeLog(id);

    if (!deleted) return toast.error("Error al eliminar");

    toast.success("Registro eliminado corectamente");
  };

  return (
    <section className="mx-auto flex flex-col items-center max-w-4xl border border-stone-300 rounded-3xl mt-4">
      <div className="flex justify-between w-full py-2 px-6 border-b border-stone-300">
        <div>
          <h1 className="font-semibold">Registros de balance</h1>
          <span className="text-xs text-stone-500">{`${moneyLogs.length} entradas`}</span>
        </div>
        <div></div>
      </div>
      <div className="w-full flex py-2 mt-2 px-6 text-sm text-stone-400">
        <div className="min-w-28">Fecha</div>
        <div className="w-full grid grid-cols-5 items-center text-center">
          <span>Efectivo</span>
          <span>Cuenta</span>
          <span>Balance</span>
          <span>Pendientes</span>
          <span>Disponible</span>
        </div>
        <div className="min-w-10"></div>
      </div>
      {moneyLogs.map((log) => (
        <div
          key={log.id}
          className="w-full flex py-4 px-6 border-b border-stone-300 text-sm"
        >
          <div className="min-w-28">{getShortDate(log.date)}</div>
          <div className="w-full grid grid-cols-5 items-center text-center font-mono">
            <span>{formatCurrency(log.cash)}</span>
            <span>{formatCurrency(log.account)}</span>
            <span>
              {formatCurrency(calculateBalance(log.cash, log.account))}
            </span>
            <span>{formatCurrency(log.payments)}</span>
            <span
              className={`${calculateAvailable(log.cash, log.account, log.payments) < 0 && "text-red-500"}`}
            >
              {formatCurrency(
                calculateAvailable(log.cash, log.account, log.payments),
              )}
            </span>
          </div>
          <div className="min-w-10 flex items-center justify-center">
            <button
              className="text-red-400 cursor-pointer"
              onClick={() => handleDelete(log.id)}
            >
              <Trash size={18} />
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
