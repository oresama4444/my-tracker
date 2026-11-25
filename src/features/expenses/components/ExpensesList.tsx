import { Fragment, useState } from "react";
import type { Expense, ExpenseUpdateFormData } from "../types";
import { getLongDate } from "../../../lib/dates";
import { UpdateExpenseForm } from "./UpdateExpenseForm";
import { ExpenseItem } from "./ExpenseItem";
import { Check, Dot, X } from "lucide-react";
import toast from "react-hot-toast";
import { useExpensesContext } from "../context/ExpensesContext";

export function ExpensesList() {
  const { expensesByDay, update, remove } = useExpensesContext();
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

  const styles = {
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

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
            <div className="text-sm font-bold font-mono">{`$${dailyExpenses.meta.total}`}</div>
          </div>
          <div>
            {dailyExpenses.transactions.map((expense) => (
              <Fragment key={expense.id}>
                <ExpenseItem
                  expense={expense}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
                <div
                  className={`${expense.id === activeEdit ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} transition-all duration-200 bg-stone-50 rounded-xl`}
                >
                  <UpdateExpenseForm
                    expense={expense}
                    handleUpdate={handleUpdate}
                  />
                  <div className="px-6 py-4 flex justify-end gap-4">
                    <button
                      className={`${styles.button} hover:bg-stone-100`}
                      onClick={cancelEdit}
                    >
                      <X size={18} />
                      Cancelar
                    </button>
                    <button
                      className={`${styles.button} bg-emerald-400 hover:bg-emerald-300`}
                      form={`expense-form-${expense.id}`}
                    >
                      <Check size={18} />
                      Guardar
                    </button>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
