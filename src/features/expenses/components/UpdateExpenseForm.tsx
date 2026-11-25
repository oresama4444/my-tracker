import type { ExpenseUpdateFormData, UpdateExpenseFormProps } from "../types";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";
import { CategoriesSelector } from "../../categories/components/CategoriesSelector";
import { useExpensesContext } from "../context/ExpensesContext";
import { cleanDatetimeInput, formatDatetimeInput } from "../../../lib/dates";

export function UpdateExpenseForm({
  expense,
  handleUpdate,
}: UpdateExpenseFormProps) {
  const { expenseCategories, getCategoryName } = useExpensesContext();
  const [updateFormData, setUpdateFormData] = useState<ExpenseUpdateFormData>({
    date: expense.date,
    amount: expense.amount,
    description: expense.description,
    location: expense.location ? expense.location : "",
    category_id: expense.category_id ? expense.category_id : "",
    // subcategory: expense.subcategory ? expense.subcategory : "",
  });
  const styles = {
    container: "flex flex-col gap-1",
    label: "text-sm text-stone-700",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-100 rounded-md p-2",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  const handleEditChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === "date")
      return setUpdateFormData((prev) => ({
        ...prev,
        [name]: cleanDatetimeInput(value),
      }));
    if (name === "amount")
      return setUpdateFormData((prev) => ({
        ...prev,
        [name]: cleanCurrency(value),
      }));

    setUpdateFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    handleUpdate(expense.id, updateFormData, expense);
  };

  return (
    <form
      id={`expense-form-${expense.id}`}
      className="grid grid-cols-6 gap-4 px-6 py-2"
      onSubmit={handleSubmit}
    >
      <div className={`${styles.container} col-span-3`}>
        <label htmlFor={`date-${expense.id}`} className={styles.label}>
          Fecha:
        </label>
        <input
          type="datetime-local"
          id={`date-${expense.id}`}
          name="date"
          value={formatDatetimeInput(updateFormData.date)}
          className={styles.input}
          onChange={handleEditChange}
        />
      </div>
      <div className={`${styles.container} col-span-3`}>
        <span className={styles.label}>Categoría:</span>
        <CategoriesSelector
          categories={expenseCategories}
          categoryId={updateFormData.category_id}
          getCategoryName={getCategoryName}
          handleChange={handleEditChange}
          inputId={updateFormData.category_id}
        />
      </div>
      <div className={`${styles.container} col-span-2`}>
        <label htmlFor={`amount-${expense.id}`} className={styles.label}>
          Monto:
        </label>
        <input
          id={`amount-${expense.id}`}
          name="amount"
          value={formatCurrency(updateFormData.amount)}
          className={styles.input}
          onChange={handleEditChange}
        />
      </div>
      <div className={`${styles.container} col-span-2`}>
        <label htmlFor={`description-${expense.id}`} className={styles.label}>
          Descripción:
        </label>
        <input
          id={`description-${expense.id}`}
          name="description"
          value={updateFormData.description}
          className={styles.input}
          onChange={handleEditChange}
        />
      </div>
      <div className={`${styles.container} col-span-2`}>
        <label htmlFor={`location-${expense.id}`} className={styles.label}>
          Ubicación:
        </label>
        <input
          id={`location-${expense.id}`}
          name="location"
          value={updateFormData.location}
          className={styles.input}
          onChange={handleEditChange}
        />
      </div>
    </form>
  );
}
