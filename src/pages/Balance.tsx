import { Plus, WalletMinimal } from "lucide-react";
import { useState } from "react";
import { MoneyLogForm } from "../features/balance/components/MoneyLogForm";

export function Balance() {
  const [activeForm, setActiveForm] = useState<boolean>(false);

  return (
    <div>
      <header className="mx-auto p-2 flex items-center gap-4 max-w-4xl">
        <div className="p-2.5 rounded-2xl bg-emerald-500 text-stone-50">
          <WalletMinimal />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-stone-800">Balance</h1>
          <p className="text-sm text-stone-500">Tu dinero disponible</p>
        </div>
        <div className="flex gap-4">
          {/* <button className="flex items-center gap-0.5 cursor-pointer rounded py-1 px-2 transition-all duration-100 hover:bg-stone-100">
            Reset
          </button> */}
          <button
            className="flex items-center gap-1 cursor-pointer rounded py-1 px-2 transition-all duration-100 bg-emerald-400 hover:bg-emerald-300 text-sm font-medium"
            onClick={() => setActiveForm(true)}
          >
            Nuevo Corte
            <Plus size={18} />
          </button>
        </div>
        <MoneyLogForm
          cancelForm={() => setActiveForm(false)}
          activeForm={activeForm}
        />
      </header>
    </div>
  );
}
