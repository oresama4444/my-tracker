import { useExpenses } from "../hooks/useExpenses";
import { getLongDate } from "../../../lib/dates";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { Dot, Pencil, Trash } from "lucide-react";
import type { Expense } from "../types";

export function ExpensesList() {
  const { expensesByDay } = useExpenses();

  return (
    <section className="mx-auto p-2 flex flex-col items-center gap-4 max-w-4xl">
      {expensesByDay.map((dailyExpenses) => (
        <div
          key={dailyExpenses.id}
          className="w-full bg-stone-100 border border-stone-300 rounded-xl"
        >
          <div className="flex gap-2 items-center p-4">
            <div className="flex-1 flex items-center">
              <h2 className="text-stone-700 font-semibold">
                {getLongDate(dailyExpenses.date)}
              </h2>
              <Dot />
              <p className="text-sm text-stone-500">{`${dailyExpenses.meta.count} expenses`}</p>
            </div>
            <div className="text-sm font-bold">{`$${dailyExpenses.meta.total}`}</div>
          </div>
          <div>
            {dailyExpenses.expenses.map((expense) => (
              <ExpenseItem expense={expense} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function ExpenseItem({ expense }: { expense: Expense }) {
  return (
    <div
      key={expense.id}
      className="flex gap-8 items-center px-6 py-2 border-t border-t-stone-200"
    >
      <div className="flex-1">
        <h3>{expense.description && capitalizeWord(expense.description)}</h3>
        <div className="flex items-center text-xs text-stone-500">
          <p>{expense.category}</p>
          <Dot />
          <p>{expense.subcategory}</p>
        </div>
      </div>
      <div>
        <p className="text-sm">{formatCurrency(expense.amount)}</p>
      </div>
      <div className="flex gap-3">
        <button>
          <Pencil size={18} />
        </button>
        <button className="text-red-400">
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
