import { BadgeDollarSign, PenLine, Plus, X } from "lucide-react";
import { useState } from "react";
import { NewExpenseForm } from "./NewExpenseForm";
import { useExpensesContext } from "../context/ExpensesContext";

export function ExpensesHeader() {
  const { add } = useExpensesContext();
  const [activeForm, setActiveForm] = useState<boolean>(false);

  const styles = {
    button:
      "flex items-center gap-1 text-sm cursor-pointer rounded py-1 px-2 transition-all duration-100",
  };

  return (
    <header className="mx-auto p-2 flex items-center gap-4 max-w-4xl">
      <div className="p-2.5 rounded-2xl bg-emerald-500 text-stone-50">
        <BadgeDollarSign />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-stone-800">
          Gastos diarios
        </h1>
        <p className="text-sm text-stone-500">Gestiona tus gastos diarios</p>
      </div>
      <div className="flex gap-4">
        {/* <button className="flex items-center gap-0.5 cursor-pointer rounded py-1 px-2 transition-all duration-100 hover:bg-stone-100">
            Reset
          </button> */}
        <button
          className="flex items-center gap-1 cursor-pointer rounded py-1 px-2 transition-all duration-100 bg-emerald-400 hover:bg-emerald-300 text-sm font-medium"
          onClick={() => setActiveForm(true)}
        >
          Registrar Gasto
          <Plus size={18} />
        </button>
      </div>
      <div
        className={`${activeForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} max-h-screen min-w-full overflow-hidden absolute inset-0 z-10 flex items-center justify-center transition-all duration-400`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-xs"></div>
        <div className="z-10 w-full max-w-md rounded-2xl bg-stone-50 p-6 shadow-xl">
          <h1>Nuevo gasto</h1>
          <NewExpenseForm add={add} cancelForm={() => setActiveForm(false)} />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className={`${styles.button} hover:bg-red-200`}
              onClick={() => setActiveForm(false)}
            >
              <X size={16} />
              Cancelar
            </button>
            <button
              form="new-expense"
              type="submit"
              className={`${styles.button} bg-emerald-500 hover:bg-emerald-400`}
            >
              <PenLine size={16} />
              Registrar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
