import { PenLine, X } from "lucide-react";
import { getDateNTime } from "../../../lib/dates";
import {
  useState,
  type ChangeEventHandler,
  type SubmitEventHandler,
} from "react";
import type { FormData } from "../types";
import { cleanCurrency, formatCurrency } from "../../../lib/formatter";
import toast from "react-hot-toast";

export function MoneyLogForm({
  cancelForm,
  activeForm,
  logMoney,
}: {
  cancelForm: () => void;
  activeForm: boolean;
  logMoney: (data: FormData) => Promise<boolean>;
}) {
  const [formData, setFormData] = useState<FormData>({
    date: Date.now(),
    cash: 0,
    account: 0,
    payments: 0,
  });
  const styles = {
    container: "grid grid-cols-2 items-center",
    label: "text-stone-600",
    input: "bg-white rounded-lg p-1",
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const created = await logMoney(formData);
    if (!created) return toast.error("Error al registrar");

    toast.success("Registro creado correctamente");
    setFormData({ date: Date.now(), cash: 0, account: 0, payments: 0 });
    cancelForm();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value, inputMode } = e.target;
    if (inputMode === "numeric")
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
        <h1 className="font-bold">{`Corte: ${getDateNTime(formData.date)}`}</h1>
        <div className={styles.container}>
          <label htmlFor="cash" className={styles.label}>
            Dinero en efectivo:
          </label>
          <input
            id="cash"
            type="text"
            inputMode="numeric"
            className={styles.input}
            name="cash"
            value={formatCurrency(formData.cash)}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="account" className={styles.label}>
            Dinero en cuenta:
          </label>
          <input
            id="account"
            type="text"
            inputMode="numeric"
            className={styles.input}
            name="account"
            value={formatCurrency(formData.account)}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="payments" className={styles.label}>
            Pagos pendientes:
          </label>
          <input
            id="payments"
            type="text"
            inputMode="numeric"
            className={styles.input}
            name="payments"
            value={formatCurrency(formData.payments)}
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
