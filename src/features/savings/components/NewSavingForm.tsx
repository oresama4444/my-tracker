import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { NewSavingFormData, NewSavingFormProps } from "../types";
import { cleanDatetimeInput, formatDatetimeInput } from "../../../lib/dates";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronDown,
  PenLine,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

export function NewSavingForm({
  categoryId,
  add,
  cancelForm,
}: NewSavingFormProps) {
  const [formData, setFormData] = useState<NewSavingFormData>({
    date: Date.now(),
    amount: 0,
    description: "",
    activity: "deposit",
    category_id: categoryId,
  });
  const [activeActivityMenu, setActiveActivityMenu] = useState<boolean>(false);

  const styles = {
    container: "grid grid-cols-2 items-center",
    label: "text-sm text-stone-700",
    input:
      "text-sm text-stone-600 border border-stone-300 bg-stone-50 rounded-md p-0.5",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (name.includes("date"))
      return setFormData((prev) => ({
        ...prev,
        date: cleanDatetimeInput(value),
      }));
    if (name.includes("amount"))
      return setFormData((prev) => ({ ...prev, amount: cleanCurrency(value) }));
    if (name.includes("activity"))
      return setFormData((prev) => ({ ...prev, activity: value }));

    if (name.includes("description"))
      return setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const created = await add(formData);
    if (!created) return toast.error("Error al agregar entrada");

    toast.success("Entrada creada correctamente");
    setFormData({
      date: Date.now(),
      amount: 0,
      description: "",
      activity: "deposit",
      category_id: "",
    });
    cancelForm();
  };

  return (
    <>
      <form
        id={`new-saving-${categoryId}`}
        className="grid grid-cols-2 gap-y-2 gap-x-18 max-w-5/6 mx-auto"
        onSubmit={handleSubmit}
      >
        <div className={styles.container}>
          <label htmlFor={`date-${categoryId}`} className={styles.label}>
            Fecha:
          </label>
          <input
            type="datetime-local"
            id={`date-${categoryId}`}
            name={`date-${categoryId}`}
            value={formatDatetimeInput(formData.date)}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor={`amount-${categoryId}`} className={styles.label}>
            Monto:
          </label>
          <input
            type="text"
            id={`amount-${categoryId}`}
            name={`amount-${categoryId}`}
            value={formatCurrency(formData.amount)}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor={`description-${categoryId}`} className={styles.label}>
            Descripción:
          </label>
          <input
            type="text"
            id={`description-${categoryId}`}
            name={`description-${categoryId}`}
            value={formData.description}
            className={styles.input}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <span className={styles.label}>Movimiento:</span>
          <div
            className="text-sm text-stone-600 bg-stone-100 rounded-md p-0.5 flex items-center gap-1 justify-end cursor-pointer relative"
            onClick={() => setActiveActivityMenu((prev) => !prev)}
          >
            {formData.activity === "deposit" && (
              <>
                <p>Depósito</p>
                <ArrowDownToLine size={18} color="green" />
              </>
            )}
            {formData.activity === "withdraw" && (
              <>
                <p>Retiro</p>
                <ArrowUpFromLine size={16} color="red" />
              </>
            )}
            <ChevronDown />
            <div
              className={`${activeActivityMenu ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} flex flex-col gap-1 absolute w-full top-full mt-1 bg-stone-300/80 rounded-lg p-1 cursor-auto transition-all duration-200`}
            >
              <div className="w-full">
                <label
                  htmlFor={`deposit-${categoryId}`}
                  onClick={() => setActiveActivityMenu(false)}
                  className="flex cursor-pointer gap-1 items-center justify-end hover:bg-stone-400 hover:text-stone-200 rounded transition-all duration-200"
                >
                  <p>Depósito</p>
                  <ArrowDownToLine size={18} color="green" />
                </label>
                <input
                  type="radio"
                  id={`deposit-${categoryId}`}
                  name={`activity-${categoryId}`}
                  value="deposit"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor={`withdraw-${categoryId}`}
                  onClick={() => setActiveActivityMenu(false)}
                  className="flex cursor-pointer gap-1 items-center justify-end hover:bg-stone-400 hover:text-stone-200 rounded transition-all duration-200"
                >
                  <p>Retiro</p>
                  <ArrowUpFromLine size={16} color="red" />
                </label>
                <input
                  type="radio"
                  id={`withdraw-${categoryId}`}
                  name={`activity-${categoryId}`}
                  value="withdraw"
                  className="hidden"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="px-6 pt-4 flex justify-end gap-4">
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
          form={`new-saving-${categoryId}`}
          className={`${styles.button} bg-emerald-500 hover:bg-emerald-400`}
        >
          <PenLine size={16} />
          Registrar
        </button>
      </div>
    </>
  );
}
