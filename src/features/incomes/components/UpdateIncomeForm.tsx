// import type { Income, UpdateIncomeFormData } from "../types";

import { Check, X } from "lucide-react";
import { useState, type ChangeEventHandler } from "react";
import type { Income, UpdateIncomeFormData } from "../types";
import { cleanDatetimeInput, formatDatetimeInput } from "../../../lib/dates";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";

interface UpdateIncomeFormProps {
  income: Income;
  //   handleUpdate: (
  //     id: string,
  //     data: UpdateIncomeFormData,
  //     income: Income,
  //   ) => void;
  cancelEdit: () => void;
  isActive: boolean;
}

export function UpdateIncomeForm({
  income,
  //   handleUpdate,
  cancelEdit,
  isActive,
}: UpdateIncomeFormProps) {
  const [formData, setFormData] = useState<UpdateIncomeFormData>({
    date: income.date ? income.date : Date.now(),
    amount: income.amount ? income.amount : 0,
    description: income.description ? income.description : "",
    category: income.category ? income.category : "",
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name === "date")
      return setFormData((prev) => ({
        ...prev,
        [name]: cleanDatetimeInput(value),
      }));
    if (name === "amount")
      return setFormData((prev) => ({
        ...prev,
        [name]: cleanCurrency(value),
      }));

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const styles = {
    container: "flex flex-col gap-1",
    label: "text-sm text-stone-700",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-50 rounded-md p-0.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  return (
    <div
      className={`${isActive ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} transition-all duration-200 overflow-hidden bg-stone-50 rounded-xl`}
    >
      <form
        id="expense-form"
        className="grid grid-cols-2 gap-4 px-6 py-2 "
        // onSubmit={handleSubmit}
      >
        <div className={styles.container}>
          <label htmlFor="date" className={styles.label}>
            Fecha
          </label>
          <input
            id="date"
            name="date"
            type="datetime-local"
            value={formatDatetimeInput(formData.date)}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="amount" className={styles.label}>
            Monto
          </label>
          <input
            id="amount"
            name="amount"
            type="text"
            inputMode="numeric"
            value={formatCurrency(formData.amount)}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="description" className={styles.label}>
            Descripción
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="category" className={styles.label}>
            Categoría
          </label>
          <input
            id="category"
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
      </form>
      <div className="px-6 py-4 flex justify-end gap-4">
        <button
          onClick={cancelEdit}
          className={`${styles.button} hover:bg-stone-100`}
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
