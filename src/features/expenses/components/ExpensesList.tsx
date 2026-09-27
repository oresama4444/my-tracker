import { Fragment, useState } from "react";
import type {
  Expense,
  ExpensesListProps,
  ExpenseUpdateFormData,
} from "../types";
import { getLongDate } from "../../../lib/dates";
import { UpdateExpenseForm } from "./UpdateExpenseForm";
import { ExpenseItem } from "./ExpenseItem";
import { Dot } from "lucide-react";
import toast from "react-hot-toast";

export function ExpensesList({
  expensesByDay,
  update,
  remove,
}: ExpensesListProps) {
  const [activeEdit, setActiveEdit] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    if (activeEdit === id) return setActiveEdit(null);

    setActiveEdit(id);
  };

  const handleUpdate = async (
    id: string,
    data: ExpenseUpdateFormData,
    expense: Expense,
  ) => {
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
            {dailyExpenses.transactions.map((expense) => (
              <Fragment key={expense.id}>
                <ExpenseItem
                  expense={expense}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                <UpdateExpenseForm
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
