import { BadgeDollarSign } from "lucide-react";

export function ExpensesHeader() {
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
      <div className="flex gap-2">
        <button>Nuevo</button>
        <button>Reset</button>
      </div>
    </header>
  );
}
