import { useState } from "react";
import type { SavingsHeaderProps } from "../types";
import { NewSavingCategoryForm } from "./NewSavingCategoryForm";
import { Landmark, Plus } from "lucide-react";

export function SavingsHeader({ add }: SavingsHeaderProps) {
  const [activeForm, setActiveForm] = useState<boolean>(false);

  return (
    <header className="mx-auto p-2 flex items-center gap-4 max-w-4xl">
      <div className="p-2.5 rounded-2xl bg-emerald-500 text-stone-50">
        <Landmark />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-semibold text-stone-800">
          Ahorros y metas
        </h1>
        <p className="text-sm text-stone-500">Tus metas de ahorro y progreso</p>
      </div>
      <div className="flex gap-4">
        {/* <button className="flex items-center gap-0.5 cursor-pointer rounded py-1 px-2 transition-all duration-100 hover:bg-stone-100">
            Reset
          </button> */}
        <button
          className="flex items-center gap-1 cursor-pointer rounded py-1 px-2 transition-all duration-100 bg-emerald-400 hover:bg-emerald-300 text-sm font-medium"
          onClick={() => setActiveForm(true)}
        >
          Nueva Meta
          <Plus size={18} />
        </button>
      </div>
      <div
        className={`${activeForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} min-h-screen min-w-full absolute top-0 left-0 z-30 flex items-center justify-center transition-all duration-400`}
      >
        <NewSavingCategoryForm
          cancelForm={() => setActiveForm(false)}
          add={add}
        />
      </div>
    </header>
  );
}
