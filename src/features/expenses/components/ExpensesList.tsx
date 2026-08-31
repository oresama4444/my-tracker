import { useExpenses } from "../hooks/useExpenses";
import { getLongDate } from "../../../lib/dates";
import { Dot } from "lucide-react";
import type { Expense, FormData } from "../types";
import { Fragment, useEffect, useState } from "react";
import { ExpenseForm } from "./ExpenseForm";
import toast from "react-hot-toast";
import { ExpenseItem } from "./ExpenseItem";

export function ExpensesList() {
  const { expensesByDay, update, remove } = useExpenses();
  // const [activeExpenses, setActiveExpenses] = useState<string | null>(null);
  const [activeEdit, setActiveEdit] = useState<string | null>(null);

  // useEffect(() => {
  //   if (expensesByDay.length > 0) setActiveExpenses(expensesByDay[0].id);
  // }, [expensesByDay]);

  const handleEdit = (id: string) => {
    if (!!activeEdit) return setActiveEdit(null);

    setActiveEdit(id);
  };

  const handleUpdate = async (id: string, data: FormData, expense: Expense) => {
    const updated = await update(id, data, expense);

    if (!updated) return toast.error("Error al actualizar");

    toast.success("Gasto actualizado correctamente");
  };

  const handleDelete = async (id: string) => {
    const deleted = await remove(id);

    if (!deleted) return toast.error("Error al eliminar");

    toast.success("Gasto eliminado corectamente");
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
            // onClick={() => setActiveExpenses(dailyExpenses.id)}
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
                <ExpenseItem
                  expense={expense}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                <ExpenseForm
                  expense={expense}
                  handleUpdate={handleUpdate}
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
