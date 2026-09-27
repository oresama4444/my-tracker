import { Check, X } from "lucide-react";
import type { ExpenseUpdateFormData, UpdateExpenseFormProps } from "../types";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";

export function UpdateExpenseForm({
  expense,
  cancelEdit,
  isActive,
  handleUpdate,
}: UpdateExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseUpdateFormData>({
    amount: expense.amount,
    description: expense.description,
    location: expense.location ? expense.location : "",
    category: expense.category ? expense.category : "",
    subcategory: expense.subcategory ? expense.subcategory : "",
    account: expense.account ? expense.account : "",
  });
  const styles = {
    container: "flex flex-col gap-1",
    label: "text-sm text-stone-700",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-50 rounded-md p-0.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    handleUpdate(expense.id, formData, expense);
  };

  return (
    <div
      key={expense.id}
      className={`${isActive ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} transition-all duration-200 overflow-hidden bg-stone-50 rounded-xl`}
    >
      <form
        id="expense-form"
        className="grid grid-cols-3 gap-4 px-6 py-2 "
        onSubmit={handleSubmit}
      >
        <div className={styles.container}>
          <label htmlFor="amount" className={styles.label}>
            Monto
          </label>
          <input
            id="amount"
            name="amount"
            value={formData.amount}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="description" className={styles.label}>
            Descripción
          </label>
          <input
            id="description"
            name="description"
            value={formData.description}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="location" className={styles.label}>
            Ubicación
          </label>
          <input
            id="location"
            name="location"
            value={formData.location}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="category" className={styles.label}>
            Categoría
          </label>
          <input
            id="category"
            name="category"
            value={formData.category}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="subcategory" className={styles.label}>
            Subcategoría
          </label>
          <input
            id="subcategory"
            name="subcategory"
            value={formData.subcategory}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="account" className={styles.label}>
            Cuenta
          </label>
          <input
            id="account"
            name="account"
            value={formData.account}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
      </form>
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
          form="expense-form"
        >
          <Check size={18} />
          Guardar
        </button>
      </div>
    </div>
  );
}
