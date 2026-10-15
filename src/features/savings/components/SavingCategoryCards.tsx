import { Fragment, useState } from "react";
import type { SavingsListProps } from "../types";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { SavingsListInCategoryCard } from "./SavingsListInCategoryCard";
import { NewSavingForm } from "./NewSavingForm";
import { Dot, PiggyBank, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";

export function SavingCategoryCards({
  savingsByCategory,
  add,
  remove,
}: SavingsListProps) {
  const [activeNewForm, setActiveNewForm] = useState<string | null>(null);

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

  const handleNewForm = (id: string) => {
    if (activeNewForm === id) return setActiveNewForm(null);

    setActiveNewForm(id);
  };

  const handleDelete = async (id: string) => {
    const deleted = await remove(id);

    if (!deleted) return toast.error("Error al eliminar");

    toast.success("Registro eliminado corectamente");
  };

  return (
    <section className="mx-auto flex flex-col items-center max-w-4xl gap-2 mt-4">
      {savingsByCategory?.map(({ id, category, transactions, meta }) => (
        <div key={id} className="w-full border border-stone-300 rounded-2xl">
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
              <button
                onClick={() => handleNewForm(id)}
                className="flex items-center gap-1 text-sm cursor-pointer rounded-lg py-1 px-2 transition-all duration-100 hover:bg-emerald-300 hover:text-stone-800"
              >
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
          <div
            className={`${id === activeNewForm ? "max-h-96 opacity-100 pointer-events-auto" : " max-h-0 opacity-0 pointer-events-none"} transition-all duration-200 bg-stone-50 border-t border-t-stone-300 py-2`}
          >
            <NewSavingForm
              categoryId={category?.id}
              add={add}
              cancelForm={() => setActiveNewForm(null)}
            />
          </div>
          <div className="flex justify-between items-center px-4 py-2 border-t-stone-300 border-t hover:bg-stone-100 cursor-pointer transition-all duration-100 rounded-b-2xl">
            <div className="flex items-center">
              <h3 className="text-sm text-stone-600">Movimientos</h3>
              <Dot />
              <p className="text-xs text-stone-400">{`${meta.count} entradas`}</p>
            </div>
            <div className="text-sm text-stone-500 flex gap-1 items-center">
              <p className="font-mono">{`${calculateToGo(category?.target, meta.total)}`}</p>
              <p>restante</p>
            </div>
          </div>
          <div>
            {transactions.map((saving) => (
              <Fragment key={saving.id}>
                <SavingsListInCategoryCard
                  saving={saving}
                  handleDelete={handleDelete}
                />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
