import { BanknoteCheck, Pencil, Tag, Trash } from "lucide-react";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { getDateNTime } from "../../../lib/dates";
import type { Income } from "../types";

interface IncomeItemProps {
  income: Income;
  handleDelete: (id: string) => void;
}

export function IncomeItem({ income, handleDelete }: IncomeItemProps) {
  return (
    <div
      key={income.id}
      className="flex gap-6 items-center px-6 py-2 border-b border-stone-300 bg-stone-50"
    >
      <div className="bg-emerald-200 text-emerald-700 rounded-4xl p-2">
        <BanknoteCheck />
      </div>
      <div className="flex-1">
        <div className="flex gap-2">
          <h3>{income.description && capitalizeWord(income.description)}</h3>
          {income.category && (
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-600 rounded-4xl py-1 px-2">
              <Tag size={14} />
              {capitalizeWord(income.category)}
            </span>
          )}
        </div>
        <div className="flex items-center text-xs text-stone-500">
          <p>{`Agregado: ${getDateNTime(income.date, "short")}`}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-mono text-green-700">
          {formatCurrency(income.amount)}
        </p>
      </div>
      <div className="flex gap-3">
        <button
          // onClick={() => handleEdit(income.id)}
          className="cursor-pointer text-stone-400"
        >
          <Pencil size={16} />
        </button>
        <button
          className="text-red-400 cursor-pointer"
          onClick={() => handleDelete(income.id)}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  );
}
