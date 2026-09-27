import { getLongDate } from "../../../lib/dates";
import type { DailyIncome } from "../types";
import { Fragment } from "react/jsx-runtime";
import toast from "react-hot-toast";
import { IncomeItem } from "./IncomeItem";
import { UpdateIncomeForm } from "./UpdateIncomeForm";
import { useState } from "react";

interface IncomesListProps {
  incomesByDay: DailyIncome[];
  removeIncome: (id: string) => Promise<boolean>;
}

export function IncomesList({ incomesByDay, removeIncome }: IncomesListProps) {
  const [activeEdit, setActiveEdit] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    if (activeEdit === id) return setActiveEdit(null);

    setActiveEdit(id);
  };

  const handleDelete = async (id: string) => {
    const deleted = await removeIncome(id);

    if (!deleted) return toast.error("Error al eliminar");

    toast.success("Gasto eliminado corectamente");
  };

  return (
    <section className="mx-auto flex flex-col items-center max-w-4xl border border-stone-300 rounded-2xl">
      <div className="w-full py-2 px-4 border-b border-stone-300">
        <h1 className="font-semibold">Historial de ingresos</h1>
        <p className="text-sm text-stone-500">Tus ingresos por día</p>
      </div>
      {incomesByDay.map((dailyIncome) => (
        <div key={dailyIncome.id} className="w-full bg-stone-100">
          <div className="flex gap-2 items-center p-4 cursor-pointer">
            <div className="flex-1 flex flex-col">
              <h2 className="text-stone-700 font-semibold text-sm">
                {getLongDate(dailyIncome.date)}
              </h2>
              <p className="text-xs text-stone-500">{`${dailyIncome.meta.count} entradas`}</p>
            </div>
            <div className="text-sm font-bold font-mono text-green-700">{`$${dailyIncome.meta.total}`}</div>
          </div>
          <div>
            {dailyIncome.transactions.map((income) => (
              <Fragment key={income.id}>
                <IncomeItem
                  income={income}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                <UpdateIncomeForm
                  income={income}
                  // handleUpdate={handleUpdate}
                  cancelEdit={() => setActiveEdit(null)}
                  isActive={income.id === activeEdit}
                />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
