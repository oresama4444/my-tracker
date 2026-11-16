import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import { cleanDatetimeInput, formatDatetimeInput } from "../../../lib/dates";
import {
  capitalizeWord,
  cleanCurrency,
  formatCurrency,
} from "../../../lib/formatter";
import type { NewExpenseFormData } from "../types";
import { useExpensesContext } from "../context/ExpensesContext";
import toast from "react-hot-toast";
import { ChevronDown } from "lucide-react";

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
  const [activeCategoryMenu, setActiveCategoryMenu] = useState<boolean>(false);

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
        <div
          onClick={() => setActiveCategoryMenu((prev) => !prev)}
          className={`${styles.input} flex justify-end items-center gap-1 cursor-pointer relative`}
        >
          <p>
            {formData.category_id
              ? capitalizeWord(getCategoryName(formData.category_id))
              : "General"}
          </p>
          <ChevronDown />
          <div
            className={`${activeCategoryMenu ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} absolute min-w-60 top-full mt-1 p-2 rounded-lg bg-stone-400/80 text-stone-100 flex flex-col gap-1 items-end z-20 cursor-auto transition-all duration-300`}
          >
            <div className="w-full">
              <label
                onClick={() => setActiveCategoryMenu(false)}
                htmlFor="general"
                className="hover:bg-stone-500/80 cursor-pointer flex gap-1 items-center justify-end rounded p-1 transition-all duration-200"
              >
                General
              </label>
              <input
                type="radio"
                name="category_id"
                id="general"
                value=""
                onChange={handleChange}
                defaultChecked
                className="hidden"
              />
            </div>
            {expenseCategories?.map((category) => (
              <div key={category.id} className="w-full">
                <label
                  onClick={() => setActiveCategoryMenu(false)}
                  htmlFor={category.id}
                  className="hover:bg-stone-500/80 cursor-pointer flex gap-1 items-center justify-end rounded p-1 transition-all duration-200"
                >
                  {capitalizeWord(category.name)}
                </label>
                <input
                  type="radio"
                  name="category_id"
                  id={category.id}
                  value={category.id}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
