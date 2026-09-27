import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { NewIncomeFormData, NewIncomeFormProps } from "../types";
import { cleanDatetimeInput, formatDatetimeInput } from "../../../lib/dates";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";
import { PenLine, X } from "lucide-react";
import toast from "react-hot-toast";

export function NewIncomeForm({
  cancelForm,
  activeForm,
  addIncome,
}: NewIncomeFormProps) {
  const [formData, setFormData] = useState<NewIncomeFormData>({
    date: Date.now(),
    amount: 0,
    description: "",
    category: "",
  });
  const styles = {
    container: "grid grid-cols-2 items-center",
    label: "text-sm text-stone-700",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-50 rounded-md p-0.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const created = await addIncome(formData);
    if (!created) return toast.error("Error al agregar ingreso");

    toast.success("Registro creado correctamente");
    setFormData({ date: Date.now(), amount: 0, description: "", category: "" });
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

  return (
    <div
      className={`${activeForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} min-h-screen min-w-full overflow-hidden absolute top-0 left-0 z-10 flex items-center justify-center bg-stone-900/30 transition-all duration-400`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-emerald-100 p-6 flex flex-col gap-4 rounded-2xl"
      >
        <h1>Nuevo ingreso</h1>
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
            id="amount"
            name="amount"
            value={formatCurrency(formData.amount)}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
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
        <div className={styles.container}>
          <label htmlFor="category" className={styles.label}>
            Categoría:
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className={`${styles.button} hover:bg-red-200`}
            onClick={cancelForm}
          >
            <X size={16} />
            Cancelar
          </button>
          <button
            type="submit"
            className={`${styles.button} bg-emerald-500 hover:bg-emerald-400`}
          >
            <PenLine size={16} />
            Registrar
          </button>
        </div>
      </form>
    </div>
  );
}
