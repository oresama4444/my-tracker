import { Dot, Pencil, Trash } from "lucide-react";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import type { Expense } from "../types";

export function ExpenseItem({
  expense,
  handleEdit,
  handleDelete,
}: {
  expense: Expense;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}) {
  return (
    <div
      key={expense.id}
      className="flex gap-8 items-center px-6 py-2 border-t border-t-stone-200"
    >
      <div className="flex-1">
        <h3>{expense.description && capitalizeWord(expense.description)}</h3>
        <div className="flex items-center text-xs text-stone-500">
          <p>{expense.category}</p>
          <Dot />
          <p>{expense.subcategory}</p>
        </div>
      </div>
      <div>
        <p className="text-sm">{formatCurrency(expense.amount)}</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handleEdit(expense.id)}
          className="cursor-pointer"
        >
          <Pencil size={18} />
        </button>
        <button
          className="text-red-400 cursor-pointer"
          onClick={() => handleDelete(expense.id)}
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}
