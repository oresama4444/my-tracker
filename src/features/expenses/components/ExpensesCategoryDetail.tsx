import { SquarePen } from "lucide-react";
import { getLongDate } from "../../../lib/dates";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import type { Expense } from "../types";

export function ExpensesCategoryDetail({
  name,
  budget,
  expenses,
  total,
}: {
  name: string;
  budget?: number;
  expenses: Expense[];
  total: number;
}) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 border-t border-t-stone-300">
        <div className="text-sm">
          <h3>Presupuesto</h3>
          <p className="font-mono font-bold">{formatCurrency(budget)}</p>
        </div>
        <div>
          <button className="flex items-center gap-1 cursor-pointer rounded-lg py-1 px-2 transition-all duration-100 hover:bg-emerald-300 text-sm border border-stone-300">
            <SquarePen size={14} />
            Editar
          </button>
        </div>
      </div>
      <div className="border border-stone-200 m-2 rounded-lg max-h-80 overflow-y-auto">
        <div className="text-xs px-2 py-1 flex items-center justify-between">
          <h4>{`Gastos en ${name}`}</h4>
          <span className="font-mono">{formatCurrency(total)}</span>
        </div>
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between border-t border-t-stone-200 px-2 py-1"
          >
            <div>
              <h5 className="text-sm font-medium py-0.5">
                {capitalizeWord(expense.description)}
              </h5>
              <div className="text-xs text-stone-500">
                <span>{getLongDate(expense.date)}</span>
                {/* <span>{expense.location}</span> */}
              </div>
            </div>
            <div>
              <span className="font-mono text-sm text-red-500">
                {formatCurrency(expense.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
