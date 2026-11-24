import type { ExpenseItemProps } from "../types";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { Dot, Pencil, Trash } from "lucide-react";
import { getDateNTime } from "../../../lib/dates";
import { useExpensesContext } from "../context/ExpensesContext";

export function ExpenseItem({
  expense,
  handleEdit,
  handleDelete,
}: ExpenseItemProps) {
  const { getCategoryName } = useExpensesContext();

  return (
    <div
      key={expense.id}
      className="flex gap-0 items-center px-6 py-2 border-t border-t-stone-200 bg-stone-5 0 rounded-xl"
    >
      <div>
        <Dot size={44} color="green" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3>{expense.description && capitalizeWord(expense.description)}</h3>
          <p className="text-stone-400 text-xs">{getDateNTime(expense.date)}</p>
        </div>
        <div className="flex items-center text-xs text-stone-500">
          {expense.category_id && <p>{getCategoryName(expense.category_id)}</p>}
          {expense.subcategory && (
            <>
              <Dot />
              <p>{expense.subcategory}</p>
            </>
          )}
          {expense.account && (
            <div>
              <p>{expense.account}</p>
            </div>
          )}
        </div>
      </div>
      <div className="px-4">
        <p className="text-sm font-mono">{formatCurrency(expense.amount)}</p>
      </div>
      <div className="flex gap-4">
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
