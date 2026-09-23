import { BanknoteCheck, Pencil, Tag, Trash } from "lucide-react";
import { getDateNTime, getLongDate } from "../../../lib/dates";
import type { DailyIncome, Income } from "../types";
import { Fragment } from "react/jsx-runtime";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import toast from "react-hot-toast";

interface IncomesListProps {
  incomesByDay: DailyIncome[];
  removeIncome: (id: string) => Promise<boolean>;
}

export function IncomesList({ incomesByDay, removeIncome }: IncomesListProps) {
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
            {dailyIncome.incomes.map((income) => (
              <Fragment key={income.id}>
                <IncomeItem
                  income={income}
                  //   handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                {/* <Form
                  income={income}
                  handleUpdate={handleUpdate}
                  cancelEdit={cancelEdit}
                  isActive={income.id === activeEdit}
                /> */}
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function IncomeItem({
  income,
  handleDelete,
}: {
  income: Income;
  handleDelete: (id: string) => void;
}) {
  return (
    <div
      key={income.id}
      className="flex gap-6 items-center px-6 py-2 border-b border-stone-300 bg-stone-50"
    >
      <div className="bg-emerald-200 text-emerald-700 rounded-4xl p-2">
        <BanknoteCheck />
      </div>
      <div className="flex-1">
        <div className="flex gap-2">
          <h3>{income.description && capitalizeWord(income.description)}</h3>
          {income.category && (
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-600 rounded-4xl py-1 px-2">
              <Tag size={14} />
              {capitalizeWord(income.category)}
            </span>
          )}
        </div>
        <div className="flex items-center text-xs text-stone-500">
          <p>{`Agregado: ${getDateNTime(income.date, "short")}`}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-mono text-green-700">
          {formatCurrency(income.amount)}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          // onClick={() => handleEdit(income.id)}
          className="cursor-pointer text-stone-400"
        >
          <Pencil size={16} />
        </button>
        <button
          className="text-red-400 cursor-pointer"
          onClick={() => handleDelete(income.id)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
