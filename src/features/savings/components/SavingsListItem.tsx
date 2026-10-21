import type { SavingsListItemProps } from "../types";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { getLongDate } from "../../../lib/dates";
import { ArrowDownToLine, ArrowUpFromLine, Pencil, Trash2 } from "lucide-react";

export function SavingsListItem({
  saving,
  handleDelete,
}: SavingsListItemProps) {
  const calculateAmount = (amount: number, activity: string): string => {
    if (activity === "withdraw") return formatCurrency(amount * -1);
    return formatCurrency(amount);
  };

  return (
    <div className="border-t border-t-stone-300 px-4 py-2">
      <div className="flex justify-between items-center gap-2">
        <div>
          {saving.activity === "deposit" && (
            <ArrowDownToLine
              size={32}
              className="rounded-xl p-2 bg-green-700/10 text-green-700"
            />
          )}
          {saving.activity === "withdraw" && (
            <ArrowUpFromLine
              size={32}
              className="rounded-xl p-2 bg-red-700/10 text-red-700"
            />
          )}
        </div>
        <div className="flex-1">
          <h4 className="text-sm text-stone-600">
            {capitalizeWord(saving.description)}
          </h4>
          <span className="flex items-center text-xs text-stone-400">
            <p>{getLongDate(saving.date)}</p>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <p
            className={`font-mono text-sm ${saving.activity === "deposit" && "text-green-700"} ${saving.activity === "withdraw" && "text-red-700"}`}
          >
            {calculateAmount(saving.amount, saving.activity)}
          </p>
          <Pencil size={18} onClick={() => {}} />
          <Trash2
            onClick={() => handleDelete(saving.id)}
            size={18}
            color="red"
            className="cursor-pointer"
          />
        </div>
      </div>
      <div>{/* <UpdateSavingForm /> */}</div>
    </div>
  );
}
