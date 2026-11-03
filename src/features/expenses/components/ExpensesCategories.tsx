import { ChevronDown, Dot, Plus, Tag } from "lucide-react";
import { useExpensesContext } from "../context/ExpensesContext";
import { capitalizeWord, formatCurrency } from "../../../lib/formatter";
import { calculatePercentage, calculateToGo } from "../../../lib/calculations";

export function ExpensesCategories() {
  const { expensesByCategory } = useExpensesContext();
  console.log(expensesByCategory);

  return (
    <section className="mx-auto max-w-4xl border rounded-2xl border-stone-300">
      <div className="flex items-center justify-between py-2 px-4 border-b border-b-stone-300">
        <div className="flex items-center gap-2">
          <Tag size={18} />
          <h1 className="font-medium text-stone-700">Gastos por Categoría</h1>
        </div>
        <div>
          <button className="flex items-center gap-1 cursor-pointer rounded-lg py-1 px-2 transition-all duration-100 hover:bg-emerald-300 border border-stone-200 text-sm font-medium">
            Agregar Categoría
            <Plus size={16} />
          </button>
        </div>
      </div>
      <main>
        {expensesByCategory.map(({ id, category, transactions, meta }) => (
          <div key={id} className="border border-stone-200 rounded-lg m-2 py-2">
            <div className="flex justify-between py-2 px-4">
              <div className="flex">
                <Dot color={category.color} />
                <h2>{capitalizeWord(category.name)}</h2>
              </div>
              <div className="flex gap-2 text-sm">
                <p className="font-mono">{formatCurrency(meta.total)}</p>
                <p>/</p>
                <p className="font-mono">{formatCurrency(category.target)}</p>
                <ChevronDown size={18} />
              </div>
            </div>
            <div className="w-11/12 m-auto">
              <div className="h-2 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${calculatePercentage(category?.target, meta.total)}%`,
                    backgroundColor: `${category?.color}`,
                  }}
                />
              </div>
              <div className="flex justify-between text-xs py-1">
                <span>{`${meta.count} gastos`}</span>
                <span className="flex gap-2">
                  <p className="font-mono">
                    {calculateToGo(category.target, meta.total)}
                  </p>
                  <p>restante</p>
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </section>
  );
}
