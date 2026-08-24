import { Check, X } from "lucide-react";
import type { Expense } from "../types";

export function ExpenseForm({
  expense,
  cancelEdit,
  isActive,
}: {
  expense: Expense;
  cancelEdit: () => void;
  isActive: boolean;
}) {
  const styles = {
    container: "flex flex-col gap-1",
    label: "text-sm text-stone-700",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-50 rounded-md p-0.5",
  };

  return (
    <div
      key={expense.id}
      className={`${isActive ? "max-h-96 opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"} transition-all duration-200`}
    >
      <form className="grid grid-cols-3 gap-4 px-6 py-2 ">
        <div className={styles.container}>
          <label htmlFor="amount" className={styles.label}>
            Monto
          </label>
          <input id="amount" value={expense.amount} className={styles.input} />
        </div>
        <div className={styles.container}>
          <label htmlFor="description" className={styles.label}>
            Descripción
          </label>
          <input
            id="description"
            value={expense.description}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="location" className={styles.label}>
            Ubicación
          </label>
          <input
            id="location"
            value={expense.location}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="category" className={styles.label}>
            Categoría
          </label>
          <input
            id="category"
            value={expense.category}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="subcategory" className={styles.label}>
            Subcategoría
          </label>
          <input
            id="subcategory"
            value={expense.subcategory}
            className={styles.input}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="account" className={styles.label}>
            Cuenta
          </label>
          <input
            id="account"
            value={expense.account}
            className={styles.input}
          />
        </div>
      </form>
      <div className="px-6 py-4 flex justify-end gap-4">
        <button
          className="flex items-center text-sm cursor-pointer"
          onClick={cancelEdit}
        >
          <X size={18} />
          Cancelar
        </button>
        <button className="flex items-center text-sm cursor-pointer">
          <Check size={18} />
          Guardar
        </button>
      </div>
    </div>
  );
}
