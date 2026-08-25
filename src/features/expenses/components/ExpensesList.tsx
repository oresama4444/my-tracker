import { useExpenses } from "../hooks/useExpenses";
import { getLongDate } from "../../../lib/dates";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { Dot, Pencil, Trash } from "lucide-react";
import type { Expense } from "../types";
import { Fragment, useEffect, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";

export function ExpensesList() {
  const { expensesByDay } = useExpenses();
  const [activeExpenses, setActiveExpenses] = useState<string | null>(null);
  const [activeEdit, setActiveEdit] = useState<string | null>(null);

  useEffect(() => {
    if (expensesByDay.length > 0) setActiveExpenses(expensesByDay[0].id);
  }, [expensesByDay]);

  const handleEdit = (id: string) => {
    if (!!activeEdit) return setActiveEdit(null);

    setActiveEdit(id);
  };

  const cancelEdit = () => setActiveEdit(null);

  return (
    <section className="mx-auto p-2 flex flex-col items-center gap-4 max-w-4xl">
      {expensesByDay.map((dailyExpenses) => (
        <div
          key={dailyExpenses.id}
          className="w-full bg-stone-100 border border-stone-300 rounded-xl"
        >
          <div
            className="flex gap-2 items-center p-4 cursor-pointer"
            onClick={() => setActiveExpenses(dailyExpenses.id)}
          >
            <div className="flex-1 flex items-center">
              <h2 className="text-stone-700 font-semibold">
                {getLongDate(dailyExpenses.date)}
              </h2>
              <Dot />
              <p className="text-sm text-stone-500">{`${dailyExpenses.meta.count} expenses`}</p>
            </div>
            <div className="text-sm font-bold">{`$${dailyExpenses.meta.total}`}</div>
          </div>
          <div
          // className={`${dailyExpenses.id === activeExpenses ? "max-h-250 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"} transition-all duration-200`}
          >
            {dailyExpenses.expenses.map((expense) => (
              <Fragment key={expense.id}>
                <ExpenseItem expense={expense} handleEdit={handleEdit} />
                <ExpenseForm
                  expense={expense}
                  cancelEdit={cancelEdit}
                  isActive={expense.id === activeEdit}
                />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function ExpenseItem({
  expense,
  handleEdit,
}: {
  expense: Expense;
  handleEdit: (id: string) => void;
}) {
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
        <button
          onClick={() => handleEdit(expense.id)}
          className="cursor-pointer"
        >
          <Pencil size={18} />
        </button>
        <button className="text-red-400 cursor-pointer">
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
