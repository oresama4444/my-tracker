import type { SavingCategory } from "../types";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { getLongDate } from "../../../lib/dates";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Dot,
  Pencil,
  PiggyBank,
  PlusCircle,
  Trash2,
} from "lucide-react";

export function SavingsList({
  savingsByCategory,
}: {
  savingsByCategory: SavingCategory[];
}) {
  const calculatePercentage = (
    total: number | undefined,
    progress: number | undefined,
  ): number =>
    total !== undefined && progress !== undefined
      ? Math.min((progress / total) * 100, 100)
      : 0;

  const calculateToGo = (
    total: number | undefined,
    progress: number | undefined,
  ): string =>
    total !== undefined && progress !== undefined
      ? formatCurrency(Math.max(total - progress, 0))
      : formatCurrency(0);

  const calculateAmount = (amount: number, activity: string): string => {
    if (activity === "withdraw") return formatCurrency(amount * -1);
    return formatCurrency(amount);
  };

  return (
    <section className="mx-auto flex flex-col items-center max-w-4xl border border-stone-300 rounded-2xl">
      {savingsByCategory?.map(({ id, category, transactions, meta }) => (
        <div key={id} className="w-full">
          <div className="flex justify-between p-4">
            <div className="flex items-center">
              <PiggyBank
                size={36}
                className="rounded-4xl p-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${category?.color} 25%, white)`,
                  color: `color-mix(in srgb, ${category?.color} 70%, black)`,
                }}
              />
            </div>
            <div className="flex-1 px-4">
              <h2 className="text-lg font-bold text-stone-700">
                {capitalizeWord(category?.name)}
              </h2>
              <p className="text-xs text-stone-400">{category?.description}</p>
            </div>
            <div className="flex items-center text-stone-500">
              <button className="flex items-center gap-1 text-sm cursor-pointer rounded-lg py-1 px-2 transition-all duration-100 hover:bg-emerald-300 hover:text-stone-800">
                <PlusCircle size={16} />
                Agregar
              </button>
            </div>
          </div>
          <div className="px-4">
            <div className="text-xl font-bold font-mono text-stone-700">
              {formatCurrency(meta.total)}
            </div>
            <div className="pt-1 pb-2">
              <div className="flex justify-between items-center text-sm text-stone-500">
                <div className="font-mono">{`${formatCurrency(meta.total)} de ${formatCurrency(category?.target)}`}</div>
                <div>{`${calculatePercentage(category?.target, meta.total)}% guardado`}</div>
              </div>
              <div className="w-full py-1">
                <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${calculatePercentage(category?.target, meta.total)}%`,
                      backgroundColor: `${category?.color}`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-4 py-2 border-t-stone-300 border-t hover:bg-stone-100 cursor-pointer transition-all duration-100 rounded-b-2xl">
            <div className="flex items-center">
              <h3 className="text-sm text-stone-600">Movimientos</h3>
              <Dot />
              <p className="text-xs text-stone-400">{`${meta.count} entradas`}</p>
            </div>
            <div className="text-sm text-stone-500 flex gap-1 items-center">
              <p className="font-mono">{`${calculateToGo(category?.target, meta.total)}`}</p>
              <p>pendiente</p>
            </div>
          </div>
          <div className="flex flex-col">
            {transactions.map((saving) => (
              <div
                key={saving.id}
                className="flex justify-between items-center gap-2 border-t border-t-stone-300 px-4 py-2"
              >
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
                  <Pencil size={18} />
                  <Trash2 size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
