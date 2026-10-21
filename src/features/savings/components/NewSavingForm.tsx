import { useState } from "react";
import type { NewSavingFormProps } from "../types";
import { formatDatetimeInput } from "../../../lib/dates";
import { formatCurrency } from "../../../lib/formatter";
import { ArrowDownToLine, ArrowUpFromLine, ChevronDown } from "lucide-react";

export function NewSavingForm({
  formData,
  handleChange,
  handleSubmit,
  styles,
  formId,
}: NewSavingFormProps) {
  const [activeActivityMenu, setActiveActivityMenu] = useState<boolean>(false);

  const id = crypto.randomUUID();

  return (
    <form id={formId} className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor={`date-${id}`} className={styles.label}>
          Fecha:
        </label>
        <input
          type="datetime-local"
          id={`date-${id}`}
          name={`date-${id}`}
          value={formatDatetimeInput(formData.date)}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={`amount-${id}`} className={styles.label}>
          Monto:
        </label>
        <input
          type="text"
          id={`amount-${id}`}
          name={`amount-${id}`}
          value={formatCurrency(formData.amount)}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor={`description-${id}`} className={styles.label}>
          Descripción:
        </label>
        <input
          type="text"
          id={`description-${id}`}
          name={`description-${id}`}
          value={formData.description}
          className={styles.input}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.label}>Movimiento:</span>
        <div
          className="text-sm text-stone-600 border border-stone-300 bg-stone-100 rounded-md p-1 flex items-center gap-1 justify-end cursor-pointer relative"
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
                htmlFor={`deposit-${id}`}
                onClick={() => setActiveActivityMenu(false)}
                className="flex cursor-pointer gap-1 items-center justify-end hover:bg-stone-400 hover:text-stone-200 rounded transition-all duration-200"
              >
                <p>Depósito</p>
                <ArrowDownToLine size={18} color="green" />
              </label>
              <input
                type="radio"
                id={`deposit-${id}`}
                name={`activity-${id}`}
                value="deposit"
                className="hidden"
                onChange={handleChange}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor={`withdraw-${id}`}
                onClick={() => setActiveActivityMenu(false)}
                className="flex cursor-pointer gap-1 items-center justify-end hover:bg-stone-400 hover:text-stone-200 rounded transition-all duration-200"
              >
                <p>Retiro</p>
                <ArrowUpFromLine size={16} color="red" />
              </label>
              <input
                type="radio"
                id={`withdraw-${id}`}
                name={`activity-${id}`}
                value="withdraw"
                className="hidden"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
