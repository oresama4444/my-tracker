import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { cleanDatetimeInput, formatDatetimeInput } from "../../../lib/dates";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";
import type { NewExpenseFormData } from "../types";
import { useExpensesContext } from "../context/ExpensesContext";
import toast from "react-hot-toast";
import { CategoriesSelector } from "../../categories/components/CategoriesSelector";

interface NewExpenseFormProps {
  add: (data: NewExpenseFormData) => Promise<boolean>;
  cancelForm: () => void;
}

export function NewExpenseForm({ add, cancelForm }: NewExpenseFormProps) {
  const { expenseCategories, getCategoryName } = useExpensesContext();
  const [formData, setFormData] = useState<NewExpenseFormData>({
    date: Date.now(),
    amount: 0,
    description: "",
    category_id: "",
  });
  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const created = await add(formData);
    if (!created) return toast.error("Error al agregar el gasto");

    toast.success("Gasto registrado correctamente");
    setFormData({
      date: Date.now(),
      amount: 0,
      description: "",
      category_id: "",
    });
    cancelForm();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === "date")
      return setFormData((prev) => ({
        ...prev,
        [name]: cleanDatetimeInput(value),
      }));
    if (name === "amount")
      return setFormData((prev) => ({ ...prev, [name]: cleanCurrency(value) }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const styles = {
    container: "grid grid-cols-1 items-center",
    label: "text-xs text-stone-500",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-100 rounded-md p-1.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  return (
    <form
      id="new-expense"
      onSubmit={handleSubmit}
      className="grid grid-cols-2 gap-2 py-3"
    >
      <div className={styles.container}>
        <label htmlFor="amount" className={styles.label}>
          Fecha:
        </label>
        <input
          type="datetime-local"
          id="date"
          name="date"
          value={formatDatetimeInput(formData.date)}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.container}>
        <label htmlFor="amount" className={styles.label}>
          Monto:
        </label>
        <input
          type="text"
          inputMode="numeric"
          id="amount"
          name="amount"
          value={formatCurrency(formData.amount)}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.container} col-span-2`}>
        <label htmlFor="description" className={styles.label}>
          Descripción:
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={`${styles.container} col-span-2`}>
        <span className={styles.label}>Categoría:</span>
        <CategoriesSelector
          categories={expenseCategories}
          categoryId={formData.category_id}
          handleChange={handleChange}
          getCategoryName={getCategoryName}
        />
      </div>
    </form>
  );
}
